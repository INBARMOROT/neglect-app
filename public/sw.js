
// simple service worker for offline support
self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  if (
    event.request.method === "GET" &&
    event.request.url.startsWith(self.location.origin)
  ) {
    event.respondWith(
      caches.open("side-sight-cache").then(cache =>
        cache.match(event.request).then(response =>
          response ||
          fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        )
      )
    );
  }
});
