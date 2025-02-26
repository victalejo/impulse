// app/book-now/page.tsx
"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Ship, Castle, Car, Music, CloudRain } from "lucide-react"
import Image from "next/image"

const services = [
  {
    id: "pontoons",
    name: "Pontoons",
    icon: Ship,
    image: "/images/silver-2.jpg",
    options: ["Silverwave Pontoon", "Qwest Pontoon"]
  },
  {
    id: "bounce",
    name: "Bounce Houses",
    icon: Castle,
    image: "/images/bounce-houses.JPG",
    options: ["Ice Pops Mega Front Loader"]
  },
  {
    id: "foam",
    name: "Foam Party",
    icon: CloudRain, // Cambiado a icono de burbujas
    image: "/images/foam-party.jpg",
    options: ["Foam Party Package", "Color Foam Party Package", "Glow in the Dark Foam Party Package", "Foam Pit Package"]
  },
  {
    id: "transport",
    name: "Luxury Transport",
    icon: Car,
    image: "/images/car-services.png",
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

// Mapeo de imágenes para las opciones de servicio
const serviceImageMap: Record<string, string> = {
  "Silverwave Pontoon": "/images/silver-1.jpg",
  "Qwest Pontoon": "/images/quest-c.jpg",
  "Ice Pops Mega Front Loader": "/images/bounce.PNG",
  "Foam Party Package": "/images/foam-party.JPG",
  "Color Foam Party Package": "/images/foamcolor.JPG",
  "Glow in the Dark Foam Party Package": "/images/fotofoamnoche.jpg",
  "Foam Pit Package": "/images/foampit.png",
  "GMC Yukon AT4 XL 2024": "/images/Gmc/1.jpg",
  "Chevrolet Suburban 2025": "/images/camioneta-1.png",
  "BMW X7 2024": "/images/bmw/1.jpg",
  "Basic DJ": "/images/dj-services.png",
  "Premium DJ": "/images/dj-services.png",
  "DJ + Full Equipment": "/images/dj-services.png"
}

// Días ocupados simulados (para demostración)
const bookedDates = [
  new Date(2025, 1, 10),
  new Date(2025, 1, 15),
  new Date(2025, 1, 20),
  new Date(2025, 1, 25),
  new Date(2025, 2, 5),
  new Date(2025, 2, 12)
]

// Calendario personalizado simple
const SimpleCalendar = ({ 
  onSelectDate, 
  selectedDate, 
  bookedDates 
}: { 
  onSelectDate: (date: Date) => void, 
  selectedDate: Date | null,
  bookedDates: Date[]
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
  };
  
  const isDateSelected = (date: Date) => {
    return selectedDate !== null && 
      date.getDate() === selectedDate.getDate() && 
      date.getMonth() === selectedDate.getMonth() && 
      date.getFullYear() === selectedDate.getFullYear();
  };
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(year, currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(year, currentMonth.getMonth());
  
  const days = [];
  // Añadir celdas vacías para el inicio del mes
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-14 h-14"></div>);
  }
  
  // Añadir días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, currentMonth.getMonth(), day);
    const isBooked = isDateBooked(date);
    const isSelected = isDateSelected(date);
    
    days.push(
      <div 
        key={`day-${day}`} 
        className={cn(
          "w-14 h-14 flex items-center justify-center rounded-full text-lg font-medium cursor-pointer",
          isBooked && "bg-gradient-to-br from-[#ff0054]/40 to-[#fbe40b]/40 text-[#060404]",
          isSelected && "bg-[#ff0054] text-white",
          !isBooked && !isSelected && "hover:bg-[#ff0054]/10"
        )}
        onClick={() => {
          if (!isBooked) {
            onSelectDate(date);
          }
        }}
      >
        {day}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold">
          {monthName} {year}
        </h3>
        <button 
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center font-semibold text-lg">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

export default function BookNowPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleServiceSelection = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedOption("");
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <section className="relative min-h-screen bg-[#060404] overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <h1 className="text-center text-7xl md:text-9xl font-bebas mb-16 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
          Book Your Services
        </h1>

        {/* Services Selection Header */}
        <h2 className="text-center text-4xl md:text-5xl font-bebas mb-12 text-[#fefefe]">
          Select the Service You Want to Book
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 mb-24 pt-16">
          {services.map((service) => (
            <Card 
              key={service.id}
              className={cn(
                "overflow-visible cursor-pointer group relative h-[450px]",
                "bg-gradient-to-r from-[#fbe40b] to-[#ff0054]",
                "hover:shadow-xl hover:shadow-[#ff0054]/20 hover:-translate-y-2",
                "rounded-xl p-4",
                "transition-all duration-500",
                service.id === "transport" ? "md:col-span-6" : "md:col-span-4",
                selectedService === service.id ? "ring-2 ring-[#ff0054]" : ""
              )}
              onClick={() => handleServiceSelection(service.id)}
            >
              {/* Image Container */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[80%] h-[300px]
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
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <service.icon className="w-10 h-10 text-[#060404] mx-auto mb-3 
                                      group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <h3 className="text-3xl font-bebas text-[#060404] tracking-wider
                             group-hover:scale-110 transition-transform duration-300">
                  {service.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Booking Form */}
        <div ref={formRef}>
          {selectedService && (
            <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-24">
              <CardHeader>
                <CardTitle className="text-[#060404] text-4xl font-bebas">
                  Booking Details for {selectedServiceData?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {selectedService === "dj" ? (
                  /* Formulario específico para DJ Services */
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[#060404] text-xl font-medium">First Name</Label>
                      <Input 
                        className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                        placeholder="Your first name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[#060404] text-xl font-medium">Last Name</Label>
                      <Input 
                        className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                        placeholder="Your last name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#060404] text-xl font-medium">Email</Label>
                      <Input 
                        type="email"
                        className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#060404] text-xl font-medium">Phone</Label>
                      <Input 
                        type="tel"
                        className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    {/* Botón Message */}
                    <Button 
                      className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                               text-[#fefefe] font-bebas text-2xl py-8 mt-6"
                      size="lg"
                    >
                      Message
                    </Button>
                  </div>
                ) : (
                  /* Formulario para otros servicios (con calendario) */
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[#060404] text-xl font-medium">First Name</Label>
                        <Input 
                          className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                          placeholder="Your first name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-[#060404] text-xl font-medium">Last Name</Label>
                        <Input 
                          className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                          placeholder="Your last name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#060404] text-xl font-medium">Email</Label>
                        <Input 
                          type="email"
                          className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#060404] text-xl font-medium">Phone</Label>
                        <Input 
                          type="tel"
                          className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg h-12"
                          placeholder="Your phone number"
                        />
                      </div>
                      
                      {/* Package Selection (Movido después de Phone) */}
                      <div className="space-y-2">
                        <Label className="text-[#060404] text-xl font-medium">Select Package</Label>
                        <select 
                          className="w-full bg-[#fefefe] border-2 border-[#ff0054]/20 text-[#060404] rounded-md px-4 py-3
                                   focus:outline-none focus:border-[#ff0054] hover:border-[#ff0054]/50
                                   transition-colors duration-200 text-xl h-14"
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        >
                          <option value="" disabled>Select a package</option>
                          {selectedServiceData?.options.map(option => (
                            <option 
                              key={option} 
                              value={option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Preview Image (ampliada) */}
                      {selectedOption && (
                        <div className="mt-6 space-y-2">
                          <h4 className="text-[#060404] text-xl font-medium">Selected Package Preview</h4>
                          <div className="relative h-[350px] rounded-lg overflow-hidden border-2 border-[#ff0054]/30 shadow-lg">
                            <Image
                              src={serviceImageMap[selectedOption]}
                              alt={selectedOption}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060404] to-transparent p-4">
                              <p className="text-center text-[#fefefe] text-xl font-bebas">{selectedOption}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Calendar Column */}
                    <div className="flex flex-col items-center bg-[#fefefe] p-6 rounded-xl border border-[#ff0054]/20">
                      <h3 className="text-[#060404] text-3xl font-bebas text-center mb-6">
                        Pick a Date
                      </h3>
                      
                      <div className="w-full mx-auto">
                        <SimpleCalendar 
                          onSelectDate={(date) => setSelectedDate(date)}
                          selectedDate={selectedDate}
                          bookedDates={bookedDates}
                        />
                      </div>
                      
                      <div className="flex items-center justify-center space-x-6 p-4 mt-6 w-full">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff0054]/40 to-[#fbe40b]/40"></div>
                          <span className="text-lg font-medium text-[#060404]">Booked Date</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#ff0054]"></div>
                          <span className="text-lg font-medium text-[#060404]">Selected Date</span>
                        </div>
                      </div>
                      
                      {selectedDate && (
                        <div className="mt-4 p-4 bg-[#ff0054]/10 rounded-lg w-full">
                          <p className="text-[#060404] text-center text-lg font-medium">
                            You selected: {selectedDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                                 text-[#fefefe] font-bebas text-2xl py-8"
                        size="lg"
                        disabled={!selectedOption || !selectedDate}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}