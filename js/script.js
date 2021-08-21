const formulario = document.querySelector('.formulario-anotador');
const textarea = document.querySelector('#texto-nota');
const agregar = document.querySelector('#agregar');
const conteiner = document.querySelector('.conteiner-anotador-mensaje');

const notas = document.querySelector('#notas');

let notasActuales = [];

EventListeners();

function EventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        iniciarweb();
        notasActuales = JSON.parse(localStorage.getItem('nota')) || [];
        agregarNotasDom();
    });
    textarea.addEventListener('blur', validarFormulario);
    agregar.addEventListener('click', agregarNota);
}

function validarFormulario(e) {

    if (e.target.value.length === 0) {
        mostrarError("Debe ingresar al menos una letra");
        agregar.disabled = true;
    } else {
        sacarError();
        agregar.disabled = false;
    }

}

function iniciarweb() {
    agregar.disabled = true;
}



function mostrarError(mensaje) {
    let texto = document.createElement('p');
    texto.classList.add('mensaje');
    texto.textContent = mensaje;

    const verificar = document.querySelectorAll('.mensaje');

    if (verificar.length === 0) conteiner.appendChild(texto);
}

function sacarError() {
    const verificar = document.querySelectorAll('.mensaje');
    if (verificar.length === 1) conteiner.removeChild(conteiner.children[1]);
}

function agregarNota(e) {
    e.preventDefault();

    const mensaje = textarea.value;

    const nuevaNota = {
        id: Date.now(),
        mensaje
    }

    notasActuales = [...notasActuales, nuevaNota];

    //Creación del li con sus componentes
    let lista = document.createElement('li');
    lista.classList.add('nota');

    let texto = document.createElement('p');
    texto.textContent = mensaje;

    let boton = document.createElement('button');
    boton.classList.add('nota-boton');

    boton.onclick = e => {
        borrarNota(e, nuevaNota.id);
    }

    let cruz = document.createElement('i');
    cruz.classList.add('fas', 'fa-times', 'nota-equis');

    boton.appendChild(cruz);
    lista.appendChild(texto);
    lista.appendChild(boton);

    notas.appendChild(lista);

    localStorage.setItem('nota', JSON.stringify(notasActuales));

}

function agregarNotasDom() {
    notasActuales.forEach(nota => {

        let lista = document.createElement('li');
        lista.classList.add('nota');

        let texto = document.createElement('p');
        texto.textContent = nota.mensaje;

        let boton = document.createElement('button');
        boton.classList.add('nota-boton');


        boton.onclick = e => {
            borrarNota(e, nota.id);
        }

        let cruz = document.createElement('i');
        cruz.classList.add('fas', 'fa-times', 'nota-equis');

        boton.appendChild(cruz);
        lista.appendChild(texto);
        lista.appendChild(boton);

        notas.appendChild(lista);
    })

}

function borrarNota(e, id) {
    //Nos traemos todas las notas que no contengan el ID de la nota borrada
    notasActuales = notasActuales.filter(nota => nota.id !== id);
    //Nos traemos "e" para eliminar desde el padre, al li seleccionado
    e.path[3].removeChild(e.path[2]);
    //Borramos todas las notas de localstorage 
    localStorage.removeItem('nota');
    //Actualizamos todas las notas del localStorage
    localStorage.setItem('nota', JSON.stringify(notasActuales));
}