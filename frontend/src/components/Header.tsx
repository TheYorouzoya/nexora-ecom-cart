import { Link } from "react-router";
import "./Header.css";
import { useCart } from "../context/CartContext";

export default function Header() {
    const { items } = useCart();

    return (
        <nav>
            <div className="nav-container">
                <div className="page-buttons">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                </div>
                <div className="nav-cart">
                    <Link to="/cart">Cart</Link>
                    <span className="cart-badge">{items.length > 0 && items.length}</span>
                </div>
            </div>
        </nav>
    )
}