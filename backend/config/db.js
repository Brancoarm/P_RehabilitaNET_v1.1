const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error(`Error al conectar MongoDB: ${error.message}`);
    process.exit(1); // Termina el proceso si hay un error en la conexión
  }
};

module.exports = connectDB;
