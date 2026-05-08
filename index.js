// Arreglo donde se guardarán las tareas
let tareas = [];

const formulario = document.getElementById('formulario-tareas');
const listaUI = document.getElementById('lista-tareas');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capturamos lo que se escribe
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    // Si el título está vacío nose hace nada
    if (titulo === "") return;

    // Creamos un objeto para la tarea
    const nuevaTarea = {
        id: Date.now().toString(), 
        titulo: titulo,
        descripcion: descripcion
    };

    // La metemos al arreglo
    tareas.push(nuevaTarea);

    renderizarTareas();
    

    formulario.reset();
});

// mostramos las tareas en la pantalla
function renderizarTareas() {
    listaUI.innerHTML = ""; // Limpiamos
    
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = "tarea-item";
        li.innerHTML = `
            <div>
                <strong>${tarea.titulo}</strong>
                <p style="margin: 0; color: #666;">${tarea.descripcion}</p>
            </div>
            <button onclick="eliminarTarea('${tarea.id}')" style="color: red; cursor: pointer; background: none; border: none;">Eliminar</button>
        `;
        listaUI.appendChild(li);
    });
}

// Función para borrar tareas
window.eliminarTarea = function(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
}