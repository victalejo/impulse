// components/sections/AboutSection.tsx

"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(error => {
        console.error("Error playing video:", error)
      })
    }
  }, [])

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative bg-[#060404] min-h-screen flex items-center py-24">
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700"></div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <h2 className="font-bebas text-6xl md:text-7xl lg:text-8xl text-[#fefefe] leading-tight">
              WHERE 
              <span 
                className="block"
                style={{ 
                  background: `linear-gradient(45deg, #ff0054, #fbe40b)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                MEMORIES
              </span>
              COME TO LIFE
            </h2>
            
            <div className="space-y-6">
              <p className="text-[#fefefe] text-xl md:text-2xl font-acumin leading-relaxed">
                Welcome to Impulse Rentals, your premier destination for all your outdoor entertainment needs! We are thrilled to offer an extensive range of services, including car services, Djs service, boat rentals, foam party services, bounce house rentals, and much more. This variety ensures that your next event or outing is filled with excitement and unforgettable memories. What truly sets us apart is our passion for creating memorable experiences. Every moment is an opportunity for adventure and celebration. Whether planning a family outing, a corporate team-building event, or a community gathering, our boat and bounce house rentals will take your experience to the next level. Our goal is to exceed your expectations and leave you with memories that will be cherished for years.
              </p>
            </div>
          </div>
          
          {/* Video container */}
          <div className="relative h-[710px] rounded-2xl overflow-hidden 
                          transform hover:scale-105 transition-transform duration-500
                          shadow-[0_0_30px_rgba(255,0,84,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#060404] via-transparent to-transparent z-10"></div>
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/familia-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Audio control button */}
            <Button
              onClick={toggleAudio}
              className="absolute top-4 right-4 z-30 bg-[#060404]/70 hover:bg-[#060404] 
                         border-2 border-[#ff0054] text-[#fefefe] rounded-full p-3
                         transition-all duration-300 hover:scale-110"
              size="icon"
              variant="outline"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-[#ff0054]" />
              ) : (
                <Volume2 className="h-6 w-6 text-[#ff0054]" />
              )}
            </Button>

            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-transparent 
                           hover:border-[#ff0054] rounded-2xl transition-colors 
                           duration-300 z-20"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#060404] to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#060404] to-transparent"></div>
    </section>
  )
}