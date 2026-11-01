"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { T } from "../i18n/LanguageProvider";

const SnakeGame = dynamic(() => import("./SnakeGame"), {
  ssr: false,
});
const TetrisGame = dynamic(() => import("./TetrisGame"), {
  ssr: false,
});
const Game2048 = dynamic(() => import("./Game2048"), {
  ssr: false,
});

const GAMES = [
  {
    id: "snake",
    icon: "🐍",
    title: "SERPENTIS REX",
    sub: "WASD / Arrows · Space pause",
    desc: "Guide the royal serpent, consume the crimson gems, grow thy dominion.",
  },
  {
    id: "tetris",
    icon: "♛",
    title: "REGNUM TETRIS",
    sub: "Arrows · Enter hard drop · Space pause",
    desc: "Stack the jeweled stones, clear the rows, claim the high score.",
  },
  {
    id: "2048",
    icon: "✦",
    title: "AURUM 2048",
    sub: "WASD / Arrows · Swipe on mobile",
    desc: "Unite the golden tiles, reach 2048, achieve royal ascension.",
  },
];

function OrnateCorner({ style }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      style={{ position: "absolute", ...style }}
    >
      <path
        d="M1 17 L1 1 L17 1"
        stroke="#c9a84c"
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
      />
      <circle cx="1" cy="1" r="1.8" fill="#c9a84c" opacity="0.65" />
    </svg>
  );
}

function Divider() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(90deg,transparent,#8b6914,transparent)",
        }}
      />
      <span style={{ color: "#c9a84c", fontSize: 10, opacity: 0.5 }}>✦</span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(90deg,transparent,#8b6914,transparent)",
        }}
      />
    </div>
  );
}

export default function ArcadeModal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (active) setActive(null);
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeGame = GAMES.find((g) => g.id === active);

  return (
    <>
      {/* ── Trigger button — Gaming page-дээ энийг байршуул ── */}
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          background:
            "linear-gradient(135deg, #100e00 0%, #2a2000 50%, #100e00 100%)",
          border: "1px solid #c9a84c",
          color: "#c9a84c",
          padding: "12px 28px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s",
          boxShadow:
            "0 0 18px rgba(201,168,76,0.18), inset 0 1px 0 rgba(255,228,154,0.08)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 32px rgba(201,168,76,0.38), inset 0 1px 0 rgba(255,228,154,0.15)";
          e.currentTarget.style.color = "#ffe49a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 18px rgba(201,168,76,0.18), inset 0 1px 0 rgba(255,228,154,0.08)";
          e.currentTarget.style.color = "#c9a84c";
        }}
      >
        <OrnateCorner style={{ top: -1, left: -1 }} />
        <OrnateCorner style={{ top: -1, right: -1, transform: "scaleX(-1)" }} />
        <OrnateCorner
          style={{ bottom: -1, left: -1, transform: "scaleY(-1)" }}
        />
        <OrnateCorner
          style={{ bottom: -1, right: -1, transform: "rotate(180deg)" }}
        />
        ♛ &nbsp; <T>{"Play Royal Games"}</T> &nbsp; ♛
      </button>

      {/* ── Modal ── */}
      {open && createPortal(
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              if (active) setActive(null);
              else setOpen(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5,6,14,0.88)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
            @keyframes slideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
            @keyframes regal-blink { 0%,100% { opacity:1 } 50% { opacity:0.15 } }
            @keyframes food-royal { 0%,100% { transform:scale(1) rotate(0deg) } 50% { transform:scale(1.2) rotate(45deg) } }
            @keyframes crown-float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-5px) } }
          `}</style>

          <div
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #1a1628 0%, #0b0d1a 60%, #080910 100%)",
              border: "1px solid #4a380a",
              boxShadow:
                "0 0 60px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.9)",
              maxWidth: active ? "fit-content" : 700,
              width: active ? "auto" : "100%",
              maxHeight: "95vh",
              overflowY: "auto",
              padding: "28px 24px",
              position: "relative",
              animation: "slideUp 0.25s ease",
            }}
          >
            <OrnateCorner style={{ top: -1, left: -1 }} />
            <OrnateCorner
              style={{ top: -1, right: -1, transform: "scaleX(-1)" }}
            />
            <OrnateCorner
              style={{ bottom: -1, left: -1, transform: "scaleY(-1)" }}
            />
            <OrnateCorner
              style={{ bottom: -1, right: -1, transform: "rotate(180deg)" }}
            />

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 24,
                  marginBottom: 6,
                  animation: "crown-float 2.5s ease-in-out infinite",
                }}
              >
                👑
              </div>
              {active ? (
                <>
                  <div
                    style={{
                      fontFamily: "'Cinzel Decorative',serif",
                      fontSize: 15,
                      letterSpacing: 5,
                      background:
                        "linear-gradient(135deg,#fffde7,#ffe082,#ffb300)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {activeGame?.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 7,
                      color: "#8b6914",
                      letterSpacing: 3,
                      marginTop: 4,
                    }}
                  >
                    {activeGame?.sub}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontFamily: "'Cinzel Decorative',serif",
                      fontSize: 16,
                      letterSpacing: 6,
                      background:
                        "linear-gradient(135deg,#fffde7,#ffe082,#ffb300)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ROYAL ARCADE
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 7,
                      color: "#8b6914",
                      letterSpacing: 4,
                      marginTop: 4,
                    }}
                  >
                    SELECT THY GAME
                  </div>
                </>
              )}
            </div>

            <Divider />

            {/* Back button */}
            {active && (
              <button
                onClick={() => setActive(null)}
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 8,
                  letterSpacing: 2,
                  background: "transparent",
                  border: "none",
                  color: "rgba(201,168,76,0.45)",
                  cursor: "pointer",
                  marginTop: 14,
                  marginBottom: 4,
                  padding: "4px 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(201,168,76,0.45)")
                }
              >
                ← CHOOSE ANOTHER
              </button>
            )}

            {/* Game selector */}
            {!active && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: 14,
                  marginTop: 20,
                }}
              >
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setActive(g.id)}
                    style={{
                      background: "linear-gradient(135deg,#0d1020,#0a0e18)",
                      border: "1px solid #4a380a",
                      padding: "22px 18px",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.3s",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#c9a84c";
                      e.currentTarget.style.boxShadow =
                        "0 0 28px rgba(201,168,76,0.2), inset 0 0 16px rgba(201,168,76,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#4a380a";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <OrnateCorner style={{ top: -1, left: -1 }} />
                    <OrnateCorner
                      style={{
                        bottom: -1,
                        right: -1,
                        transform: "rotate(180deg)",
                      }}
                    />
                    <div style={{ fontSize: 32, marginBottom: 10 }}>
                      {g.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 11,
                        color: "#c9a84c",
                        letterSpacing: 2,
                        marginBottom: 6,
                      }}
                    >
                      {g.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 7,
                        color: "#5a4a20",
                        lineHeight: 1.8,
                      }}
                    >
                      {g.desc}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Active game */}
            {active && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {active === "snake" && <SnakeGame />}
                {active === "tetris" && <TetrisGame />}
                {active === "2048" && <Game2048 />}
              </div>
            )}

            <div style={{ marginTop: 20 }}>
              <Divider />
            </div>

            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 8,
                  letterSpacing: 2,
                  background: "transparent",
                  border: "none",
                  color: "rgba(201,168,76,0.35)",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(201,168,76,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(201,168,76,0.35)")
                }
              >
                ESC · CLOSE THE HALL
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
