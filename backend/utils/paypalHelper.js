const paypal = require('@paypal/checkout-server-sdk');

const environment =
  process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET)
    : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);

/**
 * Crear una orden de PayPal
 * @param {number} amount - Monto total de la orden
 * @param {string} currency - Código de la moneda (por defecto USD)
 * @returns {object} Resultado de la orden creada
 */
const createOrder = async (amount, currency = 'USD') => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString(), // Convertir a string por requerimientos de la API
          },
        },
      ],
    });
    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error('Error al crear la orden de PayPal:', error);
    throw new Error('No se pudo crear la orden de PayPal');
  }
};

/**
 * Capturar una orden de PayPal
 * @param {string} orderId - ID de la orden
 * @returns {object} Resultado de la captura
 */
const captureOrder = async (orderId) => {
  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error('Error al capturar la orden de PayPal:', error);
    throw new Error('No se pudo capturar la orden de PayPal');
  }
};

module.exports = { createOrder, captureOrder };
