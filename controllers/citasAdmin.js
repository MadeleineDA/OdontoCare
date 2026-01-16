const citasAdminRouter = require('express').Router();
const path = require("path"); 
const { userExtractor } = require("../middleware/auth"); 
const { requireAdmin } = require("../middleware/rol");
const Cita = require("../models/cita");
const User = require("../models/user");


// ============================================================
//  1. OBTENER CITAS POR DOCTOR (solo admin)
// ============================================================
citasAdminRouter.get("/citas/:doctor", userExtractor, requireAdmin, async (req, res) => {
  try {
    const doctor = req.params.doctor;
    const citas = await Cita.find({ doctor }).sort({ dia: 1, hora: 1 });
    res.json(citas);

  } catch (error) {
    console.error("Error obteniendo citas:", error);
    res.status(500).json({ error: "Error obteniendo citas" });
  }
});


// ============================================================
//  2. OBTENER DETALLES COMPLETOS DE UNA CITA (solo admin)
// ============================================================
citasAdminRouter.get("/cita/:id", userExtractor, requireAdmin, async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    res.json(cita);

  } catch (error) {
    console.error("Error obteniendo cita:", error);
    res.status(500).json({ error: "Error obteniendo cita" });
  }
});


// ============================================================
//  3. ACTUALIZAR ESTADO DE PAGO O ESTADO DE CITA (solo admin)
// ============================================================
citasAdminRouter.put("/citas/:id", userExtractor, requireAdmin, async (req, res) => {
  try {
    const { estadoPago, estadoCita } = req.body;

    const cita = await Cita.findById(req.params.id);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    if (estadoPago) cita.estadoPago = estadoPago;
    if (estadoCita) cita.estadoCita = estadoCita;

    await cita.save();

    res.json({ message: "Estado actualizado correctamente" });

  } catch (error) {
    console.error("Error actualizando estado:", error);
    res.status(500).json({ error: "Error actualizando estado" });
  }
});


// ============================================================
//  4. ELIMINAR CITA (solo admin)
// ============================================================
citasAdminRouter.delete("/citas/:id", userExtractor, requireAdmin, async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    res.json({ message: "Cita eliminada correctamente" });

  } catch (error) {
    console.error("Error eliminando cita:", error);
    res.status(500).json({ error: "Error eliminando cita" });
  }
});


// ============================================================
//  5. BUSCAR CITAS POR CÉDULA (solo admin)
// ============================================================
citasAdminRouter.get("/buscar/:cedula", userExtractor, requireAdmin, async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const citas = await Cita.find({ cedula }).sort({ dia: -1 });
    res.json(citas);

  } catch (error) {
    console.error("Error buscando citas:", error);
    res.status(500).json({ error: "Error buscando citas" });
  }
});


// ============================================================
//  6. CREAR CITA MANUALMENTE (solo admin)
// ============================================================
citasAdminRouter.post("/citas", userExtractor, requireAdmin, async (req, res) => {
  try {
    const datos = req.body;

    // 1. Verificar si el paciente ya existe por cédula
    let usuario = await User.findOne({ cedula: datos.cedula });

    // 2. Si no existe, crearlo automáticamente
    if (!usuario) {
      usuario = new User({
        name: datos.nombreCompleto,
        email: `${datos.cedula}@autogenerado.com`,
        passwordHash: "admin-created",
        verified: true,

        nombreCompleto: datos.nombreCompleto,
        direccion: datos.direccion,
        telefono: datos.telefono,
        fechaNacimiento: datos.fechaNacimiento,
        primeraVisita: datos.primeraVisita,
        cedula: datos.cedula
      });

      await usuario.save();
    }

    // 3. Crear la cita
    const nuevaCita = new Cita({
      userId: usuario._id,
      doctor: datos.doctor,
      servicio: datos.servicio,
      razon: datos.razon,
      dia: datos.dia,
      hora: datos.hora,
      metodoPago: datos.metodoPago,
      comentario: datos.comentario,

      nombreCompleto: datos.nombreCompleto,
      direccion: datos.direccion,
      telefono: datos.telefono,
      fechaNacimiento: datos.fechaNacimiento,
      primeraVisita: datos.primeraVisita,
      cedula: datos.cedula
    });

    await nuevaCita.save();

    res.status(201).json({ message: "Cita creada correctamente" });

  } catch (error) {
    console.error("Error creando cita:", error);
    res.status(500).json({ error: "Error creando cita" });
  }
});


module.exports = citasAdminRouter;
