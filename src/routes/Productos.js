
const express = require('express');

const router = express.Router();

const { obtenerProductos, crearActualizarProducto, eliminarProducto, Q1,Q2,Q3} = require('../controllers/Productos');

//* Rutas

router.get('/', obtenerProductos);
router.post('/crearActualizarProducto', crearActualizarProducto)
router.post('/eliminarProducto', eliminarProducto);
router.post('/Q1', Q1);
router.post('/Q2', Q2);
router.post('/Q3', Q3);

module.exports = router;