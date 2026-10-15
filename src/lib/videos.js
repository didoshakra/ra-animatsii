// src/lib/videos.js
// Єдине джерело структурних даних про ролики.
// Тексти (title, desc) і videoUrl лишаються в public/locales/*/common.json:
//   from: "formats" -> portfolio.formats.<key>
//   from: "cases"   -> realCase.cases.<key>
// niche / format потрібні для сторінок /examples/<niche> і /services/<format> (етап 2).

export const VIDEOS = [
  // --- блок «Формати» ---
  {
    id: "rodyna",
    from: "formats",
    key: "short",
    niche: "bakery",
    format: "short",
    aspect: "9:16",
    durationSeconds: 16,
    name: { uk: "Пекарня «Родина»", en: "Rodyna Bakery" },
  },
  {
    id: "hvostyky",
    from: "formats",
    key: "ad",
    niche: "pet-store",
    format: "ad",
    aspect: "9:16",
    durationSeconds: 27,
    name: { uk: "Зоомагазин «Хвостики»", en: "Pet shop «Khvostyky»" },
  },
  {
    id: "wood",
    from: "formats",
    key: "brand",
    niche: "furniture",
    format: "brand",
    aspect: "9:16",
    durationSeconds: 35,
    name: { uk: "Меблі «Wood»", en: "Furniture «Wood»" },
  },
  {
    id: "pekari",
    from: "formats",
    key: "story",
    niche: "cafe",
    format: "story",
    aspect: "9:16",
    durationSeconds: 34,
    name: { uk: "Кав'ярня «Pekari»", en: "Café «Pekari»" },
  },
  // --- блок «Приклади» ---
  {
    id: "four-paws",
    from: "cases",
    key: "case1",
    niche: "pet-store",
    format: "ad",
    aspect: "16:9",
    durationSeconds: 19,
  },
  {
    id: "sunflower",
    from: "cases",
    key: "case2",
    niche: "salon",
    format: "short",
    aspect: "9:16",
    durationSeconds: 17,
  }, // ? формат
  {
    id: "stock-100ok",
    from: "cases",
    key: "case3",
    niche: "stock",
    format: "short",
    aspect: "9:16",
    durationSeconds: 8,
  }, // ? формат
  {
    id: "rodyna-2",
    from: "cases",
    key: "case4",
    niche: "bakery",
    format: "short",
    aspect: "9:16",
    durationSeconds: 18,
  },
  { id: "produkty", from: "cases", key: "case5", niche: "grocery", format: "ad", aspect: "9:16", durationSeconds: 23 }, // ? формат
  { id: "poseidon", from: "cases", key: "case6", niche: "pool", format: "short", aspect: "9:16", durationSeconds: 18 }, // ? формат
]

export function videosFrom(group) {
  return VIDEOS.filter((v) => v.from === group)
}

// 19 -> "0:19", 75 -> "1:15"
export function formatRuntime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}
