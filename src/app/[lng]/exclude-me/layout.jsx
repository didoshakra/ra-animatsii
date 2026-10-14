// src/app/[lng]/exclude-me/layout.jsx
export const metadata = {
  robots: { index: false, follow: false },
}

export default function ExcludeMeLayout({ children }) {
  return children
}
