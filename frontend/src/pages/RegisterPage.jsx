import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="container mt-4">
      <h1>Registrar Cuenta</h1>
      <p>Página para registrar una nueva cuenta.</p>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
