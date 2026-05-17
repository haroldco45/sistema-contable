/**
 * Módulo de Geolocalización y Conectividad con WhatsApp
 * Desarrollado para el ecosistema de software de Vibras Positivas HM
 */

const GeoModulo = {
  // Obtiene las coordenadas actuales de alta precisión
  obtenerUbicacion: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('La geolocalización no es compatible con este dispositivo.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const googleMapsUrl = `https://maps.google.com/?q=${lat},${lon}`;
          
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
              reject('La ubicación no está disponible.');
              break;
            case error.TIMEOUT:
              reject('Se agotó el tiempo de espera.');
              break;
            default:
              reject('Error desconocido en GPS.');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  // Genera el formato de texto comercial y abre WhatsApp
  enviarPorWhatsApp: (telefonoDestino, datosFactura, datosGeo) => {
    let mensaje = `*📄 NUEVA FACTURA GENERADA*\n\n`;
    mensaje += `*Cliente:* ${datosFactura.cliente}\n`;
    mensaje += `*Total:* $${Number(datosFactura.total).toLocaleString('es-CO')}\n\n`;
    mensaje += `*📍 Ubicación del Registro:*\n${datosGeo.urlMaps}\n\n`;
    mensaje += `_Hecha por Vibras Positivas HM_`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefonoDestino}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
  }
};
