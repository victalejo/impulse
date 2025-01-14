import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="/api/placeholder/2070/600"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Create Unforgettable Memories
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Premier boat and bounce house rentals for your next adventure or celebration.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
