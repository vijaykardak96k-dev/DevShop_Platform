require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4001,
  serviceName: process.env.SERVICE_NAME || 'product-service',
};