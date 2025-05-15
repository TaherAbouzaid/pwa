const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/index.css",
  "/js/main.js",
  "manifest/manifest.json", 
  
];

self.addEventListener("install", (event) => {
    console.log("Installing Done");
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(urlsToCache)
        )
    );
});

self.addEventListener("activate", () => {
    console.log("activation done");
});

self.addEventListener("fetch", (event) => {
    console.log("send req to ", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log("file found in cache");
                return response;
            } else {
                console.log("file Not found in cache");
                return fetch(event.request);
            }
        })
    );
});
