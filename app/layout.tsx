import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Abhinav Sinha",
  description: "Seva . Vikas . Vishwas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteHeader sticky />

        <main className="flex-1">
          {children}
        </main>

        <SiteFooter />

        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}