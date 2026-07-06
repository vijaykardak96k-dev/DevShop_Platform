import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderAPI } from '../api/client';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [status, setStatus] = useState('');
  const [placing, setPlacing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setPlacing(true);
    setStatus('');

    try {
      const orderPayload = {
        customerName: customerName || 'Guest',
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const order = await OrderAPI.create(orderPayload);
      setStatus(`Order #${order.id} placed successfully!`);
      clearCart();
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to place order.';
      setStatus(message);
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0 && !status) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {items.length > 0 && (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product.id}>
                <td>{item.product.name}</td>
                <td>${item.product.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product.id, Number(e.target.value))
                    }
                  />
                </td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {items.length > 0 && (
        <>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <div className="checkout-form">
            <label htmlFor="customerName">Name:</label>
            <input
              id="customerName"
              type="text"
              placeholder="Your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <button onClick={handleCheckout} disabled={placing}>
              {placing ? 'Placing order...' : 'Checkout'}
            </button>
          </div>
        </>
      )}

      {status && <p className="status">{status}</p>}
    </div>
  );
}
