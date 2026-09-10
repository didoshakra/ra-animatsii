// i18n.config.js
// Конфігурація next-i18next для App Router (Next.js 16).
// uk — дефолтна локаль, схована з URL (сайт лишається на "/").
// en — з префіксом "/en".

const i18nConfig = {
  supportedLngs: ["uk", "en"],
  fallbackLng: "uk",
  defaultNS: "common",
  ns: ["common"],
  hideDefaultLocale: true,
}

module.exports = i18nConfig
