"use client";

import { useState } from "react";
import Image from "next/image";
import type { NewsItem } from "@/lib/news-data";

export default function NewsTabsSection({
  news,
  years,
}: {
  news: NewsItem[];
  years: string[];
}) {
  const defaultYear = years.find((y) => news.some((n) => n.year === y)) ?? years[0];
  const [activeYear, setActiveYear] = useState(defaultYear);

  const filtered = news.filter((n) => n.year === activeYear);

  return (
    <div>
      <div className="flex w-full border-b border-gray-200">
        {years.map((year) => {
          const isActive = year === activeYear;
          return (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`relative flex-1 pb-3 text-center text-sm font-medium transition-colors ${
                isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {year}
              {isActive && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-gray-900" />}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-md border border-gray-200 bg-white">
                <div className="relative h-56 w-full bg-gray-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium tracking-wide text-gray-500">{item.date}</p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-gray-500">No news added for {activeYear} yet.</p>
        )}
      </div>
    </div>
  );
}
