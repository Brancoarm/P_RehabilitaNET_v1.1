const express = require('express');
const {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/planController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Ruta para obtener todos los planes
router.get('/', authMiddleware, getPlans);

// Ruta para crear un nuevo plan
router.post('/', authMiddleware, roleMiddleware('admin'), createPlan);

// Ruta para actualizar un plan
router.put('/:id', authMiddleware, roleMiddleware('admin'), updatePlan);

// Ruta para eliminar un plan
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deletePlan);

module.exports = router;
