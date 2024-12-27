# RehabilitaNET Backend

## Descripción

El backend de **RehabilitaNET** es una API RESTful desarrollada en Node.js con Express y MongoDB para gestionar usuarios, planes y pagos en la plataforma. Incluye integración con PayPal para realizar pagos y un flujo seguro de autenticación basado en JWT.

---

## Requisitos previos

- **Node.js** v16 o superior
- **MongoDB** (local o en la nube, como MongoDB Atlas)
- Cuenta en PayPal Developer para obtener credenciales de Sandbox

---

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:
     ```env
     PORT=5000
     MONGO_URI=<CONEXIÓN_A_MONGODB>
     JWT_SECRET=<TU_SECRETO_JWT>
     PAYPAL_CLIENT_ID=<CLIENT_ID_DE_SANDBOX>
     PAYPAL_SECRET=<SECRET_DE_SANDBOX>
     ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Accede a la documentación de la API en Swagger:
   ```
http://localhost:5000/api-docs
   ```

---

## Funcionalidades principales

### **Usuarios**
- Registro y autenticación de usuarios
- Actualización del perfil del usuario

### **Planes**
- CRUD completo de planes (solo para administradores)
- Gestión de beneficios y precios

### **Pagos**
- Creación y confirmación de pagos con PayPal
- Actualización automática de los planes del usuario tras la confirmación del pago

---

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con `nodemon`
- `npm start`: Inicia el servidor en modo producción

---

## Estructura del proyecto

```
backend/
├── controllers/      # Controladores de rutas
├── middlewares/      # Autenticación, validaciones y manejo de errores
├── models/           # Modelos de Mongoose para MongoDB
├── routes/           # Definición de rutas de la API
├── utils/            # Funciones auxiliares (PayPal, JWT, etc.)
├── swagger/          # Configuración de Swagger para la documentación
├── app.js            # Configuración principal del servidor
├── server.js         # Inicialización del servidor
└── .env              # Variables de entorno (no incluido en el repositorio)
```

---

## Seguridad

- Uso de **JWT** para autenticación y autorización.
- Uso de `express-validator` para validar datos entrantes.
- Integración con PayPal Sandbox para realizar pagos seguros.

---

## Contribuciones

1. Realiza un fork del repositorio.
2. Crea una rama nueva para tus cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Haz un commit de tus cambios:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Sube tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un Pull Request en GitHub.

---

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.

---

## Contacto
Si tienes preguntas o necesitas soporte, contacta al administrador del proyecto.