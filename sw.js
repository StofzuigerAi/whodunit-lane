// Service worker for offline play. The build fills in the precache list and the version below.
const CACHE = 'whodunit-lane-282ce962e0';
const PRECACHE = ["./","assets/cast-bram-beslist.png","assets/cast-bram-staand.png","assets/cast-bram-wijzen.png","assets/cast-mina-beslist.png","assets/cast-mina-staand.png","assets/cast-mina-wijzen.png","assets/cast-rue-beslist.png","assets/cast-rue-staand.png","assets/cast-rue-wijzen.png","assets/index-BwYnhHPY.js","assets/index-G-jawZWz.css","assets/kamer-werkkamer.png","assets/vloer-hout-tile.png","assets/vloer-hout.png","assets/vloer-tegel-tile.png","assets/vloer-tegel.png","assets.json","data/cases/liar/2026-12-28.json","data/cases/liar/2026-12-29.json","data/cases/liar/2026-12-30.json","data/cases/liar/2026-12-31.json","data/cases/liar/2027-01-01.json","data/cases/liar/2027-01-02.json","data/cases/liar/2027-01-03.json","data/cases/liar/2027-01-04.json","data/cases/liar/2027-01-05.json","data/cases/liar/2027-01-06.json","data/cases/liar/2027-01-07.json","data/cases/liar/2027-01-08.json","data/cases/liar/2027-01-09.json","data/cases/liar/2027-01-10.json","data/cases/liar/index.json","data/cases/liar/sample.json","data/cases/liar-backup-20261111-starters/index.json","data/cases/liar-backup-20261111-starters/sample.json","icon.svg","index.html","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('whodunit-lane-') && k !== CACHE).map((k) => caches.delete(k))))
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
