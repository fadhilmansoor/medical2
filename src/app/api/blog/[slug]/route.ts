// src/app/api/blog/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ✅ Because we use fs/path (Node APIs)
export const runtime = "nodejs";

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="dz-title">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="dz-title">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="dz-title">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/gim, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
  html = html.replace(/_(.*?)_/gim, "<em>$1</em>");

  // Images
  html = html.replace(
    /!\[(.*?)\]\((.*?)\)/gim,
    '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:8px;margin:2rem 0;" />'
  );

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(
    /^> (.*$)/gim,
    '<blockquote class="wp-block-quote is-style-default"><p>$1</p></blockquote>'
  );

  html = html.replace(
    /<\/blockquote>\n<blockquote class="wp-block-quote is-style-default"><p>—\s*\*?(.*?)\*?<\/p><\/blockquote>/gim,
    '<cite>$1</cite><i class="flaticon-right-quote"></i></blockquote>'
  );

  html = html.replace(
    /<\/blockquote>\n<blockquote class="wp-block-quote is-style-default"><p>-\s*\*?(.*?)\*?<\/p><\/blockquote>/gim,
    '<cite>$1</cite><i class="flaticon-right-quote"></i></blockquote>'
  );

  html = html.replace(
    /<\/blockquote>\n<blockquote class="wp-block-quote is-style-default">/gim,
    "\n"
  );

  // Lists (convert lines to <li>)
  html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^\d+\.\s(.*$)/gim, "<li>$1</li>");

  // ✅ Wrap consecutive <li> blocks into <ul> (NO 's' flag)
  html = html.replace(/^(?:<li>[\s\S]*?<\/li>\s*)+/gm, (match) => {
    return `<ul class="dz-list">${match}</ul>`;
  });

  // Horizontal rule
  html = html.replace(/^---$/gim, '<hr class="wp-block-separator" />');

  // Code blocks (NO 's' flag)
  html = html.replace(/```([\s\S]*?)```/gi, '<pre class="code-block"><code>$1</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/gim, '<code class="inline-code">$1</code>');

  // Wrap remaining plain lines in <p>
  const lines = html.split("\n");
  const processedLines = lines.map((line) => {
    const t = line.trim();
    if (!t) return line;
    if (t.match(/^<(h[1-6]|blockquote|ul|ol|li|pre|hr|img)/)) return line;
    if (t.startsWith("<") || t.endsWith(">")) return line;
    return `<p>${line}</p>`;
  });

  html = processedLines.join("\n");
  html = html.replace(/\n{3,}/g, "\n\n");

  return html;
}

export async function GET(
  request: NextRequest,
  // ✅ Next 15: params is a Promise
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blogDir = path.join(
      process.cwd(),
      "src",
      "app",
      "(blogs)",
      "blog-details",
      "posts"
    );

    const filePath = path.join(blogDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    const html = markdownToHtml(content);

    return NextResponse.json({
      frontmatter: {
        title: frontmatter.title || "Untitled",
        date: frontmatter.date || "",
        author: frontmatter.author || "Anonymous",
        cover: frontmatter.cover || "",
        tags: frontmatter.tags || [],
      },
      html,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error reading blog post:", error);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}
