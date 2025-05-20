const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  ingredientes: [{
    nombre: String,
    cantidad: String,
    unidad: String
  }],
  instrucciones: [{
    type: String,
    required: true
  }],
  tiempoPreparacion: {
    type: Number,
    required: true
  },
  tiempoCoccion: {
    type: Number,
    required: true
  },
  porciones: {
    type: Number,
    required: true
  },
  dificultad: {
    type: String,
    enum: ['Fácil', 'Media', 'Difícil'],
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Receta', recetaSchema); 