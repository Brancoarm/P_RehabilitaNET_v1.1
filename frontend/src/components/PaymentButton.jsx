import React from 'react';

function PaymentButton({ method, label, onClick }) {
  return (
    <button
      className={`btn ${method === 'PayPal' ? 'btn-paypal' : 'btn-credit'} w-100 mb-2`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default PaymentButton;
