const path = require('path');
const citasUsuarioRouter = require('express').Router();
const { userExtractor } = require('../middleware/auth');
const Cita = require('../models/cita');

// 1. VISTA BIENVENIDO (HTML)
citasUsuarioRouter.get('/bienvenido', userExtractor, (req, res) => {
    res.sendFile(path.resolve('views/usuarios/bienvenido'));
});

// 2. GUARDAR UNA CITA (POST)
citasUsuarioRouter.post('/citas', userExtractor, async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            doctor,
            servicio,
            razon,
            dia,
            hora,
            nombreCompleto,
            direccion,
            telefono,
            metodoPago,
            fechaNacimiento,
            primeraVisita,
            comentario,
            cedula
        } = req.body;

        // Datos finales: si no vienen en el body, usar los del perfil
        const datosFinales = {
            nombreCompleto: nombreCompleto || req.user.nombreCompleto,
            direccion: direccion || req.user.direccion,
            telefono: telefono || req.user.telefono,
            fechaNacimiento: fechaNacimiento || req.user.fechaNacimiento,
            cedula: cedula || req.user.cedula,
            primeraVisita: primeraVisita || req.user.primeraVisita
        };

        // Crear nueva cita
        const nuevaCita = new Cita({
            userId,
            doctor,
            servicio,
            razon,
            dia,
            hora,
            metodoPago,
            comentario,

            // Datos personales finales
            nombreCompleto: datosFinales.nombreCompleto,
            direccion: datosFinales.direccion,
            telefono: datosFinales.telefono,
            fechaNacimiento: datosFinales.fechaNacimiento,
            cedula: datosFinales.cedula,
            primeraVisita: datosFinales.primeraVisita,
        });

        const citaGuardada = await nuevaCita.save();

        // 🔥 ACTUALIZAR PERFIL DEL USUARIO SI ESTÁ VACÍO
        if (!req.user.nombreCompleto) req.user.nombreCompleto = datosFinales.nombreCompleto;
        if (!req.user.direccion) req.user.direccion = datosFinales.direccion;
        if (!req.user.telefono) req.user.telefono = datosFinales.telefono;
        if (!req.user.fechaNacimiento) req.user.fechaNacimiento = datosFinales.fechaNacimiento;
        if (!req.user.cedula) req.user.cedula = datosFinales.cedula;
        if (!req.user.primeraVisita) req.user.primeraVisita = datosFinales.primeraVisita;

        await req.user.save();

        return res.status(201).json({
            message: "Cita creada exitosamente",
            cita: citaGuardada
        });

    } catch (error) {
        console.error("Error al crear cita:", error);
        return res.status(500).json({ error: "Error al crear la cita" });
    }
});

// 3. OBTENER CITAS DEL USUARIO
citasUsuarioRouter.get('/citas/mias', userExtractor, async (req, res) => {
    try {
        const userId = req.user.id;

        const citas = await Cita.find({ userId }).sort({ createdAt: -1 });

        return res.json(citas);

    } catch (error) {
        console.error("Error al obtener citas:", error);
        return res.status(500).json({ error: "Error al obtener las citas" });
    }
});

module.exports = citasUsuarioRouter;
