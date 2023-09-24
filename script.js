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

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
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
