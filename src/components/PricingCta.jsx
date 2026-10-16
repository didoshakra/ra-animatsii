// src/components/PricingCta.jsx
"use client"

// Посилання на #contact. Повідомляє форму, який формат обрати і з якої кнопки прийшов клік.
export default function PricingCta({ formatId, source, className, children }) {
  function handleClick() {
    if (formatId || source) {
      window.dispatchEvent(
        new CustomEvent("select-format", {
          detail: { formatId: formatId || null, source: source || "" },
        }),
      )
    }
  }

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
