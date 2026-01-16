# 🦷 OdontoCare — Plataforma Odontológica

OdontoCare es una plataforma web diseñada para optimizar la gestión de citas odontológicas. Permite a los pacientes registrarse, iniciar sesión y agendar citas con diferentes doctores. Los administradores cuentan con un panel para gestionar todas las citas: crearlas, actualizarlas, eliminarlas y consultar su estado.

---

## 📑 Tabla de Contenidos
- Descripción
- Funcionalidades
- Tecnologías usadas
- Instalación
- Uso
- Estructura del proyecto
- Rutas API
- Autenticación y seguridad
- Contribución
- Licencia

---

## 📝 Descripción
OdontoCare facilita la gestión de agendas dentales mediante una interfaz para pacientes y un panel administrativo. Los pacientes pueden ver doctores, seleccionar servicios y agendar citas; los administradores gestionan y supervisan todas las citas del sistema.

---

## ⚙️ Funcionalidades

### 👤 Usuarios (Pacientes)
- Registro e inicio de sesión.
- Exploración de doctores y servicios.
- Creación de citas (selección de doctor, servicio, fecha y hora).
- Visualización de sus citas y estado (pendiente, confirmado, atendido, cancelado).
- Visualización del estado de pago.

### 🧑‍⚕️ Administradores
- Acceso a listado completo de citas.
- Creación manual de citas para pacientes.
- Actualización de estado de atención y estado de pago.
- Eliminación de citas.
- Búsqueda de citas por número de cédula o por otros filtros.

---

## 🛠️ Tecnologías usadas

Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT para autenticación
- bcrypt.js para encriptación de contraseñas

Frontend
- HTML
- CSS (Tailwind CSS)
- JavaScript (ES6+)

---

## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/odonto-care.git
cd odonto-care
```

2. Instalar dependencias
```bash
npm install
```

3. Crear archivo `.env` en la raíz con las variables necesarias (ejemplo abajo).

4. Ejecutar en desarrollo
```bash
npm run dev
```

O para producción:
```bash
npm start
```

### Ejemplo de `.env`
```
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/odontocare?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_muy_seguro
JWT_EXPIRES_IN=7d
```

---

## ⚙️ Uso

- Registrar un usuario (paciente) y autenticar para obtener el token JWT.
- Incluir el token en el header `Authorization: Bearer <token>` en peticiones protegidas.
- Desde el panel de admin (usuario con rol `admin`) gestionar citas: listar, crear, actualizar estados, eliminar.

Ejemplo para crear una cita (usuario autenticado):
```bash
curl -X POST https://tu-dominio.com/api/appointments \
 -H "Authorization: Bearer <TOKEN>" \
 -H "Content-Type: application/json" \
 -d '{
   "doctorId": "63a...f2",
   "service": "Limpieza dental",
   "date": "2026-02-10T10:00:00.000Z",
   "patient": {
     "name": "María Pérez",
     "cedula": "0123456789",
     "phone": "+593987654321"
   }
 }'
```

---


## 🔌 Rutas API (resumen)

Autenticación
- POST /api/auth/register — Registrar usuario (body: name, email, password, cedula, role?)
- POST /api/auth/login — Iniciar sesión (body: email, password)

Doctores / Servicios (públicas)
- GET /api/doctors — Listar doctores
- GET /api/doctors/:id — Obtener detalles de un doctor

Citas (usuarios)
- POST /api/appointments — Crear cita (autenticado)
- GET /api/appointments — Obtener citas del usuario autenticado
- GET /api/appointments/:id — Detalle de una cita (propietario o admin)

Panel Admin (requiere rol admin)
- GET /api/admin/appointments — Listar todas las citas
- GET /api/admin/appointments/:id — Detalle de cita
- POST /api/admin/appointments — Crear cita a nombre de un paciente
- PATCH /api/admin/appointments/:id — Actualizar cita (estado de atención, pago u otros campos)
- DELETE /api/admin/appointments/:id — Eliminar cita
- GET /api/admin/appointments/search?cedula=0123456789 — Buscar citas por cédula

Notas:
- Todos los endpoints protegidos requieren header `Authorization: Bearer <token>`.
- Validaciones de body y manejo de errores devuelven JSON con mensajes estándar.

---

## 🔐 Autenticación y seguridad
- Las contraseñas se almacenan usando bcrypt con un salt seguro.
- Autenticación basada en JWT: cada login devuelve un token firmado con `JWT_SECRET`.
- Middlewares:
  - `authMiddleware` — verifica token y adjunta `req.user`.
  - `adminMiddleware` — verifica que `req.user.role === 'admin'`.
- Buenas prácticas recomendadas:
  - Mantener `JWT_SECRET` en entorno seguro.
  - Usar HTTPS en producción.
  - Limitar intentos de inicio de sesión y aplicar rate limiting si es necesario.
  - Validar entradas (sanitizar) para evitar inyección.

---

## 📜 Licencia
Este proyecto está bajo la licencia MIT. Consulta el fichero LICENSE para más detalles.

