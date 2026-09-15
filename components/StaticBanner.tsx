"use client";

import Link from "next/link";
import { useState, type SyntheticEvent } from "react";

type StaticBannerProps = {
  desktopImage: string;
  mobileImage: string;
  alt: string;
  href?: string;
};

export default function StaticBanner({ desktopImage, mobileImage, alt, href }: StaticBannerProps) {
  const [mobileAspectRatio, setMobileAspectRatio] = useState<string | null>(null);
  const [desktopAspectRatio, setDesktopAspectRatio] = useState<string | null>(null);

  const handleImageLoad = (
    event: SyntheticEvent<HTMLImageElement>,
    variant: "mobile" | "desktop",
  ) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (!naturalWidth || !naturalHeight) return;

    const ratio = `${naturalWidth} / ${naturalHeight}`;

    if (variant === "mobile") {
      setMobileAspectRatio(ratio);
      return;
    }

    setDesktopAspectRatio(ratio);
  };

  const content = (
    <div className="w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mobileImage}
        alt={alt}
        className="block w-full sm:hidden"
        style={mobileAspectRatio ? { aspectRatio: mobileAspectRatio } : undefined}
        onLoad={(event) => handleImageLoad(event, "mobile")}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopImage}
        alt={alt}
        className="hidden w-full sm:block"
        style={desktopAspectRatio ? { aspectRatio: desktopAspectRatio } : undefined}
        onLoad={(event) => handleImageLoad(event, "desktop")}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}