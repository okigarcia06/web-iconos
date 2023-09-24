document.addEventListener('DOMContentLoaded', () => {
    // Código para validar el formulario
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Código para marcar la sección activa en el menú
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

    // Código para el envío de formularios
    const $enviarBtn = document.querySelector('#boton-enviar');
    $enviarBtn.addEventListener('click', enviarFormulario);

    // Función para enviar el formulario con una solicitud Fetch simulada
    function enviarFormulario(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const nroContacto = document.querySelector('#nroContacto').value;
    const mensaje = document.querySelector('#mensaje').value;

    // Verificar si los campos están completos
    if (!nombre || !email || !nroContacto || !mensaje) {
        mostrarAlertaError('Por favor, complete todos los campos antes de enviar el formulario.');
        return;
    }

    // Verificar si el campo de correo electrónico y número de contacto tienen un formato válido
    const esValido = validarEmailYContacto(email, nroContacto);
    if (!esValido) {
        mostrarAlertaError('Por favor, ingrese un correo electrónico y número de contacto válidos.');
        return;
    }

    // Simulación de una respuesta (puede ser cualquier valor)
    const respuestaSimulada = { mensaje: 'Formulario enviado con éxito' };

    // Simular un retardo para emular una solicitud asíncrona
    setTimeout(() => {
        mostrarAlertaExito(respuestaSimulada.mensaje);
        // Se limpian los datos del formulario una vez enviado.
        document.querySelector('#nombre').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#nroContacto').value = '';
        document.querySelector('#mensaje').value = '';
    }, 1000); // Simular un retardo de 1 segundo
    }

    // Función para mostrar una alerta de error con SweetAlert
    function mostrarAlertaError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje
        });
    }

    // Función para mostrar una alerta de éxito con SweetAlert
    function mostrarAlertaExito(mensaje) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje
        });
    }

    // Función para validar el formato de correo electrónico y número de contacto
    function validarEmailYContacto(email, nroContacto) {
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const expresionContacto = /^[0-9\-+()\s]+$/; // Permite números, -, +, (), y espacios
        
        const esEmailValido = expresionEmail.test(email);
        // Falta verificar la validez del número de contacto y retornar el resultado
        const esContactoValido = expresionContacto.test(nroContacto);
        
        // Retorna true solo si tanto el correo como el número de contacto son válidos
        return esEmailValido && esContactoValido;
    }
    });
