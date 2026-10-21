// src/lib/videos.js
// Єдине джерело структурних даних про ролики (без текстів).
// Тексти (title, clientName, label) і videoUrl лежать у public/locales/*/common.json:
//   from: "formats" -> portfolio.formats.<key>
//   from: "cases"   -> realCase.cases.<key>
// format = ключ формату з FORMATS у lib/pages.js (short | ad | brand | story).
// Підпис формату на картках береться з portfolio.formats.<format>.label, тому розбіжностей не буде.

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
  },
  { id: "hvostyky", from: "formats", key: "ad", niche: "pet-store", format: "ad", aspect: "9:16", durationSeconds: 27 },
  {
    id: "wood",
    from: "formats",
    key: "brand",
    niche: "furniture",
    format: "brand",
    aspect: "16:9",
    durationSeconds: 35,
  },
  { id: "pekari", from: "formats", key: "story", niche: "cafe", format: "story", aspect: "9:16", durationSeconds: 34 },
  // --- блок «Приклади» ---
  {
    id: "four-paws",
    from: "cases",
    key: "case1",
    niche: "pet-store",
    format: "short",
    aspect: "16:9",
    durationSeconds: 19,
  },
  { id: "sunflower", from: "cases", key: "case2", niche: "salon", format: "ad", aspect: "9:16", durationSeconds: 17 },
  {
    id: "stock-100ok",
    from: "cases",
    key: "case3",
    niche: "stock",
    format: "short",
    aspect: "9:16",
    durationSeconds: 8,
  },
  {
    id: "rodyna-2",
    from: "cases",
    key: "case4",
    niche: "bakery",
    format: "short",
    aspect: "9:16",
    durationSeconds: 18,
  },
  { id: "produkty", from: "cases", key: "case5", niche: "grocery", format: "ad", aspect: "9:16", durationSeconds: 23 },
  { id: "poseidon", from: "cases", key: "case6", niche: "pool", format: "short", aspect: "9:16", durationSeconds: 18 },
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
