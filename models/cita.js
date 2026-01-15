const mongoose = require('mongoose'); // dependencia para manejar MongoDB


const citaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    doctor: {
        type: String,
        required: true
    },

    servicio: {
        type: String,
        required: true
    },

    razon: {
        type: String,
        required: true
    },

    dia: {
        type: String,
        required: true
    },

    hora: {
        type: String,
        required: true
    },

    nombreCompleto: {
        type: String,
        required: true
    },

    direccion: {
        type: String,
        required: true
    },

    telefono: {
        type: String,
        required: true
    },

    metodoPago: {
        type: String,
        required: true
    },

    fechaNacimiento: {
        type: String,
        required: true
    },

    cedula: { 
        type: String, 
        required: true 
    },

    primeraVisita: {
        type: String,
        required: true
    },

    comentario: {
        type: String,
        default: ""
    },

    // ESTADOS QUE ACTUALIZA EL ODONTÓLOGO
    estadoPago: {
        type: String,
        enum: ["pendiente", "mitad cancelada", "cancelado"],
        default: "pendiente"
    },

    estadoCita: {
        type: String,
        enum: ["pendiente", "vista"],
        default: "pendiente"
    },

}, { timestamps: true });

citaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Cita = mongoose.model("Cita", citaSchema);

module.exports = Cita;
