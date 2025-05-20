const express = require('express');
const router = express.Router();
const recetasController = require('../controllers/recetasController');

// Rutas para recetas
router.get('/', recetasController.getRecetas);
router.get('/:id', recetasController.getRecetaById);
router.post('/', recetasController.createReceta);
router.put('/:id', recetasController.updateReceta);
router.delete('/:id', recetasController.deleteReceta);

module.exports = router; 