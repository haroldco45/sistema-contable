/**
 * Módulo de Geolocalización y Conectividad con WhatsApp
 * Desarrollado para el ecosistema de software de Vibras Positivas HM
 */

const GeoModulo = {
  // Obtiene las coordenadas actuales del dispositivo
  obtenerUbicacion: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('La geolocalización no es compatible con este dispositivo o navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
          
          resolve({
            latitud: lat,
            longitud: lon,
            urlMaps: googleMapsUrl
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject('Permiso de ubicación denegado por el usuario.');
              break;
            case error.POSITION_UNAVAILABLE:
              reject('La información de ubicación no está disponible.');
              break;
            case error.TIMEOUT:
              reject('Se agotó el tiempo de espera para obtener la ubicación.');
              break;
            default:
              reject('Ocurrió un error desconocido al obtener la ubicación.');
          }
        },
        {
          enableHighAccuracy: true, // Forzar uso de GPS de alta precisión
          timeout: 10000,           // Esperar máximo 10 segundos
          maximumAge: 0             // No usar ubicaciones guardadas en caché
        }
      );
    });
  },

  // Genera el enlace de WhatsApp con el texto de la factura y la ubicación
  enviarPorWhatsApp: (telefonoDestino, datosFactura, datosGeo) => {
    // Estructuración del mensaje con formato limpio para WhatsApp
    let mensaje = `*📄 NUEVA FACTURA GENERADA*\n`;
    mensaje += `*Cliente:* ${datosFactura.cliente}\n`;
    mensaje += `*Total:* $${datosFactura.total}\n\n`;
    mensaje += `*📍 Ubicación del Registro:*\n${datosGeo.urlMaps}\n\n`;
    mensaje += `_Hecha por Vibras Positivas HM_`;

    // Codificar el texto para que sea válido en una URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear el enlace universal de WhatsApp (funciona en PC y móviles)
    const urlWhatsApp = `https://wa.me/${telefonoDestino}?text=${mensajeCodificado}`;
    
    // Abrir en una pestaña nueva
    window.open(urlWhatsApp, '_blank');
  }
};
