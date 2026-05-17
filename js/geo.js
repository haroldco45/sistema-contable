/**
 * Módulo de Geolocalización y Conectividad con WhatsApp
 * Desarrollado para el ecosistema de software de VIBRAS POSITIVAS HM
 */

const GeoModulo = {
  // Obtiene las coordenadas actuales de alta precisión desde el hardware del dispositivo
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
              reject('La ubicación satelital no está disponible.');
              break;
            case error.TIMEOUT:
              reject('Se agotó el tiempo de espera del GPS.');
              break;
            default:
              reject('Error desconocido en el hardware de ubicación.');
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

  // Genera el formato de texto comercial y redirige a la pasarela de WhatsApp
  enviarPorWhatsApp: (telefonoDestino, datosFactura, datosGeo) => {
    let mensaje = `*📄 NUEVA FACTURA GENERADA*\n\n`;
    mensaje += `*Cliente:* ${datosFactura.cliente}\n`;
    mensaje += `*Total:* $${Number(datosFactura.total).toLocaleString('es-CO')}\n\n`;
    mensaje += `*📍 Ubicación del Registro:*\n${datosGeo.urlMaps}\n\n`;
    mensaje += `_Hecha por VIBRAS POSITIVAS HM_`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefonoDestino}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
  }
};
