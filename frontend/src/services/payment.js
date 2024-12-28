import api from './api';

export const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments/create', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const confirmPayment = async (paymentId) => {
  try {
    const response = await api.post('/payments/confirm', { id: paymentId });
    return response.data;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};
