// components/custom/wear-page.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Define the product interface
interface Product {
    id: string;
    title: string;
    description: string;
    variants: Array<{
        price: number;
        cost: number;
        is_default?: boolean;
    }>;
    images: Array<{
        src: string;
        is_default?: boolean;
    }>;
    tags: string[];
}

const WearPage = () => {
    // Use Product[] type for the products state
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Using our own API instead of calling Printify directly
                const response = await fetch(`/api/wear/products?page=${currentPage}&limit=8`);

                if (!response.ok) {
                    throw new Error('Error loading products');
                }

                const data = await response.json();
                setProducts(data.data);
                setTotalPages(data.last_page || 1);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Could not load products. Please try again later.');
                // In development, use sample data to show the interface
                setProducts([
                    {
                        id: "sample1",
                        title: "Impulse T-Shirt",
                        description: "T-shirt with Impulse Rentals logo",
                        variants: [{ price: 2500, cost: 1500 }],
                        images: [{ src: "/images/logo.PNG", is_default: true }],
                        tags: ["Clothing", "T-shirts"]
                    },
                    {
                        id: "sample2",
                        title: "Impulse Mug",
                        description: "Mug with Impulse Rentals logo",
                        variants: [{ price: 1500, cost: 800 }],
                        images: [{ src: "/images/logo.PNG", is_default: true }],
                        tags: ["Accessories", "Mugs"]
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

    // Format price
    const formatPrice = (price: number) => {
        return `$${(price / 100).toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-[#060404] py-16 sm:py-20 md:py-24">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[100px] sm:blur-[150px] animate-pulse opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[100px] sm:blur-[150px] animate-pulse delay-700 opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bebas mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
                    Impulse Wear
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-40 sm:h-64">
                        <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-[#ff0054] animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center p-4 sm:p-6 md:p-8 bg-[#ff0054]/10 rounded-lg">
                        <p className="text-[#fefefe] text-base sm:text-lg md:text-xl">{error}</p>
                        <Button
                            className="mt-3 sm:mt-4 bg-[#ff0054] hover:bg-[#ff0054]/80 text-sm sm:text-base"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {products.map((product) => {
                                // Get default image or first available
                                const defaultImage = product.images.find(img => img.is_default) || product.images[0];
                                // Get default variant or first available
                                const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];

                                return (
                                    <Card key={product.id} className="bg-[#060404]/80 border border-[#ff0054]/30 hover:border-[#ff0054] transition-all duration-300 overflow-hidden group">
                                        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
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
                                                    <span className="text-[#fefefe]/50 text-sm sm:text-base">No image</span>
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-3 sm:p-4 md:p-6">
                                            <h3 className="text-xl sm:text-2xl font-bebas text-[#fefefe] mb-1 sm:mb-2 group-hover:text-[#ff0054] transition-colors duration-300">
                                                {product.title}
                                            </h3>
                                            <div className="flex justify-between items-center mb-2 sm:mb-4">
                                                <p className="text-lg sm:text-xl font-bold text-[#fbe40b]">
                                                    {defaultVariant ? formatPrice(defaultVariant.price) : "Price unavailable"}
                                                </p>
                                                {product.tags && product.tags.length > 0 && (
                                                    <span className="text-xs sm:text-sm text-[#fefefe]/60">
                                                        {product.tags[0]}
                                                    </span>
                                                )}
                                            </div>
                                            <Button
                                                className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054]
                                                text-[#fefefe] font-bebas text-base sm:text-lg py-1 sm:py-2"
                                                asChild
                                            >
                                                <Link href={`/wear/${product.id}`}>View Details</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center mt-8 sm:mt-10 md:mt-12 gap-2 sm:gap-4">
                                <Button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="bg-[#ff0054] hover:bg-[#ff0054]/80 disabled:opacity-50 text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3"
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center text-[#fefefe] text-sm sm:text-base px-2 sm:px-4">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="bg-[#ff0054] hover:bg-[#ff0054]/80 disabled:opacity-50 text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3"
                                >
                                    Next
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