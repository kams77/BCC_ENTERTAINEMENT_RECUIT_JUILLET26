/**
 * Service worker de BCC DataPrep : permet d'utiliser la plateforme hors ligne.
 *
 *  - Précache : l'application entière (page, scripts, styles, tous les onglets chargés
 *    à la demande), listée par le manifeste de build `build-manifest.json`.
 *  - Navigation : réseau d'abord (version à jour si connecté), cache sinon.
 *  - Fichiers `assets/` (nom contenant un hash) : cache d'abord.
 *  - CDN (polices, moteur SQL, moteur Python) : mis en cache à la première utilisation.
 *
 * __BUILD_ID__ est remplacé à chaque build (vite.config.ts) : un nouveau déploiement
 * installe un nouveau cache et supprime l'ancien.
 */
const BUILD_ID = '__BUILD_ID__';
const PRECACHE = `bcc-precache-${BUILD_ID}`;
const RUNTIME = 'bcc-runtime-v1';
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      const urls = new Set([
        './',
        'manifest.webmanifest',
        'icon.svg',
        'icon-192.png',
        'pyodide-worker.js',
      ]);
      try {
        const response = await fetch('build-manifest.json', { cache: 'no-cache' });
        if (response.ok) {
          const manifest = await response.json();
          for (const entry of Object.values(manifest)) {
            if (entry.file) urls.add(entry.file);
            (entry.css || []).forEach((file) => urls.add(file));
            (entry.assets || []).forEach((file) => urls.add(file));
          }
        }
      } catch {
        // pas de manifeste (ex. hébergeur qui ne le sert pas) : mise en cache à l'usage
      }
      // Un fichier introuvable ne doit pas faire échouer toute l'installation
      await Promise.all(
        [...urls].map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined)
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith('bcc-precache-') && name !== PRECACHE)
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

const isCacheable = (response) => response && (response.ok || response.type === 'opaque');

async function putRuntime(request, response) {
  if (isCacheable(response)) {
    const cache = await caches.open(RUNTIME);
    await cache.put(request, response);
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) await putRuntime(request, response.clone());
    return response;
  } catch {
    const cached = (await caches.match(request)) || (await caches.match('./'));
    if (cached) return cached;
    return new Response('Hors ligne : cette page n\'a pas encore été téléchargée.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await putRuntime(request, response.clone());
  return response;
}

async function staleWhileRevalidate(event) {
  const { request } = event;
  const cached = await caches.match(request);
  const update = fetch(request)
    .then(async (response) => {
      await putRuntime(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  if (cached) {
    event.waitUntil(update);
    return cached;
  }
  const response = await update;
  return response || Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      event.respondWith(networkFirst(request));
    } else if (url.pathname.includes('/assets/')) {
      event.respondWith(cacheFirst(request));
    } else {
      event.respondWith(staleWhileRevalidate(event));
    }
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(event));
  }
});
