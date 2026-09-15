"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export type EventCardItem = {
  id: string;
  slug: string;
  href?: string;
  title: string;
  date: string;
  image?: string;
  video?: string;
};

const DEFAULT_EVENT_IMAGE = "/events/default-event.jpg";
const wixImage = (src?: string) => {
  if (!src) return DEFAULT_EVENT_IMAGE;
  if (!src.startsWith("wix:image://v1/")) return src;
  const id = src.replace("wix:image://v1/", "").split("/")[0];
  return `https://static.wixstatic.com/media/${id}`;
};
const wixVideoFileId = (src?: string) => {
  if (!src || !src.startsWith("wix:video://v1/")) return "";
  return src.replace(/^wix:video:\/\/v1\//, "").split("/")[0].split("#")[0];
};
const VIDEO_RESOLUTIONS = ["720p", "480p", "360p"];
const wixVideoUrlForResolution = (fileId: string, resIndex: number) =>
  fileId ? `https://video.wixstatic.com/video/${fileId}/${VIDEO_RESOLUTIONS[resIndex]}/mp4/file.mp4` : "";
const wixPosterUrl = (src?: string) => {
  if (!src || !src.includes("#posterUri=")) return undefined;
  const poster = src.split("#posterUri=")[1]?.split("&")[0];
  if (!poster) return undefined;
  return `https://static.wixstatic.com/media/${poster}`;
};

export default function EventCard({ event, mode = "events" }: { event: EventCardItem; mode?: "events" | "news-press" }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resIndex, setResIndex] = useState(0);
  const hasVideo = Boolean(event.video);
  const isNewsPressMode = mode === "news-press";
  const fileId = wixVideoFileId(event.video);
  const currentVideoSrc = wixVideoUrlForResolution(fileId, resIndex);

  const toggleVideo = async (eventArg?: React.SyntheticEvent) => {
    eventArg?.preventDefault();
    eventArg?.stopPropagation();

    const video = videoRef.current;
    if (!video || !hasVideo) return;

    try {
      if (video.paused) {
        video.muted = false;
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.warn("Video play failed:", error);
      setIsPlaying(false);
    }
  };

  const handleVideoError = () => {
    setIsPlaying(false);
    setResIndex((prev) => (prev < VIDEO_RESOLUTIONS.length - 1 ? prev + 1 : prev));
  };

  const media = (
    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
      {hasVideo ? (
        <>
          <video
            ref={videoRef}
            src={currentVideoSrc}
            poster={wixPosterUrl(event.video) || wixImage(event.image || DEFAULT_EVENT_IMAGE)}
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onError={handleVideoError}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void toggleVideo();
            }}
          />

          <button
            type="button"
            aria-label={isPlaying ? `Pause video for ${event.title}` : `Play video for ${event.title}`}
            onClick={(e) => void toggleVideo(e)}
            className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/80"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </>
      ) : (
        <Image
          src={wixImage(event.image || DEFAULT_EVENT_IMAGE)}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      )}
    </div>
  );

  const content = (
    <>
      {media}

      <div className="p-4">
        {event.date && (
          <p className="text-xs font-medium tracking-wide text-gray-500">
            {event.date}
          </p>
        )}

        <h3 className="mt-1 text-lg font-bold text-gray-900">
          {event.title}
        </h3>
      </div>
    </>
  );

  if (mode === "news-press") {
    return (
      <div className="block overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow hover:shadow-md">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={event.href || `/events/${event.slug}`}
      className="block overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      {content}
    </Link>
  );
}