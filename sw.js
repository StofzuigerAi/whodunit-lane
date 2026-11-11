// Service worker for offline play. The build fills in the precache list and the version below.
const CACHE = 'whodunit-lane-aff8b65708';
const PRECACHE = ["./","assets/cast-bram-beslist.png","assets/cast-bram-staand.png","assets/cast-bram-wijzen.png","assets/cast-mina-beslist.png","assets/cast-mina-staand.png","assets/cast-mina-wijzen.png","assets/cast-rue-beslist.png","assets/cast-rue-staand.png","assets/cast-rue-wijzen.png","assets/index-CtAshn_c.js","assets/index-JeCoFAxU.css","assets/kamer-werkkamer.png","assets/vloer-hout-tile.png","assets/vloer-hout.png","assets/vloer-tegel-tile.png","assets/vloer-tegel.png","assets.json","data/cases/liar/2026-12-28.json","data/cases/liar/2026-12-29.json","data/cases/liar/2026-12-30.json","data/cases/liar/2026-12-31.json","data/cases/liar/2027-01-01.json","data/cases/liar/2027-01-02.json","data/cases/liar/2027-01-03.json","data/cases/liar/2027-01-04.json","data/cases/liar/2027-01-05.json","data/cases/liar/2027-01-06.json","data/cases/liar/2027-01-07.json","data/cases/liar/2027-01-08.json","data/cases/liar/2027-01-09.json","data/cases/liar/2027-01-10.json","data/cases/liar/index.json","data/cases/liar/sample.json","data/cases/liar-backup-20261111-starters/index.json","data/cases/liar-backup-20261111-starters/sample.json","icon.svg","index.html","manifest.webmanifest","models/city/bench.bin","models/city/bench.gltf","models/city/citybits_texture.png","models/furn/armchair_pillows.bin","models/furn/armchair_pillows.gltf","models/furn/bed_single_A.bin","models/furn/bed_single_A.gltf","models/furn/bed_single_B.bin","models/furn/bed_single_B.gltf","models/furn/book_set.bin","models/furn/book_set.gltf","models/furn/cabinet_medium.bin","models/furn/cabinet_medium.gltf","models/furn/cabinet_medium_decorated.bin","models/furn/cabinet_medium_decorated.gltf","models/furn/cabinet_small_decorated.bin","models/furn/cabinet_small_decorated.gltf","models/furn/cactus_medium_A.bin","models/furn/cactus_medium_A.gltf","models/furn/cactus_medium_B.bin","models/furn/cactus_medium_B.gltf","models/furn/cactus_small_A.bin","models/furn/cactus_small_A.gltf","models/furn/chair_A_wood.bin","models/furn/chair_A_wood.gltf","models/furn/chair_B.bin","models/furn/chair_B.gltf","models/furn/couch_pillows.bin","models/furn/couch_pillows.gltf","models/furn/furniturebits_texture.png","models/furn/lamp_standing.bin","models/furn/lamp_standing.gltf","models/furn/pictureframe_large_A.bin","models/furn/pictureframe_large_A.gltf","models/furn/pictureframe_medium.bin","models/furn/pictureframe_medium.gltf","models/furn/rug_oval_A.bin","models/furn/rug_oval_A.gltf","models/furn/rug_rectangle_A.bin","models/furn/rug_rectangle_A.gltf","models/furn/rug_rectangle_stripes_A.bin","models/furn/rug_rectangle_stripes_A.gltf","models/furn/shelf_A_big.bin","models/furn/shelf_A_big.gltf","models/furn/shelf_B_large_decorated.bin","models/furn/shelf_B_large_decorated.gltf","models/furn/table_medium.bin","models/furn/table_medium.gltf","models/furn/table_medium_long.bin","models/furn/table_medium_long.gltf","models/furn/table_small.bin","models/furn/table_small.gltf","models/kenney/benchCushion.glb","models/kenney/cardboardBoxClosed.glb","models/kenney/desk.glb","models/kenney/statue_head.glb","models/LICENSE-kaykit.txt","models/LICENSE-kenney.txt","models/rest/chair_A.bin","models/rest/chair_A.gltf","models/rest/crate.bin","models/rest/crate.gltf","models/rest/crate_carrots.bin","models/rest/crate_carrots.gltf","models/rest/crate_potatoes.bin","models/rest/crate_potatoes.gltf","models/rest/fridge_A_decorated.bin","models/rest/fridge_A_decorated.gltf","models/rest/kitchencabinet.bin","models/rest/kitchencabinet.gltf","models/rest/kitchencounter_sink.bin","models/rest/kitchencounter_sink.gltf","models/rest/kitchencounter_straight_A_decorated.bin","models/rest/kitchencounter_straight_A_decorated.gltf","models/rest/restaurantbits_texture.png","models/rest/stove_multi_decorated.bin","models/rest/stove_multi_decorated.gltf","models/rest/table_round_A_decorated.bin","models/rest/table_round_A_decorated.gltf","models/rest/table_round_A_small_decorated.bin","models/rest/table_round_A_small_decorated.gltf"];

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
