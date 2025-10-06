const CACHE_NAME = 'evidya-offline-v1';
const DYNAMIC_CACHE = 'evidya-dynamic-v1';

// Cache your existing files - NO changes to your files
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css', 
    '/app.js',
    'https://cdn.jsdelivr.net/npm/chart.js', // Keep your Chart.js
];

// Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Return cached version
                }
                
                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        const responseToCache = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
    );
});