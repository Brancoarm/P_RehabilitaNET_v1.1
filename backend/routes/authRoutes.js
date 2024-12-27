const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Validaciones comunes
const validateRegister = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('rut').notEmpty().withMessage('El RUT es obligatorio'),
  body('email').isEmail().withMessage('Debe proporcionar un correo válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const validateLogin = [
  body('rut').notEmpty().withMessage('El RUT es obligatorio'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

// Rutas
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;