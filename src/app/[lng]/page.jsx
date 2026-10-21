import Header from "@/components/Header"
import Hero from "@/components/Hero"
import HillDivider from "@/components/HillDivider"
import StudioVideo from "@/components/StudioVideo"
import Portfolio from "@/components/Portfolio"
import Process from "@/components/Process"
import AboutTeam from "@/components/AboutTeam"
// import Pricing from "@/components/Pricing"
import RealCase from "@/components/RealCase"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
// import HomeHub from "@/components/HomeHub"

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
        <Process />
        <AboutTeam />
        <HillDivider fromColor="#F0E8DA" toColor="#477A58" />
        {/* <Pricing /> */}
        {/* <HillDivider fromColor="#FBF6E9" toColor="#5FA653" /> */}
        <RealCase />
        <HillDivider fromColor="#477A58" toColor="#211C19" />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
