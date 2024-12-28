import React from 'react';
import Navbar from '../components/layout/Navbar';
import RegisterForm from '../components/forms/RegisterForm';
import { registerUser } from '../services/auth';

const RegisterPage = () => {
  const handleRegister = async (userData) => {
    try {
      const data = await registerUser(userData);
      console.log('Usuario registrado:', data);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (error) {
      alert('Error al registrar. Por favor intenta nuevamente.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Crear Cuenta</h1>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default RegisterPage;
