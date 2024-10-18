
if (!localStorage.getItem('contadorRubro')) {
    localStorage.setItem('contadorRubro', '0');
}

if (!localStorage.getItem('contadorProducto')) {
    localStorage.setItem('contadorProducto', '0');
}

// ───────
function seleccionarRubro() {
    const rubros = JSON.parse(localStorage.getItem('rubros')) || [];
    const seleccRubro = document.getElementById('rubro');
    if (seleccRubro) {
        seleccRubro.innerHTML = '<option value="">Seleccionar un rubro</option>';
        rubros.forEach(rubro => {
            const opcion = document.createElement('option');
            opcion.value = rubro.id;
            opcion.textContent = rubro.nombre;
            seleccRubro.appendChild(opcion);
        });
    }
}

// ───────
function tablaDeProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const rubros = JSON.parse(localStorage.getItem('rubros')) || [];
    const tabla = document.getElementById('tablaProductos')?.querySelector('tbody');
    if (tabla) {
        tabla.innerHTML = ''; 
        productos.forEach(producto => {
            const rubro = rubros.find(r => r.id === producto.rubroId);
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.stock}</td>
                <td>${producto.precio}</td>
                <td>${rubro ? rubro.nombre : 'Sin rubro'}</td>
            `;
            tabla.appendChild(fila);
        });
    }
}

// ───────
document.getElementById('form-rubro')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const rubros = JSON.parse(localStorage.getItem('rubros')) || [];
    const nombreRubro = document.getElementById('nombreRubro').value;
    const alertaRubro = document.getElementById('alertaRubro');

    if (!nombreRubro) {
        alertaRubro.textContent = '¡El nombre del rubro es obligatorio!';
        return;
    }

    let contadorRubro = parseInt(localStorage.getItem('contadorRubro'));

    const nuevoRubro = {
        id: contadorRubro,
        nombre: nombreRubro
    };

    rubros.push(nuevoRubro);
    localStorage.setItem('rubros', JSON.stringify(rubros));
    localStorage.setItem('contadorRubro', (contadorRubro + 1).toString()); 

    alertaRubro.textContent = 'Se ha registrado el rubro con éxito';
    alertaRubro.style.color = 'green';

    document.getElementById('nombreRubro').value = ''; 
    seleccionarRubro();  
});

// ───────
document.getElementById('form-producto')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const nombre = document.getElementById('nombre').value;
    const stock = document.getElementById('stock').value;
    const precio = document.getElementById('precio').value;
    const rubroId = document.getElementById('rubro').value;
    const alertaProducto = document.getElementById('alertaProducto');

    if (!nombre || !stock || !precio || !rubroId) {
        alertaProducto.textContent = '¡Todos los campos son obligatorios!';
        return;
    }

    let contadorProducto = parseInt(localStorage.getItem('contadorProducto'));

    const nuevoProducto = {
        id: contadorProducto,
        nombre: nombre,
        stock: parseInt(stock),
        precio: parseFloat(precio),
        rubroId: parseInt(rubroId)
    };

    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('contadorProducto', (contadorProducto + 1).toString()); 

    alertaProducto.textContent = 'Se ha registrado el producto con éxito';
    alertaProducto.style.color = 'green';

    document.getElementById('nombre').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('rubro').value = '';

    tablaDeProductos();  
});

// ───────
window.onload = function() {
    seleccionarRubro();  
    tablaDeProductos(); 
};


