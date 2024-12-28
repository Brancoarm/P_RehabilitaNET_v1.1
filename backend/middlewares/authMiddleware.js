const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Verificar si el token existe en las cabeceras
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario asociado al token
    const user = await User.findById(decoded.id).select('-password'); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado. El token no es válido.' });
    }

    // Adjuntar el usuario autenticado a la solicitud
    req.user = user;

    // Continuar al siguiente middleware o ruta
    next();
  } catch (error) {
    // Detectar errores de JWT y otros problemas
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'El token ha expirado. Por favor, inicia sesión nuevamente.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'El token es inválido.' });
    }

    // Error genérico
    res.status(500).json({ message: 'Error de autenticación.' });
  }
};

module.exports = authMiddleware;
