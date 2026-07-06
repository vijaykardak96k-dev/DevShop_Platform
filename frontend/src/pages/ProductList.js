import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductAPI } from '../api/client';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    ProductAPI.getAll()
      .then(setProducts)
      .catch(() => setError('Could not load products. Is the product-service running?'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
