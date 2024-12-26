const paypal = require('@paypal/checkout-server-sdk');
const environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);

/**
 * Crear una orden de pago
 * @param {Number} amount - Monto a pagar.
 * @returns {Object} - Detalles de la orden creada.
 */
const createOrder = async (amount) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: 'USD', value: amount } }],
  });

  const response = await client.execute(request);
  return response.result;
};

/**
 * Confirmar una orden de pago
 * @param {String} orderId - ID de la orden a confirmar.
 * @returns {Object} - Detalles de la orden confirmada.
 */
const captureOrder = async (orderId) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client.execute(request);
  return response.result;
};

module.exports = {
  createOrder,
  captureOrder,
};
