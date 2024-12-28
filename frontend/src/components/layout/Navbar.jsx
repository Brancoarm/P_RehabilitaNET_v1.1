import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../../services/api';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [userPlan, setUserPlan] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(); // Llamada al endpoint /users/profile
        setUserName(data.name); // Asignamos el nombre del usuario
        setUserPlan(data.plan); // Asignamos el nombre del plan
        setUserRole(data.role); // Asignamos el rol del usuario
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de autenticación
    window.location.href = '/login'; // Redirige al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          RehabilitaNET
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Mostrar opciones dependiendo del rol */}
            {userRole === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Administrar Planes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Perfil
                  </Link>
                </li>
              </>
            )}
            {userRole !== 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Perfil
                </Link>
              </li>
            )}
          </ul>
          <div className="ms-3">
            {userName ? (
              <>
                <span>
                  Bienvenido, <strong>{userName}</strong> ({userPlan})
                </span>
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link className="btn btn-primary" to="/login">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
