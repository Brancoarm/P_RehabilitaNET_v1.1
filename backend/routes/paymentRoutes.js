const express = require('express');
const { createPayment, confirmPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Validaciones
const validateCreatePayment = [
  body('plan').isIn(['Pro', 'Elite']).withMessage('El plan debe ser Pro o Elite'),
];

const validateConfirmPayment = [
  body('orderId').notEmpty().withMessage('El ID de la orden es obligatorio'),
  body('userId').isMongoId().withMessage('El ID de usuario debe ser válido'),
];

// Rutas
router.post('/create', authMiddleware, validateCreatePayment, createPayment);
router.post('/confirm', authMiddleware, validateConfirmPayment, confirmPayment);

module.exports = router;