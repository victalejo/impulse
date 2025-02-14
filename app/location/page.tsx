"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MapPin, Phone, Mail, Clock, MousePointerClick } from "lucide-react"
import Image from "next/image"

export default function LocationPage() {
  const [selectedService, setSelectedService] = useState("")

  return (
    <div className="min-h-screen bg-[#060404] pt-32 pb-16 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Diagonal lines */}
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

        {/* Animated bubbles */}
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

        {/* Light effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bebas mb-4">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Find Us Here
            </span>
          </h1>
          <p className="text-xl text-[#fefefe]/80">
            Experience All Our Services in Dallas, Texas
          </p>
        </div>

        {/* Main container for information and form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Information and Carousel */}
          <div className="space-y-8">
            {/* Image Carousel */}
            <Card className="bg-[#fefefe]/5 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 group">
              <CardContent className="p-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {/* Add location images here */}
                    <CarouselItem>
                      <div className="relative aspect-video">
                        <div className="w-full h-64 bg-[#ff0054]/10 flex items-center justify-center rounded-lg">
                          <p className="text-[#fefefe]">Image 1</p>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#fefefe]/5 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-[#ff0054]" />
                  <div>
                    <p className="text-[#fefefe]">Dallas, Texas</p>
                    <p className="text-[#fefefe]/60 text-sm">Main Location</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#fefefe]/5 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-[#ff0054]" />
                  <div>
                    <p className="text-[#fefefe]">862.686.5129</p>
                    <p className="text-[#fefefe]/60 text-sm">Call Us</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#fefefe]/5 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-[#ff0054]" />
                  <div>
                    <p className="text-[#fefefe]">info@impulserentals.org</p>
                    <p className="text-[#fefefe]/60 text-sm">Email Us</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#fefefe]/5 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-[#ff0054]" />
                  <div>
                    <p className="text-[#fefefe]">24/7</p>
                    <p className="text-[#fefefe]/60 text-sm">Operating Hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-[#fefefe]/5 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-[#fefefe] text-2xl">Get in Touch</CardTitle>
              <CardDescription className="text-[#fefefe]/60">
                Fill out the form and we'll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#fefefe]">First Name</Label>
                    <Input 
                      className="bg-[#060404] border-[#ff0054]/20 text-[#fefefe]"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fefefe]">Last Name</Label>
                    <Input 
                      className="bg-[#060404] border-[#ff0054]/20 text-[#fefefe]"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe]">Email</Label>
                  <Input 
                    type="email"
                    className="bg-[#060404] border-[#ff0054]/20 text-[#fefefe]"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe]">Phone</Label>
                  <Input 
                    type="tel"
                    className="bg-[#060404] border-[#ff0054]/20 text-[#fefefe]"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe]">Service of Interest</Label>
                  <Select onValueChange={setSelectedService}>
                    <SelectTrigger className="bg-[#060404] border-[#ff0054]/20 text-[#fefefe]">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boats">Pontoons</SelectItem>
                      <SelectItem value="bounce">Bounce Houses</SelectItem>
                      <SelectItem value="cars">Luxury Transport</SelectItem>
                      <SelectItem value="foam">Foam Party</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe]">Message</Label>
                  <Textarea 
                    className="bg-[#060404] border-[#ff0054]/20 text-[#fefefe] min-h-[100px]"
                    placeholder="Type your message here..."
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe]
                           transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  Send Message
                  <MousePointerClick className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <h2 className="text-4xl font-bebas text-[#fefefe] mb-8">Visit Us</h2>
          <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg hover:shadow-[#ff0054]/50 transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.5786831456515!2d-96.82222208429537!3d33.01442068501848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDAwJzUxLjkiTiA5NsKwNDknMTIuMSJX!5e0!3m2!1sen!2sus!4v1642086400000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Styles for animations */}
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