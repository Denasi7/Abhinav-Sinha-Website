import { wixClient } from "@/lib/wix";

export async function getHomeBannersRaw() {
  const result = await wixClient.items
    .query("HomeBanner")
    .find();

  console.log("WIX HOME BANNERS:", result);

  return result;
}