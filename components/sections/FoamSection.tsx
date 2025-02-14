"use client"

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

const FoamSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#060404] overflow-hidden">
      {/* Fondo con imagen opaca */}
      <div className="absolute inset-0">
        <Image
          src="/images/fondo-espuma.jpg"
          alt="Fondo Foam Party"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#060404]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center">
        {/* Título con gradiente */}
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-edo mb-8 text-center">
          <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            FOAM PARTY
          </span>
        </h2>

        {/* Frase corta */}
        <p className="text-[#fefefe] text-2xl md:text-3xl font-acumin mb-12 text-center">
          Dive Into The Foam Magic
        </p>

        {/* Contenedor del video */}
        <div className="relative w-full max-w-6xl h-[400px] rounded-2xl overflow-hidden mb-12
                        transform hover:scale-105 transition-transform duration-500
                        shadow-[0_0_30px_rgba(255,0,84,0.3)]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/FOAMPARTY.webm" type="video/mp4" />
          </video>
          
          {/* Botón de control de audio */}
          <Button
            onClick={toggleAudio}
            className="absolute bottom-4 right-4 z-30 bg-[#060404]/70 hover:bg-[#060404] 
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
          
          {/* Efecto de borde al hover */}
          <div className="absolute inset-0 border-2 border-transparent 
                         hover:border-[#ff0054] rounded-2xl transition-colors 
                         duration-300"></div>
        </div>

        {/* Botón */}
        <Button 
          size="lg" 
          className="bg-[#ff0054] hover:bg-[#ff0054]/90 text-[#fefefe] font-bebas text-3xl px-16 py-8 transform hover:scale-105 transition-all duration-300"
          asChild
        >
          <Link href="/services#foam-party-section">Read More</Link>
        </Button>
      </div>

      {/* Efectos de degradado superior e inferior */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#060404] to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#060404] to-transparent"></div>
    </section>
  );
};

export default FoamSection;