import React from 'react';

function PlanSummary({ plan }) {
  return (
    <div>
      <h5 className="card-title text-center">{plan.name}</h5>
      <p className="card-text">{plan.description}</p>
      <p className="card-text text-center"><strong>Precio: ${plan.price} USD</strong></p>
    </div>
  );
}

export default PlanSummary;
