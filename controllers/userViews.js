//Ruta que solo pueden ver los usuarios logueados 
const path = require('path');
const userViewsrouter = require('express').Router();
const { userExtractor } = require('../middleware/auth');

userViewsrouter.get('/bienvenido', userExtractor, (req, res) => {
    res.sendFile(path.resolve('views/user/bienvenido/index.html'));
});

module.exports = userViewsrouter;