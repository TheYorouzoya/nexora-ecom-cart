import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { api } from "../api/api";

import type { SubmitHandler } from "react-hook-form";
import type { Receipt } from "../types";

import "./CartPage.css";

type CheckoutInputs = {
    name: string;
    email: string;
}

export default function CartPage() {
    const { total, items, addItem, decreaseItem, deleteItem, clearCart } = useCart();
    const { register, formState: { errors }, handleSubmit } = useForm<CheckoutInputs>();
    const totalItems = items.reduce((sum, curr) => sum + curr.quantity, 0);
    const navigate = useNavigate();
    const handleCheckout: SubmitHandler<CheckoutInputs> = async (data) => {
        const receipt = await api.post<Receipt>("/checkout", {
            name: data.name,
            email: data.email
        });

        clearCart();
        navigate("/checkout", { state: { receipt } });
    }

    const cartItems = items.map((item) => 
        <div className="cart-item" key={item.product.id}>
            <div className="cart-item-buttons">
                <div>{`${item.product.name} x ${item.quantity}`}</div>
                <button onClick={() => decreaseItem(item.product)}>-</button>
                <button onClick={() => addItem(item.product)}>+</button>
                <button onClick={() => deleteItem(item.product.id)}>Remove</button>
            </div>
            <div>{(item.quantity * item.product.price).toFixed(2)}</div>
        </div>
    )


    return (
        <main id="cart">
            <div className="cart-content">
                {items.length <= 0 ? <span>Your cart is empty</span> :        
                    <>
                        <div className="cart-details">
                            <h3>{`Your Cart: ${totalItems} items`}</h3>
                            {cartItems}
                            <hr />
                            <div className="cart-total">{`Total: ${total.toFixed(2)}`}</div>
                        </div>
                        <div className="checkout-form">
                            <form onSubmit={handleSubmit(handleCheckout)}>
                                <div className="form-field">
                                    <input placeholder="Name" 
                                        {...register("name", { required: true, minLength: 3 })}
                                        aria-invalid={errors.name ? "true" : "false" }
                                    />
                                    {errors.name?.type === "required" && <span role="alert" className="form-alert">Name is required.</span>}
                                </div>
                                <div className="form-field">
                                    <input placeholder="Email" 
                                        {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} 
                                        aria-invalid={errors.email ? "true" : "false" }
                                    />
                                    {errors.email?.type === "required" && <span role="alert" className="form-alert">Email is required.</span>}
                                    {errors.email?.type === "pattern" && <span role="alert" className="form-alert">Email is invalid.</span>}
                                </div>
                                <div>
                                    <input type="submit" value="Checkout" />
                                </div>
                            </form>
                        </div>
                    </>}
            </div>
        </main>
    );
}