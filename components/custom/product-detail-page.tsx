// components/custom/product-detail-page.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingCart, ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/custom/add-to-cart-button";

// Define interfaces for proper typing
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
                if (!productId) throw new Error('Product ID not provided');

                // Use our own API instead of calling Printify directly
                const response = await fetch(`/api/wear/products/${productId}`);

                if (!response.ok) {
                    throw new Error('Error loading product');
                }

                const data = await response.json();
                setProduct(data);

                // Set default variant and image
                const defaultVariant = data.variants.find((v: ProductVariant) => v.is_default) || data.variants[0];
                setSelectedVariant(defaultVariant);

                const defaultImage = data.images.find((img: ProductImage) => img.is_default) || data.images[0];
                setSelectedImage(defaultImage);

            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Could not load the product. Please try again later.');

                // In development, use sample data
                const sampleProduct: Product = {
                    id: "sample1",
                    title: "Impulse T-Shirt",
                    description: "High-quality t-shirt with the Impulse Rentals logo. Perfect for showing your support for our brand and being part of the Impulse community. Made with durable and comfortable materials for any occasion.",
                    variants: [
                        { id: 1, title: "S", price: 2500, cost: 1500, is_default: true },
                        { id: 2, title: "M", price: 2500, cost: 1500 },
                        { id: 3, title: "L", price: 2500, cost: 1500 }
                    ],
                    images: [
                        { id: 1, src: "/images/logo.png", is_default: true, position: "front" },
                        { id: 2, src: "/images/logo-sin-texto.png", position: "back" }
                    ],
                    tags: ["Clothing", "T-Shirts", "Merchandise"],
                    options: [
                        {
                            name: "Sizes",
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

    // Format price
    const formatPrice = (price: number): string => {
        return `$${(price / 100).toFixed(2)}`;
    };

    // Change selected variant
    const handleVariantChange = (variantId: number | string): void => {
        if (!product) return;

        const variant = product.variants.find((v: ProductVariant) => v.id === variantId);
        if (variant) {
            setSelectedVariant(variant);

            // If there are images specifically associated with this variant, select the first one
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
                        <p className="text-[#fefefe] text-xl">{error || 'Product not found'}</p>
                        <Button
                            className="mt-4 bg-[#ff0054] hover:bg-[#ff0054]/80"
                            asChild
                        >
                            <Link href="/wear">Back to Shop</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060404] pt-20 pb-16 sm:pt-24 sm:pb-20">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 sm:mb-8">
                    <Button
                        variant="ghost"
                        className="text-[#fefefe] hover:text-[#ff0054] hover:bg-transparent flex items-center gap-2"
                        asChild
                    >
                        <Link href="/wear">
                            <ArrowLeft size={16} />
                            Back to Shop
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image gallery */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="relative h-[300px] xs:h-[400px] sm:h-[500px] w-full rounded-lg overflow-hidden border-2 border-[#ff0054]/30 shadow-lg">
                            {selectedImage?.src ? (
                                <Image
                                    src={selectedImage.src}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#060404]">
                                    <span className="text-[#fefefe]/50">No image</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`relative h-16 sm:h-24 cursor-pointer rounded-md overflow-hidden border-2 
                                        ${selectedImage === image ? 'border-[#ff0054]' : 'border-[#ff0054]/30 hover:border-[#ff0054]/70'}`}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={`${product.title} - View ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product information */}
                    <div className="bg-[#060404]/80 border border-[#ff0054]/30 rounded-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                        <h1 className="text-3xl sm:text-4xl font-bebas text-[#fefefe]">{product.title}</h1>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <p className="text-2xl sm:text-3xl font-bold text-[#fbe40b]">
                                {selectedVariant ? formatPrice(selectedVariant.price) : "Price not available"}
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
                            <h3 className="text-xl font-bebas text-[#fefefe] mb-2">Description</h3>
                            <p className="text-[#fefefe]/80 text-base sm:text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Product options */}
                        {product.options && product.options.length > 0 && (
                            <div className="space-y-4">
                                {product.options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <h3 className="text-xl font-bebas text-[#fefefe] mb-2">{option.name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {option.values.map((value) => {
                                                // Find the variant corresponding to this option
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

                        {/* Add to cart button */}
                        <div className="pt-4">
                            {selectedVariant && (
                                <AddToCartButton
                                    productId={product.id}
                                    variantId={selectedVariant.id as number}
                                    title={product.title}
                                    price={selectedVariant.price}
                                    image={selectedImage?.src || ''}
                                    size={product.options && product.options.length > 0 ? selectedVariant.title : undefined}
                                    disabled={!selectedVariant}
                                />
                            )}
                        </div>

                        {/* Additional information */}
                        {product.safety_information && (
                            <div className="mt-6 sm:mt-8 p-4 bg-[#060404]/50 rounded-lg border border-[#ff0054]/20">
                                <h3 className="text-xl font-bebas text-[#fefefe] mb-2">Product Information</h3>
                                <p className="text-[#fefefe]/70 text-sm whitespace-pre-line">
                                    {product.safety_information}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                    </div>
                </div>
    );
};

export default ProductDetailPage;
