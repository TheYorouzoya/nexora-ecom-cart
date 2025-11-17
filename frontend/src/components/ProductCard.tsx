import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import ReactLogo from "../assets/react.svg";
import "./ProductCard.css";


export default function ProductCard({ product }: { product: Product }) {
    const { items, addItem, decreaseItem, deleteItem } = useCart();
    const cartItem = items.find((i) => i.product.id === product.id);
    const productQuantity = cartItem ? cartItem.quantity : 0;

    const cartButtons = <div className="card-button-wrapper">
        <button className="card-button" onClick={() => decreaseItem(product)}>-</button>
        <span>{productQuantity}</span>
        <button className="card-button" onClick={() => addItem(product)}>+</button>
        <button className="card-button" onClick={() => deleteItem(product.id)}>Remove</button>
    </div>;

    return (
        <article className="product-card" id={product.id.toString()}>
            <div className="card-image">
                <img src={ReactLogo} />
            </div>
            <div className="card-body">
                <h3 className="card-heading">{product.name}</h3>
                <div className="card-footer">
                    <span className="card-price">{`Price: ${product.price}`}</span>
                    {productQuantity > 0 ?
                        cartButtons :
                        <button className="card-button" onClick={() => addItem(product)}>Add To Cart</button>}
                </div>
            </div>
        </article>
    );
}