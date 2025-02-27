// app/booking-confirmation/[id]/page.tsx
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, Clock, MapPin, Phone, Mail, Download } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Asegúrate de exportar esta función para habilitar la caché de Next.js
export const revalidate = 0; // sin caché para tener datos actualizados

// Función para obtener los datos de la reserva desde la base de datos
async function getBookingData(id: string) {
    // Verificar que el id sea válido
    if (!id || typeof id !== 'string') {
        return null;
    }

    try {
        // Buscar la reserva en la base de datos
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                customer: true,
            },
        });

        return booking;
    } catch (error) {
        console.error("Error obteniendo datos de la reserva:", error);
        return null;
    }
}

export default async function BookingConfirmationPage({
                                                          params,
                                                      }: {
    params: { id: string };
}) {
    // Obtener datos de la reserva
    const booking = await getBookingData(params.id);

    // Si no encontramos la reserva, mostrar una página 404
    if (!booking) {
        notFound();
    }

    // Formatear la fecha para mostrarla
    const formattedDate = new Date(booking.bookingDate).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
                                    <p className="text-[#fefefe] text-xl font-medium">{booking.id}</p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {booking.status === 'confirmed' ? 'Confirmada' : booking.status}
                  </span>
                                </div>
                            </div>

                            {/* Información del Servicio */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bebas text-[#fefefe]">Detalles del Servicio</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <p className="text-[#fefefe]/60 text-sm">Servicio</p>
                                        <p className="text-[#fefefe] font-medium">{booking.serviceName}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <p className="text-[#fefefe]/60 text-sm">Paquete</p>
                                        <p className="text-[#fefefe] font-medium">{booking.optionName}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Fecha y Hora */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bebas text-[#fefefe]">Fecha de Reserva</h3>
                                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                    <Calendar className="h-6 w-6 text-[#ff0054]" />
                                    <div>
                                        <p className="text-[#fefefe] font-medium">{formattedDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Información del Cliente */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bebas text-[#fefefe]">Información de Contacto</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <div className="pt-1">
                                            <Phone className="h-5 w-5 text-[#ff0054]" />
                                        </div>
                                        <div>
                                            <p className="text-[#fefefe]/60 text-sm">Teléfono</p>
                                            <p className="text-[#fefefe] font-medium">{booking.customer.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <div className="pt-1">
                                            <Mail className="h-5 w-5 text-[#ff0054]" />
                                        </div>
                                        <div>
                                            <p className="text-[#fefefe]/60 text-sm">Email</p>
                                            <p className="text-[#fefefe] font-medium">{booking.customer.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-[#ff0054]/20">
                                        <div className="pt-1">
                                            <MapPin className="h-5 w-5 text-[#ff0054]" />
                                        </div>
                                        <div>
                                            <p className="text-[#fefefe]/60 text-sm">Cliente</p>
                                            <p className="text-[#fefefe] font-medium">
                                                {`${booking.customer.firstName} ${booking.customer.lastName}`}
                                            </p>
                                        </div>
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
                                                ${(booking.amount/100).toFixed(2)} USD
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
                                    className="bg-[#fefefe] text-[#060404] hover:bg-[#fefefe]/90 flex-1"
                                    asChild
                                >
                                    <Link href="#" onClick={() => window.print()}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Guardar Confirmación
                                    </Link>
                                </Button>

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
    );
}