// FotoPuente PWA: solo cachea recursos locales estáticos, nunca datos de usuarios ni Supabase.
const CACHE='fotopuente-shell-v1';
const SHELL=['./','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).catch(()=>caches.match('./')));
  return;
 }
 if(!['/FOTO-puente/icon-192.png','/FOTO-puente/icon-512.png','/FOTO-puente/manifest.webmanifest'].includes(new URL(req.url).pathname))return;
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});
