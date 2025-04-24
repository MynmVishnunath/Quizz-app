const cache_name = "cache_v1";
const urlstocache = [
    "/",
    "/chooseQuiz.html",
    "/src/styles/choose.css",
    "/src/scripts/database.js",
    "/src/scripts/choose.js",
    "/src/images/icon_L.png",
    "/src/images/icon_s.png",

];

//install event
self.addEventListener("install", e => {
    e.waitUntil(caches.open(cache_name).then(cache => {
        return cache.addAll(urlstocache);
    })
    );

});

//Activate event
self.addEventListener("activate", e => {
    console.log("service worker activated");
});

//fetch  event

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res=>{
            return res || fetch(e.request);
        })
    );
});