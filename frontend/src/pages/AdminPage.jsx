import React from 'react';

function AdminPage() {
  return (
    <div className="container">
      <h1 className="text-center mb-4">Panel de Administración</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Gestión de Usuarios</h5>
              <p className="card-text">Visualiza, edita y elimina usuarios registrados.</p>
              <button className="btn btn-primary">Ir a Usuarios</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Gestión de Planes</h5>
              <p className="card-text">Crea, edita y elimina planes disponibles.</p>
              <button className="btn btn-primary">Ir a Planes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
