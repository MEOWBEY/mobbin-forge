import { BYTESCALE_CDN_BASE, SUPABASE_STORAGE_PREFIX } from "../constants.js";

/**
 * Convert a Supabase storage URL to its public Bytescale CDN equivalent.
 * Supabase storage URLs are private and return 404/NoSuchBucket when opened in a browser.
 *
 * Input:  https://ujasntkfphywizsdaapi.supabase.co/storage/v1/object/public/content/app_screens/{uuid}.png
 * Output: https://bytescale.mobbin.com/FW25bBB/image/mobbin.com/prod/content/app_screens/{uuid}.png?f=webp&w=1920&q=85&fit=shrink-cover
 */
export function toCdnUrl(imageUrl: string): string {
  if (!imageUrl) return "";

  try {
    const parsed = new URL(imageUrl);

    // Already a CDN URL — use as-is
    if (parsed.hostname === "bytescale.mobbin.com") {
      return imageUrl;
    }

    // Convert Supabase storage URL to CDN URL
    const storageIdx = parsed.pathname.indexOf(SUPABASE_STORAGE_PREFIX);
    if (storageIdx !== -1) {
      const storagePath = parsed.pathname.slice(storageIdx + SUPABASE_STORAGE_PREFIX.length);
      return `${BYTESCALE_CDN_BASE}/${storagePath}?f=webp&w=1920&q=85&fit=shrink-cover`;
    }

    return imageUrl;
  } catch {
    return imageUrl;
  }
}
