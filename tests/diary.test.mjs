import test from 'node:test';
import assert from 'node:assert/strict';
import { demoDiaryEntries, readDiary, serializeDiary } from '../app/Travel/diary-data.mjs';

test('first visit gets marked samples; an intentionally empty notebook stays empty', () => {
  assert.equal(readDiary(null).length, 3);
  assert.ok(readDiary(null).every(entry => entry.isDemo));
  assert.deepEqual(readDiary(serializeDiary([])), []);
  const first = demoDiaryEntries();
  first[0].title = 'Changed';
  assert.notEqual(demoDiaryEntries()[0].title, 'Changed');
});

test('own entries and an uploaded photo round-trip without changing the user story', () => {
  const entry = { id: 'my-trip', title: '  Миний аялал  ', location: ' Тэрэлж ', date: '2026-10-20', body: 'Эхний өдөр.\n\nХоёр дахь дурсамж.', photo: 'data:image/jpeg;base64,YWJjZA==', isDemo: false };
  const result = readDiary(serializeDiary([entry]));
  assert.equal(result[0].title, 'Миний аялал');
  assert.equal(result[0].location, 'Тэрэлж');
  assert.equal(result[0].body, entry.body);
  assert.equal(result[0].photo, entry.photo);
  assert.equal(result[0].date, entry.date);
  assert.equal(result[0].isDemo, false);
});

test('corrupt or incompatible saved data is rejected instead of silently resetting it', () => {
  for (const data of ['{broken', '{}', '{"version":2,"entries":[]}', '{"version":1,"entries":null}']) assert.throws(() => readDiary(data));
  const entry = demoDiaryEntries()[0];
  assert.throws(() => serializeDiary([entry, entry]));
});

test('invalid dates and unsupported photo payloads cannot enter the notebook', () => {
  const entry = demoDiaryEntries()[0];
  for (const date of ['2026-02-30', '2026-13-01', 'yesterday']) assert.throws(() => serializeDiary([{ ...entry, date }]));
  for (const photo of ['javascript:alert(1)', 'https://example.com/tracking.jpg', 'data:image/svg+xml;base64,YWJjZA==']) assert.throws(() => serializeDiary([{ ...entry, photo }]));
  assert.equal(readDiary(serializeDiary([{ ...entry, date: '2024-02-29' }]))[0].date, '2024-02-29');
});

test('oversized content and blank required fields are rejected', () => {
  const entry = demoDiaryEntries()[0];
  for (const fields of [{ title: ' ' }, { body: '\n' }, { body: 'x'.repeat(6001) }, { photo: 'x'.repeat(1500001) }]) assert.throws(() => serializeDiary([{ ...entry, ...fields }]));
});
