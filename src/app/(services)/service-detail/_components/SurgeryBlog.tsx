"use client";

import { Modal } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./SurgeryBlog.module.css";

export type VideoItem = {
  id: number;
  delay?: string;
  videoUrl: string;
  image?: any;
};

type Props = { videos?: VideoItem[] };

const extractYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "") || null;
    }

    // youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get("v");
    if (v) return v;

    // youtube.com/embed/VIDEO_ID
    const embedMatch = u.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch?.[1]) return embedMatch[1];

    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = u.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch?.[1]) return shortsMatch[1];

    return null;
  } catch {
    return null;
  }
};

const getYouTubeThumb = (url: string) => {
  const id = extractYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

export default function SurgeryBlog({ videos = [] }: Props) {
  const [show, setShow] = useState(false);
  const [activeEmbedUrl, setActiveEmbedUrl] = useState("");
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
    const id = extractYouTubeId(url);

    // If not YouTube / can't parse, open in new tab (safe)
    if (!id) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    setActiveEmbedUrl(`https://www.youtube.com/embed/${id}`);
    setShow(true);
  };

  const closeVideo = () => {
    setShow(false);
    setActiveEmbedUrl("");
  };

  if (!list.length) return null;

  return (
    <div className={styles.surgeryBlog}>
      {isMobile ? (
        // ---------------- MOBILE SLIDER ----------------
        <div className={styles.mbContainer}>
          <div
            className={styles.mbTrack}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {list.map((item, i) => {
              const thumb = getYouTubeThumb(item.videoUrl) || item.image;
              return (
                <div className={styles.mbSlide} key={item.id ?? i}>
                  <div className={styles.mbFrame}>
                    <Image
                      src={thumb}
                      alt="Video"
                      fill
                      className={styles.mbImg}
                      sizes="100vw"
                      priority={i === 0}
                    />

                    {/* Mobile button (centered) */}
                    <button
                      type="button"
                      className={styles.mbPlayBtn}
                      onClick={() => openVideo(item.videoUrl)}
                      aria-label="Watch video"
                    >
                      <span className={styles.playIcon}>
                        <i className="fa fa-play" />
                      </span>
                      <span className={styles.playText}>Watch Video</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.mbDots}>
            {list.map((_, i) => (
              <button
                key={i}
                className={`${styles.mbDot} ${
                  i === index ? styles.mbDotActive : ""
                }`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        // ---------------- DESKTOP GRID ----------------
        <div className="row">
          {list.map((item, i) => {
            const thumb = getYouTubeThumb(item.videoUrl) || item.image;
            return (
              <div
                className={`col-xxl-4 col-sm-6 ${styles.videoCard}`}
                key={item.id ?? i}
              >
                <div className={styles.teamCard}>
                  <div className={styles.teamMedia}>
                    <Image
                      src={thumb}
                      alt="Video"
                      fill
                      className={styles.teamImg}
                      sizes="(min-width: 1400px) 33vw, (min-width: 576px) 50vw, 100vw"
                      priority={i === 0}
                    />

                    {/* Desktop button (beautiful centered tile) */}
   <button
  type="button"
  className={styles.videoCtaDesktop}
  onClick={() => openVideo(item.videoUrl)}
  aria-label="Watch video"
>
  <span className={styles.videoCtaIcon}>
    <i className="fa fa-play" />
  </span>
  <span className={styles.videoCtaText}>Watch Video</span>
</button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- MODAL (NO HEADER) ---------------- */}
      <Modal
        show={show}
        onHide={closeVideo}
        centered
        size="lg"
        dialogClassName={styles.videoModalDialog}
        contentClassName={styles.videoModalContent}
        backdropClassName={styles.videoModalBackdrop}
      >
        <Modal.Body className={styles.videoModalBody}>
          {/* Custom close button (no header) */}
          <button
            type="button"
            className={styles.modalClose}
            onClick={closeVideo}
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>

          {activeEmbedUrl && (
            <div className={styles.iframeWrap}>
              <iframe
                className={styles.iframe}
                src={`${activeEmbedUrl}?autoplay=1&mute=1&rel=0`}
                title="YouTube video"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
