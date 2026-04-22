"use server";
import { Resend } from "resend";

type QuoteData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  regions: string[];
  budget: string;
  details?: string;
};

export async function sendQuoteEmails(data: QuoteData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const adminEmail = "info@zeestmedia.com";

  /* ------------------ EMAIL TO ADMIN ------------------ */
  const resultAdmin = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [adminEmail],
    subject: "New Quote Request Received",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">New Quote Request</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Company:</strong> ${data.company || "N/A"}</p>
              <p><strong>Regions:</strong> ${data.regions?.length ? data.regions.join(", ") : "N/A"}</p>
              <p><strong>Budget:</strong> <span style="color: #D13C6F; font-weight: bold;">${data.budget}</span></p>

              ${data.details ? `<p><strong>Project Details:</strong></p>
              <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #D13C6F; border-radius: 5px;">${data.details}</p>` : ''}
              
              <hr style="margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">This quote was submitted via the website.</p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 15px; font-size: 12px; color: #666; text-align: center;">
              <img src="/logo/logo.png" alt="Zeest Media Logo" width="120" style="margin-bottom: 10px;" />
              <p>© ${new Date().getFullYear()} Zeest Media. All rights reserved.</p>
            </div>

          </div>
        </body>
      </html>
    `,
  });

  /* ------------------ EMAIL TO CLIENT ------------------ */
  const resultClient = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [data.email],
    subject: "We've Received Your Quote Request",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Hi ${data.name},</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              <p>Thank you for reaching out to <strong>Zeest Media</strong>.</p>
              <p>We’ve successfully received your quote request and our team will review it shortly.</p>
              
              <p><strong>Here’s what we received:</strong></p>
              <ul>
                <li><strong>Phone:</strong> ${data.phone}</li>
                <li><strong>Company:</strong> ${data.company || "N/A"}</li>
                <li><strong>Regions:</strong> ${data.regions?.length ? data.regions.join(", ") : "N/A"}</li>
                <li><strong>Budget:</strong> <span style="color: #D13C6F;">${data.budget}</span></li>
                <li><strong>Project Details:</strong> ${data.details || "No details provided."}</li>
              </ul>

              <p>Our team will get back to you within 24-48 hours.</p>
              <br/>
              <p>Best regards,<br/>
              <strong>Zeest Media Team</strong></p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 15px; font-size: 12px; color: #666; text-align: center;">
              <img src="/logo/logo.png" alt="Zeest Media Logo" width="120" style="margin-bottom: 10px;" />
              <p>© ${new Date().getFullYear()} Zeest Media. All rights reserved.</p>
            </div>

          </div>
        </body>
      </html>
    `,
  });

}


export async function sendContactEmails(data: {
  name: string;
  email: string;
  message: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const adminEmail = "info@zeestmedia.com";

  /* ------------------ EMAIL TO ADMIN ------------------ */
  const resultAdmin = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [adminEmail],
    subject: "New Contact Message Received",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">New Contact Message</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>

              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 12px; border-left: 4px solid #D13C6F; border-radius: 5px;">
                ${data.message}
              </p>

              <hr style="margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">
                This message was submitted via the contact form.
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 15px; font-size: 12px; color: #666; text-align: center;">
              <img src="/logo/logo.png" alt="Zeest Media Logo" width="120" style="margin-bottom: 10px;" />
              <p>© ${new Date().getFullYear()} Zeest Media. All rights reserved.</p>
            </div>

          </div>
        </body>
      </html>
    `,
  });

  /* ------------------ EMAIL TO CLIENT ------------------ */
  const resultClient = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [data.email],
    subject: "We've Received Your Message",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Hi ${data.name},</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              <p>Thank you for contacting <strong>Zeest Media</strong>.</p>
              <p>We’ve received your message and our team will respond within 24 hours.</p>

              <p><strong>Your Message:</strong></p>
              <p style="background: #f9f9f9; padding: 12px; border-left: 4px solid #D13C6F; border-radius: 5px;">
                ${data.message}
              </p>

              <br/>
              <p>Best regards,<br/>
              <strong>Zeest Media Team</strong></p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 15px; font-size: 12px; color: #666; text-align: center;">
              <img src="/logo/logo.png" alt="Zeest Media Logo" width="120" style="margin-bottom: 10px;" />
              <p>© ${new Date().getFullYear()} Zeest Media. All rights reserved.</p>
            </div>

          </div>
        </body>
      </html>
    `,
  });

}


export async function sendPressReleaseEmails(data: {
  name: string;
  email: string;
  pressId: string;
  pressTitle?: string;
  pressLink: string;
  paymentId?: string;
  publishTime?: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const adminEmail = "info@zeestmedia.com";

  /* ------------------ EMAIL TO ADMIN ------------------ */
  const resultAdmin = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [adminEmail],
    subject: "New Press Release Submitted (Paid)",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">New Press Release Submission</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Press Release ID:</strong> ${data.pressId}</p>
              <p><strong>Title:</strong> ${data.pressTitle}</p>

              <p><strong>Press Link:</strong></p>
              <a href="${data.pressLink}" style="color:#1676bf;">
                ${data.pressLink}
              </a>

              <hr style="margin: 20px 0;" />

              <p><strong>Payment ID:</strong></p>
              <div style="background:#f9f9f9; padding:10px; border-radius:5px;">
                ${data.paymentId}
              </div>

              <hr style="margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">
                This press release was submitted and paid via the website.
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

  /* ------------------ EMAIL TO CLIENT ------------------ */
  const resultClient = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [data.email],
    subject: "Your Press Release Has Been Submitted 🎉",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Hi ${data.name},</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              <p>Your press release has been successfully submitted and payment received 🎉</p>

              <p><strong>Press Release Title:</strong> ${data.pressTitle}</p>
              <p><strong>Press Release ID:</strong> ${data.pressId}</p>

              <p><strong>View Your Press Release:</strong></p>
              <a href="${data.pressLink}" style="color:#1676bf;">
                ${data.pressLink}
              </a>

              <p style="margin-top:20px;">
                Our editorial team will review and publish it ${data.publishTime === 'instant' ? 'shortly' : 'within your specified timeframe:' + data.publishTime}.
              </p>

              <hr style="margin: 20px 0;" />

              <p><strong>Your Payment ID:</strong></p>
              <div style="background:#f9f9f9; padding:10px; border-radius:5px;">
                ${data.paymentId}
              </div>

              <br/>
              <p>Best regards,<br/>
              <strong>Zeest Media Team</strong></p>
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
}


export async function sendPressStatusUpdateEmail(data: {
  name: string;
  email: string;
  pressId: string;
  pressTitle: string;
  pressLink: string;
  status: string;
  adminMessage?: string;
  scheduledDate?: string;
  note?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const statusMap = {
    scheduled: {
      title: "Your Press Release Has Been Scheduled",
      message:
        "Great news! Your press release has been approved and scheduled for publication.",
      color: "#8b5cf6",
    },
    published: {
      title: "Your Press Release is Live 🚀",
      message:
        "Congratulations! Your press release has been successfully published and is now live.",
      color: "#1676bf",
    },
    rejected: {
      title: "Update on Your Press Release",
      message:
        "Unfortunately, your press release was not approved. Please review the feedback below.",
      color: "#ef4444",
    },
  };

  const currentStatus = statusMap[data.status as keyof typeof statusMap];

  /* ------------------ EMAIL TO CLIENT ------------------ */
  const resultClient = await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [data.email],
    subject: currentStatus.title,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #111A3A; color: #ffffff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Hi ${data.name},</h2>
            </div>

            <!-- Body -->
            <div style="padding: 20px; color: #333333;">
              
              <p style="font-size: 16px; font-weight: bold; color: ${currentStatus.color};">
                ${currentStatus.title}
              </p>

              <p>${currentStatus.message}</p>
              ${data.note && ` <p style="color: red;"><strong>Note:</strong> ${data.note}</p>`}
              <p><strong>Press Release Title:</strong> ${data.pressTitle}</p>
              <p><strong>Press Release ID:</strong> ${data.pressId}</p>

              ${data.status === "scheduled" && data.scheduledDate
        ? `
                  <p><strong>Scheduled Date:</strong> ${data.scheduledDate}</p>
                `
        : ""
      }

              ${data.status === "published"
        ? `
                  <p><strong>View Your Live Press Release:</strong></p>
                  <a href="${data.pressLink}" style="color:#1676bf;">
                    ${data.pressLink}
                  </a>
                `
        : `
                  <p><strong>View Your Submission:</strong></p>
                  <a href="${data.pressLink}" style="color:#1676bf;">
                    ${data.pressLink}
                  </a>
                `
      }

              ${data.adminMessage
        ? `
                  <hr style="margin: 20px 0;" />
                  <p><strong>Message from our team:</strong></p>
                  <p style="background:#f9f9f9; padding:12px; border-left:4px solid ${currentStatus.color}; border-radius:5px;">
                    ${data.adminMessage}
                  </p>
                `
        : ""
      }

              <br/>
              <p>Best regards,<br/>
              <strong>Zeest Media Team</strong></p>
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

  console.log(resultClient);
}


type GuestPostOrder = {
  name: string;
  email: string;
  orderId: string;
  websites: any[];
  total: string;
  paid: boolean;
  paymentId: string;
}

export async function sendGuestPostEmails(data: GuestPostOrder) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const adminEmail = "info@zeestmedia.com";

  /* ------------------ EMAIL TO ADMIN ------------------ */
  await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [adminEmail],
    subject: "New Guest Post Order Received",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden;">

            <div style="background:#111A3A; color:#fff; padding:20px; text-align:center;">
              <h2>New Guest Post Order</h2>
            </div>

            <div style="padding:20px; color:#333;">
              <h3>Client Details</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Order ID:</strong> ${data.orderId}</p>

              <hr/>

              <h3>Websites Ordered</h3>
              ${data.websites.map(w => `
                <div style="background:#f9f9f9; padding:10px; margin-bottom:10px; border-radius:6px;">
                  <p><strong>Site:</strong> ${w.siteName || w.url}</p>
                  <p><strong>URL:</strong> ${w.url}</p>
                  <p><strong>Price:</strong> $${w.price}</p>
                  ${w.da ? `<p><strong>DA:</strong> ${w.da}</p>` : ""}
                  ${w.niche ? `<p><strong>Niche:</strong> ${w.niche}</p>` : ""}
                </div>
              `).join("")}

              <hr/>

              <p><strong>Total Payment:</strong> $${data.total}</p>
              <p><strong>Payment ID:</strong> ${data.paymentId}</p>
            </div>

            <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px;">
              © ${new Date().getFullYear()} Zeest Media
            </div>

          </div>
        </body>
      </html>
    `,
  });

  /* ------------------ EMAIL TO CLIENT ------------------ */
  await resend.emails.send({
    from: "Zeest Media <info@zeestmedia.com>",
    to: [data.email],
    subject: "Your Guest Post Order is Confirmed 🎉",
    html: `
      <html>
        <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
          <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">

            <div style="background:#111A3A;color:#fff;padding:20px;text-align:center;">
              <h2>Thank you, ${data.name} 🎉</h2>
            </div>

            <div style="padding:20px;color:#333;">
              <p>Your guest post order has been received successfully.</p>

              <h3>Websites Purchased</h3>
              ${data.websites.map(w => `
                <div style="background:#f9f9f9;padding:10px;margin-bottom:10px;border-radius:6px;">
                  <p><strong>Site:</strong> ${w.websiteName || w.url}</p>
                  <p><strong>Price:</strong> $${w.price}</p>
                </div>
              `).join("")}

              <hr/>

              <p><strong>Total Paid:</strong> $${data.total}</p>
              <p><strong>Payment ID:</strong> ${data.paymentId}</p>

              <p style="margin-top:20px;">
                Our team will start processing your request shortly.
              </p>

              <p>
                Best regards,<br/>
                <strong>Zeest Media Team</strong>
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