const juegos = [
  { nombre: "GTA V", precio: 60 },
  { nombre: "Call Of Duty", precio: 0 },
  { nombre: "Minecraft", precio: 30 },
  { nombre: "Fortnite", precio: 0 },
  { nombre: "Assassin's Creed", precio: 70 }
];  
  
let carrito = [];
let total = 0;
  
function mostrarCatalogo() {
  let mensaje = "🎮 Catálogo:\n";
  juegos.forEach((juego, i) => {
    mensaje += `${i + 1}. ${juego.nombre} - $${juego.precio}\n`;
  });
  alert(mensaje);
}
  
function agregarJuego() {
  mostrarCatalogo();
  let num = parseInt(prompt("Número del juego a agregar:"));
  if (num >= 1 && num <= juegos.length) {
    let juego = juegos[num - 1];
    carrito.push(juego);
    total += juego.precio;
    alert(`✅ "${juego.nombre}" agregado.`);
    verCarrito();
  } else {
      alert("❌ Número inválido.");
  }
}
  
function verCarrito() {
  if (carrito.length === 0) {
    alert("🛒 Carrito vacío.");
    return;
  }
  
  let mensaje = "🛍️ Tu carrito:\n";
  carrito.forEach((juego, i) => {
     mensaje += `${i + 1}. ${juego.nombre} - $${juego.precio}\n`;
  });
  mensaje += `\n💰 Total: $${total}`;
  alert(mensaje);
}
  
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("No hay nada en el carrito.");
    return;
  }
  
  let descuento = total >= 100 ? 10 : 0;
  let totalFinal = total;
  if (descuento) totalFinal *= 0.9;
  
  let resumen = "✅ Compra final:\n";
  carrito.forEach(juego => {
    resumen += `- ${juego.nombre} - $${juego.precio}\n`;
  });
    resumen += `\nDescuento: ${descuento}%\nTotal: $${totalFinal.toFixed(2)}`;
    alert(resumen);
  }
  
function iniciar() {
  alert("🎮 Bienvenido a la tienda");
  
  let salir = false;
  while (!salir) {
  let opcion = prompt("Elige una opción:\n1. Ver catálogo\n2. Agregar juego\n3. Ver carrito\n4. Finalizar compra\n5. Salir");
  
    switch (opcion) {
      case "1": mostrarCatalogo(); break;
      case "2": agregarJuego(); break;
      case "3": verCarrito(); break;
      case "4": finalizarCompra(); break;
      case "5":
        alert("¡Gracias por tu visita!");
        salir = true;
        break;
      default:
        alert("Opción inválida.");
      }
    }
  }
  
  iniciar();
  