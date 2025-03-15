const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/verificarPin', authController.verificarPin); // Añadir esta línea para la verificación del PIN
router.post('/verificarAuth', authController.verificarAuth); // Añadir esta línea para la verificación del PIN
router.post('/login', authController.login);
router.post('/register', authController.register); // Agregar esta línea para el registro de usuarios



module.exports = router;
