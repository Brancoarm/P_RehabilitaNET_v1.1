import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlansPage from './pages/PlansPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  return (
    <Router>
      <Navbar auth={auth} />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login"
            element={<LoginPage setAuth={setAuth} />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/profile"
            element={
              auth.isAuthenticated ? (
                <ProfilePage user={auth.user} />
              ) : (
                <LoginPage setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/plans"
            element={<PlansPage />}
          />
          <Route
            path="/admin"
            element={
              auth.user?.role === 'admin' ? (
                <AdminPage />
              ) : (
                <p>No tienes acceso a esta página</p>
              )
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
