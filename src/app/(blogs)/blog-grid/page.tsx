"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/component/PageBanner";
import { IMAGES, SVGICONS } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Sidebar from "@/component/Sidebar";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  cover: string;
  tags: string[];
  excerpt: string;
};

function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(6);

  // Fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data: BlogPost[] = await res.json();
        setPosts(data);
        setDisplayedPosts(data.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Update displayed posts when itemsToShow changes
  useEffect(() => {
    setDisplayedPosts(posts.slice(0, itemsToShow));
  }, [itemsToShow, posts]);

  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setItemsToShow((prev) => prev + 6);
      setLoadingMore(false);
    }, 500);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="page-content">
          <PageBanner title="Blog Grid" bnrimage={IMAGES.bnr2.src} />
          <section className="content-inner">
            <div className="container">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <PageBanner title="Blog Grid" bnrimage={IMAGES.bnr2.src} />
        <section className="content-inner">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 col-lg-12 m-b30 pe-xl-5">
                {displayedPosts.length === 0 ? (
                  <div className="text-center py-5">
                    <h3>No blog posts found</h3>
                    <p className="text-muted">
                      Create markdown files in the <code>content/blog/</code>{" "}
                      folder to get started.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="row loadmore-content">
                      {displayedPosts.map((post, i) => (
                        <div
                          className="col-lg-6 col-md-6 m-b25 wow fadeInUp"
                          data-wow-delay={`${i * 0.1}s`}
                          data-wow-duration="0.5s"
                          key={post.slug}
                        >
                          <div
                            className="dz-card style-2 dz-card-overlay"
                            style={{
                              backgroundImage: `url(${post.cover})`,
                            }}
                          >
                            <div className="dz-info">
                              <div className="post-date">{post.date}</div>
                              <div className="bottom-info">
                                <h3 className="dz-title">
                                  <Link href={`/blog-details?slug=${post.slug}`}>
                                    {post.title}
                                  </Link>
                                </h3>
                                <Link
                                  href={`/blog-details?slug=${post.slug}`}
                                  className="btn btn-square btn-white rounded-circle"
                                  dangerouslySetInnerHTML={{
                                    __html: SVGICONS.uparrow2,
                                  }}
                                ></Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {itemsToShow < posts.length && (
                      <div
                        className="text-center m-t30 m-lg-t0 wow fadeInUp"
                        data-wow-delay="0.7s"
                        data-wow-duration="0.5s"
                      >
                        <button
                          onClick={handleLoadMore}
                          className={`btn btn-lg btn-icon btn-primary ${
                            loadingMore ? "dz-load-more" : ""
                          }`}
                          disabled={loadingMore}
                        >
                          {loadingMore ? "Loading..." : "Load More"}
                          <span className="right-icon">
                            <i className="feather icon-refresh-ccw" />
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="col-xl-3 col-lg-12">
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

export default BlogGrid;