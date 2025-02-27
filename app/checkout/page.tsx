// app/checkout/page.tsx
"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingCart, CreditCard, Truck, Check, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Definir los pasos del checkout
enum CheckoutStep {
    SHIPPING_INFO = 0,
    PAYMENT = 1,
    CONFIRMATION = 2
}

// Interfaz para la información de envío
interface ShippingInfo {
    firstName: string
    lastName: string
    email: string
    phone: string
    address1: string
    address2: string
    city: string
    region: string
    zip: string
    country: string
}

export default function CheckoutPage() {
    const { items, totalAmount, clearCart } = useCart()
    const { toast } = useToast()
    const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING_INFO)
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)

    // Estado para la información de envío
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        region: '',
        zip: '',
        country: 'US', // Por defecto Estados Unidos
    })

    // Función para verificar si se puede continuar al siguiente paso
    const canProceedToNextStep = () => {
        if (currentStep === CheckoutStep.SHIPPING_INFO) {
            const { firstName, lastName, email, phone, address1, city, region, zip, country } = shippingInfo
            return firstName && lastName && email && phone && address1 && city && region && zip && country
        }
        return true
    }

    // Función para manejar el cambio en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Función para avanzar al siguiente paso
    const goToNextStep = () => {
        if (currentStep < CheckoutStep.CONFIRMATION) {
            setCurrentStep(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Función para retroceder al paso anterior
    const goToPreviousStep = () => {
        if (currentStep > CheckoutStep.SHIPPING_INFO) {
            setCurrentStep(prev => prev - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Función para simular el proceso de pago
    const processPayment = async () => {
        if (items.length === 0) {
            toast({
                title: "Carrito vacío",
                description: "No hay productos en tu carrito para procesar.",
                variant: "destructive"
            })
            return
        }

        setIsProcessing(true)

        try {
            // Preparar los elementos de línea para la orden
            const lineItems = items.map(item => ({
                product_id: item.productId,
                variant_id: item.variantId,
                quantity: item.quantity
            }))

            // Crear la orden para enviar a Printify
            const orderData = {
                external_id: `order-${Date.now()}`,
                label: `ORDER-${Math.floor(Math.random() * 10000)}`,
                line_items: lineItems,
                shipping_method: 1,
                send_shipping_notification: false,
                address_to: {
                    first_name: shippingInfo.firstName,
                    last_name: shippingInfo.lastName,
                    email: shippingInfo.email,
                    phone: shippingInfo.phone,
                    country: shippingInfo.country,
                    region: shippingInfo.region,
                    address1: shippingInfo.address1,
                    address2: shippingInfo.address2,
                    city: shippingInfo.city,
                    zip: shippingInfo.zip
                }
            }

            // Enviar la orden a través de nuestra API
            const response = await fetch('/api/wear/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear la orden');
            }

            const data = await response.json();
            const generatedOrderId = data.id || `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            setOrderId(generatedOrderId);

            // Limpiar el carrito después de una orden exitosa
            clearCart();

            // Avanzar a la página de confirmación
            setCurrentStep(CheckoutStep.CONFIRMATION);

        } catch (error) {
            console.error("Error al procesar el pago:", error)
            toast({
                title: "Error en el pago",
                description: "Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.",
                variant: "destructive"
            })
        } finally {
            setIsProcessing(false)
        }
    }

    // Verificar si hay productos en el carrito
    if (items.length === 0 && currentStep !== CheckoutStep.CONFIRMATION) {
        return (
            <div className="min-h-screen bg-[#060404] py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-[60vh]">
                    <ShoppingCart className="h-16 w-16 text-[#ff0054]/50 mb-4" />
                    <h1 className="text-3xl font-bebas text-[#fefefe] mb-6">Tu carrito está vacío</h1>
                    <p className="text-[#fefefe]/70 text-lg mb-8 text-center">
                        No hay productos en tu carrito para procesar el checkout.
                    </p>
                    <Button
                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe]"
                        asChild
                    >
                        <Link href="/wear">Explorar Productos</Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Formatear precio
    const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`

    return (
        <div className="min-h-screen bg-[#060404] py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-5xl md:text-6xl font-bebas mb-12 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
                    {currentStep === CheckoutStep.SHIPPING_INFO && "Información de Envío"}
                    {currentStep === CheckoutStep.PAYMENT && "Completar Pago"}
                    {currentStep === CheckoutStep.CONFIRMATION && "¡Pedido Confirmado!"}
                </h1>

                {/* Barra de progreso */}
                {currentStep !== CheckoutStep.CONFIRMATION && (
                    <div className="max-w-3xl mx-auto mb-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full h-1 bg-[#fefefe]/10"></div>
                            </div>
                            <div className="relative flex justify-between">
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        currentStep >= CheckoutStep.SHIPPING_INFO
                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                            : 'bg-[#fefefe]/20 text-[#fefefe]/50'
                                    }`}>
                                        {currentStep > CheckoutStep.SHIPPING_INFO ? <Check className="h-4 w-4" /> : '1'}
                                    </div>
                                    <span className={`mt-2 text-xs ${
                                        currentStep >= CheckoutStep.SHIPPING_INFO ? 'text-[#fefefe]' : 'text-[#fefefe]/50'
                                    }`}>Envío</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        currentStep >= CheckoutStep.PAYMENT
                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                            : 'bg-[#fefefe]/20 text-[#fefefe]/50'
                                    }`}>
                                        {currentStep > CheckoutStep.PAYMENT ? <Check className="h-4 w-4" /> : '2'}
                                    </div>
                                    <span className={`mt-2 text-xs ${
                                        currentStep >= CheckoutStep.PAYMENT ? 'text-[#fefefe]' : 'text-[#fefefe]/50'
                                    }`}>Pago</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        currentStep >= CheckoutStep.CONFIRMATION
                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                            : 'bg-[#fefefe]/20 text-[#fefefe]/50'
                                    }`}>
                                        {currentStep > CheckoutStep.CONFIRMATION ? <Check className="h-4 w-4" /> : '3'}
                                    </div>
                                    <span className={`mt-2 text-xs ${
                                        currentStep >= CheckoutStep.CONFIRMATION ? 'text-[#fefefe]' : 'text-[#fefefe]/50'
                                    }`}>Confirmación</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Formulario de checkout */}
                    <div className="md:col-span-7">
                        {/* Paso 1: Información de Envío */}
                        {currentStep === CheckoutStep.SHIPPING_INFO && (
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl font-bebas text-[#fefefe]">
                                        <Truck className="mr-2 h-5 w-5 text-[#ff0054]" />
                                        Dirección de Envío
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-[#fefefe]">Nombre</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={shippingInfo.firstName}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Tu nombre"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-[#fefefe]">Apellido</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={shippingInfo.lastName}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Tu apellido"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-[#fefefe]">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={shippingInfo.email}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="tu@email.com"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-[#fefefe]">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={shippingInfo.phone}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Tu número de teléfono"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address1" className="text-[#fefefe]">Dirección</Label>
                                        <Input
                                            id="address1"
                                            name="address1"
                                            value={shippingInfo.address1}
                                            onChange={handleInputChange}
                                            className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                            placeholder="Calle y número"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address2" className="text-[#fefefe]">Apartamento, suite, etc. (opcional)</Label>
                                        <Input
                                            id="address2"
                                            name="address2"
                                            value={shippingInfo.address2}
                                            onChange={handleInputChange}
                                            className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                            placeholder="Información adicional de dirección"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-[#fefefe]">Ciudad</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={shippingInfo.city}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Tu ciudad"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="region" className="text-[#fefefe]">Estado/Provincia</Label>
                                            <Input
                                                id="region"
                                                name="region"
                                                value={shippingInfo.region}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Estado o provincia"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="zip" className="text-[#fefefe]">Código Postal</Label>
                                            <Input
                                                id="zip"
                                                name="zip"
                                                value={shippingInfo.zip}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Código postal"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country" className="text-[#fefefe]">País</Label>
                                            <select
                                                id="country"
                                                name="country"
                                                value={shippingInfo.country}
                                                onChange={handleInputChange}
                                                className="w-full h-10 rounded-md border border-[#ff0054]/20 bg-[#fefefe] px-3 py-2 text-[#060404]"
                                                required
                                            >
                                                <option value="US">Estados Unidos</option>
                                                <option value="MX">México</option>
                                                <option value="CA">Canadá</option>
                                                <option value="ES">España</option>
                                                {/* Añadir más países según sea necesario */}
                                            </select>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="justify-end border-t border-[#ff0054]/20 pt-4">
                                    <Button
                                        onClick={goToNextStep}
                                        disabled={!canProceedToNextStep()}
                                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                    >
                                        Continuar
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}

                        {/* Paso 2: Información de Pago */}
                        {currentStep === CheckoutStep.PAYMENT && (
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl font-bebas text-[#fefefe]">
                                        <CreditCard className="mr-2 h-5 w-5 text-[#ff0054]" />
                                        Información de Pago
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Aquí iría el formulario de tarjeta de crédito o integración con pasarela de pago */}
                                    <div className="bg-[#fefefe] rounded-lg p-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cardNumber" className="text-[#060404]">Número de Tarjeta</Label>
                                                <Input
                                                    id="cardNumber"
                                                    placeholder="1234 5678 9012 3456"
                                                    className="border-[#ff0054]/20 text-[#060404]"
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="expiry" className="text-[#060404]">Fecha de Expiración</Label>
                                                    <Input
                                                        id="expiry"
                                                        placeholder="MM/AA"
                                                        className="border-[#ff0054]/20 text-[#060404]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvc" className="text-[#060404]">CVC</Label>
                                                    <Input
                                                        id="cvc"
                                                        placeholder="123"
                                                        className="border-[#ff0054]/20 text-[#060404]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zip" className="text-[#060404]">Código Postal</Label>
                                                    <Input
                                                        id="zipCode"
                                                        placeholder="12345"
                                                        className="border-[#ff0054]/20 text-[#060404]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="nameOnCard" className="text-[#060404]">Nombre en la Tarjeta</Label>
                                                <Input
                                                    id="nameOnCard"
                                                    placeholder="Nombre completo"
                                                    className="border-[#ff0054]/20 text-[#060404]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-[#fefefe]/5 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="text-[#fefefe] font-medium">Total a pagar</h3>
                                            <p className="text-[#fefefe]/70 text-sm">Incluye envío e impuestos</p>
                                        </div>
                                        <span className="text-2xl font-bold text-[#fbe40b]">{formatPrice(totalAmount)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="justify-between border-t border-[#ff0054]/20 pt-4">
                                    <Button
                                        onClick={goToPreviousStep}
                                        variant="outline"
                                        className="border-[#fefefe]/50 text-[#fefefe] hover:bg-[#fefefe]/10"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Regresar
                                    </Button>

                                    <Button
                                        onClick={processPayment}
                                        disabled={isProcessing}
                                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                Completar Compra
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}

                        {/* Paso 3: Confirmación */}
                        {currentStep === CheckoutStep.CONFIRMATION && (
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                                <CardContent className="pt-6 pb-8 px-6">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <Check className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h2 className="text-3xl font-bebas text-[#fefefe] mb-2">¡Gracias por tu compra!</h2>
                                        <p className="text-[#fefefe]/70 mb-6">
                                            Tu pedido ha sido recibido y está siendo procesado.
                                        </p>

                                        <div className="bg-[#fefefe]/5 p-4 rounded-lg w-full mb-6">
                                            <p className="text-[#fefefe]/70 text-sm">Número de Pedido</p>
                                            <p className="text-[#fefefe] font-medium text-lg">{orderId}</p>
                                        </div>

                                        <p className="text-[#fefefe]/70 text-sm mb-8">
                                            Hemos enviado un correo electrónico con la confirmación del pedido a{' '}
                                            <span className="text-[#fefefe]">{shippingInfo.email}</span>
                                        </p>

                                        <div className="flex space-x-4">
                                            <Button
                                                className="bg-[#fefefe]/10 hover:bg-[#fefefe]/20 text-[#fefefe]"
                                                asChild
                                            >
                                                <Link href="/wear">Seguir Comprando</Link>
                                            </Button>

                                            <Button
                                                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                                asChild
                                            >
                                                <Link href="/">Volver al Inicio</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Resumen del carrito */}
                    {currentStep !== CheckoutStep.CONFIRMATION && (
                        <div className="md:col-span-5">
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30 sticky top-32">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl font-bebas text-[#fefefe]">
                                        <ShoppingCart className="mr-2 h-5 w-5 text-[#ff0054]" />
                                        Resumen del Pedido
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Lista de productos */}
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 py-3">
                                                <div className="relative h-16 w-16 rounded overflow-hidden border border-[#ff0054]/20">
                                                    <Image
                                                        src={item.image || "/logo.PNG"}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[#fefefe] font-medium truncate">{item.title}</h4>
                                                    {(item.size || item.color) && (
                                                        <p className="text-[#fefefe]/60 text-sm">
                                                            {item.size && `Talla: ${item.size}`}
                                                            {item.size && item.color && ' | '}
                                                            {item.color && `Color: ${item.color}`}
                                                        </p>
                                                    )}
                                                    <div className="flex justify-between mt-1">
                                                        <span className="text-[#fefefe]/60 text-sm">Cant: {item.quantity}</span>
                                                        <span className="text-[#fbe40b]">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="bg-[#ff0054]/20" />

                                    {/* Totales */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-[#fefefe]/70">Subtotal</span>
                                            <span className="text-[#fefefe]">{formatPrice(totalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#fefefe]/70">Envío</span>
                                            <span className="text-[#fefefe]">Calculado en el siguiente paso</span>
                                        </div>
                                        <Separator className="bg-[#ff0054]/20" />
                                        <div className="flex justify-between">
                                            <span className="text-[#fefefe] font-medium">Total</span>
                                            <span className="text-xl font-bold text-[#fbe40b]">{formatPrice(totalAmount)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}