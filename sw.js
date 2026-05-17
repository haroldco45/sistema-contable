const CACHE_NAME = 'contable-hm-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/db.js',
  '/js/geo.js',
  '/manifest.json'
];

// Evento de Instalación
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caché configurado con éxito');
      return cache.addAll(ASSETS).catch(err => console.log('Error agregando recursos a caché:', err));
    })
  );
});

// Evento de Activación
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché antiguo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Evento Fetch
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    }).catch(() => {
      return caches.match('/index.html');
    })
  );
});
