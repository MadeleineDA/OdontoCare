// Elementos del DOM
const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const doctorSelect = document.querySelector('#doctor');
const servicioSelect = document.querySelector('#servicio');
const pagoSelect = document.querySelector('#metodoPago'); 
const notaInput = document.querySelector('#nota');
const btnAgendar = document.querySelector("#btnAgendar");
const textError = document.querySelector("#textError");

// Número de WhatsApp del consultorio
const numeroWhatsApp = "584127232302";

// Servicios por doctor
const serviciosPorDoctor = {
  doctor1: [
    "Consulta inicial",
    "Endodoncia",
    "Ortodoncia",
    "Cirugia Bucal",
    "Implantes Dentales",
    "Seguimiento"
  ],
  doctor2: [
    "Consulta inicial",
    "Odontología general",
    "Endodoncia",
    "Estetica y prótesis dentales",
    "Seguimiento"
  ]
};

// Función para cargar los servicios al seleccionar un doctor
function actualizarServicios() {
  const doctor = doctorSelect.value;

  // Limpiar servicios
  servicioSelect.innerHTML = "";

  if (!doctor) {
    servicioSelect.innerHTML =
      `<option value="" disabled selected>Selecciona un doctor primero</option>`;
    return;
  }

  // Opción por defecto
  servicioSelect.innerHTML =
    `<option value="" disabled selected>Selecciona un servicio</option>`;

  // Agregar servicios del doctor seleccionado
  serviciosPorDoctor[doctor].forEach(servicio => {
    const option = document.createElement("option");
    option.value = servicio;
    option.textContent = servicio;
    servicioSelect.appendChild(option);
  });
}



// Función para validar campos vacíos
function camposVacios() {
  const inputs = [
    nombreInput,
    telefonoInput,
    fechaInput,
    horaInput,
    doctorSelect,
    servicioSelect,
    pagoSelect
  ];

  inputs.forEach(input => {
    if (input.value.trim() === "") {
      input.classList.add("border-red-500", "bg-red-50");
    } else {
      input.classList.remove("border-red-500", "bg-red-50");
    }
  });
}

// Quitar borde rojo al escribir en los campos
document.querySelectorAll("input, select").forEach(campo => {
  campo.addEventListener("input", () => {
    campo.classList.remove("border-red-500", "bg-red-50");
    textError.classList.add("hidden");
  });
});

// Evitar que se escriban letras en el teléfono
telefonoInput.addEventListener("input", () => {
  telefonoInput.value = telefonoInput.value.replace(/[^0-9+]/g, "");
});



// Función para enviar el mensaje por WhatsApp
function enviarWhatsApp() {

  const nombre   = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();
  const fecha    = fechaInput.value;
  const hora     = horaInput.value;
  const doctor   = doctorSelect.value;
  const servicio = servicioSelect.value;
  const metodoPago = pagoSelect.value; 
  const nota     = notaInput.value.trim();

  // Validación
  if (!nombre || !telefono || !fecha || !hora || !servicio || !doctor || !metodoPago) {
    textError.classList.remove("hidden");
    camposVacios();
    return;
  }

  // Mensaje
  let mensaje = "Hola, quiero agendar una cita:%0A";
  mensaje += `%0A• Nombre: ${encodeURIComponent(nombre)}`;
  mensaje += `%0A• Teléfono: ${encodeURIComponent(telefono)}`;
  mensaje += `%0A• Doctor: ${encodeURIComponent(doctor)}`;
  mensaje += `%0A• Servicio: ${encodeURIComponent(servicio)}`;
  mensaje += `%0A• Método de pago: ${encodeURIComponent(metodoPago)}`;
  mensaje += `%0A• Fecha: ${encodeURIComponent(fecha)}`;
  mensaje += `%0A• Hora: ${encodeURIComponent(hora)}`;

  if (nota) {
    mensaje += `%0A• Nota: ${encodeURIComponent(nota)}`;
  }

  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, "_blank");
}

// Llamadas a funciones
doctorSelect.addEventListener("change", actualizarServicios);
btnAgendar.addEventListener("click", enviarWhatsApp);
