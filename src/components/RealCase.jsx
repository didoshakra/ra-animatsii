import VideoCase from "./VideoCase"
import { getT } from "next-i18next/server"

export default async function RealCase() {
  const { t } = await getT("common")

  return (
    <section id="real-case" className="bg-meadow py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">
            {t("realCase.heading")}
          </h2>
          <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">{t("realCase.description")}</p>
        </div>

        <VideoCase />
      </div>
    </section>
  )
}
