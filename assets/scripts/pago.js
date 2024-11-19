window.addEventListener('DOMContentLoaded', function(){
    var logo = document.getElementById('logo-tarjeta');
    logo.src = 'logopng.png';

});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener y mostrar el resumen del carrito almacenado en localStorage
    var resumenCarrito = JSON.parse(localStorage.getItem('resumenCarrito')) || [];
    var resumenDiv = document.getElementById('resumen-carrito');
    var totalCompra = document.getElementById('total-compra');
    console.log(resumenCarrito);
    
    function actualizarResumen() {
        resumenDiv.innerHTML = ''; // Limpiar el contenido actual
        var total = 0;
    
        resumenCarrito.forEach((item) => {
            // Crear contenedor del ítem
            var itemDiv = document.createElement('div');
            itemDiv.classList.add('item-carrito');
            itemDiv.style.display = 'flex'; // Usar flexbox para alinear los elementos
            itemDiv.style.justifyContent = 'space-between'; // Asegurar que las partes queden separadas
            itemDiv.style.alignItems = 'center'; // Centrar verticalmente
        
            // Crear y añadir el nombre del producto
            var nombreProducto = document.createElement('div');
            nombreProducto.textContent = item.titulo;
            nombreProducto.style.flex = '3'; // Asigna un ancho proporcional
            nombreProducto.classList.add('nombre-producto');
        
            var cantidadProducto = document.createElement('div');
            cantidadProducto.textContent = `Cant: ${item.cantidad}`;
            cantidadProducto.style.flex = '1'; 
            cantidadProducto.style.textAlign = 'center'; 
            cantidadProducto.classList.add('cantidad-producto');
        
            // Crear y añadir el precio
            var precioProducto = document.createElement('div');
            precioProducto.textContent = `S/. ${(parseFloat(item.precio.slice(3)) * item.cantidad).toFixed(2)}`;
            precioProducto.style.flex = '1'; // Asigna un ancho proporcional menor
            precioProducto.style.textAlign = 'right'; // Alinea el precio a la derecha
            precioProducto.classList.add('precio-producto');
        
            // Añadir los elementos al contenedor del ítem
            itemDiv.appendChild(nombreProducto);
            itemDiv.appendChild(cantidadProducto);
            itemDiv.appendChild(precioProducto);
        
            // Añadir el ítem al resumen
            resumenDiv.appendChild(itemDiv);

            

            // Calcular el total acumulado
            total += parseFloat(item.precio.slice(3)) * item.cantidad;
        });


        // Mostrar el total
        totalCompra.textContent = `Total: S/ ${total.toFixed(2)}`;
        totalCompra.style.textAlign = 'right';
    }


    



    // Mostrar el resumen de compra al cargar la página
    actualizarResumen();


    // Detectar tipo de tarjeta y mostrar logo
    var numeroTarjetaInput = document.getElementById('numero-tarjeta');
    var logo = document.getElementById('logo-tarjeta');
    
    // Inicializar el logo sin imagen
    logo.src = '';
    logo.style.display = 'none'; // Ocultar el logo inicialmente
    
    numeroTarjetaInput.addEventListener('input', function() {
        var numeroTarjeta = this.value;
    
        // Mostrar el logo solo si hay un número ingresado
        if (numeroTarjeta.length > 0) {
            logo.style.display = 'block';
    
            if (/^4/.test(numeroTarjeta)) {
                logo.src = 'assets/images/visa.png'; // Ruta de imagen de Visa
            } else if (/^5[1-5]/.test(numeroTarjeta)) {
                logo.src = 'assets/images/mastercard.png'; // Ruta de imagen de MasterCard
            } else if (/^3[47]/.test(numeroTarjeta)) {
                logo.src = 'assets/images/amex.png'; // Ruta de imagen de American Express
            } else if (/^3(?:0[0-5]|[68])/.test(numeroTarjeta)) {
                logo.src = 'assets/images/diners_club.png'; // Ruta de imagen de Diners Club
            } else {
                logo.src = ''; // Vaciar el logo si no coincide con ningún patrón
                logo.style.display = 'none'; // Ocultar el logo
            }
        } else {
            // Si el campo está vacío, ocultar el logo
            logo.src = '';
            logo.style.display = 'none';
        }
    });



    // Deshabilitar campo de tarjeta si se elige "Efectivo"
    var metodoPagoSelect = document.getElementById('metodo-pago');
    metodoPagoSelect.addEventListener('change', function() {
        if (metodoPagoSelect.value === 'efectivo') {
            numeroTarjetaInput.disabled = true;
            numeroTarjetaInput.value = ''; // Limpiar el campo si se elige "Efectivo"
            logo.src = ''; // Quitar logo de tarjeta
        } else {
            numeroTarjetaInput.disabled = false;
        }
    });

    // Procesar el formulario y redirigir a la página de confirmación
    var formulario = document.getElementById('formulario-pago');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        var nombre = document.getElementById('nombre').value;
        localStorage.setItem('usuarioRegistrado', nombre);

        alert("Gracias por su compra, " + nombre);
        window.location.href = "index.html"; 
    });
});