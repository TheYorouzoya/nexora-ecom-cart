import type { Product } from "./product.js";

export interface Cart {
    id: number;
    items: CartItem[];
}

export interface CartItem {
    product: Product,
    quantity: number,
}

export let cart: Cart = {
    id: 1,
    items: [],
};

export function computeCartTotal(cart: Cart) {
    return cart.items.reduce((sum, curr) => sum + curr.product.price * curr.quantity, 0 );
}