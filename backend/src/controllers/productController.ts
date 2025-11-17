import { products } from '../models/product.js';

import type { Product } from '../models/product.js';
import type { Request, Response, NextFunction } from 'express';

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price } = req.body;
        const newProduct: Product = { id: Date.now(), name, price };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id!, 10);
        const product = products.find((i) => i.id === id);
        if (!product) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id!, 10);
        const { name } = req.body;
        const productIndex = products.findIndex((i) => i.id === id);
        if (productIndex < 0) {
            res.status(404).json({ message: "Item not found" });
            return;
        }

        products[productIndex]!.name = name;
        res.json(products[productIndex]);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id!, 10);
        const productIndex= products.findIndex((i) => i.id === id);
        if (productIndex < 0) {
            res.status(404).json({ message: "Item not found. "});
            return;
        }
        const deletedProduct = products.splice(productIndex, 1)[0];
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
};