// app/gmc/page.tsx

"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Car, 
  Gauge, 
  Battery, 
  AlertCircle,
  Fuel 
} from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function GMCPage() {
  const features = [
    {
      icon: Car,
      title: "Engine & Performance",
      specs: [
        "6.2L V8 Engine",
        "420 Horsepower",
        "AT4 4x4 System"
      ]
    },
    {
      icon: Gauge,
      title: "Transmission",
      specs: [
        "10-Speed Automatic Transmission",
        "All-Wheel Drive",
        "Adaptive Suspension"
      ]
    },
    {
      icon: Battery,
      title: "Technology",
      specs: [
        "10.2\" Touchscreen Display",
        "Apple CarPlay & Android Auto",
        "Bose Premium Sound System"
      ]
    },
    {
      icon: AlertCircle,
      title: "Safety",
      specs: [
        "Forward Collision Alert",
        "Lane Keep Assist",
        "360° Camera System"
      ]
    },
    {
      icon: Fuel,
      title: "Efficiency",
      specs: [
        "Dynamic Fuel Management",
        "Start/Stop Technology",
        "ECO Drive Mode"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#060404]">
      {/* Top videos section */}
      <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Left Video */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src="/videos/adelantegmc.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#060404]/40 flex items-center justify-center">
            <h2 className="text-[#fefefe] text-4xl md:text-6xl font-bebas text-center px-4">
              Experience 
              <span className="block bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text mt-2">
                Ultimate Control
              </span>
            </h2>
          </div>
        </div>

        {/* Right Video */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src="/videos/atrasgmc.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#060404]/40 flex items-center justify-center">
            <h2 className="text-[#fefefe] text-4xl md:text-6xl font-bebas text-center px-4">
              Luxury Beyond
              <span className="block bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text mt-2">
                Expectations
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Technical Information Section */}
      <div className="relative py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/fondogmc.jpg"
            alt="GMC Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#060404]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-5xl md:text-7xl font-bebas mb-20">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              GMC YUKON AT4 XL
            </span>
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group relative bg-gradient-to-br from-[#060404]/95 to-[#060404]/80 
                          backdrop-blur-sm border-2 border-[#ff0054]/10 hover:border-[#ff0054]
                          transition-all duration-500 rounded-xl shadow-lg hover:shadow-[#ff0054]/20
                          p-6"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0054]/0 via-[#ff0054]/5 to-[#fbe40b]/0 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl" />
                
                {/* Card content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#ff0054]/20">
                    <div className="bg-gradient-to-br from-[#ff0054] to-[#fbe40b] p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-[#fefefe]" />
                    </div>
                    <h3 className="text-2xl font-bebas text-[#fefefe]">{feature.title}</h3>
                  </div>

                  {/* Specs */}
                  <ul className="space-y-4">
                    {feature.specs.map((spec, i) => (
                      <li key={i} className="text-[#fefefe]/90 text-lg">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Cargo Space Section */}
          <div className="relative mb-20">
            <h3 className="text-4xl font-bebas text-[#fefefe] text-center mb-8">Cargo Space</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  loop
                >
                  <source src="/videos/bgmc.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="space-y-6 text-[#fefefe]">
                <div className="space-y-4">
                  <p className="text-2xl font-bebas">Maximum Cargo Capacity</p>
                  <ul className="space-y-4 text-lg">
                    <li>Maximum cargo space: 144.7 cubic feet</li>
                    <li>Behind second row: 93.8 cubic feet</li>
                    <li>Behind third row: 41.5 cubic feet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                       text-[#fefefe] font-bebas text-2xl px-16 py-8 
                       transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-[#ff0054]/50"
              asChild
            >
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}