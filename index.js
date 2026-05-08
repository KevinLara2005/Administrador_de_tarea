// Estructura inicial del proyecto
console.log("Proyecto de Administrador de Tareas cargado");

const formulario = document.getElementById('formulario-tareas');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
});