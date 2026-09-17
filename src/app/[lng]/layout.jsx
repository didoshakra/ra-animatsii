// src/app/[lng]/layout.jsx
import { initServerI18next, getT, getResources, generateI18nStaticParams } from "next-i18next/server"
import { I18nProvider } from "next-i18next/client"
import i18nConfig from "../../../i18n.config"
import StructuredData from "@/components/StructuredData"
import "../globals.css"

const siteUrl = "https://raspark.com"

export async function generateMetadata({ params }) {
  const { lng } = await params
  const { t } = await getT("common")

  const title = t("metadata.title")
  const description = t("metadata.description")
  const ogDescription = t("metadata.ogDescription")
  const ogImageAlt = t("metadata.ogImageAlt")

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: lng === "en" ? `${siteUrl}/en` : siteUrl,
      languages: {
        "uk-UA": siteUrl,
        "en-US": `${siteUrl}/en`,
      },
    },
    openGraph: {
      title,
      description: ogDescription,
      url: lng === "en" ? `${siteUrl}/en` : siteUrl,
      siteName: "RASpark",
      images: [
        {
          url: "/brand/og-image.jpg",
          width: 1424,
          height: 752,
          alt: ogImageAlt,
        },
      ],
      locale: lng === "en" ? "en_US" : "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
      images: ["/brand/og-image.jpg"],
    },
  }
}

initServerI18next(i18nConfig)

export async function generateStaticParams() {
  return generateI18nStaticParams()
}

export default async function RootLayout({ children, params }) {
  const { lng } = await params
  const { i18n } = await getT()

  if (process.env.NODE_ENV === "development") {
    await i18n.reloadResources(i18nConfig.supportedLngs, i18nConfig.ns)
  }

  const resources = getResources(i18n)

  return (
    <html lang={lng}>
      <body className="font-body antialiased">
        <StructuredData />
        <I18nProvider fallbackLanguage={i18nConfig.fallbackLng} language={lng} resources={resources}>
          {children}
        </I18nProvider>
      </body>   
    </html>
  )
}
