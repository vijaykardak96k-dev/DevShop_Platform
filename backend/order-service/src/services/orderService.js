const store = require('../data/store');
const productClient = require('./productClient');

function listOrders() {
  return store.getAll();
}

async function createOrder({ items, customerName }) {
  if (!Array.isArray(items) || items.length === 0) {
    const err = new Error('Order "items" is required and must be a non-empty array.');
    err.status = 400;
    throw err;
  }

  for (const item of items) {
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      const err = new Error(
        'Each order item requires a valid "productId" and a positive "quantity".'
      );
      err.status = 400;
      throw err;
    }

    const product = await productClient.getProductById(item.productId);
    if (!product) {
      const err = new Error(`Product with id ${item.productId} does not exist.`);
      err.status = 400;
      throw err;
    }
  }

  return store.create({ items, customerName });
}

module.exports = { listOrders, createOrder };
