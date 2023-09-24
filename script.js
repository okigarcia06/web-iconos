// Validar form de contacto
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
})();

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

//ENVIO DE FORM

// Se agrega un evento de clic al botón de envío del formulario
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

//CARRITO DE COMPRAS DE PRODUCTOS

//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        
        // Mostrar un mensaje de confirmación con SweetAlert
        Swal.fire({
            title: '¿Está seguro que desea eliminar este producto?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                buyThings.forEach(value => {
                    if (value.id == deleteId) {
                        let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                        totalCard =  totalCard - priceReduce;
                        totalCard = totalCard.toFixed(2);
                    }
                });
                buyThings = buyThings.filter(product => product.id !== deleteId);
                
                countProduct--;

                // Actualizar la interfaz después de eliminar el producto
                loadHtml();
            }
        });
    }
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });

    // Reinicia el contador de productos y el precio total
    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

function clearHtml(){
    containerBuyCart.innerHTML = '';
}

//SE AGREGA LIBRERÍA SWEET ALERT.

//Función para que al clickear el botón comprar muestre el mensaje de sweet alert.
comprarBtn.addEventListener('click', () => {
    if (buyThings.length === 0) {
        // Si el carrito está vacío, muestra un mensaje de error con SweetAlert.
        Swal.fire({
            icon: 'error',
            title: '¡Carrito vacío!',
            text: 'No puede realizar una compra sin productos en el carrito.',
        });
    } else {
        // Si el carrito no está vacío, muestra un mensaje de éxito con SweetAlert.
        Swal.fire({
            icon: 'success',
            title: '¡Compra exitosa!',
            text: 'Su compra ha sido realizada con éxito.',
        
        //Si la compra fue éxitosa, se limpia el carrito.
        }).then((result) => {
            if (result.isConfirmed) {
                buyThings = [];
                totalCard = 0;
                countProduct = 0;
                loadHtml();
            }
        });
    }
});
