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


