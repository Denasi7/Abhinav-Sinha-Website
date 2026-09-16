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
          <a href="https://twitter.com/narendramodi">@narendramodi</a> जी का
          आगमन 75 लोकसभा गाजीपुर प्रत्याशी श्री पारस नाथ राय जी के समर्थन में कल
          25 मई को अपराह्न 2 बजे आरटीआई मैदान, गाजीपुर में हो रहा है।
          <br />
          मैं आप सभी गाजीपुर के देवतुल्य जनता से आग्रह करता हूँ कि आप सभी इस
          विशाल जन सभा में शामिल हों।
          <a href="https://t.co/oodssNx5Pd">pic.twitter.com/oodssNx5Pd</a>
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
              <p className="text-[11px] text-white/60">@AbhinavSinhabjp</p>
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
                current === 0 ? tweets.length - 1 : current - 1,
              )
            }
            onNext={() => setActive((current) => (current + 1) % tweets.length)}
            onSelect={setActive}
          />
        </div>
      </article>
    </>
  );
}

const EMBEDISTA_INSTAGRAM_HTML = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/abhinavsinha_bjp" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:undefinedpx;height:undefinedpx;max-height:100%; width:undefinedpx;"><div style="padding:16px;"> <a id="main_link" href="abhinavsinha_bjp" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="abhinavsinha_bjp" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Shared post</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;">Time</time></p></div></blockquote><div style="overflow: auto; position: absolute; height: 0pt; width: 0pt;"><a href="https://www.embedista.com/instagramfeed">Embed Instagram Post</a> Code Generator</div>`;

function InstagramCard() {
  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-xs font-bold text-pink-600">
              IG
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-gray-900">
                abhinavsinha_bjp
              </p>
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0095F6] text-[8px] font-bold text-white">
                ✓
              </span>
            </div>
            <p className="text-[11px] text-gray-500">Ghazipur, Uttar Pradesh</p>
          </div>
        </div>

        <MoreHorizontal className="h-5 w-5 text-gray-700" />
      </div>

      <div
        className="flex w-full justify-center bg-white p-2"
        dangerouslySetInnerHTML={{ __html: EMBEDISTA_INSTAGRAM_HTML }}
      />

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://www.embedista.com/j/instagramfeed1707.js"
        strategy="afterInteractive"
      />
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
