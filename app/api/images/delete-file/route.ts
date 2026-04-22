import { NextResponse } from "next/server";
import fs from "fs";
import { createSupabaseServerClient } from "@/lib/server";
export const POST = async (req: Request) => {

    const supabase = await createSupabaseServerClient();

    const { filePath, postId } = await req.json();
    if (!filePath) {
        return NextResponse.json({
            success: false,
            message: "File path is required"
        }, { status: 400 });
    }

    const exactFilePath = filePath.replace(/^\/+/, "");

    try {
        const fullPath = `${process.cwd()}/public/${exactFilePath}`;

        if (postId) {
            await supabase.from('press_release').update({ upload_file_press_release: null }).eq('id', postId);
        }

        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({
                success: true,
                message: "File deleted successfully"
            });

        }
        await fs.promises.unlink(fullPath);

        return NextResponse.json({
            success: true,
            message: "File deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to delete file"
        }, { status: 500 });
    }

}