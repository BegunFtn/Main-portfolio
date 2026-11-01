"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/i18n/LanguageProvider";
import PortfolioBackground from "../components/backgrounds/PortfolioBackground";
import ArcadeModal from "../components/arcade/ArcadeModal";
import { STEAM_PROFILE_URL } from "../lib/gaming-config";
import "./gaming.css";

const picks = [
  { name: "Minecraft", image: "/games/minecraft.jpg", genre: "Sandbox", description: "A blank canvas, one block at a time. There is always something else to build.", url: "https://www.minecraft.net/" },
  { name: "Counter-Strike 2", image: "/games/counter-strike-2.jpg", genre: "Competitive FPS", description: "Precision, teamwork, and the tension of one more round.", url: "https://store.steampowered.com/app/730/" },
  { name: "Cyberpunk 2077", image: "/games/cyberpunk-2077.jpg", genre: "Open-world RPG", description: "Neon streets, a different world, and a story to get lost in.", url: "https://store.steampowered.com/search/?term=Cyberpunk+2077" },
  { name: "Sons of the Forest", image: "/games/sons-of-the-forest.avif", genre: "Survival", description: "Explore, build, and survive. Better with a friend along for the adventure.", url: "https://store.steampowered.com/search/?term=Sons+of+the+Forest" },
  { name: "Valorant", image: "/games/valorant.jpg", genre: "Tactical FPS", description: "A little strategy. A little instinct. Every round is another chance to get it right.", url: "https://playvalorant.com/" },
  { name: "Dota 2", image: "/games/dota-2.jpg", genre: "MOBA", description: "Five players, endless possibilities. The best plays start with a good team.", url: "https://store.steampowered.com/app/570/" },
  { name: "Grand Theft Auto V", image: "/games/grand-theft-auto-v.jpg", genre: "Open world", description: "A city to explore, a story to follow, and a little chaos along the way.", url: "https://store.steampowered.com/search/?term=Grand+Theft+Auto+V" },
  { name: "Call of Duty", image: "/games/call-of-duty.webp", genre: "FPS", description: "Fast rounds and split-second decisions. Sometimes it is all about the action.", url: "https://store.steampowered.com/search/?term=Call+of+Duty" },
];

function Icon({ name, size = 20 }) {
  const paths = {
    home: "m3 10 9-7 9 7v10H3Z M9 20v-7h6v7",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    arrow: "M5 19 19 5M5 5h14v14",
    game: "M6 7h12l3 11-4 1-3-4h-4l-3 4-4-1ZM7 9v5M4.5 11.5h5M16 10h.01M18 13h.01",
    chart: "M4 20h16M6 16v-5M12 16V4M18 16V8",
    back: "M19 12H5m7-7-7 7 7 7",
    refresh: "M20 7v5h-5M4 17v-5h5M5 8a8 8 0 0 1 13-3l2 3M19 16A8 8 0 0 1 6 19l-2-3",
    close: "m6 6 12 12M6 18 18 6",
    clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}

export default function Gaming() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("picks");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [steam, setSteam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const dialog = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    fetch("/api/steam", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Steam unavailable");
      setSteam(await response.json());
    }).catch(error => { if (error.name !== "AbortError") setFailed(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [refresh]);

  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [selected]);

  const featured = picks[featuredIndex];
  const source = tab === "picks" ? picks : (steam?.games || []);
  const filtered = source.filter(game => game.name.toLowerCase().includes(query.trim().toLowerCase()));
  const isLive = !!steam?.player;
  const number = value => new Intl.NumberFormat(language === "mn" ? "mn-MN" : "en-US", { maximumFractionDigits: 1 }).format(value);
  const hours = value => value == null ? "—" : number(value / 60);
  const topGames = (steam?.games || []).filter(game => game.minutes > 0).slice(0, 3);
  const quickPicks = [picks[1], picks[5], picks[3]];
  const recent = steam?.recentGames || [];

  return (
    <main id="main-content" className="game-page">
      <PortfolioBackground />
      <div className="game-page-top"><Link href="/About"><Icon name="back" size={17} />{t("Back to about")}</Link><span>BEGUN / {t("THE GAMING CHAPTER")}</span></div>
      <div className="game-dashboard">
        <aside className="game-rail">
          <Link href="/Home" className="game-brand" aria-label={t("Home")}>B<span>✦</span></Link>
          <nav aria-label={t("Gaming navigation")}>
            <a href="#gaming-overview" className="is-active" aria-label={t("Gaming overview")}><Icon name="home" /></a>
            <a href="#game-library" aria-label={t("Game library")}><Icon name="grid" /></a>
            <a href="#steam-stats" aria-label={t("Steam statistics")}><Icon name="chart" /></a>
            <a href="#royal-arcade" aria-label={t("Royal Arcade")}><Icon name="game" /></a>
          </nav>
          <Link href="/Anime" className="game-rail-bottom" aria-label={t("Anime")}>✧</Link>
        </aside>

        <div className="game-main">
          <header id="gaming-overview" className="game-toolbar">
            <div><p className="game-kicker">{t("OFF THE CLOCK. IN THE GAME.")}</p><h1>{t("Welcome back,")} <span>{t("Begun")}<span className="game-title-dot">.</span></span></h1></div>
            <label className="game-search"><Icon name="search" size={18} /><span className="sr-only">{t("Search games")}</span><input type="search" placeholder={t("Search games…")} value={query} onChange={event => setQuery(event.target.value)} /></label>
          </header>

          <div className="game-feature-row">
            <section className="game-feature" aria-label={t("Featured game")}>
              <Image key={featured.image} src={featured.image} alt="" fill priority sizes="(max-width: 720px) 90vw, (max-width: 1100px) 65vw, 600px" />
              <div className="game-feature-copy"><span className="game-tag"><span aria-hidden="true">✦</span>{t("IN THE SPOTLIGHT")}</span><h2>{featured.name}</h2><p>{t(featured.description)}</p><button className="game-button" onClick={() => setSelected(featured)}>{t("Explore game")}<Icon name="arrow" size={15} /></button></div>
              <div className="game-feature-dots" role="group" aria-label={t("Choose featured game")}>{picks.slice(0, 3).map((game, index) => <button key={game.name} aria-label={game.name} aria-pressed={featuredIndex === index} onClick={() => setFeaturedIndex(index)}><span /></button>)}</div>
            </section>
            <section className="game-quick" aria-label={t("Quick picks")}><p className="game-kicker">{t("QUICK PICKS")}</p>{quickPicks.map(game => <button key={game.name} onClick={() => setSelected(game)}><span className="game-quick-image"><Image src={game.image} alt="" fill sizes="48px" /></span><span><strong>{game.name}</strong><small>{t(game.genre)}</small></span><Icon name="arrow" size={15} /></button>)}</section>
          </div>

          <section id="game-library" className="game-library">
            <div className="game-section-heading"><h2>{t("My game shelf")}<span> / {String(source.length).padStart(2, "0")}</span></h2><div className="game-tabs" role="group" aria-label={t("Game source")}><button aria-pressed={tab === "picks"} onClick={() => setTab("picks")}>{t("My picks")}</button><button aria-pressed={tab === "steam"} onClick={() => setTab("steam")}>Steam</button></div></div>
            <div className="game-cards">{filtered.map(game => <button className="game-card" key={game.appId || game.name} onClick={() => setSelected(game)}><div className="game-card-image">{game.appId ? <img src={game.image} alt="" loading="lazy" onError={event => { event.currentTarget.style.visibility = "hidden"; }} /> : <Image src={game.image} alt="" fill sizes="(max-width: 500px) 80vw, (max-width: 720px) 42vw, 240px" />}<span className="game-card-arrow"><Icon name="arrow" size={16} /></span></div><span className="game-card-label">{t(game.genre || "Steam library")}</span><h3>{game.name}</h3>{game.minutes != null && <p><Icon name="clock" size={12} />{hours(game.minutes)} {t("hours played")}</p>}</button>)}</div>
            {!filtered.length && <div className="game-empty"><Icon name={tab === "steam" ? "chart" : "search"} size={26} /><h3>{t(query ? "No games found" : isLive ? (!steam.libraryVisible ? "Game details are unavailable" : "Your Steam library is empty") : "Steam library not synced yet")}</h3><p>{t(query ? "Try a different game title." : isLive ? (!steam.libraryVisible ? "The profile’s game details may be private." : "No games to display yet.") : "Your Steam games will appear here once activity is connected.")}</p>{query ? <button onClick={() => setQuery("")}>{t("Clear search")}</button> : <a href={STEAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">{t("Visit Steam profile")} ↗</a>}</div>}
          </section>

          <section id="royal-arcade" className="game-arcade"><div className="game-arcade-symbol" aria-hidden="true">♛</div><div><p className="game-kicker">{t("A SMALL BREAK, BUILT BY ME")}</p><h2>{t("The Royal Arcade")}</h2><p>Snake <span>·</span> Tetris <span>·</span> 2048</p></div><ArcadeModal /></section>
        </div>

        <aside id="steam-stats" className="game-steam">
          <div className="game-steam-profile"><div className="game-steam-avatar">{steam?.player?.avatar ? <img src={steam.player.avatar} alt="" /> : <Image src="/portraits/home-portrait.png" alt="" fill sizes="46px" />}</div><div><strong>{steam?.player?.name || t("My Steam profile")}</strong><span><i className={isLive ? "is-live" : ""} />{t(isLive ? steam.player.status : loading ? "Loading…" : "Not synced yet")}</span></div><a href={STEAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label={t("Visit Steam profile")}><Icon name="arrow" size={17} /></a></div>
          <section className="game-stat-panel"><div className="game-section-heading"><h2>{t("My statistics")}</h2><button className="game-refresh" disabled={loading} aria-label={t("Refresh Steam activity")} onClick={() => setRefresh(value => value + 1)}><Icon name="refresh" size={17} /></button></div><div className="game-hours-ring"><div><span>{t("TOTAL PLAYTIME")}</span><strong>{hours(steam?.totalMinutes)}<small>{steam?.totalMinutes != null ? "h" : ""}</small></strong><p>{t(isLive ? "From Steam" : "Waiting for Steam")}</p></div></div><div className="game-stat-pair"><div><span>{t("Games owned")}</span><strong>{steam?.gameCount == null ? "—" : number(steam.gameCount)}</strong></div><div><span>{t("Last 2 weeks")}</span><strong>{hours(steam?.recentMinutes)}<small>{steam?.recentMinutes != null ? "h" : ""}</small></strong></div></div>{failed && <p className="game-steam-note" role="status">{t("Steam is unavailable right now. Try refreshing.")}</p>}{!loading && !failed && !isLive && <p className="game-steam-note">{t("Live stats are not connected yet. My public profile is a click away.")}</p>}{isLive && !steam.libraryVisible && <p className="game-steam-note">{t("The profile’s game details may be private.")}</p>}{isLive && <p className="game-live-label"><i />{t("Steam activity connected")}</p>}</section>
          {topGames.length > 0 && <section className="game-most-played"><p className="game-kicker">{t("MOST PLAYED")}</p>{topGames.map((game, index) => <div key={game.appId}><span className="game-rank">0{index + 1}</span><div><strong>{game.name}</strong><span className="game-playtime-track"><span style={{ width: `${game.minutes / topGames[0].minutes * 100}%` }} /></span></div><small>{hours(game.minutes)}h</small></div>)}</section>}
          <section className="game-recent"><div className="game-section-heading"><h2>{t("Recent activity")}</h2><Icon name="clock" size={16} /></div>{recent.length ? recent.slice(0, 3).map(game => <button key={game.appId} onClick={() => setSelected(game)}><img src={game.image} alt="" loading="lazy" /><span><strong>{game.name}</strong><small>{hours(game.recentMinutes)} {t("hours / last 2 weeks")}</small></span></button>) : <div className="game-recent-empty"><span aria-hidden="true">✦</span><p>{t(isLive && steam.recentVisible ? "No games played in the last two weeks." : "The next session starts a new story.")}</p></div>}</section>
          <a className="game-steam-link" href={STEAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">{t("Visit Steam profile")}<Icon name="arrow" size={16} /></a>
        </aside>
      </div>
      <dialog ref={dialog} className="game-dialog" aria-labelledby="game-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>{selected && <><button className="game-dialog-close" onClick={() => dialog.current.close()} aria-label={t("Close game details")} autoFocus><Icon name="close" /></button><div className="game-dialog-image">{selected.appId ? <img src={selected.image} alt="" /> : <Image src={selected.image} alt="" fill sizes="600px" />}</div><div className="game-dialog-copy"><p className="game-kicker">{t(selected.genre || "Steam library")}</p><h2 id="game-dialog-title">{selected.name}</h2>{selected.description && <p>{t(selected.description)}</p>}{selected.minutes != null && <p>{hours(selected.minutes)} {t("hours played")}</p>}<a className="game-button" href={selected.url} target="_blank" rel="noopener noreferrer">{t("Explore game")}<Icon name="arrow" size={15} /><span className="sr-only">{t(" (opens in a new tab)")}</span></a></div></>}</dialog>
    </main>
  );
}
