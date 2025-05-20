const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definir el esquema de Receta
const recetaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: String,
  tiempoPreparacion: { type: Number, required: true },
  tiempoCoccion: { type: Number, required: true },
  porciones: { type: Number, required: true },
  dificultad: { type: String, required: true },
  categoria: { type: String, required: true },
  ingredientes: [{
    nombre: { type: String, required: true },
    cantidad: { type: String, required: true },
    unidad: { type: String, required: true }
  }],
  instrucciones: [{ type: String, required: true }]
});

// Crear el modelo
const Receta = mongoose.model('Receta', recetaSchema);

// Obtener todas las recetas
router.get('/', async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una receta específica
router.get('/:id', async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id);
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(receta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva receta
router.post('/', async (req, res) => {
  const receta = new Receta(req.body);
  try {
    const nuevaReceta = await receta.save();
    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una receta
router.put('/:id', async (req, res) => {
  try {
    const receta = await Receta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(receta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una receta
router.delete('/:id', async (req, res) => {
  try {
    const receta = await Receta.findByIdAndDelete(req.params.id);
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json({ message: 'Receta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 