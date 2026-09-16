// src/app/robots.js
const siteUrl = "https://raspark.com"

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    }, 
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
