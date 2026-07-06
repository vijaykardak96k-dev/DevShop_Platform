function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  console.error(`[error] ${req.method} ${req.originalUrl} ->`, err.message);
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };
