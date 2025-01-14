// /app/page.tsx
import Hero from "@/components/sections/Hero"
import Services from "@/components/sections/Services"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Contact />
    </div>
  )
}