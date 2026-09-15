export type NewsItem = {
  id: string;
  title: string;
  date: string;
  year: string;
  image: string;
};

export const newsByYear: Record<string, NewsItem[]> = {
  "2026": [],
  "2025": [
    {
      id: "modi-leadership-transforming",
      title: "Under PM Modi's leadership, the country is transforming — Abhinav Sinha",
      date: "30 JANUARY 2025",
      year: "2025",
      image: "/news/modi-leadership-transforming.jpg",
    },
    {
      id: "respect-party-workers",
      title: "Respect for party workers is above all — Abhinav Sinha praised BJP government",
      date: "10 APRIL 2025",
      year: "2025",
      image: "/news/respect-party-workers.jpg",
    },
  ],
  "2024": [
    {
      id: "challenge-ansaris",
      title: "Abhinav Sinha will challenge the Ansaris — Manoj Sinha's only political heir",
      date: "15 MAY 2024",
      year: "2024",
      image: "/news/challenge-ansaris.jpg",
    },
  ],
  "2023": [],
  "2022": [
    {
      id: "gaon-chalo-abhiyan",
      title: "BJP launched 'Gaon Chalo Abhiyan' (Let's Go to the Village Campaign)",
      date: "20 SEPTEMBER 2022",
      year: "2022",
      image: "/news/gaon-chalo-abhiyan.jpg",
    },
  ],
};

export async function getAllNews(): Promise<NewsItem[]> {
  return Object.values(newsByYear).flat();
}

export function getAvailableNewsYears(): string[] {
  return Object.keys(newsByYear).sort((a, b) => Number(b) - Number(a));
}
