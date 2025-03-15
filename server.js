const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos
let playlists = [
    { id: 1, nombre: 'Playlist 1', videos: [] },
    { id: 2, nombre: 'Playlist 2', videos: [] }
];

// Ruta para obtener playlists
app.get('/playlists', (req, res) => {
    res.json(playlists.map(playlist => ({
        id: playlist.id,
        nombre: playlist.nombre,
        videos: playlist.videos
    })));

});

// Ruta para obtener videos de una playlist
app.get('/playlists/:id/videos', (req, res) => {
    const playlist = playlists.find(p => p.id == req.params.id);
    if (playlist) {
        res.json(playlist.videos);
    } else {
        res.status(404).send('Playlist no encontrada');
    }
});

// Ruta para agregar un video a una playlist
app.post('/playlists/:id/videos', (req, res) => {
    const playlist = playlists.find(p => p.id == req.params.id);
    if (playlist) {
        const { nombre, url, descripcion } = req.body;
        const newVideo = { id: playlist.videos.length + 1, nombre, url, descripcion };
        playlist.videos.push(newVideo);
        res.status(201).json(newVideo);
    } else {
        res.status(404).send('Playlist no encontrada');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
