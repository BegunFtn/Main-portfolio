"use client";

import { T, useLanguage } from "../components/i18n/LanguageProvider";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioBackground from "../components/backgrounds/PortfolioBackground";
import "./anime.css";

const anime = [
  { name: "Solo Leveling", image: "/anime/solo-leveling.jpg", genre: "Action", note: "From the weakest hunter to something extraordinary. A story built around growth, determination, and a striking dark world." },
  { name: "Attack on Titan", image: "/anime/attack-on-titan.jpg", genre: "Action", note: "Freedom, sacrifice, and a world that keeps changing the way you see its characters." },
  { name: "Jujutsu Kaisen", image: "/anime/jujutsu-kaisen.avif", genre: "Action", note: "Curses, sharp character design, and beautifully choreographed battles." },
  { name: "Demon Slayer", image: "/anime/demon-slayer.jpg", genre: "Fantasy", note: "A journey of family and perseverance, told through expressive animation and a memorable cast." },
  { name: "Mushoku Tensei: Jobless Reincarnation", image: "/anime/mushoku-tensei.jpeg", genre: "Isekai", note: "A second chance in an unfamiliar world, with an emphasis on the journey and the people along the way." },
  { name: "That Time I Got Reincarnated as a Slime", image: "/anime/reincarnated-as-a-slime.jpg", genre: "Isekai", note: "A new beginning that grows into a story about community, friendship, and building a world." },
  { name: "Record of Ragnarok", image: "/anime/record-of-ragnarok.webp", genre: "Action", note: "Mythology meets humanity in larger-than-life confrontations between gods and legendary fighters." },
  { name: "I Was Reincarnated as the 7th Prince", image: "/anime/seventh-prince.avif", genre: "Fantasy", note: "A magical new life with a protagonist whose curiosity for sorcery knows no limits." },
];
function Icon({ name, ...props }) {
  const paths = { home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z", grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z", arrow: "M5 19 19 5M5 5h14v14", search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0", back: "M19 12H5m7-7-7 7 7 7", close: "m6 6 12 12M6 18 18 6" };
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.arrow} /></svg>;
}
export default function Anime() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => { if (selected && !dialog.current.open) dialog.current.showModal(); }, [selected]);
  const filtered = anime.filter(item => (genre === "All" || item.genre === genre) && item.name.toLowerCase().includes(query.toLowerCase()));
  function browse(category = "All") { setGenre(category); document.getElementById("anime-collection").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }
  return (
    <main id="main-content" className="anime-page">
      <PortfolioBackground />
      <div className="anime-content">
      <div className="anime-topline"><Link href="/About"><Icon name="back" /><T>{"Back to about"}</T></Link><span><T>{"THE OTHER SIDE OF BEGUN / 01"}</T></span></div>
      <section className="anime-shell" aria-label="My anime world">
        <aside className="anime-rail"><Link href="/" className="anime-emblem" aria-label="Portfolio home">✦</Link><nav aria-label="Anime page navigation"><a href="/About" aria-label="About me"><Icon name="home" /></a><a href="#anime-collection" className="active" aria-label="Anime collection"><Icon name="grid" /></a><Link href="/Gaming" aria-label="Gaming hobby"><span aria-hidden="true">⌘</span></Link></nav><Link href="/About" className="anime-avatar" aria-label="About Begun"><Image src="/portraits/home-portrait.png" alt="" fill sizes="44px" /></Link></aside>
        <div className="anime-stage">
          <div className="anime-hero-panel"><div className="anime-hero-grain" /><p className="anime-kicker"><T>{"A LITTLE ESCAPE. A LOT OF INSPIRATION."}</T></p><span className="anime-japanese" lang="ja" aria-hidden="true">物語の世界</span><div className="anime-hero-copy"><h1><span><T>{"BEYOND"}</T></span><span><T>{"THE"}</T></span><span><T>{"ORDINARY."}</T></span></h1><p><T>{"Different worlds. Unforgettable stories."}</T><br /><T>{"Welcome to my side of anime."}</T></p><button onClick={() => browse()}><T>{"Explore my collection"}</T><Icon name="arrow" /></button></div><div className="anime-character"><Image src="/portraits/anime-portrait.png" alt="Anime illustration inspired by Begun, wearing a black jacket with warm gold lighting" fill priority sizes="(max-width: 720px) 90vw, 550px" /></div><span className="anime-hero-index"><T>{"01 — MY ANIME CHAPTER"}</T></span></div>
          <div className="anime-tools"><a href="#anime-search" aria-label={t("Find an anime…")}><Icon name="search" /><span><T>{"FIND A STORY"}</T></span></a><a href="#anime-collection" aria-label="Browse all anime"><Icon name="grid" /></a></div>
          <div className="anime-feature"><div><span className="anime-kicker"><T>{"IN MY COLLECTION"}</T></span><h2>SOLO<br /><span>LEVELING.</span></h2><button onClick={() => setSelected(anime[0])}><T>{"Take a closer look"}</T><Icon name="arrow" /></button></div><div className="anime-feature-art"><Image src="/anime/solo-leveling.jpg" alt="Solo Leveling artwork" fill sizes="250px" /></div><span className="anime-feature-number" aria-hidden="true">01</span></div>
        </div>
        <button className="anime-rail-note" onClick={() => browse("Isekai")}><span><T>{"ANOTHER"}</T><br /><T>{"WORLD?"}</T></span><span className="anime-note-star" aria-hidden="true">✳</span><span><T>{"EXPLORE ISEKAI ↗"}</T></span></button>
      </section>
      <section id="anime-collection" className="anime-collection"><div className="anime-collection-heading"><div><p className="anime-kicker"><T>{"THE STORIES I COME BACK TO"}</T></p><h2><T>{"My anime collection"}</T><span>.</span></h2></div><span className="anime-count">{String(anime.length).padStart(2, "0")} <T>{"TITLES / ENDLESS WORLDS"}</T></span></div><div className="anime-filterbar"><div className="anime-tabs" role="group" aria-label="Filter by genre">{["All", "Action", "Fantasy", "Isekai"].map(item => <button key={item} aria-pressed={genre === item} onClick={() => setGenre(item)}><T>{item === "All" ? "All stories" : item}</T></button>)}</div><label className="anime-search"><Icon name="search" /><span className="sr-only">Search anime collection</span><input id="anime-search" type="search" placeholder={t("Find an anime…")} value={query} onChange={e => setQuery(e.target.value)} /></label></div><p className="sr-only" role="status">{filtered.length} <T>{"titles found"}</T></p><div className="anime-grid">{filtered.map(item => <button className="anime-card" key={item.name} onClick={() => setSelected(item)}><div className="anime-card-art"><Image src={item.image} alt="" fill sizes="(max-width: 420px) 90vw, (max-width: 720px) 45vw, (max-width: 1000px) 30vw, 300px" /><span className="anime-card-open"><Icon name="arrow" /></span></div><span className="anime-card-genre"><T>{item.genre}</T></span><h3>{item.name}</h3></button>)}</div>{!filtered.length && <div className="anime-empty"><h3><T>{"No stories found."}</T></h3><p><T>{"Try another title or explore a different genre."}</T></p><button onClick={() => { setQuery(""); setGenre("All"); }}><T>{"Show all stories ↗"}</T></button></div>}</section>
      <footer className="anime-footer"><span><T>{"ANIME, THROUGH MY EYES."}</T></span><Link href="/Gaming"><T>{"Next chapter: Gaming"}</T><Icon name="arrow" /></Link></footer>
      <dialog ref={dialog} className="anime-dialog" aria-labelledby="anime-dialog-title" onClose={() => setSelected(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}>{selected && <><button className="anime-dialog-close" onClick={() => dialog.current.close()} aria-label="Close anime details" autoFocus><Icon name="close" /></button><div className="anime-dialog-art"><Image src={selected.image} alt={`${selected.name} artwork`} fill sizes="600px" /></div><div className="anime-dialog-copy"><p className="anime-kicker"><T>{selected.genre}</T> / <T>{"MY COLLECTION"}</T></p><h2 id="anime-dialog-title">{selected.name}</h2><p><T>{selected.note}</T></p></div></>}</dialog>
      </div>
    </main>
  );
}
