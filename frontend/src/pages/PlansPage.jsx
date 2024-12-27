import React from 'react';
import PlanCards from '../components/PlanCards';

const plans = [
  { id: 1, name: 'Free', description: 'Plan básico', price: 0 },
  { id: 2, name: 'Pro', description: 'Plan profesional', price: 50 },
  { id: 3, name: 'Elite', description: 'Plan completo', price: 90 },
];

function PlansPage() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Nuestros Planes</h1>
      <PlanCards plans={plans} />
    </div>
  );
}

export default PlansPage;
