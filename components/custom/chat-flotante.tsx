// components/custom/chat-flotante.tsx
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FlowiseClient } from 'flowise-sdk';
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de tener uuid instalado: npm install uuid

// Interfaz para los mensajes
interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// URL del servidor Flowise
const FLOWISE_URL = 'https://modelos.iaportafolio.com';
const CHATFLOW_ID = '67d18b37-97a1-415c-8de7-a6845ed0d367';

// Clave para el almacenamiento local
const CHAT_HISTORY_KEY = 'impulse_chat_history';
const SESSION_ID_KEY = 'impulse_chat_session_id';

const ChatFlotante: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: 'Hello! I am the virtual assistant for Impulse Rentals. How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const client = new FlowiseClient({ baseUrl: FLOWISE_URL });

    // Inicializar o recuperar el sessionId cuando se monta el componente
    useEffect(() => {
        // Cargar mensajes previos del almacenamiento local
        const loadedMessages = loadMessages();
        if (loadedMessages.length > 0) {
            setMessages(loadedMessages);
        }

        // Recuperar o crear sessionId
        const storedSessionId = localStorage.getItem(SESSION_ID_KEY);
        if (storedSessionId) {
            setSessionId(storedSessionId);
        } else {
            const newSessionId = uuidv4();
            setSessionId(newSessionId);
            localStorage.setItem(SESSION_ID_KEY, newSessionId);
        }
    }, []);

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

        // Guardar mensajes en localStorage
        saveMessages(messages);
    }, [messages]);

    // Función para guardar mensajes en localStorage
    const saveMessages = (messages: Message[]): void => {
        try {
            // Solo guardar los últimos 50 mensajes para no sobrecargar localStorage
            const messagesToSave = messages.slice(-50);
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messagesToSave));
        } catch (error) {
            console.error('Error al guardar mensajes en localStorage:', error);
        }
    };

    // Función para cargar mensajes desde localStorage
    const loadMessages = (): Message[] => {
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
                content: 'Hello! I am the virtual assistant for Impulse Rentals. How can I help you today?',
                sender: 'bot',
                timestamp: new Date()
            }
        ];
    };

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
            // Llamada a la API usando el SDK de Flowise con sessionId
            const prediction = await client.createPrediction({
                chatflowId: CHATFLOW_ID,
                question: userMessage.content,
                streaming: true,
                overrideConfig: {
                    sessionId: sessionId, // Usar el sessionId guardado
                }
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
                        overrideConfig: {
                            sessionId: sessionId, // Usar el sessionId guardado
                        }
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

    // Función para reiniciar la conversación
    const resetConversation = () => {
        // Crear nuevo sessionId
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
        localStorage.setItem(SESSION_ID_KEY, newSessionId);

        // Reiniciar mensajes
        const initialMessage: Message = {
            id: Date.now().toString(),
            content: 'Hello! I am the virtual assistant for Impulse Rentals. How can I help you today?',
            sender: 'bot' as const,
            timestamp: new Date()
        };

        setMessages([initialMessage]);
        saveMessages([initialMessage]);
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
                            <h3 className="text-xl font-bold">Impulse Assistant</h3>
                            <p className="text-sm opacity-90">We are here to help you</p>
                        </div>
                        <div className="flex gap-2">
                            {/* Botón para reiniciar la conversación */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resetConversation}
                                className="h-8 w-8 rounded-full hover:bg-[#fefefe]/10"
                                title="Reiniciar conversación"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                    <path d="M3 3v5h5"></path>
                                </svg>
                            </Button>
                            {/* Botón para cerrar el chat */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleChat}
                                className="h-8 w-8 rounded-full hover:bg-[#fefefe]/10"
                            >
                                <X className="h-4 w-4 text-[#fefefe]" />
                            </Button>
                        </div>
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
                                placeholder="Write your message..."
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