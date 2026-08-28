import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HillDivider from "@/components/HillDivider";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import AboutTeam from "@/components/AboutTeam";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HillDivider fromColor="#6FC3E8" toColor="#5FA653" />
        <Portfolio />
        <HillDivider fromColor="#5FA653" toColor="#FBF6E9" />
        <Process />
        <AboutTeam />
        <HillDivider fromColor="#FBF6E9" toColor="#CDEBF9" />
        <Pricing />
        <HillDivider fromColor="#CDEBF9" toColor="#2F2416" />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
