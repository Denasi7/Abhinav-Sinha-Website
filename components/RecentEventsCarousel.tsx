"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { RecentHighlight } from "@/lib/recent-highlights-data";

export default function RecentEventsCarousel({
  items,
}: {
  items: RecentHighlight[];
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    stop();
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
  }
  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  function goPrev() {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }
  function goNext() {
    setIndex((prev) => (prev + 1) % items.length);
  }

  if (items.length === 0) return null;

  return (
    <div
     className="relative mt-6 w-full max-w-lg overflow-hidden sm:max-w-2xl"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${index * (100 / items.length)}%)`,
        }}
      >
        {items.map((item) => {
          const content = (
            <>
              <div className="relative h-56 w-full sm:h-72">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <p className="mt-2 font-bold text-xs text-[#2F2B36]">{item.date}</p>
              <p className="text-[16px]  mt-2 lg:text-[18px] lg:w-md font-medium text-[#2F2B36]">
                {item.title}
              </p>
            </>
          );

          return item.linkTo ? (
            <Link
              key={item.id}
              href={`/events/${item.linkTo}`}
              className="flex-shrink-0"
              style={{ width: `${100 / items.length}%` }}
            >
              {content}
            </Link>
          ) : (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{ width: `${100 / items.length}%` }}
            >
              {content}
            </div>
          );
        })}
      </div>

      <button
        onClick={goPrev}
        aria-label="Previous"
        className="absolute left-2 top-28 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow hover:bg-white sm:top-36"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        aria-label="Next"
        className="absolute right-2 top-28 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow hover:bg-white sm:top-36"
      >
        ›
      </button>
    </div>
  );
}
