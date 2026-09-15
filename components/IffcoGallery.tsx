"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/gallery/iffco-1.jpeg",
  "/gallery/iffco-2.jpeg",
  "/gallery/iffco-3.jpeg",
  "/gallery/iffco-4.jpeg",
  "/gallery/iffco-5.jpeg",
  "/gallery/iffco-6.jpeg",
];

export default function IffcoGallery() {
  const [index, setIndex] = useState(0);

  function go(dir: number) {
    setIndex((prev) => (prev + dir + images.length) % images.length);
  }

  return (
    <div className="py-10">
      <div className="relative h-150 w-full overflow-hidden rounded-md bg-gray-100">
        <Image
          key={index}
          src={images[index]}
          alt="IFFCO event photo"
          fill
          className="object-cover transition-opacity duration-300"
        />
        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow hover:bg-white"
        >
          ›
        </button>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-aut">
        {images.map((src, i) => (
          <button key={src} onClick={() => setIndex(i)}>
            <Image
              src={src}
              alt="thumbnail"
              width={200}
              height={150}
              className={`h-16 w-24 rounded object-cover ${
                i === index ? "opacity-100 ring-2 ring-orange-600" : "opacity-70 hover:opacity-100"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
