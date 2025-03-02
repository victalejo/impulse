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

// Load Stripe outside of a component to avoid unnecessary reloads
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

// Main component that contains Stripe Elements
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
        // Create PaymentIntent on the server
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
                    throw new Error(errorData.error || 'Error creating payment intent');
                }

                const data = await response.json();
                setClientSecret(data.clientSecret);
                setBookingId(data.bookingId);
            } catch (err: any) {
                console.error('Error:', err);
                setError(err.message || 'An error occurred while processing your payment');
            } finally {
                setIsLoading(false);
            }
        };

        createPaymentIntent();
    }, [bookingData]);

    const options = clientSecret ? {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
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
    } : undefined;

    if (isLoading) {
        return (
            <Card className="w-full flex items-center justify-center py-6 sm:py-12">
                <div className="text-center">
                    <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-[#ff0054] mx-auto mb-2 sm:mb-4" />
                    <p className="text-[#fefefe] text-sm sm:text-base">Preparing payment...</p>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="p-4 sm:p-6">
                    <div className="text-center text-red-500">
                        <p className="text-base sm:text-lg font-medium mb-2 sm:mb-4">Payment Processing Error</p>
                        <p className="text-sm sm:text-base">{error}</p>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="mt-3 sm:mt-4 text-xs sm:text-sm"
                        >
                            Try Again
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

// Payment form component
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
            // Stripe.js has not loaded yet
            return;
        }

        setIsProcessing(true);
        setPaymentMessage(null);

        // Confirm payment with Stripe.js
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Redirect to confirmation URL after payment
                return_url: `${window.location.origin}/booking-confirmation`,
            },
            redirect: 'if_required', // Only redirect if necessary (3D Secure, etc.)
        });

        if (error) {
            // Show error message
            setPaymentMessage(error.message || "An error occurred with your payment");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment has been completed successfully
            setPaymentSuccess(true);
            setPaymentMessage("Payment completed successfully!");

            // Call success callback after a brief delay
            setTimeout(() => {
                onSuccess();
            }, 2000);
        } else {
            setPaymentMessage("Unexpected payment status. Please contact support.");
            setIsProcessing(false);
        }
    };

    if (paymentSuccess) {
        return (
            <Card className="w-full max-w-md mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-2xl border-none">
                <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                        <Check className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-green-500">Payment Completed!</CardTitle>
                    <p className="text-sm sm:text-base text-gray-600">
                        Your payment has been processed successfully. You will receive an email with your booking details.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-white rounded-xl shadow-2xl border-none p-2">
            <CardHeader className="p-3 sm:p-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg sm:text-2xl font-bold text-gray-800">Payment Information</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4">
                <form id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />

                    {paymentMessage && (
                        <div className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-md text-sm sm:text-base ${paymentSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {paymentMessage}
                        </div>
                    )}
                </form>
            </CardContent>

            <CardFooter className="flex justify-between space-x-2 sm:space-x-4 p-3 sm:p-4">
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className="w-1/3 border-gray-300 text-gray-600 hover:bg-gray-50 text-xs sm:text-sm py-1.5 sm:py-2"
                    disabled={isProcessing}
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmit}
                    className={cn(
                        "w-2/3 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] text-xs sm:text-sm py-1.5 sm:py-2",
                        isProcessing && "opacity-80 cursor-not-allowed"
                    )}
                    disabled={isProcessing || !stripe || !elements}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <CreditCard className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Pay Now
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default StripeCheckout;