import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ rut, password });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="rut" className="form-label">
          Rut
        </label>
        <input
          type="rut"
          id="rut"
          className="form-control"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
