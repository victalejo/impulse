// app/bounce/page.tsx

"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Droplets, Users, Shield, Star, Award, Sparkles, Clock, Settings, CheckSquare } from "lucide-react"

export default function BouncePage() {
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const ninjaVideoRef = useRef<HTMLVideoElement>(null)
  const waterVideoRef = useRef<HTMLVideoElement>(null)
  const spaceVideoRef = useRef<HTMLVideoElement>(null)
  const setupVideoRef = useRef<HTMLVideoElement>(null)

  const waterFeatures = [
    {
      icon: Droplets,
      text: "Water Fun"
    },
    {
      icon: Shield,
      text: "Safe Play"
    },
    {
      icon: Award,
      text: "Certified"
    }
  ]

  const spaceFeatures = [
    {
      icon: Users,
      text: "12 Kids"
    },
    {
      icon: Star,
      text: "Fun Zones"
    },
    {
      icon: Sparkles,
      text: "Adventure"
    }
  ]

  const setupFeatures = [
    {
      icon: Clock,
      text: "20 Min Setup"
    },
    {
      icon: Settings,
      text: "Easy Assembly"
    },
    {
      icon: CheckSquare,
      text: "Full Support"
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#060404]">
      {/* Ninja Video Hero Section */}
      <section className="relative h-screen">
        <video
          ref={ninjaVideoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
        >
          <source src="/images/ninja-page.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bebas mb-6">
              <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Ultimate Fun Experience
              </span>
              <br />
              <span className="text-[#fefefe]">For Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#fefefe] leading-relaxed">
              Our bounce houses offer spacious play areas designed for maximum fun and safety. 
              With premium materials and secure anchoring, we ensure children can enjoy hours 
              of entertainment while parents can relax with peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section with Party Background */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen animate-float"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${
                  i % 2 === 0 ? '#ff0054' : '#fbe40b'
                }, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Water Features Card */}
            <Card className="bg-[#060404] border-2 border-[#ff0054] overflow-hidden">
              <div className="relative h-[400px]">
                <video
                  ref={waterVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/inflador-agua.mp4" type="video/mp4" />
                </video>
              </div>
              
              <div className="p-6">
                <h3 className="text-3xl font-bebas text-[#fefefe] mb-4">
                  Water Splash Paradise
                </h3>
                <p className="text-lg text-[#fefefe] mb-4">
                  Experience the perfect blend of water fun and safety with our splash system.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {waterFeatures.map((feature, index) => (
                    <div key={index} 
                         className="flex flex-col items-center bg-[#ff0054] p-2 rounded-lg">
                      <feature.icon className="h-6 w-6 text-[#fefefe]" />
                      <span className="text-[#fefefe] text-sm font-semibold text-center mt-1">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Space and Fun Card */}
            <Card className="bg-[#060404] border-2 border-[#fbe40b] overflow-hidden">
              <div className="relative h-[400px]">
                <video
                  ref={spaceVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/video-inflador-adentro.mp4" type="video/mp4" />
                </video>
              </div>
              
              <div className="p-6">
                <h3 className="text-3xl font-bebas text-[#fefefe] mb-4">
                  Adventure Wonderland
                </h3>
                <p className="text-lg text-[#fefefe] mb-4">
                  Discover multiple play zones with climbing walls and exciting slides.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {spaceFeatures.map((feature, index) => (
                    <div key={index} 
                         className="flex flex-col items-center bg-[#fbe40b] p-2 rounded-lg">
                      <feature.icon className="h-6 w-6 text-[#060404]" />
                      <span className="text-[#060404] text-sm font-semibold text-center mt-1">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Easy Setup Card - NEW */}
            <Card className="bg-[#060404] border-2 border-[#ff0054] overflow-hidden">
              <div className="relative h-[400px]">
                <video
                  ref={setupVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/images/ninja-tarjeta.webm" type="video/webm" />
                </video>
              </div>
              
              <div className="p-6">
                <h3 className="text-3xl font-bebas text-[#fefefe] mb-4">
                  Quick & Easy Setup
                </h3>
                <p className="text-lg text-[#fefefe] mb-4">
                  Our bounce houses take just 20 minutes to set up and come with professional installation support.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {setupFeatures.map((feature, index) => (
                    <div key={index} 
                         className="flex flex-col items-center bg-[#ff0054] p-2 rounded-lg">
                      <feature.icon className="h-6 w-6 text-[#fefefe]" />
                      <span className="text-[#fefefe] text-sm font-semibold text-center mt-1">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Book Now Button */}
          <div className="text-center mt-20">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                       text-[#fefefe] font-bebas text-3xl px-16 py-8 
                       transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-[#ff0054]/50
                       border-2 border-[#fefefe]"
              asChild
            >
              <Link href="/book-now?service=bounce">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Original Video Now at Bottom - with updated text */}
      <section className="relative h-screen">
        <video
          ref={mainVideoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
        >
          <source src="/videos/2bounce.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bebas mb-6">
              <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Combo Bounce Houses
              </span>
              <br />
              <span className="text-[#fefefe]">For Any Event</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#fefefe] leading-relaxed">
              Are you ready for an unforgettable time with our Ice Pops Mega Front Bounce House? 
              The kids will love this one for sure, but so will the parents!
            </p>
          </div>
        </div>
      </section>

      {/* Estilos para animaciones */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

