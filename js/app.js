// Registrar el Service Worker de forma limpia
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito en:', reg.scope))
      .catch((err) => console.error('Error al registrar el Service Worker:', err));
  });
}

// Escucha del botón para procesar todo el flujo del ERP
document.getElementById('btnProcesar').addEventListener('click', async () => {
  const lblEstado = document.getElementById('lblEstado');
  const cliente = document.getElementById('txtCliente').value.trim();
  const total = document.getElementById('txtTotal').value.trim();
  const telefono = document.getElementById('txtTelefono').value.trim();

  // Validaciones de seguridad iniciales
  if (!cliente || !total || !telefono) {
    lblEstado.className = "text-sm text-center font-medium mt-2 text-red-500";
    lblEstado.innerText = "⚠️ Todos los campos son obligatorios.";
    return;
  }

  try {
    // PASO 1: Capturar Ubicación GPS
    lblEstado.className = "text-sm text-center font-medium mt-2 text-blue-500 animate-pulse";
    lblEstado.innerText = "📍 Capturando coordenadas GPS de precisión...";
    const ubicacion = await GeoModulo.obtenerUbicacion();
    
    // PASO 2: Guardar en Base de Datos Cloud (Firebase)
    lblEstado.className = "text-sm text-center font-medium mt-2 text-amber-500 animate-pulse";
    lblEstado.innerText = "💾 Guardando factura de forma segura en la nube...";
    const datosFactura = { cliente, total };
    await DbModulo.guardarFactura(datosFactura, ubicacion);
    
    // PASO 3: Despachar a WhatsApp
    lblEstado.className = "text-sm text-center font-medium mt-2 text-green-500";
    lblEstado.innerText = "🚀 ¡Factura guardada! Abriendo WhatsApp...";
    GeoModulo.enviarPorWhatsApp(telefono, datosFactura, ubicacion);

  } catch (error) {
    lblEstado.className = "text-sm text-center font-medium mt-2 text-red-500";
    lblEstado.innerText = `❌ Error: ${error.message || error}`;
  }
});
