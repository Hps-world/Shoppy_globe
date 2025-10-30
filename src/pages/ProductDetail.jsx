import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (mounted) setProduct(json);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Error fetching product");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="center">Loading product...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="center">Product not found</div>;

  const onAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }));
    navigate("/cart");
  };

  return (
    <div className="product-detail">
      <div className="pd-gallery">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="pd-thumbs">
          {(product.images || []).slice(0, 4).map((s, i) => (
            <img key={i} src={s} alt={`${product.title}-${i}`} loading="lazy" />
          ))}
        </div>
      </div>

      <div className="pd-info">
        <h2>{product.title}</h2>
        <div className="meta">Brand: {product.brand} • Category: {product.category}</div>
        <div className="meta">Rating: ⭐ {product.rating} • Price: ₹{product.price}</div>

        <p className="desc">{product.description}</p>

        <div className="actions">
          <button className="btn" onClick={onAdd}>Add to Cart</button>
          <button className="btn ghost" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
