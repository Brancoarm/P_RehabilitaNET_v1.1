const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const connectDB = require('./config/db');
require('dotenv').config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Documentación de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Manejador de errores
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);


module.exports = app;
