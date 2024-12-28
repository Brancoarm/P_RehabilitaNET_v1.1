import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añadir encabezado de autorización
    }
    return config;
  },
  (error) => Promise.reject(error) // Manejar errores del interceptor
);

// Método para obtener todos los planes disponibles
export const getPlans = async () => {
  try {
    const response = await api.get('/plans'); // Llama al endpoint para obtener todos los planes
    return response.data; // Devuelve los datos de los planes
  } catch (error) {
    console.error('Error al obtener los planes disponibles:', error);
    throw error;
  }
};
// Método para crear un nuevo plan
export const createPlan = async (planData) => {
  try {
    const response = await api.post('/plans', planData); // Llama al endpoint para crear un plan
    return response.data; // Devuelve los datos del plan creado
  } catch (error) {
    console.error('Error al crear el plan:', error);
    throw error;
  }
};

// Método para actualizar un plan existente
export const updatePlan = async (planId, planData) => {
  try {
    const response = await api.put(`/plans/${planId}`, planData); // Llama al endpoint para actualizar el plan
    return response.data; // Devuelve los datos actualizados del plan
  } catch (error) {
    console.error('Error al actualizar el plan:', error);
    throw error;
  }
};

// Método para eliminar un plan existente
export const deletePlan = async (planId) => {
  try {
    const response = await api.delete(`/plans/${planId}`); // Llama al endpoint para eliminar el plan
    return response.data; // Devuelve el resultado de la eliminación
  } catch (error) {
    console.error('Error al eliminar el plan:', error);
    throw error;
  }
};


// Método para obtener el plan específico del usuario autenticado
export const getUserPlan = async () => {
  try {
    const response = await api.get('/plans/my-plan'); // Llama al endpoint para obtener el plan del usuario
    return response.data; // Devuelve los datos del plan del usuario
  } catch (error) {
    console.error('Error al obtener el plan del usuario:', error);
    throw error;
  }
};

// Método para obtener el perfil del usuario autenticado
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile'); // Llama al endpoint para obtener el perfil
    return response.data; // Devuelve los datos del perfil
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};


export const updateProfile = async ( profileData) => {
  try {
    const response = await api.put(`/users/profile`, profileData); // Llama al endpoint para actualizar el plan
    return response.data; // Devuelve los datos actualizados del plan
  } catch (error) {
    console.error('Error al actualizar el plan:', error);
    throw error;
  }
};

export const confirmPayment = async ({ orderId, userId }) => {
  try {
    const response = await api.post('/payments/confirm', { orderId, userId });
    return response.data;
  } catch (error) {
    console.error('Error al confirmar el pago:', error);
    throw error;
  }
};

export default api;
