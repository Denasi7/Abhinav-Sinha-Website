"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Let us sacrifice our today so that our children can have a better tomorrow.",
    author: "A. P. J. Abdul Kalam",
  },
  {
    text: "Democracy is not a mere form of government. It is the spirit of equality and fraternity.",
    author: "Atal Bihari Vajpayee",
  },
  {
    text: "Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas.",
    author: "Narendra Modi",
  },
];

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setVisible(true); // fade in with new quote
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = quotes[index];

  return (
    <div className="w-[200px]  text-black">
      <p
        className="text-xl font-light transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {current.text}
      </p>
      <p
        className="mt-3 text-sm font-light transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {current.author}
      </p>
    </div>
  );
}