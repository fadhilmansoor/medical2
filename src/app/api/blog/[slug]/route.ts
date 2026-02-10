import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { NextResponse } from "next/server";

const POSTS_DIR = path.join(
  process.cwd(),
  "src/app/(blogs)/blog-details/posts"
);

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  
  // Convert markdown to HTML
  const processed = await remark().use(html).process(content);

  const response = NextResponse.json({
    frontmatter: {
      title: data.title || "",
      date: data.date || "",
      author: data.author || "",
      cover: data.cover || "",
      tags: data.tags || [],
    },
    html: processed.toString(),
    updatedAt: stat.mtimeMs,
  });

  response.headers.set("Cache-Control", "no-store");
  return response;
}