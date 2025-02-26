// components/custom/product-detail-page.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingCart, ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Definir interfaces para tipar correctamente
interface ProductVariant {
    id: number | string;
    title?: string;
    price: number;
    cost?: number;
    is_default?: boolean;
    options?: Array<number | string>;
}

interface ProductImage {
    id?: number | string;
    src: string;
    is_default?: boolean;
    position?: string;
    variant_ids?: Array<number | string>;
}

interface ProductOption {
    name: string;
    type: string;
    values: Array<{
        id: number | string;
        title: string;
    }>;
}

interface Product {
    id: string;
    title: string;
    description: string;
    variants: ProductVariant[];
    images: ProductImage[];
    tags?: string[];
    options?: ProductOption[];
    safety_information?: string;
}

interface ProductDetailPageProps {
    params: {
        productId: string;
    };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const productId = params?.productId;
                if (!productId) throw new Error('ID de producto no proporcionado');

                // Usamos nuestra propia API en lugar de llamar directamente a Printify
                const response = await fetch(`/api/wear/products/${productId}`);

                if (!response.ok) {
                    throw new Error('Error al cargar el producto');
                }

                const data = await response.json();
                setProduct(data);

                // Configurar la variante e imagen predeterminadas
                const defaultVariant = data.variants.find((v: ProductVariant) => v.is_default) || data.variants[0];
                setSelectedVariant(defaultVariant);

                const defaultImage = data.images.find((img: ProductImage) => img.is_default) || data.images[0];
                setSelectedImage(defaultImage);

            } catch (err) {
                console.error('Error fetching product:', err);
                setError('No se pudo cargar el producto. Por favor, inténtalo de nuevo más tarde.');

                // En desarrollo, usamos datos de ejemplo
                const sampleProduct: Product = {
                    id: "sample1",
                    title: "Camiseta Impulse",
                    description: "Camiseta de alta calidad con logo de Impulse Rentals. Perfecta para mostrar tu apoyo a nuestra marca y ser parte de la comunidad Impulse. Fabricada con materiales duraderos y cómodos para usar en cualquier ocasión.",
                    variants: [
                        { id: 1, title: "S", price: 2500, cost: 1500, is_default: true },
                        { id: 2, title: "M", price: 2500, cost: 1500 },
                        { id: 3, title: "L", price: 2500, cost: 1500 }
                    ],
                    images: [
                        { id: 1, src: "/images/logo.PNG", is_default: true, position: "front" },
                        { id: 2, src: "/images/logo-sin-texto.png", position: "back" }
                    ],
                    tags: ["Ropa", "Camisetas", "Merchandising"],
                    options: [
                        {
                            name: "Tallas",
                            type: "size",
                            values: [
                                { id: 1, title: "S" },
                                { id: 2, title: "M" },
                                { id: 3, title: "L" }
                            ]
                        }
                    ]
                };

                setProduct(sampleProduct);
                setSelectedVariant(sampleProduct.variants[0]);
                setSelectedImage(sampleProduct.images[0]);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    // Formatear precio
    const formatPrice = (price: number): string => {
        return `$${(price / 100).toFixed(2)}`;
    };

    // Cambiar variante seleccionada
    const handleVariantChange = (variantId: number | string): void => {
        if (!product) return;

        const variant = product.variants.find((v: ProductVariant) => v.id === variantId);
        if (variant) {
            setSelectedVariant(variant);

            // Si hay imágenes asociadas específicamente a esta variante, seleccionar la primera
            const variantImages = product.images.filter((img: ProductImage) =>
                img.variant_ids && img.variant_ids.includes(variantId)
            );

            if (variantImages.length > 0) {
                setSelectedImage(variantImages[0]);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060404] py-24 flex justify-center items-center">
                <Loader2 className="h-16 w-16 text-[#ff0054] animate-spin" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#060404] py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center p-8 bg-[#ff0054]/10 rounded-lg">
                        <p className="text-[#fefefe] text-xl">{error || 'Producto no encontrado'}</p>
                        <Button
                            className="mt-4 bg-[#ff0054] hover:bg-[#ff0054]/80"
                            asChild
                        >
                            <Link href="/wear">Volver a la tienda</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060404] py-24">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="text-[#fefefe] hover:text-[#ff0054] hover:bg-transparent flex items-center gap-2"
                        asChild
                    >
                        <Link href="/wear">
                            <ArrowLeft size={16} />
                            Volver a la tienda
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Galería de imágenes */}
                    <div className="space-y-6">
                        <div className="relative h-[500px] w-full rounded-lg overflow-hidden border-2 border-[#ff0054]/30 shadow-lg">
                            {selectedImage?.src ? (
                                <Image
                                    src={selectedImage.src}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#060404]">
                                    <span className="text-[#fefefe]/50">Sin imagen</span>
                                </div>
                            )}
                        </div>

                        {/* Miniaturas */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`relative h-24 cursor-pointer rounded-md overflow-hidden border-2 
                              ${selectedImage === image ? 'border-[#ff0054]' : 'border-[#ff0054]/30 hover:border-[#ff0054]/70'}`}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={`${product.title} - Vista ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Información del producto */}
                    <div className="bg-[#060404]/80 border border-[#ff0054]/30 rounded-lg p-8 space-y-6">
                        <h1 className="text-4xl font-bebas text-[#fefefe]">{product.title}</h1>

                        <div className="flex items-center justify-between">
                            <p className="text-3xl font-bold text-[#fbe40b]">
                                {selectedVariant ? formatPrice(selectedVariant.price) : "Precio no disponible"}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {product.tags && product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ff0054]/20 text-[#ff0054]"
                                    >
                    <Tag size={12} className="mr-1" />
                                        {tag}
                  </span>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-[#ff0054]/20" />

                        <div>
                            <h3 className="text-xl font-bebas text-[#fefefe] mb-2">Descripción</h3>
                            <p className="text-[#fefefe]/80 text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Opciones del producto */}
                        {product.options && product.options.length > 0 && (
                            <div className="space-y-4">
                                {product.options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <h3 className="text-xl font-bebas text-[#fefefe] mb-2">{option.name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {option.values.map((value) => {
                                                // Encontrar la variante correspondiente a esta opción
                                                const matchingVariant = product.variants.find(v =>
                                                    v.options && v.options.includes(value.id)
                                                );

                                                const isSelected = selectedVariant && matchingVariant &&
                                                    selectedVariant.id === matchingVariant.id;

                                                return (
                                                    <Button
                                                        key={value.id}
                                                        onClick={() => matchingVariant && handleVariantChange(matchingVariant.id)}
                                                        className={`
                              ${isSelected
                                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                                            : 'bg-[#060404] border border-[#ff0054]/50 text-[#fefefe] hover:bg-[#ff0054]/20'
                                                        }
                            `}
                                                        disabled={!matchingVariant}
                                                    >
                                                        {value.title}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Separator className="bg-[#ff0054]/20" />

                        {/* Botón de compra */}
                        <div className="pt-4">
                            <Button
                                className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054]
                         text-[#fefefe] font-bebas text-xl h-16"
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Añadir al Carrito
                            </Button>
                        </div>

                        {/* Información adicional */}
                        {product.safety_information && (
                            <div className="mt-8 p-4 bg-[#060404]/50 rounded-lg border border-[#ff0054]/20">
                                <h3 className="text-xl font-bebas text-[#fefefe] mb-2">Información del producto</h3>
                                <p className="text-[#fefefe]/70 text-sm whitespace-pre-line">
                                    {product.safety_information}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Productos relacionados */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bebas text-[#fefefe] mb-8">Productos Relacionados</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Ejemplo de productos relacionados */}
                        {[1, 2, 3, 4].map((item) => (
                            <Card key={item} className="bg-[#060404]/80 border border-[#ff0054]/30 hover:border-[#ff0054] transition-all duration-300 overflow-hidden group">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-[#060404]/30 group-hover:bg-[#060404]/10 transition-all duration-300 z-10"></div>
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ff0054]/20 to-[#fbe40b]/20">
                                        <Image
                                            src="/logo.PNG"
                                            alt="Producto relacionado"
                                            width={120}
                                            height={120}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bebas text-[#fefefe] mb-2 group-hover:text-[#ff0054] transition-colors duration-300">
                                        Producto Relacionado {item}
                                    </h3>
                                    <p className="text-lg font-bold text-[#fbe40b] mb-4">
                                        $25.00
                                    </p>
                                    <Button
                                        className="w-full bg-[#060404] border border-[#ff0054]/50 text-[#fefefe] hover:bg-[#ff0054]/20"
                                        asChild
                                    >
                                        <Link href="#" onClick={(e) => e.preventDefault()}>Ver Detalles</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;