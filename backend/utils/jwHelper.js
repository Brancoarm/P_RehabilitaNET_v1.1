const jwt = require('jsonwebtoken');

/**
 * Generar un token JWT
 * @param {Object} payload - Datos que se incluirán en el token (por ejemplo, ID y rol del usuario).
 * @param {String} expiresIn - Tiempo de expiración del token.
 * @returns {String} - Token JWT firmado.
 */
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verificar un token JWT
 * @param {String} token - Token JWT a verificar.
 * @returns {Object} - Datos decodificados si el token es válido.
 * @throws {Error} - Si el token es inválido o ha expirado.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
