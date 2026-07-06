require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4002,
  serviceName: process.env.SERVICE_NAME || 'order-service',

  // IMPORTANT: used for Docker / K8s communication
  productServiceUrl: process.env.PRODUCT_SERVICE_URL || 'http://product-service:4001',
};