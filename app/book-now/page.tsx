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
import { ChevronLeft, ChevronRight, Ship, Castle, Car, Music, CloudRain, Check, CreditCard, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import BookingSteps from "@/components/custom/booking-steps"
import StripePaymentForm from "@/components/custom/stripe-payment-form"

// Lista de servicios disponibles
const services = [
  {
    id: "pontoons",
    name: "Pontoons",
    icon: Ship,
    image: "/images/silver-2.jpg",
    options: [
      { name: "Silverwave Pontoon", price: 45000 },
      { name: "Qwest Pontoon", price: 40000 }
    ]
  },
  {
    id: "bounce",
    name: "Casas Inflables",
    icon: Castle,
    image: "/images/bounce-houses.jpg",
    options: [
      { name: "Ice Pops Mega Front Loader", price: 20000 }
    ]
  },
  {
    id: "foam",
    name: "Fiesta de Espuma",
    icon: CloudRain,
    image: "/images/foam-party.jpg",
    options: [
      { name: "Foam Party Package", price: 31500 },
      { name: "Color Foam Party Package", price: 42000 },
      { name: "Glow in the Dark Foam Party Package", price: 44500 },
      { name: "Foam Pit Package", price: 31500 }
    ]
  },
  {
    id: "transport",
    name: "Transporte de Lujo",
    icon: Car,
    image: "/images/car-services.png",
    options: [
      { name: "GMC Yukon AT4 XL 2024", price: 65000 },
      { name: "Chevrolet Suburban 2025", price: 70000 },
      { name: "BMW X7 2024", price: 85000 }
    ]
  },
  {
    id: "dj",
    name: "Servicios de DJ",
    icon: Music,
    image: "/images/dj-services.png",
    options: [
      { name: "Basic DJ", price: 35000 },
      { name: "Premium DJ", price: 50000 },
      { name: "DJ + Full Equipment", price: 75000 }
    ]
  }
]

// Mapeo de imágenes para las opciones de servicio
const serviceImageMap: Record<string, string> = {
  "Silverwave Pontoon": "/images/silver-1.jpg",
  "Qwest Pontoon": "/images/quest-c.jpg",
  "Ice Pops Mega Front Loader": "/images/bounce.jpg",
  "Foam Party Package": "/images/foam-party.jpg",
  "Color Foam Party Package": "/images/foamcolor.jpg",
  "Glow in the Dark Foam Party Package": "/images/fotofoamnoche.jpg",
  "Foam Pit Package": "/images/foampit.png",
  "GMC Yukon AT4 XL 2024": "/images/Gmc/1.jpg",
  "Chevrolet Suburban 2025": "/images/camioneta-1.png",
  "BMW X7 2024": "/images/bmw/1.jpg",
  "Basic DJ": "/images/dj-services.png",
  "Premium DJ": "/images/dj-services.png",
  "DJ + Full Equipment": "/images/dj-services.png"
}

// Días ocupados simulados
const bookedDates = [
  new Date(2025, 1, 10),
  new Date(2025, 1, 15),
  new Date(2025, 1, 20),
  new Date(2025, 1, 25),
  new Date(2025, 2, 5),
  new Date(2025, 2, 12)
]

// Componente de calendario simplificado
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
  const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

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

  const monthName = currentMonth.toLocaleString('es-ES', { month: 'long' });
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

// Estructura de datos para el seguimiento de la reserva
interface BookingState {
  step: number;
  serviceId: string;
  serviceName: string;
  selectedOption: string;
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

// Función para generar un ID de reserva de ejemplo (simulado)
// En una implementación real, esto vendría de la base de datos
const generateBookingId = () => {
  return `B${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

export default function BookNowPage() {
  // Estado para rastrear el proceso de reserva
  const [booking, setBooking] = useState<BookingState>({
    step: 1,
    serviceId: "",
    serviceName: "",
    selectedOption: "",
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

  // Seleccionar un servicio y avanzar al paso 2
  const handleServiceSelection = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setBooking({
      ...booking,
      step: 2,
      serviceId,
      serviceName: service?.name || ""
    });

    // Desplazarse al inicio del formulario
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Seleccionar una opción de servicio
  const handleOptionSelection = (optionName: string, price: number) => {
    setBooking({
      ...booking,
      selectedOption: optionName,
      selectedOptionPrice: price
    });
  };

  // Actualizar la información personal
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking({
      ...booking,
      personalInfo: {
        ...booking.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  // Avanzar al siguiente paso
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

  // Retroceder al paso anterior
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

  // Manejar la selección de fecha
  const handleDateSelection = (date: Date) => {
    setBooking({
      ...booking,
      date
    });
  };

  // Verificar si se puede avanzar al siguiente paso
  const canProceedToNextStep = () => {
    switch (booking.step) {
      case 1:
        return !!booking.serviceId;
      case 2:
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

  // Finalizar el proceso de pago
  const handlePaymentSuccess = () => {
    // Simulamos la generación de un ID de reserva
    // En una implementación real, esto vendría de la API
    const bookingId = generateBookingId();

    setBooking({
      ...booking,
      bookingId,
      paymentComplete: true
    });

    // Redireccionar a la página de confirmación después de 2 segundos
    setTimeout(() => {
      window.location.href = `/booking-confirmation/${bookingId}`;
    }, 2000);
  };

  // Obtener el servicio seleccionado
  const selectedService = services.find(s => s.id === booking.serviceId);

  // Información de resumen para mostrar en el paso final
  const getBookingSummary = () => {
    const dateFormatted = booking.date
        ? booking.date.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        : 'No seleccionada';

    return {
      service: selectedService?.name || '',
      option: booking.selectedOption,
      price: booking.selectedOptionPrice,
      date: dateFormatted,
      customer: `${booking.personalInfo.firstName} ${booking.personalInfo.lastName}`,
      contact: `${booking.personalInfo.email} | ${booking.personalInfo.phone}`
    };
  };

  // Para el paso de confirmación final
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
            Reserva Tus Servicios
          </h1>

          {/* Indicador de pasos */}
          {booking.step > 1 && (
              <div className="mb-8">
                <BookingSteps
                    currentStep={booking.step}
                    totalSteps={4}
                />
              </div>
          )}

          {/* Paso 1: Selección de Servicio */}
          {booking.step === 1 && (
              <>
                <h2 className="text-center text-4xl md:text-5xl font-bebas mb-12 text-[#fefefe]">
                  Selecciona el Servicio que Deseas Reservar
                </h2>

                {/* Tarjetas de Servicio */}
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

          {/* Paso 2: Formulario de Detalles Personales */}
          {booking.step === 2 && selectedService && (
              <div className="max-w-4xl mx-auto">
                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                      Detalles de tu Reserva
                    </CardTitle>
                    <CardDescription className="text-center text-[#fefefe] text-lg">
                      Has seleccionado: {selectedService.name}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <div ref={formRef} className="space-y-6">
                      {/* Selección del paquete */}
                      <div className="space-y-2">
                        <Label className="text-[#fefefe] text-xl font-bebas">Selecciona un Paquete</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.options.map((option) => (
                              <div
                                  key={option.name}
                                  className={cn(
                                      "border-2 rounded-lg p-4 cursor-pointer transition-all duration-300",
                                      booking.selectedOption === option.name
                                          ? "border-[#ff0054] bg-[#ff0054]/10"
                                          : "border-[#fefefe]/20 hover:border-[#fefefe]/60"
                                  )}
                                  onClick={() => handleOptionSelection(option.name, option.price)}
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="text-[#fefefe] font-medium">{option.name}</h4>
                                  <span className="text-[#fbe40b] font-bold">${(option.price/100).toFixed(2)}</span>
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>

                      {/* Preview Image para la opción seleccionada */}
                      {booking.selectedOption && (
                          <div className="mt-6 space-y-2">
                            <Label className="text-[#fefefe] text-xl font-bebas">Vista Previa del Paquete</Label>
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

                      {/* Información personal */}
                      <div className="pt-6 border-t border-[#fefefe]/10">
                        <h3 className="text-[#fefefe] text-2xl font-bebas mb-4">Información Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#fefefe]">Nombre</Label>
                            <Input
                                name="firstName"
                                value={booking.personalInfo.firstName}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="Tu nombre"
                                required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#fefefe]">Apellido</Label>
                            <Input
                                name="lastName"
                                value={booking.personalInfo.lastName}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="Tu apellido"
                                required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#fefefe]">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                value={booking.personalInfo.email}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="tucorreo@ejemplo.com"
                                required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#fefefe]">Teléfono</Label>
                            <Input
                                name="phone"
                                type="tel"
                                value={booking.personalInfo.phone}
                                onChange={handlePersonalInfoChange}
                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                placeholder="Tu número de teléfono"
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
                      Regresar
                    </Button>

                    <Button
                        onClick={goToNextStep}
                        disabled={!canProceedToNextStep()}
                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium"
                    >
                      Continuar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
          )}

          {/* Paso 3: Selección de Fecha */}
          {booking.step === 3 && (
              <div className="max-w-4xl mx-auto">
                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                      <Calendar className="inline-block mr-2 h-8 w-8" />
                      Elige la Fecha
                    </CardTitle>
                    <CardDescription className="text-center text-[#fefefe] text-lg">
                      {booking.selectedOption}
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
                          <span className="text-lg text-gray-600">Fecha No Disponible</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#ff0054]"></div>
                          <span className="text-lg text-gray-600">Fecha Seleccionada</span>
                        </div>
                      </div>

                      {booking.date && (
                          <div className="mt-4 p-4 bg-[#ff0054]/10 rounded-lg w-full">
                            <p className="text-center text-lg font-medium">
                              Has seleccionado: {booking.date.toLocaleDateString('es-ES', {
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
                      Regresar
                    </Button>

                    <Button
                        onClick={goToNextStep}
                        disabled={!canProceedToNextStep()}
                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium"
                    >
                      Proceder al Pago
                      <CreditCard className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
          )}

          {/* Paso 4: Pago con Stripe */}
          {booking.step === 4 && (
              <div className="max-w-4xl mx-auto">
                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bebas text-center bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                      <CreditCard className="inline-block mr-2 h-8 w-8" />
                      Finalizar Reserva
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Resumen de la Reserva */}
                      <div className="bg-[#060404]/80 p-6 rounded-xl border border-[#fefefe]/10">
                        <h3 className="text-2xl font-bebas text-[#fefefe] mb-4">Resumen de tu Reserva</h3>
                        <dl className="space-y-4">
                          <div className="flex justify-between">
                            <dt className="text-[#fefefe]/70">Servicio:</dt>
                            <dd className="text-[#fefefe] font-medium">{bookingSummary.service}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-[#fefefe]/70">Paquete:</dt>
                            <dd className="text-[#fefefe] font-medium">{bookingSummary.option}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-[#fefefe]/70">Fecha:</dt>
                            <dd className="text-[#fefefe] font-medium">{bookingSummary.date}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-[#fefefe]/70">Cliente:</dt>
                            <dd className="text-[#fefefe] font-medium">{bookingSummary.customer}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-[#fefefe]/70">Contacto:</dt>
                            <dd className="text-[#fefefe] font-medium">{bookingSummary.contact}</dd>
                          </div>

                          <div className="pt-4 border-t border-[#fefefe]/10 flex justify-between">
                            <dt className="text-xl text-[#fefefe]">Total:</dt>
                            <dd className="text-xl text-[#fbe40b] font-bold">${(bookingSummary.price/100).toFixed(2)}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Formulario de Pago Stripe */}
                      <div>
                        <StripePaymentForm
                            amount={booking.selectedOptionPrice}
                            serviceName={booking.selectedOption}
                            onSuccess={handlePaymentSuccess}
                            onCancel={goToPreviousStep}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          )}

          {/* Confirmación Final */}
          {booking.paymentComplete && (
              <div className="max-w-2xl mx-auto text-center">
                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm mb-8">
                  <CardContent className="p-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-bebas text-[#fefefe] mb-4">¡Reserva Completada!</h2>
                    <p className="text-[#fefefe]/80 text-xl mb-8">
                      Gracias por tu reserva #{booking.bookingId}. Hemos enviado un correo de confirmación a {booking.personalInfo.email}.
                    </p>
                    <p className="text-[#fefefe]/80 text-lg mb-8">
                      Serás redirigido a la página de confirmación en un momento...
                    </p>
                    <Button
                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-medium text-xl px-8 py-6"
                        asChild
                    >
                      <Link href="/">
                        Volver al Inicio
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