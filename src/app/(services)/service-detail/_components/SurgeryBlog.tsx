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

// helpers
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

export default function SurgeryBlog({ videos = [] }: Props) {
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
    <div className={styles.surgeryBlog}>
      {isMobile ? (
        // MOBILE CAROUSEL
        <div className={styles.mbContainer}>
          <div
            className={styles.mbTrack}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {list.map((item, i) => (
              <div className={styles.mbSlide} key={item.id ?? i}>
                <div className={styles.mbFrame}>
                  <Image
                    src={getYoutubeThumb(item.videoUrl) || item.image}
                    alt="Video"
                    fill
                    className={styles.mbImg}
                    sizes="100vw"
                    priority={i === 0}
                  />

                  <button
                    type="button"
                    className={styles.mbPlayBtn}
                    onClick={() => openVideo(item.videoUrl)}
                    aria-label="Watch video"
                  >
                    <i className="fa fa-play" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mbDots}>
            {list.map((_, i) => (
              <button
                key={i}
                className={`${styles.mbDot} ${i === index ? styles.mbDotActive : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        // DESKTOP GRID
        <div className="row">
          {list.map((item, i) => (
            <div className={`col-xxl-4 col-sm-6 ${styles.videoCard}`} key={item.id ?? i}>
              <div className={styles.teamCard}>
             <div className={styles.teamMedia}>
  <Image
    src={getYoutubeThumb(item.videoUrl) || item.image}
    alt="Video"
    fill
    className={styles.teamImg}
    sizes="(min-width: 1400px) 33vw, (min-width: 576px) 50vw, 100vw"
  />

<button
  type="button"
  className={styles.watchBtn}
  onClick={() => openVideo(item.videoUrl)}
>
  <i className="fa fa-play" /> Watch Video
</button>
</div>

              </div>
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
}
