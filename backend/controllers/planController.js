const Plan = require('../models/Plan');

// Obtener todos los planes
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Crear un nuevo plan
exports.createPlan = async (req, res) => {
  const { name, description, price, benefits } = req.body;
  try {
    const newPlan = await Plan.create({ name, description, price, benefits });
    res.status(201).json({ message: 'Plan creado con éxito', plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Actualizar un plan
exports.updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, benefits } = req.body;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(id, { name, description, price, benefits }, { new: true });
    res.status(200).json({ message: 'Plan actualizado con éxito', plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Eliminar un plan
exports.deletePlan = async (req, res) => {
  const { id } = req.params;
  try {
    await Plan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plan eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
