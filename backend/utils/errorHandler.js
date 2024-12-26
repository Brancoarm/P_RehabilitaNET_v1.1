/**
 * Manejador centralizado de errores
 * @param {Error} err - Objeto de error.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    console.error(`Error: ${message}`);
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;
  