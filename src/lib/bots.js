// lib/bots.js
// Явні боти, сканери та нереалістичні (застарілі/підроблені) User-Agent.
// Такі візити не пишемо в базу взагалі.
const BOT_RE =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|curl|wget|python-requests|GoogleOther|Dataprovider|compatible;|Edge\/\d|MSIE|Trident\/|Chrome\/\d{1,2}\./i

export function isBot(ua) {
  return !ua || BOT_RE.test(ua)
}
