export const DIARY_STORAGE_KEY = 'begun-travel-diary-v1';
const DEMO_PHOTOS = ['/travel/mongolia.jpg', '/travel/bali.jpg', '/travel/japan.jpg'];

export function demoDiaryEntries() {
  return [
    { id: 'demo-steppe', title: 'A little closer to the horizon', location: 'Mongolia', date: '', body: 'Leave a few lines for the road: the view from the window, a small discovery, a moment worth keeping. This is a sample page, ready for your own story.', photo: DEMO_PHOTOS[0], isDemo: true },
    { id: 'demo-ocean', title: 'A page for the ocean', location: 'Bali', date: '', body: 'A photograph, a place, a feeling. The little things that make a journey stay with us. Replace this sample with a memory of your own.', photo: DEMO_PHOTOS[1], isDemo: true },
    { id: 'demo-mountain', title: 'Somewhere, slowly', location: 'Japan', date: '', body: 'Not every page needs a grand adventure. A quiet morning or an unexpected view can be enough. This page is only a layout sample, not a record of a real trip.', photo: DEMO_PHOTOS[2], isDemo: true },
  ];
}

export function validateDiaryEntries(entries) {
  if (!Array.isArray(entries) || entries.length > 100) throw new Error('Invalid diary');
  const ids = new Set();
  return entries.map(entry => {
    if (!entry || typeof entry !== 'object') throw new Error('Invalid entry');
    const { id, title, location, date, body, photo } = entry;
    for (const [value, max] of [[id, 100], [title, 100], [location, 100], [date, 10], [body, 6000], [photo, 1500000]]) {
      if (typeof value !== 'string' || value.length > max) throw new Error('Invalid entry field');
    }
    if (!id || ids.has(id) || !title.trim() || !body.trim()) throw new Error('Invalid entry identity');
    ids.add(id);
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T12:00:00Z`)) || new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) !== date)) throw new Error('Invalid diary date');
    if (photo && !DEMO_PHOTOS.includes(photo) && !/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(photo)) throw new Error('Invalid diary photo');
    return { id, title: title.trim(), location: location.trim(), date, body: body.trim(), photo, isDemo: entry.isDemo === true };
  });
}

export function readDiary(serialized) {
  if (serialized === null) return demoDiaryEntries();
  const diary = JSON.parse(serialized);
  if (diary?.version !== 1) throw new Error('Unsupported diary');
  return validateDiaryEntries(diary.entries);
}

export function serializeDiary(entries) {
  return JSON.stringify({ version: 1, entries: validateDiaryEntries(entries) });
}
