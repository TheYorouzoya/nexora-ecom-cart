import { CartItem } from "./cart.js";

export interface Receipt {
    id: number;
    name: string;
    email: string;
    items: CartItem[];
    total: number;
    timestamp: string;
}