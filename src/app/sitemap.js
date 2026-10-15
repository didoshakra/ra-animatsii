// src/app/sitemap.js
import { allPaths, SITE_LAST_UPDATE } from "@/lib/pages"
import { absoluteUrl, alternatesFor } from "@/lib/seo"

export default function sitemap() {
  const lastModified = new Date(SITE_LAST_UPDATE)
  return allPaths().flatMap(({ path, priority }) =>
    ["uk", "en"].map((lng) => ({
      url: absoluteUrl(lng, path),
      lastModified,
      changeFrequency: "weekly",
      priority,
      alternates: { languages: alternatesFor(lng, path).languages },
    })),
  )
}
