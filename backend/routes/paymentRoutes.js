const express = require('express');
const { createPayment, confirmPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para crear un pago
router.post('/create', authMiddleware, createPayment);

// Ruta para confirmar un pago
router.post('/confirm', authMiddleware, confirmPayment);

module.exports = router;
