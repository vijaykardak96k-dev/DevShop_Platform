import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        DevShop
      </Link>
      <div className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
