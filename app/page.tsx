// /app/page.tsx

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Castle, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <Bot className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Boat Rentals</h3>
              <p className="text-gray-600 mb-4">
                Experience the thrill of the water with our premium boat rentals.
              </p>
              <Button variant="link" asChild>
                <Link href="/services/boat-rentals">Learn More</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <Castle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bounce Houses</h3>
              <p className="text-gray-600 mb-4">
                Add excitement to any party with our bounce house rentals.
              </p>
              <Button variant="link" asChild>
                <Link href="/services/bounce-houses">Learn More</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Event Planning</h3>
              <p className="text-gray-600 mb-4">
                Let us help you plan the perfect event from start to finish.
              </p>
              <Button variant="link" asChild>
                <Link href="/services/events">Learn More</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
              <p className="text-gray-600 mb-4">
                Team building and corporate events made memorable.
              </p>
              <Button variant="link" asChild>
                <Link href="/services/corporate">Learn More</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8">
            Contact us today to book your rental or discuss your event needs.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}