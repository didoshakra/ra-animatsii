import Image from "next/image"
import { getT } from "next-i18next/server"
import AdminStats from "@/components/AdminStats"

const EMAIL = "hello@raspark.com"
const TELEGRAM_URL = "https://t.me/RomanDidoshak"

export default async function Footer() {
  const { t } = await getT("common")

  return (
    <footer className="bg-ink py-8 border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 ">
          <p className="font-body text-cream/70 text-sm">{t("footer.contactTitle")}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${EMAIL}`}
              className="font-body text-cream text-sm hover:text-clay transition-colors focus-ring"
            >
              {EMAIL}
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-cream text-sm hover:text-clay transition-colors focus-ring"
            >
              {t("footer.telegram")}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-cream/10 ">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/RASpark_eagle.png" alt="RA Spark" width={32} height={32} className="rounded-full" />
            <span className="font-display font-700 text-cream">RA Spark</span>
          </div>
          <p className="font-body text-cream/50 text-sm">
            © {new Date().getFullYear()} RA Spark. {t("footer.rights")}
          </p>
        </div>

        <AdminStats />
      </div>
    </footer>
  )
}
