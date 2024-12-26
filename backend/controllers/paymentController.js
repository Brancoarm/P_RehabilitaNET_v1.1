const paypal = require('../config/paypal');
const User = require('../models/User');

// Crear una orden de pago
exports.createPayment = async (req, res) => {
  const { plan } = req.body;
  const amount = plan === 'Pro' ? 50 : 90; // Precio según el plan

  const order = {
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: 'USD', value: amount } }],
  };

  try {
    const response = await paypal.orders.create(order);
    res.status(201).json({ id: response.result.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirmar el pago
exports.confirmPayment = async (req, res) => {
  const { orderId, userId } = req.body;

  try {
    const capture = await paypal.orders.capture(orderId);
    if (capture.status === 'COMPLETED') {
      const user = await User.findById(userId);
      user.plan = capture.purchase_units[0].amount.value === '50' ? 'Pro' : 'Elite';
      await user.save();

      res.status(200).json({ message: 'Pago confirmado y plan actualizado', user });
    } else {
      res.status(400).json({ message: 'El pago no se completó' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
