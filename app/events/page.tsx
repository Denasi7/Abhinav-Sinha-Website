import Link from "next/link";
import { EventPageBanner } from "./components/EventPageBanner";
import EventsTabsSection from "@/components/EventsTabsSection";

export const revalidate = 60;

export default function EventsPage() {
  return (
    <>
      <EventPageBanner />
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-[#EA8023]">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#EA8023]">Events</span>
        </nav>
      </div>
      <section className="mx-auto mt-6 max-w-6xl px-6 pb-14">
        <EventsTabsSection mode="events" />
      </section>
    </>
  );
}