RehabilitaNET

RehabilitaNET es una plataforma web diseñada para ofrecer servicios de rehabilitación de manera accesible, oportuna y transparente. Funciona como un sistema de suscripción basado en planes que se adaptan a las necesidades del usuario, brindando opciones como asistencia remota, visitas domiciliarias y consultas personalizadas.

Funcionalidades Principales

Usuarios
1.	Registro de Usuario:
o	Solicita los datos del usuario: RUT, nombre completo, correo electrónico, dirección, teléfono y contraseña.
o	Asigna automáticamente el plan Free al registrarse.
o	Almacena la información de manera segura en una base de datos MongoDB.
2.	Iniciar Sesión:
o	Los usuarios inician sesión con su correo electrónico y contraseña.
o	Reciben un token JWT para garantizar la autenticidad de las acciones dentro de la plataforma.
o	Dependiendo del rol del usuario (user o admin), se habilitan diferentes funcionalidades.
3.	Actualizar Perfil:
o	Los usuarios pueden modificar su nombre, dirección, correo electrónico, número de teléfono y otros datos personales.
o	Los cambios se reflejan en tiempo real en la base de datos.
4.	Gestión de Planes:
o	Permite ver los planes disponibles: Free, Pro, y Elite, junto con sus características y precios.
o	Los usuarios pueden realizar un upgrade de su plan mediante un formulario de pago seguro integrado con PayPal.
5.	Planes Disponibles:
o	Free (Por defecto):
	Acceso a servicios básicos de neurorehabilitación.
	Sin costo.
o	Pro ($50 USD):
	Incluye consultas adicionales y asesorías personalizadas.
o	Elite ($90 USD):
	Ofrece visitas domiciliarias y asistencia remota todos los días de la semana.

Administradores
1.	Administrar Planes:
o	Realiza un CRUD completo sobre los planes:
	Crear, leer, actualizar y eliminar planes.
	Modificar precios, nombres y características.
2.	Gestión de Usuarios:
o	Permite visualizar todos los usuarios registrados, con detalles de su perfil y plan asignado.
________________________________________
APIs Documentadas (Swagger)
Auth
•	POST /api/auth/register: Registrar un nuevo usuario.
•	POST /api/auth/login: Iniciar sesión y generar un token JWT.
Users
•	GET /api/users/profile: Obtener datos del perfil del usuario.
•	PUT /api/users/profile: Actualizar los datos del perfil.
•	PUT /api/users/plan: Actualizar el plan del usuario previo pago.
Plans
•	GET /api/plans: Obtener todos los planes disponibles.
•	POST /api/plans: Crear un nuevo plan (admin).
•	PUT /api/plans/{id}: Actualizar un plan existente (admin).
•	DELETE /api/plans/{id}: Eliminar un plan existente (admin).
________________________________________
Tecnologías Utilizadas
Backend
•	Node.js y Express.js para la lógica del servidor.
•	MongoDB Atlas para almacenamiento de datos.
•	JWT para autenticación y autorización.
•	Swagger para documentar las APIs.
Frontend
•	React y Vite para una interfaz moderna y rápida.
•	Bootstrap para diseño responsivo y limpio.
Integración de Pagos
•	PayPal como pasarela de pago segura.
________________________________________
Instalación
1.	Clona este repositorio:

Copiar código
git clone https://github.com/usuario/RehabilitaNET.git
2.	Instala las dependencias necesarias:
o	Backend:


cd backend
npm install
o	Frontend:


cd frontend
npm install
3.	Configura las variables de entorno en un archivo .env en la carpeta del backend:
env

MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
4.	Inicia los servidores:
o	Backend:


cd backend
npm start
o	Frontend:


cd frontend
npm run dev
5.	Accede a la aplicación en tu navegador:
o	Frontend: http://localhost:5173
o	Swagger (Backend): http://localhost:5000/api-docs
________________________________________
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

