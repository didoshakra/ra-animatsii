// src/lib/pages.js
// Єдиний список сторінок: з нього беруться маршрути, посилання й sitemap.

// Оновлюйте дату вручну, коли реально змінили контент сайту
export const SITE_LAST_UPDATE = "2026-10-15"

// key = ключ у portfolio.formats, tier = ключ у pricing.tiers
export const FORMATS = [
  { slug: "short-ad", key: "short", tier: "base", formId: "short_advertisement" },
  { slug: "ad-video", key: "ad", tier: "standard", formId: "commercial" },
  { slug: "brand-video", key: "brand", tier: "premium", formId: "brand_card" },
  { slug: "story-video", key: "story", tier: "premium", formId: "video_story" },
]

// page: true = окрема сторінка /examples/<slug>. Потрібен запис у content.js (niches).
export const NICHES = [
  { slug: "bakery", page: true },
  { slug: "pet-store", page: true },
  { slug: "salon", page: true },
  { slug: "grocery", page: true },
  { slug: "pool", page: true },
  { slug: "cafe", page: false },
  { slug: "furniture", page: false },
  { slug: "stock", page: false },
]

export function allPaths() {
  return [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.8 },
    ...FORMATS.map((f) => ({ path: `/services/${f.slug}`, priority: 0.8 })),
    { path: "/examples", priority: 0.7 },
    ...NICHES.filter((n) => n.page).map((n) => ({ path: `/examples/${n.slug}`, priority: 0.6 })),
  ]
}
