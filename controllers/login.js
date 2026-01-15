//Encabezado / importaciones
const loginRouter = require("express").Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userExtractor } = require('../middleware/auth');

//Ruta POST / (login)
loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
        return response.status(400).json({ error: 'Email o contraseña invalida'});
    }

    if (!userExist.verified) {
        return response.status(400).json({ error: 'Tu email no ha sido verificado'});
    }

    const isCorrect = await bcrypt.compare(password, userExist.passwordHash);
    
    if (!isCorrect) {
        return response.status(400).json({ error: 'Email o contraseña invalida'});
    }

    //Preparar payload para el token
    const userForToken = {
        id: userExist.id,
    };

    //Generar JWT (access token)
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });

    //Poner el token en una cookie
    response.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });

    // 🔥 ESTA ES LA PARTE IMPORTANTE
    return response.json({
        message: "Login exitoso",
        rol: userExist.rol   // <-- AQUÍ ENVIAMOS EL ROL
    });
});


// GET /api/login/check
loginRouter.get('/check', userExtractor, (req, res) => {
    if (!req.user) return res.json({ logged: false });
    res.json({ 
        logged: true,
        user: {
            name: req.user.name || req.user.email
        }
    });
});


// LOGOUT POST /api/login/logout
loginRouter.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.sendStatus(200);
});

module.exports = loginRouter;
