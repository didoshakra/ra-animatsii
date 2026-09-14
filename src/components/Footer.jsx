import Image from "next/image"
import { getT } from "next-i18next/server"

export default async function Footer() {
  const { t } = await getT("common")

  return (
    <footer className="bg-ink py-8 border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image src="/brand/RASparks_eagle.png" alt="RASparks" width={32} height={32} className="rounded-full" />
          <span className="font-display font-700 text-cream">RASparks</span>
        </div>
        <p className="font-body text-cream/50 text-sm">
          © {new Date().getFullYear()} RASparks. {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
