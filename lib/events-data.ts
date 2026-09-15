export type EventItem = {
  id: string;              // URL slug: /events/[id]
  title: string;
  date: string;
  location: string;
  district: string;
  hindi: string;           // Hindi paragraph (khaali "" rakh sakte ho)
  english: string;         // English paragraph
  gallery: string[];       // 3-5 photos, media gallery ke liye
  image: string;           // card thumbnail + detail page hero image
  year: string;
  breadcrumbText?: string; // agar na do to title hi use hoga
};

export const eventsByYear: Record<string, EventItem[]> = {
  "2026": [],
  "2025": [
    {
      id: "ek-ped-maa-ke-naam",
      title: "EkPedMaaKeNaam",
      date: "Jul 9, 2025",
      location: "NANDGANJ, UP",
      district: "GHAZIPUR",
      hindi: "",
      english: `As part of the "EkPedMaaKeNaam" campaign, tree plantation was carried out today at the premises of Shri Pavhari Baba Temple in Kurtha and at Gramy Bharati PM Shikshalaya in Nandganj.

This initiative is not just a message of environmental conservation, but also a symbol of love and respect for our mothers.

Let us all come together and plant a tree in the name of our mothers!`,
      gallery: [
        "/events/ek-ped-maa-ke-naam/gallery-1.jpg",
        "/events/ek-ped-maa-ke-naam/gallery-2.jpg",
        "/events/ek-ped-maa-ke-naam/gallery-3.jpg",
        "/events/ek-ped-maa-ke-naam/gallery-4.jpg",
        "/events/ek-ped-maa-ke-naam/gallery-5.jpg",
      ],
      image: "/events/ek-ped-maa-ke-naam/card.jpg",
      year: "2025",
      breadcrumbText: "EkPedMaaKeNaam",
    },
    {
      id: "mann-ki-baat",
      title: "Mann ki Baat",
      date: "Sep 28, 2025",
      location: "Maharajganj",
      district: "Sadar",
      hindi: "",
      english: `We joined fellow BJP workers at Booth No. 139 in Maharajganj, Sadar Assembly, to listen to the 126th edition of the Hon'ble Prime Minister Shri Narendra Modi Ji's widely followed program, Mann Ki Baat.

In his inspiring address, the Prime Minister encouraged citizens to celebrate upcoming festivals by embracing indigenous products—reinforcing the spirit of "Vocal for Local."

This powerful message continues to resonate as a collective call towards self-reliance, inspiring communities across the nation to support local and strengthen India's journey towards an Atmanirbhar Bharat.

#ManKiBaat`,
      gallery: [
        "/events/mann-ki-baat/gallery-1.jpg",
        "/events/mann-ki-baat/gallery-2.jpg",
        "/events/mann-ki-baat/gallery-3.jpg",
        "/events/mann-ki-baat/gallery-4.jpg",
      ],
      image: "/events/mann-ki-baat/card.jpg",
      year: "2025",
      breadcrumbText: "Mann ki Baat",
    },
    {
      id: "pratibha-samman-samaroh",
      title: "Pratibha Samman Samaroh",
      date: "May 25, 2025",
      location: "Sikhdi, Jakhania",
      district: "Ghazipur",
      hindi: "",
      english: "Recognizing the importance of education and honoring the outperformers of the school. The event celebrated academic excellence and encouraged students to keep striving for their goals.",
      gallery: [
        "/events/pratibha-samman-samaroh/gallery-1.jpg",
        "/events/pratibha-samman-samaroh/gallery-2.jpg",
        "/events/pratibha-samman-samaroh/gallery-3.jpg",
      ],
      image: "/events/pratibha-samman-samaroh/card.jpg",
      year: "2025",
      breadcrumbText: "Pratibha Samman Samaroh",
    },
    {
      id: "swachhata-abhiyan",
      title: "Swachhata Abhiyan Drive",
      date: "Oct 1, 2023",
      location: "Ghazipur",
      district: "UP",
      hindi: "",
      english: "A community-driven cleanliness campaign covering ghats and local neighborhoods, reinforcing civic participation and public hygiene awareness across the region.",
      gallery: [
        "/events/swachhata-abhiyan/gallery-1.jpg",
        "/events/swachhata-abhiyan/gallery-2.jpg",
        "/events/swachhata-abhiyan/gallery-3.jpg",
      ],
      image: "/events/swachhata-abhiyan/card.jpg",
      year: "2025",
      breadcrumbText: "Swachhata Abhiyan Drive",
    },
    {
      id: "massive-health-camp",
      title: "Massive Health Camp",
      date: "May 22, 2024",
      location: "Saidpur",
      district: "Ghazipur",
      hindi: "",
      english: "Free health checkups and medicine distribution for the local community, with doctors and volunteers offering consultations to hundreds of residents.",
      gallery: [
        "/events/massive-health-camp/gallery-1.jpg",
        "/events/massive-health-camp/gallery-2.jpg",
        "/events/massive-health-camp/gallery-3.jpg",
      ],
      image: "/events/massive-health-camp/card.jpg",
      year: "2025",
      breadcrumbText: "Massive Health Camp",
    },
  ],
  "2024": [],
  "2023": [],
  "2022": [],
};

export async function getAllEvents(): Promise<EventItem[]> {
  return Object.values(eventsByYear).flat();
}

export function getAvailableYears(): string[] {
  return Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const all = await getAllEvents();
  return all.find((e) => e.id === slug) ?? null;
}