import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const { clientEmail, pressReleaseId, pressReleaseUrl } = await req.json();

        const adminEmail = "info@zeestmedia.com";
        // Validation
        if (!clientEmail) {
            return Response.json({ error: "clientEmail is required" }, { status: 400 });
        }

        if (!pressReleaseId) {
            return Response.json({ error: "pressReleaseId is required" }, { status: 400 });
        }

        if (!pressReleaseUrl) {
            return Response.json({ error: "pressReleaseUrl is required" }, { status: 400 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email
        const data = await resend.emails.send({
            from: "Zeest Media <info@zeestmedia.com>",
            to: [adminEmail],
            subject: `Press Release Report Request - ID ${pressReleaseId}`,
            html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Press Release Report Request</h2>
          </div>

          <!-- Body -->
          <div style="padding: 20px; color: #333333;">
            <p>A client has requested a report for the following press release:</p>

            <p><strong>Client Email:</strong> ${clientEmail}</p>
            <p><strong>Press Release ID:</strong> ${pressReleaseId}</p>

            <p><strong>Press Release URL:</strong></p>
            <a href="${pressReleaseUrl}" style="color:#1676bf;">
              ${pressReleaseUrl}
            </a>

            <hr style="margin: 20px 0;" />

            <p style="font-size: 14px;">
              Please review this request and share the press release report with the client.
            </p>

            <hr style="margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">
              This request was generated from the client dashboard.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f1f1f1; padding: 15px; font-size: 12px; color: #666; text-align: center;">
            <img src="/logo/logo.png" alt="Zeest Media Logo" width="120" />
            <p>© ${new Date().getFullYear()} Zeest Media. All rights reserved.</p>
          </div>

        </div>
      </body>
    </html>
  `,
        });

        return Response.json({ success: true, data });

    } catch (error) {
        console.log(error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}