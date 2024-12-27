const express = require('express');
const { getUserProfile, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Validaciones
const validateUpdateProfile = [
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Debe proporcionar un correo válido'),
  body('phone').optional().isMobilePhone().withMessage('Debe proporcionar un número de teléfono válido'),
];

// Rutas
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, validateUpdateProfile, updateUser);

module.exports = router;
