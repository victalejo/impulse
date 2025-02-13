// /components/sections/PontoonsSection.tsx
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const PontoonsSection = () => {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/atardecer-1.jpg"
          alt="Fondo atardecer"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h2 className="text-center text-8xl font-bebas mb-24 text-[#fefefe]">
          DISCOVER OUR{' '}
          <span className="font-edo bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            PONTOONS
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Silverwave Pontoon */}
<div className="relative group z-20">
  {/* Esta es la tarjeta de información que necesita mayor z-index */}
  <div className="absolute top-0 -right-[340px] w-80 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-6 rounded-xl transition-all duration-300 shadow-xl transform translate-x-10 group-hover:translate-x-0 z-50">
    <h4 className="text-[#060404] text-2xl font-bebas mb-4">SILVERWAVE PONTOON</h4>
    <ul className="text-[#060404] space-y-2">
      <li>Capacity: 10-12 passengers</li>
      <li>Perfect for: Family gatherings, celebrations & water activities</li>
      <li>Features: Bluetooth sound system, sunshade cover, cooler storage</li>
      <li>Easy to operate - great for beginners!</li>
      <li>All safety equipment included</li>
    </ul>
  </div>

            <div className="h-[500px] rounded-xl overflow-hidden shadow-2xl cursor-pointer">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Image
                  src="/images/silverwave-fondo.jpg"
                  alt="Silverwave Pontoon"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="absolute top-0 left-0 right-0 p-8 text-[#060404] text-4xl font-bebas text-center transition-colors duration-300 group-hover:text-white">
                  Silverwave Pontoon
                </h3>
              </div>
            </div>
          </div>

          {/* Qwest Pontoon */}
          <div className="relative group z-20">
            <div className="absolute top-0 -left-[340px] w-80 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-6 rounded-xl transition-all duration-300 shadow-xl transform -translate-x-10 group-hover:translate-x-0 z-30">
              <h4 className="text-[#060404] text-2xl font-bebas mb-4">QWEST PONTOON</h4>
              <ul className="text-[#060404] space-y-2">
                <li>Capacity: Up to 12 passengers</li>
                <li>Features: Premium audio, LED lighting package, deluxe seating</li>
                <li>Twin engine performance</li>
                <li>Luxury trim package</li>
                <li>Superior handling & stability</li>
              </ul>
            </div>

            <div className="h-[500px] rounded-xl overflow-hidden shadow-2xl cursor-pointer">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Image
                  src="/images/qwest-fondo.jpg"
                  alt="Qwest Pontoon"
                  fill
                  className="object-cover scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                  style={{ 
                    objectPosition: '90% 40%'
                  }}
                />
                <h3 className="absolute top-0 left-0 right-0 p-8 text-[#060404] text-4xl font-bebas text-center transition-colors duration-300 group-hover:text-white">
                  Qwest Pontoon
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button 
            className="bg-[#ff0054] text-[#fefefe] hover:bg-[#fbe40b] font-bebas text-3xl px-16 py-8"
            asChild
          >
            <Link href="/booking">Read More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PontoonsSection;