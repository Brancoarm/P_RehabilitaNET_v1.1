import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(user);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={user.email}
          onChange={handleChange}
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
          name="password"
          className="form-control"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Registrar
      </button>
    </form>
  );
};

export default RegisterForm;
