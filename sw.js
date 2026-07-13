const CACHE_NAME = 'mani-lingo-v1';
const ASSETS = [
  './',
  './index.html',
  './questions.json',
  './manifest.json'
];

// Uygulama dosyalarını hafızaya alma (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Eski önbellekleri temizleme
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// İnternet yoksa hafızadaki dosyaları getirme
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});