//GP 20261020// src/components/StickyOrderButton.jsx
"use client"

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useT } from "next-i18next/client"
import { TELEGRAM_URL, CONTACT_EMAIL } from "@/lib/contacts"
import PricingCta from "./PricingCta"

// Номер WhatsApp у міжнародному форматі без +, пробілів і дужок.
// Наприклад: 380XXXXXXXXX
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""

function EagleIcon() {
  return (
    <Image src="/brand/RASpark_eagle.png" alt="RA Spark" fill sizes="80px" className="rounded-full object-contain" />
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M21.7 4.4 18.5 20c-.2 1.1-.8 1.4-1.7.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.6-.6-.2L6.4 14.1l-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 3.5c.9-.3 1.7.2 1.5.9Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L3 20l1.1-4.9a8.2 8.2 0 1 1 16.1-3.3Z" />
      <path d="M8.5 8.1c.3-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.3.2.5.2.7 0l.8-.9c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.5-.5.4-1.1.6-1.8.5-1.1-.2-2.5-.8-3.9-2-1.1-1-2.1-2.4-2.4-3.4-.3-1 .1-1.8.4-2.3Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
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

function OrderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" />
    </svg>
  )
}

function MenuItem({ icon, title, description, href, onClick, disabled }) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/[0.06] text-sun">
        {icon}
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block font-body text-sm font-bold text-cream">{title}</span>
        <span className="mt-0.5 block font-body text-xs leading-snug text-cream/55">{description}</span>
      </span>

      {!disabled && (
        <svg
          viewBox="0 0 24 24"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          className="shrink-0 text-cream/40"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </>
  )

  const cls =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors " +
    (disabled ? "cursor-not-allowed opacity-45" : "hover:bg-cream/[0.06] focus-ring")

  if (href && !disabled) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  )
}

export default function StickyOrderButton() {
  const { t, i18n } = useT("common")
  const pathname = usePathname() || ""
  const [formVisible, setFormVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const rootRef = useRef(null)

  const isEnglish = i18n.language?.startsWith("en")
  const whatsappUrl = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}` : ""

  const cleanPath = pathname.replace(/^\/en(?=\/|$)/, "")
  const isHidden = cleanPath.startsWith("/admin") || cleanPath.startsWith("/exclude-me")

  useEffect(() => {
    if (isHidden) return

    let io = null
    let mo = null

    const attach = () => {
      const target = document.getElementById("contact")
      if (!target) return false

      io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.05 })

      io.observe(target)
      return true
    }

    if (!attach()) {
      setFormVisible(false)

      mo = new MutationObserver(() => {
        if (attach()) mo.disconnect()
      })

      mo.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      io?.disconnect()
      mo?.disconnect()
    }
  }, [pathname, isHidden])

  // Закриття меню натисканням поза ним або клавішею Escape.
  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, formVisible])

  if (isHidden || formVisible) return null

  const closeMenu = () => setMenuOpen(false)

  async function copyEmail() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_EMAIL)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = CONTACT_EMAIL
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()

        const copied = document.execCommand("copy")
        textarea.remove()

        if (!copied) throw new Error("Copy failed")
      }

      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      window.prompt(isEnglish ? "Copy email address:" : "Скопіюйте адресу пошти:", CONTACT_EMAIL)
    }
  }

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 right-3 z-50 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Випадаюче меню */}
      {menuOpen && (
        <div
          id="ra-contact-menu"
          role="dialog"
          aria-label={isEnglish ? "Contact RA Spark" : "Контакти RA Spark"}
          className="w-[320px] max-w-[calc(100vw-1.5rem)] origin-bottom-right rounded-2xl border border-cream/15 bg-ink p-3 shadow-2xl shadow-black/40"
        >
          <div className="flex items-start justify-between gap-3 px-2 pb-3 pt-1">
            <div>
              <h3 className="font-display text-base font-bold text-cream">
                {isEnglish ? "Contact RA Spark" : "Зв'язатися з RA Spark"}
              </h3>
              <p className="mt-1 font-body text-xs text-cream/55">
                {isEnglish ? "Choose a convenient way to reach us" : "Оберіть зручний спосіб зв'язку"}
              </p>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              aria-label={isEnglish ? "Close menu" : "Закрити меню"}
              className="rounded-lg p-1.5 text-cream/60 hover:bg-cream/10 hover:text-cream focus-ring"
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid gap-1">
            <MenuItem
              icon={<TelegramIcon />}
              title="Telegram"
              description={isEnglish ? "Send us a message" : "Написати повідомлення"}
              href={TELEGRAM_URL}
              onClick={closeMenu}
            />

            <MenuItem
              icon={<WhatsAppIcon />}
              title="WhatsApp"
              description={
                whatsappUrl
                  ? isEnglish
                    ? "Chat with us on WhatsApp"
                    : "Написати у WhatsApp"
                  : isEnglish
                    ? "Add your WhatsApp number to enable"
                    : "Потрібно додати номер WhatsApp"
              }
              href={whatsappUrl || undefined}
              disabled={!whatsappUrl}
              onClick={closeMenu}
            />

            <div className="flex items-center gap-1 rounded-xl transition-colors hover:bg-cream/[0.06]">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={closeMenu}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-left focus-ring"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/[0.06] text-sun">
                  <MailIcon />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-body text-sm font-bold text-cream">Email</span>
                  <span className="block break-all font-body text-xs text-cream/55">{CONTACT_EMAIL}</span>
                </span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="mr-2 flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 font-body text-xs font-semibold text-sun transition-colors hover:bg-sun/10 focus-ring"
                aria-label={emailCopied ? "Email copied" : "Copy email address"}
                title={emailCopied ? "Скопійовано" : "Копіювати email"}
              >
                {emailCopied ? (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    <span>{isEnglish ? "Copied!" : "Скопійовано!"}</span>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="8" y="8" width="12" height="12" rx="2" />
                      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                    </svg>
                    <span>{isEnglish ? "Copy" : "Копіювати"}</span>
                  </>
                )}
              </button>
            </div>

            <div className="my-1 h-px bg-cream/10" />

            <div onClick={closeMenu}>
              <PricingCta
                source="sticky"
                className="flex w-full items-center gap-3 rounded-xl bg-sun px-3 py-3 text-left font-body transition-colors hover:bg-sun-light focus-ring"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/10 text-ink">
                  <OrderIcon />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink">
                    {isEnglish ? "Order a video" : "Замовити ролик"}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink/70">
                    {isEnglish ? "Tell us about your project" : "Розкажіть про свій проєкт"}
                  </span>
                </span>

                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </PricingCta>
            </div>
          </div>
        </div>
      )}

      {/* Плаваюча кнопка з емблемою орла */}
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-controls="ra-contact-menu"
        onClick={() => setMenuOpen((v) => !v)}
        className="relative flex max-w-full items-center gap-2.5 rounded-full border border-sun/40 bg-ink py-2 pl-2.5 pr-[78px] text-left shadow-lg shadow-black/30 transition-all hover:border-sun hover:shadow-xl focus-ring"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`ml-0.5 shrink-0 text-sun transition-transform ${menuOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>{" "}
        <span className="min-w-0">
          <span className="block max-w-[220px] font-body text-xs font-bold leading-snug text-cream sm:max-w-none sm:text-sm">
            {isEnglish ? "Contact us or order a video" : "Зв'яжіться з нами або"}
          </span>

          {!isEnglish && (
            <span className="block font-body text-xs font-bold leading-snug text-sun sm:text-sm">Замовте ролик</span>
          )}

          {isEnglish && (
            <span className="block font-body text-xs font-bold leading-snug text-sun sm:text-sm">
              Let's discuss your project
            </span>
          )}
        </span>
        <span className="absolute -right-1 top-1/2 aspect-square h-[130%] -translate-y-1/2 rounded-full bg-sun text-ink shadow-lg shadow-black/30">
          <EagleIcon />
        </span>
      </button>
    </div>
  )
}
