import React, { useState } from 'react';

function LoginForm({ setAuth }) {
  const [formData, setFormData] = useState({ rut: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Inicio de sesión exitoso:', data);

        // Almacena el token y datos del usuario
        localStorage.setItem('token', data.token);
        setAuth({ isAuthenticated: true, user: data.user }); // Actualiza el estado global
        alert('Inicio de sesión exitoso');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error desconocido');
      }
    } catch (error) {
      setError('Error en el servidor. Inténtelo más tarde.');
    }
  };

  return (
    <div>
<form onSubmit={handleSubmit} className="w-50 mx-auto">
  <div className="mb-3">
    <label htmlFor="rut" className="form-label">RUT</label>
    <input
      type="text"
      className="form-control"
      id="rut"
      name="rut"
      value={formData.rut}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Contraseña</label>
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>
  {error && <p className="text-danger">{error}</p>}
  <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
</form>

    </div>
  );
}

export default LoginForm;
