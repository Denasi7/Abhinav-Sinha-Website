import Link from "next/link";
import EventsTabsSection from "@/components/EventsTabsSection";

export const revalidate = 60;

export default function NewsPage() {
  return (
    <>
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
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
            News &amp; Press
          </h1>
          <p className="mt-3 text-sm font-medium tracking-wide text-white/90 sm:text-base">
            Coverage · In the media · For the record
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-[#EA8023]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#EA8023]">
            News &amp; Press
          </span>
        </nav>
      </div>

      <section className="mx-auto mt-6 max-w-6xl px-6 pb-14">
        <EventsTabsSection mode="news-press" />
      </section>
    </>
  );
}