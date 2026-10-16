import { toCdnUrl } from "../src/utils/urls.js";

console.log("🧪 Testing toCdnUrl...\n");

let passed = 0;
let failed = 0;

function assertEqual(actual: string, expected: string, msg: string) {
  if (actual === expected) {
    console.log(`✅ ${msg}`);
    passed++;
  } else {
    console.error(`❌ ${msg}`);
    console.error(`   Expected: ${expected}`);
    console.error(`   Actual:   ${actual}`);
    failed++;
  }
}

// Test 1: Convert Supabase storage URL to Bytescale CDN URL
const supabaseUrl =
  "https://ujasntkfphywizsdaapi.supabase.co/storage/v1/object/public/content/app_screens/a26a98d0-38aa-46ad-811e-30964686f5a3.png";
const expectedCdnUrl =
  "https://bytescale.mobbin.com/FW25bBB/image/mobbin.com/prod/content/app_screens/a26a98d0-38aa-46ad-811e-30964686f5a3.png?f=webp&w=1920&q=85&fit=shrink-cover";

assertEqual(
  toCdnUrl(supabaseUrl),
  expectedCdnUrl,
  "toCdnUrl converts Supabase storage URL to public Bytescale CDN URL",
);

// Test 2: Preserve existing Bytescale CDN URL
const existingCdnUrl =
  "https://bytescale.mobbin.com/FW25bBB/image/mobbin.com/prod/content/app_screens/sample.png?f=webp&w=1920&q=85&fit=shrink-cover";
assertEqual(
  toCdnUrl(existingCdnUrl),
  existingCdnUrl,
  "toCdnUrl leaves Bytescale CDN URLs untouched",
);

// Test 3: Handle empty or non-URL string safely
assertEqual(toCdnUrl(""), "", "toCdnUrl handles empty string");
assertEqual(toCdnUrl("invalid-url"), "invalid-url", "toCdnUrl handles malformed string safely");

if (failed > 0) {
  console.error(`\n❌ ${failed} tests failed.`);
  process.exit(1);
} else {
  console.log(`\n🎉 All ${passed} tests passed!`);
}
