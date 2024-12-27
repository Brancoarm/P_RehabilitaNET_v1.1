import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="container mt-4">
      <h1>Iniciar Sesión</h1>
      <p>Página para iniciar sesión.</p>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
