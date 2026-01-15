// MODAL DE CITA
const modal = document.getElementById("modal-cita");
const modalContent = document.getElementById("modal-cita-content");
const cerrarModal = document.getElementById("cerrar-modal");
const servicioSelect = document.getElementById("servicio");
const diaSelect = document.getElementById("dia");
const horaSelect = document.getElementById("hora");
const nombreInput = document.getElementById("nombre");
const direccionInput = document.getElementById("direccion");
const telefonoInput = document.getElementById("telefono");
const nacimientoInput = document.getElementById("nacimiento");
const cedulaInput = document.getElementById("cedula");
const primeraSelect = document.getElementById("primera");
const pagoSelect = document.getElementById("pago");
const comentarioInput = document.getElementById("comentario");
const razonInput = document.getElementById("razon");
const formCita = document.getElementById("form-cita");

// VARIABLES
let doctorSeleccionado = "";
let nombreUsuario = "";
let datosPerfil = {};


// ============================================================
// 🔥 CARGAR PERFIL DEL USUARIO PARA MOSTRAR/OCULTAR CAMPOS
// ============================================================
async function cargarPerfilUsuario() {
  try {
    const res = await fetch("/api/users/perfil");
    if (!res.ok) throw new Error("No se pudo obtener el perfil");

    const perfil = await res.json();
    datosPerfil = perfil;

    // Guardar nombre para WhatsApp
    nombreUsuario = perfil.nombreCompleto || "";

    // Mostrar u ocultar campos según si existen datos
    toggleCampo("campo-nombre", perfil.nombreCompleto);
    toggleCampo("campo-direccion", perfil.direccion);
    toggleCampo("campo-telefono", perfil.telefono);
    toggleCampo("campo-nacimiento", perfil.fechaNacimiento);
    toggleCampo("campo-cedula", perfil.cedula);
    toggleCampo("campo-primera", perfil.primeraVisita);

  } catch (error) {
    console.error("Error cargando perfil:", error);
  }
}

function toggleCampo(idCampo, valor) {
  const campo = document.getElementById(idCampo);
  if (!campo) return;

  if (valor) campo.classList.add("hidden");
  else campo.classList.remove("hidden");
}


// ============================================================
// 🔥 FUNCIÓN PARA GENERAR MENSAJE PERSONALIZADO DE WHATSAPP
// ============================================================
function generarMensajePago(nombre, metodo) {
  return `Hola, soy ${nombre}. Quiero pagar mi cita por ${metodo}. ¿Me pueden indicar el monto y los pasos para confirmar mi pago?`;
}


// ============================================================
// 🔥 FUNCIÓN PARA REDIRIGIR A WHATSAPP
// ============================================================
function redirigirPago(metodo) {
  if (!nombreUsuario) {
    mostrarToast("No se pudo obtener tu nombre del perfil", "error");
    return;
  }

  const mensaje = generarMensajePago(nombreUsuario, metodo);
  const mensajeCodificado = encodeURIComponent(mensaje);

  const numero = "04122698599";
  window.open(`https://wa.me/${numero}?text=${mensajeCodificado}`, "_blank");
}


// ============================================================
// 🔥 FUNCIÓN PARA COLOREAR ESTADOS
// ============================================================
function estadoColor(estado) {
  if (!estado) return "text-gray-500";

  switch (estado.toLowerCase()) {
    case "cancelado":
    case "mitad":
    case "mitad cancelada":
      return "text-red-500 font-bold";
    case "pendiente":
      return "text-yellow-500 font-bold";
    case "vista":
    case "visto":
      return "text-green-600 font-bold";
    default:
      return "text-gray-500";
  }
}


// ============================================================
// 🔥 CARGAR HISTORIAL EN TABLA
// ============================================================
async function cargarHistorialCitas() {
  try {
    const res = await fetch("/api/citasUsuario/citas/mias");
    if (!res.ok) throw new Error("Error al obtener citas");

    const citas = await res.json();
    const tabla = document.getElementById("tabla-citas");
    if (!tabla) return;

    tabla.innerHTML = "";

    if (citas.length > 0) nombreUsuario = citas[0].nombreCompleto;

    citas.forEach(cita => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td class="px-4 py-3 border border-gray-300">${cita.dia}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.hora}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.doctor}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.servicio}</td>
        <td class="px-4 py-3 border border-gray-300">${cita.razon}</td>
        <td class="px-4 py-3 border border-gray-300 text-center">${cita.metodoPago}</td>
        <td class="px-4 py-3 border border-gray-300 text-center ${estadoColor(cita.estadoPago)}">${cita.estadoPago || "pendiente"}</td>
        <td class="px-4 py-3 border border-gray-300 text-center ${estadoColor(cita.estadoCita)}">${cita.estadoCita || "pendiente"}</td>
      `;

      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error("Error al cargar historial:", error);
    mostrarToast("No se pudo cargar el historial de citas", "error");
  }
}

window.addEventListener("DOMContentLoaded", cargarHistorialCitas);


// ============================================================
// 🔥 TOAST
// ============================================================
function mostrarToast(mensaje, tipo = "success") {
  const toast = document.createElement("div");

  toast.textContent = mensaje;

  toast.className = `
    fixed top-5 right-5 
    px-4 py-3 rounded-lg shadow-lg 
    text-white text-sm font-semibold
    transition-all duration-500 transform
    translate-y-[-20px] opacity-0
    z-[99999]
    ${tipo === "success" ? "bg-green-500" : "bg-red-500"}
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-[-20px]", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  }, 50);

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-[-20px]", "opacity-0");
  }, 2500);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}


// ============================================================
// 🔥 HORAS DISPONIBLES
// ============================================================
const horas = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM"
];

horaSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';
horas.forEach(h => {
  const option = document.createElement("option");
  option.textContent = h;
  option.value = h;
  horaSelect.appendChild(option);
});


// ============================================================
// 🔥 SERVICIOS POR DOCTOR
// ============================================================
const serviciosDoctor1 = [
  "Consulta inicial",
  "Seguimiento",
  "Endodoncia",
  "Ortodoncia",
  "Cirugía bucal",
  "Implantes dentales"
];

const serviciosDoctor2 = [
  "Consulta inicial",
  "Seguimiento",
  "Odontología general",
  "Endodoncia",
  "Estética y prótesis dentales"
];


// ============================================================
// 🔥 ABRIR MODAL
// ============================================================
async function abrirModal(servicios) {
  await cargarPerfilUsuario();

  servicioSelect.innerHTML = '<option value="" disabled selected>Selecciona un servicio</option>';
  servicios.forEach(s => {
    const option = document.createElement("option");
    option.textContent = s;
    option.value = s;
    servicioSelect.appendChild(option);
  });

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  requestAnimationFrame(() => {
    modalContent.classList.remove("translate-y-full", "opacity-0");
    modalContent.classList.add("translate-y-0", "opacity-100");
  });
}


// ============================================================
// 🔥 CERRAR MODAL
// ============================================================
function cerrarModalConAnimacion() {
  modalContent.classList.add("translate-y-full", "opacity-0");
  modalContent.classList.remove("translate-y-0", "opacity-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

cerrarModal.addEventListener("click", cerrarModalConAnimacion);


// ============================================================
// 🔥 DETECTAR BOTONES
// ============================================================
const botones = document.querySelectorAll("button");

botones.forEach((btn, index) => {
  if (btn.textContent.trim().toLowerCase() === "pide una cita") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      doctorSeleccionado = index === 0
        ? "Juan Andrade"
        : "David Da Silva";

      if (index === 0) abrirModal(serviciosDoctor1);
      else abrirModal(serviciosDoctor2);
    });
  }
});


// ============================================================
// 🔥 VALIDACIÓN GENERAL
// ============================================================
function validarCampos() {
  let valido = true;

  const campos = [
    servicioSelect,
    diaSelect,
    horaSelect,
    pagoSelect,
    razonInput
  ];

  campos.forEach(campo => {
    if (campo.value.trim() === "") {
      campo.classList.add("border-red-500", "bg-red-50");
      valido = false;
    } else {
      campo.classList.remove("border-red-500", "bg-red-50");
    }
  });

  
  // Validar campos personales solo si están visibles
  if (!document.getElementById("campo-nombre").classList.contains("hidden")) {
    if (nombreInput.value.trim() === "") valido = false;
  }

  if (!document.getElementById("campo-direccion").classList.contains("hidden")) {
    if (direccionInput.value.trim() === "") valido = false;
  }

  if (!document.getElementById("campo-telefono").classList.contains("hidden")) {
    if (telefonoInput.value.trim() === "") valido = false;
  }

  if (!document.getElementById("campo-nacimiento").classList.contains("hidden")) {
    if (nacimientoInput.value.trim() === "") valido = false;
  }

  if (!document.getElementById("campo-cedula").classList.contains("hidden")) {
    if (cedulaInput.value.trim() === "") valido = false;
}

  if (!document.getElementById("campo-primera").classList.contains("hidden")) {
    if (primeraSelect.value.trim() === "") valido = false;
  }

  return valido;
}


// ============================================================
// 🔥 QUITAR ERROR AL ESCRIBIR
// ============================================================
document.querySelectorAll("input, select, textarea").forEach(campo => {
  campo.addEventListener("input", () => {
    campo.classList.remove("border-red-500", "bg-red-50");
  });
});


// ============================================================
// 🔥 ENVIAR FORMULARIO
// ============================================================
formCita.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validarCampos()) return;

  const datos = {
    doctor: doctorSeleccionado,
    servicio: servicioSelect.value,
    razon: razonInput.value,
    dia: diaSelect.value,
    hora: horaSelect.value,
    metodoPago: pagoSelect.value,
    comentario: comentarioInput.value,

    // Datos personales: si el campo está oculto, usar perfil
    nombreCompleto: document.getElementById("campo-nombre").classList.contains("hidden")
      ? datosPerfil.nombreCompleto
      : nombreInput.value,

    direccion: document.getElementById("campo-direccion").classList.contains("hidden")
      ? datosPerfil.direccion
      : direccionInput.value,

    telefono: document.getElementById("campo-telefono").classList.contains("hidden")
      ? datosPerfil.telefono
      : telefonoInput.value,

    fechaNacimiento: document.getElementById("campo-nacimiento").classList.contains("hidden")
      ? datosPerfil.fechaNacimiento
      : nacimientoInput.value,

    cedula: document.getElementById("campo-cedula").classList.contains("hidden")
      ? datosPerfil.cedula
      : cedulaInput.value,

    primeraVisita: document.getElementById("campo-primera").classList.contains("hidden")
      ? datosPerfil.primeraVisita
      : primeraSelect.value
  };

  try {
    const respuesta = await fetch("/api/citasUsuario/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
      mostrarToast("Hubo un error al guardar la cita", "error");
      return;
    }

    mostrarToast("Tu cita ha sido agendada correctamente");

    cerrarModalConAnimacion();
    formCita.reset();

    cargarHistorialCitas();

  } catch (error) {
    mostrarToast("Error de conexión con el servidor", "error");
  }
});
