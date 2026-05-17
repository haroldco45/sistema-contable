// Registrar el Service Worker de forma limpia
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito en:', reg.scope))
      .catch((err) => console.error('Error al registrar el Service Worker:', err));
  });
}

// Escucha del botón para procesar la geolocalización y WhatsApp
document.getElementById('btnProcesar').addEventListener('click', async () => {
  const lblEstado = document.getElementById('lblEstado');
  const cliente = document.getElementById('txtCliente').value.trim();
  const total = document.getElementById('txtTotal').value.trim();
  const telefono = document.getElementById('txtTelefono').value.trim();

  if (!cliente || !total || !telefono) {
    lblEstado.className = "text-sm text-center font-medium mt-2 text-red-500";
    lblEstado.innerText = "⚠️ Todos los campos son obligatorios.";
    return;
  }

  try {
    lblEstado.className = "text-sm text-center font-medium mt-2 text-blue-500 animate-pulse";
    lblEstado.innerText = "📍 Capturando coordenadas GPS de precisión...";
    
    // Ejecutar el módulo de geolocalización
    const ubicacion = await GeoModulo.obtenerUbicacion();
    
    lblEstado.className = "text-sm text-center font-medium mt-2 text-green-500";
    lblEstado.innerText = "🚀 Redireccionando a WhatsApp...";

    const datosFactura = { cliente, total };
    
    // Despachar la información y abrir WhatsApp
    GeoModulo.enviarPorWhatsApp(telefono, datosFactura, ubicacion);

  } catch (error) {
    lblEstado.className = "text-sm text-center font-medium mt-2 text-red-500";
    lblEstado.innerText = `❌ Error: ${error}`;
  }
});
