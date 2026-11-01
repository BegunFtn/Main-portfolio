"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Caveat, Great_Vibes } from "next/font/google";
import { useLanguage } from "../components/i18n/LanguageProvider";
import { DIARY_STORAGE_KEY, demoDiaryEntries, readDiary, serializeDiary } from "./diary-data.mjs";
import "./diary.css";

const handwriting = Caveat({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-diary-hand", display: "swap" });
const calligraphy = Great_Vibes({ subsets: ["latin", "cyrillic", "cyrillic-ext"], weight: "400", variable: "--font-diary-script", display: "swap" });

const blankDraft = () => ({ title: "", location: "", date: "", body: "", photo: "" });
const pad = number => String(number).padStart(2, "0");
function DiaryIcon({ name, size = 18 }) {
  const paths = {
    arrow: "M4 12h16m-6-6 6 6-6 6", back: "M20 12H4m6-6-6 6 6 6",
    plus: "M12 5v14M5 12h14", close: "m6 6 12 12M6 18 18 6",
    book: "M12 5c-4-3-8-2-10-1v16c3-1 6-2 10 1 4-3 7-2 10-1V4c-2-1-6-2-10 1Zm0 0v16",
    photo: "M3 3h18v18H3ZM3 16l5-5 5 5 3-3 5 5M16 7h.01",
    edit: "m16 3 5 5-12 12-6 1 1-6ZM14 5l5 5",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}

function SpiralBinding() {
  const gradient = useId();
  return <svg className="diary-wire-binding" viewBox="0 0 56 600" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id={gradient} x1="0" x2="1"><stop offset="0" stopColor="#151c1c" /><stop offset=".25" stopColor="#667170" /><stop offset=".42" stopColor="#1c2525" /><stop offset=".7" stopColor="#b8c0b8" /><stop offset="1" stopColor="#252e2c" /></linearGradient></defs>
    {Array.from({ length: 25 }, (_, i) => <g key={i} transform={`translate(0 ${10 + i * 23.2})`}>
      <ellipse cx="43" cy="13" rx="4.2" ry="3.5" fill="#152323" opacity=".7" />
      <path d="M43 6C5-5 3 26 42 18" fill="none" stroke="#000" strokeWidth="4.5" opacity=".25" transform="translate(1 1.6)" />
      <path d="M43 6C5-5 3 26 42 18" fill="none" stroke={`url(#${gradient})`} strokeWidth="3.3" />
      <path d="M15 5C8 9 11 17 22 20" fill="none" stroke="#ccd1c6" strokeWidth=".65" opacity=".65" />
    </g>)}
  </svg>;
}

function CoverLettering({ t }) {
  const banner = useId();
  return <span className="diary-cover-lettering">
    <svg className="diary-lettering-banner" viewBox="0 0 280 90" aria-hidden="true"><defs><path id={banner} d="M78 53Q140 4 203 53" /></defs><path d="m75 53 2-22Q140-5 205 31l-2 22-16-7Q139 20 94 47Z" /><path d="m78 31-12 1 3 24 24-9M204 31l12 2-4 24-25-11" /><text><textPath href={`#${banner}`} startOffset="50%" textAnchor="middle">{t("LIFE IS A")}</textPath></text></svg>
    <span className="diary-cover-journey">{t("Journey")}</span>
    <svg className="diary-lettering-flourish" viewBox="0 0 320 100" aria-hidden="true"><path d="M20 44C84 25 196 14 285 6M36 53C94 36 190 24 269 19" /><path d="M34 70C99 31 186 99 270 51c43-25 21-52 5-42" /><path d="m136 68 75 8-12-11m12 11-15 7M58 70l-18-2 12-9" /></svg>
    <span className="sr-only">{t("LIFE IS A")} {t("Journey")}</span>
  </span>;
}

function DiaryLeaf({ entry, side, page, t, language, decorative = false, revealed = true }) {
  const bounds = useRef(null);
  const reducedMotion = useReducedMotion();
  const date = entry?.date ? new Intl.DateTimeFormat(language === "mn" ? "mn-MN" : "en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${entry.date}T12:00:00Z`)) : t("UNDATED");
  if (side === "left") return <div className="diary-paper diary-paper-left"><div className="diary-paper-heading"><span>BEGUN / {t("FIELD NOTES")}</span><span>{entry?.isDemo ? t("SAMPLE ENTRY") : date}</span></div><div className="diary-entry-content"><p className="diary-entry-location">{entry ? t(entry.location || "Somewhere") : t("YOUR NEXT CHAPTER")}</p><h3>{entry ? t(entry.title) : t("Every journey starts with a blank page.")}</h3><div className="diary-entry-rule" /><div className="diary-entry-writing"><p>{entry ? t(entry.body) : t("A place, a date, a memory. Add your first entry and make this notebook yours.")}</p></div><p className="diary-signature">{entry?.isDemo ? t("A layout sample, ready for your story.") : `— ${t("Begun")}`}</p></div><div className="diary-paper-footer"><span>{date}</span><span>{pad(page * 2 + 1)}</span></div></div>;
  return <div className="diary-paper diary-paper-right" ref={bounds}><div className="diary-paper-heading"><span>{t("MOMENTS, COLLECTED.")}</span><span>{pad(page + 1)} / {entry ? t(entry.location || "Somewhere") : "…"}</span></div><div className="diary-main-print">{entry?.photo ? <img src={entry.photo} alt={decorative ? "" : `${t("Diary photo")}: ${t(entry.location || entry.title)}`} /> : <div className="diary-photo-placeholder"><DiaryIcon name="photo" size={42} /><span>{t("A little space for a memory.")}</span></div>}<span>{entry?.isDemo ? t("ILLUSTRATIVE PHOTO") : t("FROM THE CAMERA ROLL")}</span></div>{entry?.photo && <motion.div className="diary-polaroid" drag={!decorative} dragConstraints={bounds} dragElastic={.08} dragMomentum={false} initial={false}
      animate={decorative || reducedMotion ? { opacity: 1, rotate: -6 } : { opacity: revealed ? 1 : 0, y: revealed ? 0 : 18, rotate: revealed ? -6 : -12 }}
      transition={{ type: "spring", stiffness: 150, damping: 22, delay: revealed ? .12 : 0 }}
      whileHover={decorative || reducedMotion ? {} : { rotate: -2, scale: 1.025 }}
      whileDrag={reducedMotion ? {} : { rotate: 2, scale: 1.06, boxShadow: "6px 22px 34px #30281655" }}><span className="diary-tape" /><img src={entry.photo} alt="" draggable={false} /><span>{t(entry.location || "Somewhere")} <i>✶</i></span></motion.div>}<span className="diary-postmark" aria-hidden="true">{t("KEEP THE MOMENT")}<span>✦</span>ELSEWHERE</span><div className="diary-paper-footer"><span>{entry?.isDemo ? t("SAMPLE ENTRY") : t("ONE FOR THE MEMORY.")}</span><span>{pad(page * 2 + 2)}</span></div></div>;
}

// Each nested strip bends a little behind the strip at the spine.
// Clipped copies keep the printed content aligned on both sides of the paper.
function TurningSheet({ turn, entries, leafProps, onComplete }) {
  const forward = turn.direction === 1;
  const segments = 4;
  function strip(part) {
    const frontOffset = forward ? part : segments - 1 - part;
    const backOffset = segments - 1 - frontOffset;
    const flex = (forward ? 1 : -1) * (part === 0 ? 2 : 10 - part);
    return <motion.div key={part} className="diary-paper-segment"
      style={{ width: part === 0 ? "25%" : "100%", [forward ? "left" : "right"]: part === 0 ? 0 : "100%", transformOrigin: forward ? "left center" : "right center" }}
      initial={{ rotateY: 0 }} animate={{ rotateY: [0, 0, flex, flex * .6, 0] }}
      transition={{ duration: 1.18, times: [0, .12, .43, .72, 1], ease: "easeInOut" }}>
      <div className="diary-segment-front"><div className="diary-segment-content" style={{ left: `${-frontOffset * 100}%` }}><DiaryLeaf entry={entries[turn.from]} page={turn.from} side={forward ? "right" : "left"} decorative {...leafProps} /></div><motion.span className="diary-paper-light" initial={{ opacity: 0 }} animate={{ opacity: [0, .08, .32, .12, 0] }} transition={{ duration: 1.18 }} /></div>
      <div className="diary-segment-back"><div className="diary-segment-content" style={{ left: `${-backOffset * 100}%` }}><DiaryLeaf entry={entries[turn.to]} page={turn.to} side={forward ? "left" : "right"} decorative {...leafProps} /></div><motion.span className="diary-paper-light" initial={{ opacity: 0 }} animate={{ opacity: [0, .15, .28, .08, 0] }} transition={{ duration: 1.18 }} /></div>
      {part < segments - 1 && strip(part + 1)}
    </motion.div>;
  }
  return <motion.div className={`diary-turn-leaf ${forward ? "turn-forward" : "turn-back"}`} aria-hidden="true"
    initial={{ rotateY: 0 }} animate={{ rotateY: forward ? -180 : 180 }}
    transition={{ duration: 1.18, ease: [.32, .04, .22, 1] }} onAnimationComplete={onComplete}>{strip(0)}</motion.div>;
}

async function preparePhoto(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) throw new Error("PHOTO");
  const url = URL.createObjectURL(file);
  try {
    const photo = new window.Image();
    photo.src = url;
    await photo.decode();
    const ratio = Math.min(1, 1200 / Math.max(photo.naturalWidth, photo.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(photo.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(photo.naturalHeight * ratio));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("PHOTO");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/jpeg", .8);
    if (data.length > 1500000) throw new Error("PHOTO");
    return data;
  } finally { URL.revokeObjectURL(url); }
}

export default function TravelDiary() {
  const { t, language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [entries, setEntries] = useState(demoDiaryEntries);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [open, setOpen] = useState(false);
  const [coverMoving, setCoverMoving] = useState(false);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(null);
  const [draft, setDraft] = useState(blankDraft);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const editor = useRef(null);
  const spread = useRef(null);
  const entry = entries[index];

  useEffect(() => {
    try { setEntries(readDiary(localStorage.getItem(DIARY_STORAGE_KEY))); }
    catch { setStorageError(true); }
    setLoaded(true);
  }, []);

  function flip(direction) {
    const next = index + direction;
    if (!open || coverMoving || turn || next < 0 || next >= entries.length) return;
    if (reducedMotion || window.matchMedia("(max-width: 680px)").matches) { setIndex(next); return; }
    setTurn({ direction, from: index, to: next });
  }
  function toggleBook() {
    if (!loaded || coverMoving || turn) return;
    setCoverMoving(!reducedMotion);
    setOpen(value => !value);
  }
  function finishCover() {
    setCoverMoving(false);
    if (open) requestAnimationFrame(() => spread.current?.focus({ preventScroll: true }));
  }
  function finishTurn() {
    if (!turn) return;
    setIndex(turn.to);
    setTurn(null);
  }
  function startWriting(edit = false) {
    setError("");
    setConfirmDelete(false);
    setEditingId(edit && entry ? entry.id : null);
    setDraft(edit && entry ? { title: t(entry.title), location: t(entry.location), date: entry.date, body: t(entry.body), photo: entry.photo } : blankDraft());
    editor.current.showModal();
  }
  function persist(updated, selectedIndex) {
    try {
      if (storageError) throw new Error("STORAGE");
      localStorage.setItem(DIARY_STORAGE_KEY, serializeDiary(updated));
      setEntries(updated);
      setIndex(Math.max(0, Math.min(selectedIndex, updated.length - 1)));
      setTurn(null);
      if (!open) setCoverMoving(!reducedMotion);
      setOpen(true);
      editor.current.close();
    } catch { setError("Could not save to this browser. Your draft is still here. Free some browser storage and try again."); }
  }
  function saveEntry(event) {
    event.preventDefault();
    if (uploading || !draft.title.trim() || !draft.body.trim()) return;
    if (!editingId && entries.length >= 100) { setError("This notebook has reached 100 entries. Edit an existing entry to keep writing."); return; }
    const id = editingId || crypto.randomUUID();
    const updatedEntry = { ...draft, title: draft.title.trim(), location: draft.location.trim(), body: draft.body.trim(), id, isDemo: false };
    const updated = editingId ? entries.map(item => item.id === editingId ? updatedEntry : item) : [...entries, updatedEntry];
    persist(updated, updated.findIndex(item => item.id === id));
  }
  async function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true); setError("");
    try { const photo = await preparePhoto(file); setDraft(value => ({ ...value, photo })); }
    catch { setError("Choose a JPG, PNG, or WebP photo under 10 MB."); }
    finally { setUploading(false); event.target.value = ""; }
  }
  const leftIndex = turn?.direction === -1 ? turn.to : index;
  const rightIndex = turn?.direction === 1 ? turn.to : index;
  const leafProps = { t, language };

  return <section id="travel-diary" className={`travel-diary ${handwriting.variable} ${calligraphy.variable}`} aria-labelledby="travel-diary-title">
    <header className="diary-section-heading"><div><p className="travel-eyebrow">02 / {t("THE PLACES WE KEEP")}</p><h2 id="travel-diary-title">{t("My travel diary")}<span>✶</span></h2><p>{t("Not just the places. The little things along the way.")}</p></div><button className="diary-write-button" disabled={!loaded || coverMoving || !!turn || storageError} onClick={() => startWriting()}><DiaryIcon name="plus" size={16} />{t("Write a memory")}</button></header>
    {storageError && <p className="diary-storage-error" role="alert">{t("Your saved diary could not be loaded. Existing browser data has been left untouched.")}</p>}
    <div className="diary-scene">
      <motion.div className="diary-ground-shadow" aria-hidden="true" initial={false} animate={{ width: open ? "86%" : "43%", opacity: open ? .7 : .45 }} transition={{ duration: reducedMotion ? 0 : 1.2 }} />
      <motion.div className={`diary-book ${open ? "is-open" : ""} ${coverMoving ? "is-cover-moving" : ""} ${open || coverMoving ? "has-visible-pages" : ""} ${turn ? "is-turning" : ""}`}
        initial={false} animate={{ "--book-offset": open ? "0%" : "-25%", "--book-roll": open ? "0deg" : "-3deg", "--book-pitch": reducedMotion ? "0deg" : open ? ["0deg", "-1.8deg", "0deg"] : ["0deg", ".8deg", "0deg"] }}
        transition={{ duration: reducedMotion ? 0 : 1.25, ease: [.25, .7, .25, 1] }}>
        <span className="diary-page-stack diary-page-stack-left" aria-hidden="true" /><span className="diary-page-stack diary-page-stack-right" aria-hidden="true" />
        <div ref={spread} className="diary-spread" inert={!open || coverMoving} aria-hidden={!open} tabIndex={open ? 0 : -1} role="group" aria-label={t("Travel notebook pages")} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight") { event.preventDefault(); flip(1); } if (event.key === "ArrowLeft") { event.preventDefault(); flip(-1); } }}>
          <DiaryLeaf key={`left-${entries[leftIndex]?.id || "empty"}`} entry={entries[leftIndex]} page={leftIndex} side="left" revealed={open && !coverMoving} {...leafProps} />
          <DiaryLeaf key={`right-${entries[rightIndex]?.id || "empty"}`} entry={entries[rightIndex]} page={rightIndex} side="right" revealed={open && !coverMoving} {...leafProps} />
          <span className="diary-binding" aria-hidden="true" />
          <span className="diary-ribbon" aria-hidden="true" />
          {turn && <motion.span className="diary-turn-shadow" aria-hidden="true" style={{ left: turn.direction === 1 ? 0 : "50%", transformOrigin: turn.direction === 1 ? "right center" : "left center" }} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: [0, .38, .25, 0], scaleX: [0, .9, .55, 0] }} transition={{ duration: 1.18, times: [0, .4, .75, 1] }} />}
          {turn && <TurningSheet key={`${turn.from}-${turn.to}`} turn={turn} entries={entries} leafProps={leafProps} onComplete={finishTurn} />}
        </div>
        <motion.button className="diary-cover" aria-label={t("Open travel diary")} aria-hidden={open} tabIndex={open ? -1 : 0} disabled={open || coverMoving || !loaded} onClick={toggleBook}
          initial={false} animate={{ rotateY: open ? -180 : 0 }} transition={{ duration: reducedMotion ? 0 : 1.25, ease: [.32, .06, .22, 1] }} onAnimationComplete={finishCover}>
          <span className="diary-cover-front">
            <img className="diary-cover-photo" src="/travel/japan.jpg" alt="" draggable={false} />
            <span className="diary-cover-wash" />
            <span className="diary-cover-edition">THE ELSEWHERE COLLECTION / 01</span>
            <CoverLettering t={t} />
            <span className="diary-cover-author">{t("Begun")} {t("Ganbold")}</span>
            <span className="diary-cover-open">{t("Open the notebook")}<DiaryIcon name="arrow" size={17} /></span>
          </span>
          <span className="diary-cover-back" aria-hidden="true"><DiaryLeaf entry={entry} page={index} side="left" decorative {...leafProps} /></span>
        </motion.button>
        <SpiralBinding />
      </motion.div>
    </div>
    <div className="diary-controls"><button className="diary-close-book" disabled={!loaded || coverMoving || !!turn} onClick={toggleBook}><DiaryIcon name="book" size={16} />{t(open ? "Close notebook" : "Open the notebook")}</button><div className="diary-pagination"><button aria-label={t("Previous diary entry")} disabled={!open || coverMoving || !!turn || index === 0} onClick={() => flip(-1)}><DiaryIcon name="back" /></button><span aria-live="polite">{entries.length ? pad(index + 1) : "00"}<i>/</i>{pad(entries.length)}</span><button aria-label={t("Next diary entry")} disabled={!open || coverMoving || !!turn || index >= entries.length - 1} onClick={() => flip(1)}><DiaryIcon name="arrow" /></button></div><button className="diary-edit-entry" disabled={!open || coverMoving || !entry || !!turn || storageError} onClick={() => startWriting(true)}><DiaryIcon name="edit" size={15} />{t("Edit this entry")}</button></div>
    <p className="diary-local-note">{t("Your entries stay in this browser on this device. They are not published to the portfolio.")}</p>
    <dialog className="diary-editor" ref={editor} aria-labelledby="diary-editor-title" onClose={() => setConfirmDelete(false)} onCancel={event => { if (uploading) event.preventDefault(); }}><button className="diary-editor-close" disabled={uploading} aria-label={t("Close diary editor")} onClick={() => editor.current.close()}><DiaryIcon name="close" /></button><form onSubmit={saveEntry}><p className="travel-eyebrow">{t("A MOMENT WORTH KEEPING")}</p><h2 id="diary-editor-title">{t(editingId ? "Edit a memory" : "Write a memory")}</h2><label>{t("Entry title")}<input autoFocus required maxLength={100} value={draft.title} placeholder={t("Give this memory a name…")} onChange={event => setDraft(value => ({ ...value, title: event.target.value }))} /></label><div className="diary-editor-row"><label>{t("Place")}<input maxLength={100} value={draft.location} placeholder={t("Somewhere")} onChange={event => setDraft(value => ({ ...value, location: event.target.value }))} /></label><label>{t("Date")}<input type="date" value={draft.date} onChange={event => setDraft(value => ({ ...value, date: event.target.value }))} /></label></div><label>{t("Your story")}<textarea required maxLength={6000} rows={7} value={draft.body} placeholder={t("What do you want to remember?")} onChange={event => setDraft(value => ({ ...value, body: event.target.value }))} /></label><div className="diary-photo-upload">{draft.photo && <img src={draft.photo} alt={t("Selected diary photo")} />}<label className="diary-upload-label"><DiaryIcon name="photo" />{t(uploading ? "Preparing photo…" : "Add a photo")}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={uploadPhoto} /></label>{draft.photo && <button type="button" disabled={uploading} onClick={() => setDraft(value => ({ ...value, photo: "" }))}>{t("Remove photo")}</button>}</div>{error && <p className="diary-form-error" role="alert">{t(error)}</p>}<div className="diary-editor-actions"><button type="button" disabled={uploading} onClick={() => editor.current.close()}>{t("Cancel")}</button><button className="travel-explore" type="submit" disabled={uploading}>{t("Save entry")}<DiaryIcon name="arrow" size={16} /></button></div>{editingId && <div className="diary-delete-row"><button type="button" disabled={uploading} onClick={() => confirmDelete ? persist(entries.filter(item => item.id !== editingId), index) : setConfirmDelete(true)}>{t(confirmDelete ? "Confirm delete entry" : "Delete this entry")}</button>{confirmDelete && <button type="button" onClick={() => setConfirmDelete(false)}>{t("Keep entry")}</button>}</div>}</form></dialog>
  </section>;
}
