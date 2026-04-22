import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        const userId = user?.id || null;

        const { data: usage } = await supabase
            .from('ai_press_release_usage')
            .select('request_count, last_reset')
            .eq('user_id', userId)
            .single();

        let currentCount = 0;
        let lastReset = new Date();

        if (usage) {
            currentCount = usage.request_count;
            lastReset = new Date(usage.last_reset);
        }

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const shouldReset = userId
            ? lastReset < oneWeekAgo
            : true;

        if (shouldReset) {
            currentCount = 0;
        }

        const limit = userId ? 50 : 1;

        if (currentCount >= limit) {
            return NextResponse.json(
                {
                    error: userId
                        ? "You have reached your weekly limit of 10 press releases."
                        : "Anonymous users are limited to 1 press release. Please log in."
                },
                { status: 429 }
            );
        }

        const { title, company, tone, quotes } = await req.json();

        const prompt = `
You are a professional PRNewswire-style press release writer.

Your task is to generate a HIGH-QUALITY, MEDIA-READY press release in clean HTML format.

Return ONLY valid JSON in this exact structure:

{
  "title": "Headline here",
  "summary": "Short summary here",
  "content": "<p>Full HTML press release...</p>"
}

Don't write anything outside the JSON. Do NOT include explanations, apologies, or any text outside the JSON object. The content field must contain valid HTML with proper tags like <p>, <strong>, etc. Do NOT use markdown or raw text.
-----------------------------------
PRESS RELEASE REQUIREMENTS
-----------------------------------

1. HEADLINE (title)
- Clear, compelling, professional
- Title Case
- Reflect the main announcement

2. summary (summary)
- One sentence summarizing the announcement

3. CONTENT (HTML FORMAT ONLY)

Write the press release using proper HTML tags:
- Use <p> for paragraphs
- Use <strong> for section headings
- Use <em> where appropriate
- Do NOT use markdown
- Do NOT include raw text outside HTML

-----------------------------------
STRUCTURE (VERY IMPORTANT)
-----------------------------------

Follow this exact structure:

<p>Opening paragraph introducing the announcement clearly and professionally.</p>

<p>Second paragraph expanding on the product/service/news and its significance.</p>

<p><strong>Key Features / Highlights</strong></p>

<p>Explain major features, innovations, or capabilities in detail.</p>

<p><strong>Additional Details</strong></p>

<p>Provide deeper explanation, technology, data, or use cases.</p>

<p><strong>Quote</strong></p>

<p>"Include a realistic executive quote here," said [Name], [Title] at [Company].</p>

<p><strong>Industry Impact</strong></p>

<p>Explain how this affects the market, users, or industry.</p>

<p><strong>Event / Availability</strong></p>

<p>Include launch dates, availability, or event details if applicable.</p>

<p><strong>About the Company</strong></p>

<p>Write a professional company boilerplate (2-4 sentences).</p>

<p><strong>Media Contact</strong></p>

<p>Name<br/>Company<br/>Email<br/>Phone (optional)</p>

-----------------------------------
WRITING STYLE
-----------------------------------

- Professional, journalistic tone
- Similar to PRNewswire / BusinessWire
- Avoid fluff or hype language
- Use realistic corporate language
- Keep length between 600-800 words
- Ensure natural paragraph flow

-----------------------------------
IMPORTANT RULES
-----------------------------------

- Return ONLY valid JSON
- Do NOT include \`\`\` or markdown
- Escape quotes properly using \"
- Ensure HTML is valid
- Do NOT include placeholders like [Company] — replace with real values
- Do NOT include explanations outside JSON

-----------------------------------
INPUT DATA
-----------------------------------

- Title: ${title}
- Company Name: ${company}
- Tone: ${tone || "Professional"}
- Quote (optional): ${quotes || "Generate a realistic executive quote"}

-----------------------------------
GOAL
-----------------------------------

Generate a polished, publication-ready press release that looks like it came from PRNewswire.
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
                        {
                            role: "system",
                            content: "You are a professional press release writer."
                        },
                        { role: "user", content: prompt },
                    ],
                    max_tokens: 2500
                }),
            }
        );

        const data = await response.json();

        if (!data.success) {
            return NextResponse.json({
                success: false,
                error: "AI request failed"
            });
        }

        let rawText = data.result?.response || "";

        rawText = rawText.replace(/```json|```/g, "").trim();

        let parsed;

        // try {
        //     parsed = JSON.parse(rawText);
        // } catch (err) {
        //     console.error("JSON Parse Error:", rawText);
        //     return NextResponse.json({
        //         success: false,
        //         error: "Failed to parse AI response"
        //     });
        // }

        if (userId) {
            const newCount = currentCount + 1;

            if (usage) {
                await supabase
                    .from('ai_press_release_usage')
                    .update({
                        request_count: newCount,
                        last_reset: shouldReset ? now : usage.last_reset,
                        updated_at: now
                    })
                    .eq('user_id', userId);
            } else {
                await supabase
                    .from('ai_press_release_usage')
                    .insert({
                        user_id: userId,
                        request_count: newCount,
                        last_reset: now
                    });
            }
        }

        return NextResponse.json({
            success: true,
            data: rawText
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            error: "Something went wrong"
        });
    }
}