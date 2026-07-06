// Simple in-memory data store for the Order Service.
// Swappable later for PostgreSQL without changing the service/controller layer contract.

let nextId = 1;
const orders = [];

function getAll() {
  return orders;
}

function create({ items, customerName }) {
  const order = {
    id: nextId++,
    customerName: customerName || 'Guest',
    items, // [{ productId, quantity }]
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

module.exports = { getAll, create };
