const siteUrl = "https://www.raspark.com"

// export default function robots() {
//   return {
//     rules: {
//       userAgent: "*",
//       allow: "/",
//     },
//     sitemap: `${siteUrl}/sitemap.xml`,
//   }
// }
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  }
}
