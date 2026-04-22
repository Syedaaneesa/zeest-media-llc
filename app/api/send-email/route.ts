import ContactEmail from "@/components/contact/QuoteEmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.budget || !body.regions?.length) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
   
    const data = {
      ...body,
      name: body.name.trim(),
      email: body.email.trim(),
      details: body.details?.trim() || null,
      regions: body.regions || [],
    };
   
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["amir.zeestmedia@gmail.com"],
      subject: "New Quote Request",
      replyTo: data.email,
      react: ContactEmail(data),
    });

    return Response.json({ success: true, data: response });

  } catch (error: any) {
    return Response.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}