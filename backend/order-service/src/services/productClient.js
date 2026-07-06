const axios = require('axios');
const config = require('../config');

// Talks to the Product Service to validate that ordered products actually exist.
// Keeping this isolated makes it easy to swap the transport (REST/gRPC/queue) later.
async function getProductById(productId) {
  try {
    const response = await axios.get(`${config.productServiceUrl}/products/${productId}`);
    return response.data.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return null;
    }
    const wrapped = new Error(
      `Unable to reach product-service to validate product ${productId}: ${err.message}`
    );
    wrapped.status = 502;
    throw wrapped;
  }
}

module.exports = { getProductById };
