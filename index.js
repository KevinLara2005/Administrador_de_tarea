let tareas = [];
let idEditando = null; // Variable para saber si estamos editando una tarea

const formulario = document.getElementById('formulario-tareas');
const listaUI = document.getElementById('lista-tareas');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    // VALIDACIÓN: El título es obligatorio y debe tener al menos 3 letras
    document.getElementById('error-titulo').innerText = "";
    if (titulo.length < 3) {
        document.getElementById('error-titulo').innerText = "El título debe tener al menos 3 caracteres.";
        return;
    }

    if (idEditando) {
        // MODO EDICIÓN: Buscamos la tarea y actualizamos sus valores
        tareas = tareas.map(t => t.id === idEditando ? { ...t, titulo, descripcion } : t);
        idEditando = null;
        document.getElementById('btn-guardar').innerText = "Agregar Tarea";
        document.getElementById('btn-cancelar').style.display = "none";
    } else {
        // MODO AGREGAR: Creamos la nueva tarea
        const nuevaTarea = {
            id: Date.now().toString(),
            titulo: titulo,
            descripcion: descripcion
        };
        tareas.push(nuevaTarea);
    }

    renderizarTareas();
    formulario.reset();
});

function renderizarTareas() {
    listaUI.innerHTML = "";
    
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = "tarea-item";
        li.innerHTML = `
            <div>
                <strong>${tarea.titulo}</strong>
                <p style="margin: 0; color: #666;">${tarea.descripcion}</p>
            </div>
            <div>
                <button onclick="prepararEdicion('${tarea.id}')" style="color: #1a73e8; cursor: pointer; background: none; border: none; margin-right: 10px;">Editar</button>
                <button onclick="eliminarTarea('${tarea.id}')" style="color: red; cursor: pointer; background: none; border: none;">Eliminar</button>
            </div>
        `;
        listaUI.appendChild(li);
    });
}

// Función para cargar los datos de la tarea en el formulario para editar
window.prepararEdicion = function(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        document.getElementById('titulo').value = tarea.titulo;
        document.getElementById('descripcion').value = tarea.descripcion;
        idEditando = id;
        document.getElementById('btn-guardar').innerText = "Guardar Cambios";
        document.getElementById('btn-cancelar').style.display = "inline-block";
    }
}

// Función para cancelar la edición
document.getElementById('btn-cancelar').addEventListener('click', () => {
    idEditando = null;
    formulario.reset();
    document.getElementById('btn-guardar').innerText = "Agregar Tarea";
    document.getElementById('btn-cancelar').style.display = "none";
});

window.eliminarTarea = function(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
}