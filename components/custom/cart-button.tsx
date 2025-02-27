// components/custom/cart-button.tsx
"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import CartDrawer from "./cart-drawer"

const CartButton = () => {
    const { totalItems } = useCart()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                variant="ghost"
                className="relative p-0 h-9 w-9 rounded-full"
                onClick={() => setIsOpen(true)}
            >
                <ShoppingCart className="h-5 w-5 text-[#fefefe]" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#ff0054] text-[#fefefe] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
                )}
            </Button>

            <CartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}

export default CartButton