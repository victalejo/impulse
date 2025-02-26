// components/custom/wear-page.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const WearPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Ahora usamos nuestra propia API en lugar de llamar directamente a Printify
                const response = await fetch(`/api/wear/products?page=${currentPage}&limit=8`);

                if (!response.ok) {
                    throw new Error('Error al cargar productos');
                }

                const data = await response.json();
                setProducts(data.data);
                setTotalPages(data.last_page || 1);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde.');
                // En desarrollo, usamos datos de ejemplo para mostrar la interfaz
                setProducts([
                    {
                        id: "sample1",
                        title: "Camiseta Impulse",
                        description: "Camiseta con logo de Impulse Rentals",
                        variants: [{ price: 2500, cost: 1500 }],
                        images: [{ src: "/images/logo.PNG", is_default: true }],
                        tags: ["Ropa", "Camisetas"]
                    },
                    {
                        id: "sample2",
                        title: "Taza Impulse",
                        description: "Taza con logo de Impulse Rentals",
                        variants: [{ price: 1500, cost: 800 }],
                        images: [{ src: "/images/logo.PNG", is_default: true }],
                        tags: ["Accesorios", "Tazas"]
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Formatear precio
    const formatPrice = (price) => {
        return `$${(price / 100).toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-[#060404] py-24">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-6xl md:text-7xl font-bebas mb-16 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
                    Impulse Wear
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-16 w-16 text-[#ff0054] animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center p-8 bg-[#ff0054]/10 rounded-lg">
                        <p className="text-[#fefefe] text-xl">{error}</p>
                        <Button
                            className="mt-4 bg-[#ff0054] hover:bg-[#ff0054]/80"
                            onClick={() => window.location.reload()}
                        >
                            Reintentar
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => {
                                // Obtener la imagen por defecto o la primera disponible
                                const defaultImage = product.images.find(img => img.is_default) || product.images[0];
                                // Obtener la variante por defecto o la primera disponible
                                const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];

                                return (
                                    <Card key={product.id} className="bg-[#060404]/80 border border-[#ff0054]/30 hover:border-[#ff0054] transition-all duration-300 overflow-hidden group">
                                        <div className="relative h-64 w-full overflow-hidden">
                                            <div className="absolute inset-0 bg-[#060404]/30 group-hover:bg-[#060404]/10 transition-all duration-300 z-10"></div>
                                            {defaultImage?.src ? (
                                                <Image
                                                    src={defaultImage.src}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-[#060404]">
                                                    <span className="text-[#fefefe]/50">Sin imagen</span>
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="text-2xl font-bebas text-[#fefefe] mb-2 group-hover:text-[#ff0054] transition-colors duration-300">
                                                {product.title}
                                            </h3>
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-xl font-bold text-[#fbe40b]">
                                                    {defaultVariant ? formatPrice(defaultVariant.price) : "Precio no disponible"}
                                                </p>
                                                {product.tags && product.tags.length > 0 && (
                                                    <span className="text-sm text-[#fefefe]/60">
                            {product.tags[0]}
                          </span>
                                                )}
                                            </div>
                                            <Button
                                                className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054]
                                text-[#fefefe] font-bebas text-lg"
                                                asChild
                                            >
                                                <Link href={`/wear/${product.id}`}>Ver Detalles</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-4">
                                <Button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="bg-[#ff0054] hover:bg-[#ff0054]/80 disabled:opacity-50"
                                >
                                    Anterior
                                </Button>
                                <span className="flex items-center text-[#fefefe] px-4">
                  Página {currentPage} de {totalPages}
                </span>
                                <Button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="bg-[#ff0054] hover:bg-[#ff0054]/80 disabled:opacity-50"
                                >
                                    Siguiente
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default WearPage;