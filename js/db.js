/**
 * Módulo de Persistencia y Base de Datos (Firebase Firestore)
 * Desarrollado para el ecosistema de software de VIBRAS POSITIVAS HM
 */

// REEMPLAZA ESTA CONFIGURACIÓN CON LOS DATOS DE TU PROYECTO EN LA CONSOLA DE FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase de manera segura
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const DbModulo = {
  /**
   * Guarda de forma persistente la factura en la nube
   * @param {Object} datosFactura - Contiene cliente y total
   * @param {Object} datosGeo - Contiene latitud, longitud y la url de Google Maps
   */
  guardarFactura: async (datosFactura, datosGeo) => {
    try {
      const nuevaFactura = {
        cliente: datosFactura.cliente,
        total: Number(datosFactura.total),
        fechaRegistro: firebase.firestore.FieldValue.serverTimestamp(), // Marca de tiempo del servidor
        geolocalizacion: {
          latitud: datosGeo.latitud,
          longitud: datosGeo.longitud,
          urlMaps: datosGeo.urlMaps
        },
        softwareCreditos: "Hecha por VIBRAS POSITIVAS HM"
      };

      // Guardar en la colección 'facturas' de Firestore
      const docRef = await db.collection('facturas').add(nuevaFactura);
      console.log("Factura guardada con ID de éxito:", docRef.id);
      return docRef.id;

    } catch (error) {
      console.error("Error crítico en base de datos al guardar la factura:", error);
      throw new Error("No se pudo almacenar la información en la nube de forma persistente.");
    }
  }
};
