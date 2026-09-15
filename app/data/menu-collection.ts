import { wixClient } from "@/lib/wix";

export async function getWebsiteMenuRaw() {
  const result = await wixClient.items
    .query("WebsiteMenu")
    .ascending("sortOrder")
    .find();

  console.log("WIX WEBSITE MENU:", result);
  return result;
}

export async function getEventYearsRaw() {
  return wixClient.items
    .query("Years")
    .eq("enabledForEventPage", true)
    .descending("year")
    .find();
}

export async function getNewsYearsRaw() {
  return wixClient.items
    .query("Years")
    .eq("enableForNewsAndPressPage", true)
    .descending("year")
    .find();
}

export async function getEventsRaw() {
  const result = await wixClient.items
    .query("Events")
    .eq("enabled", true)
    .descending("date")
    .find();

  console.log("WIX EVENTS:", result);
  return result;
}

export async function getNewsPressRaw() {
  const result = await wixClient.items
    .query("NewsPress")
    .eq("enabled", true)
    .descending("date")
    .find();

  console.log("WIX NEWS PRESS:", result);
  return result;
}

function normalizeSlug(value?: string, prefix?: string) {
  const decoded = decodeURIComponent((value ?? "").trim())
    .replace(/^\/+|\/+$/g, "");

  if (!decoded) return "";
  if (!prefix) return decoded;

  return decoded
    .replace(new RegExp(`^${prefix}/+`, "i"), "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/+$/g, "");
}

function slugMatches(value: unknown, candidate: string) {
  if (value == null) return false;

  const normalizedCandidate = normalizeSlug(candidate).toLowerCase();
  const variants = new Set<string>([
    normalizeSlug(String(value)).toLowerCase(),
    normalizeSlug(String(value), "events").toLowerCase(),
    normalizeSlug(String(value), "news").toLowerCase(),
    normalizeSlug(String(value), "news-press").toLowerCase(),
    `/${normalizeSlug(String(value)).toLowerCase()}`,
    `${normalizeSlug(String(value)).toLowerCase()}/`,
    `/${normalizeSlug(String(value), "events").toLowerCase()}`,
    `/${normalizeSlug(String(value), "news").toLowerCase()}`,
    `/${normalizeSlug(String(value), "news-press").toLowerCase()}`,
  ]);

  return variants.has(normalizedCandidate) || variants.has(`/${normalizedCandidate}`) || variants.has(`${normalizedCandidate}/`);
}

export async function getEventBySlugRaw(slug: string) {
  const normalized = normalizeSlug(slug, "events");
  if (!normalized) return null;

  const candidates = Array.from(
    new Set([
      normalized,
      `/${normalized}`,
      `/events/${normalized}`,
      `events/${normalized}`,
      `/${normalized}/`,
      normalized.replace(/^events\//i, ""),
    ])
  );

  for (const candidate of candidates) {
    const result = await wixClient.items
      .query("Events")
      .eq("enabled", true)
      .limit(200)
      .find();

    const match = result.items.find((item: any) => {
      const values = [item.slug, item.url, item.urlSlug, item.seoUrl, item.path, item.permalink, item._id];
      return values.some((value) => slugMatches(value, candidate));
    });

    if (match) return match;
  }

  const fallbackById = await wixClient.items
    .query("Events")
    .eq("enabled", true)
    .eq("_id", normalized)
    .limit(1)
    .find();

  return fallbackById.items[0] ?? null;
}

export async function getNewsPressBySlugRaw(slug: string) {
  const normalized = normalizeSlug(slug, "news");
  if (!normalized) return null;

  const candidates = Array.from(
    new Set([
      normalized,
      `/${normalized}`,
      `/news/${normalized}`,
      `news/${normalized}`,
      `/news-press/${normalized}`,
      `news-press/${normalized}`,
      `/${normalized}/`,
      normalized.replace(/^news\//i, "").replace(/^news-press\//i, ""),
    ])
  );

  for (const candidate of candidates) {
    const result = await wixClient.items
      .query("NewsPress")
      .eq("enabled", true)
      .limit(200)
      .find();

    const match = result.items.find((item: any) => {
      const values = [item.slug, item.url, item.urlSlug, item.seoUrl, item.path, item.permalink, item._id, item.title];
      return values.some((value) => slugMatches(value, candidate));
    });

    if (match) return match;
  }

  const fallbackById = await wixClient.items
    .query("NewsPress")
    .eq("enabled", true)
    .eq("_id", normalized)
    .limit(1)
    .find();

  return fallbackById.items[0] ?? null;
}