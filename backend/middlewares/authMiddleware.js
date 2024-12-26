const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); // Sin incluir la contraseña
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user; // Adjunta el usuario al request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
