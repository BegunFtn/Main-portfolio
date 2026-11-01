# Travel notebook

`/Travel` has two sections: the destination wishlist and the notebook.

- Open the cover, then use the previous/next controls or focus the pages and use the arrow keys. Desktop pages turn in 3D; narrow screens show a readable vertical spread with a short reveal. Reduced-motion preferences skip animated transitions.
- The cover stays attached to the spine throughout opening/closing. Desktop sheets use four connected strips with a delayed bend, changing paper light, and a cast shadow; controls wait for the cover/page to settle before another turn. The loose photograph settles after opening, and a ribbon moves with a page turn.
- The loose photo can be dragged around the right page. It is a visual interaction; all reading and navigation also work without dragging.
- Three entries are explicitly marked as samples. Their photos and text are illustrative, not claims about the owner's real trips. Sample content lives in `app/Travel/diary-data.mjs` and its Mongolian copy in `app/i18n/diary.js`.
- **Write a memory** adds an entry. **Edit this entry** changes or removes an existing entry. Photos accept JPG, PNG, or WebP up to 10 MB and are resized locally to at most 1200px before saving.
- Entries are stored under `begun-travel-diary-v1` in the current browser's localStorage. They survive refresh but are not synced, uploaded, or published to other visitors. Clearing browser data removes them. Public owner-written posts would require a later server/CMS integration.
- Failed storage writes leave the editor and draft open. Corrupt or incompatible existing storage is not overwritten automatically. An intentionally empty notebook stays empty after refresh.

The current art direction follows a photo-covered spiral notebook: Mount Fuji/lake cover photo, white Great Vibes lettering, Caveat handwriting with Cyrillic Extended support, ruled paper, metallic coils, and taped prints. Both fonts are scoped to the notebook. The cover photo reuses the credited Japan image from `docs/travel-image-credits.md`.
