import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EventPageBanner } from "../components/EventPageBanner";
import { getEventBySlugRaw } from "@/app/data";

export const revalidate = 60;

const DEFAULT_EVENT_IMAGE = "/events/default-event.jpg";

type WixDate = string | Date | { $date?: string };

type RichNode = {
  type?: string;
  nodes?: RichNode[];
  textData?: {
    text?: string;
  };
  headingData?: {
    level?: number;
  };
};

type RichContent = {
  nodes?: RichNode[];
};

type GalleryItem = {
  src?: string;
  alt?: string;
  title?: string;
};

type WixEvent = {
  _id: string;
  title?: string;
  slug?: string;
  date?: WixDate;
  image?: string;
  location?: string;
  district?: string;
  breadcrumbText?: string;
  englishContent?: RichContent;
  hindiContent?: RichContent;
  gallery?: GalleryItem[];
};

const wixImage = (src?: string) => {
  if (!src) return DEFAULT_EVENT_IMAGE;
  if (!src.startsWith("wix:image://v1/")) return src;

  const id = src.replace("wix:image://v1/", "").split("/")[0];

  return `https://static.wixstatic.com/media/${id}`;
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

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const nodeText = (node: RichNode): string => {
  if (node.textData?.text) return node.textData.text;

  return node.nodes?.map(nodeText).join("") ?? "";
};

function RichContentRenderer({ content }: { content?: RichContent }) {
  if (!content?.nodes?.length) return null;

  return (
    <div className="mt-6 max-w-full space-y-4 break-words text-base leading-relaxed text-gray-700">
      {content.nodes.map((node, index) => {
        const text = nodeText(node).trim();

        if (!text) return null;

        if (node.type === "HEADING") {
          const level = node.headingData?.level ?? 2;

          if (level === 3) {
            return (
              <h3
                key={index}
                className="max-w-full break-words pt-2 text-xl font-bold text-gray-900 sm:text-2xl"
              >
                {text}
              </h3>
            );
          }

          return (
            <h2
              key={index}
              className="max-w-full break-words pt-3 text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              {text}
            </h2>
          );
        }

        return (
          <p
            key={index}
            className="max-w-full break-words whitespace-normal [overflow-wrap:anywhere]"
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const raw = await getEventBySlugRaw(slug);

  if (!raw) notFound();

  const event = raw as WixEvent;

  const title = event.title ?? "Event";
  const breadcrumb = event.breadcrumbText || title;
  const date = formatDate(event.date);
  const image = wixImage(event.image);

  const locationLine = [event.location, event.district]
    .filter(Boolean)
    .join(", ");

  const gallery =
    event.gallery
      ?.filter((item) => item.src)
      .map((item) => ({
        src: wixImage(item.src),
        alt: item.alt || item.title || title,
      })) ?? [];

  return (
    <>
      <EventPageBanner />

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 sm:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm"
        >
          <Link
            href="/"
            className="truncate transition-colors hover:text-[#EA8023]"
          >
            Home
          </Link>

          <span className="shrink-0">/</span>

          <Link
            href="/events"
            className="truncate transition-colors hover:text-[#EA8023]"
          >
            Events
          </Link>

          <span className="shrink-0">/</span>

          <span className="max-w-full truncate font-medium text-[#EA8023]">
            {breadcrumb}
          </span>
        </nav>
      </div>

      {/* EVENT DETAIL */}
      <article className="mx-auto max-w-3xl min-w-0 px-4 py-6 sm:px-6 sm:py-8">
        <div className="relative h-72 w-full overflow-hidden rounded-md bg-gray-100 sm:h-96">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-6 min-w-0">
          {date && (
            <p className="text-sm text-gray-500">
              {date}
            </p>
          )}

          {locationLine && (
            <p className="mt-1 break-words text-sm text-gray-500">
              {locationLine}
            </p>
          )}

          <h1 className="mt-2 break-words text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
        </div>

        {/* ENGLISH CONTENT */}
        <RichContentRenderer content={event.englishContent} />

        {/* HINDI CONTENT */}
        <RichContentRenderer content={event.hindiContent} />

        {/* GALLERY */}
        {gallery.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative h-56 w-full overflow-hidden rounded-md bg-gray-100"
              >
                <Image
                  src={image.src}
                  alt={image.alt || `${title} photo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
}