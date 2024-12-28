import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../../services/api';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [userPlan, setUserPlan] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(); // Llamada al endpoint /users/profile
        setUserName(data.name); // Asignamos el nombre del usuario
        setUserPlan(data.plan); // Asignamos el nombre del plan
        setUserRole(data.role); // Asignamos el rol del usuario
        setIsLoggedIn(true); // Usuario está logeado
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setIsLoggedIn(false); // Usuario no está logeado
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
            {/* Mostrar opciones si el usuario no está logeado */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            {/* Mostrar opciones dependiendo del rol */}
            {isLoggedIn && userRole === 'admin' && (
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

            {isLoggedIn && userRole === 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Perfil
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="ms-3">
            {isLoggedIn ? (
              <>
                <span>
                  Bienvenido, <strong>{userName}</strong> ({userPlan})
                </span>
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
