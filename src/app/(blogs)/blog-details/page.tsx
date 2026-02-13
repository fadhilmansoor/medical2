"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Sidebar from "@/component/Sidebar";
import CommentForm from "../../../component/CommentForm";
import { IMAGES } from "@/constant/theme";

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

export default function BlogDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}?t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("Post not found");
          setLoading(false);
          return;
        }

        const data: Post = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="page-content">
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="page-content">
          <div className="container">
            <div className="text-center py-5">
              <h2>Post not found</h2>
              <Link href="/blog" className="btn btn-primary mt-3">
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="page-content">
        <div className="section-full post-header blog-single style-1 mb-0">
          <div className="dz-card text-center">
            <div className="dz-media overlay-secondary-light">
              {post.frontmatter.cover ? (
                <Image
                  src={post.frontmatter.cover}
                  alt={post.frontmatter.title}
                  width={1920}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              ) : (
                <Image
                  src={IMAGES.blog1}
                  alt={post.frontmatter.title}
                  width={1920}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              )}
            </div>

            <div className="dz-info">
              <h1 className="dz-title text-white mx-auto">
                {post.frontmatter.title}
              </h1>

              <div className="dz-meta style-1">
                <ul className="justify-content-center">
                  <li className="post-date">{post.frontmatter.date}</li>
                  <li className="dz-user">
                    <i className="fa-solid fa-user" />
                    By{" "}
                    <Link href={"#"} scroll={false}>
                      {post.frontmatter.author}
                    </Link>
                  </li>
                  <li className="dz-comment">
                    <i className="fa-solid fa-message" />
                    <Link href={"#"} scroll={false}>
                      24 Comments
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="content-inner-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 pe-xl-5 m-b30">
                <div className="dz-blog blog-single sidebar style-1">
                  <div className="dz-info">
                    <div
                      className="dz-post-text"
                      dangerouslySetInnerHTML={{ __html: post.html }}
                    />

                    <div className="dz-share-post meta-bottom">
                      <div className="post-tags">
                        <strong>Tags:</strong>
                        {post.frontmatter.tags?.map((tag, index) => (
                          <Link
                            key={index}
                            href={`/blog/tag/${tag.toLowerCase()}`}
                            scroll={false}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                      <div className="dz-social-icon primary-light">
                        <ul>
                          <li>
                            <Link
                              href="https://www.facebook.com/dexignzone"
                              target="_blank"
                            >
                              <i className="fa-brands fa-facebook-f" />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://www.instagram.com/dexignzone"
                              target="_blank"
                            >
                              <i className="fa-brands fa-instagram" />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://x.com/dexignzone"
                              target="_blank"
                            >
                              <i className="fa-brands fa-x-twitter" />
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://www.linkedin.com/showcase/dexignzone"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="clear" id="comment-list">
                  <div className="post-comments comments-area style-1 clearfix">
                    <h4 className="comments-title mb-2">Comments (02)</h4>
                    <p className="dz-title-text">
                      There are many variations of passages of Lorem Ipsum
                      available.
                    </p>
                    <div id="comment">
                      <ol className="comment-list">
                        <li
                          className="comment even thread-even depth-1 comment"
                          id="comment-2"
                        >
                          <div className="comment-body">
                            <div className="comment-author vcard">
                              <Image
                                src={IMAGES.avtarmiddle1}
                                alt="/"
                                className="avatar"
                              />
                              <cite className="fn">Michel Poe</cite>
                            </div>
                            <div className="comment-content dz-page-text">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s.
                              </p>
                            </div>
                            <div className="reply">
                              <Link
                                rel="nofollow"
                                className="comment-reply-link"
                                href={"#"}
                              >
                                Reply
                              </Link>
                            </div>
                          </div>
                          <ol className="children">
                            <li
                              className="comment byuser comment-author-w3itexpertsuser bypostauthor odd alt depth-2 comment"
                              id="comment-3"
                            >
                              <div className="comment-body" id="div-comment-3">
                                <div className="comment-author vcard">
                                  <Image
                                    src={IMAGES.avtarmiddle2}
                                    alt="/"
                                    className="avatar"
                                  />
                                  <cite className="fn">Celesto Anderson</cite>
                                </div>
                                <div className="comment-content dz-page-text">
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry.
                                  </p>
                                </div>
                                <div className="reply">
                                  <Link
                                    className="comment-reply-link"
                                    href={"#"}
                                  >
                                    {" "}
                                    Reply
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </li>
                        <li
                          className="comment even thread-odd thread-alt depth-1 comment"
                          id="comment-4"
                        >
                          <div className="comment-body" id="div-comment-4">
                            <div className="comment-author vcard">
                              <Image
                                src={IMAGES.avtarmiddle1}
                                alt="/"
                                className="avatar"
                              />
                              <cite className="fn">Monsur Rahman Lito</cite>
                            </div>
                            <div className="comment-content dz-page-text">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </p>
                            </div>
                            <div className="reply">
                              <Link
                                className="comment-reply-link"
                                href={"#"}
                              >
                                {" "}
                                Reply
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div
                      className="default-form comment-respond style-1"
                      id="respond"
                    >
                      <h4 className="comment-reply-title mb-2" id="reply-title">
                        Good Comments
                      </h4>
                      <p className="dz-title-text">
                        There are many variations of passages of Lorem Ipsum
                        available.
                      </p>
                      <div className="clearfix">
                        <CommentForm />
                      </div>
                    </div>
                  </div>
                </div>
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