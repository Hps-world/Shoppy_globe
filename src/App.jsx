import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">© ShoppyGlobe 2025</footer>
    </div>
  );
}
