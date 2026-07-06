require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4003,
  serviceName: process.env.SERVICE_NAME || 'user-service',
};