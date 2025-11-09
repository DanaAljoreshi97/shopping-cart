import { Trash } from 'lucide-react';
import React from 'react';

import { Button, Card, Image, NumberInput, Text } from '@mantine/core';

import type { Product } from "../types";

type CartItemProps = {
    product: Product & { quantity: number };
    onRemove: (id: string) => void;
    onQuantityChange: (id: string, quantity: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({
    product,
    onRemove,
    onQuantityChange,
}) => {

    return (
        <Card
            shadow="sm"
            radius="md"
            className="w-full grid grid-cols-[100px_1fr_auto_auto_auto_auto] gap-6 items-start"
        >
            {/* Product Image */}
            <Image
                src={product?.image}
                alt={product?.name}
                width={100}
                height={100}
                className="object-cover rounded-md"
            />

            {/* Product Details */}
            <div className="flex flex-col gap-1">
                <Text fw={600}>{product?.name}</Text>
                <Text fw={600} className='text-gray-600'>{product?.description}</Text>
            </div>

            {/* Quantity */}
            <NumberInput
                value={product?.quantity}
                onChange={(val: number | string | undefined) => {
                    const quantity = Number(val) || 1;
                    onQuantityChange(product?.id, quantity);
                }}
                min={1}
                size="sm"
                className="w-24"
            />

            {/* Total Price */}
            <Text fw={600} className="w-24 text-right">
                ${(product?.price * product?.quantity).toFixed(2)}
            </Text>

            {/* Remove Button */}
            <Button
                onClick={() => onRemove(product?.id)}
                title="Delete"
            >
                <Trash className="w-5 h-5 text-red-700" />
            </Button>
        </Card>
    );
};
