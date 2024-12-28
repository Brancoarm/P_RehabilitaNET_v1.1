import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { getUserPlan } from '../services/api';
import { getUserProfile } from '../services/api';
import { updateProfile } from '../services/api';

const ProfilePage = () => {
  const [userPlan, setUserPlan] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Cargar el perfil del usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const dataProfile = await getUserProfile();
        console.log("Perfil cargado: ", dataProfile);
        setUserProfile(dataProfile);
        setFormData({
          name: dataProfile.name,
          email: dataProfile.email,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Cargar el plan del usuario
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const data = await getUserPlan();
        setUserPlan(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el plan.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Mostrar y ocultar el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Guardar cambios de perfil
  const handleSaveChanges = async () => {
    try {
      const updatedProfile = await updateProfile(formData); // Llamar a la API para actualizar el perfil
      setUserProfile(updatedProfile); // Actualizar el perfil localmente
      setShowModal(false); // Cerrar el modal
      window.location.reload(); // Recargar la página
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil.');
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h1 className="text-center">Mi Perfil</h1>
        <p className="text-center">Aquí puedes ver tu plan asociado.</p>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : userProfile ? (
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">{userProfile.name}</h5>
              </div>
              {/* Botón Editar alineado a la derecha */}
              <button className="btn btn-warning ms-auto" onClick={handleOpenModal}>Editar</button>
            </div>
            <div className="card-body">
              <p className="card-text">Rut: {userProfile.rut}</p>
              <p className="card-text">Rol: {userProfile.role}</p>
              <p className="card-text">Mail: {userProfile.email}</p>
            </div>

            {/* Modal de edición */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">Editar Perfil</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          placeholder={userProfile.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          placeholder={userProfile.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <p className="text-center text-muted">No tienes un plan asociado.</p>
        )}
      </div>

      <div className="container mt-4">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : userPlan ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Plan: {userPlan.name}</h5>
              <p className="card-text">{userPlan.description}</p>
              <p className="card-text">
                <strong>Precio: ${userPlan.price}</strong>
              </p>
              {userPlan.benefits && userPlan.benefits.length > 0 && (
                <ul>
                  {userPlan.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">No tienes un plan asociado.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
