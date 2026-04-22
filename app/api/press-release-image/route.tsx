import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public/upload");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("files") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await fs.writeFile(filepath, buffer);

  return NextResponse.json({
    url: `/upload/${filename}`,
  });
}
