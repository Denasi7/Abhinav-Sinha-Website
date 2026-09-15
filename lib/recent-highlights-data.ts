export type RecentHighlight = {
  id: string;
  title: string;
  date: string;
  image: string;
  linkTo?: string;   // optional — agar kisi event page pe link karna ho to uska slug yahan do
};

export const recentHighlights: RecentHighlight[] = [
  {
    id: "swachhata-abhiyan",
    title: "Swachhata Campaign Marks Community Spirit at Ghats and Localities",
    date: "1 October 2023",
    image: "/home/swachhata-abhiyan.jpeg",
    linkTo: "swachhata-abhiyan",
  },
  {
    id: "tree-plantation-saidpur",
    title: "Massive Tree Plantation Campaign Launched at Saidpur School Event",
    date: "22 May 2024",
    image: "/home/tr2.jpeg",
    linkTo: "tree-plantation-saidpur",
  },
  {
    id: "smart-devices-jangipur",
    title: "Empowering Students Through Smart Devices Distribution in Jangipur Assembly constituency",
    date: "22 November 2022",
    image: "/home/phone-d.jpeg",
    linkTo: "smart-devices-jangipur",
  },
];

export async function getRecentHighlights(): Promise<RecentHighlight[]> {
  return recentHighlights;
}