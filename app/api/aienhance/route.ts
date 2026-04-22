import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { content, tone } = await req.json();

    if (!content || !tone) {
      return NextResponse.json({ success: false, error: "Content and tone are required" });
    }


    const prompt = `
You are a professional press release writer. Your task is to enhance the following user-provided press release content while keeping it professional, media-ready, and engaging.

**Requirements:**
- Maintain a formal, press-ready tone.
- Improve clarity, readability, and impact.
- Adjust style according to the user-selected tone: ${tone}.
- Keep headings, subheadings, and paragraphs natural (do not use numbered labels).
- Ensure the final content is cohesive and polished.
- Maintain original meaning; do not add unrelated information.

**USER CONTENT TO ENHANCE:**
${content}
`;


const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a professional press release writer." },
            { role: "user", content: prompt },
          ],
          max_tokens: 2500
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      const enhancedText = data?.result?.response || "No content returned";
      return NextResponse.json({ success: true, text: enhancedText });
    }

    return NextResponse.json({ success: false, error: data.errors || "Something went wrong" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Something went wrong" });
  }
}