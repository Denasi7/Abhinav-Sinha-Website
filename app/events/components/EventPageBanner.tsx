import Image from "next/image";

const DEFAULT_EVENT_BANNER = "/events/default-banner.jpg";

export function EventPageBanner({ image }: { image?: string | null }) {
  return (
    <section className="relative flex h-[410px] items-center justify-center overflow-hidden bg-[#0d3d2a]">
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          src="/gallery/background video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-white sm:text-6xl">Events</h1>
        <p className="mt-3 text-sm font-medium tracking-wide text-white/90 sm:text-base">On the ground · With the people · For the country</p>
      </div>
    </section>
  );
}