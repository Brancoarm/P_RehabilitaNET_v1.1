import React from 'react';

function PlanCards({ plans }) {
  return (
    <div className="row">
      {plans.map((plan) => (
        <div className="col-md-4 mb-4" key={plan.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{plan.name}</h5>
              <p className="card-text">{plan.description}</p>
              <p className="card-text"><strong>${plan.price}</strong></p>
              <button className="btn btn-primary">Seleccionar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlanCards;
