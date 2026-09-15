/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import {
  getEventYearsRaw,
  getEventsRaw,
  getNewsYearsRaw,
  getNewsPressRaw,
} from "@/app/data";

export type EventItem = {
  id: string;
  slug: string;
  href?: string;
  title: string;
  date: string;
  year: string;
  image: string;
  video?: string;
  location?: string;
  district?: string;
  disabled?: boolean;
};

type WixYearItem = { _id: string; year?: number; title?: string };
type WixDate = string | Date | { $date?: string };
type WixRichContent = { nodes?: unknown[] };
type WixItem = {
  _id: string;
  title?: string;
  slug?: string;
  date?: WixDate;
  year?: string;
  image?: string;
  video?:
    | string
    | {
        url?: string;
        src?: string;
        video?: string;
        media?: string;
        href?: string;
      };
  location?: string;
  district?: string;
  enabled?: boolean;
  englishContent?: WixRichContent;
  hindiContent?: WixRichContent;
  mediaType?: string;
};
type Props = { mode?: "events" | "news-press" };

const DEFAULT_EVENT_IMAGE = "/events/default-event.jpg";
const unwrapItems = <T,>(result: any): T[] =>
  result?.items ?? result?.dataItems?.map((item: any) => item.data) ?? [];
const resolveMediaUrl = (value?: unknown) => {
  if (!value) return "";
  if (Array.isArray(value)) return resolveMediaUrl(value[0]);
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const media = value as {
      url?: string;
      src?: string;
      video?: string;
      media?: string;
      href?: string;
      file?: { url?: string };
    };
    return (
      media.url ||
      media.src ||
      media.video ||
      media.media ||
      media.href ||
      media.file?.url ||
      ""
    );
  }
  return "";
};
const wixImage = (src?: string) => {
  if (!src) return DEFAULT_EVENT_IMAGE;
  if (!src.startsWith("wix:image://v1/")) return src;
  const id = src.replace("wix:image://v1/", "").split("/")[0];
  return `https://static.wixstatic.com/media/${id}`;
};

const wixPosterUrl = (src?: string) => {
  if (!src || !src.includes("#posterUri=")) return "";
  const poster = src.split("#posterUri=")[1]?.split("&")[0];
  if (!poster) return "";
  return `https://static.wixstatic.com/media/${poster}`;
};
const formatDate = (value?: WixDate) => {
  if (!value) return "";
  const raw =
    value instanceof Date
      ? value
      : typeof value === "string"
        ? value
        : value.$date;
  if (!raw) return "";
  const date = new Date(raw);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
};
const normalizeSlug = (slug?: string, id?: string) =>
  slug?.trim().replace(/^\/+|\/+$/g, "") || id || "";
const hasContent = (item: WixItem) =>
  Boolean(
    item.englishContent?.nodes?.length || item.hindiContent?.nodes?.length,
  );

export default function EventsTabsSection({ mode = "events" }: Props) {
  const [years, setYears] = useState<string[]>([]);
  const [items, setItems] = useState<EventItem[]>([]);
  const [activeYear, setActiveYear] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);

      try {
        const [yearsResult, itemsResult] = await Promise.all([
          mode === "news-press" ? getNewsYearsRaw() : getEventYearsRaw(),
          mode === "news-press" ? getNewsPressRaw() : getEventsRaw(),
        ]);

        if (cancelled) return;

        const wixYears = unwrapItems<WixYearItem>(yearsResult);
        const wixItems = unwrapItems<WixItem>(itemsResult);
        const yearMap = new Map(
          wixYears.map((item) => [
            item._id,
            String(item.year ?? item.title ?? "").trim(),
          ]),
        );
        const mappedYears = wixYears
          .map((item) => String(item.year ?? item.title ?? "").trim())
          .filter(Boolean)
          .sort((a, b) => Number(b) - Number(a));

        const mappedItems: EventItem[] = wixItems
          .filter((item) => item.enabled !== false)
          .map((item) => {
            const slug = normalizeSlug(item.slug, item._id);
            const disabled = !hasContent(item);
            const video = resolveMediaUrl(item.video);
            const image = resolveMediaUrl(item.image);
            const resolvedVideo =
              mode === "news-press" && video ? video : "";
            const posterFromVideo =
              mode === "news-press" && video ? wixPosterUrl(video) : "";

            return {
              id: item._id,
              slug,
              href: disabled
                ? undefined
                : `${mode === "news-press" ? "/news" : "/events"}/${slug}`,
              title: item.title?.trim() ?? "",
              date: formatDate(item.date),
              year: item.year ? (yearMap.get(item.year) ?? "") : "",
              image:
                image || item.image
                  ? wixImage(image || item.image)
                  : posterFromVideo || DEFAULT_EVENT_IMAGE,
              video: resolvedVideo,
              location: item.location?.trim() || undefined,
              district: item.district?.trim() || undefined,
              disabled,
            };
          })
          .filter((item) => item.title && item.year);

        setYears(mappedYears);
        setItems(mappedItems);
        setActiveYear(
          mappedYears.find((year) =>
            mappedItems.some((item) => item.year === year),
          ) ??
            mappedYears[0] ??
            "",
        );
      } catch (error) {
        console.error(`Failed to load Wix ${mode}:`, error);

        if (!cancelled) {
          setYears([]);
          setItems([]);
          setActiveYear("");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [mode]);

  const filtered = items.filter((item) => item.year === activeYear);

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-[320px] animate-pulse rounded-md bg-gray-100"
          />
        ))}
      </div>
    );
  if (!years.length) return null;

  return (
    <div>
      <div className="flex w-full overflow-x-auto border-b border-gray-200">
        {years.map((year) => {
          const active = year === activeYear;

          return (
            <button
              key={year}
              type="button"
              onClick={() => setActiveYear(year)}
              className={`relative min-w-[90px] flex-1 whitespace-nowrap pb-3 text-center text-sm font-medium transition-colors ${active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
            >
              {year}
              {active && (
                <span className="absolute -bottom-px left-0 h-0.5 w-full bg-gray-900" />
              )}
            </button>
          );
        })}
      </div>

      {filtered.length ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <EventCard key={item.id} event={item} mode={mode} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-gray-500">
          No {mode === "news-press" ? "news" : "events"} added for {activeYear}{" "}
          yet.
        </p>
      )}
    </div>
  );
}
