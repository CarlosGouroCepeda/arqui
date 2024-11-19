// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperamos que todos los elementos de la página carguen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Función genérica para agregar eventos a los botones
    agregarEventosAElementos('btn-eliminar', eliminarItemCarrito);
    agregarEventosAElementos('sumar-cantidad', sumarCantidad);
    agregarEventosAElementos('restar-cantidad', restarCantidad);
    agregarEventosAElementos('boton-item', agregarAlCarritoClicked);
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Función genérica para agregar eventos
function agregarEventosAElementos(clase, funcion) {
    var botones = document.getElementsByClassName(clase);
    for (var i = 0; i < botones.length; i++) {
        var button = botones[i];
        button.addEventListener('click', funcion);
    }
}

// Eliminar item del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Sumar cantidad del item
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = ++cantidadActual;
    actualizarTotalCarrito();
}

// Restar cantidad del item
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    if (cantidadActual > 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = --cantidadActual;
        actualizarTotalCarrito();
    }
}

// Función para agregar item al carrito
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

// Mostrar el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Agregar item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    agregarEventosAElementos('restar-cantidad', restarCantidad);
    agregarEventosAElementos('sumar-cantidad', sumarCantidad);
    agregarEventosAElementos('btn-eliminar', eliminarItemCarrito);

    actualizarTotalCarrito();
}

// Actualizar el total del carrito
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('S/ ', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total += precio * cantidad;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/ ' + total.toLocaleString("es");
}

// Ocultar carrito si está vacío
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Función que maneja el proceso de pago
function pagarClicked() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    var items = [];
    for (var i = 0; i < carritoItems.children.length; i++) {
        var item = carritoItems.children[i];
        var titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
        var precio = item.getElementsByClassName('carrito-item-precio')[0].innerText;
        var cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        items.push({ titulo, precio, cantidad });
    }
    localStorage.setItem('resumenCarrito', JSON.stringify(items));
    window.location.href = "pago.html";
}
