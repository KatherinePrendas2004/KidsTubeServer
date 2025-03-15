const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.get('/', playlistController.obtenerPlaylists);
router.post('/', playlistController.agregarPlaylist);
router.put('/:id', playlistController.editarPlaylist);
router.delete('/:id', playlistController.eliminarPlaylist);

module.exports = router;