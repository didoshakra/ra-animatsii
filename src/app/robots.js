// src/app/robots.js
const siteUrl = "https://www.raspark.com"
// TODO: замінити siteUrl на "https://raspark.com", коли домен буде підключено до Vercel.

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
