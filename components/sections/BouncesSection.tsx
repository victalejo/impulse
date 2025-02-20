// components/sections/BouncesSection.tsx

"use client"

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

const BouncesSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#060404] to-[#1a1a1a] overflow-hidden py-20">
      {/* Elementos decorativos del fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Burbujas animadas */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#ff0054]/10 to-[#fbe40b]/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Efectos de luz */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-edo tracking-wider leading-tight inline-block">
            <span className="bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
              Ice Pops Mega Front Loader<br />Combo Bounce House
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Contenido de texto - Izquierda */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#060404]/90 backdrop-blur-sm rounded-2xl p-12 border border-[#ff0054]/20 
                          h-[600px] flex flex-col justify-between shadow-xl shadow-[#ff0054]/10">
              <div>
                <h3 className="text-4xl md:text-5xl font-acumin text-[#fefefe] leading-relaxed mb-8">
                  Are you ready for an unforgettable time with our Ice Pops Mega Front Bounce House?
                </h3>
                
                <p className="text-2xl text-[#fefefe]/80 leading-relaxed mb-12">
                  The kids will love this one for sure, but so will the parents! This bounce house has 
                  a capacity of 12 persons, and can be converted to a wet bounce house slide.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Sparkles className="text-[#fbe40b] h-8 w-8" />
                    <span className="text-[#fefefe]/80 text-xl">Bounce area with splash pad</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Sparkles className="text-[#fbe40b] h-8 w-8" />
                    <span className="text-[#fefefe]/80 text-xl">Exciting climbing wall</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Sparkles className="text-[#fbe40b] h-8 w-8" />
                    <span className="text-[#fefefe]/80 text-xl">6 ft. slide and tunnel</span>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                         text-[#fefefe] font-bebas text-3xl px-16 py-8 transform hover:scale-105 
                         transition-all duration-300 shadow-lg hover:shadow-[#ff0054]/50 w-fit mx-auto"
                asChild
              >
                <Link href="/bounce">Read More</Link>
              </Button>
            </div>
          </div>

          {/* Video Container - Derecha */}
          <div className="lg:col-span-5 relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full h-full group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/Reel-bouncehouse.webm" type="video/webm" />
                Tu navegador no soporta el tag de video.
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
          </div>
        </div>
      </div>

      {/* Estilos para la animación de burbujas */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
};

export default BouncesSection;