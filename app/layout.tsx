// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CartProvider } from '@/context/cart-context'; // Importamos el CartProvider
import ChatFlotante from '@/components/custom/chat-flotante'; // Importamos nuestro componente de chat

export const metadata: Metadata = {
    title: 'Impulse Rentals - Premier Boat & Bounce House Rentals',
    description: 'Your premier destination for boat and bounce house rentals. Create unforgettable memories with our top-quality equipment and exceptional service.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="preload" href="/fonts/BebasNeue-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/AcuminProCond-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/edo.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        </head>
        <body>
        <CartProvider> {/* Envolvemos toda la aplicación con CartProvider */}
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <ChatFlotante /> {/* Añadimos el chat flotante */}
            </ThemeProvider>
        </CartProvider>
        </body>
        </html>
    );
}