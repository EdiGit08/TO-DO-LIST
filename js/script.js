tituloTarea = document.getElementById('tituloTarea');
descripcionTarea = document.getElementById('descripcionTarea');

document.getElementById('agregarTarea').addEventListener('click', function(e){

    if(tituloTarea.value.trim() === ''){
        alert('El titulo de la tarea no puede estar vacío.');
        document.getElementById('descripcionTarea').value = '';
        return;
    }

    document.getElementById('listaTareasPendientes').innerHTML += `
        <li>
            <div class="info-tarea">
                <strong class="tituloTarea">${tituloTarea.value}</strong>
                <br>
                <span class="descripcionTarea">${descripcionTarea.value}</span>
            </div>
            <div class="acciones-tarea">
                <input type="checkbox" class="btn-tarea-hecha">
                <button class="btn-editar">✏️</button>
                <button class="btn-eliminar">🗑️</button>
            </div>
        </li>
    `;

    guardar();
    document.getElementById('tituloTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
});

document.getElementById('listaTareasPendientes').addEventListener('change', function(e){
    if(e.target.classList.contains('btn-tarea-hecha')){
        const tareaCompletada= e.target.closest('li');
        tareaCompletada.querySelector('.btn-editar').hidden = true;
        document.getElementById('listaTareasCompletadas').appendChild(tareaCompletada);
    }
    guardar();
});

document.getElementById('listaTareasPendientes').addEventListener('click', function(e){
    if(e.target.classList.contains('btn-eliminar')){
        const tareaEliminar= e.target.closest('li');
        if(confirm('¿Estás seguro de que deseas eliminar esta tarea?')){
            tareaEliminar.remove();
        }
    } else if(e.target.classList.contains('btn-editar')){
        const tareaEditar= e.target.closest('li');
        const contenidoTarea = tareaEditar.querySelector('.tituloTarea').textContent;
        const descripcionTarea = tareaEditar.querySelector('.descripcionTarea').textContent;
        const nuevoTitulo = prompt('Edita el título de la tarea:', contenidoTarea);
        const nuevaDescripcion = prompt('Edita la descripción de la tarea:', descripcionTarea);

        if(nuevoTitulo && nuevoTitulo.trim()){
            tareaEditar.querySelector('.tituloTarea').textContent = nuevoTitulo;
            tareaEditar.querySelector('.descripcionTarea').textContent = nuevaDescripcion;
        }else{
            alert('El titulo de la tarea no puede estar vacío.');
        }
    }
    guardar();
});

document.getElementById('listaTareasCompletadas').addEventListener('click', function(e){
    if(e.target.classList.contains('btn-eliminar')){
        const tareaEliminar= e.target.closest('li');
        if(confirm('¿Estás seguro de que deseas eliminar esta tarea?')){
            tareaEliminar.remove();
        }
    }
    guardar();
});

document.getElementById('listaTareasCompletadas').addEventListener('change', function(e){
    if(e.target.classList.contains('btn-tarea-hecha')){
        const tareaPendiente= e.target.closest('li');
        tareaPendiente.querySelector('.btn-editar').hidden = false;
        document.getElementById('listaTareasPendientes').appendChild(tareaPendiente);
        e.target.checked = false;
        guardar();
    }
});

const boton = document.getElementById('btnDarkMode');
boton.addEventListener('click', function(e){
    document.documentElement.classList.toggle('dark-mode');
    if(localStorage.getItem('modoOscuro') === 'true'){
        localStorage.setItem('modoOscuro', 'false');
    } else {
        localStorage.setItem('modoOscuro', 'true');
    }
    if(document.documentElement.classList.contains('dark-mode')){
        boton.querySelector('.toggle-circle').textContent = '🌕';
    } else {
        boton.querySelector('.toggle-circle').textContent = '☀️';
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-desplegar')) {
        const boton = e.target;
        const idLista = boton.getAttribute('data-target');
        const lista = document.getElementById(idLista);

        // 1. Alternar la visibilidad de la lista
        lista.classList.toggle('ocultar');

        // 2. Cambiar el icono y rotar
        if (lista.classList.contains('ocultar')) {
            boton.textContent = '▶️'; 
            boton.classList.add('flecha-cerrada');
        } else {
            boton.textContent = '🔽';
            boton.classList.remove('flecha-cerrada');
        }
    }
});

function guardar() {
    let tareasPendientes = document.querySelectorAll('#listaTareasPendientes li');
    let tareasCompletadas = document.querySelectorAll('#listaTareasCompletadas li');

    let tareasPendientesPorGuardar = [];
    let tareasCompletadasPorGuardar = [];

    tareasPendientes.forEach(tarea => {
        let titulo = tarea.querySelector('.tituloTarea').textContent;
        let descripcion = tarea.querySelector('.descripcionTarea').textContent;
        tareasPendientesPorGuardar.push({titulo, descripcion, completada: false});
    });

    tareasCompletadas.forEach(tarea => {
        let titulo = tarea.querySelector('.tituloTarea').textContent;
        let descripcion = tarea.querySelector('.descripcionTarea').textContent;
        tareasCompletadasPorGuardar.push({titulo, descripcion, completada: true});
    });

    localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientesPorGuardar));
    localStorage.setItem('tareasCompletadas', JSON.stringify(tareasCompletadasPorGuardar));
};

function cargar() {
    let tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
    let tareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];
    
    document.getElementById('listaTareasPendientes').innerHTML = '';
    document.getElementById('listaTareasCompletadas').innerHTML = '';

    tareasPendientes.forEach(tarea => {
        document.getElementById('listaTareasPendientes').innerHTML += `
        <li>
            <div class="info-tarea">
                <strong class="tituloTarea">${tarea.titulo}</strong>
                <br>
                <span class="descripcionTarea">${tarea.descripcion}</span>
            </div>
            <div class="acciones-tarea">
                <input type="checkbox" class="btn-tarea-hecha">
                <button class="btn-editar">✏️</button>
                <button class="btn-eliminar">🗑️</button>
            </div>
        </li>
    `;
    });

    tareasCompletadas.forEach(tarea => {
        document.getElementById('listaTareasCompletadas').innerHTML += `
        <li>
            <div class="info-tarea">
                <strong class="tituloTarea">${tarea.titulo}</strong>
                <br>
                <span class="descripcionTarea">${tarea.descripcion}</span>
            </div>
            <div class="acciones-tarea">
                <input type="checkbox" class="btn-tarea-hecha" checked>
                <button class="btn-editar" hidden>✏️</button>
                <button class="btn-eliminar">🗑️</button>
            </div>
        </li>
    `;
    });

    if(localStorage.getItem('modoOscuro') === 'true'){
        boton.querySelector('.toggle-circle').textContent = '🌕';
    } else {
         boton.querySelector('.toggle-circle').textContent = '☀️';
    }
};

cargar();