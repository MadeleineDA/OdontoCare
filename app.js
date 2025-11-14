require('dotenv').config();
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path');

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);  
        console.log('Conectado a MongoDB');     
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }    
})();

//Rutas Frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/imag', express.static(path.resolve('imag')));
app.use('/components', express.static(path.resolve('views', 'components')));

module.exports = app;