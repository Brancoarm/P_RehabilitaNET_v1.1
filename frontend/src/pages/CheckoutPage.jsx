import React from 'react';
import PaymentButton from '../components/PaymentButton';
import PlanSummary from '../components/PlanSummary';

function CheckoutPage() {
  const selectedPlan = {
    name: 'Pro',
    description: 'Plan profesional con acceso a múltiples servicios',
    price: 50,
  };

  const handlePayment = (method) => {
    console.log(`Iniciando pago con ${method} para:`, selectedPlan);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Resumen de tu Compra</h1>
      <div className="card mx-auto shadow" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <PlanSummary plan={selectedPlan} />
          <PaymentButton
            method="PayPal"
            label={
              <>
                <img
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png"
                  alt="PayPal"
                  style={{ height: '24px' }}
                />
                Suscribirse
              </>
            }
            onClick={() => handlePayment('PayPal')}
          />
          <PaymentButton
            method="Credit/Debit"
            label="Tarjeta de débito o crédito"
            onClick={() => handlePayment('Credit/Debit')}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;