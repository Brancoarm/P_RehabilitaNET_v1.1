import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import PlanCards from '../components/cards/PlanCards';
import { getPlans } from '../services/api';

const HomePage = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans(); // Obtén los planes desde el backend
        setPlans(data); // Actualiza el estado con los planes
      } catch (err) {
        setError('No se pudieron cargar los planes');
      }
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Bienvenido a RehabilitaNET</h1>
        <p className="text-center">Explora nuestros planes y servicios</p>
        {error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <PlanCards plans={plans} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
