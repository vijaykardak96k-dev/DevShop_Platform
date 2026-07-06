const orderService = require('../services/orderService');

function getAllOrders(req, res, next) {
  try {
    const orders = orderService.listOrders();
    res.status(200).json({ data: orders });
  } catch (err) {
    next(err);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ data: order });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllOrders, createOrder };
