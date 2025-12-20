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

    document.getElementById('tituloTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
});

document.getElementById('listaTareasPendientes').addEventListener('change', function(e){
    if(e.target.classList.contains('btn-tarea-hecha')){
        const tareaCompletada= e.target.closest('li');
        tareaCompletada.querySelector('.btn-editar').hidden = true;
        document.getElementById('listaTareasCompletadas').appendChild(tareaCompletada);
    }
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
});

document.getElementById('listaTareasCompletadas').addEventListener('change', function(e){
    if(e.target.classList.contains('btn-tarea-hecha')){
        const tareaPendiente= e.target.closest('li');
        tareaPendiente.querySelector('.btn-editar').hidden = false;
        document.getElementById('listaTareasPendientes').appendChild(tareaPendiente);
        e.target.checked = false;
    }
});

const boton = document.getElementById('btnDarkMode');
boton.addEventListener('click', function(e){
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
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