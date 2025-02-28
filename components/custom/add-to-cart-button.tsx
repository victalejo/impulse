// components/custom/add-to-cart-button.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Loader2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from 'uuid'

interface AddToCartButtonProps {
    productId: string
    variantId: number
    title: string
    price: number
    image: string
    size?: string
    color?: string
    disabled?: boolean
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productId,
    variantId,
    title,
    price,
    image,
    size,
    color,
    disabled = false
}) => {
    const { addItem } = useCart()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleAddToCart = () => {
        if (disabled) return

        setLoading(true)

        // Simulate a small delay to show loading state
        setTimeout(() => {
            try {
                // Create a unique ID for the cart item
                const cartItemId = `${productId}-${variantId}-${uuidv4().slice(0, 8)}`

                // Add to cart
                addItem({
                    id: cartItemId,
                    productId,
                    variantId,
                    title,
                    price,
                    quantity: 1,
                    image,
                    size,
                    color
                })

                // Show success
                setSuccess(true)
                toast({
                    title: "Product added",
                    description: "The product has been added to your cart.",
                })

                // Reset state after a moment
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Could not add the product to your cart.",
                    variant: "destructive"
                })
            } finally {
                setLoading(false)
            }
        }, 600)
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={disabled || loading}
            className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054]
               text-[#060404] font-medium text-base sm:text-lg h-10 sm:h-12 transition-all duration-300"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
            ) : success ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            ) : (
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            )}
            {loading ? "Adding..." : success ? "Added!" : "Add to Cart"}
        </Button>
    )
}

export default AddToCartButton