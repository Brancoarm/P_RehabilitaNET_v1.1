const express = require('express');
const { getUserProfile, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, getUserProfile);

// Ruta para actualizar el perfil del usuario
router.put('/profile', authMiddleware, updateUser);

module.exports = router;
