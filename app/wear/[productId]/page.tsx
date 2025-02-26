// app/wear/[productId]/page.tsx
"use client"

import ProductDetailPage from '@/components/custom/product-detail-page'

export default function ProductDetail({ params }: { params: { productId: string } }) {
    return <ProductDetailPage params={params} />
}