export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    id: number;
    items: CartItem[];
    total: number;
}

export interface Receipt {
    id: number;
    name: string;
    email: string;
    items: CartItem[];
    total: number;
    timestamp: string;
}