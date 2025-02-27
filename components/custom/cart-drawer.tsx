// components/custom/cart-drawer.tsx
"use client"

import { X, Trash2, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart, CartItem } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface CartDrawerProps {
    open: boolean
    onClose: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
    const { items, totalAmount, removeItem, updateQuantity, clearCart } = useCart()
    const [loading, setLoading] = useState<{[key: string]: boolean}>({})

    const handleQuantityChange = (item: CartItem, newQuantity: number) => {
        if (newQuantity < 1) return

        // Marcar como cargando
        setLoading(prev => ({ ...prev, [item.id]: true }))

        // Simular un pequeño retraso para la actualización
        setTimeout(() => {
            updateQuantity(item.id, newQuantity)
            setLoading(prev => ({ ...prev, [item.id]: false }))
        }, 300)
    }

    const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md bg-[#060404] border-l border-[#ff0054]/30">
                <SheetHeader className="border-b border-[#ff0054]/30 pb-4">
                    <div className="flex justify-between items-center">
                        <SheetTitle className="text-2xl font-bebas text-[#fefefe]">
                            Mi Carrito
                        </SheetTitle>
                        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-[#ff0054]/10">
                            <X className="h-5 w-5 text-[#fefefe]" />
                        </Button>
                    </div>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20">
                        <ShoppingBag className="h-16 w-16 text-[#ff0054]/50 mb-4" />
                        <p className="text-[#fefefe]/70 text-lg mb-6">Tu carrito está vacío</p>
                        <Button
                            className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe]"
                            onClick={onClose}
                            asChild
                        >
                            <Link href="/wear">Explorar Productos</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto py-6">
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        {/* Imagen del producto */}
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden border border-[#ff0054]/30">
                                            <Image
                                                src={item.image || "/logo.PNG"}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Información del producto */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[#fefefe] font-medium truncate">{item.title}</h4>
                                            {(item.size || item.color) && (
                                                <p className="text-[#fefefe]/60 text-sm">
                                                    {item.size && `Talla: ${item.size}`}
                                                    {item.size && item.color && ' | '}
                                                    {item.color && `Color: ${item.color}`}
                                                </p>
                                            )}
                                            <p className="text-[#fbe40b] font-bold">{formatPrice(item.price)}</p>
                                        </div>

                                        {/* Controles de cantidad */}
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 rounded-full hover:bg-[#ff0054]/10 text-[#fefefe]/70 hover:text-[#ff0054]"
                                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                disabled={item.quantity <= 1 || loading[item.id]}
                                            >
                                                <MinusCircle className="h-4 w-4" />
                                            </Button>

                                            <span className="text-[#fefefe] min-w-[24px] text-center">
                        {loading[item.id] ? '...' : item.quantity}
                      </span>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 rounded-full hover:bg-[#ff0054]/10 text-[#fefefe]/70 hover:text-[#ff0054]"
                                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                disabled={loading[item.id]}
                                            >
                                                <PlusCircle className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Botón de eliminar */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-[#fefefe]/50 hover:text-[#ff0054] hover:bg-[#ff0054]/10 h-8 w-8 rounded-full"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resumen y botones */}
                        <div className="border-t border-[#ff0054]/30 pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[#fefefe] font-medium">Subtotal</span>
                                <span className="text-xl text-[#fbe40b] font-bold">{formatPrice(totalAmount)}</span>
                            </div>

                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-[#ff0054]/50 text-[#fefefe] hover:bg-[#ff0054]/10"
                                    onClick={clearCart}
                                >
                                    Vaciar
                                </Button>
                                <Button
                                    className="flex-1 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe]"
                                    asChild
                                    onClick={onClose}
                                >
                                    <Link href="/checkout">Checkout</Link>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default CartDrawer