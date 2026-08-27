import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RA Анімації — мультяшна реклама для вашого бізнесу",
  description:
    "Студія RA Анімації створює теплі мультяшні відеоролики, які пояснюють, продають і запам'ятовуються. Розкажемо історію вашого бізнесу мовою анімації.",
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
