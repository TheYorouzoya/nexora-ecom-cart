// post
import { cart, computeCartTotal } from "../models/cart.js";
import type { Request, Response, NextFunction } from "express";
import { Receipt } from "../models/receipt.js";

export const checkout = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body;
        const total = computeCartTotal(cart);
        const receipt: Receipt = {
            id: Date.now(),
            name: name,
            email: email,
            items: cart.items,
            total: total,
            timestamp: new Date().toISOString(),
        };

        cart.items = [];    // clear cart
        res.status(200).json(receipt);
    } catch (error) {
        next(error);
    }
};