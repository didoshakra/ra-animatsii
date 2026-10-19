// components/Footer.js
import Image from "next/image"
import { getT } from "next-i18next/server"
import AdminStats from "@/components/AdminStats"
import { CONTACT_EMAIL as EMAIL, TELEGRAM_URL } from "@/lib/contacts"

// const EMAIL = "hello@raspark.com"
// const TELEGRAM_URL = "https://t.me/RomanDidoshak"

export default async function Footer() {
   const { t, i18n } = await getT("common")
   const privacyHref = i18n.language === "en" ? "/en/privacy" : "/privacy"
  return (
    // <footer className="bg-ink py-0 border-t border-cream/10">
    <footer className="bg-ink py-0 border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/RASpark_eagle.png" alt="RA Spark" width={32} height={32} className="rounded-full" />
            <span className="font-display font-700 text-cream">RA Spark</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-1">
            <a
              href={privacyHref}
              className="font-body text-cream/50 text-sm underline underline-offset-2 hover:text-cream transition-colors focus-ring"
            >
              {t("footer.privacy")}
            </a>
            <p className="font-body text-cream/50 text-sm">
              © {new Date().getFullYear()} RA Spark. {t("footer.rights")}
            </p>
          </div>
        </div>
        <AdminStats />
      </div>
    </footer>
  )
}
