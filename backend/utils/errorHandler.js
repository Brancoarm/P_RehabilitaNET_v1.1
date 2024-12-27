const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  console.error(`Error: ${message}`);
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;