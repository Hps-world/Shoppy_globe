import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const items = useSelector((s) => s.cart.items || []);
  const navigate = useNavigate();

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="center">
        <h3>Your cart is empty</h3>
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-grid">
        <div className="cart-items">
          {items.map((it) => <CartItem key={it.id} item={it} />)}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Items:</span><span>{items.length}</span></div>
          <div className="summary-row"><strong>Total</strong><strong>₹{total}</strong></div>
          <button className="btn" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </aside>
      </div>
    </div>
  );
}
