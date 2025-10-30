import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const dec = () => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }));
  const inc = () => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  const remove = () => dispatch(removeFromCart(item.id));

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} loading="lazy" />
      <div className="ci-body">
        <div className="ci-title">{item.title}</div>
        <div className="ci-meta">Price: ₹{item.price} • Subtotal: ₹{item.price * item.quantity}</div>
        <div className="ci-actions">
          <button className="qty" onClick={dec}>−</button>
          <span className="qty-val">{item.quantity}</span>
          <button className="qty" onClick={inc}>+</button>
          <button className="btn ghost small" onClick={remove}>Remove</button>
        </div>
      </div>
    </div>
  );
}
