// /components/sections/Services.tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Castle, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function Services() {
  return (
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
  )
}
