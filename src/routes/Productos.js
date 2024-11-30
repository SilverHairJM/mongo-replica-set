
const express = require('express');

const router = express.Router();

const { obtenerProductos, crearActualizarProducto, eliminarProducto} = require('../controllers/Productos');

//* Rutas

router.get('/', obtenerProductos);
router.post('/crearActualizarProducto', crearActualizarProducto)
router.post('/eliminarProducto', eliminarProducto);

module.exports = router;