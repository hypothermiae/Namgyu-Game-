const cacheName = "namgyu-cache-v1";
const filesToCache = [
  "/", 
  "/index.html",
  "/style.css",
  "/script.js",

  // Background
  "/backround.png",

  // Namlings
  "/namling1.png", "/namling2.png", "/namling3.png", "/namling4.png",
  "/namling5.png", "/namling6.png", "/namling7.png", "/namling8.png",
  "/namling9.png", "/namling10.png", "/namling11.png", "/namling12.png",
  "/namling13.png", "/namling14.png", "/namling15.png", "/namling16.png",
  "/namling17.png", "/namling18.png", "/namling19.png",

  // Eggs
  "/egg1.png", "/egg2.png", "/egg3.png", "/egg4.png",

  // UI Icons
  "/nambook.png",
  "/shop-icon.png",
  "/piggybank.png",
  "/namtoy.png",
  "/settings-icon.png",

  // Sounds
  "/cute-namgyu-tune.mp3.mp3",
  "/scream1.mp3.mp3", "/scream2.mp3.mp3",
  "/scream3.mp3.mp3", "/scream4.mp3.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
