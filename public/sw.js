// Service Worker for Oficina TEA na Sala de Aula (PWA)
const CACHE_VERSION = 'oficina-tea-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Pass-through fetch handler satisfying PWA installability requirements without stale caching
self.addEventListener('fetch', (event) => {
  // Let browser perform direct network request to avoid any stale asset hashes
  return;
});
