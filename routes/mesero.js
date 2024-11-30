const express = require('express')
const router = express.Router()
const meseroController = require('../controllers/meseroController')

router.post('/create', meseroController.crearMesero);
router.post('/login', meseroController.obtenerMesero);
router.get('/listar', meseroController.listarMeseros);
router.put('/actualizar/:email', meseroController.actualizarMesero);
router.delete('/eliminar/:email', meseroController.eliminarMesero);


module.exports = router