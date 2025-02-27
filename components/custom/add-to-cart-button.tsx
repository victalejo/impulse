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

        // Simular un pequeño retraso para mostrar el estado de carga
        setTimeout(() => {
            try {
                // Crear un ID único para el item del carrito
                const cartItemId = `${productId}-${variantId}-${uuidv4().slice(0, 8)}`

                // Añadir al carrito
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

                // Mostrar éxito
                setSuccess(true)
                toast({
                    title: "Producto añadido",
                    description: "El producto ha sido añadido a tu carrito.",
                })

                // Restablecer el estado después de un momento
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "No se pudo añadir el producto al carrito.",
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
               text-[#060404] font-medium text-lg h-12"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : success ? (
                <Check className="h-5 w-5 mr-2" />
            ) : (
                <ShoppingCart className="h-5 w-5 mr-2" />
            )}
            {loading ? "Añadiendo..." : success ? "¡Añadido!" : "Añadir al Carrito"}
        </Button>
    )
}

export default AddToCartButton