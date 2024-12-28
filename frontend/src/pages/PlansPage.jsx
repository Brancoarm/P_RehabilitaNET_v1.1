import React, { useEffect, useState } from 'react';
import PlanCards from '../components/cards/PlanCards';
import { getPlans } from '../services/api';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        const filteredPlans = data.filter((plan) => plan.name.toLowerCase() !== 'free'); // Excluye el plan "Free"
        setPlans(filteredPlans);
      } catch (err) {
        setError('No se pudieron cargar los planes.');
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Nuestros Planes</h1>
      <p className="text-center">Selecciona el plan que mejor se adapte a tus necesidades.</p>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <PlanCards plans={plans} />
      )}
    </div>
  );
};

export default PlansPage;
