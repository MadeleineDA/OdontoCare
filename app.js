 require('dotenv').config();
const express = require('express'); 
const app = express();
const mongoose = require('mongoose'); //mongoose para mongodb
const path = require('path'); //path para rutas de archivos
const cors = require('cors'); //cors para permitir solicitudes entre dominios
const cookieParser = require('cookie-parser'); //cookie-parser para manejar cookies
const morgan = require('morgan'); //morgan para logs de solicitudes
const usersRouter = require('./controllers/users'); //importar el router de usuarios
const mongodb = require('mongodb'); //mongodb para la base de datos
const { userExtractor } = require('./middleware/auth'); //importar el middleware de autenticación
const { MONGO_URI } = require('./config');

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);  
        console.log('Conectado a MongoDB');     
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }    
})();

// Middleware para parsear el cuerpo de la solicitud
app.use(cors());  // Habilitar CORS para todas las rutas
app.use(express.json());  // Asegura que Express pueda leer JSON
app.use(cookieParser());  // Asegura que las cookies se procesen correctamente


//Rutas Frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views','signup')));
app.use('/login', express.static(path.resolve('views','login')));
app.use('/imag', express.static(path.resolve('imag')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/styles', express.static(path.resolve('views','styles')));


//Rutas backend
app.use('/api/users', usersRouter)

module.exports = app;