"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../components/i18n/LanguageProvider";
import PortfolioBackground from "../components/backgrounds/PortfolioBackground";
import TravelDiary from "./TravelDiary";
import "./travel.css";

const places = [
  { id: "mongolia", name: "Mongolia", region: "THE OPEN STEPPE", image: "/travel/mongolia.jpg", alt: "White gers on open grassland beneath snow-covered mountains", description: "Wide horizons. Quiet mountains. A little more room to breathe. Some of the best journeys begin close to home.", note: "An invitation to slow down, take the scenic road, and enjoy the space between destinations.", tags: ["Open roads", "Mountains", "Slow travel"], map: "Mongolia", credit: "Fadhil Abhimantra", source: "https://unsplash.com/photos/oUPPmOlJkK8" },
  { id: "bali", name: "Bali", region: "INDONESIA", image: "/travel/bali.jpg", alt: "Turquoise water and a secluded beach below green coastal cliffs in Bali", description: "Ocean air, green cliffs, and a road that leads somewhere new. A little escape from the everyday.", note: "A coastal daydream: unhurried mornings, the sound of the sea, and time to simply look around.", tags: ["Coast", "Island days", "Slow travel"], map: "Bali Indonesia", credit: "Mahosadha Ong", source: "https://unsplash.com/photos/4lTI9vuSVR8" },
  { id: "japan", name: "Japan", region: "MOUNT FUJI", image: "/travel/japan.jpg", alt: "Mount Fuji reflected in the still water of a lake", description: "A mountain on the horizon. Still water in the morning. A different kind of inspiration, far from the screen.", note: "A place for quiet views and small discoveries, with a camera nearby and no need to rush.", tags: ["Mountains", "Lakes", "Photography"], map: "Mount Fuji Japan", credit: "Szi Wei Chu", source: "https://unsplash.com/photos/OZ4R7qZvzjQ" },
  { id: "switzerland", name: "Switzerland", region: "THE SWISS ALPS", image: "/travel/switzerland.jpg", alt: "Snow-covered Alpine peaks above green meadows near Grindelwald", description: "Green valleys beneath snow-covered peaks. Take the long way, follow the view, and leave a little space for wonder.", note: "An Alpine landscape to explore one path at a time. The view is a good enough reason to stop.", tags: ["Mountains", "Walking", "Fresh air"], map: "Grindelwald Switzerland", credit: "Frederik Mussler", source: "https://unsplash.com/photos/CsAmUzpzAFc" },
  { id: "iceland", name: "Iceland", region: "WATER & WILDERNESS", image: "/travel/iceland.jpg", alt: "A rainbow in the mist of an Icelandic waterfall", description: "Water, wind, and a landscape that feels like another world. For the days when a familiar road is not enough.", note: "A wild landscape full of texture, motion, and changing light. One for the camera roll.", tags: ["Waterfalls", "Wild landscapes", "Photography"], map: "Iceland", credit: "Lien Van Win", source: "https://unsplash.com/photos/ax7aOqRweb4" },
];
const SAVE_KEY = "begun-travel-saved";
const pad = value => String(value).padStart(2, "0");

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: "M4 12h16m-6-6 6 6-6 6", back: "M20 12H4m6-6-6 6 6 6",
    bookmark: "M6 3h12v18l-6-4-6 4Z", close: "m6 6 12 12M6 18 18 6",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    compass: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM16 8l-3 5-5 3 3-5Z",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}

export default function Travel() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState([]);
  const [savedOpen, setSavedOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const dialog = useRef(null);
  const place = places[index];
  const nextPlaces = [1, 2, 3].map(offset => places[(index + offset) % places.length]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]");
      if (Array.isArray(stored)) setSaved(stored.filter(id => places.some(p => p.id === id)));
    } catch { /* Storage is optional. */ }
  }, []);

  useEffect(() => {
    if (reducedMotion || focused || detailsOpen || savedOpen) return;
    const timer = setTimeout(() => setIndex(value => (value + 1) % places.length), 8000);
    return () => clearTimeout(timer);
  }, [index, reducedMotion, focused, detailsOpen, savedOpen]);

  function toggleSaved(id) {
    const updated = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
    setSaved(updated);
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(updated)); } catch { /* Storage is optional. */ }
  }
  function select(id) {
    setIndex(places.findIndex(p => p.id === id));
    setSavedOpen(false);
  }
  function step(direction) { setIndex(value => (value + direction + places.length) % places.length); }
  function showDetails() { setDetailsOpen(true); dialog.current.showModal(); }

  return (
    <main id="main-content" className="travel-page">
      <PortfolioBackground />
      <div className="travel-page-top"><Link href="/About"><Icon name="back" size={17} />{t("Back to about")}</Link><span>BEGUN / {t("THE TRAVEL CHAPTER")}</span></div>
      <div className="travel-dream-heading"><div><p className="travel-eyebrow">01 / {t("STILL ON THE WISHLIST")}</p><h1>{t("Places I want to visit")}</h1></div><a href="#travel-diary">{t("My travel diary")}<Icon name="arrow" size={16} /></a></div>
      <section className="travel-stage" aria-label={t("Places I want to visit")} tabIndex={0}
        onFocusCapture={event => setFocused(event.target.matches(":focus-visible"))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onKeyDown={event => {
          if (event.key === "Escape") setSavedOpen(false);
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
        }}>
        <div className="travel-scenery" aria-hidden="true"><AnimatePresence initial={false}><motion.div key={place.id} className="travel-scenery-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .85 }}><Image src={place.image} alt="" fill priority sizes="(max-width: 1400px) 100vw, 1360px" /></motion.div></AnimatePresence></div>
        <div className="travel-shade" />
        <header className="travel-stage-header"><div className="travel-wordmark"><Icon name="compass" size={26} /><span>ELSEWHERE<span>{t("A little further. A little freer.")}</span></span></div><div className="travel-saved-wrap"><button className="travel-saved-button" aria-expanded={savedOpen} aria-controls="travel-saved-panel" onClick={() => setSavedOpen(value => !value)}><Icon name="bookmark" size={15} /><span>{t("Saved places")}</span><span className="travel-saved-count">{pad(saved.length)}</span></button>{savedOpen && <div id="travel-saved-panel" className="travel-saved-panel"><div><strong>{t("Saved places")}</strong><button onClick={() => setSavedOpen(false)} aria-label={t("Close saved places")}><Icon name="close" size={16} /></button></div>{saved.length ? places.filter(p => saved.includes(p.id)).map(p => <button className="travel-saved-item" key={p.id} onClick={() => select(p.id)}><Image src={p.image} alt="" width={48} height={38} /><span>{t(p.name)}</span><Icon name="arrow" size={16} /></button>) : <p>{t("Save a place that catches your eye. Your collection stays on this device.")}</p>}</div>}</div></header>
        <nav className="travel-index" aria-label={t("Choose a destination")}>{places.map((p, i) => <button key={p.id} aria-label={t(p.name)} aria-current={index === i ? "true" : undefined} onClick={() => select(p.id)}><span>{index === i ? pad(i + 1) : ""}</span></button>)}</nav>
        <div className="travel-composition">
          <div className="travel-story"><p className="travel-eyebrow">{t("ON MY WISHLIST")} <span>/ {pad(index + 1)}</span></p><AnimatePresence mode="wait" initial={false}><motion.div key={place.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : .25 }}><p className="travel-region"><Icon name="pin" size={13} />{t(place.region)}</p><h2>{t(place.name)}</h2><p className="travel-description">{t(place.description)}</p></motion.div></AnimatePresence><div className="travel-story-actions"><button className="travel-explore" onClick={showDetails}>{t("Explore this place")}<Icon name="arrow" size={19} /></button><button className="travel-save-current" aria-label={t(saved.includes(place.id) ? "Remove saved place" : "Save this place")} aria-pressed={saved.includes(place.id)} onClick={() => toggleSaved(place.id)}><Icon name="bookmark" size={18} /></button></div></div>
          <div className="travel-preview-area"><p className="travel-eyebrow">{t("ON THE HORIZON")}</p><div className="travel-preview-cards">{nextPlaces.map((p, i) => <article className="travel-preview" key={p.id} style={{ "--card-order": i }}><button className="travel-preview-select" onClick={() => select(p.id)}><Image src={p.image} alt={t(p.alt)} fill sizes="(max-width: 760px) 160px, 220px" /><span className="travel-preview-caption"><small>{t(p.region)}</small><strong>{t(p.name)}</strong><span><Icon name="arrow" size={17} /></span></span></button><button className="travel-preview-save" aria-label={`${t(saved.includes(p.id) ? "Remove saved place" : "Save this place")}: ${t(p.name)}`} aria-pressed={saved.includes(p.id)} onClick={() => toggleSaved(p.id)}><Icon name="bookmark" size={15} /></button></article>)}</div></div>
        </div>
        <footer className="travel-stage-footer"><span className="travel-footer-note">{t("LESS SCROLLING. MORE WANDERING.")}</span><div className="travel-controls"><button onClick={() => step(-1)} aria-label={t("Previous destination")}><Icon name="back" size={18} /></button><button onClick={() => step(1)} aria-label={t("Next destination")}><Icon name="arrow" size={18} /></button></div><div className="travel-page-number"><strong>{pad(index + 1)}</strong><span /><span>{pad(places.length)}</span></div></footer>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{t(place.name)}. {t(place.region)}</p>
      </section>
      <div className="travel-afterword"><p>{t("A collection of possibilities. The journey starts here.")}</p><span>{t("Photography via")} <a href={place.source} target="_blank" rel="noopener noreferrer">{place.credit} / Unsplash ↗</a></span></div>
      <TravelDiary />
      <dialog ref={dialog} className="travel-dialog" aria-labelledby="travel-detail-title" onClose={() => setDetailsOpen(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}><button className="travel-dialog-close" onClick={() => dialog.current.close()} aria-label={t("Close destination details")} autoFocus><Icon name="close" /></button><div className="travel-dialog-image"><Image src={place.image} alt={t(place.alt)} fill sizes="(max-width: 700px) 90vw, 700px" /></div><div className="travel-dialog-copy"><p className="travel-eyebrow">{t(place.region)}</p><h2 id="travel-detail-title">{t(place.name)}</h2><p>{t(place.note)}</p><ul>{place.tags.map(tag => <li key={tag}>{t(tag)}</li>)}</ul><div className="travel-detail-actions"><a className="travel-explore" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.map)}`} target="_blank" rel="noopener noreferrer">{t("View on map")}<Icon name="arrow" size={17} /><span className="sr-only">{t(" (opens in a new tab)")}</span></a><button className="travel-detail-save" aria-pressed={saved.includes(place.id)} onClick={() => toggleSaved(place.id)}><Icon name="bookmark" size={16} />{t(saved.includes(place.id) ? "Saved" : "Save this place")}</button></div></div></dialog>
    </main>
  );
}
