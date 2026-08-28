import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ra-animatsii.vercel.app";

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
