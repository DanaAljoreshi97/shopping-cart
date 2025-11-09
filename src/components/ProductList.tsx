import React from 'react';

import { ProductCard } from './ProductCard';

import type { Product } from "../types/product";

type ProductListProps = {
    products: Product[];
    onAddToCart?: (product: Product) => void;
    onProductClick?: (product: Product) => void;
};

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onProductClick }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1400px] w-full p-4">
        {products?.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onClick={onProductClick}
            />
        ))}
    </div>
);

