// app/book-now/page.tsx
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Ship, Castle, Car, Music } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

const services = [
  {
    id: "pontoons",
    name: "Pontoons",
    icon: Ship,
    image: "/images/poonton.png",
    options: ["Silverwave Pontoon", "Qwest Pontoon"]
  },
  {
    id: "bounce",
    name: "Bounce Houses",
    icon: Castle,
    image: "/images/bounce.png",
    options: ["Ice Pops Mega Front Loader"]
  },
  {
    id: "foam",
    name: "Foam Party",
    icon: Castle,
    image: "/images/foam-party.jpg",
    options: ["Foam Party Package", "Color Foam Party Package", "Glow in the Dark Foam Party Package"]
  },
  {
    id: "transport",
    name: "Luxury Transport",
    icon: Car,
    image: "/images/gmc-1.png",
    options: ["GMC Yukon AT4 XL 2024", "Chevrolet Suburban 2025", "BMW X7 2024"]
  },
  {
    id: "dj",
    name: "DJ Services",
    icon: Music,
    image: "/images/dj-services.png",
    options: ["Basic DJ", "Premium DJ", "DJ + Full Equipment"]
  }
]

export default function BookNowPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedService, setSelectedService] = useState("")
  const [selectedOption, setSelectedOption] = useState("")

  return (
    <section className="relative min-h-screen bg-[#060404] overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-center text-7xl md:text-9xl font-bebas mb-16 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
          Book Your Services
        </h1>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-24 mb-24 pt-16">
          {services.map((service) => (
            <Card 
              key={service.id}
              className={cn(
                "overflow-visible cursor-pointer transition-all duration-500 group relative",
                "bg-gradient-to-r from-[#fbe40b] to-[#ff0054]",
                "hover:shadow-xl hover:shadow-[#ff0054]/20 hover:-translate-y-2",
                "rounded-xl p-4",
                selectedService === service.id ? "ring-2 ring-[#ff0054]" : ""
              )}
              onClick={() => setSelectedService(service.id)}
            >
              {/* Image Container with effects */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[80%] aspect-[4/3]
                            group-hover:scale-105 transition-transform duration-500">
                <div className="relative w-full h-full">
                  {/* Decorative border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] 
                                rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  {/* Image */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-[65%] text-center">
                <service.icon className="w-10 h-10 text-[#060404] mx-auto mb-3 
                                      group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <h3 className="text-3xl font-bebas text-[#060404] tracking-wider
                             group-hover:scale-110 transition-transform duration-300">
                  {service.name}
                </h3>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r 
                            from-transparent via-[#fefefe]/50 to-transparent 
                            opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Booking Form */}
        {selectedService && (
          <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#060404] text-4xl font-bebas">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Package Selection */}
                  <div className="space-y-2">
                    <Label className="text-[#060404] text-xl">Select Package</Label>
                    <Select onValueChange={setSelectedOption}>
                      <SelectTrigger className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {services
                          .find(s => s.id === selectedService)
                          ?.options.map(option => (
                            <SelectItem key={option} value={option} className="text-lg">
                              {option}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label className="text-[#060404] text-xl">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal text-lg",
                            "bg-[#fefefe] border-[#ff0054]/20 text-[#060404]",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#060404] text-xl">First Name</Label>
                      <Input 
                        className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg"
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#060404] text-xl">Last Name</Label>
                      <Input 
                        className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#060404] text-xl">Email</Label>
                    <Input 
                      type="email"
                      className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#060404] text-xl">Phone</Label>
                    <Input 
                      type="tel"
                      className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-2xl"
                size="lg"
              >
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}