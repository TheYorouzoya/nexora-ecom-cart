import { products } from "../models/product.js";
import { cart, computeCartTotal } from "../models/cart.js";
import type { Request, Response, NextFunction } from "express";

export const getCart = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({ ...cart, total: computeCartTotal(cart) });
    } catch (error) {
        next(error);
    }
}

export const addItemToCart = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itemId, quantity } = req.body;
        const item = products.find((i) => i.id === itemId);
        
        if (!item) {
            res.status(404).json({ message: "Item not found." });
            return;
        }
        
        if (quantity <= 0) {
            res.status(400).json({ message: "Invalid item quantity." });
            return;
        }
        
        const itemIndex = cart.items.findIndex((i) => i.product.id === itemId);

        if (itemIndex >= 0) {
            // item already exists in cart, replace value
            cart.items[itemIndex].quantity = quantity;
        } else {
            // otherwise, add item to cart
            cart.items.push({ product: item, quantity: quantity});
        }

        res.status(201).json({ ...cart, total: computeCartTotal(cart) });
    } catch (error) {
        next(error);
    }
}

export const deleteItemFromCart = (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemId = Number.parseInt(req.params.id!, 10);
        const itemIndex = cart.items.findIndex((i) => i.product.id === itemId);

        if (itemIndex < 0) {
            res.status(404).json({ message: "Item not found in cart." });
            return;
        }

        cart.items.splice(itemIndex, 1)[0];
        res.status(201).json({ ...cart, total: computeCartTotal(cart) });
    } catch (error) {
        next(error);
    }
}