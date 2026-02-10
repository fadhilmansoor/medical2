"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Sidebar from "@/component/Sidebar";
import CommentForm from "../_components/CommentForm";

type Frontmatter = {
  title: string;
  date: string;
  author: string;
  cover?: string;
  tags: string[];
};

type Post = {
  frontmatter: Frontmatter;
  html: string;
  updatedAt?: number;
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/blog/${slug}?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;

      const data: Post = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [slug]);

  if (!post) return null;

  return (
    <>
      <Header />

      <main className="page-content">
        <div className="section-full post-header blog-single style-1 mb-0">
          <div className="dz-card text-center">
            {post.frontmatter.cover ? (
              <div className="dz-media overlay-secondary-light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.cover}
                  alt={post.frontmatter.title}
                />
              </div>
            ) : null}

            <div className="dz-info">
              <h1 className="dz-title text-white mx-auto">
                {post.frontmatter.title}
              </h1>

              <div className="dz-meta style-1">
                <ul className="justify-content-center">
                  <li className="post-date">{post.frontmatter.date}</li>
                  <li className="dz-user">By {post.frontmatter.author}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="content-inner-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 pe-xl-5 m-b30">
                <div
                  className="dz-post-text"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />

                <div className="post-tags m-t30">
                  <strong>Tags:</strong>
                  {post.frontmatter.tags?.map((t) => (
                    <span key={t} className="m-l10">
                      {t}
                    </span>
                  ))}
                </div>

                <CommentForm />
              </div>

              <div className="col-xl-3">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
