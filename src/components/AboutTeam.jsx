//// src/components/AboutTeam.jsx // Команда персонажів на вашому боці
import Image from "next/image"
import { getT } from "next-i18next/server"

export default async function AboutTeam() {
  const { t } = await getT("common")

  return (
    // <section className="bg-cream py-14 sm:py-20">
    <section className="bg-sky-200 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl leading-tight">{t("aboutTeam.title")}</h2>
          <p className="mt-3 sm:mt-4 font-body text-base sm:text-lg text-ink/75 leading-relaxed">
            {t("aboutTeam.description")}
          </p>
        </div>

        <div className="mt-6 sm:mt-10 rounded-3xl overflow-hidden shadow-[0_8px_0_0_theme(colors.clay.deep)]">
          <Image
            src="/brand/og-image.jpg"
            alt={t("aboutTeam.imageAlt")}
            width={1424}
            height={752}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}
