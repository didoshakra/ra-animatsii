// src/app/robots.js
import { siteUrl } from "@/lib/site"

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/en/admin", "/uk/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
