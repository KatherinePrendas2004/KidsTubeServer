const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, password, pin, firstName, lastName, country, dateOfBirth } = req.body;
            
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return res.status(400).json({ error: 'Debes ser mayor de 18 años para registrarte.' });
        }
        
        const user = new User({ 
            username, 
            password, 
            pin, 
            firstName, 
            lastName, 
            country, 
            dateOfBirth 
        });
        
        await user.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Verifica si el usuario existe y si la contraseña coincide utilizando Mongoose
        if (!user || user.password !== password) {
            throw new Error('Credenciales inválidas');
        }

        // Genera el payload del JWT con los datos del usuario
        const payload = {
            userId: user._id,
            username: user.username,
            userPin: user.pin,
            verificar: 'false',
            // Otros datos del usuario que quieras incluir en el token
        };

        // Firma el token utilizando un secreto seguro
        const token = jwt.sign(payload, '12345', {
            expiresIn: '1d' // Define la expiración del token (por ejemplo, 1 día)
        });
        console.log(token);

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.verificarPin = async (req, res) => {
    try {
        const { token, userPin } = req.body;
        
        if (!token) {
            throw new Error('Token no proporcionado');
        }

        const decoded = jwt.verify(token, '12345'); // Usa la misma clave secreta que cuando firmaste el token.

        if (decoded.userPin === userPin) {
            res.status(200).json({ message: 'PIN correcto' });
        } else {
            throw new Error('PIN incorrecto');
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.verificarAuth = async (req, res) => {
    try {
        const { token } = req.body;
        
        const decoded = jwt.verify(token, '12345'); // Usa la misma clave secreta que cuando firmaste el token.

        if (decoded.verificar === 'false') {
            res.status(200).json({ message: 'No autorizado' });
        } else {
            throw new Error('No autorizado');
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};