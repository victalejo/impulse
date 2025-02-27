// lib/stripe.ts
import Stripe from 'stripe';

// Verificar que las claves de Stripe estén configuradas
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('La variable de entorno STRIPE_SECRET_KEY no está configurada');
}

// Crear instancia de Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia', // Usar la versión más reciente de la API de Stripe
    appInfo: {
        name: 'Impulse Rentals',
        version: '1.0.0',
    },
});

export default stripe;