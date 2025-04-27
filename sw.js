const cache_name = "kqz_cache_v1";
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
    e.waitUntil(
        caches.open(cache_name)
            .then(cache => cache.addAll(urlstocache))
            .catch(err => console.error("Failed to cache resources during install:", err))
    );
});

//Activate event
self.addEventListener("activate", e => {
    console.log("service worker activated");
});

//fetch  event

self.addEventListener("fetch", e => {
    e.respondWith(
        serverORcache(e.request)
    );
});

async function serverORcache(request) {
   try {
     const res = await fetch(request); // Await the fetch call
        const cache = await caches.open(cache_name); // Await the cache opening
        cache.put(request, res.clone()); // Store the response in the cache
        return res; // Return the fetched response
    } catch (err) {
    return caches.match(request); // Return the cached response if fetch fails
   }

}