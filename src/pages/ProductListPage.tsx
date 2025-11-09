import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { Loader, Text } from '@mantine/core';

import { ProductList } from '../components/ProductList';
import { useCart } from '../context/CartContext';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';

export const ProductListPage: React.FC = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts(40);
    const { ref, inView } = useInView({ threshold: 0.5 });
    const navigate = useNavigate();
    const { addToCart } = useCart();
    React.useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    const products = data?.pages.flatMap((page) => page?.items) ?? [];

    return (
        <div className="p-6 w-full flex flex-col relative">
            {/* Page Title */}
            <Text className="font-bold text-[30px] md:text-[40px] lg:text-[50px] text-teal-500">
                All Products
            </Text>

            {/* Product List */}
            <div className="relative">
                <ProductList
                    products={products}
                    onAddToCart={(p) => addToCart(p)}
                    onProductClick={(product) =>
                        navigate(`/product/${product.id}`, { state: { product } })
                    }
                />


                {/* Loader Overlay */}
                {isFetchingNextPage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                        <Loader size="lg" />
                    </div>
                )}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={ref} className="mt-8 h-1"></div>
        </div>
    );
};
