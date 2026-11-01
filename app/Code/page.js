"use client";

import { T } from "../components/i18n/LanguageProvider";

import MatrixRain from "../components/backgrounds/MatrixRain";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import ArcadeModal from "../components/arcade/ArcadeModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const goldText = {
  background: "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 12px rgba(255,180,0,0.4))",
};

const projects = [
  {
    title: "BEGUN PORTFOLIO",
    desc: "Personal portfolio site built with Next.js and Tailwind CSS. Dark luxury theme with animated canvas backgrounds.",
    tags: ["Next.js", "Tailwind", "Canvas API"],
    color: "#ffb300",
    icon: "◈",
  },
  {
    title: "GAME ARCADE",
    desc: "Collection of classic games — Snake, Tetris, 2048 — built from scratch with React hooks and smooth animations.",
    tags: ["React", "Game Dev", "Canvas"],
    color: "#c9a84c",
    icon: "⬡",
  },
  {
    title: "ANIME TRACKER",
    desc: "Personal anime watchlist tracker with search, rating, and status management. Built for fun during free time.",
    tags: ["React", "API", "CSS"],
    color: "#d4a0d4",
    icon: "◉",
  },
  {
    title: "WEATHER APP",
    desc: "Minimal weather dashboard using OpenWeather API. Shows current conditions and 5-day forecast with clean UI.",
    tags: ["JavaScript", "REST API", "CSS"],
    color: "#ffe49a",
    icon: "◎",
  },
];

export default function CodePage() {
  const router = useRouter();

  return (
    <main className="content-page code-page relative flex flex-col items-center min-h-screen overflow-hidden">
      {/* Gold Matrix Rain background */}
      <MatrixRain />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div className="page-content relative z-10 flex flex-col items-center w-full max-w-[1250px] px-4 pt-28 pb-16 gap-12">

        {/* Back button */}
        <div className="w-full">
          <button
            onClick={() => router.back()}
            className={`${mono.className} type-copy flex items-center gap-2 text-sm tracking-[0.15em] uppercase transition-all duration-200`}
            style={{ color: "rgba(255,200,50,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffb300")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,200,50,0.5)")}
          ><T>{"← Back"}</T></button>
        </div>

        {/* Hero / Title */}
        <div className="page-heading flex flex-col items-center gap-3">
          <p
            className={`${mono.className} type-copy text-xs tracking-[0.4em] uppercase`}
            style={{ color: "rgba(255,200,50,0.5)" }}
          ><T>{"// hobby"}</T></p>
          <h1
            className={`type-page-title ${bebas.className} type-heading text-7xl tracking-widest`}
            style={{ ...goldText, letterSpacing: "0.12em" }}
          ><T>{"Code"}</T></h1>
          <div
            className="w-16 h-px"
            style={{
              background: "linear-gradient(to right, transparent, #ffb300, transparent)",
            }}
          />
          <p
            className={`${mono.className} type-copy text-sm tracking-widest mt-1`}
            style={{ color: "rgba(255,200,50,0.55)" }}
          ><T>{"Coding is my passion."}</T></p>
        </div>

        {/* Projects grid */}
        <div className="code-grid w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className="relative flex flex-col gap-3 p-5 transition-all duration-300"
              style={{
                border: `1px solid ${p.color}22`,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${p.color}66`;
                e.currentTarget.style.boxShadow = `0 0 24px ${p.color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${p.color}22`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon + Title */}
        <Link href="/id" className="w-full">

              <div className="flex items-center gap-3">
                <span
                  className={`${mono.className} type-copy text-2xl`}
                  style={{ color: p.color, filter: `drop-shadow(0 0 8px ${p.color}88)` }}
                >
                  {p.icon}
                </span>
                <h2
                  className={`${bebas.className} type-heading text-2xl tracking-widest`}
                  style={{ color: p.color, letterSpacing: "0.1em" }}
                >
                  {p.title}
                </h2>
              </div>
        </Link>

              {/* Description */}
              <p
                className={`${mono.className} type-copy text-xs leading-relaxed`}
                style={{ color: "rgba(255,220,130,0.5)" }}
              >
                <T>{p.desc}</T>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-1">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${mono.className} type-copy text-[10px] px-2 py-0.5 tracking-widest`}
                    style={{
                      border: `1px solid ${p.color}44`,
                      color: `${p.color}cc`,
                      background: `${p.color}0a`,
                    }}
                  >
                    <T>{tag}</T>
                  </span>
                ))}
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none"
                style={{ borderTop: `1px solid ${p.color}55`, borderRight: `1px solid ${p.color}55` }} />
              <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none"
                style={{ borderBottom: `1px solid ${p.color}55`, borderLeft: `1px solid ${p.color}55` }} />
            </div>
          ))}
        </div>

        {/* Code Arcade button */}
        <div className="flex justify-center w-full">
          <ArcadeModal />
        </div>

      </div>
    </main>
  );
}