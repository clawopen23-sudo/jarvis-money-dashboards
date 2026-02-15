const CACHE = 'jarvis-dash-v1';
const ASSETS = [
  './',
  './dashboard_index.html',
  './dashboard_crypto.html',
  './dashboard_football.html',
  './dashboard_multiasset.html',
  './dashboard_exchange.html',
  './dashboard_arb.html',
  './dashboard_backtests.html',
  './dashboard_live_ops.html',
  './manifest.webmanifest',
  './icon.svg'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));
});
