// app/order-confirmation/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Package, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
    const [orderData, setOrderData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true)
                // Hacer una solicitud a la API para obtener los detalles del pedido
                const response = await fetch(`/api/wear/orders?id=${params.id}`)

                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del pedido')
                }

                const data = await response.json()
                setOrderData(data)
            } catch (error: any) {
                console.error('Error al cargar los detalles del pedido:', error)
                setError(error.message || 'Error al cargar los detalles del pedido')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchOrderData()
        }
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060404] flex items-center justify-center py-24">
                <div className="text-[#fefefe] text-2xl">Cargando detalles del pedido...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#060404] py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bebas text-[#fefefe]">Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#fefefe]/70 mb-6">{error}</p>
                            <Button
                                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                asChild
                            >
                                <Link href="/">Volver al Inicio</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#060404] py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-3xl font-bebas text-[#fefefe]">¡Pedido Confirmado!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <div className="bg-[#fefefe]/5 p-4 rounded-lg">
                            <p className="text-[#fefefe]/70 text-sm">Número de Pedido</p>
                            <p className="text-[#fefefe] font-medium text-lg">{params.id}</p>
                        </div>

                        <div className="flex items-center bg-[#fefefe]/5 p-4 rounded-lg">
                            <Package className="h-8 w-8 text-[#ff0054] mr-4" />
                            <div>
                                <h3 className="text-[#fefefe] font-medium">Estado del Pedido</h3>
                                <p className="text-[#fefefe]/70">Tu pedido ha sido recibido y está siendo procesado.</p>
                            </div>
                        </div>

                        {orderData && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bebas text-[#fefefe]">Detalles del Pedido</h3>
                                {/* Aquí irían más detalles del pedido si están disponibles */}
                            </div>
                        )}

                        <div className="text-center space-y-4 pt-6">
                            <p className="text-[#fefefe]/70">
                                Hemos enviado un correo electrónico con la confirmación de tu pedido. Si tienes alguna pregunta sobre tu pedido, por favor contáctanos.
                            </p>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    variant="outline"
                                    className="border-[#fefefe]/20 text-[#fefefe] hover:bg-[#fefefe]/10"
                                    asChild
                                >
                                    <Link href="/wear">Seguir Comprando</Link>
                                </Button>

                                <Button
                                    className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                    asChild
                                >
                                    <Link href="/">
                                        Volver al Inicio
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}