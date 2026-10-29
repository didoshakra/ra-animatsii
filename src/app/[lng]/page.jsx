import Header from "@/components/Header"
import Hero from "@/components/Hero"
import HillDivider from "@/components/HillDivider"
import StudioVideo from "@/components/StudioVideo"
import Portfolio from "@/components/Portfolio"
import Process from "@/components/Process"
import AboutTeam from "@/components/AboutTeam"
import RealCase from "@/components/RealCase"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import HomeHub from "@/components/HomeHub"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <HillDivider fromColor="#211C19" toColor="#FBF6E9" /> */}
        <StudioVideo />
        <HillDivider fromColor="#FBF6E9" toColor="#477A58" />
        <Portfolio />
        <HillDivider fromColor="#477A58" toColor="#FBF6E9" />
        <HomeHub />
        <Process />
        <AboutTeam />
        <HillDivider fromColor="#E8DCC4" toColor="#477A58" />
        <RealCase />
        <HillDivider fromColor="#477A58" toColor="#211C19" />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
