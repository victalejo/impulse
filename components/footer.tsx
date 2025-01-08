// /components/footer.tsx

import Link from "next/link"
import { Bot, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Bot className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Impulse Rentals</span>
            </div>
            <p className="mt-4 text-gray-400">
              Your premier destination for all your outdoor entertainment needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/boat-rentals" className="text-gray-400 hover:text-white">Boat Rentals</Link></li>
              <li><Link href="/services/bounce-houses" className="text-gray-400 hover:text-white">Bounce Houses</Link></li>
              <li><Link href="/services/events" className="text-gray-400 hover:text-white">Event Planning</Link></li>
              <li><Link href="/services/corporate" className="text-gray-400 hover:text-white">Corporate Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-gray-400">862.686.5129</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@impulserentals.org" className="text-gray-400 hover:text-white">
                  info@impulserentals.org
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-gray-400">New Jersey, USA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Impulse Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}