import { useLocation } from "react-router";
import { Suspense, useEffect } from "react";

import type { Receipt } from "../types";

import "./CheckoutPage.css";

export default function CheckoutPage() {
    const { state } = useLocation();
    const receipt: Receipt = state?.receipt;

    const checkoutItems = receipt.items.map((item) => (
        <div className="checkout-item">
            <span key={item.product.id}>{`${item.product.name} x ${item.quantity}`}</span>
            <span>{item.quantity * item.product.price}</span>
        </div>
    ));

    return (
        <main id="checkout">
            <Suspense fallback={<div>Checking out... please wait.</div>}>
                <h3>Checkout Receipt</h3>
                <div className="checkout-container">
                    <span>{`Customer name: ${receipt.name}`}</span>
                    <span>{`Customer email: ${receipt.email}`}</span>
                    <span>{`Timestamp: ${new Date(receipt.timestamp).toLocaleString()}`}</span>
                    <br />
                    <span>Items:</span>
                    <hr />
                    {checkoutItems}
                    <hr />
                    <span style={{textAlign: "right"}}>{`Total: ${receipt.total.toFixed(2)}`}</span>
                </div>
            </Suspense>
        </main>
    )
}