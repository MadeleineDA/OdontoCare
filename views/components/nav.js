const navbar = document.querySelector("#main-navbar");

const createNavHome = () => {
  navbar.innerHTML = `<div class="flex gap-3 items-center ml-4">
    <img src="../imag/logoNav.png" class="w-10 md:w-10" alt="logo">
    <span class="sm:text-md md:text-xl lg:text-2xl font-bold text-black">OdontoCare</span>
  </div>

  <!-- ICONO HAMBURGUESA VERSION MOVIL -->
  <svg id="menu-boton"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="currentColor"
       class="w-9 h-9 md:hidden text-stone-700 cursor-pointer hover:bg-sky-200 mr-4 rounded-lg p-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

  <!-- NAVBAR ESCRITORIO -->
  <nav id="menu-desktop" class="hidden md:flex  bg-sky-200 shadow-lg rounded-full px-6 py-3 md:px-4 lg:px-20  xl:space-x-16 items-center gap-6 lg:gap-7 text-gray-950 font-medium md:text-xs lg:text-sm xl:text-md">
    <a href="/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">HOME</a>
    <a href="/servicios/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">SERVICIOS</a>
    <a href="/citas/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">AGENDA TU CITA</a>
    <a href="/contactanos/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">CONTACTANOS</a>
    <a href="/login/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">INICIAR SESIÓN</a>
  </nav>

  <!-- MENU MOVIL -->
  <div id="menu-movil" class="bg-slate-900/30 backdrop-blur-lg fixed top-16 right-0 left-0 bottom-0  flex-col gap-16 p-6 justify-center sm:text-sm items-center hidden">
  <a href="/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">HOME</a>
  <a href="/servicios/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">SERVICIOS</a>
  <a href="/citas/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">AGENDA TU CITA</a>
  <a href="/contactanos/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CONTACTANOS</a>
  <a href="/login/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">INICIAR SESIÓN</a>
  <a href="/signup/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CREAR CUENTA</a>
  </div>
`;
};

const createNavSignunp = () => {
  navbar.innerHTML = `<div class="flex gap-3 items-center ml-4">
    <img src="../imag/logoNav.png" class="w-10 md:w-10" alt="logo">
    <span class="sm:text-md md:text-xl lg:text-2xl font-bold text-black">OdontoCare</span>
  </div>

  <!-- ICONO HAMBURGUESA VERSION MOVIL -->
  <svg id="menu-boton"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="currentColor"
       class="w-9 h-9 md:hidden text-stone-700 cursor-pointer hover:bg-sky-200 mr-4 rounded-lg p-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

  <!-- NAVBAR ESCRITORIO -->
  <nav id="menu-desktop" class="hidden md:flex  bg-sky-200 shadow-lg rounded-full px-6 py-3 md:px-4 lg:px-20  xl:space-x-16 items-center gap-6 lg:gap-7 text-gray-950 font-medium md:text-xs lg:text-sm xl:text-md">
    <a href="/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">HOME</a>
    <a href="/servicios/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">SERVICIOS</a>
    <a href="/citas/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">AGENDA TU CITA</a>
    <a href="/contactanos/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">CONTACTANOS</a>
    <a href="/login/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">INICIAR SESIÓN</a>
  </nav>

  <!-- MENU MOVIL -->
  <div id="menu-movil" class="bg-slate-900/30 backdrop-blur-lg fixed top-16 right-0 left-0 bottom-0  flex-col gap-16 p-6 justify-center sm:text-sm items-center hidden">
  <a href="/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">HOME</a>
  <a href="/servicios/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">SERVICIOS</a>
  <a href="/citas/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">AGENDA TU CITA</a>
  <a href="/contactanos/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CONTACTANOS</a>
  <a href="/login/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">INICIAR SESIÓN</a>
  <a href="/signup/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CREAR CUENTA</a>
  </div>
`;
};

const createNavLogin = () => {
  navbar.innerHTML = `<div class="flex gap-3 items-center ml-4">
    <img src="../imag/logoNav.png" class="w-10 md:w-10" alt="logo">
    <span class="sm:text-md md:text-xl lg:text-2xl font-bold text-black">OdontoCare</span>
  </div>

  <!-- ICONO HAMBURGUESA VERSION MOVIL -->
  <svg id="menu-boton"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="currentColor"
       class="w-9 h-9 md:hidden text-stone-700 cursor-pointer hover:bg-sky-200 mr-4 rounded-lg p-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

  <!-- NAVBAR ESCRITORIO -->
  <nav id="menu-desktop" class="hidden md:flex  bg-sky-200 shadow-lg rounded-full px-6 py-3 md:px-4 lg:px-20  xl:space-x-16 items-center gap-6 lg:gap-7 text-gray-950 font-medium md:text-xs lg:text-sm xl:text-md">
    <a href="/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">HOME</a>
    <a href="/servicios/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">SERVICIOS</a>
    <a href="/citas/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">AGENDA TU CITA</a>
    <a href="/contactanos/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">CONTACTANOS</a>
    <a href="/login/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">INICIAR SESIÓN</a>
  </nav>

  <!-- MENU MOVIL -->
  <div id="menu-movil" class="bg-slate-900/30 backdrop-blur-lg fixed top-16 right-0 left-0 bottom-0  flex-col gap-16 p-6 justify-center sm:text-sm items-center hidden">
  <a href="/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">HOME</a>
  <a href="/servicios/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">SERVICIOS</a>
  <a href="/citas/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">AGENDA TU CITA</a>
  <a href="/contactanos/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CONTACTANOS</a>
  <a href="/login/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">INICIAR SESIÓN</a>
  <a href="/signup/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CREAR CUENTA</a>
</div>
`;
};

const createNavContactanos = () => {
  navbar.innerHTML = `<div class="flex gap-3 items-center ml-4">
    <img src="../imag/logoNav.png" class="w-10 md:w-10" alt="logo">
    <span class="sm:text-md md:text-xl lg:text-2xl font-bold text-black">OdontoCare</span>
  </div>

  <!-- ICONO HAMBURGUESA VERSION MOVIL -->
  <svg id="menu-boton"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="currentColor"
       class="w-9 h-9 md:hidden text-stone-700 cursor-pointer hover:bg-sky-200 mr-4 rounded-lg p-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

  <!-- NAVBAR ESCRITORIO -->
  <nav id="menu-desktop" class="hidden md:flex  bg-sky-200 shadow-lg rounded-full px-6 py-3 md:px-4 lg:px-20  xl:space-x-16 items-center gap-6 lg:gap-7 text-gray-950 font-medium md:text-xs lg:text-sm xl:text-md">
    <a href="/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">HOME</a>
    <a href="/servicios/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">SERVICIOS</a>
    <a href="/citas/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">AGENDA TU CITA</a>
    <a href="/contactanos/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">CONTACTANOS</a>
    <a href="/login/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">INICIAR SESIÓN</a>
  </nav>

  <!-- MENU MOVIL -->
  <div id="menu-movil" class="bg-slate-900/30 backdrop-blur-lg fixed top-16 right-0 left-0 bottom-0  flex-col gap-16 p-6 justify-center sm:text-sm items-center hidden">
  <a href="/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">HOME</a>
  <a href="/servicios/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">SERVICIOS</a>
  <a href="/citas/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">AGENDA TU CITA</a>
  <a href="/contactanos/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CONTACTANOS</a>
  <a href="/login/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">INICIAR SESIÓN</a>
  <a href="/signup/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CREAR CUENTA</a>
</div>
`;
};

const createNavServicios = () => {
  navbar.innerHTML = `<div class="flex gap-3 items-center ml-4">
    <img src="../imag/logoNav.png" class="w-10 md:w-10" alt="logo">
    <span class="sm:text-md md:text-xl lg:text-2xl font-bold text-black">OdontoCare</span>
  </div>

  <!-- ICONO HAMBURGUESA VERSION MOVIL -->
  <svg id="menu-boton"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="currentColor"
       class="w-9 h-9 md:hidden text-stone-700 cursor-pointer hover:bg-sky-200 mr-4 rounded-lg p-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

  <!-- NAVBAR ESCRITORIO -->
  <nav id="menu-desktop" class="hidden md:flex  bg-sky-200 shadow-lg rounded-full px-6 py-3 md:px-4 lg:px-20  xl:space-x-16 items-center gap-6 lg:gap-7 text-gray-950 font-medium md:text-xs lg:text-sm xl:text-md">
    <a href="/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">HOME</a>
    <a href="/servicios/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">SERVICIOS</a>
    <a href="/citas/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">AGENDA TU CITA</a>
    <a href="/contactanos/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">CONTACTANOS</a>
    <a href="/login/" class="hover:text-black hover:border-b-2 hover:border-black pb-1">INICIAR SESIÓN</a>
  </nav>

  <!-- MENU MOVIL -->
  <div id="menu-movil" class="bg-slate-900/30 backdrop-blur-lg fixed top-16 right-0 left-0 bottom-0  flex-col gap-16 p-6 justify-center sm:text-sm items-center hidden">
  <a href="/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">HOME</a>
  <a href="/servicios/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">SERVICIOS</a>
  <a href="/citas/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">AGENDA TU CITA</a>
  <a href="/contactanos/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CONTACTANOS</a>
  <a href="/login/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">INICIAR SESIÓN</a>
  <a href="/signup/" class="bg-sky-400 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-full">CREAR CUENTA</a>
</div>
`;
};

// Crear el navbar correspondiente según la página actual
if(window.location.pathname === '/'){
  createNavHome();
} else if (window.location.pathname === '/signup/') {
  createNavSignunp();
} else if (window.location.pathname === '/login/') {
  createNavSignunp();
} else if (window.location.pathname === '/contactanos/') {
  createNavContactanos();
} else if (window.location.pathname === '/servicios/') {
  createNavServicios();
}

//Selectores
const menuBtn = document.querySelector("#menu-boton");
const menuMovil = document.querySelector("#menu-movil");
console.log(menuMovil);
console.log(menuBtn);


menuBtn.addEventListener("click", () => {
  if(!menuBtn.classList.contains("active")){
    menuBtn.classList.add("active");
  menuBtn.innerHTML = '  <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />';
  menuMovil.classList.remove("hidden");
  menuMovil.classList.add("flex");
  }  else{
    menuBtn.classList.remove("active");
    menuBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />';
    menuMovil.classList.add("hidden");
    menuMovil.classList.remove("flex");
  }

  });




