import Image from "next/image";
import Link from "next/link";
import { CircleChevronRight, Quote } from "lucide-react";

import HeroCarousel from "@/components/HeroCarousel";
import StaticBanner from "@/components/StaticBanner";
import IffcoGallery from "@/components/IffcoGallery";
import SocialMediaSection from "@/components/SocialMediaSection";
import StatsSection from "@/components/StatsSection";
import QuoteRotator from "@/components/QuoteRotator";
import RecentEventsCarousel from "@/components/RecentEventsCarousel";

import { getRecentHighlights } from "@/lib/recent-highlights-data";

export default async function HomePage() {
  const recentHighlights = await getRecentHighlights();

  return (
    <>
      <HeroCarousel />
      <StaticBanner
        desktopImage="/home/desktop-qr.png"
        mobileImage="/home/mobile-qr.png"
        alt="Banner 1"
      />

      <StaticBanner
        desktopImage="/home/desktop-free-consultation.png"
        mobileImage="/home/mobile-free-consultation.png"
        alt="Banner 2"
      />

      {/* IFFCO SECTION */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:h-[750px] lg:grid-cols-2 lg:gap-60 lg:py-0">
        <div className="lg:py-35">
          <h3 className="text-xl font-bold text-[#2F2B36] lg:text-[27px]">
            Supporting Farmers Through Innovation and IFFCO Initiatives
          </h3>

          <p className="mt-3 text-sm font-light leading-relaxed text-[#2F2B36] lg:w-[600px] lg:text-[22px]">
            On 23 May 2025, attended the inauguration of the &apos;IFFCO
            Bazaar&apos; in Revatipur, Ghazipur, and a seminar on
            &apos;Enhancing Crop Productivity&apos; organized by IFFCO. The new
            center will benefit farmers in the region. IFFCO, the world&apos;s
            largest fertilizer cooperative and India&apos;s top fertilizer
            producer, operates five modern plants producing urea, NPK/DAP, and
            phosphoric acid. This initiative promotes advanced, sustainable, and
            cost-effective farming practices.
          </p>
        </div>

        <IffcoGallery />
      </section>

      {/* CATALYST FOR CHANGE */}
      <section className="relative flex flex-col overflow-hidden py-10 lg:block lg:h-[765px] lg:px-0 lg:py-0">
        <div className="relative z-10 px-6 lg:absolute lg:left-28 lg:top-40 lg:w-[400px]">
          <p className="text-[20px] text-[#2F2B36] lg:text-[18px]">
            ABHINAV SINHA
          </p>

          <p className="mt-2 text-[40px] font-semibold leading-snug text-[#2F2B36] lg:mt-0 lg:text-[50px] lg:leading-15">
            A catalyst for change, rooted in the ground, committed to changing
            lives.
          </p>
        </div>

        <div className="relative mt-6 h-[468px] w-[628px] max-w-full overflow-hidden opacity-75 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:h-full lg:w-[76%] lg:max-w-none">
          <Image
            src="/home/lotus.jpg"
            alt="Lotus"
            fill
            sizes="(max-width: 1024px) 100vw, 76vw"
            className="object-cover"
          />
        </div>

        <p className="absolute left-[10%] top-[48%] z-[9] mt-6 w-[239px] px-6 text-[14px] text-[#2F2B36] lg:bottom-11 lg:left-auto lg:right-10 lg:top-auto lg:mt-0 lg:w-[412px]">
          A visionary social leader, entrepreneur, and technocrat, deeply
          committed to the betterment of society. With a background in
          Electronics and Communication Engineering, he seamlessly combines
          technical expertise with a strong dedication to driving meaningful
          social transformation.
        </p>
      </section>

      {/* PASSIONATE WORKER / YOUTH LEADER */}
      <section className="flex min-h-[700px] flex-col gap-8 bg-[#F7F7F7] px-6 py-10 lg:min-h-0 lg:h-[400px] lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0">
        <div className="lg:h-[200px] lg:w-1/2 lg:border-r lg:border-dotted lg:pl-95">
          <h3 className="text-lg font-medium text-[#2F2B36] lg:text-[22px]">
            a passionate worker
          </h3>

          <p className="mt-2 text-sm font-light leading-7 text-[#2F2B36] lg:w-[377px]">
            His diverse interests—including football, music, reading, and
            socio-political progress—shape his forward-thinking leadership,
            while his focus on big data, ancient Vedic wisdom, and
            decolonization cultivates a holistic and culturally rooted
            worldview.
          </p>
        </div>

        <div className="border-t border-dotted pt-8 lg:h-[200px] lg:w-1/2 lg:border-t-0 lg:pl-10 lg:pt-0">
          <h3 className="text-lg font-medium text-[#2F2B36] lg:text-[22px]">
            a youth leader
          </h3>

          <p className="mt-2 text-sm font-light leading-7 text-[#2F2B36] lg:w-[470px]">
            A staunch advocate for youth empowerment, he inspires young
            individuals to prioritize health and personal growth through active
            participation in sports and fitness initiatives. He also plays a
            pivotal role in the hospitality and education sectors, where he
            promotes job creation and drives innovation—guided by his
            entrepreneurial spirit and a deep understanding of societal needs.
          </p>
        </div>
      </section>

      {/* REAL CHANGE */}
      <section className="relative bg-[#C6EEFF] px-6 py-10 lg:h-[755px] lg:px-0 lg:py-0">
        <div className="mx-auto grid grid-cols-1 items-start gap-10 px-6 lg:grid-cols-2">
          <div>
            <div className="relative -mt-40 h-[400px] w-[300px] lg:absolute lg:left-0 lg:top-[-30.5%] lg:mt-0 lg:h-[750px] lg:w-[750px]">
              <Image
                src="/home/india-gate.png"
                alt="India Gate"
                fill
                sizes="(max-width: 1024px) 300px, 750px"
                className="rounded object-cover"
              />
            </div>

            <div className="relative mt-6 lg:absolute lg:bottom-32 lg:left-[-2%] lg:mt-0">
              <div className="relative w-full bg-white p-6 shadow-lg lg:-mt-16 lg:ml-6 lg:h-[333px] lg:w-[500px]">
                <div className="mb-2 h-fit w-fit lg:absolute lg:left-[25%] lg:top-[16%] lg:mb-0">
                  <Quote className="h-[40px] w-[40px] rotate-180 fill-[#EA8023] text-[#EA8023]" />
                </div>

                <div className="h-48 w-fit lg:absolute lg:left-[35%] lg:top-[20%] lg:h-fit">
                  <QuoteRotator />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:absolute lg:right-25 lg:top-25 lg:mt-0">
            <h3 className="text-2xl font-bold text-[#2F2B36] lg:text-[30px]">
              Real Change Begins with Real Action
            </h3>

            <p className="mb-8 mt-3 w-full text-[12px] font-light leading-5 text-[#2F2B36] lg:w-2xl lg:text-sm lg:leading-7">
              For the past six years, he has led community-driven initiatives
              focused on uplifting marginalized groups through impactful health
              camps and educational programs. His work also emphasizes voter
              awareness and civic participation, reinforcing the belief that
              lasting change is rooted in grassroots action and informed citizen
              engagement.
            </p>

            <RecentEventsCarousel items={recentHighlights} />

            <Link
              href="/events"
              className="mt-6 inline-block rounded-full bg-[#EA8023] px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#BBA7FA]"
            >
              All Events ›
            </Link>
          </div>
        </div>
      </section>

      {/* MINDSET + NEWS */}
      <section className="grid grid-cols-1 gap-8 bg-[#EBECF3] px-6 py-14 lg:h-[650px] lg:grid-cols-2 lg:px-40">
        <div className="relative h-[400px] w-full lg:h-[540px] lg:w-[470px]">
          <Image
            src="/home/mindset-of-leader.png"
            alt="Mindset of a leader"
            fill
            sizes="(max-width: 1024px) 100vw, 470px"
            className="object-cover"
          />
        </div>

        <div>
          <div className="mt-5 space-y-5">
            <NewsItem
              image="/news/home-news-1.jpeg"
              date="30 JANUARY 2025"
              title="Under Prime Minister Modi's leadership, the country is transforming — Abhinav Sinha"
            />

            <NewsItem
              image="/news/home-news-2.jpeg"
              date="10 APRIL 2025"
              title="Respect for party workers is above all – Abhinav Sinha praised BJP government"
            />

            <NewsItem
              image="/news/home-news-3.jpeg"
              date="15 MAY 2024"
              title="Abhinav Sinha will challenge the Ansaris – Manoj Sinha's only political heir"
            />

            <NewsItem
              image="/news/home-news-4.jpeg"
              date="20 SEPTEMBER 2022"
              title="BJP launched 'Gaon Chalo Abhiyan' (Let's Go to the Village Campaign)"
              objectTop
            />
          </div>

          <Link
            href="/news"
            className="mt-10 flex w-fit items-center gap-1 rounded-full bg-[#EA8023] px-4 py-3 text-[12px] font-medium text-white transition-colors duration-300 hover:bg-[#BBA7FA] lg:px-5 lg:text-sm lg:font-light"
          >
            News &amp; Press
            <CircleChevronRight className="h-4 w-4 fill-white text-[#EA8023]" />
          </Link>
        </div>
      </section>

      <SocialMediaSection />
      <StatsSection />
    </>
  );
}

function NewsItem({
  image,
  date,
  title,
  objectTop = false,
}: {
  image: string;
  date: string;
  title: string;
  objectTop?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="relative h-[78px] w-[113px] flex-shrink-0 lg:h-[100px] lg:w-[155px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 113px, 155px"
          className={`object-cover ${objectTop ? "object-top" : ""}`}
        />
      </div>

      <div>
        <p className="text-[10px] font-bold text-[#2F2B36] lg:text-[15px]">
          {date}
        </p>

        <p className="text-[12px] font-medium text-[#2F2B36] lg:text-[15px]">
          {title}
        </p>
      </div>
    </div>
  );
}
