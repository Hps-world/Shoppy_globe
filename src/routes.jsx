import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// lazy load pages for code-splitting
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/Shoppy_globe/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> }
    ]
  },
  // 404 - outside the App so header can be omitted if desired in NotFound
  { path: "*", element: <NotFound /> }
]);

export default router;
