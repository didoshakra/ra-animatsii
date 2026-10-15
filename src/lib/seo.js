// src/lib/seo.js
import { siteUrl } from "./site"

// uk без префікса, en з /en
export function localizedPath(lng, path = "") {
  if (lng === "en") return `/en${path}`
  return path || "/"
}

export function absoluteUrl(lng, path = "") {
  return lng === "en" ? `${siteUrl}/en${path}` : `${siteUrl}${path}`
}

export function alternatesFor(lng, path = "") {
  return {
    canonical: absoluteUrl(lng, path),
    languages: {
      uk: absoluteUrl("uk", path),
      en: absoluteUrl("en", path),
      "x-default": absoluteUrl("uk", path),
    },
  }
}

// Метадані підсторінки. Перекриває alternates/openGraph з layout.jsx.
export function pageMetadata({ lng, path = "", title, description }) {
  const url = absoluteUrl(lng, path)
  return {
    title,
    description,
    alternates: alternatesFor(lng, path),
    openGraph: {
      title,
      description,
      url,
      siteName: "RASpark",
      images: [{ url: "/brand/og-image.jpg", width: 1424, height: 752 }],
      locale: lng === "en" ? "en_US" : "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/og-image.jpg"],
    },
  }
}
