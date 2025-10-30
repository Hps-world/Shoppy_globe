import React, { useMemo } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { setTerm, clearTerm } from "../store/searchSlice";

export default function Home() {
  const { data: products, loading, error } = useFetchProducts();
  const dispatch = useDispatch();
  const term = useSelector((s) => s.search.term || "");

  const filtered = useMemo(() => {
    if (!term.trim()) return products;
    const q = term.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q)
    );
  }, [products, term]);

  return (
    <div>
      <section className="search-row">
        <input
          aria-label="Search products"
          value={term}
          onChange={(e) => dispatch(setTerm(e.target.value))}
          placeholder="Search products by title, brand or description..."
        />
        <button className="btn ghost" onClick={() => dispatch(clearTerm())}>Clear</button>
      </section>

      {loading && <div className="center">Loading products...</div>}
      {error && <div className="error">Error: {error}</div>}

      <section className="grid">
        {filtered.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </section>
    </div>
  );
}
