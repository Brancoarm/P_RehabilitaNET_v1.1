const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    rut: {
      type: String,
      required: [true, 'El RUT es obligatorio'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor, ingrese un correo válido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    plan: {
      type: String,
      enum: ['Free', 'Pro', 'Elite'],
      default: 'Free',
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log(`Contraseña ingresada: ${enteredPassword}`);
    console.log(`Contraseña almacenada: ${this.password}`);
    return await bcrypt.compare(enteredPassword, this.password);
  };
    


// Encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
