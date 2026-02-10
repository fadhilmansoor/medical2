"use client";

import { Modal } from "react-bootstrap";
import { teamVideos } from "@/constant/alldata";
import Image from "next/image";
import { useState } from "react";

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

// maxres sometimes not available -> fallback handled in component
function getYoutubeThumb(url: string, quality: "maxres" | "hq" = "maxres") {
  const id = getYoutubeId(url);
  if (!id) return "";
  return quality === "maxres"
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

const SurgeryBlog = () => {
  const [show, setShow] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string>("");

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

  return (
    <>
      <div className="row">
        {teamVideos.map((item, i) => (
          <div className="col-xxl-4 col-sm-6" key={item.id ?? i}>
            <div className="dz-team style-1 box-hover">
              <div className="dz-media">
                <Image
                  src={getYoutubeThumb(item.videoUrl, "maxres") || item.image}
                  alt="Video"
                  width={900}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                  onError={(e) => {
                    // fallback to HQ thumbnail if maxres fails
                    const fallback = getYoutubeThumb(item.videoUrl, "hq");
                    if (!fallback) return;
                    (e.currentTarget as any).src = fallback;
                  }}
                />

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openVideo(item.videoUrl)}
                >
                  <i className="fa fa-play m-r5" /> Watch Video
                </button>
              </div>

              {/* keep layout spacing */}
              <div className="dz-content">
                <div className="clearfix" />
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </>
  );
};

export default SurgeryBlog;
