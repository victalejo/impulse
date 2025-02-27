// context/cart-context.tsx
"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define la estructura del producto en el carrito
export interface CartItem {
    id: string;
    productId: string;
    variantId: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    color?: string;
}

// Define la estructura del estado del carrito
interface CartState {
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
}

// Define los tipos de acciones para el carrito
type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

// Estado inicial del carrito
const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingItemIndex >= 0) {
                // Si el item ya existe, actualiza la cantidad
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += action.payload.quantity;

                return {
                    ...state,
                    items: updatedItems,
                    totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
                    totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
                };
            } else {
                // Si el item no existe, añádelo al carrito
                const updatedItems = [...state.items, action.payload];

                return {
                    ...state,
                    items: updatedItems,
                    totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
                    totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
                };
            }
        }

        case 'REMOVE_ITEM': {
            const updatedItems = state.items.filter((item) => item.id !== action.payload);

            return {
                ...state,
                items: updatedItems,
                totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
                totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };
        }

        case 'UPDATE_QUANTITY': {
            const updatedItems = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
                totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

// Crear el contexto del carrito
interface CartContextType extends CartState {
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor del contexto del carrito
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Cargar el carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart) as CartState;

            // Inicializar el estado con los datos guardados
            Object.keys(parsedCart).forEach(key => {
                if (key === 'items') {
                    parsedCart.items.forEach(item => {
                        dispatch({
                            type: 'ADD_ITEM',
                            payload: item
                        });
                    });
                }
            });
        }
    }, []);

    // Guardar el carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    // Funciones para manipular el carrito
    const addItem = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const contextValue: CartContextType = {
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Hook personalizado para usar el contexto del carrito
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};