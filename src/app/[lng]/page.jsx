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
        <HillDivider fromColor="#B96F45" toColor="#5FA653" />
        <Portfolio />
        <HillDivider fromColor="#B96F45" toColor="#D9A879" />
        <Process />
        <AboutTeam />
        <HillDivider fromColor="#bae6fd" toColor="#5FA653" />
        {/* <Pricing /> */}
        {/* <HillDivider fromColor="#FBF6E9" toColor="#5FA653" /> */}
        <RealCase />
        <HillDivider fromColor="#5FA653" toColor="#2F2416" />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
