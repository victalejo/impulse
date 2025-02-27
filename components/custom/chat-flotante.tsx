// components/custom/chat-flotante.tsx
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FlowiseClient } from 'flowise-sdk'; // Importar el SDK de Flowise

// Interfaz para los mensajes
interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// URL del servidor Flowise
const FLOWISE_URL = 'https://modelos.iaportafolio.com'; // Ajusta esto a la URL correcta
const CHATFLOW_ID = '67d18b37-97a1-415c-8de7-a6845ed0d367'; // Reemplaza con tu ID de chatflow

const ChatFlotante: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: '¡Hola! Soy el asistente virtual de Impulse Rentals. ¿En qué puedo ayudarte hoy?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const client = new FlowiseClient({ baseUrl: FLOWISE_URL });

    // Autofocus en el input cuando se abre el chat
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll al último mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (inputValue.trim() === '') return;

        // Añadir mensaje del usuario
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Llamada a la API usando el SDK de Flowise
            const prediction = await client.createPrediction({
                chatflowId: CHATFLOW_ID,
                question: userMessage.content,
                streaming: true,
            });

            let botResponse = '';
            let botMessageId = Date.now().toString();

            // Para manejar streaming, un enfoque común es añadir primero un mensaje vacío
            // y luego irlo actualizando
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: botMessageId,
                    content: '',
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);

            // Procesar la respuesta de streaming
            for await (const chunk of prediction) {
                if (chunk.event === 'token') {
                    botResponse += chunk.data || '';

                    // Actualizar el mensaje del bot con la información parcial
                    setMessages(prevMessages =>
                        prevMessages.map(msg =>
                            msg.id === botMessageId
                                ? { ...msg, content: botResponse }
                                : msg
                        )
                    );
                }
            }

            // Si no se recibe ninguna respuesta en streaming
            if (!botResponse) {
                throw new Error('No se recibió ninguna respuesta del asistente');
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);

            // Mensaje de error en caso de fallo
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now().toString(),
                    content: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente más tarde.',
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    // Alternativa para cuando no hay streaming disponible
    const sendMessageWithoutStreaming = async () => {
        if (inputValue.trim() === '') return;

        // Añadir mensaje del usuario
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Llamada directa a la API si no usamos el SDK
            const response = await fetch(
                `${FLOWISE_URL}/api/v1/prediction/${CHATFLOW_ID}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: userMessage.content,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await response.json();

            // Añadir mensaje del bot
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now().toString(),
                    content: data.answer || 'No se recibió una respuesta clara.',
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);

            // Mensaje de error en caso de fallo
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now().toString(),
                    content: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente más tarde.',
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    // Formatear la hora del mensaje
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Botón de chat flotante */}
            <Button
                onClick={toggleChat}
                className={cn(
                    "h-14 w-14 rounded-full p-0",
                    "bg-gradient-to-r from-[#ff0054] to-[#fbe40b]",
                    "hover:shadow-lg hover:shadow-[#ff0054]/50 transition-all duration-300",
                    "flex items-center justify-center"
                )}
                aria-label="Chat de atención al cliente"
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-[#fefefe]" />
                ) : (
                    <MessageCircle className="h-6 w-6 text-[#fefefe]" />
                )}
            </Button>

            {/* Ventana de chat */}
            {isOpen && (
                <Card className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] shadow-xl border border-[#ff0054]/30 overflow-hidden">
                    {/* Cabecera */}
                    <div className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-4 text-[#fefefe] font-bebas flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                                src="/logo-sin-texto.png"
                                alt="Impulse Rentals Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">Asistente Impulse</h3>
                            <p className="text-sm opacity-90">Estamos aquí para ayudarte</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleChat}
                            className="h-8 w-8 rounded-full hover:bg-[#fefefe]/10"
                        >
                            <X className="h-4 w-4 text-[#fefefe]" />
                        </Button>
                    </div>

                    {/* Cuerpo del chat */}
                    <div className="h-[400px] overflow-y-auto p-4 bg-[#fefefe]/5">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex flex-col max-w-[80%] rounded-lg p-3",
                                        message.sender === "user"
                                            ? "ml-auto bg-[#ff0054] text-[#fefefe]"
                                            : "mr-auto bg-[#fefefe] text-[#060404]"
                                    )}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {message.sender === "bot" ? (
                                            <Bot className="h-4 w-4" />
                                        ) : (
                                            <User className="h-4 w-4" />
                                        )}
                                        <span className="text-xs opacity-75">
                      {message.sender === "bot" ? "Asistente" : "Tú"} • {formatTime(message.timestamp)}
                    </span>
                                    </div>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex max-w-[80%] rounded-lg p-3 mr-auto bg-[#fefefe] text-[#060404]">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-[#ff0054] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-[#ff0054] rounded-full animate-bounce" style={{ animationDelay: '250ms' }}></div>
                                        <div className="w-2 h-2 bg-[#ff0054] rounded-full animate-bounce" style={{ animationDelay: '500ms' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Footer con input para escribir */}
                    <CardFooter className="p-2 bg-[#fefefe] border-t border-[#ff0054]/20">
                        <div className="flex w-full gap-2">
                            <Input
                                ref={inputRef}
                                placeholder="Escribe tu mensaje..."
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="flex-1 border-[#ff0054]/30 focus-visible:ring-[#ff0054]"
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={inputValue.trim() === '' || isTyping}
                                className="bg-[#ff0054] hover:bg-[#ff0054]/90 text-[#fefefe]"
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default ChatFlotante;