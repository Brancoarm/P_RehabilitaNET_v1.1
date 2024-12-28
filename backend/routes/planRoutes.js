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

// Importar modelo Plan solo si es necesario
const Plan = require('../models/Plan');

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

// Rutas CRUD para los planes
router.get('/', getPlans);
router.post('/', authMiddleware, roleMiddleware('admin'), validatePlan, createPlan);
router.put('/:id', authMiddleware, roleMiddleware('admin'), validatePlanId, validatePlan, updatePlan);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), validatePlanId, deletePlan);

// Nuevo endpoint: Obtener el plan del usuario autenticado
router.get('/my-plan', authMiddleware, async (req, res) => {
  try {
    const user = req.user; // Obtener el usuario autenticado desde el middleware

    if (!user.plan) {
      return res.status(404).json({ message: 'El usuario no tiene un plan asignado.' });
    }

    // Si solo necesitas el nombre del plan
    //return res.json({ plan: user.plan });

    //detalles del plan desde la colección Plan
    const planDetails = await Plan.findOne({ name: user.plan });
    if (!planDetails) {
    return res.status(404).json({ message: 'Detalles del plan no encontrados.' });
    }
    res.json(planDetails);

  } catch (error) {
    console.error('Error al obtener el plan del usuario:', error);
    res.status(500).json({ message: 'Error interno al obtener el plan del usuario.' });
  }
});

module.exports = router;
