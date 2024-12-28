const { createOrder, captureOrder } = require('../utils/paypalHelper');
const User = require('../models/User');
const Plan = require('../models/Plan'); // Importar el modelo Plan

// Crear pago
exports.createPayment = async (req, res) => {
  const { plan } = req.body;

  try {
    // Buscar el plan en la base de datos
    const selectedPlan = await Plan.findOne({ name: plan });
    if (!selectedPlan) {
      return res.status(404).json({ message: 'Plan no encontrado' });
    }

    const amount = selectedPlan.price; // Obtener el precio del plan desde la base de datos

    // Crear la orden de PayPal
    const order = await createOrder(amount);
    const approvalLink = order.links.find((link) => link.rel === 'approve').href;

    res.status(201).json({ orderId: order.id, approvalLink });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ message: 'Error al crear el pago', error: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  const { orderId, userId } = req.body;

  try {
    // Captura la orden desde PayPal
    const capture = await captureOrder(orderId);

    if (capture.status === 'COMPLETED') {
      const amountPaid = parseFloat(capture.purchase_units[0].amount.value); // Obtiene el monto pagado

      // Busca el plan en la base de datos según el monto pagado
      const matchedPlan = await Plan.findOne({ price: amountPaid });

      if (!matchedPlan) {
        return res.status(404).json({ message: 'Plan asociado al monto no encontrado' });
      }

      // Actualiza el plan del usuario
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      user.plan = matchedPlan.name;
      await user.save();

      res.status(200).json({ message: 'Pago confirmado y plan actualizado', user });
    } else {
      res.status(400).json({ message: 'El pago no se completó' });
    }
  } catch (error) {
    console.error('Error al confirmar el pago:', error);
    res.status(500).json({ message: 'Error al confirmar el pago', error: error.message });
  }
};

