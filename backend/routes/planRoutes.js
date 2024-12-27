const express = require('express');
const {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/planController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { body, param } = require('express-validator');

const router = express.Router();

// Validaciones
const validatePlan = [
  body('name').notEmpty().withMessage('El nombre del plan es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('benefits').isArray().withMessage('Los beneficios deben ser una lista'),
];

const validatePlanId = [
  param('id').isMongoId().withMessage('ID de plan inválido'),
];

// Rutas
router.get('/', authMiddleware, getPlans);
router.post('/', authMiddleware, roleMiddleware('admin'), validatePlan, createPlan);
router.put('/:id', authMiddleware, roleMiddleware('admin'), validatePlanId, validatePlan, updatePlan);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), validatePlanId, deletePlan);

module.exports = router;