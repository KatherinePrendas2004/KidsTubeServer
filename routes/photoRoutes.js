// routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.get('/images', photoController.getImages);

module.exports = router;
