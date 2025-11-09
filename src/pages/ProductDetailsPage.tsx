
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button, Center, Loader, Text } from '@mantine/core';

import { ProductCard } from '../components';
import { useCart } from '../context/CartContext';

import type { Product } from "../types";
export const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const passedProduct = location?.state?.product as Product

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product>(passedProduct);

    useEffect(() => {
        if (!id) {
            navigate("/");
            return;
        }

        if (!passedProduct) {
            const timer = setTimeout(() => {
                const fakeProduct: Product = {
                    id,
                    name: "Product not found",
                    price: 0,
                    description: "This product does not exist.",
                    image: "https://via.placeholder.com/600x400?text=No+Image",
                };
                setProduct(fakeProduct);
                setLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setLoading(false), 300);
            return () => clearTimeout(timer);
        }
    }, [id, passedProduct, navigate]);

    if (loading) {
        return (
            <Center className="h-screen">
                <Loader size="xl" color="teal" variant="bars" />
            </Center>
        );
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Page Title */}
            <Text className="font-bold text-[30px] md:text-[40px] lg:text-[50px] text-teal-500 mb-6">
                {product?.name} Details
            </Text>

            {/* Back Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="mb-6"
            >
                &larr; Back to Products
            </Button>

            {/* Product Card */}
            <ProductCard product={product} onAddToCart={addToCart} fullImage={true} />

        </div>
    );
};
