const CACHE_NAME = 'vedic-cal-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installs cache workspace structures
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Cache intercept strategy for off-line booting stability
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

// Periodic Sync engine or custom timeline background execution listeners
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'checkNotifications') {
    const savedNotes = event.data.notes;
    const now = new Date();
    
    // Explicit background execution match framing 10:00 AM window
    if (now.getHours() === 10 && now.getMinutes() === 0) {
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      
      if (savedNotes && savedNotes[todayStr]) {
        self.registration.showNotification('Vedic Calendar Reminder', {
          body: `10:00 AM Alert: ${savedNotes[todayStr]}`,
          badge: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff7e5f"><circle cx="12" cy="12" r="10"/></svg>'
        });
      }
    }
  }
});
