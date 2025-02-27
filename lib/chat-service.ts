// lib/chat-service.ts

import { FlowiseClient } from 'flowise-sdk';

// Interfaz para los mensajes
export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// Configuración del servicio Flowise
const FLOWISE_URL = 'https://modelos.iaportafolio.com';
const CHATFLOW_ID = '67d18b37-97a1-415c-8de7-a6845ed0d367';

// Inicializar el cliente Flowise
let client: FlowiseClient;

try {
    client = new FlowiseClient({ baseUrl: FLOWISE_URL });
} catch (error) {
    console.error('Error inicializando FlowiseClient:', error);
}

// Clave para el almacenamiento local
const CHAT_HISTORY_KEY = 'impulse_chat_history';

// Función para guardar mensajes en localStorage
export const saveMessages = (messages: ChatMessage[]): void => {
    try {
        // Solo guardar los últimos 50 mensajes para evitar sobrecargar localStorage
        const messagesToSave = messages.slice(-50);
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messagesToSave));
    } catch (error) {
        console.error('Error al guardar mensajes en localStorage:', error);
    }
};

// Función para cargar mensajes desde localStorage
export const loadMessages = (): ChatMessage[] => {
    try {
        const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);
            // Convertir strings de fechas a objetos Date
            return parsedMessages.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
            }));
        }
    } catch (error) {
        console.error('Error al cargar mensajes desde localStorage:', error);
    }

    // Mensaje inicial por defecto si no hay historial
    return [
        {
            id: '1',
            content: '¡Hola! Soy el asistente virtual de Impulse Rentals. ¿En qué puedo ayudarte hoy?',
            sender: 'bot',
            timestamp: new Date()
        }
    ];
};

// Función para enviar mensaje al asistente con streaming
export const sendMessageWithStreaming = async (
    userMessage: string,
    onPartialResponse: (text: string) => void
): Promise<string> => {
    if (!client) {
        throw new Error('FlowiseClient no está inicializado');
    }

    try {
        // Crear predicción con streaming activado
        const prediction = await client.createPrediction({
            chatflowId: CHATFLOW_ID,
            question: userMessage,
            streaming: true,
        });

        let botResponse = '';

        // Procesar la respuesta de streaming
        for await (const chunk of prediction) {
            if (chunk.event === 'token') {
                botResponse += chunk.data || '';
                onPartialResponse(botResponse);
            }
        }

        return botResponse || 'Lo siento, no he podido procesar tu solicitud.';
    } catch (error) {
        console.error('Error al enviar mensaje con streaming:', error);
        throw error;
    }
};

// Función alternativa para enviar mensaje sin streaming
export const sendMessageWithoutStreaming = async (userMessage: string): Promise<string> => {
    try {
        // Llamada directa a la API
        const response = await fetch(
            `${FLOWISE_URL}/api/v1/prediction/${CHATFLOW_ID}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: userMessage,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data = await response.json();
        return data.answer || 'Lo siento, no he podido procesar tu solicitud.';
    } catch (error) {
        console.error('Error al enviar mensaje sin streaming:', error);
        throw error;
    }
};

// Función para determinar si hay conexión con el servidor
export const testConnection = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${FLOWISE_URL}/api/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.ok;
    } catch (error) {
        console.error('Error al verificar conexión:', error);
        return false;
    }
};