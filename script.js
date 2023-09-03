// validar form de contacto
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
    })
})()


// Función para marcar sección Activa en Menú

const navLinksElem = document.querySelectorAll('.nav-link');
const windowsPathName = window.location.pathname;

// Comparación
navLinksElem.forEach(navLinkEl => {
    const navLinkPathName = new URL(navLinkEl.href).pathname;

    // Agregamos clase active
    if (windowsPathName === navLinkPathName || (windowsPathName === './index.html' &&  navLinkPathName === '/')) {
        navLinkEl.classList.add('active');
    }
})


// Escuchar evento submit del form

document.addEventListener('DOMContentLoaded', function() {
    const $form = document.querySelector('#form');
    const $buttonMailTo = document.querySelector('#enviarMail');

    $form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault()
        const form = new FormData(this)

        const nombre = form.get('nombre');
        const email = form.get('email');
        const mensaje = form.get('mensaje');

        if (!nombre || !email || !mensaje) {
            alert('Por favor, complete todos los campos antes de enviar el formulario.');
            return;
        }

    $buttonMailTo.setAttribute('href', `mailto:g_grafica@hotmail.com?subject=${form.get('nombre')} - ${form.get('email')}&body=${form.get('mensaje')}`)
    $buttonMailTo.click()
}
});
