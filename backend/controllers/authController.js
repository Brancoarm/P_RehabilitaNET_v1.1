const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtHelper');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res) => {
  const { name, rut, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ rut });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const newUser = await User.create({ name, rut, email, password });
    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { rut, password } = req.body;
  try {
    const user = await User.findOne({ rut });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
