const juegos = [
  { nombre: 'GTA V', precio: 60 },
  { nombre: 'Call Of Duty', precio: 0 },
  { nombre: 'Minecraft', precio: 30 },
  { nombre: 'Fortnite', precio: 0 },
  { nombre: 'Assassins Creed', precio: 70 }
]

let carrito = []
let total = 0

function mostrarCatalogo() {
  let mensaje = '🎮 ¡Bienvenido a la Tienda de Videojuegos!\n\n'
  juegos.forEach(function(juego, i) {
    mensaje += (i + 1) + '. ' + juego.nombre + ' - $' + juego.precio + '\n'
  })
  alert(mensaje)
}

function agregarJuego() {
  mostrarCatalogo()
  let num = parseInt(prompt('📦 ¿Qué juego te gustaría agregar al carrito? Escribe el número:'))
  if (num >= 1 && num <= juegos.length) {
    let juego = juegos[num - 1]
    carrito.push(juego)
    total += juego.precio
    alert('✅ "' + juego.nombre + 'Fue agregado al carrito!')
    verCarrito()
  } else {
    alert('❌ Ese número no corresponde intentalo de nuevo.')
  }
}

function verCarrito() {
  if (carrito.length === 0) {
    alert('🛒 Tu carrito está vacío.')
    return
  }

  let mensaje = '🛍️ Estos son los juegos que agregaste:\n'
  carrito.forEach(function(juego, i) {
    mensaje += (i + 1) + '. ' + juego.nombre + ' - $' + juego.precio + '\n'
  })
  mensaje += '\n💰 Total sin descuento: $' + total
  alert(mensaje)
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert('😅 Aún no agregaste ningún juego.')
    return
  }

  let descuento = 10
  let totalFinal = total * 0.9

  let resumen = '🎉 ¡Gracias por tu compra! Aquí está el resumen:\n'
  carrito.forEach(function(juego) {
    resumen += '- ' + juego.nombre + ' - $' + juego.precio + '\n'
  })
  resumen += '\n🎁 Descuento aplicado: ' + descuento + '%\n💳 Total a pagar: $' + totalFinal.toFixed(2) + '\n\n¡Disfruta de tus juegos! 🎮'
  alert(resumen)
}

function iniciar() {
  alert('👋 Hola Bienvenido a nuestra tienda de videojuegos')

  let salir = false
  while (!salir) {
    let opcion = prompt('¿Qué te gustaría hacer?\n\n1. Ver el catálogo\n2. Agregar un juego al carrito\n3. Ver el carrito\n4. Finalizar la compra\n5. Salir de la tienda')

    switch (opcion) {
      case '1':
        mostrarCatalogo()
        break
      case '2':
        agregarJuego()
        break
      case '3':
        verCarrito()
        break
      case '4':
        finalizarCompra()
        break
      case '5':
        alert('👋 ¡Gracias por visitarnos! Que tengas un gran día.')
        salir = true
        break
      default:
        alert('❌ Opción no válida. Por favor, escribí un número del 1 al 5.')
    }
  }
}

iniciar()
