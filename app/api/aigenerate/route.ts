import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        const userId = user?.id || null;

         const { data: usage, error: usageError } = await supabase
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

        // Reset count if window expired (for logged-in) or if it's anonymous
        const shouldReset = userId
            ? lastReset < oneWeekAgo
            : true; // Anonymous always resets to 1 max (we treat as single use)

        if (shouldReset) {
            currentCount = 0;
        }

        const limit = userId ? 10 : 1;

        if (currentCount >= limit) {
            return NextResponse.json(
                {
                    error: userId
                        ? "You have reached your weekly limit of 6 press releases. Please try again next week."
                        : "Anonymous users are limited to 1 press release. Please log in for more."
                },
                { status: 429 }
            );
        }


        const { title, company, tone, quotes } = await req.json();


        const prompt = `
You are a professional press release writer with expertise in crafting high-quality, media-ready announcements. Your task is to generate a **unique press release** based on the user-provided topic, company, tone, and optional quotes. 

The press release **must be between 500 and 700 words**, fully professional, formal, and suitable for immediate media distribution. Use proper headings, subheadings, and paragraph structure. Do not use numbered labels like "Body Paragraph 1"—only real headings where needed.

Follow this structure:

1. **Headline**: Bold, all caps or title case, summarizing the news.
2. **Subheading**: Short summary providing context, source, and date.
3. **Lead Paragraph**: Introduce the announcement compellingly.
4. **Body**: Multiple paragraphs describing details, features, impact, and significance. Include any user-provided quotes naturally.
5. **Closing Paragraph**: Context about the company, product, or initiative.
6. **Media Contacts (optional)**: Include name, company, email, and phone number if relevant.

**Important instructions:**
- Include headings and subheadings as in professional press releases.
- Maintain a formal, professional, and press-ready tone.
- Ensure originality, clarity, and readability.
- Word count must be **500-700 words**.
- Use journalistic style; do not add “Body Paragraph X” labels.

**INPUT DETAILS:**
- Title: ${title}
- Company Name: ${company}
- Quote (if provided): ${quotes || "None"}
- Tone: ${tone || 'Professional'}

Generate the press release as a cohesive document following this format.
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
                    "max_tokens": 2500
                }),
            }
        );

        const data = await response.json();

        if (data.success === true) {
            
            if (!userId) {
                // For anonymous users, we just set a flag in localStorage and don't track usage in DB
                return NextResponse.json(data);
            }
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
            return NextResponse.json(data);
        }

        return NextResponse.json({ success: false, error: "Something went wrong" });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" });
    }
}



