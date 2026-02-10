"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Modal } from "react-bootstrap";

const slides: Array<{ video?: string; src?: string }> = [
  { video: "https://www.youtube.com/watch?v=YcxiUn7k0Ks" },
  {
    src: "https://images.unsplash.com/photo-1769624515276-203ad4e1abcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1769633062146-cd681463d442?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Extract YouTube ID
const getYoutubeId = (url: string) => {
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch?.[1]) return watch[1];
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short?.[1]) return short[1];
  const embed = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embed?.[1]) return embed[1];
  return "";
};

const getYoutubeThumb = (url: string) => {
  const id = getYoutubeId(url);
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

export default function SliderBanner() {
  // ✅ Build infinite track: [lastClone, ...slides, firstClone]
  const track = useMemo(() => {
    if (slides.length === 0) return [];
    const first = slides[0];
    const last = slides[slides.length - 1];
    return [last, ...slides, first];
  }, []);

  // ✅ Start from 1 (the real first slide)
  const [index, setIndex] = useState(1);

  // ✅ Transition control (to remove snap on jump)
  const [withTransition, setWithTransition] = useState(true);

  // lock clicks while animating
  const animatingRef = useRef(false);

  // ✅ Modal state
  const [show, setShow] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // ✅ Auto-slide controls
  const [isHovering, setIsHovering] = useState(false);
  const AUTO_DELAY = 2000;

  const handleClose = () => {
    setShow(false);
    setActiveVideoUrl(null);
  };

  const openVideoModal = (videoUrl: string) => {
    setActiveVideoUrl(videoUrl);
    setShow(true);
  };

  const activeVideoId = useMemo(() => {
    return activeVideoUrl ? getYoutubeId(activeVideoUrl) : "";
  }, [activeVideoUrl]);

  const clickNext = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setWithTransition(true);
    setIndex((p) => p + 1);
  };

  const clickPrev = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setWithTransition(true);
    setIndex((p) => p - 1);
  };

  // ✅ After animation ends: if we are on clone, jump to real without transition
  const onTransitionEnd = () => {
    animatingRef.current = false;

    // moved to lastClone? (index === 0) => jump to last real slide
    if (index === 0) {
      setWithTransition(false);
      setIndex(slides.length); // last real
      return;
    }

    // moved to firstClone? (index === slides.length + 1) => jump to first real
    if (index === slides.length + 1) {
      setWithTransition(false);
      setIndex(1);
      return;
    }
  };

  // ✅ When we turn off transition for jump, turn it back on next tick
  useEffect(() => {
    if (!withTransition) {
      const t = setTimeout(() => setWithTransition(true), 30);
      return () => clearTimeout(t);
    }
  }, [withTransition]);

  // ✅ AUTO SLIDE (pause on hover + pause when modal open)
  useEffect(() => {
    if (slides.length <= 1) return;
    if (show) return; // pause while video modal open
    if (isHovering) return; // pause while hovering

    const timer = setInterval(() => {
      // safe: clickNext already checks animatingRef
      clickNext();
    }, AUTO_DELAY);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isHovering]); // keep minimal deps to avoid interval reset spam

  if (track.length === 0) return null;

  return (
    <>
      <div
        className="slider-banner-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="slider-banner-wrapper"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: withTransition ? "transform 450ms ease" : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((item, idx) => (
            <div key={idx} className="slider-banner-image">
              <div className="media-frame">
                {item.video ? (
                  <>
                    <Image
                      src={getYoutubeThumb(item.video)}
                      alt={`Video ${idx}`}
                      fill
                      className="slider-banner-img"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority={idx === 1}
                    />
                    <div className="video-bx1">
                      <button
                        type="button"
                        onClick={() => openVideoModal(item.video!)}
                        className="video-btn bg-primary"
                      >
                        <i className="fa fa-play" />
                      </button>
                      <span>Watch The Video</span>
                    </div>
                  </>
                ) : item.src ? (
                  <Image
                    src={item.src}
                    alt={`Slide ${idx}`}
                    fill
                    className="slider-banner-img"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority={idx === 1}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* <button onClick={clickPrev} className="nav-button prev" type="button">
          <i className="feather icon-arrow-left" />
        </button>

        <button onClick={clickNext} className="nav-button next" type="button">
          <i className="feather icon-arrow-right" />
        </button> */}
      </div>

      {/* ✅ Video Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          {activeVideoId ? (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
