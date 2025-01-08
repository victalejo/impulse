// /app/services/page.tsx

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {Bot, Castle, Calendar, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      title: "Boat Rentals",
      icon: Bot,
      description: "Experience the thrill of the water with our premium boat rentals. Perfect for fishing, water sports, or relaxing cruises.",
      features: [
        "Various boat sizes available",
        "Full safety equipment included",
        "Experienced staff assistance",
        "Flexible rental periods"
      ],
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Bounce Houses",
      icon: Castle,
      description: "Add excitement to any party with our bounce house rentals. Safe, clean, and professionally maintained equipment.",
      features: [
        "Multiple themes available",
        "Professional setup and takedown",
        "Safety-certified equipment",
        "Perfect for all ages"
      ],
      image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80"
    },
    {
      title: "Event Planning",
      icon: Calendar,
      description: "Let us help you plan the perfect event from start to finish. We handle all the details so you can enjoy the celebration.",
      features: [
        "Customized event packages",
        "Venue coordination",
        "Equipment rental management",
        "On-site event support"
      ],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1969&q=80"
    },
    {
      title: "Corporate Events",
      icon: Users,
      description: "Create memorable team building experiences and corporate events with our comprehensive services.",
      features: [
        "Team building activities",
        "Corporate retreat planning",
        "Equipment and venue packages",
        "Professional coordination"
      ],
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    }
  ]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium rental services and event solutions
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <Card key={service.title} className="overflow-hidden">
              <div className={`grid md:grid-cols-2 gap-8 ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}>
                <div className="relative h-64 md:h-auto">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-8 w-8 text-primary mr-2" />
                    <h2 className="text-2xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild>
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}