// src/app/robots.js
const siteUrl = "https://raspark.com"

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
