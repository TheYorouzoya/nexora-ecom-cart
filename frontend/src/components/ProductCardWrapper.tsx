import ProductCard from "./ProductCard";
import type { Product } from "../types";
import "./ProductCardWrapper.css";

export default function ProductCardWrapper({ products }: {products: Product[]}) {
    const productCards = products.map((product, index) => <ProductCard key={index} product={product} />)

    return (
        <section className="product-card-wrapper">
            {...productCards}
        </section>
    )
}