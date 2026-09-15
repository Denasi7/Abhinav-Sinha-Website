/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHomeBannersRaw } from "@/app/data";

type Position = "left" | "center" | "right";

type Banner = {
  id: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  date?: string;
  location?: string;
  textPosition: Position;
  displaySeconds: number;
  sortOrder: number;
  link?: string;
};

const positionClasses: Record<Position, string> = {
  left: "left-8 lg:left-30 items-start text-left",
  center: "left-1/2 -translate-x-1/2 items-center text-center",
  right: "right-8 lg:right-30 items-end text-right",
};

const wixImage = (src?: string) => {
  if (!src) return "";
  if (!src.startsWith("wix:image://v1/")) return src;
  const mediaId = src.replace("wix:image://v1/", "").split("/")[0];
  return `https://static.wixstatic.com/media/${mediaId}`;
};

const dateValue = (value: any): number | null => {
  if (!value) return null;
  if (value instanceof Date) return value.getTime();
  const raw = typeof value === "object" && value.$date ? value.$date : value;
  const time = new Date(raw).getTime();
  return Number.isNaN(time) ? null : time;
};

const normalizePosition = (value?: string): Position =>
  value === "center" || value === "right" ? value : "left";

export default function HeroCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);

        const result = await getHomeBannersRaw();
        const now = Date.now();

        const mapped: Banner[] = (result.items as any[])
          .map((raw) => {
            const item = raw?.data ?? raw;
            const start = dateValue(item.startAt);
            const end = dateValue(item.endAt);

            if (item.enabled === false) return null;
            if (start !== null && now < start) return null;
            if (end !== null && now > end) return null;

            const image = wixImage(item.desktopImage);
            if (!image) return null;

            return {
              id: item._id ?? raw.id ?? "",
              title: item.title ?? "",
              description: item.description ?? "",
              image,
              mobileImage: wixImage(item.mobileImage) || undefined,
              date: item.date ?? undefined,
              location: item.location ?? undefined,
              textPosition: normalizePosition(item.textPosition),
              displaySeconds: Math.min(60, Math.max(2, Number(item.displaySeconds) || 4)),
              sortOrder: Number(item.sortOrder) || 0,
              link: item.link ?? undefined,
            };
          })
          .filter(Boolean)
          .sort((a, b) => a!.sortOrder - b!.sortOrder) as Banner[];

        if (!mounted) return;

        setBanners(mapped);
        setSlideIndex(mapped.length > 1 ? 1 : 0);

        console.log("WIX BANNERS:", mapped);
      } catch (error) {
        console.error("Failed to load Wix banners:", error);
        if (mounted) setBanners([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const slides = useMemo(() => {
    if (banners.length <= 1) return banners;
    return [banners[banners.length - 1], ...banners, banners[0]];
  }, [banners]);

  const realIndex =
    banners.length <= 1
      ? 0
      : slideIndex === 0
        ? banners.length - 1
        : slideIndex === banners.length + 1
          ? 0
          : slideIndex - 1;

  useEffect(() => {
    const visibility = () => setPageHidden(document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);

  useEffect(() => {
    stop();

    if (banners.length <= 1 || paused || pageHidden) return;

    const banner = banners[realIndex];
    if (!banner) return;

    timerRef.current = setTimeout(() => {
      setAnimate(true);
      setSlideIndex((prev) => prev + 1);
    }, banner.displaySeconds * 1000);

    return stop;
  }, [banners, slideIndex, realIndex, paused, pageHidden, restartKey]);

  const handleTransitionEnd = () => {
    if (banners.length <= 1) return;

    if (slideIndex === banners.length + 1) {
      setAnimate(false);
      setSlideIndex(1);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true))
      );
    }

    if (slideIndex === 0) {
      setAnimate(false);
      setSlideIndex(banners.length);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true))
      );
    }
  };

  const goToSlide = (index: number) => {
    stop();
    setAnimate(true);
    setSlideIndex(banners.length > 1 ? index + 1 : 0);
    setRestartKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <section className="relative h-[600px] overflow-hidden bg-gray-200 sm:h-[500px]" aria-busy="true">
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
        <div className="absolute left-8 top-1/2 w-[300px] -translate-y-1/2">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-300" />
          <div className="mt-4 h-5 w-full animate-pulse rounded bg-gray-300" />
          <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-gray-300" />
          <div className="mt-6 h-11 w-32 animate-pulse rounded-full bg-gray-300" />
        </div>
      </section>
    );
  }

  if (!banners.length) return null;

  return (
    <section
      className="relative h-[600px] overflow-hidden sm:h-[500px]"
      aria-label="Featured events"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !e.currentTarget.contains(next)) setPaused(false);
      }}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex h-full ${animate ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {slides.map((b, renderedIndex) => {
          const href = b.link || `/events/${b.id}`;
          const isFirstBanner = b.id === banners[0]?.id;

          return (
            <div key={`${b.id}-${renderedIndex}`} className="relative h-full min-w-full overflow-hidden">
              <Image
                src={b.mobileImage ?? b.image}
                alt={b.title}
                fill
                sizes="100vw"
                priority={banners.length === 1 ? renderedIndex === 0 : renderedIndex === 1}
                className="object-cover sm:hidden"
              />

              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="100vw"
                priority={banners.length === 1 ? renderedIndex === 0 : renderedIndex === 1}
                className="hidden object-cover sm:block"
              />

              <div className="absolute left-8 right-4 top-12 flex flex-col sm:hidden">
                <h2 className="text-[18px] font-bold text-[#B05709]">{b.title}</h2>
                {b.description && <p className="mt-1 max-w-[300px] text-[18px] text-[#2F2B36]">{b.description}</p>}
                {b.date && <p className="mt-2 text-xs font-semibold text-[#2F2B36]">{b.date}</p>}
                {b.location && <p className="text-xs font-semibold text-[#2F2B36]">{b.location}</p>}
                {!isFirstBanner && (
                  <Link href={href} className="mt-3 w-fit rounded-full bg-[#EA8023] px-6 py-2.5 text-xs font-light text-white transition-colors hover:bg-[#BBA7FA]">
                    Read More
                  </Link>
                )}
              </div>

              <div className={`absolute top-1/2 hidden max-w-md -translate-y-1/2 flex-col sm:flex ${positionClasses[b.textPosition]}`}>
                <h2 className="text-[34px] font-bold text-[#B05709]">{b.title}</h2>
                {b.description && <p className="mt-2 text-[22px] text-[#2F2B36]">{b.description}</p>}
                {b.date && <p className="mt-4 text-[18px] font-bold text-[#2F2B36]">{b.date}</p>}
                {b.location && <p className="mt-2 max-w-[300px] text-[18px] font-bold text-[#2F2B36]">{b.location}</p>}
                {!isFirstBanner && (
                  <Link href={href} className="mt-4 w-fit rounded-full bg-[#EA8023] px-9 py-3 text-[18px] font-light text-white transition-colors duration-300 hover:bg-[#BBA7FA]">
                    Read More
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-5">
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === realIndex ? "true" : undefined}
              className={`h-2 w-2 lg:cursor-pointer rounded-full transition-transform ${i === realIndex ? "scale-125 bg-white" : "bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}