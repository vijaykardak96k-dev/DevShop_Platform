const productService = require('../services/productService');

function getAllProducts(req, res, next) {
  try {
    const products = productService.listProducts();
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
}

function getProductById(req, res, next) {
  try {
    const product = productService.getProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ error: `Product with id ${req.params.id} not found.` });
    }

    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
}

function createProduct(req, res, next) {
  try {
    const product = productService.createProduct(req.body);
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, getProductById, createProduct };
