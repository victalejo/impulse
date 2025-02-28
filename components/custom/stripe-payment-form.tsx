// components/custom/stripe-payment-form.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CreditCard, Lock, Check } from "lucide-react";

interface StripePaymentFormProps {
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
    serviceName: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
    amount,
    onSuccess,
    onCancel,
    serviceName
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [cardName, setCardName] = useState('');
    const [paymentComplete, setPaymentComplete] = useState(false);

    // Function to format card number
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Function to format expiry date
    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (v.length > 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }

        return value;
    };

    // Payment process simulation
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment process (in production, this would call the Stripe API)
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentComplete(true);

            // After showing success message, call the callback
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 2000);
    };

    if (paymentComplete) {
        return (
            <Card className="w-full max-w-md mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-2xl border-none">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
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
                    <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500">
                        <Lock size={16} className="sm:size-18" />
                        <span className="text-xs sm:text-sm">Secure Payment</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="service" className="text-sm sm:text-base text-gray-700">Service</Label>
                            <span className="text-base sm:text-lg font-bold text-[#ff0054]">${(amount/100).toFixed(2)} USD</span>
                        </div>
                        <div className="p-2 sm:p-4 bg-gray-50 rounded-md">
                            <p className="text-sm sm:text-base font-medium text-gray-800">{serviceName}</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="cardName" className="text-sm sm:text-base text-gray-700">Name on Card</Label>
                        <Input
                            id="cardName"
                            placeholder="Full name"
                            className="bg-gray-50 border border-gray-200 text-gray-800 text-sm sm:text-base"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="cardNumber" className="text-sm sm:text-base text-gray-700">Card Number</Label>
                        <div className="relative">
                            <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="bg-gray-50 border border-gray-200 text-gray-800 pl-10 text-sm sm:text-base"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                maxLength={19}
                                required
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="cardExpiry" className="text-sm sm:text-base text-gray-700">Expiry Date</Label>
                            <Input
                                id="cardExpiry"
                                placeholder="MM/YY"
                                className="bg-gray-50 border border-gray-200 text-gray-800 text-sm sm:text-base"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                maxLength={5}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="cardCvc" className="text-sm sm:text-base text-gray-700">CVC</Label>
                            <Input
                                id="cardCvc"
                                placeholder="123"
                                className="bg-gray-50 border border-gray-200 text-gray-800 text-sm sm:text-base"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>

                    {/* Payment methods */}
                    <div className="pt-3 sm:pt-4 border-t border-gray-100">
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">Accepted payment methods</p>
                        <div className="flex space-x-2">
                            <img src="/images/payment/visa.svg" alt="Visa" className="h-6 sm:h-8" />
                            <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6 sm:h-8" />
                            <img src="/images/payment/amex.svg" alt="American Express" className="h-6 sm:h-8" />
                        </div>
                    </div>
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
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default StripePaymentForm;