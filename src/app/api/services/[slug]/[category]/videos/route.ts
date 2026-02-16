import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
{ params }: { params: Promise<{ slug: string; category: string }> }
) {
  try {
   const { slug, category } = await params;
    
    // ✅ Read from public/data/videos.json
    const filePath = path.join(process.cwd(), "public", "data", "videos.json");
    
    if (!fs.existsSync(filePath)) {
      console.error("❌ videos.json not found at:", filePath);
      return NextResponse.json({ videos: [] });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const allVideos = JSON.parse(fileContent);

    // Get videos for this specific service and category
    const videos = allVideos[slug]?.[category] || [];

    console.log(`✅ Found ${videos.length} videos for ${slug}/${category}`);

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("❌ Error reading videos:", error);
    return NextResponse.json({ videos: [] });
  }
}