// Simple in-memory data store for the Product Service.
// Swappable later for PostgreSQL without changing the service/controller layer contract.

let nextId = 4;

const products = [
  {
    id: 1,
    name: 'Wireless Mouse',
    price: 19.99,
    description: 'Ergonomic wireless mouse with USB receiver.',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 59.99,
    description: 'RGB backlit mechanical keyboard with blue switches.',
  },
  {
    id: 3,
    name: '27" Monitor',
    price: 189.99,
    description: '27 inch 1440p IPS monitor, 75Hz refresh rate.',
  },
];

function getAll() {
  return products;
}

function getById(id) {
  return products.find((p) => p.id === Number(id));
}

function create({ name, price, description }) {
  const product = {
    id: nextId++,
    name,
    price,
    description: description || '',
  };
  products.push(product);
  return product;
}

module.exports = { getAll, getById, create };
