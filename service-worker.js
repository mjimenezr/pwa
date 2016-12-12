/**
* service-worker MJR.12.12.2016
**/

var cacheName = 'VodafonePWA-step-6-1';
var filesToCache = [
  '/',
  './index.html',
  './scripts/app.js',
  './styles/inline.css',
  './images/clear.png',
  './images/cloudy-scattered-showers.png',
  './images/cloudy.png',
  './images/fog.png',
  './images/ic_add_white_24px.svg',
  './images/ic_refresh_white_24px.svg',
  './images/partly-cloudy.png',
  './images/rain.png',
  './images/scattered-showers.png',
  './images/sleet.png',
  './images/snow.png',
  './images/thunderstorm.png',
  './images/wind.png'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Instalación');
    e.waitUntil(
      caches.open(cacheName).then(function (cache) {
          console.log('[APP-ServiceWorker] Cacheando la app shell');
          return cache.addAll(filesToCache);
      })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activación');
    e.waitUntil(
      caches.keys().then(function (keyList) {
          return Promise.all(keyList.map(function (key) {
              if (key !== cacheName) {
                  console.log('[ServiceWorker] Elimina la cache anterior', key);
                  return caches.delete(key);
              }
          }));
      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetching ', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function (response) {
          return response || fetch(e.request);
      })
    );
});