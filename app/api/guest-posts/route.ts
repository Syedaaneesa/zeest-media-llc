import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const GET = async (req: Request) => {
  const supabase = await createSupabaseServerClient();

  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const rawLimit = parseInt(searchParams.get("limit") || "15");
    const limit = isNaN(rawLimit) ? 15 : Math.min(Math.max(1, rawLimit), 50);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const search = (searchParams.get("search") || "").trim();

    const minMaxParams = searchParams.getAll("minMax");
    const minPrice = minMaxParams.length > 0 ? Number(minMaxParams[0]) : undefined;
    const maxPrice = minMaxParams.length > 1 ? Number(minMaxParams[1]) : undefined;

    const minDAParam = searchParams.get("minDA");
    const minDA = minDAParam && !isNaN(Number(minDAParam)) ? Number(minDAParam) : 0;

    let query = supabase
      .from("websites")
      .select(
        `
      id,
      websiteName,
      url,
      da,
      dr,
      traffic,
      contentType,
      linkType,
      price,
      tat,
      categories!category (
        id,
        name
      )
      `,
        { count: "exact" }
      );

    const isGlobalFilter = !!search ;
      if (minPrice !== undefined && maxPrice !== undefined) {
        query = query.gte("price", minPrice).lte("price", maxPrice);
      }
    if (isGlobalFilter) {
      if (search) {
        query = query.or(
          `websiteName.ilike.%${search}%,url.ilike.%${search}%`
        );
      }
    } else {


      const categoryParams = searchParams.getAll("categories");
      const categoryIds = categoryParams
        .map((id) => id.trim())
        .filter((id) => id !== "All" && id !== "")
        .map((id) => Number(id))
        .filter((id) => !isNaN(id));
 
      if (categoryIds.length > 0) {
        query = query.in("category", categoryIds);
      }

      if (minDA > 0) {
        query = query.gte("da", minDA);
      }
    }

    query = query.order("da", { ascending: false });

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Supabase query failed:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: data ?? [],
      pagination: {
        total: count ?? 0,
        page,
        totalPages: Math.ceil((count ?? 0) / limit),
        limit,
      },
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);

const adminEmail = "admin@yourdomain.com";

export async function POST(req: Request) {
  try {
    
    const supabase = await createSupabaseServerClient();

    const body = await req.json();

    const { user_id, websites, paid, total_price, total_items, email, name } =
      body;

    if (!user_id || !websites || websites.length === 0) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("guest_post_orders")
      .insert([
        {
          user_id,
          websites,
          paid: paid ?? false,
          total_price,
          total_items,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { message: "DB error" },
        { status: 500 }
      );
    }

    const orderId = data.id;

    // To Admin 
    await resend.emails.send({
      from: "Zeest Media <info@zeestmedia.com>",
      to: [adminEmail],
      subject: "New Guest Post Order Submitted",
      html: `
        <html>
          <body style="font-family: Arial; background:#f5f5f5; padding:20px;">
            <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,0.08);">

              <div style="background:#111A3A;color:#fff;padding:20px;text-align:center;">
                <h2>New Guest Post Order</h2>
              </div>

              <div style="padding:20px;">
                <p><strong>User ID:</strong> ${user_id}</p>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Total Items:</strong> ${total_items}</p>
                <p><strong>Total Price:</strong> $${total_price}</p>

                <hr/>

                ${websites.map((site: any) => `
                  <div style="margin-bottom:10px;padding:10px;background:#f9f9f9;border-radius:5px;">
                    <p><strong>${site.websiteName}</strong></p>
                    <p>Price: $${site.price}</p>
                    <p>Qty: ${site.qty}</p>
                    ${site.documentUrl ? `<p><a href="${site.documentUrl}">View Document</a></p>` : ""}
                  </div>
                `).join("")}

                <p style="font-size:12px;color:#666;">
                  Awaiting payment.
                </p>
              </div>

              <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;">
                © ${new Date().getFullYear()} Zeest Media
              </div>

            </div>
          </body>
        </html>
      `,
    });

    // To Client
    if (email) {
      await resend.emails.send({
        from: "Zeest Media <info@zeestmedia.com>",
        to: [email],
        subject: "Your Guest Post Order Received",
        html: `
          <html>
            <body style="font-family: Arial; background:#f5f5f5; padding:20px;">
              <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">

                <div style="background:#111A3A;color:#fff;padding:20px;text-align:center;">
                  <h2>Order Received</h2>
                </div>

                <div style="padding:20px;">
                  <p>Hi ${name || "Customer"},</p>

                  <p>Your order has been received and is awaiting payment.</p>

                  <p><strong>Order ID:</strong> ${orderId}</p>
                  <p><strong>Total:</strong> $${total_price}</p>

                  <p style="margin-top:20px;">
                    Please complete your payment to proceed.
                  </p>
                </div>

                <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;">
                  © ${new Date().getFullYear()} Zeest Media
                </div>

              </div>
            </body>
          </html>
        `,
      });
    }

    return NextResponse.json(
      { message: "Order created", data },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}