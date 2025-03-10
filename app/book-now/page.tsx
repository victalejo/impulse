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
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Ship, Castle, Car, Music, CloudRain, Check, CreditCard, Calendar, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import BookingSteps from "@/components/custom/booking-steps"
import StripePaymentForm from "@/components/custom/stripe-payment-form"
import StripeCheckout from '@/components/custom/stripe-payment-integration'

// List of available services
const services = [
  {
    id: "pontoons",
    name: "Pontoons",
    icon: Ship,
    image: "/images/silver-1.jpg",
    options: [
      { 
        name: "Silverwave Pontoon",
        packages: [
          { name: "2 Hours", price: 26500 },
          { name: "3 Hours", price: 35000 },
          { name: "4 Hours", price: 45000 },
          { name: "5 Hours", price: 56000 },
          { name: "6 Hours", price: 67500 },
          { name: "8 Hours", price: 85000 }
        ]
      },
      { 
        name: "Qwest Pontoon", 
        packages: [
          { name: "2 Hours", price: 26500 },
          { name: "3 Hours", price: 35000 },
          { name: "4 Hours", price: 45000 },
          { name: "5 Hours", price: 56000 },
          { name: "6 Hours", price: 67500 },
          { name: "8 Hours", price: 85000 }
        ]
      }
    ]
  },
  {
    id: "bounce",
    name: "Bounce Houses",
    icon: Castle,
    image: "/images/ninja-1.png",
    options: [
      { name: "Ice Pops Mega Front Loader, 8 hours", price: 20000 },
      { name: "Ninja Bounce House, 8 hours", price: 20000 }
    ]
  },
  {
    id: "foam",
    name: "Foam Party",
    icon: CloudRain,
    image: "/images/foam-party.png",
    options: [
      { name: "Foam Party Package", price: 31500 },
      { name: "Color Foam Party Package", price: 42000 },
      { name: "Glow in the Dark Foam Party Package", price: 44500 },
      { name: "Foam Pit Package", price: 31500 }
    ]
  },
  {
    id: "transport",
    name: "Luxury Transport",
    icon: Car,
    image: "/images/car-services.png",
    options: [
      { 
        name: "GMC Yukon AT4 XL", 
        packages: [
          { name: "Hour", price: 7500 },
          { name: "Trip to the airport", price: 14900 }
        ]
      },
      { 
        name: "Chevrolet Suburban", 
        packages: [
          { name: "Hour", price: 7500 },
          { name: "Trip to the airport", price: 14900 }
        ]
      },
      { 
        name: "BMW X7", 
        packages: [
          { name: "Hour", price: 7500 },
          { name: "Trip to the airport", price: 14900 }
        ]
      }
    ]
  },
  {
    id: "dj",
    name: "DJ Services",
    icon: Music,
    image: "/images/dj-services.png",
    options: []
  }
]

// Image mapping for service options
const serviceImageMap: Record<string, string> = {
  "Silverwave Pontoon": "/images/silver-1.jpg",
  "Qwest Pontoon": "/images/quest-c.jpg",
  "Ice Pops Mega Front Loader, 8 hours": "/images/bounce-houses.png",
  "Ninja Bounce House, 8 hours": "/images/ninja-2.png",
  "Foam Party Package": "/images/foam-party.png",
  "Color Foam Party Package": "/images/foamcolor.png",
  "Glow in the Dark Foam Party Package": "/images/fotofoamnoche.jpg",
  "Foam Pit Package": "/images/foampit.png",
  "GMC Yukon AT4 XL": "/images/Gmc/1.jpg",
  "Chevrolet Suburban": "/images/sub/lado2.png",
  "BMW X7": "/images/bmw/1.jpg",
}

// Simulated booked dates
const bookedDates = [
  new Date(2025, 1, 10),
  new Date(2025, 1, 15),
  new Date(2025, 1, 20),
  new Date(2025, 1, 25),
  new Date(2025, 2, 5),
  new Date(2025, 2, 12)
]

// Simple calendar component
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

  const monthName = currentMonth.toLocaleString('en-US', { month: 'long' });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(year, currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(year, currentMonth.getMonth());

  const days = [];
  // Add empty cells for the start of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-14 h-14"></div>);
  }

  // Add days of the month
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
          <h3 className="text-xl font-bold text-[#060404]">
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
              <div key={day} className="text-center font-semibold text-lg text-[#060404]">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
  );
};

// Booking state structure
interface BookingState {
  step: number;
  serviceId: string;
  serviceName: string;
  selectedOption: string;
  selectedPackage: string;
  selectedOptionPrice: number;
  date: Date | null;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  bookingId: string;
  paymentComplete: boolean;
}

export default function BookNowPage() {
  // State to track the booking process
  const [booking, setBooking] = useState<BookingState>({
    step: 1,
    serviceId: "",
    serviceName: "",
    selectedOption: "",
    selectedPackage: "",
    selectedOptionPrice: 0,
    date: null,
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    bookingId: "",
    paymentComplete: false
  });

  const formRef = useRef<HTMLDivElement>(null);

  // Select a service and move to step 2
  const handleServiceSelection = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    
    // Si es DJ Services, mostramos el componente especial
    if (serviceId === "dj") {
      setBooking({
        ...booking,
        step: 99, // Un número especial para identificar que estamos en DJ Services
        serviceId,
        serviceName: service?.name || ""
      });
    } else {
      // Comportamiento normal para otros servicios
      setBooking({
        ...booking,
        step: 2,
        serviceId,
        serviceName: service?.name || "",
        selectedOption: "",
        selectedPackage: "",
        selectedOptionPrice: 0
      });
    }

    // Scroll to the top of the form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Select service option
  const handleOptionSelection = (optionName: string) => {
    setBooking({
      ...booking,
      selectedOption: optionName,
      selectedPackage: "",
      selectedOptionPrice: 0
    });
  };

  // Select package option (for pontoons and transport)
  const handlePackageSelection = (packageName: string, price: number) => {
    setBooking({
      ...booking,
      selectedPackage: packageName,
      selectedOptionPrice: price
    });
  };

  // Update personal information
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking({
      ...booking,
      personalInfo: {
        ...booking.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  // Move to the next step
  const goToNextStep = () => {
    if (booking.step < 4) {
      setBooking({
        ...booking,
        step: booking.step + 1
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Go back to the previous step
  const goToPreviousStep = () => {
    if (booking.step > 1) {
      setBooking({
        ...booking,
        step: booking.step - 1
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle date selection
  const handleDateSelection = (date: Date) => {
    setBooking({
      ...booking,
      date
    });
  };

  // Check if we can move to the next step
  const canProceedToNextStep = () => {
    switch (booking.step) {
      case 1:
        return !!booking.serviceId;
      case 2:
        // Para servicios con paquetes anidados (pontoons, transport)
        if (booking.serviceId === "pontoons" || booking.serviceId === "transport") {
          return !!booking.selectedOption && 
                 !!booking.selectedPackage &&
                 booking.personalInfo.firstName &&
                 booking.personalInfo.lastName &&
                 booking.personalInfo.email &&
                 booking.personalInfo.phone;
        }
        // Para otros servicios
        return !!booking.selectedOption &&
               booking.personalInfo.firstName &&
               booking.personalInfo.lastName &&
               booking.personalInfo.email &&
               booking.personalInfo.phone;
      case 3:
        return !!booking.date;
      default:
        return false;
    }
  };

  // Finalize payment process
  const handlePaymentSuccess = async () => {
    // Get a valid MongoDB ID from the server
    const response = await fetch('/api/generate-booking-id');
    const data = await response.json();
    const bookingId = data.bookingId;

    setBooking({
      ...booking,
      bookingId,
      paymentComplete: true
    });

    // Redirect to confirmation page
    setTimeout(() => {
      window.location.href = `/booking-confirmation/${bookingId}`;
    }, 2000);
  };

  // Get selected service
  const selectedService = services.find(s => s.id === booking.serviceId);

  // Get packages for selected option (for pontoons and transport)
  const getPackagesForSelectedOption = () => {
    if (!selectedService || !booking.selectedOption) return [];

    if (booking.serviceId === "pontoons" || booking.serviceId === "transport") {
      const option = selectedService.options.find(opt => opt.name === booking.selectedOption);
      // Verificar si la opción tiene la propiedad 'packages'
      return 'packages' in (option || {}) ? (option as any).packages : [];
    }

    return [];
  };

  // Summary information to display in the final step
  const getBookingSummary = () => {
    const dateFormatted = booking.date
        ? booking.date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        : 'Not selected';

    return {
      service: selectedService?.name || '',
      option: booking.selectedOption,
      package: booking.selectedPackage,
      price: booking.selectedOptionPrice,
      date: dateFormatted,
      customer: `${booking.personalInfo.firstName} ${booking.personalInfo.lastName}`,
      contact: `${booking.personalInfo.email} | ${booking.personalInfo.phone}`
    };
  };

  // For the final confirmation step
  const bookingSummary = getBookingSummary();

  return (
      <section className="relative min-h-screen bg-[#060404] overflow-hidden py-24">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header */}
          <h1 className="text-center text-6xl md:text-8xl font-bebas mb-8 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
            Book Your Services
          </h1>

          {/* Step indicator */}
          {booking.step > 1 && booking.step < 99 && (
              <div className="mb-8">
                <BookingSteps
                    currentStep={booking.step}
                    totalSteps={4}
                />
              </div>
          )}

          {/* Step 1: Service Selection */}
          {booking.step === 1 && (
              <>
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
                              booking.serviceId === service.id ? "ring-4 ring-[#ff0054]" : ""
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
              </>
          )}

          {/* Step 2: Personal Details Form */}
          {booking.step === 2 && selectedService && (
              <div className="max-w-4xl mx-auto">
                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                      Booking Details
                    </CardTitle>
                    <CardDescription className="text-center text-[#060404] text-lg">
                      You selected: {selectedService.name}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <div ref={formRef} className="space-y-6">
                      {/* Package Selection */}
                      <div className="space-y-6">
                        {/* Para Pontoons y Transport: selección de dos niveles */}
                        {(booking.serviceId === "pontoons" || booking.serviceId === "transport") && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                                Select Option
                              </Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedService.options.map((option) => (
                                  <div
                                    key={option.name}
                                    className={cn(
                                      "border-2 rounded-lg p-4 cursor-pointer transition-all duration-300",
                                      booking.selectedOption === option.name
                                        ? "border-[#ff0054] bg-[#ff0054]/10"
                                        : "border-[#ff0054]/20 hover:border-[#fbe40b]/60"
                                    )}
                                    onClick={() => handleOptionSelection(option.name)}
                                  >
                                    <div className="flex justify-between items-center">
                                      <h4 className="font-medium text-[#060404]">{option.name}</h4>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Packages para la opción seleccionada */}
                            {booking.selectedOption && (
                              <div className="space-y-2">
                                <Label className="text-xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                                  Select Package
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {getPackagesForSelectedOption().map((pkg: any) => (
                                    <div
                                      key={pkg.name}
                                      className={cn(
                                        "border-2 rounded-lg p-4 cursor-pointer transition-all duration-300",
                                        booking.selectedPackage === pkg.name
                                          ? "border-[#ff0054] bg-[#ff0054]/10"
                                          : "border-[#ff0054]/20 hover:border-[#fbe40b]/60"
                                      )}
                                      onClick={() => handlePackageSelection(pkg.name, pkg.price)}
                                    >
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-medium text-[#060404]">{pkg.name}</h4>
                                        <span className="font-bold text-[#ff0054]">${(pkg.price/100).toFixed(2)}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        
                        {/* Para otros servicios (Bounce Houses, Foam Party): selección de un nivel */}
                        {booking.serviceId !== "pontoons" && booking.serviceId !== "transport" && (
                          <div className="space-y-2">
                            <Label className="text-xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                              Select a Package
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedService.options.map((option) => (
                                <div
                                  key={option.name}
                                  className={cn(
                                    "border-2 rounded-lg p-4 cursor-pointer transition-all duration-300",
                                    booking.selectedOption === option.name
                                      ? "border-[#ff0054] bg-[#ff0054]/10"
                                      : "border-[#ff0054]/20 hover:border-[#fbe40b]/60"
                                  )}
                                  onClick={() => {
                                    handleOptionSelection(option.name);
                                    setBooking(prev => ({
                                      ...prev,
                                      selectedOptionPrice: 'price' in option ? option.price : 0
                                    }));
                                  }}
                                >
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-[#060404]">{option.name}</h4>
                                    <span className="font-bold text-[#ff0054]">
                                    ${'price' in option ? (option.price/100).toFixed(2) : '0.00'}
                                  </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Preview Image for selected option */}
                      {booking.selectedOption && (
                          <div className="mt-6 space-y-2">
                             <Label className="text-xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">Package Preview</Label>
                            <div className="relative h-[300px] rounded-lg overflow-hidden border-2 border-[#ff0054]/30 shadow-lg">
                              <Image
                                  src={serviceImageMap[booking.selectedOption] || selectedService.image}
                                  alt={booking.selectedOption}
                                  fill
                                  className="object-cover"
                              />
                            </div>
                          </div>
                      )}

                      {/* Personal Information */}
                      <div className="pt-6 border-t border-[#fefefe]/10">
                        <h3 className="text-[#ff0054] text-2xl font-bebas mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#060404]">First Name</Label>
                            <Input
                                name="firstName"
                                value={booking.personalInfo.firstName}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="Your first name"
                                required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#060404]">Last Name</Label>
                            <Input
                                name="lastName"
                                value={booking.personalInfo.lastName}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="Your last name"
                                required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#060404]">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                value={booking.personalInfo.email}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="your.email@example.com"
                                required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#060404]">Phone</Label>
                            <Input
                                name="phone"
                                type="tel"
                                value={booking.personalInfo.phone}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="Your phone number"
                                required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-6">
                    <Button
                        onClick={goToPreviousStep}
                        variant="outline"
                        className="border-[#fefefe]/50 text-[#fefefe] hover:bg-[#fefefe]/10"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                        onClick={goToNextStep}
                        disabled={!canProceedToNextStep()}
                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
          )}

          {/* Paso especial para DJ Services */}
          {booking.step === 99 && (
            <div className="max-w-4xl mx-auto">
              <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
              <CardHeader>
                 <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                   DJ Services
                 </CardTitle>
               </CardHeader>

               <CardContent className="flex flex-col items-center space-y-8">
                 <div className="relative h-[300px] w-full rounded-lg overflow-hidden border-2 border-[#ff0054]/30 shadow-lg">
                   <Image
                     src="/images/dj-services.png"
                     alt="DJ Services"
                     fill
                     className="object-cover"
                   />
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                   <Button 
                     size="lg"
                     className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium py-6 w-full"
                     asChild
                   >
                     <a href="sms:8626865129">
                       <Phone className="mr-2 h-4 w-4" />
                       Message (862)686-5129
                     </a>
                   </Button>
                   
                   <Button
                     size="lg"
                     variant="outline"
                     className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium py-6 w-full"
                     asChild
                   >
                     <Link href="/contact">
                       <Mail className="mr-2 h-4 w-4" />
                       Contact
                     </Link>
                   </Button>
                 </div>
               </CardContent>

               <CardFooter className="flex justify-between pt-6">
                 <Button
                   onClick={() => setBooking({ ...booking, step: 1 })}
                   variant="outline"
                   className="border-[#fefefe]/50 text-[#fefefe] hover:bg-[#fefefe]/10"
                 >
                   <ChevronLeft className="mr-2 h-4 w-4" />
                   Back to Services
                 </Button>
               </CardFooter>
             </Card>
           </div>
         )}

         {/* Step 3: Date Selection */}
         {booking.step === 3 && (
             <div className="max-w-4xl mx-auto">
               <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                 <CardHeader>
                   <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                     <Calendar className="inline-block mr-2 h-8 w-8" />
                     Choose a Date
                   </CardTitle>
                   <CardDescription className="text-center text-[#060404] text-lg">
                     {booking.selectedOption} {booking.selectedPackage && `- ${booking.selectedPackage}`}
                   </CardDescription>
                 </CardHeader>

                 <CardContent>
                   <div className="flex flex-col items-center bg-[#fefefe] p-6 rounded-xl">
                     <div className="w-full mx-auto">
                       <SimpleCalendar
                           onSelectDate={(date) => handleDateSelection(date)}
                           selectedDate={booking.date}
                           bookedDates={bookedDates}
                       />
                     </div>

                     <div className="flex items-center justify-center space-x-6 p-4 mt-6 w-full">
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff0054]/40 to-[#fbe40b]/40"></div>
                         <span className="text-lg text-[#060404]">Date Unavailable</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-[#ff0054]"></div>
                         <span className="text-lg text-[#060404]">Selected Date</span>
                       </div>
                     </div>

                     {booking.date && (
                         <div className="mt-4 p-4 bg-[#ff0054]/10 rounded-lg w-full">
                           <p className="text-center text-lg font-medium text-[#060404]">
                             You selected: {booking.date.toLocaleDateString('en-US', {
                             weekday: 'long',
                             year: 'numeric',
                             month: 'long',
                             day: 'numeric'
                           })}
                           </p>
                         </div>
                     )}
                   </div>
                 </CardContent>

                 <CardFooter className="flex justify-between pt-6">
                   <Button
                       onClick={goToPreviousStep}
                       variant="outline"
                       className="border-[#fefefe]/50 text-[#fefefe] hover:bg-[#fefefe]/10"
                   >
                     <ChevronLeft className="mr-2 h-4 w-4" />
                     Back
                   </Button>

                   <Button
                       onClick={goToNextStep}
                       disabled={!canProceedToNextStep()}
                       className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium"
                   >
                     Proceed to Payment
                     <CreditCard className="ml-2 h-4 w-4" />
                   </Button>
                 </CardFooter>
               </Card>
             </div>
         )}

         {/* Step 4: Stripe Payment */}
         {booking.step === 4 && (
             <div className="max-w-4xl mx-auto">
               <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                 <CardHeader>
                   <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                     <CreditCard className="inline-block mr-2 h-8 w-8" />
                     Complete Booking
                   </CardTitle>
                 </CardHeader>

                 <CardContent>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Booking Summary */}
                     <div className="bg-[#060404]/80 p-6 rounded-xl border border-[#fefefe]/10">
                       <h3 className="text-2xl font-bebas text-[#ff0054] mb-4">Booking Summary</h3>
                       <dl className="space-y-4">
                         <div className="flex justify-between">
                           <dt className="text-[#fbe40b]/70">Service:</dt>
                           <dd className="text-[#fefefe] font-medium">{bookingSummary.service}</dd>
                         </div>
                         <div className="flex justify-between">
                           <dt className="text-[#fbe40b]/70">Option:</dt>
                           <dd className="text-[#fefefe] font-medium">{bookingSummary.option}</dd>
                         </div>
                         {bookingSummary.package && (
                           <div className="flex justify-between">
                             <dt className="text-[#fbe40b]/70">Package:</dt>
                             <dd className="text-[#fefefe] font-medium">{bookingSummary.package}</dd>
                           </div>
                         )}
                         <div className="flex justify-between">
                           <dt className="text-[#fbe40b]/70">Date:</dt>
                           <dd className="text-[#fefefe] font-medium">{bookingSummary.date}</dd>
                         </div>
                         <div className="flex justify-between">
                           <dt className="text-[#fbe40b]/70">Customer:</dt>
                           <dd className="text-[#fefefe] font-medium">{bookingSummary.customer}</dd>
                         </div>
                         <div className="flex justify-between">
                           <dt className="text-[#fbe40b]/70">Contact:</dt>
                           <dd className="text-[#fefefe] font-medium">{bookingSummary.contact}</dd>
                         </div>

                         <div className="pt-4 border-t border-[#fefefe]/10 flex justify-between">
                           <dt className="text-xl text-[#ff0054]">Total:</dt>
                           <dd className="text-xl text-[#fbe40b] font-bold">${(bookingSummary.price/100).toFixed(2)}</dd>
                         </div>
                       </dl>
                     </div>

                     {/* Stripe Payment Form */}
                     <div>
                       <StripeCheckout
                           bookingData={{
                             amount: booking.selectedOptionPrice,
                             serviceId: booking.serviceId,
                             serviceName: booking.serviceName,
                             optionName: booking.selectedOption + (booking.selectedPackage ? ` - ${booking.selectedPackage}` : ''),
                             date: booking.date as Date,
                             customerInfo: booking.personalInfo
                           }}
                           onSuccess={handlePaymentSuccess}
                           onCancel={goToPreviousStep}
                       />
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </div>
         )}

         {/* Final Confirmation */}
         {booking.paymentComplete && (
             <div className="max-w-2xl mx-auto text-center">
               <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                 <CardContent className="p-12">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Check className="w-10 h-10 text-green-500" />
                   </div>
                   <h2 className="text-4xl font-bebas text-[#ff0054] mb-4">Booking Completed!</h2>
                   <p className="text-[#fefefe]/80 text-xl mb-8">
                     Thank you for your booking #{booking.bookingId}. We've sent a confirmation email to {booking.personalInfo.email}.
                   </p>
                   <p className="text-[#fefefe]/80 text-lg mb-8">
                     You will be redirected to the confirmation page momentarily...
                   </p>
                   <Button
                       className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium text-xl px-8 py-6"
                       asChild
                   >
                     <Link href="/">
                       Return to Home
                     </Link>
                   </Button>
                 </CardContent>
               </Card>
             </div>
         )}
       </div>
     </section>
 )
}
