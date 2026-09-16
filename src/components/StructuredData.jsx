// src/components/StructuredData.jsx
const siteUrl = "https://raspark.com"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RASpark",
  url: siteUrl,
  logo: `${siteUrl}/brand/RASpark_eagle.png`,
  email: "raspark1954@gmail.com",
  telephone: "+380503739048",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kalush",
    addressRegion: "Ivano-Frankivsk",
    addressCountry: "UA",
  },
  sameAs: ["https://www.youtube.com/@RASparksAI", "https://www.instagram.com/rasparksai"],
}

export default function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
}
