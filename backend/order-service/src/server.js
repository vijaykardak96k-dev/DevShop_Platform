const express = require('express');
const cors = require('cors');
const config = require('./config');
const orderRoutes = require('./routes/orderRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: config.serviceName });
});

app.use('/orders', orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[${config.serviceName}] listening on port ${config.port}`);
});
