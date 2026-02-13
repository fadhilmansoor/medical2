import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const blogDir = path.join(
      process.cwd(),
      "src",
      "app",
      "(blogs)",
      "blog-details",
      "posts"
    );

    if (!fs.existsSync(blogDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

    const posts = files.map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter, content } = matter(fileContent);

      const excerpt =
        content.replace(/[#*>`\-]/g, "").trim().substring(0, 150) + "...";

      return {
        slug,
        title: frontmatter.title || "Untitled",
        date: frontmatter.date || "",
        author: frontmatter.author || "Anonymous",
        cover: frontmatter.cover || "/assets/images/default-blog.jpg",
        tags: frontmatter.tags || [],
        excerpt,
      };
    });

    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
