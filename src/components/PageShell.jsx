// src/components/PageShell.jsx
import Header from "./Header"
import Footer from "./Footer"
import HillDivider from "./HillDivider"
import ContactForm from "./ContactForm"
import Breadcrumbs from "./Breadcrumbs"

// Спільна обгортка підсторінок: шапка, крихти, контент, форма заявки, футер
export default function PageShell({ lng, crumbs, children }) {
  return (
    <>
      <Header />
      <main>
        <div className="bg-cream">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
            <Breadcrumbs lng={lng} items={crumbs} />
          </div>
        </div>
        <HillDivider fromColor="#FBF6E9" toColor="#5FA653" />
        <section className="bg-meadow pb-14 sm:pb-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">{children}</div>
        </section>
        <HillDivider fromColor="#5FA653" toColor="#2F2416" />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
