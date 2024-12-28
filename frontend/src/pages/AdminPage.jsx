import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { getPlans, createPlan, updatePlan, deletePlan } from '../services/api';

const AdminPage = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: '',
    benefits: []
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all plans on load
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        setError('Error al obtener los planes.');
      }
    };
    fetchPlans();
  }, []);

  const handleCreatePlan = async () => {
    try {
      await createPlan(newPlan);
      setSuccess('Plan creado con éxito.');
      setNewPlan({ name: '', description: '', price: '', benefits: [] });
    } catch (err) {
      setError('Error al crear el plan.');
    }
  };

  const handleUpdatePlan = async () => {
    try {
      await updatePlan(selectedPlan._id, selectedPlan);
      setSuccess('Plan actualizado con éxito.');
      alert("Plan actualizado correctamente");
      window.location.reload(); // Recargar la página
    } catch (err) {
      setError('Error al actualizar el plan.');
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      await deletePlan(id);
      setPlans(plans.filter(plan => plan._id !== id));
      setSuccess('Plan eliminado con éxito.');
      alert("Plan eliminado con éxito.");
      window.location.reload(); // Recargar la página
    } catch (err) {
      setError('Error al eliminar el plan.');
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan({ ...plan });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Panel de Administración</h1>
        <p className="text-center">Gestión de usuarios, planes y pagos.</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Listar todos los planes */}
        <h2 className="mt-4">Planes Disponibles</h2>
        <ul className="list-group">
          {plans.map(plan => (
            <li
              key={plan._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {plan.name} - ${plan.price}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSelectPlan(plan)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeletePlan(plan._id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {/* Editar plan seleccionado */}
        {selectedPlan && (
          <div className="mt-4">
            <h2>Editar Plan</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePlan();
              }}
            >
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedPlan.name}
                  onChange={(e) =>
                    setSelectedPlan({ ...selectedPlan, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  value={selectedPlan.description}
                  onChange={(e) =>
                    setSelectedPlan({
                      ...selectedPlan,
                      description: e.target.value
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedPlan.price}
                  onChange={(e) =>
                    setSelectedPlan({ ...selectedPlan, price: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-success">
                Actualizar Plan
              </button>
            </form>
          </div>
        )}

        {/* Crear nuevo plan */}
        <div className="mt-4">
          <h2>Crear Nuevo Plan</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePlan();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={newPlan.name}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
