import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsPressBySlugRaw } from "@/app/data";

export const revalidate = 60;

const DEFAULT_NEWS_IMAGE = "/events/default-event.jpg";

type WixDate = string | Date | { $date?: string };
type RichNode = { type?: string; nodes?: RichNode[]; textData?: { text?: string }; headingData?: { level?: number } };
type RichContent = { nodes?: RichNode[] };
type GalleryItem = { src?: string; alt?: string; title?: string };

type WixNewsPress = {
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
  if (!src) return DEFAULT_NEWS_IMAGE;
  if (!src.startsWith("wix:image://v1/")) return src;
  return `https://static.wixstatic.com/media/${src.replace("wix:image://v1/", "").split("/")[0]}`;
};

const formatDate = (value?: WixDate) => {
  if (!value) return "";
  const raw = value instanceof Date ? value : typeof value === "string" ? value : value.$date;
  if (!raw) return "";
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "long", year: "numeric" }).format(date);
};

const nodeText = (node: RichNode): string => node.textData?.text || node.nodes?.map(nodeText).join("") || "";

function RichContentRenderer({ content }: { content?: RichContent }) {
  if (!content?.nodes?.length) return null;

  return (
    <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
      {content.nodes.map((node, index) => {
        const text = nodeText(node).trim();
        if (!text) return null;

        if (node.type === "HEADING") {
          const level = node.headingData?.level ?? 2;
          return level === 3 ? (
            <h3 key={index} className="pt-2 text-xl font-bold text-gray-900">{text}</h3>
          ) : (
            <h2 key={index} className="pt-3 text-2xl font-bold text-gray-900">{text}</h2>
          );
        }

        return <p key={index}>{text}</p>;
      })}
    </div>
  );
}

export default async function NewsPressDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await getNewsPressBySlugRaw(slug);

  if (!raw) notFound();

  const news = raw as WixNewsPress;
  const title = news.title ?? "News & Press";
  const breadcrumb = news.breadcrumbText || title;
  const date = formatDate(news.date);
  const image = wixImage(news.image);
  const locationLine = [news.location, news.district].filter(Boolean).join(", ");
  const gallery = news.gallery?.filter((item) => item.src).map((item) => ({ src: wixImage(item.src), alt: item.alt || item.title || title })) ?? [];

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
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">News &amp; Press</h1>
          <p className="mt-3 text-sm font-medium tracking-wide text-white/90 sm:text-base">Coverage · In the media · For the record</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pt-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-y-1 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-[#EA8023]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="transition-colors hover:text-[#EA8023]">News &amp; Press</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#EA8023]">{breadcrumb}</span>
        </nav>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-8">
        <div className="relative h-72 w-full overflow-hidden rounded-md bg-gray-100 sm:h-96">
          <Image src={image} alt={title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>

        <div className="mt-6">
          {date && <p className="text-sm text-gray-500">{date}</p>}
          {locationLine && <p className="mt-1 text-sm text-gray-500">{locationLine}</p>}
          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{title}</h1>
        </div>

        <RichContentRenderer content={news.englishContent} />
        <RichContentRenderer content={news.hindiContent} />

        {gallery.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gallery.map((item, index) => (
              <div key={`${item.src}-${index}`} className="relative h-56 w-full overflow-hidden rounded-md bg-gray-100">
                <Image src={item.src} alt={item.alt || `${title} photo ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 384px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
}