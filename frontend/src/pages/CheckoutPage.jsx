import React from 'react';
import Navbar from '../components/layout/Navbar';
import PaymentButton from '../components/buttons/PaymentButton';
import { createPayment } from '../services/payment';

const CheckoutPage = () => {
  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: 50, // Ejemplo: monto del pago
        description: 'Plan Premium',
      };
      const result = await createPayment(paymentData);
      console.log('Pago procesado:', result);
      alert('Pago exitoso. Gracias por tu compra.');
    } catch (error) {
      alert('Error al procesar el pago. Intenta nuevamente.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Finalizar Pago</h1>
        <div className="text-center mt-4">
          <PaymentButton onPaymentClick={handlePayment} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
