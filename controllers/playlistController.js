const Playlist = require('../models/playlistModel');
const jwt = require('jsonwebtoken');

exports.obtenerPlaylists = async (req, res) => {
    try {
        const authToken = req.headers['authorization'];
        if (!authToken) {
            return res.status(401).json({ error: 'Token de autorización no proporcionado' });
        }

        const decodedToken = jwt.verify(authToken.split(' ')[1], '12345');
        const userId = decodedToken.userId;

        const playlists = await Playlist.find({ userId: userId }).populate('perfilesAsociados', 'nombreCompleto');
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las playlists' });
    }
};

exports.agregarPlaylist = async (req, res) => {
    try {
        const authToken = req.headers['authorization'];
        if (!authToken) {
            return res.status(401).json({ error: 'Token de autorización no proporcionado' });
        }

        const decodedToken = jwt.verify(authToken.split(' ')[1], '12345');
        const userId = decodedToken.userId;

        const { nombre, perfilesAsociados } = req.body;
        const playlist = new Playlist({ nombre, perfilesAsociados, userId, totalVideos: 0 });
        await playlist.save();
        res.status(201).json({ mensaje: 'Playlist agregada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.editarPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, perfilesAsociados } = req.body;
        const playlistActualizada = await Playlist.findByIdAndUpdate(id, { nombre, perfilesAsociados }, { new: true });
        if (!playlistActualizada) {
            return res.status(404).json({ error: 'Playlist no encontrada' });
        }
        res.json({ mensaje: 'Playlist actualizada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const playlistEliminada = await Playlist.findByIdAndDelete(id);
        if (!playlistEliminada) {
            return res.status(404).json({ error: 'Playlist no encontrada' });
        }
        res.json({ mensaje: 'Playlist eliminada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};