const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    playlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Video', videoSchema);