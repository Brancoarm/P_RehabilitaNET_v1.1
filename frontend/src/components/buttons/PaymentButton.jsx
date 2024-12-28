import React from 'react';

const PaymentButton = ({ onPaymentClick }) => {
  return (
    <button className="btn btn-success" onClick={onPaymentClick}>
      Confirmar Pago
    </button>
  );
};

export default PaymentButton;
