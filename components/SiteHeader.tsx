"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWebsiteMenuRaw } from "@/app/data";

type MenuStyle = "normal" | "cta";

type WixMenuReference =
  | string
  | {
      _id?: string;
      id?: string;
    }
  | null;

type WixMenuItem = {
  _id: string;
  title?: string;
  label?: string;
  href?: string;
  parent?: WixMenuReference;
  enabled?: boolean;
  external?: boolean;
  newTab?: boolean;
  sortOrder?: number;
  style?: string;
};

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  parentId?: string;
  external: boolean;
  newTab: boolean;
  sortOrder: number;
  style: MenuStyle;
  children: MenuItem[];
};

type MenuRow = Omit<MenuItem, "children">;

const getParentId = (parent?: WixMenuReference): string | undefined => {
  if (!parent) return undefined;
  if (typeof parent === "string") return parent;
  return parent._id ?? parent.id;
};

const getMenuStyle = (
  style?: string,
  href?: string,
  label?: string
): MenuStyle => {
  const normalizedHref = href?.trim();
  const normalizedLabel = label?.trim().toLowerCase();

  if (normalizedHref === "/" || normalizedLabel === "home") {
    return "normal";
  }

  return style === "cta" ? "cta" : "normal";
};

const isHomeMenuItem = (item: Pick<MenuItem, "href" | "label">) => {
  const normalizedHref = item.href?.trim();
  const normalizedLabel = item.label.trim().toLowerCase();

  return normalizedHref === "/" || normalizedLabel === "home";
};

export default function SiteHeader({
  sticky = false,
}: {
  sticky?: boolean;
}) {
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setDesktopOpen(null);
    setMobileSubmenu(null);
  };

  useEffect(() => {
    let cancelled = false;

    const loadMenu = async () => {
      try {
        const result = await getWebsiteMenuRaw();
        const wixItems = result.items as WixMenuItem[];

        const rows: MenuRow[] = wixItems
          .filter((item) => item.enabled !== false)
          .map((item) => ({
            id: item._id,
            label: item.label ?? item.title ?? "",
            href: item.href || undefined,
            parentId: getParentId(item.parent),
            external: item.external === true,
            newTab: item.newTab === true,
            sortOrder: Number(item.sortOrder) || 0,
            style: getMenuStyle(item.style, item.href, item.label ?? item.title),
          }))
          .filter((item) => item.id.length > 0 && item.label.length > 0);

        const map = new Map<string, MenuItem>();

        rows.forEach((row) => {
          map.set(row.id, {
            ...row,
            children: [],
          });
        });

        const roots: MenuItem[] = [];

        rows.forEach((row) => {
          const item = map.get(row.id);
          if (!item) return;

          if (row.parentId) {
            const parent = map.get(row.parentId);

            if (parent) {
              parent.children.push(item);
              return;
            }
          }

          roots.push(item);
        });

        const sortTree = (items: MenuItem[]) => {
          items.sort((a, b) => a.sortOrder - b.sortOrder);
          items.forEach((item) => sortTree(item.children));
        };

        sortTree(roots);

        if (!cancelled) {
          setMenuItems(roots);
        }
      } catch (error) {
        console.error("Failed to load Wix menu:", error);

        if (!cancelled) {
          setMenuItems([]);
        }
      }
    };

    void loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  const isActive = (item: MenuItem): boolean => {
    if (item.href === "/") return pathname === "/";

    if (
      item.href &&
      item.href.startsWith("/") &&
      pathname.startsWith(item.href)
    ) {
      return true;
    }

    return item.children.some(isActive);
  };

  const renderLink = (
    item: MenuItem,
    mobile = false,
    dropdown = false
  ) => {
    const active = isActive(item);

    let className: string;

    if (item.style === "cta" && !isHomeMenuItem(item)) {
      className = mobile
        ? "my-2 block w-fit rounded-full bg-[#EA8023] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#BBA7FA]"
        : "rounded-full bg-[#EA8023] px-6 py-2.5 text-white transition-colors hover:bg-[#BBA7FA]";
    } else if (dropdown) {
      className = `block rounded-lg px-4 py-3 text-sm transition-colors ${
        active
          ? "bg-orange-50 text-[#EA8023]"
          : "text-gray-700 hover:bg-orange-50 hover:text-[#EA8023]"
      }`;
    } else if (mobile) {
      className = `block flex-1 py-4 text-[16px] font-medium ${
        active ? "text-[#EA8023]" : "text-gray-800"
      }`;
    } else {
      className = `text-[16px] font-medium transition-colors ${
        active
          ? "text-[#EA8023]"
          : "text-gray-800 hover:text-[#EA8023]"
      }`;
    }

    if (!item.href) {
      return <span className={className}>{item.label}</span>;
    }

    if (item.external) {
      return (
        <a
          href={item.href}
          target={item.newTab ? "_blank" : undefined}
          rel={item.newTab ? "noopener noreferrer" : undefined}
          onClick={closeMenus}
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        target={item.newTab ? "_blank" : undefined}
        onClick={closeMenus}
        className={className}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      className={`border-b border-gray-100 bg-white/95 backdrop-blur-md ${
        sticky ? "sticky top-0 z-50" : "relative z-50"
      }`}
    >
      <div className="mx-auto flex h-[80px] w-full items-center justify-between px-6 lg:px-50">
        <Link
          href="/"
          aria-label="Home"
          onClick={closeMenus}
          className="relative z-50 flex items-center"
        >
          <Image
            src="/home/logo.png"
            alt="Logo"
            width={90}
            height={90}
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden h-full items-center gap-8 md:flex">
          {menuItems.map((item) => {
            const hasChildren = item.children.length > 0;
            const open = desktopOpen === item.id;

            return (
              <div
                key={item.id}
                className="relative flex h-full items-center"
                onMouseEnter={() =>
                  hasChildren && setDesktopOpen(item.id)
                }
                onMouseLeave={() =>
                  hasChildren && setDesktopOpen(null)
                }
              >
                <div className="flex items-center gap-1">
                  {renderLink(item)}

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopOpen(open ? null : item.id)
                      }
                      aria-label={`Toggle ${item.label} menu`}
                      aria-expanded={open}
                      className="flex h-7 w-7 items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    className={`absolute left-1/2 top-full min-w-[220px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white p-2 shadow-xl transition-all duration-200 ${
                      open
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <div key={child.id}>
                        {renderLink(child, false, true)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* MOBILE BUTTON */}
        {menuItems.length > 0 && (
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <div className="flex w-6 flex-col gap-[5px]">
              <span
                className={`h-[2px] w-full bg-gray-800 transition-all duration-300 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-gray-800 transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-gray-800 transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        )}
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute left-0 right-0 top-[80px] overflow-hidden bg-white shadow-xl transition-all duration-300 md:hidden ${
          mobileOpen
            ? "visible max-h-[calc(100vh-80px)] border-t border-gray-100 opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav className="max-h-[calc(100vh-80px)] overflow-y-auto px-6 py-4">
          {menuItems.map((item) => {
            const hasChildren = item.children.length > 0;
            const expanded = mobileSubmenu === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between">
                  {renderLink(item, true)}

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSubmenu(expanded ? null : item.id)
                      }
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={expanded}
                      className="flex h-10 w-10 items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-5 w-5 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    className={`grid transition-all duration-300 ${
                      expanded
                        ? "grid-rows-[1fr] pb-3"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-3 border-l-2 border-orange-100 pl-4">
                        {item.children.map((child) => (
                          <div key={child.id}>
                            {renderLink(child, true)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}