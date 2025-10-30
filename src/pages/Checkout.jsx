import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items || []);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  const placeOrder = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      setMessage("Please fill all fields.");
      return;
    }

    setPlacing(true);
    setMessage("");

    // Simulate API delay
    setTimeout(() => {
      dispatch(clearCart());
      setMessage("Order placed successfully.");
      setPlacing(false);
      // redirect to home after 1.2s
      setTimeout(() => navigate("/"), 1200);
    }, 900);
  };

  if (items.length === 0) {
    return (
      <div className="center">
        <h3>No items in cart</h3>
        <p>Please add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <label>
            Full name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            Email
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            Address
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>

          <div>
            <button className="btn" type="submit" disabled={placing}>Place Order</button>
            <button type="button" className="btn ghost" onClick={() => navigate("/cart")}>Back to Cart</button>
          </div>

          {message && <div className="msg">{message}</div>}
        </form>

        <aside className="order-summary">
          <h3>Order Summary</h3>
          {items.map((it) => (
            <div key={it.id} className="summary-item">
              <img src={it.thumbnail} alt={it.title} loading="lazy" />
              <div>
                <div>{it.title}</div>
                <div>Qty: {it.quantity} • ₹{it.price * it.quantity}</div>
              </div>
            </div>
          ))}
          <div className="summary-total">Total: ₹{total}</div>
        </aside>
      </div>
    </div>
  );
}
