"use client";

import { Modal } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type VideoItem = {
  id: number;
  delay?: string;
  videoUrl: string;
  image?: any;
};

type Props = {
  videos?: VideoItem[];
};

// ---------------- helpers ----------------
function getYoutubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const v = u.searchParams.get("v");
    if (v) return v;
    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    return "";
  } catch {
    return "";
  }
}

function getYoutubeThumb(url: string) {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

// ---------------- component ----------------
const SurgeryBlog = ({ videos = [] }: Props) => {
  const [show, setShow] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  const list = useMemo(() => videos ?? [], [videos]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openVideo = (url: string) => {
    const id = getYoutubeId(url);
    if (!id) return;
    setActiveVideoId(id);
    setShow(true);
  };

  const closeVideo = () => {
    setShow(false);
    setActiveVideoId("");
  };

  if (!list.length) return null;

  return (
    <>
      {isMobile ? (
        // ---------------- MOBILE CAROUSEL ----------------
        <div className="mobile-carousel">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {list.map((item, i) => (
              <div className="carousel-slide" key={item.id ?? i}>
                <div className="dz-team style-1 box-hover">
                  <div className="dz-media">
                    <Image
                      src={getYoutubeThumb(item.videoUrl) || item.image}
                      alt="Video"
                      width={900}
                      height={600}
                      style={{ width: "100%", height: "auto" }}
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openVideo(item.videoUrl)}
                    >
                      <i className="fa fa-play m-r5" /> Watch Video
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            {list.map((_, i) => (
              <button
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      ) : (
        // ---------------- DESKTOP GRID (UNCHANGED CSS) ----------------
        <div className="row">
          {list.map((item, i) => (
            <div
              className="col-xxl-4 col-sm-6"
              key={item.id ?? i}
            >
              <div className="dz-team style-1 box-hover">
                <div className="dz-media">
                  <Image
                    src={getYoutubeThumb(item.videoUrl) || item.image}
                    alt="Video"
                    width={900}
                    height={600}
                    style={{ width: "100%", height: "auto" }}
                  />

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => openVideo(item.videoUrl)}
                  >
                    <i className="fa fa-play m-r5" /> Watch Video
                  </button>
                </div>

                <div className="dz-content">
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- MODAL ---------------- */}
      <Modal show={show} onHide={closeVideo} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          {activeVideoId && (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </Modal.Body>
      </Modal>

      {/* ---------------- MOBILE CSS ---------------- */}
      <style jsx>{`
        .mobile-carousel {
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.4s ease;
        }

        .carousel-slide {
          min-width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: #ccc;
        }

        .dot.active {
          background: var(--primary);
          width: 20px;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default SurgeryBlog;
