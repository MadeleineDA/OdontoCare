// Selecciona los elementos del formulario por su ID en el HTML
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');

// Listener del formulario
form.addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        };

        // Enviar login al backend
        const res = await axios.post('/api/login', user);

        //  Leer el rol que envía el backend
        const rol = res.data.rol;

        //  Redirigir según el rol
        if (rol === "admin") {
            window.location.pathname = "/admin/controlCitas";
        } else {
            window.location.pathname = "/usuarios/bienvenido";
        }

    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response?.data?.error || "Error al iniciar sesión";
    }
});
