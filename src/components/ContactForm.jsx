// src/components/ContactForm.jsx
"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useT } from "next-i18next/client"
import { getAttribution } from "@/lib/attribution"

// ID мають збігатися з formatId у Pricing.jsx
const FORMATS = [{ id: "short_advertisement" }, { id: "commercial" }, { id: "brand_card" }, { id: "video_story" }]

const PHONE_RE = /^(\+?38)?0\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function isValidPhone(raw) {
  return PHONE_RE.test(raw.replace(/[\s\-()]/g, ""))
}
function isValidEmail(raw) {
  return EMAIL_RE.test(raw.trim())
}

const labelCls = "font-body font-700 text-sm text-cream block mb-0.5"
const optionalCls = "font-400 text-cream/50 text-xs"
const fieldCls =
  "w-full rounded-xl border-2 bg-cream/5 text-cream px-3.5 py-2 font-body text-base focus-ring placeholder:text-cream/40"

function ContactFormInner() {
  const { t, i18n } = useT("common")
  const searchParams = useSearchParams()
  const presetFormat = searchParams.get("format")
  const initialFormat = FORMATS.some((f) => f.id === presetFormat) ? presetFormat : null

  const [status, setStatus] = useState("idle")
  const [format, setFormat] = useState(initialFormat)
  const [contactError, setContactError] = useState("")
  const [serverError, setServerError] = useState("")
  const [phoneInvalid, setPhoneInvalid] = useState(false)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [errorTick, setErrorTick] = useState(0)
  const [source, setSource] = useState("")
  const errorRef = useRef(null)


  // Тариф у блоці цін повідомляє, який формат підсвітити
  useEffect(() => {
    const onSelect = (e) => {
      const d = e.detail
      const id = typeof d === "string" ? d : d?.formatId
      if (id && FORMATS.some((f) => f.id === id)) setFormat(id)
      if (d && typeof d === "object" && d.source) setSource(d.source)
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
    const rawEmail = String(data.get("email") || "").trim()
    const rawPhone = String(data.get("phone") || "").trim()
    const rawName = String(data.get("name") || "").trim()
    if (!rawName) {
      setContactError(t("contactForm.missingNameError"))
      form.querySelector("#name")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    const phoneOk = rawPhone && isValidPhone(rawPhone)
    const emailOk = rawEmail && isValidEmail(rawEmail)

    if (!rawEmail && !rawPhone) {
      setContactError(t("contactForm.missingContactError"))
      setPhoneInvalid(true)
      setEmailInvalid(true)
      form.querySelector("#phone")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    if (rawPhone && !phoneOk) {
      setContactError(t("contactForm.invalidPhoneError"))
      setPhoneInvalid(true)
      setEmailInvalid(false)
      form.querySelector("#phone")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    if (rawEmail && !emailOk) {
      setContactError(t("contactForm.invalidEmailError"))
      setEmailInvalid(true)
      setPhoneInvalid(false)
      form.querySelector("#email")?.focus({ preventScroll: true })
      bumpError()
      return
    }

    setContactError("")
    setPhoneInvalid(false)
    setEmailInvalid(false)
    setServerError("")
    setStatus("sending")

    const payload = {
      name: String(data.get("name") || ""),
      email: emailOk ? rawEmail : "",
      phone: phoneOk ? rawPhone : "",
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
        <h2 className="font-display font-800 text-cream text-2xl sm:text-3xl text-center">
          {t("contactForm.heading")}
        </h2>
        <p className="mt-1 font-body text-sm sm:text-base text-cream/70 text-center">{t("contactForm.subheading")}</p>

        {status === "sent" ? (
          <div className="mt-8 bg-meadow text-cream rounded-3xl p-8 text-center font-body text-lg">
            {t("contactForm.successMessage")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className={labelCls}>
                  {t("contactForm.nameLabel")}
                </label>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={`${fieldCls} border-cream/20`}
                  placeholder={t("contactForm.namePlaceholder")}
                />
              </div>
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
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="email" className={labelCls}>
                  {t("contactForm.emailLabel")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={emailInvalid}
                  onChange={() => emailInvalid && setEmailInvalid(false)}
                  className={`${fieldCls} ${emailInvalid ? "border-red-400" : "border-cream/20"}`}
                  placeholder={t("contactForm.emailPlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>
                  {t("contactForm.phoneLabel")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={phoneInvalid}
                  onChange={() => phoneInvalid && setPhoneInvalid(false)}
                  className={`${fieldCls} ${phoneInvalid ? "border-red-400" : "border-cream/20"}`}
                  placeholder={t("contactForm.phonePlaceholder")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="format" className={labelCls}>
                {t("contactForm.formatsLabel")} <span className={optionalCls}>{t("contactForm.formatsOptional")}</span>
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
                {t("contactForm.messageLabel")} <span className={optionalCls}>{t("contactForm.messageOptional")}</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={2}
                className={`${fieldCls} border-cream/20 resize-none`}
                placeholder={t("contactForm.messagePlaceholder")}
              />
            </div>

            {errorText && (
              <p
                ref={errorRef}
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-red-500/15 border border-red-400/40 px-4 py-2.5 font-body font-700 text-red-300 text-sm sm:text-base"
              >
                <span aria-hidden="true">⚠</span>
                {errorText}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-display font-700 text-base sm:text-lg bg-sun text-ink rounded-full py-2.5 hover:bg-sun-light transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.clay.deep)] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
            >
              {status === "sending" ? t("contactForm.sendingButton") : t("contactForm.submitButton")}
            </button>
          </form>
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
