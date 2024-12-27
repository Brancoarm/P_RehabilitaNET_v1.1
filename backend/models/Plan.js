const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del plan es obligatorio'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción del plan es obligatoria'],
  },
  price: {
    type: Number,
    required: [true, 'El precio del plan es obligatorio'],
  },
  benefits: {
    type: [String],
    required: [true, 'Los beneficios del plan son obligatorios'],
  },
});

module.exports = mongoose.model('Plan', planSchema);
