"use client";

import { Modal } from "react-bootstrap";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { teamVideos, type VideoItem } from "@/constant/alldata";

// ---------- helpers ----------
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

type Props = { videos?: VideoItem[] };

// ---------- mobile banner ----------
function MobileBanner({
  items,
  onOpenVideo,
  autoPlay = true,
  interval = 3000,
  paused = false,
}: {
  items: VideoItem[];
  onOpenVideo: (url: string) => void;
  autoPlay?: boolean;
  interval?: number;
  paused?: boolean;
}) {
  const slides = items.map((x) => ({
    videoUrl: x.videoUrl,
    thumb: getYoutubeThumb(x.videoUrl) || x.image,
  }));

  const track = useMemo(() => {
    if (slides.length === 0) return [];
    const first = slides[0];
    const last = slides[slides.length - 1];
    return [last, ...slides, first];
  }, [slides]);

  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const animatingRef = useRef(false);

  // ✅ pause autoplay while user is touching
  const isTouchingRef = useRef(false);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const next = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setWithTransition(true);
    setIndex((p) => p + 1);
  }, []);

  const prev = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setWithTransition(true);
    setIndex((p) => p - 1);
  }, []);

  const onTransitionEnd = () => {
    animatingRef.current = false;

    if (index === 0) {
      setWithTransition(false);
      setIndex(slides.length);
      return;
    }
    if (index === slides.length + 1) {
      setWithTransition(false);
      setIndex(1);
      return;
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const t = setTimeout(() => setWithTransition(true), 30);
      return () => clearTimeout(t);
    }
  }, [withTransition]);

  const realIndex = useMemo(() => {
    const r = index - 1;
    if (r < 0) return slides.length - 1;
    if (r >= slides.length) return 0;
    return r;
  }, [index, slides.length]);

  // ✅ AUTOPLAY
  useEffect(() => {
    if (!autoPlay) return;
    if (paused) return;
    if (slides.length <= 1) return;

    const id = window.setInterval(() => {
      if (isTouchingRef.current) return;
      if (animatingRef.current) return;
      next();
    }, interval);

    return () => window.clearInterval(id);
  }, [autoPlay, paused, slides.length, interval, next]);

  if (track.length === 0) return null;

  return (
    <div
      className="sb-mbContainer"
      onTouchStart={(e) => {
        isTouchingRef.current = true;
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
      }}
      onTouchMove={(e) => {
        if (touchStartX.current == null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
      }}
      onTouchEnd={() => {
        const dx = touchDeltaX.current;
        touchStartX.current = null;
        touchDeltaX.current = 0;
        isTouchingRef.current = false;

        if (dx > 50) prev();
        else if (dx < -50) next();
      }}
    >
      <div
        className="sb-mbTrack"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: withTransition ? "transform 450ms ease" : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {track.map((s, idx) => (
          <div className="sb-mbSlide" key={idx}>
            <div className="sb-mbFrame">
              <Image
                src={s.thumb}
                alt={`Slide ${idx}`}
                fill
                className="sb-mbImg"
                sizes="100vw"
                priority={idx === 1}
              />
              <button
                type="button"
                onClick={() => onOpenVideo(s.videoUrl)}
                className="sb-mbPlayBtn"
                aria-label="Play video"
              >
                <i className="fa fa-play" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="sb-mbDots">
        {slides.map((_, d) => (
          <button
            key={d}
            type="button"
            className={`sb-mbDot ${d === realIndex ? "sb-mbDotActive" : ""}`}
            onClick={() => {
              if (animatingRef.current) return;
              animatingRef.current = true;
              setWithTransition(true);
              setIndex(d + 1);
            }}
            aria-label={`Go to slide ${d + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- main ----------
const SurgeryBlog = ({ videos }: Props) => {
  const [show, setShow] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string>("");

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

const list = useMemo(() => videos ?? [], [videos]);
  const mobileList = useMemo(() => list.slice(0, 3), [list]);

  const openVideo = useCallback((url: string) => {
    const id = getYoutubeId(url);
    if (!id) return;
    setActiveVideoId(id);
    setShow(true);
  }, []);

  const closeVideo = useCallback(() => {
    setShow(false);
    setActiveVideoId("");
  }, []);

  if (!mounted) return null;

  return (
    <div className="surgery-blog">
      {isMobile ? (
        <MobileBanner items={mobileList} onOpenVideo={openVideo} />
      ) : (
        <div className="row">
          {list.map((item, i) => {
            const id = getYoutubeId(item.videoUrl);
            const maxres = id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
            const hq = getYoutubeThumb(item.videoUrl) || item.image;
            const thumb = maxres || hq || item.image;

            return (
              <div className={`col-xxl-4 col-sm-6 col-12 sb-videoCard`} key={item.id ?? i}>
                <div className="dz-team style-1 box-hover sb-teamCard">
                  <div className="sb-teamMedia">
                    <Image
                      src={thumb}
                      alt="Video"
                      width={900}
                      height={600}
                      style={{ width: "100%", height: "auto" }}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (hq && img.src !== hq) img.src = hq;
                      }}
                    />
                    <button
                      type="button"
                      className="sb-playBtn"
                      onClick={() => openVideo(item.videoUrl)}
                      aria-label="Play video"
                    >
                      <i className="fa fa-play" />
                    </button>
                  </div>
                  <div className="dz-content">
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            );
          })}
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SurgeryBlog;
