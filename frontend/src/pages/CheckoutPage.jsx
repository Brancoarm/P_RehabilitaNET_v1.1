import React, { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import PaymentButton from '../components/buttons/PaymentButton';
import { createPayment, confirmPayment } from '../services/payment';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { plan } = location.state || {}; // Obtener el plan del estado

  const handlePayment = async () => {
    if (!plan) {
      alert('No se seleccionó ningún plan.');
      return;
    }

    try {
      const paymentData = {
        plan: plan.name, // Enviar el nombre del plan seleccionado
      };
      const result = await createPayment(paymentData);

      if (result.approvalLink) {
        // Abrir el enlace de aprobación de PayPal en una nueva ventana o pestaña
        window.open(result.approvalLink, '_blank');
      } else {
        alert('No se pudo generar el enlace de aprobación de PayPal.');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al procesar el pago. Intenta nuevamente.');
    }
  };

  // Confirmar el pago después de redirigir desde PayPal
  useEffect(() => {
    const confirmPaymentFromPayPal = async () => {
      const orderId = searchParams.get('token'); // PayPal devuelve el token como orderId
      const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage

      if (orderId && userId) {
        try {
          const response = await confirmPayment({ orderId, userId });
          alert('Pago confirmado y plan actualizado.');
          console.log('Pago confirmado:', response);
          navigate('/profile'); // Redirigir al perfil del usuario
        } catch (error) {
          console.error('Error al confirmar el pago:', error);
          alert('Hubo un problema al confirmar el pago.');
        }
      }
    };

    if (searchParams.has('token')) {
      confirmPaymentFromPayPal();
    }
  }, [searchParams, navigate]);

  if (!plan) {
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <h1 className="text-center">No se seleccionó ningún plan</h1>
          <p className="text-center">
            Por favor regresa a la página de planes y selecciona uno.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Finalizar Pago</h1>
        <div className="card mx-auto" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <h5 className="card-title">{plan.name}</h5>
            <p className="card-text">{plan.description}</p>
            <p className="card-text">
              <strong>Precio: ${plan.price}</strong>
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={handlePayment}
          >
            Pagar mediante PayPal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
