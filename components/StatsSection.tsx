"use client";

import { useState } from "react";
import VolunteerModal from "@/components/VolunteerModal";

export default function StatsSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative h-[613px] overflow-hidden bg-[#F7F7F7] lg:h-[722px]">
      {/* Left cluster — 3 leader cutouts, bleeds off the left edge on desktop */}
      <div className="absolute -left-6 bottom-0 h-48 w-52 sm:h-56 sm:w-60 lg:-left-10 lg:h-[520px] lg:w-[420px]">
        <img
          src="/home/amit-shah.png"
          alt=""
          className="absolute bottom-0 left-0 h-64 lg:h-[560px] lg:-top-[20%] w-auto object-contain"
        />
        <img
          src="/home/nitin-nabin.png"
          alt=""
          className="absolute bottom-0 left-20 h-64 lg:h-[650px] lg:-top-[20%] lg:left-[40%]  w-auto object-contain"
        />
        <img
          src="/home/pm-modi.png"
          alt=""
          className="absolute -bottom-10 left-[5%] h-64 w-auto lg:h-[600px] lg:-bottom-22 object-contain"
        />
      </div>

      {/* Right portrait — bleeds off the right edge on desktop */}
      <img
        src="/home/ab.png"
        alt=""
        className="absolute -right-4 bottom-0 h-48 w-auto object-contain grayscale sm:h-64 lg:-bottom-10 lg:-right-0 lg:h-[470px]"
      />

      {/* Center text block */}
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center  lg:justify-center lg:items-center  lg:mt-0 px-6 text-center">
        <p className="text-[18px] lg:mb-10 tracking-widest text-[#2F2B36] lg:text-[27px]">
          SEVA. VIKAS. VISHWAS.
        </p>
        <p className=" text-[109px] font-light text-[#2F2B36] lg:text-[213px]">5429</p>
        <p className="lg:text-[20px] text-[12px] font-light text-[#2F2B36]">NaMo App Volunteers</p>
        <p className="mt-3 max-w-xs text-[18px] text-[#2F2B36] lg:max-w-lg lg:text-[27px]">
          Our political campaign is powered by supporters like you
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 rounded-full bg-[#EA8023] px-5 py-2 text-sm font-medium text-white active:scale-95"
        >
          Become a Volunteer
        </button>
      </div>

      <VolunteerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}