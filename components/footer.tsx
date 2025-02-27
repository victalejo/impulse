// components/footer.tsx

import Link from "next/link"
import { Bot, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#fefefe] text-[#060404] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Logo principal a la izquierda */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="relative w-28 h-28">
              <Image
                src="/logo-sin-texto.png"
                alt="Impulse Rentals Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bebas mb-3 text-[#ff0054]">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/book-now" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Book Now</Link></li>
              <li><Link href="/services" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Impulse Services</Link></li>
              <li><Link href="/wear" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Impulse Wear</Link></li>
              <li><Link href="/location" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Location</Link></li>
              <li><Link href="/about" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/faq" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-6">
            <h3 className="text-xl font-bebas mb-3 text-[#ff0054] text-center">Services</h3>
            
            <div className="flex gap-0">
              {/* Columna 1: Pontoon Rentals, Bounce Houses y DJ Services */}
              <div className="flex-1 pr-1 text-sm border-r border-[#ff0054]/10">
                <Link href="/barco" className="block hover:text-opacity-80 transition-colors duration-300">
                  <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                    Pontoon Rentals
                  </span>
                </Link>
                <Link href="/bounce" className="block hover:text-opacity-80 transition-colors duration-300 mt-2">
                  <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                    Bounce Houses Package
                  </span>
                </Link>
                <Link href="/contact" className="block hover:text-opacity-80 transition-colors duration-300 mt-2">
                  <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                    DJ Services
                  </span>
                </Link>
              </div>
              
              {/* Columna 2: Car Services y Foam Party (con subtítulos) */}
              <div className="flex-1 pl-2 text-sm space-y-2">
                {/* Car Services con sus subtítulos */}
                <Link href="/services" className="block font-semibold hover:text-opacity-80 transition-colors duration-300">
                  <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                    Car Services
                  </span>
                </Link>
                <ul className="pl-3 space-y-0.5 mb-2">
                  <li>• <Link href="/gmc" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">GMC Yukon AT4 XL</Link></li>
                  <li>• <Link href="/suburban" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Chevrolet Suburban</Link></li>
                  <li>• <Link href="/bmw" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">BMW X7</Link></li>
                </ul>

                {/* Foam Party con sus subtítulos */}
                <Link href="/services#foam-party-section" className="block font-semibold hover:text-opacity-80 transition-colors duration-300">
                  <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                    Foam Party Packages
                  </span>
                </Link>
                <ul className="pl-3 space-y-0.5">
                  <li>• <Link href="/foamdia" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Foam Party Package</Link></li>
                  <li>• <Link href="/foamnoche" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">Glow in the Dark Foam Party</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bebas mb-3 text-[#ff0054]">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone className="h-6 w-6 mr-2 text-[#ff0054]" />
                <a href="tel:+18626865129" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">
                  (862)686-5129
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 mr-2 text-[#ff0054]" />
                <a href="mailto:impulsexperience.com" className="text-[#060404] hover:text-[#ff0054] transition-colors duration-300">
                  impulsexperience.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-[#ff0054]" />
                <span className="text-[#060404]">Dallas, Texas.</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-3">
              <a 
                href="https://www.instagram.com/impulse_rentals/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-2 rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Instagram className="h-6 w-6 text-[#fefefe]" />
              </a>
              <a 
                href="https://web.facebook.com/ImpulseRentals/?_rdc=1&_rdr#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-2 rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Facebook className="h-6 w-6 text-[#fefefe]" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-6 pt-4 border-t border-[#ff0054]/20 flex justify-between items-center">
          <p className="text-xs text-[#060404]/70">
            © {new Date().getFullYear()} Impulse Rentals. All rights reserved.
          </p>
          
          {/* Logo adicional más pequeño */}
          <div className="relative w-28 h-16">
            <Image
              src="/images/logo-iaportafolio.png"
              alt="IA Portafolio Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}