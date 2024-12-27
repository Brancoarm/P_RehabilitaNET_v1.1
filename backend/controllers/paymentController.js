const { createOrder, captureOrder } = require('../utils/paypalHelper');
const User = require('../models/User');

// Crear pago
exports.createPayment = async (req, res) => {
  const { plan } = req.body;
  const amount = plan === 'Pro' ? 50 : 90;

  try {
    const order = await createOrder(amount);
    const approvalLink = order.links.find(link => link.rel === 'approve').href;
    res.status(201).json({ orderId: order.id, approvalLink });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Confirmar pago
exports.confirmPayment = async (req, res) => {
  const { orderId, userId } = req.body;
  try {
    const capture = await captureOrder(orderId);
    if (capture.status === 'COMPLETED') {
      const user = await User.findById(userId);
      user.plan = capture.purchase_units[0].amount.value === '50' ? 'Pro' : 'Elite';
      await user.save();
      res.status(200).json({ message: 'Pago confirmado y plan actualizado', user });
    } else {
      res.status(400).json({ message: 'El pago no se completó' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
