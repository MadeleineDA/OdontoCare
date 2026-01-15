require('dotenv').config(); 
const usersRouter = require('express').Router(); 
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');  
const { userExtractor } = require('../middleware/auth');

// API Key de Hunter 
const HUNTER_API_KEY = process.env.HUNTER_API_KEY;  
console.log('HUNTER_API_KEY:', HUNTER_API_KEY);

// ============================================================
// 🔥 RUTA PARA OBTENER EL PERFIL DEL USUARIO AUTENTICADO
// ============================================================
usersRouter.get('/perfil', userExtractor, (req, res) => {
    try {
        return res.json({
            nombreCompleto: req.user.nombreCompleto,
            direccion: req.user.direccion,
            telefono: req.user.telefono,
            fechaNacimiento: req.user.fechaNacimiento,
            cedula: req.user.cedula,
            primeraVisita: req.user.primeraVisita
        });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el perfil" });
    }
});

// ============================================================
// POST: Crear un nuevo usuario
// ============================================================
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return response.status(400).json({ error: 'El correo ya está en uso' });
    }

    try {
        const hunterResponse = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${HUNTER_API_KEY}`);
        if (hunterResponse.data.data.status !== 'valid') {
            return response.status(400).json({ error: 'El correo no es válido' });
        }
    } catch (error) {
        return response.status(400).json({ error: 'Hubo un problema al verificar el correo' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        name,
        email,
        passwordHash,
        verified: true
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    return response.status(201).json({ message: 'Usuario creado con éxito', token });
});

module.exports = usersRouter;
