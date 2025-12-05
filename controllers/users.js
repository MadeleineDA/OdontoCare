require('dotenv').config(); 
const usersRouter = require('express').Router(); 
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');  // Usamos Axios para hacer la solicitud a la API de Hunter


// API Key de Hunter (asegúrate de tener la clave de API configurada correctamente)
const HUNTER_API_KEY = process.env.HUNTER_API_KEY;  // Reemplaza con tu clave API real


// POST: Crear un nuevo usuario
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    console.log('Datos recibidos en el backend:', name, email, password);

    // Validación de los campos obligatorios
    if (!name || !email || !password) {
        return response.status(400).json({ error: 'Todos los campos son requeridos' });
    }


    // Verificar si el correo ya existe en la base de datos
    const userExists = await User.findOne({ email });
    if (userExists) {
        return response.status(400).json({ error: 'El correo ya está en uso' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear el nuevo usuario con 'verified' en true
    const newUser = new User({
        name,
        email,
        passwordHash,
        verified: true,  // Marcamos como verificado si el correo es válido
    });

    // Guardar el usuario
    const savedUser = await newUser.save();
    console.log('Usuario guardado:', savedUser);

    // Crear un token para el usuario
    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    console.log('Token generado:', token);

      // Validación del correo con Hunter API
    try {
        const hunterResponse = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${HUNTER_API_KEY}`);
        const hunterData = hunterResponse.data.data;
        console.log('Respuesta de Hunter:', hunterResponse.data.data);

        // Verificar el estado de la validación
        if (hunterResponse.data.data.status !== 'valid') {
            return response.status(400).json({ error: 'El correo no es válido' });
        }
        console.log('Correo verificado por Hunter:', hunterResponse.data.data.status);
    } catch (error) {
        console.error("Error al verificar el correo con Hunter:", error);
        return response.status(400).json({ error: 'Hubo un problema al verificar el correo' });
    }

    // Responder al cliente con el mensaje de éxito
    return response.status(201).json({ message: 'Usuario creado con éxito', token });
});


module.exports = usersRouter;