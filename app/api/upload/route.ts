import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const safeBaseName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9.-]/g, "_");

    let filename = "";
    let finalBuffer: Buffer = buffer;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".webm");

    if (isImage) {
      // Auto Compress Image with Sharp to WebP
      filename = `${Date.now()}_${safeBaseName}.webp`;
      finalBuffer = await sharp(buffer)
        .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();
    } else {
      // Video or other file format
      const ext = path.extname(file.name) || (isVideo ? ".mp4" : "");
      filename = `${Date.now()}_${safeBaseName}${ext}`;
    }

    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, finalBuffer);

    const publicUrl = `/uploads/${filename}`;
    const originalSizeKb = (buffer.length / 1024).toFixed(1);
    const compressedSizeKb = (finalBuffer.length / 1024).toFixed(1);

    return NextResponse.json({
      url: publicUrl,
      success: true,
      stats: {
        originalKb: originalSizeKb,
        compressedKb: compressedSizeKb,
        savings: isImage
          ? `${Math.max(0, Math.round((1 - finalBuffer.length / buffer.length) * 100))}%`
          : "0%",
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to process & upload file" }, { status: 500 });
  }
}
