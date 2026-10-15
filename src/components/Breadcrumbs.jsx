// src/components/Breadcrumbs.jsx
import { absoluteUrl, localizedPath } from "@/lib/seo"

// items: [{ label, path }], path "" = головна. Останній елемент без посилання.
export default function Breadcrumbs({ lng, items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: absoluteUrl(lng, it.path),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="font-body text-sm text-ink/70">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-bold text-ink">
                  {it.label}
                </span>
              ) : (
                <a href={localizedPath(lng, it.path)} className="hover:text-clay-deep focus-ring">
                  {it.label}
                </a>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
