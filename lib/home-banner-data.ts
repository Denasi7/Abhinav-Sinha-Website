export type HomeBanner = {
  id: string;
  title: string;
  image: string; // desktop photo
  mobileImage?: string; // phone ke liye alag photo (na do to 'image' hi use hogi)
  description: string;
  date: string;
  location: string;
  textPosition?: "left" | "center" | "right"; // sirf DESKTOP pe apply hota hai
};

export const homeBanners: HomeBanner[] = [
  {
    id: "pratibha-samman-samaroh",
    title: "Pratibha Samman Samaroh",
    image: "/home/banner-1.jpg",
    mobileImage: "/home/banner-1-mobile.jpg",
    description:
      "Recognizing the importance of education and honoring the outperformers of the school.",
    date: "May 25, 2025",
    location: "Pt. Madan Mohan Malaviya Inter College, Sikhdi, Jakhania",
    textPosition: "left",
  },
  {
    id: "shri-ram-katha",
    title: "Shri Ram Katha",
    image: "/home/banner-2.png",
    mobileImage: "/home/banner-2-mobile.png",
    description:
      "Experiencing the divine narration of Lord Shri Ram's life, values, and the timeless message of dharma in the presence of thousands of devotees.",
    date: "July 10, 2025",
    location: "Lanka Maidan, Ghazipur, Uttar Pradesh",
    textPosition: "right",
  },
  {
    id: "ek-ped-maa-ke-naam",
    title: "EkPedMaaKeNaam",
    image: "/home/banner-3.png",
    mobileImage: "/home/banner-3-mobile.png",
    description:
      "A meaningful tree plantation drive promoting environmental conservation while honoring the unconditional love and sacrifices of our mothers.",
    date: "Jul 9, 2025",
    location: "Nandganj, Ghazipur, Uttar Pradesh",
    textPosition: "left",
  },
];

export async function getHomeBanners(): Promise<HomeBanner[]> {
  return homeBanners;
}
