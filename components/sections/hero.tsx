"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const isTransitioning = useRef(false)

  const videos = [
    {
      src: "/videos/video-portada-1.mp4",
      titleLine1: "CREATING",
      titleLine2: "UNFORGETTABLE MOMENTS"
    },
    {
      src: "/videos/video-foam-nocturno.mp4",
      titleLine1: "FUN",
      titleLine2: "FOR EVERYONE"
    }
  ]

  const startVideoTransition = (currentRef: HTMLVideoElement, nextRef: HTMLVideoElement) => {
    if (!isTransitioning.current) {
      isTransitioning.current = true
      
      // Iniciar reproducción del siguiente video
      nextRef.play().catch(console.error)
      nextRef.style.opacity = '1'
      
      // Resetear el video actual
      setTimeout(() => {
        currentRef.style.opacity = '0'
        currentRef.currentTime = 0
        currentRef.load()
        isTransitioning.current = false
      }, 2000)
    }
  }

  useEffect(() => {
    const firstVideo = firstVideoRef.current
    const secondVideo = secondVideoRef.current

    if (firstVideo && secondVideo) {
      // Configuración inicial
      firstVideo.play().catch(console.error)
      secondVideo.load()

      // Monitorear el tiempo del primer video
      const checkFirstVideoTime = () => {
        if (firstVideo && secondVideo && firstVideo.currentTime >= firstVideo.duration - 2) {
          startVideoTransition(firstVideo, secondVideo)
          setCurrentVideo(1)
        }
      }

      // Monitorear el tiempo del segundo video
      const checkSecondVideoTime = () => {
        if (firstVideo && secondVideo && secondVideo.currentTime >= secondVideo.duration - 2) {
          startVideoTransition(secondVideo, firstVideo)
          setCurrentVideo(0)
        }
      }

      firstVideo.addEventListener('timeupdate', checkFirstVideoTime)
      secondVideo.addEventListener('timeupdate', checkSecondVideoTime)

      return () => {
        firstVideo.removeEventListener('timeupdate', checkFirstVideoTime)
        secondVideo.removeEventListener('timeupdate', checkSecondVideoTime)
      }
    }
  }, [])

  return (
    <section className="relative h-screen w-full flex flex-col items-center overflow-hidden">
      {/* Videos */}
      <div className="absolute inset-0">
        <video 
          ref={firstVideoRef}
          muted 
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover transition-opacity duration-2000"
          style={{ opacity: 1 }}
        >
          <source src={videos[0].src} type="video/mp4" />
        </video>

        <video 
          ref={secondVideoRef}
          muted 
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover transition-opacity duration-2000"
          style={{ opacity: 0 }}
        >
          <source src={videos[1].src} type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#060404]/40" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#fefefe] mt-8">
        {/* Logo */}
        <div className="w-[350px] h-[350px] mb-8 relative">
          <Image
            src="/logo.PNG"
            alt="Impulse Rentals Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        
        {/* Títulos */}
        <div className="flex flex-col items-center space-y-1 mb-8">
          <h2 
            className="text-4xl md:text-5xl text-center font-edo"
            style={{ 
              background: `linear-gradient(to right, #ff0054, #fbe40b)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em'
            }}
          >
            {videos[currentVideo].titleLine1}
          </h2>
          <h2 
            className="text-4xl md:text-5xl text-center font-edo"
            style={{ 
              background: `linear-gradient(to right, #ff0054, #fbe40b)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em'
            }}
          >
            {videos[currentVideo].titleLine2}
          </h2>
        </div>
        
        {/* Botones */}
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-[#ff0054] hover:bg-[#ff0054]/90 font-acumin text-base px-6 py-4"
            asChild
          >
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-[#fbe40b] text-[#fbe40b] hover:bg-[#fbe40b]/10 font-acumin text-base px-6 py-4"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .transition-opacity {
          transition: opacity 2s ease-in-out;
        }
      `}</style>
    </section>
  )
}