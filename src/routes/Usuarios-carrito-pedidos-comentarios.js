
const express = require('express');

const router = express.Router();

const { obtenerUCPC, crearActualizar, eliminarUsuario} = require('../controllers/Usuarios-carritos-pedidos-comentarios');

router.get('/', obtenerUCPC);
router.post('/crearActualizarUCPC', crearActualizar)
router.post('/eliminarUCPC', eliminarUsuario)


module.exports = router;