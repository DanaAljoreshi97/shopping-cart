import { LoaderCircle, ShoppingCart } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Group, Image, Text } from '@mantine/core';

import type { Product } from "../types";
type ProductCardProps = {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onClick?: (product: Product) => void;
    className?: string
    fullImage?: boolean
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick, className, fullImage = false }) => {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={`
                border ${fullImage ? "border-none" : "border-gray-200"} 
                p-4 rounded-md 
                ${!fullImage ? "hover:shadow-xl transition-shadow duration-300 cursor-pointer" : ""}
                flex flex-col justify-between gap-4
                ${className ?? ""}
            `}
            style={{ width: fullImage ? "100%" : 320, height: fullImage ? "auto" : 450 }}
            onClick={() => onClick?.(product)}
        >
            {loading && (
                <div className="flex justify-center items-center mb-2 z-99">
                    <LoaderCircle className="h-6 w-6" />
                </div>
            )}

            <Card.Section className="overflow-hidden rounded-md">
                <Image
                    src={product?.image}
                    alt={product?.name}
                    width={fullImage ? 600 : 300}
                    height={180}
                    className={`${fullImage ? "object-cover w-full" : "object-cover w-full transition-transform duration-300 hover:scale-105"}`}

                    onLoad={() => setLoading(false)}
                />
            </Card.Section>

            <div className="flex flex-col gap-2">
                <Group justify="apart" align="center">
                    <Text fw={600} lineClamp={1} size="lg">
                        {product?.name}
                    </Text>
                    <Text fw={600} c="teal" size="md">
                        ${product?.price?.toFixed(2)}
                    </Text>
                </Group>

                <Text size="sm" c="dimmed" className="line-clamp-3">
                    {product?.description}
                </Text>
            </div>

            {onAddToCart && (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        fullWidth
                        mt="md"
                        radius="md"
                        size="md"
                        variant="light"
                        className="bg-teal-100 border border-teal-200 rounded-md w-fit p-2 hover:text-teal-400"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        title='show cart'
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/cart");
                        }}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>
            )}
        </Card>
    );
};

