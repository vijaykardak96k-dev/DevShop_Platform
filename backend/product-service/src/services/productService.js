const store = require('../data/store');

function listProducts() {
  return store.getAll();
}

function getProduct(id) {
  return store.getById(id);
}

function createProduct(data) {
  const { name, price, description } = data;

  if (!name || typeof name !== 'string') {
    const err = new Error('Product "name" is required and must be a string.');
    err.status = 400;
    throw err;
  }

  if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
    const err = new Error('Product "price" is required and must be a non-negative number.');
    err.status = 400;
    throw err;
  }

  return store.create({ name, price: Number(price), description });
}

module.exports = { listProducts, getProduct, createProduct };
