// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito en el alcance:', reg.scope))
      .catch((err) => console.error('Error al registrar el Service Worker:', err));
  });
}
