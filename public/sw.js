// Service Worker with security fingerprints
const APP_FINGERPRINTS = {
  md5: "F7:E7:49:6E:D8:A6:FF:BD:97:58:E8:12:14:E9:A7:39",
  sha1: "B1:BE:E9:E1:4C:9A:96:B3:71:8B:DB:C6:98:78:87:81:D0:10:ED:43",
  sha256: "83:0C:AD:2A:F9:C5:7B:E0:8B:08:46:C7:40:20:4C:59:89:56:42:CC:2E:CC:7B:3B:FD:5A:1A:3C:E7:0F:BD:2A"
};

const CACHE_NAME = 'neglect-app-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/app-icon.png',
  '/src/main.tsx',
  OFFLINE_URL
];

// Install event - cache basic files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' &&
       event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
