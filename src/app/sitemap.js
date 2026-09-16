// src/app/sitemap.js
const siteUrl = "https://ra-animatsii.vercel.app"
// TODO: замінити siteUrl на "https://raspark.com", коли домен буде підключено до Vercel.

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          uk: siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          uk: siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
  ]
}
