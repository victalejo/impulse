// app/services/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#060404] relative overflow-hidden">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0">
        {/* Líneas diagonales animadas */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#ff0054] to-transparent transform -translate-x-full animate-slide"
              style={{
                top: `${i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${35}deg) translateX(-50%)`
              }}
            />
          ))}
        </div>

        {/* Burbujas animadas con bordes */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#ff0054]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              background: `linear-gradient(45deg, rgba(255,0,84,0.05), rgba(251,228,11,0.05))`
            }}
          />
        ))}
        
        {/* Efectos de luz mejorados */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-1000 opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[130px] animate-pulse delay-500 opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-center text-7xl md:text-9xl font-bebas mb-16 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
          Impulse Services
        </h1>

        <div className="space-y-24">
          {/* Car Services */}
<Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
  <div className="grid md:grid-cols-2 gap-8 p-8">
    <div className="relative h-[500px]">
      <Image
        src="/images/car-services.png"
        alt="Luxury Cars"
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="space-y-8">
      <h2 className="text-5xl font-bebas text-[#fefefe] mb-6">Car Services</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Botón GMC */}
        <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
          <Button 
            className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-2xl px-8 py-8 transition-transform duration-300 font-bebas relative z-10
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10
                     flex items-center justify-center"
            asChild
          >
            <Link href="/booking">2024 GMC Yukon AT4 XL</Link>
          </Button>
        </div>

        {/* Botón Suburban */}
        <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
          <Button 
            className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-2xl px-8 py-8 transition-transform duration-300 font-bebas relative z-10
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10
                     flex items-center justify-center"
            asChild
          >
            <Link href="/booking">Chevrolet Suburban 2025</Link>
          </Button>
        </div>

        {/* Botón BMW */}
        <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
          <Button 
            className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-2xl px-8 py-8 transition-transform duration-300 font-bebas relative z-10
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10
                     flex items-center justify-center"
            asChild
          >
            <Link href="/bmw">BMW X7</Link>
          </Button>
        </div>
      </div>
      <p className="text-xl text-[#fefefe]/80">
        Experience luxury transportation with our premium SUVs. All vehicles feature spacious interiors,
        state-of-the-art entertainment systems, and comfortable seating for up to 7-8 passengers.
        Perfect for special occasions, corporate events, or luxury travel needs.
      </p>
    </div>
  </div>
</Card>

          {/* Bounce Houses */}
          <Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-8">
                <h2 className="text-5xl font-bebas text-[#fefefe]">Bounce Houses</h2>
                <div className="space-y-2">
                  <p className="text-3xl text-[#fbe40b]">All Day Flat Fee</p>
                  <p className="text-3xl text-[#fbe40b]">8 Hours</p>
                  <p className="text-5xl font-bebas text-[#ff0054]">$200</p>
                </div>
                <p className="text-xl text-[#fefefe]/80">
                  At Impulse Rentals, safety is our top priority. All our bounce houses undergo rigorous safety 
                  inspections and are thoroughly cleaned and sanitized before each use. Our professional team 
                  handles setup and takedown, ensuring a worry-free experience for your special event.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-[#fbe40b] hover:bg-[#fbe40b]/80 text-[#060404] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <Link href="/details">Details</Link>
                  </Button>
                  <Button 
                    className="bg-[#ff0054] hover:bg-[#ff0054]/80 text-[#fefefe] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="/images/bounce-houses.jpg"
                  alt="Bounce Houses"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* DJ Services */}
          <Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative h-[500px]">
                <Image
                  src="/images/dj-services.png"
                  alt="DJ Services"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-8">
                <h2 className="text-5xl font-bebas text-[#fefefe]">DJ Services</h2>
                <div className="space-y-2">
                  <p className="text-3xl text-[#fbe40b]">Per Hour</p>
                  <p className="text-3xl text-[#fbe40b]">Price Negotiable</p>
                </div>
                <p className="text-xl text-[#fefefe]/80">
                  Transform your event with our professional DJ services. Whether it's a wedding, corporate event,
                  or private party, our experienced DJs will keep your guests entertained with the perfect mix of music.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-[#fbe40b] hover:bg-[#fbe40b]/80 text-[#060404] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <Link href="/details">Details</Link>
                  </Button>
                  <Button 
                    className="bg-[#ff0054] hover:bg-[#ff0054]/80 text-[#fefefe] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Foam Party */}
          <Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
            <div className="p-8 space-y-8">
              <h2 className="text-5xl font-bebas text-[#fefefe]">Foam Party Packages</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="relative h-[400px]">
                    <Image
                      src="/images/foam-party.jpg"
                      alt="Foam Party"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bebas text-[#fefefe]">Foam Party Package</h3>
                      <p className="text-4xl text-[#ff0054]">$315</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bebas text-[#fefefe]">Color Foam Party Package</h3>
                      <p className="text-4xl text-[#ff0054]">$420</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="relative h-[400px]">
                    <Image
                      src="/images/foam-night.jpg"
                      alt="Glow Foam Party"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bebas text-[#fefefe]">Glow in the Dark Foam Party Package</h3>
                    <p className="text-4xl text-[#ff0054]">$445</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  className="bg-[#fbe40b] hover:bg-[#fbe40b]/80 text-[#060404] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <Link href="/details">Details</Link>
                </Button>
                <Button 
                  className="bg-[#ff0054] hover:bg-[#ff0054]/80 text-[#fefefe] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Pontoons */}
          <Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
            <div className="p-8 space-y-8">
              <h2 className="text-5xl font-bebas text-[#fefefe] mb-8">Pontoon Rentals</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[500px]">
                  <Image
                    src="/images/LTZ-822.jpg"
                    alt="Pontoon"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff0054] text-2xl">•</span>
                      <h3 className="text-3xl font-bebas text-[#fefefe]">Silverwave Pontoon</h3>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff0054] text-2xl">•</span>
                      <h3 className="text-3xl font-bebas text-[#fefefe]">Qwest Pontoon</h3>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xl text-[#fefefe]/80">
                    {[
                      '2 Hours - $265',
                      '3 Hours - $350',
                      '4 Hours - $450',
                      '5 Hours - $560',
                      '6 Hours - $675',
                      '8 Hours - $850'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-[#ff0054]">*</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-[#ff0054]/20 pt-6">
                <h3 className="text-3xl font-bebas text-[#fefefe] mb-4">Special Service</h3>
                <div className="flex justify-between items-center">
                  <p className="text-xl text-[#fefefe]/80">2 Hour Sunset Cruise w/Captain</p>
                  <p className="text-3xl text-[#ff0054]">$365</p>
                </div>
              </div>
              <div className="relative h-[400px] mt-8">
                <Image
                  src="/images/atardecer-1.jpg"
                  alt="Sunset Cruise"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex justify-center gap-4 pt-8">
                <Button 
                  className="bg-[#fbe40b] hover:bg-[#fbe40b]/80 text-[#060404] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <Link href="/details">Details</Link>
                </Button>
                <Button 
                  className="bg-[#ff0054] hover:bg-[#ff0054]/80 text-[#fefefe] text-xl px-8 py-6 hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
          </Card>
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

        @keyframes slide {
          0% {
            transform: rotate(35deg) translateX(-100%);
          }
          100% {
            transform: rotate(35deg) translateX(100%);
          }
        }

        .animate-slide {
          animation: slide 8s linear infinite;
        }
      `}</style>
    </div>
  )
}