self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("namgyu-store").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/backround.png",
        "/namling1.png",
        "/cute-namgyu-tune.mp3.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
