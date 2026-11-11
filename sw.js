// Service worker for offline play. The build fills in the precache list and the version below.
const CACHE = 'culprit-club-e70eab883e';
const PRECACHE = ["./","assets/index-CVpHjhAD.css","assets/index-DEAoufji.js","assets.json","data/cases/liar/2026-12-28.json","data/cases/liar/2026-12-29.json","data/cases/liar/2026-12-30.json","data/cases/liar/2026-12-31.json","data/cases/liar/2027-01-01.json","data/cases/liar/2027-01-02.json","data/cases/liar/2027-01-03.json","data/cases/liar/2027-01-04.json","data/cases/liar/2027-01-05.json","data/cases/liar/2027-01-06.json","data/cases/liar/2027-01-07.json","data/cases/liar/2027-01-08.json","data/cases/liar/2027-01-09.json","data/cases/liar/2027-01-10.json","data/cases/liar/index.json","data/cases/liar/sample.json","icon.svg","index.html","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('culprit-club-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const FRESH = /\/(data\/cases\/|assets\.json)/;

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // daily cases and the asset map: network first so a new day shows up, cache when offline
  if (FRESH.test(url.pathname) || req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req, { ignoreVary: true }).then((hit) => hit || caches.match('index.html'))),
    );
    return;
  }
  // everything else: cache first
  event.respondWith(
    caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    })),
  );
});
