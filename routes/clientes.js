const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Crear un nuevo cliente
router.post('/crear', clienteController.crearCliente);

// Obtener todas los clientes
router.get('/listar', clienteController.obtenerClientes);

// Actualizar un cliente
router.put('/actualizar/:id', clienteController.actualizarCliente);

// Eliminar un cliente
router.delete('/eliminar/:id', clienteController.eliminarCliente);

module.exports = router;