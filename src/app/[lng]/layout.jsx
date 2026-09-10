// src/app/[lng]/layout.jsx
import { initServerI18next, getT, getResources, generateI18nStaticParams } from "next-i18next/server"
import { I18nProvider } from "next-i18next/client"
import i18nConfig from "../../../i18n.config"
import "../globals.css"

const siteUrl = "https://ra-animatsii.vercel.app"

// TODO (наступний крок): локалізувати metadata через generateMetadata(),
// поки що лишаємо український текст як є.
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "RA Анімації — мультяшна реклама для вашого бізнесу",
  description:
    "Студія RA Анімації створює теплі мультяшні відеоролики, які пояснюють, продають і запам'ятовуються. Розкажемо історію вашого бізнесу мовою анімації.",
  openGraph: {
    title: "RA Анімації — мультяшна реклама для вашого бізнесу",
    description:
      "Малюємо теплі, живі відеоролики, які пояснюють складне просто і запам'ятовуються надовго.",
    url: siteUrl,
    siteName: "RA Анімації",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1424,
        height: 752,
        alt: "RA Анімації — реклама для бізнесу",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RA Анімації — мультяшна реклама для вашого бізнесу",
    description:
      "Малюємо теплі, живі відеоролики, які пояснюють складне просто і запам'ятовуються надовго.",
    images: ["/brand/og-image.jpg"],
  },
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
        <I18nProvider fallbackLanguage={i18nConfig.fallbackLng} language={lng} resources={resources}>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
