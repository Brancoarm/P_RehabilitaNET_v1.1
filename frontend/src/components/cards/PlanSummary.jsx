import React from 'react';

const PlanSummary = ({ plan }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{plan.name}</h5>
        <p className="card-text">{plan.description}</p>
        <p className="card-text">
          <strong>Precio: ${plan.price}</strong>
        </p>
      </div>
    </div>
  );
};

export default PlanSummary;
