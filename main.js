function Juego(id, nombre, precio, imagen) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.imagen = imagen
}

const listaJuegos = [
    new Juego(1, 'GTA V', 60, 'img/710425570360.webp'),
    new Juego(2, 'Minecraft', 30, 'img/w=800,h=800,fit=pad.webp'),
    new Juego(3, 'Fortnite', 0, 'img/eba818f4-972b-4e59-a05b-2a5619a25978.369ee4453c18af1d05961d910b6ebcd1.webp'),
    new Juego(4, 'Call of Duty', 70, 'img/juego-call-of-duty-modern-warfare-iii-ps4-47875104723.webp'),
    new Juego(5, 'FIFA 23', 55, 'img/Fifa-ps4-1.webp'),
    new Juego(6, 'The Witcher 3', 40, 'img/videojuego-the-witcher-3-wild-hunt-playstation-4.webp'),
    new Juego(7, 'Cyberpunk 2077', 50, 'img/Cyberpunk-2077.webp'),
    new Juego(8, 'Red Dead Redemption 2', 60, 'img/1528501793-red-dead-redemption-2-ps4-cover.png'),
    new Juego(9, 'Among Us', 5, 'img/71qMQTNLH7L._AC_UF1000,1000_QL80_.jpg'),
    new Juego(10, 'Rocket League', 0, 'img/D_NQ_NP_882131-MLA45733841082_042021-O.webp')
]

let carrito = []
let total = 0

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
    localStorage.setItem('total', total.toString())
    actualizarContador()
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito')
    const totalGuardado = localStorage.getItem('total')
    
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado)
        total = parseFloat(totalGuardado) || 0
        actualizarContador()
    }
}

function limpiarStorage() {
    localStorage.removeItem('carrito')
    localStorage.removeItem('total')
}

function filtrarJuegos() {
    const busqueda = document.getElementById('buscador').value.toLowerCase()
    const filtro = document.getElementById('filtroPrecio').value
    
    let juegosFiltrados = listaJuegos.filter(juego => 
        juego.nombre.toLowerCase().includes(busqueda))
    
    switch(filtro) {
        case 'menor-mayor':
            juegosFiltrados.sort((a, b) => a.precio - b.precio)
            break
        case 'mayor-menor':
            juegosFiltrados.sort((a, b) => b.precio - a.precio)
            break
        case 'gratis':
            juegosFiltrados = juegosFiltrados.filter(juego => juego.precio === 0)
            break
    }
    
    mostrarJuegosFiltrados(juegosFiltrados)
}

function mostrarJuegosFiltrados(juegos) {
    const contenedorJuegos = document.getElementById('juegos')
    contenedorJuegos.innerHTML = ''

    juegos.forEach(juego => {
        const tarjetaJuego = `
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.nombre}</h5>
                        <p class="card-text">$${juego.precio}</p>
                        <button class="btn btn-primary agregar" data-id="${juego.id}">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        `
        contenedorJuegos.innerHTML += tarjetaJuego
    })

    document.querySelectorAll('.agregar').forEach(boton => {
        boton.addEventListener('click', evento => {
            const idJuego = parseInt(evento.target.dataset.id)
            agregarAlCarrito(idJuego)
        })
    })
}

function agregarAlCarrito(id) {
    const juegoSeleccionado = listaJuegos.find(juego => juego.id === id)
    if (!juegoSeleccionado) return

    carrito.push(juegoSeleccionado)
    total += juegoSeleccionado.precio
    guardarCarrito()
    actualizarCarrito()
    alert(`Agregaste ${juegoSeleccionado.nombre}`)
}

function actualizarCarrito() {
    actualizarContador()
    document.getElementById('total').textContent = total

    const contenedorItems = document.getElementById('items')
    contenedorItems.innerHTML = ''

    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p class="text-center">Carrito vacío</p>'
    } else {
        carrito.forEach(juego => {
            contenedorItems.innerHTML += `
                <div class="d-flex justify-content-between mb-2">
                    <span>${juego.nombre}</span>
                    <span>$${juego.precio}</span>
                </div>
            `
        })
    }
}

function actualizarContador() {
    document.getElementById('contador').textContent = carrito.length
}

function realizarCompra() {
    if (carrito.length === 0) {
        alert('Carrito vacío')
        return
    }
    
    alert(`Gracias por tu compra! Total: $${total}`)
    carrito = []
    total = 0
    limpiarStorage()
    actualizarCarrito()
    mostrarSeccion('catalogo')
}

function mostrarSeccion(seccion) {
    if (seccion === 'catalogo') {
        document.getElementById('catalogo').classList.remove('d-none')
        document.getElementById('carrito').classList.add('d-none')
    } else {
        document.getElementById('catalogo').classList.add('d-none')
        document.getElementById('carrito').classList.remove('d-none')
    }
}

document.getElementById('verCatalogo').addEventListener('click', () => mostrarSeccion('catalogo'))
document.getElementById('verCarrito').addEventListener('click', () => mostrarSeccion('carrito'))
document.getElementById('comprar').addEventListener('click', realizarCompra)
document.getElementById('buscador').addEventListener('input', filtrarJuegos)
document.getElementById('filtroPrecio').addEventListener('change', filtrarJuegos)

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito()
    filtrarJuegos()
})