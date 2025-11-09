import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Center, Divider, Loader, Stack, Text } from '@mantine/core';

import { CartItem } from '../components/CartItem';
import { useCart } from '../context/CartContext';

export const ShoppingCartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    if (loading) {
        return (
            <Center className="h-screen">
                <Loader size="xl" color="teal" variant="bars" />
            </Center>
        );
    }

    const handleCheckout = () => {
        clearCart();
        navigate('/');
    };


    return (
        <div className="flex flex-col items-start justify-start gap-4 p-4">
            <Text className="font-bold text-[30px] md:text-[40px] lg:text-[50px] text-teal-500 mb-6">
                Shopping Cart
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

            {cart?.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <Stack className="w-full flex flex-col items-start justify-start gap-4">
                    {cart?.map((product) => (
                        <CartItem
                            key={product?.id}
                            product={product}
                            onRemove={removeFromCart}
                            onQuantityChange={updateQuantity}
                        />
                    ))}

                    <Divider />

                    <div className="w-full flex items-center gap-4 justify-end">
                        <Text fw={600} size="lg">
                            Total: ${totalPrice?.toFixed(2)}
                        </Text>
                        <Button fullWidth
                            mt="md"
                            radius="md"
                            size="md"
                            variant="light"
                            className="bg-teal-100 border border-teal-200 rounded-md w-fit p-2 hover:text-teal-400"
                            onClick={handleCheckout}>
                            Checkout
                        </Button>
                    </div>
                </Stack>
            )}
        </div>
    );
};

