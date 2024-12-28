import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Navbar from '../components/layout/Navbar';
import LoginForm from '../components/forms/LoginForm';
import { loginUser } from '../services/auth';

const LoginPage = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleLogin = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      console.log('Usuario autenticado:', data);

      // Almacenar el token en localStorage
      localStorage.setItem('token', data.token);

      // Mostrar alerta de éxito
      alert('Inicio de sesión exitoso');

      // Redirigir a una ruta específica (por ejemplo, el perfil)
      navigate('/profile');
    } catch (error) {
      // Manejar errores de inicio de sesión
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Iniciar Sesión</h1>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
