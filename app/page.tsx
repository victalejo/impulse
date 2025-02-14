// /app/page.tsx
import Hero from "@/components/sections/Hero"
import AboutSection from "@/components/sections/AboutSection"
import Services from "@/components/sections/Services"
import PontoonsSection from "@/components/sections/PontoonsSection"
import BouncesSection from "@/components/sections/BouncesSection"
import FoamSection from "@/components/sections/FoamSection"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-none">
        <Hero />
      </div>
      <div className="flex-none">
        <AboutSection />
      </div>
      <div className="flex-grow">
        <PontoonsSection />
      </div>
      <div className="flex-grow">
        <Services />
      </div>
      
      <div className="flex-none">
        <BouncesSection />
      </div>
      <div className="flex-none">
        <FoamSection />
      </div>
    </div>
  )
}