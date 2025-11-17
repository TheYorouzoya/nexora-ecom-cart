import { useEffect, useState, Suspense } from "react";
import { api } from "../api/api";
import { PRODUCTS_ENDPOINT } from "../api/api";
import type { Product } from "../types";
import ProductCardWrapper from "../components/ProductCardWrapper";
import "./ProductsPage.css";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get<Product[]>(PRODUCTS_ENDPOINT)
            .then(setProducts)
            .catch((err) => console.error("Failed to fetch items: ", err))
    }, []);

    return (
        <main id="products">
            <Suspense fallback={<div>Loading products...</div>}>
                <ProductCardWrapper products={products} />
            </Suspense>
        </main>
    );
}