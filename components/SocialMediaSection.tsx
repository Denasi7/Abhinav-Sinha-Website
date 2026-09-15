"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";

type TweetItem = {
  id: string;
  content: ReactNode;
};

type InstagramItem = {
  id: string;
  image?: string;
  video?: string;
  caption?: string;
  date?: string;
  likes?: string;
  comments?: string;
};

const AUTO_SLIDE_MS = 7000;

const tweets: TweetItem[] = [
  {
    id: "1793965454933086630",
    content: (
      <>
        <p lang="hi" dir="ltr">
          देश के यशस्वी प्रधानमंत्री आदरणीय{" "}
          <a href="https://twitter.com/narendramodi">@narendramodi</a>{" "}
          जी का आगमन 75 लोकसभा गाजीपुर प्रत्याशी श्री पारस नाथ राय जी के
          समर्थन में कल 25 मई को अपराह्न 2 बजे आरटीआई मैदान, गाजीपुर में हो
          रहा है।
          <br />
          मैं आप सभी गाजीपुर के देवतुल्य जनता से आग्रह करता हूँ कि आप सभी इस
          विशाल जन सभा में शामिल हों।
          <a href="https://t.co/oodssNx5Pd">
            pic.twitter.com/oodssNx5Pd
          </a>
        </p>

        &mdash; Abhinav sinha (Modi Ka Parivar){" "}
        <a href="https://twitter.com/AbhinavSinhabjp/status/1793965454933086630">
          May 24, 2024
        </a>
      </>
    ),
  },
];

const instagramPosts: InstagramItem[] = [
  {
    id: "instagram-1",
    image: "/social/instagram-1.jpg",
    caption:
      "Connecting with people at the grassroots and working together for meaningful change.",
    date: "2 DAYS AGO",
    likes: "12.4K",
    comments: "426",
  },
  {
    id: "instagram-2",
    image: "/social/instagram-2.jpg",
    caption:
      "Community interaction and public outreach remain at the heart of our journey.",
    date: "5 DAYS AGO",
    likes: "9.8K",
    comments: "312",
  },
];

function CarouselControls({
  count,
  active,
  onPrevious,
  onNext,
  onSelect,
  dark = false,
}: {
  count: number;
  active: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  dark?: boolean;
}) {
  if (count <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous post"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-700 transition hover:bg-gray-100"
      >
        ‹
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show post ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              active === index
                ? `w-6 ${dark ? "bg-black" : "bg-pink-500"}`
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next post"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-700 transition hover:bg-gray-100"
      >
        ›
      </button>
    </div>
  );
}

function TwitterCard() {
  const [active, setActive] = useState(0);
  const hasMultiple = tweets.length > 1;

  const loadTwitter = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const twitter = (window as any).twttr;
    if (twitter?.widgets) twitter.widgets.load();
  };

  useEffect(() => {
    const timer = setTimeout(loadTwitter, 250);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!hasMultiple) return;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % tweets.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [hasMultiple]);

  if (!tweets.length) return null;

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
        onLoad={loadTwitter}
      />

      <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between bg-black px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
              𝕏
            </span>

            <div>
              <p className="text-sm font-bold">Abhinav Sinha</p>
              <p className="text-[11px] text-white/60">
                @AbhinavSinhabjp
              </p>
            </div>
          </div>

          <MoreHorizontal className="h-5 w-5 text-white/70" />
        </div>

        <div className="bg-[#F8FAFC] p-4">
          <div className="flex justify-center overflow-hidden rounded-2xl bg-white">
            <blockquote
              key={tweets[active].id}
              className="twitter-tweet"
              data-width="500"
              data-dnt="true"
              data-theme="light"
            >
              {tweets[active].content}
            </blockquote>
          </div>

          <CarouselControls
            count={tweets.length}
            active={active}
            dark
            onPrevious={() =>
              setActive((current) =>
                current === 0 ? tweets.length - 1 : current - 1
              )
            }
            onNext={() =>
              setActive((current) => (current + 1) % tweets.length)
            }
            onSelect={setActive}
          />
        </div>
      </article>
    </>
  );
}

function InstagramCard() {
  const [active, setActive] = useState(0);
  const hasMultiple = instagramPosts.length > 1;
  const post = instagramPosts[active];

  useEffect(() => {
    if (!hasMultiple) return;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % instagramPosts.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [hasMultiple]);

  if (!instagramPosts.length) return null;

  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-100">
              <Image
                src="/home/profile.jpg"
                alt="Abhinav Sinha"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-gray-900">
                abhinavsinhabjp
              </p>

              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0095F6] text-[8px] font-bold text-white">
                ✓
              </span>
            </div>

            <p className="text-[11px] text-gray-500">
              Ghazipur, Uttar Pradesh
            </p>
          </div>
        </div>

        <MoreHorizontal className="h-5 w-5 text-gray-700" />
      </div>

      <div className="relative aspect-square w-full bg-gray-100">
        {post.image && (
          <Image
            src={post.image}
            alt={post.caption || "Instagram post"}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        )}

        {post.video && (
          <video
            key={post.video}
            src={post.video}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        )}

        {hasMultiple && (
          <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white">
            {active + 1}/{instagramPosts.length}
          </span>
        )}
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Heart className="h-6 w-6 stroke-[1.8]" />
            <MessageCircle className="h-6 w-6 stroke-[1.8]" />
            <Send className="h-6 w-6 stroke-[1.8]" />
          </div>

          <Bookmark className="h-6 w-6 stroke-[1.8]" />
        </div>

        {post.likes && (
          <p className="mt-3 text-sm font-semibold text-gray-900">
            {post.likes} likes
          </p>
        )}

        {post.caption && (
          <p className="mt-1 text-sm leading-5 text-gray-700">
            <span className="mr-1 font-semibold text-gray-900">
              abhinavsinhabjp
            </span>
            {post.caption}
          </p>
        )}

        {post.comments && (
          <p className="mt-2 text-sm text-gray-400">
            View all {post.comments} comments
          </p>
        )}

        {post.date && (
          <p className="mt-2 text-[10px] uppercase tracking-wide text-gray-400">
            {post.date}
          </p>
        )}

        <CarouselControls
          count={instagramPosts.length}
          active={active}
          onPrevious={() =>
            setActive((current) =>
              current === 0 ? instagramPosts.length - 1 : current - 1
            )
          }
          onNext={() =>
            setActive((current) => (current + 1) % instagramPosts.length)
          }
          onSelect={setActive}
        />
      </div>
    </article>
  );
}

export default function SocialMediaSection() {
  return (
    <section className="bg-[#F5F7FB] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D62828]">
            Follow Our Journey
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#111827] sm:text-4xl">
            Social Media Wall
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Latest updates from X and Instagram
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          <TwitterCard />
          <InstagramCard />
        </div>
      </div>
    </section>
  );
}