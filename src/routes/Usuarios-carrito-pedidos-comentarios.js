
const express = require('express');

const router = express.Router();

const { obtenerUCPC, crearActualizar, 
    eliminarUsuario, Q4, Q5, Q6, Q7, Q8, Q9} = require('../controllers/Usuarios-carritos-pedidos-comentarios');

router.get('/', obtenerUCPC);
router.post('/crearActualizarUCPC', crearActualizar)
router.post('/eliminarUCPC', eliminarUsuario)
router.post('/Q4', Q4)
router.post('/Q5', Q5)
router.post('/Q6', Q6)
router.post('/Q7', Q7)
router.post('/Q8', Q8)
router.post('/Q9', Q9)


module.exports = router;