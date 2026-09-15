import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/abhinavsinha_bjp/",
    icon: <FaInstagram />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/AbhinavSinhaUP",
    icon: <FaFacebookF />,
  },
  {
    label: "X",
    href: "https://x.com/abhinavsinhabjp",
    icon: <FaXTwitter />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhinav-sinha-7738561a/",
    icon: <FaLinkedinIn />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bjpsinha",
    icon: <FaYoutube />,
  },
];

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#F0DDCB] text-[#20202A]">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:py-16">
        {/* Desktop / Mobile Main Content */}
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1.1fr_1fr_1.5fr_1.3fr] lg:items-start lg:gap-12">
          {/* Logo */}
          <div className="flex lg:flex-col gap-5 lg:gap-0 items-center">
            <Link href="/" className="inline-block">
              <img
                src="/home/logo.png"
                alt="Abhinav Sinha"
                width={125}
                height={125}
                className="h-auto w-[105px] sm:w-[115px] lg:w-[125px]"
              />
            </Link>

            <p className="mt-1 text-[20px] font-bold tracking-wide text-[#20202A] sm:text-[21px]">
              ABHINAV SINHA
            </p>
          </div>

          {/* Mobile: Menu + Contact together */}
          <div className="grid grid-cols-2 gap-4 lg:contents">
            {/* Menu */}
            <div>
              <p className="text-[15px] font-extrabold tracking-wide text-[#20202A]">
                MENU
              </p>

              <ul className="mt-5 space-y-3 text-[15px] text-[#20202A]">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-orange-600"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/events"
                    className="transition-colors hover:text-orange-600"
                  >
                    Events
                  </Link>
                </li>

                <li>
                  <Link
                    href="/news"
                    className="transition-colors hover:text-orange-600"
                  >
                    News &amp; Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[15px] font-extrabold tracking-wide text-[#20202A]">
                CONTACT
              </p>

              <ul className="mt-5 space-y-3 text-[12px] lg:text-[15px] leading-relaxed text-[#20202A] sm:text-[16px]">
                <li>8448 555 555</li>
                <li className="break-all">asinha.bjp@gmail.com</li>
                <li>Shastri Nagar, Ghazipur, UP</li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 lg:justify-end lg:pt-14">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[21px] text-white transition-transform duration-200 hover:scale-105"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
