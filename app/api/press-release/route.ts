import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { createSupabaseServerClient } from "@/lib/server";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public/upload");
const UPLOAD_DIR_COMP = path.join(process.cwd(), "public/upload/company");

export const GET = async (req: Request) => {
    const supabase = await createSupabaseServerClient();
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");
        const { data, error } = await supabase
            .from("press_release")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "An unknown error occurred" },
            { status: 500 }
        );
    }
};


export const POST = async (req: NextRequest) => {
    try {
        const supabase = await createSupabaseServerClient();
        const formData = await req.formData();
        const id = formData.get("id") as string | null;
        const user_id = formData.get("user_id") as string;
        const method = formData.get("method") as string;
        const title = formData.get("title") as string;
        const summary = formData.get("summary") as string;
        const content = formData.get("content") as string;
        const package_price = (formData.get("package") as string) || "299";
        const contact_name = formData.get("contact_name") as string;
        const contact_email = formData.get("contact_email") as string;
        const contact_phone = formData.get("contact_phone") as string;
        const company_name = formData.get("company_name") as string;
        const scheduled_date = formData.get("scheduled_date") as string;
        const timezone = formData.get("timezone") as string;
        const status = formData.get("status") as string | null;
        const company_website = formData.get("company_website") as string || null
        const publish_type = formData.get("publish_type") as string;
        const upload_file_press_release = formData.get("upload_file_press_release") as File | null;
        
        if (!title || (!content && method !== "upload" && !user_id)) {
            return NextResponse.json(
                { success: false, message: "Title and content are required" },
                { status: 400 }
            );
        }

        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        await fs.mkdir(UPLOAD_DIR_COMP, { recursive: true });

        // ---------- Featured Image ----------
        let featuredImagePath: string | null = null;
        const featuredImage = formData.get("featured_image") as File | null;
        const companyLogo = formData.get("company_logo") as File | null;

        let companyLogoPath: string | null = null;

        let uploadFilePressReleasePath: string | null = null;


        if (companyLogo && companyLogo.size > 0) {
            const buffer = Buffer.from(await companyLogo.arrayBuffer());
            const fileName = `${Date.now()}-${companyLogo.name}`;
            const filePath = path.join(UPLOAD_DIR_COMP, fileName);

            await fs.writeFile(filePath, buffer);
            companyLogoPath = `/upload/company/${fileName}`;
        }

        if (featuredImage && featuredImage.size > 0) {
            const buffer = Buffer.from(await featuredImage.arrayBuffer());
            const fileName = `${Date.now()}-${featuredImage.name}`;
            const filePath = path.join(UPLOAD_DIR, fileName);

            await fs.writeFile(filePath, buffer);
            featuredImagePath = `/upload/${fileName}`;
        }

        if (upload_file_press_release && upload_file_press_release.size > 0) {
            const buffer = Buffer.from(await upload_file_press_release.arrayBuffer());
            const fileName = `${Date.now()}-${upload_file_press_release.name}`;
            const filePath = path.join(UPLOAD_DIR, fileName);

            await fs.writeFile(filePath, buffer);
            uploadFilePressReleasePath = `/upload/${fileName}`;
        }

        if (id) {
            console.log("Updating", id);
            
            const { error, data } = await supabase
                .from("press_release")
                .update({
                    method,
                    title,
                    summary,
                    content,
                    package: package_price,
                    contact_name,
                    contact_email,
                    contact_phone,
                    company_name,
                    company_website,
                    scheduled_date,
                    publish_type,
                    timezone,
                    featured_image: featuredImagePath || undefined, // Only update if a new image was uploaded
                    company_logo: companyLogoPath || undefined, // Only update if a new logo was uploaded
                    upload_file_press_release: uploadFilePressReleasePath || undefined, // Only update if a new file was uploaded
                    status: status || 'draft',
                })
                .eq("id", id)
                .select()
                .single();
                
            if (error) {
                return NextResponse.json(
                    { success: false, message: error.message },
                    { status: 400 }
                );
                
            } else {
                return NextResponse.json(
                    { success: true, message: "Press release updated successfully", data: data },
                    { status: 200 }
                );
            }
        }
            console.log("User Id", user_id);

        // ---------- Save to Supabase ----------
        const { data, error } = await supabase
            .from("press_release")
            .insert([
                {
                    user_id,
                    title,
                    method,
                    summary,
                    content,
                    package: package_price,
                    contact_name,
                    contact_email,
                    contact_phone,
                    company_name,
                    company_website,
                    publish_type,
                    scheduled_date,
                    timezone,
                    featured_image: featuredImagePath,
                    company_logo: companyLogoPath || null,
                    upload_file_press_release: uploadFilePressReleasePath || null,
                    status: status || "draft",
                },
            ])
            .select();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Press release successfully sent",
                data: data[0],
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "An unknown error occurred" },
            { status: 500 }
        );
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const bodyData = await req.json();

        console.log(id, bodyData);

        if (!id || !bodyData) {
            return NextResponse.json(
                { success: false, message: "Missing press release id or data" },
                { status: 400 }
            );
        }

        const { error, data } = await supabase
            .from("press_release")
            .update({ ...bodyData })
            .eq("id", id)
            .select();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Press release status updated successfully", data: data },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "An unknown error occurred" },
            { status: 500 }
        );
    }
};


export const DELETE = async (req: Request) => {
    try {
        
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Missing press release id" },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from("press_release")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Press release deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "An unknown error occurred" },
            { status: 500 }
        );
    }
};