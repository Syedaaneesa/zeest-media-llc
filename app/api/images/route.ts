import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import mime from 'mime-types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("url");

  if (!filePath) {
    return new NextResponse("Missing file path", { status: 400 });
  }

  const relativePath = filePath.replace(/^\/+/, "");

  const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");

  const fullPath = path.join(process.cwd(), "public", safePath);

  try {
    const fileBuffer = await fs.readFile(fullPath);

    const contentType =
      mime.lookup(fullPath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("File not found", { status: 404 });
  }
}