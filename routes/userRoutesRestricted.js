const express = require('express');
const router = express.Router();
const userController = require('../controllers/userRestrictedController');

router.get('/', userController.obtenerUsuarios);
router.post('/', userController.agregarUsuario);
router.put('/:id', userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;
