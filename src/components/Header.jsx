import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const items = useSelector((s) => s.cart.items);
  const totalCount = items.reduce((s, it) => s + it.quantity, 0);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand" onClick={() => navigate("/")}>
          <h1>ShoppyGlobe</h1>
          <small>e-commerce demo</small>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            Cart {totalCount > 0 && <span className="badge">{totalCount}</span>}
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? "active" : "")}>Checkout</NavLink>
        </nav>
      </div>
    </header>
  );
}
