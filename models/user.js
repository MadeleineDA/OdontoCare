const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    passwordHash: String,
    verified: {
        type: Boolean,
        default: false
    },

    // ROL DEL USUARIO (admin o paciente)
    rol: {
        type: String,
        default: "paciente"
    },


    // CAMPOS NUEVOS PARA EL PERFIL DEL PACIENTE
    nombreCompleto: {
        type: String,
        default: null
    },

    direccion: {
        type: String,
        default: null
    },

    telefono: {
        type: String,
        default: null
    },

    fechaNacimiento: {
        type: String,
        default: null
    },

    cedula: { 
        type: String, 
        default: null 
    },

    primeraVisita: {
        type: String,
        default: null
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
