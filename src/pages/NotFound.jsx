import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const loc = useLocation();
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Page not found: <code>{loc.pathname}</code></p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
