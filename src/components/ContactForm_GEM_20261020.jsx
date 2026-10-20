//_GEM_20261020// src/components/ContactForm.jsx
"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useT } from "next-i18next/client"
import { getAttribution } from "@/lib/attribution"
import { parseContact } from "@/lib/contact"
import { CONTACT_EMAIL, TELEGRAM_URL } from "@/lib/contacts"

// ID мають збігатися з formId у pages.js і formatId у Pricing.jsx
const FORMATS = [{ id: "short_advertisement" }, { id: "commercial" }, { id: "brand_card" }, { id: "video_story" }]

const labelCls = "font-body font-bold text-sm text-cream block mb-0.5"
const optionalCls = "font-400 text-cream/60 text-xs"
const fieldCls =
  "w-full rounded-xl border-2 bg-cream/5 text-cream px-3.5 py-2 font-body text-base focus-ring placeholder:text-cream/50"
const directBtnCls =
  "flex items-center justify-center rounded-full px-5 py-3 font-body font-bold text-base transition-colors focus-ring"

function ContactFormInner() {
  const { t, i18n } = useT("common")
  const searchParams = useSearchParams()
  const presetFormat = searchParams.get("format")
  const initialFormat = FORMATS.some((f) => f.id === presetFormat) ? presetFormat : null

  const [status, setStatus] = useState("idle")
  const [format, setFormat] = useState(initialFormat)
  const [source, setSource] = useState("")
  const [moreOpen, setMoreOpen] = useState(false)
  const [contactError, setContactError] = useState("")
  const [serverError, setServerError] = useState("")
  const [contactInvalid, setContactInvalid] = useState(false)
  const [errorTick, setErrorTick] = useState(0)
  const errorRef = useRef(null)
  const [message, setMessage] = useState("")
  const messageRef = useRef("")
  const autoFilledRef = useRef(false) // true, якщо в полі лише наша автопідстановка

  // Кнопки на сторінках повідомляють, який формат обрати, звідки клік і що підставити в повідомлення
  useEffect(() => {
    const onSelect = (e) => {
      const d = e.detail
      const id = typeof d === "string" ? d : d?.formatId
      if (id && FORMATS.some((f) => f.id === id)) setFormat(id)
      if (d && typeof d === "object" && d.source) setSource(d.source)

      // Підставляємо лише в порожнє поле або поверх попередньої автопідстановки
      if (d && typeof d === "object" && d.prefill) {
        if (!messageRef.current.trim() || autoFilledRef.current) {
          messageRef.current = d.prefill
          autoFilledRef.current = true
          setMessage(d.prefill)
          setMoreOpen(true)
        }
      }
    }
    window.addEventListener("select-format", onSelect)
    return () => window.removeEventListener("select-format", onSelect)
  }, [])

  // Після кожної помилки прокручуємо до повідомлення над кнопкою
  useEffect(() => {
    if (errorTick > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [errorTick])

  const errorText = contactError || (status === "error" ? serverError || t("contactForm.errorMessage") : "")

  function bumpError() {
    setErrorTick((n) => n + 1)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)
    const rawName = String(data.get("name") || "").trim()
    const rawContact = String(data.get("contact") || "").trim()

    if (!rawName) {
      setContactError(t("contactForm.missingNameError"))
      form.querySelector("#name")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    if (!rawContact) {
      setContactError(t("contactForm.missingContactError"))
      setContactInvalid(true)
      form.querySelector("#contact")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    if (!parseContact(rawContact)) {
      setContactError(t("contactForm.invalidContactError"))
      setContactInvalid(true)
      form.querySelector("#contact")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    setContactError("")
    setContactInvalid(false)
    setServerError("")
    setStatus("sending")

    const payload = {
      name: rawName,
      contact: rawContact,
      message: String(data.get("message") || ""),
      format: format || undefined,
      company: String(data.get("company") || ""),
      lang: i18n.language,
      page: window.location.pathname,
      source,
      attribution: getAttribution(),
      website: String(data.get("website") || ""),
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const resJson = await res.json().catch(() => null)

      if (!res.ok) {
        setServerError(resJson?.error || t("contactForm.errorMessage"))
        setStatus("error")
        bumpError()
        return
      }

      setStatus("sent")
    } catch {
      setServerError(t("contactForm.errorMessage"))
      setStatus("error")
      bumpError()
    }
  }

  return (
    <section id="contact" className="bg-ink py-8 sm:py-10">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-extrabold text-cream text-2xl sm:text-3xl text-center">
          {t("contactForm.heading")}
        </h2>

        {status === "sent" ? (
          <div className="mt-3 bg-meadow text-cream rounded-3xl p-8 text-center font-body text-lg">
            {t("contactForm.successMessage")}
          </div>
        ) : (
          <>
            {/* Прямий зв'язок */}
            <div
              className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-3
            "
            >
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-bold text-sun text-xl sm:text-xl py-1 hover:text-sun-light hover:underline underline-offset-4 transition-colors focus-ring"
              >
                ✈️{t("contactForm.directTelegram")}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-body font-bold text-sun text-xl sm:text-2xl py-1 break-all hover:text-sun-light hover:underline underline-offset-4 transition-colors focus-ring"
              >
                📧{CONTACT_EMAIL}
              </a>
            </div>
            <h3 className="mt-8 font-display font-bold text-cream text-xl sm:text-xl text-center">
              {t("contactForm.orDivider")}
            </h3>
            {/* Коротка форма */}
            <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-3">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className={labelCls}>
                    {t("contactForm.nameLabel")}*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`${fieldCls} border-cream/20`}
                    placeholder={t("contactForm.namePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="contact" className={labelCls}>
                    {t("contactForm.contactLabel")}*
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    aria-invalid={contactInvalid}
                    onChange={() => contactInvalid && setContactInvalid(false)}
                    className={`${fieldCls} ${contactInvalid ? "border-red-400" : "border-cream/20"}`}
                    placeholder={t("contactForm.contactPlaceholder")}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-controls="contact-more"
                className="justify-self-start font-body font-bold text-sm text-sun hover:text-sun-light underline underline-offset-4 focus-ring"
              >
                {moreOpen
                  ? t("contactForm.lessToggle")
                  : `${t("contactForm.moreToggle")}${format ? ` · ${t(`contactForm.formats.${format}`)}` : ""}`}
              </button>

              {/* Розширена частина: лишається в DOM, щоб не губити введене при згортанні */}
              <div id="contact-more" className={moreOpen ? "grid gap-3" : "hidden"}>
                <div>
                  <label htmlFor="company" className={labelCls}>
                    {t("contactForm.companyLabel")}{" "}
                    <span className={optionalCls}>{t("contactForm.companyOptional")}</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={`${fieldCls} border-cream/20`}
                    placeholder={t("contactForm.companyPlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="format" className={labelCls}>
                    {t("contactForm.formatsLabel")}{" "}
                    <span className={optionalCls}>{t("contactForm.formatsOptional")}</span>
                  </label>
                  <select
                    id="format"
                    name="format"
                    value={format ?? ""}
                    onChange={(e) => setFormat(e.target.value || null)}
                    style={{ colorScheme: "dark" }}
                    className={`${fieldCls} border-cream/20`}
                  >
                    <option value="" className="bg-ink text-cream">
                      {t("contactForm.formatPlaceholder")}
                    </option>
                    {FORMATS.map((f) => (
                      <option key={f.id} value={f.id} className="bg-ink text-cream">
                        {t(`contactForm.formats.${f.id}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>
                    {t("contactForm.messageLabel")}{" "}
                    <span className={optionalCls}>{t("contactForm.messageOptional")}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(e) => {
                      messageRef.current = e.target.value
                      autoFilledRef.current = false
                      setMessage(e.target.value)
                    }}
                    className={`${fieldCls} border-cream/20 resize-none`}
                    placeholder={t("contactForm.messagePlaceholder")}
                  />
                </div>
              </div>

              {errorText && (
                <p
                  ref={errorRef}
                  role="alert"
                  className="flex items-start gap-2 rounded-xl bg-red-500/15 border border-red-400/50 px-4 py-2.5 font-body font-bold text-red-300 text-sm sm:text-base"
                >
                  <span aria-hidden="true">⚠</span>
                  {errorText}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="font-display font-bold text-base sm:text-lg bg-sun text-ink rounded-full py-2.5 hover:bg-sun-light transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.clay.deep)] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
              >
                {status === "sending" ? t("contactForm.sendingButton") : t("contactForm.submitButton")}
              </button>
              <p className="font-body text-xs text-cream/70 text-center leading-snug">
                {t("contactForm.consentPrefix")}{" "}
                <a
                  href={i18n.language === "en" ? "/en/privacy" : "/privacy"}
                  className="underline underline-offset-2 hover:text-cream focus-ring"
                >
                  {t("contactForm.consentLink")}
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  )
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  )
}
