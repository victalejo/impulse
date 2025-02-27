// components/custom/stripe-payment-integration.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Cargar Stripe fuera del componente para evitar recargas innecesarias
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
    bookingData: {
        amount: number;
        serviceId: string;
        serviceName: string;
        optionName: string;
        date: Date;
        customerInfo: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
    };
    onSuccess: (bookingId: string) => void;
    onCancel: () => void;
}

// Componente principal que contiene Elements de Stripe
export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
                                                                  bookingData,
                                                                  onSuccess,
                                                                  onCancel
                                                              }) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookingId, setBookingId] = useState<string | null>(null);

    useEffect(() => {
        // Crear PaymentIntent en el servidor
        const createPaymentIntent = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al crear el intent de pago');
                }

                const data = await response.json();
                setClientSecret(data.clientSecret);
                setBookingId(data.bookingId);
            } catch (err: any) {
                console.error('Error:', err);
                setError(err.message || 'Ocurrió un error al procesar el pago');
            } finally {
                setIsLoading(false);
            }
        };

        createPaymentIntent();
    }, [bookingData]);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#ff0054',
                colorBackground: '#ffffff',
                colorText: '#060404',
                colorDanger: '#df1b41',
                fontFamily: 'system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '8px',
            },
            rules: {
                '.Label': {
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                }
            }
        }
    };

    if (isLoading) {
        return (
            <Card className="w-full flex items-center justify-center py-12">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#ff0054] mx-auto mb-4" />
                    <p className="text-[#fefefe]">Preparando el pago...</p>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="p-6">
                    <div className="text-center text-red-500">
                        <p className="text-lg font-medium mb-4">Error al procesar el pago</p>
                        <p>{error}</p>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="mt-4"
                        >
                            Volver a intentar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!clientSecret) {
        return null;
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
                onSuccess={() => onSuccess(bookingId || '')}
                onCancel={onCancel}
            />
        </Elements>
    );
};

// Componente de formulario de pago
const CheckoutForm: React.FC<{
    onSuccess: () => void;
    onCancel: () => void;
}> = ({ onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js aún no ha cargado
            return;
        }

        setIsProcessing(true);
        setPaymentMessage(null);

        // Confirmar el pago con Stripe.js
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Redireccionar a la URL de confirmación después del pago
                return_url: `${window.location.origin}/booking-confirmation`,
            },
            redirect: 'if_required', // Solo redirigir si es necesario (3D Secure, etc.)
        });

        if (error) {
            // Mostrar mensaje de error
            setPaymentMessage(error.message || "Ocurrió un error con tu pago");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // El pago se ha completado correctamente
            setPaymentSuccess(true);
            setPaymentMessage("¡Pago completado con éxito!");

            // Llamar al callback de éxito después de un breve retraso
            setTimeout(() => {
                onSuccess();
            }, 2000);
        } else {
            setPaymentMessage("Estado de pago inesperado. Por favor, contacta con soporte.");
            setIsProcessing(false);
        }
    };

    if (paymentSuccess) {
        return (
            <Card className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl border-none">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                        <Check className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-500">¡Pago Completado!</CardTitle>
                    <p className="text-gray-600">
                        Tu pago ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu reserva.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-white rounded-xl shadow-2xl border-none p-2">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">Información de Pago</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <form id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />

                    {paymentMessage && (
                        <div className={`mt-4 p-3 rounded-md ${paymentSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {paymentMessage}
                        </div>
                    )}
                </form>
            </CardContent>

            <CardFooter className="flex justify-between space-x-4">
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className="w-1/3 border-gray-300 text-gray-600 hover:bg-gray-50"
                    disabled={isProcessing}
                >
                    Atrás
                </Button>
                <Button
                    onClick={handleSubmit}
                    className={cn(
                        "w-2/3 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-white",
                        isProcessing && "opacity-80 cursor-not-allowed"
                    )}
                    disabled={isProcessing || !stripe || !elements}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                        </>
                    ) : (
                        <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pagar Ahora
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default StripeCheckout;