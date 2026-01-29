const CACHE_NAME = 'dinopedia-v1';

// App Shell (Code & Styles)
const APP_SHELL = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Roboto+Mono:wght@400;500&display=swap'
];

// Dinosaur Images from constants.ts
const DINO_IMAGES = [
  'https://picsum.photos/seed/trex/800/600',
  'https://picsum.photos/seed/spinosaurus/800/600',
  'https://picsum.photos/seed/baryonyx/800/600',
  'https://picsum.photos/seed/pachy/800/600',
  'https://picsum.photos/seed/homalo/800/600',
  'https://picsum.photos/seed/stegoceras/800/600',
  'https://picsum.photos/seed/triceratops/800/600',
  'https://picsum.photos/seed/styraco/800/600',
  'https://picsum.photos/seed/ankylosaurus/800/600',
  'https://picsum.photos/seed/iguanodon/800/600',
  'https://picsum.photos/seed/velociraptor/800/600',
  'https://picsum.photos/seed/brachiosaurus/800/600',
  'https://picsum.photos/seed/diplodocus/800/600',
  'https://picsum.photos/seed/giga/800/600',
  'https://picsum.photos/seed/stegosaurus/800/600',
  'https://picsum.photos/seed/mutta/800/600',
  'https://picsum.photos/seed/parasaura/800/600',
  'https://picsum.photos/seed/corytho/800/600',
  'https://picsum.photos/seed/galli/800/600',
  'https://picsum.photos/seed/giganto/800/600',
  'https://picsum.photos/seed/minmi/800/600',
  'https://picsum.photos/seed/mosasaurus/800/600',
  'https://picsum.photos/seed/plesio/800/600',
  'https://picsum.photos/seed/pteranodon/800/600',
  'https://picsum.photos/seed/quetzal/800/600',
  'https://picsum.photos/seed/argentino/800/600',
  'https://picsum.photos/seed/titanosaurus/800/600',
  'https://picsum.photos/seed/suchomimus/800/600',
  'https://picsum.photos/seed/allosaurus/800/600',
  'https://picsum.photos/seed/megalosaurus/800/600',
  'https://picsum.photos/seed/rajasaurus/800/600',
  'https://picsum.photos/seed/elasmosaurus/800/600',
  'https://picsum.photos/seed/pliosaurus/800/600',
  'https://picsum.photos/seed/liopleurodon/800/600',
  'https://picsum.photos/seed/kronosaurus/800/600',
  'https://picsum.photos/seed/tylosaurus/800/600',
  'https://picsum.photos/seed/ichthyosaurus/800/600',
  'https://picsum.photos/seed/thalatto/800/600',
  'https://picsum.photos/seed/sarcosuchus/800/600',
  'https://picsum.photos/seed/aerodactyl/800/600',
  'https://picsum.photos/seed/arctico/800/600',
  'https://picsum.photos/seed/barbari/800/600',
  'https://picsum.photos/seed/apatosaurus/800/600',
  'https://picsum.photos/seed/supersaurus/800/600',
  'https://picsum.photos/seed/camarasaurus/800/600',
  'https://picsum.photos/seed/pentaceratops/800/600',
  'https://picsum.photos/seed/monoclonius/800/600',
  'https://picsum.photos/seed/logo/50/50'
];

const URLS_TO_CACHE = [...APP_SHELL, ...DINO_IMAGES];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache, downloading assets...');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});