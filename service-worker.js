// service-worker.js

const cacheName = "tjt-v1";
const offline_page = "offline.html";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                return cache.add(offline_page);
            })
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            // .then((response) => {
            //     // cache content, need adjust the logic
            //     return caches
            //         .open(cacheName)
            //         .then((cache) => {
            //             console.log(`Cache Process - ${event.request}`);
            //             cache.put(event.request, response.clone());
            //             return response;
            //         })
            // })
            .catch(() => {
                return caches.match(offline_page);
            })
    )
})