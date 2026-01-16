// VARIABLES
const tablaJuan = document.querySelector("#tabla-juan tbody");
const tablaDavid = document.querySelector("#tabla-david tbody");

const modalDetalles = document.getElementById("modal-detalles");

// Campos del modal de detalles
const detNombre = document.getElementById("det-nombre");
const detCedula = document.getElementById("det-cedula");
const detTelefono = document.getElementById("det-telefono");
const detDireccion = document.getElementById("det-direccion");
const detNacimiento = document.getElementById("det-nacimiento");
const detPrimera = document.getElementById("det-primera");

const detServicio = document.getElementById("det-servicio");
const detRazon = document.getElementById("det-razon");
const detComentario = document.getElementById("det-comentario");
const detMetodo = document.getElementById("det-metodo");
const detEstadoPago = document.getElementById("det-estadoPago");
const detEstadoCita = document.getElementById("det-estadoCita");
const detDia = document.getElementById("det-dia");
const detHora = document.getElementById("det-hora");

// ===============================
// MODAL CREAR CITA
// ===============================
const modalCrear = document.getElementById("modal-crear-cita");
const btnCrearCita = document.getElementById("btn-crear-cita");

const crearDoctor = document.getElementById("crear-doctor");
const crearServicio = document.getElementById("crear-servicio");
const crearRazon = document.getElementById("crear-razon");
const crearDia = document.getElementById("crear-dia");
const crearHora = document.getElementById("crear-hora");

const crearNombre = document.getElementById("crear-nombre");
const crearCedula = document.getElementById("crear-cedula");
const crearTelefono = document.getElementById("crear-telefono");
const crearDireccion = document.getElementById("crear-direccion");
const crearNacimiento = document.getElementById("crear-nacimiento");
const crearPrimera = document.getElementById("crear-primera");
const crearPago = document.getElementById("crear-pago");
const crearComentario = document.getElementById("crear-comentario");

const formCrearCita = document.getElementById("form-crear-cita");

// ===============================
// HORAS DISPONIBLES
// ===============================
const horasDisponibles = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM"
];

function cargarHoras() {
  crearHora.innerHTML = `<option value="" disabled selected>Selecciona una hora</option>`;
  horasDisponibles.forEach(h => {
    const op = document.createElement("option");
    op.value = h;
    op.textContent = h;
    crearHora.appendChild(op);
  });
}

// ===============================
// SERVICIOS POR DOCTOR
// ===============================
const serviciosJuan = [
  "Consulta inicial",
  "Seguimiento",
  "Endodoncia",
  "Ortodoncia",
  "Cirugía bucal",
  "Implantes dentales"
];

const serviciosDavid = [
  "Consulta inicial",
  "Seguimiento",
  "Odontología general",
  "Endodoncia",
  "Estética y prótesis dentales"
];

crearDoctor.addEventListener("change", () => {
  crearServicio.innerHTML = `<option value="" disabled selected>Selecciona un servicio</option>`;

  const lista = crearDoctor.value === "Juan Andrade" ? serviciosJuan : serviciosDavid;

  lista.forEach(s => {
    const op = document.createElement("option");
    op.value = s;
    op.textContent = s;
    crearServicio.appendChild(op);
  });
});

// ===============================
// ABRIR Y CERRAR MODAL CREAR CITA
// ===============================
btnCrearCita.addEventListener("click", () => {
  modalCrear.classList.remove("hidden");
  modalCrear.classList.add("flex");
  cargarHoras();
});

function cerrarCrearCita() {
  modalCrear.classList.add("hidden");
  modalCrear.classList.remove("flex");
  formCrearCita.reset();
}

// ===============================
// ENVIAR CITA CREADA POR EL DOCTOR
// ===============================
formCrearCita.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = {
    doctor: crearDoctor.value,
    servicio: crearServicio.value,
    razon: crearRazon.value,
    dia: crearDia.value,
    hora: crearHora.value,
    metodoPago: crearPago.value,
    comentario: crearComentario.value,

    nombreCompleto: crearNombre.value,
    cedula: crearCedula.value,
    telefono: crearTelefono.value,
    direccion: crearDireccion.value,
    fechaNacimiento: crearNacimiento.value,
    primeraVisita: crearPrimera.value
  };

  try {
    const res = await fetch("/api/admin/citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    if (!res.ok) {
      alert("Error al crear la cita");
      return;
    }

    cerrarCrearCita();
    cargarTodo();

  } catch (error) {
    console.error("Error creando cita:", error);
  }
});

// ===============================
// CARGAR CITAS POR DOCTOR
// ===============================
async function cargarCitas(doctor, tabla) {
  try {
    const res = await fetch(`/api/admin/citas/${doctor}`);
    const citas = await res.json();

    tabla.innerHTML = "";

    citas.forEach(cita => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.dia}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.hora}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.nombreCompleto}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.cedula}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.servicio}</td>
        <td class="px-4 py-3 border border-gray-300">${cita.razon}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.metodoPago}</td>

        <td class="px-4 py-3 border border-gray-300 text-center">
          <select onchange="actualizarEstado('${cita.id}', this.value, 'estadoPago')"
            class="border rounded p-1 text-sm">
            <option selected>${cita.estadoPago}</option>
            <option>pendiente</option>
            <option>mitad cancelada</option>
            <option>cancelado</option>
          </select>
        </td>

        <td class="px-4 py-3 border border-gray-300 text-center">
          <select onchange="actualizarEstado('${cita.id}', this.value, 'estadoCita')"
            class="border rounded p-1 text-sm">
            <option selected>${cita.estadoCita}</option>
            <option>pendiente</option>
            <option>vista</option>
          </select>
        </td>

        <td class="px-4 py-3 border border-gray-300 text-center">
          <div class="flex justify-center gap-2">
            <button 
              class="px-3 py-1 bg-sky-500 text-white rounded text-xs hover:bg-sky-600 transition"
              onclick="verDetalles('${cita.id}')">
              Ver
            </button>

            <button 
              class="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
              onclick="abrirModalEliminar('${cita.id}')">
              Eliminar
            </button>
          </div>
        </td>
      `;

      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error("Error cargando citas:", error);
  }
}

// ===============================
// ACTUALIZAR ESTADO
// ===============================
async function actualizarEstado(id, valor, campo) {
  try {
    await fetch(`/api/admin/citas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [campo]: valor })
    });

  } catch (error) {
    console.error("Error actualizando estado:", error);
  }
}

// ===============================
// VER DETALLES
// ===============================
async function verDetalles(id) {
  try {
    const res = await fetch(`/api/admin/cita/${id}`);
    const cita = await res.json();

    detNombre.textContent = cita.nombreCompleto;
    detCedula.textContent = cita.cedula;
    detTelefono.textContent = cita.telefono;
    detDireccion.textContent = cita.direccion;
    detNacimiento.textContent = cita.fechaNacimiento;
    detPrimera.textContent = cita.primeraVisita;

    detServicio.textContent = cita.servicio;
    detRazon.textContent = cita.razon;
    detComentario.textContent = cita.comentario || "Sin comentario";
    detMetodo.textContent = cita.metodoPago;
    detEstadoPago.textContent = cita.estadoPago;
    detEstadoCita.textContent = cita.estadoCita;
    detDia.textContent = cita.dia;
    detHora.textContent = cita.hora;

    modalDetalles.classList.remove("hidden");
    modalDetalles.classList.add("flex");

  } catch (error) {
    console.error("Error obteniendo detalles:", error);
  }
}

function cerrarDetalles() {
  modalDetalles.classList.add("hidden");
  modalDetalles.classList.remove("flex");
}

// ===============================
// MODAL BONITO PARA ELIMINAR CITA
// ===============================
let citaAEliminar = null;

function abrirModalEliminar(id) {
  citaAEliminar = id;

  const modal = document.getElementById("modal-eliminar");
  const content = document.getElementById("modal-eliminar-content");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  setTimeout(() => {
    content.classList.remove("scale-90", "opacity-0");
    content.classList.add("scale-100", "opacity-100");
  }, 10);
}

function cerrarModalEliminar() {
  const modal = document.getElementById("modal-eliminar");
  const content = document.getElementById("modal-eliminar-content");

  content.classList.add("scale-90", "opacity-0");
  content.classList.remove("scale-100", "opacity-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 200);
}

document.getElementById("btn-cancelar-eliminar").addEventListener("click", cerrarModalEliminar);

document.getElementById("btn-confirmar-eliminar").addEventListener("click", async () => {
  if (!citaAEliminar) return;

  try {
    await fetch(`/api/admin/citas/${citaAEliminar}`, { method: "DELETE" });
    cerrarModalEliminar();
    cargarTodo();
  } catch (error) {
    console.error("Error eliminando cita:", error);
  }
});

// ===============================
// BUSCAR POR CÉDULA
// ===============================
document.getElementById("btn-buscar").addEventListener("click", async () => {
  const cedula = document.getElementById("buscar-cedula").value.trim();
  const contenedor = document.getElementById("resultado-busqueda");

  if (!cedula) return;

  try {
    const res = await fetch(`/api/admin/buscar/${cedula}`);
    const citas = await res.json();

    if (citas.length === 0) {
      contenedor.innerHTML = `<p class="text-red-500">No se encontraron citas.</p>`;
      return;
    }

    contenedor.innerHTML = `
      <p class="font-semibold text-sky-600 mb-2">Resultados:</p>
      ${citas.map(c => `
        <div class="p-3 border rounded mb-2 bg-gray-50">
          <p><strong>Paciente:</strong> ${c.nombreCompleto}</p>
          <p><strong>Servicio:</strong> ${c.servicio}</p>
          <p><strong>Fecha:</strong> ${c.dia} - ${c.hora}</p>
        </div>
      `).join("")}
    `;

  } catch (error) {
    console.error("Error buscando:", error);
  }
});

// ===============================
// CARGAR TODO
// ===============================
function cargarTodo() {
  cargarCitas("Juan Andrade", tablaJuan);
  cargarCitas("David Da Silva", tablaDavid);
}

document.addEventListener("DOMContentLoaded", cargarTodo);
