import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { Cart, CartItem, Product, Receipt } from "../types";
import type { ReactNode } from "react";
import { api } from "../api/api";

interface CartContextType {
    items: CartItem[];
    total: number;
    addItem: (item: Product) => void;
    decreaseItem: (item: Product) => void;
    deleteItem: (id: number) => void;
    clearCart: () => void;
}

const CART_API_ENDPOINT = "/cart";

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const total = useMemo(
        () => items.reduce((sum, curr) => sum + (curr.quantity * curr.product.price), 0),
        [items]
    );

    useEffect(() => {
        api.get<Cart>(CART_API_ENDPOINT)
            .then((cart) => setItems(cart.items))
            .catch((error) => console.log(error));
    }, []);

    const addItem = (item: Product) => {
        const existingItem = items.find((i) => i.product.id === item.id);
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
        
        setItems((prev) => {
            if (existingItem) {
                return prev.map((i) =>
                    i.product.id === item.id ? { ...i, quantity: i.quantity + 1} : i
                );
            }
            return [...prev, { product: item, quantity: 1 }];
        });

        api.post<Cart>(CART_API_ENDPOINT, { itemId: item.id, quantity: newQuantity })
            .catch((error) => console.log(error));
    };

    const decreaseItem = (item: Product) => {
        const existingItem = items.find((i) => i.product.id === item.id);
        if (!existingItem) {
            console.log("Item does not exist in cart!");
            return;
        }
        const newQuantity = existingItem.quantity - 1;

        setItems((prev) =>
            prev.map((i) =>
                i.product.id === item.id ? {...i, quantity: i.quantity - 1} : i
            )
            .filter((i) => i.quantity > 0)
        );

        if (newQuantity <= 0) {
            api.del<Cart>(`${CART_API_ENDPOINT}/${item.id}`)
                .catch((error) => console.log(error));
        } else {
            api.post<Cart>(CART_API_ENDPOINT, { itemId: item.id, quantity: newQuantity })
                .catch((error) => console.log(error));
        }
    };

    const deleteItem = (id: number) => {
        const existingItem = items.find((i) => i.product.id === id);
        if (!existingItem) {
            console.log("Item does not exist in cart!");
            return;
        }

        setItems((prev) => prev.filter((i) => i.product.id != id));

        api.del<Cart>(`${CART_API_ENDPOINT}/${id}`)
            .catch((error) => console.log(error));
    }

    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider value={{ items, total, addItem, decreaseItem, deleteItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};