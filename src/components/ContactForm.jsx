// src/components/ContactForm.jsx
"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getAttribution } from "@/lib/attribution"
import { parseContact } from "@/lib/contact"
import { CONTACT_EMAIL, TELEGRAM_URL } from "@/lib/contacts"
import { useT } from "next-i18next/client"

const FORMATS = [
  { id: "short_advertisement" },
  { id: "commercial" },
  { id: "brand_card" },
  { id: "video_story" },
]

const labelCls =
  "block mb-1 font-body font-semibold text-sm text-cream"

const optionalCls =
  "font-normal text-cream/50 text-xs"

const fieldCls =
  "w-full min-w-0 rounded-lg border border-cream/15 bg-cream/[0.04] text-cream px-3 py-2.5 font-body text-sm focus:border-sun/70 focus:outline-none focus:ring-2 focus:ring-sun/15 placeholder:text-cream/35 transition-colors"

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.7 4.4 18.5 20c-.2 1.1-.8 1.4-1.7.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.6-.6-.2L6.4 14.1l-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 3.5c.9-.3 1.7.2 1.5.9Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ContactFormInner() {
  const { t, i18n } = useT("common")
  const searchParams = useSearchParams()
  const presetFormat = searchParams.get("format")

  const initialFormat = FORMATS.some((f) => f.id === presetFormat)
    ? presetFormat
    : null

  const [status, setStatus] = useState("idle")
  const [format, setFormat] = useState(initialFormat)
  const [source, setSource] = useState("")
  const [moreOpen, setMoreOpen] = useState(false)
  const [contactError, setContactError] = useState("")
  const [serverError, setServerError] = useState("")
  const [contactInvalid, setContactInvalid] = useState(false)
  const [errorTick, setErrorTick] = useState(0)
  const [message, setMessage] = useState("")

  const errorRef = useRef(null)
  const messageRef = useRef("")
  const autoFilledRef = useRef(false)

  useEffect(() => {
    const onSelect = (e) => {
      const d = e.detail
      const id = typeof d === "string" ? d : d?.formatId

      if (id && FORMATS.some((f) => f.id === id)) {
        setFormat(id)
      }

      if (d && typeof d === "object" && d.source) {
        setSource(d.source)
      }

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

  useEffect(() => {
    if (errorTick > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [errorTick])

  const errorText =
    contactError ||
    (status === "error"
      ? serverError || t("contactForm.errorMessage")
      : "")

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
    <section
      id="contact"
      className="bg-ink py-7 sm:py-9"
    >
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h2 className="text-center font-display text-2xl font-extrabold text-cream sm:text-3xl">
          {t("contactForm.heading")}
        </h2>

        {status === "sent" ? (
          <div
            role="status"
            className="mt-5 rounded-2xl border border-meadow/40 bg-meadow/15 px-5 py-6 text-center font-body text-base text-cream"
          >
            {t("contactForm.successMessage")}
          </div>
        ) : (
          <>
            {/* Швидкий зв'язок */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-sun/30 bg-sun/[0.06] px-4 py-2 font-body text-sm font-semibold text-sun transition-colors hover:border-sun/60 hover:bg-sun/10 focus-ring"
              >
                <TelegramIcon />
                <span>{t("contactForm.directTelegram")}</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex min-h-10 max-w-full items-center justify-center gap-2 rounded-full border border-cream/15 bg-cream/[0.03] px-4 py-2 font-body text-sm font-medium text-cream/85 transition-colors hover:border-sun/40 hover:text-sun focus-ring"
              >
                <MailIcon />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-cream/10" />
              <span className="font-body text-xs text-cream/45">
                {t("contactForm.orDivider")}
              </span>
              <div className="h-px flex-1 bg-cream/10" />
            </div>

            {/* Форма заявки */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-cream/10 bg-cream/[0.025] p-4 sm:p-5"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="name" className={labelCls}>
                    {t("contactForm.nameLabel")}*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={fieldCls}
                    placeholder={t("contactForm.namePlaceholder")}
                  />
                </div>

                <div className="min-w-0">
                  <label htmlFor="contact" className={labelCls}>
                    {t("contactForm.contactLabel")}*
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    required
                    aria-invalid={contactInvalid}
                    onChange={() => {
                      if (contactInvalid) setContactInvalid(false)
                      if (contactError) setContactError("")
                    }}
                    className={`${fieldCls} ${
                      contactInvalid
                        ? "border-red-400"
                        : ""
                    }`}
                    placeholder={t("contactForm.contactPlaceholder")}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-controls="contact-more"
                className="mt-3 inline-flex items-center gap-2 rounded-md py-1 font-body text-sm font-semibold text-sun transition-colors hover:text-sun-light focus-ring"
              >
                <svg
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className={`transition-transform ${
                    moreOpen ? "rotate-45" : ""
                  }`}
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>

                <span>
                  {moreOpen
                    ? t("contactForm.lessToggle")
                    : `${t("contactForm.moreToggle")}${
                        format
                          ? ` · ${t(`contactForm.formats.${format}`)}`
                          : ""
                      }`}
                </span>
              </button>

              {/* Додаткові поля зберігаються при згортанні */}
              <div
                id="contact-more"
                className={moreOpen ? "mt-3 grid gap-3" : "hidden"}
              >
                <div>
                  <label htmlFor="company" className={labelCls}>
                    {t("contactForm.companyLabel")}{" "}
                    <span className={optionalCls}>
                      {t("contactForm.companyOptional")}
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={fieldCls}
                    placeholder={t("contactForm.companyPlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="format" className={labelCls}>
                    {t("contactForm.formatsLabel")}{" "}
                    <span className={optionalCls}>
                      {t("contactForm.formatsOptional")}
                    </span>
                  </label>
                  <select
                    id="format"
                    name="format"
                    value={format ?? ""}
                    onChange={(e) => setFormat(e.target.value || null)}
                    style={{ colorScheme: "dark" }}
                    className={`${fieldCls} cursor-pointer`}
                  >
                    <option value="" className="bg-ink text-cream">
                      {t("contactForm.formatPlaceholder")}
                    </option>

                    {FORMATS.map((f) => (
                      <option
                        key={f.id}
                        value={f.id}
                        className="bg-ink text-cream"
                      >
                        {t(`contactForm.formats.${f.id}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>
                    {t("contactForm.messageLabel")}{" "}
                    <span className={optionalCls}>
                      {t("contactForm.messageOptional")}
                    </span>
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
                    className={`${fieldCls} resize-y`}
                    placeholder={t("contactForm.messagePlaceholder")}
                  />
                </div>
              </div>

              {errorText && (
                <p
                  ref={errorRef}
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2.5 font-body text-sm font-medium text-red-300"
                >
                  <span aria-hidden="true">⚠</span>
                  <span>{errorText}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-sun px-5 py-3 font-display text-base font-bold text-ink shadow-[0_3px_0_0_theme(colors.clay.deep)] transition-colors hover:bg-sun-light active:translate-y-[2px] active:shadow-none focus-ring disabled:cursor-wait disabled:opacity-60"
              >
                <span>
                  {status === "sending"
                    ? t("contactForm.sendingButton")
                    : t("contactForm.submitButton")}
                </span>

                {status !== "sending" && <ArrowIcon />}
              </button>

              <p className="mt-3 text-center font-body text-[11px] leading-relaxed text-cream/45">
                {t("contactForm.consentPrefix")}{" "}
                <a
                  href={i18n.language === "en" ? "/en/privacy" : "/privacy"}
                  className="underline underline-offset-2 transition-colors hover:text-cream focus-ring"
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
