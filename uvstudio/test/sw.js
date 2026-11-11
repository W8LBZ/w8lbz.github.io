// UV Studio+ moved. Replaces the old offline copy's service worker: deletes that copy and stops serving it,
// so an installed app's next visit loads the "moved" page from the network instead of the old app.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  const prefix = `uvstudio-plus ${self.registration.scope} `;
  for (const name of await caches.keys()) if (name.startsWith(prefix)) await caches.delete(name);
  await self.registration.unregister();
  for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
})()));
