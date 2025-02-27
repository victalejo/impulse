// Crear este archivo: app/booking-confirmation/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Calendar, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage({ params }: { params: { id: string } }) {
    const [bookingData, setBookingData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Intenta recuperar los datos de la reserva del localStorage
        const savedBooking = localStorage.getItem('lastBooking')
        if (savedBooking) {
            setBookingData(JSON.parse(savedBooking))
        } else {
            // Si no hay datos en localStorage, usa datos simulados
            setBookingData({
                id: params.id,
                serviceName: "Servicio Reservado",
                optionName: "Opción del Servicio",
                amount: 45000,
                date: new Date().toISOString(),
                customer: {
                    firstName: "Cliente",
                    lastName: "Ejemplo",
                    email: "cliente@ejemplo.com",
                    phone: "(123) 456-7890"
                },
                status: "confirmed"
            })
        }
        setLoading(false)
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060404] flex items-center justify-center py-24">
                <div className="text-[#fefefe] text-2xl">Cargando confirmación...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#060404] py-24">
            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Efectos de fondo */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
                </div>

                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm shadow-xl relative overflow-hidden">
                    {/* Diseño decorativo - Esquinas con gradiente */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#ff0054] to-transparent rounded-br-3xl opacity-30"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#fbe40b] to-transparent rounded-tl-3xl opacity-30"></div>

                    <CardHeader className="pb-2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Check className="w-8 h-8 text-green-500" />
                            </div>
                            <CardTitle className="text-4xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text text-center">
                                ¡Reserva Confirmada!
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="pb-8">
                        <div className="px-6 py-8 space-y-8">
                            {/* Número de Reserva y Estado */}
                            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                <div>
                                    <p className="text-[#fefefe]/60 text-sm">Número de Reserva</p>
                                    <p className="text-[#fefefe] text-xl font-medium">{params.id}</p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Confirmada
                  </span>
                                </div>
                            </div>

                            {/* Información del Servicio */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bebas text-[#fefefe]">Detalles del Servicio</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <p className="text-[#fefefe]/60 text-sm">Servicio</p>
                                        <p className="text-[#fefefe] font-medium">
                                            {bookingData?.serviceName || "Servicio Premium"}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <p className="text-[#fefefe]/60 text-sm">Paquete</p>
                                        <p className="text-[#fefefe] font-medium">
                                            {bookingData?.optionName || "Paquete Estándar"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pago */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bebas text-[#fefefe]">Información de Pago</h3>
                                <div className="bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[#fefefe]/60 text-sm">Monto Total</p>
                                            <p className="text-[#fbe40b] text-2xl font-bold">
                                                ${((bookingData?.amount || 45000)/100).toFixed(2)} USD
                                            </p>
                                        </div>
                                        <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Pagado
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] flex-1"
                                    asChild
                                >
                                    <Link href="/">
                                        Volver al Inicio
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información de Contacto Adicional */}
                <div className="mt-8 text-center text-[#fefefe]/60 text-sm">
                    <p>Si tienes alguna pregunta sobre tu reserva, contáctanos al</p>
                    <p className="text-[#fefefe] mt-1">(862) 686-5129 o info@impulserentals.com</p>
                </div>
            </div>
        </div>
    )
}