import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

/**
 * ProductItem displays a single product card.
 * Props:
 *   product: { id, title, price, thumbnail, rating, description }
 */
export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const onAdd = () => {
    // dispatch a minimal product payload used in cart
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="thumb-link" title={product.title}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </Link>

      <div className="product-body">
        <Link to={`/product/${product.id}`} className="title">{product.title}</Link>
        <div className="meta">
          <span>⭐ {product.rating}</span>
          <span>₹ {product.price}</span>
        </div>
        <p className="desc">{product.description?.slice(0, 100)}{product.description?.length > 100 && "..."}</p>
      </div>

      <div className="product-actions">
        <button className="btn" onClick={onAdd}>Add to Cart</button>
        <Link to={`/product/${product.id}`} className="btn ghost">View</Link>
      </div>
    </div>
  );
}
