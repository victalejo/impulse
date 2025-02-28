// app/bmw/page.tsx

"use client"

// app/bmw/page.tsx
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Car, 
  Gauge, 
  Battery, 
  Factory,
  AlertCircle,
  Fuel,
  Sparkles,
  ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function BMWPage() {
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)

  const features = [
    {
      icon: Car,
      title: "Engine & Performance",
      specs: [
        "TwinPower Turbo inline 6-cylinder engine",
        "523 horsepower",
        "0-60 mph in 4.5 seconds"
      ]
    },
    {
      icon: Gauge,
      title: "Transmission",
      specs: [
        "8-speed automatic transmission",
        "xDrive all-wheel drive",
        "Professional adaptive suspension"
      ]
    },
    {
      icon: Battery,
      title: "Technology",
      specs: [
        "BMW Live Cockpit Professional",
        '12.3" touchscreen navigation system',
        "BMW Intelligent Personal Assistant"
      ]
    },
    {
      icon: Factory,
      title: "Interior",
      specs: [
        "7-passenger capacity",
        "Merino leather upholstery",
        "Sky Lounge panoramic roof"
      ]
    },
    {
      icon: AlertCircle,
      title: "Safety",
      specs: [
        "Professional driving assistance",
        "Active cruise control",
        "Parking assistance"
      ]
    },
    {
      icon: Fuel,
      title: "Efficiency",
      specs: [
        "EfficientDynamics technology",
        "ECO PRO mode",
        "Automatic Start/Stop system"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#060404]">
      {/* First Video Section - Interior */}
      <div className="relative h-screen">
        <video
          ref={firstVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src="/images/bmw/adentro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/40 flex items-center justify-center">
          <h2 className="text-[#fefefe] text-6xl md:text-8xl font-bebas text-center px-4">
            Experience{" "}
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              First-Class
            </span>
            <br />
            Comfort Today
          </h2>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-[#060404]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700 opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-center text-5xl md:text-7xl font-bebas mb-20">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              BMW X7 Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden bg-[#060404]/80 backdrop-blur-sm
                          border border-[#ff0054]/10 hover:border-[#ff0054]
                          transition-all duration-500 p-8 group
                          hover:shadow-[0_0_30px_rgba(255,0,84,0.3)]
                          transform hover:scale-105 hover:-translate-y-2"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0054]/0 via-[#ff0054]/5 to-[#fbe40b]/0 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated border light effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-[#ff0054] via-[#fbe40b] to-[#ff0054]
                              opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700" />
                
                {/* Content container */}
                <div className="relative bg-[#060404]/90 p-6 rounded-lg h-full
                              backdrop-blur-sm transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b]
                                  transform group-hover:scale-110 transition-transform duration-500">
                      <feature.icon className="w-8 h-8 text-[#fefefe]" />
                    </div>
                    <h3 className="text-2xl font-bebas text-[#fefefe] group-hover:text-[#fbe40b] transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {feature.specs.map((spec, i) => (
                      <li key={i} 
                          className="flex items-center gap-3 text-[#fefefe]/80 group-hover:text-[#fefefe]
                                   transition-all duration-300 transform hover:translate-x-2">
                        <Sparkles className="w-4 h-4 text-[#ff0054] group-hover:text-[#fbe40b] transition-colors duration-300" />
                        <span className="font-light">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Second Video Section - Exterior */}
      <div className="relative h-screen">
        <video
          ref={secondVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="/images/bmw/afuera.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/40 flex flex-col items-center justify-center">
          <h2 className="text-[#fefefe] text-6xl md:text-8xl font-bebas text-center px-4 mb-12">
            Drive the{" "}
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Future
            </span>
            <br />
            of Luxury
          </h2>

          {/* Book Now button */}
          <Button 
            size="lg" 
            className="relative overflow-hidden group
                     bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                     text-[#fefefe] font-bebas text-3xl px-20 py-10
                     transform hover:scale-105 transition-all duration-500
                     shadow-lg hover:shadow-[#ff0054]/50"
            asChild
          >
            <Link href="/booking" className="flex items-center gap-4">
              BOOK NOW
              <ArrowRight className="w-8 h-8 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}