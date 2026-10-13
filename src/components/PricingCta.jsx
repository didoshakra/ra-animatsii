// components/PricingCta.jsx
"use client"

// Звичайне посилання на #contact (миттєва прокрутка без перезавантаження, мова не губиться).
// Окремо повідомляє форму, який тип ролика підсвітити.
export default function PricingCta({ formatId, className, children }) {
  function handleClick() {
    if (formatId) {
      window.dispatchEvent(new CustomEvent("select-format", { detail: formatId }))
    }
  }

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
