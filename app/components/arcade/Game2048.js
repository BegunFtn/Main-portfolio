"use client";
import { useEffect, useCallback, useState } from "react";

function newGrid() {
  return Array.from({ length: 4 }, () => Array(4).fill(null));
}

function addRandom(grid) {
  const empty = [];
  grid.forEach((row, r) =>
    row.forEach((v, c) => {
      if (!v) empty.push([r, c]);
    }),
  );
  if (!empty.length) return grid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const ng = grid.map((row) => [...row]);
  ng[r][c] = Math.random() < 0.9 ? 2 : 4;
  return ng;
}

function slideRow(row) {
  const vals = row.filter((v) => v !== null);
  let score = 0;
  const merged = [];
  let i = 0;
  while (i < vals.length) {
    if (i + 1 < vals.length && vals[i] === vals[i + 1]) {
      merged.push(vals[i] * 2);
      score += vals[i] * 2;
      i += 2;
    } else {
      merged.push(vals[i]);
      i++;
    }
  }
  while (merged.length < 4) merged.push(0);
  return { row: merged.map((v) => (v === 0 ? null : v)), score };
}

function doMoveGrid(grid, dir) {
  let g = grid.map((r) => [...r]);
  let total = 0,
    moved = false;
  const process = (rows) =>
    rows.map((row) => {
      const { row: nr, score } = slideRow(row);
      total += score;
      if (nr.join() !== row.join()) moved = true;
      return nr;
    });

  if (dir === "left") g = process(g);
  else if (dir === "right")
    g = process(g.map((r) => [...r].reverse())).map((r) => r.reverse());
  else if (dir === "up") {
    let t = Array.from({ length: 4 }, (_, c) => g.map((r) => r[c]));
    t = process(t);
    g = Array.from({ length: 4 }, (_, r) => t.map((col) => col[r]));
  } else {
    let t = Array.from({ length: 4 }, (_, c) => g.map((r) => r[c]).reverse());
    t = process(t);
    g = Array.from({ length: 4 }, (_, r) => t.map((col) => col[3 - r]));
  }
  return { grid: g, score: total, moved };
}

function canMove(grid) {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (!grid[r][c]) return true;
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return true;
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return true;
    }
  return false;
}

const TILE_COLORS = {
  2: {
    bg: "linear-gradient(135deg,#1a1408,#2a2010)",
    text: "#c9a84c",
    shadow: "#c9a84c44",
  },
  4: {
    bg: "linear-gradient(135deg,#1a1000,#332200)",
    text: "#ffb300",
    shadow: "#ffb30055",
  },
  8: {
    bg: "linear-gradient(135deg,#0a1a10,#0d2a18)",
    text: "#3aff8a",
    shadow: "#3aff8a55",
  },
  16: {
    bg: "linear-gradient(135deg,#0a1020,#10183a)",
    text: "#a0c8ff",
    shadow: "#a0c8ff55",
  },
  32: {
    bg: "linear-gradient(135deg,#1a0a20,#2a1040)",
    text: "#d4a0d4",
    shadow: "#d4a0d455",
  },
  64: {
    bg: "linear-gradient(135deg,#1a0808,#2a1010)",
    text: "#ff6666",
    shadow: "#ff666655",
  },
  128: {
    bg: "linear-gradient(135deg,#1a1400,#3a2a00)",
    text: "#ffe49a",
    shadow: "#ffe49a66",
  },
  256: {
    bg: "linear-gradient(135deg,#001a14,#003324)",
    text: "#00ffcc",
    shadow: "#00ffcc55",
  },
  512: {
    bg: "linear-gradient(135deg,#180014,#300028)",
    text: "#ff80ff",
    shadow: "#ff80ff55",
  },
  1024: {
    bg: "linear-gradient(135deg,#001020,#002040)",
    text: "#00d4ff",
    shadow: "#00d4ff66",
  },
  2048: {
    bg: "linear-gradient(135deg,#1a1000,#3a2800)",
    text: "#ffd700",
    shadow: "#ffd70088",
  },
};

export default function Game2048() {
  const [grid, setGrid] = useState(newGrid());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gs, setGs] = useState("IDLE");
  const [won, setWon] = useState(false);

  const startGame = useCallback(() => {
    let g = newGrid();
    g = addRandom(g);
    g = addRandom(g);
    setGrid(g);
    setScore(0);
    setWon(false);
    setGs("PLAYING");
  }, []);

  const moveDir = useCallback(
    (dir) => {
      if (gs !== "PLAYING") return;
      setGrid((prev) => {
        const { grid: ng, score: s, moved } = doMoveGrid(prev, dir);
        if (!moved) return prev;
        setScore((p) => {
          const ns = p + s;
          setBest((b) => Math.max(b, ns));
          return ns;
        });
        const final = addRandom(ng);
        if (final.flat().includes(2048) && !won) {
          setWon(true);
          setGs("WIN");
        } else if (!canMove(final)) setGs("OVER");
        return final;
      });
    },
    [gs, won],
  );

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowLeft: "left",
        a: "left",
        A: "left",
        ArrowRight: "right",
        d: "right",
        D: "right",
        ArrowUp: "up",
        w: "up",
        W: "up",
        ArrowDown: "down",
        s: "down",
        S: "down",
      };
      if (e.key === " ") {
        e.preventDefault();
        if (gs === "IDLE" || gs === "OVER" || gs === "WIN") startGame();
        return;
      }
      if (map[e.key]) {
        e.preventDefault();
        moveDir(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moveDir, startGame, gs]);

  useEffect(() => {
    let sx = 0,
      sy = 0;
    const onStart = (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - sx,
        dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > Math.abs(dy)) moveDir(dx > 0 ? "right" : "left");
      else moveDir(dy > 0 ? "down" : "up");
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [moveDir]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        fontFamily: "'Cinzel', serif",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {[
          { l: "SCORE", v: score, c: "#c9a84c" },
          { l: "BEST", v: best, c: "#d4a0d4" },
        ].map(({ l, v, c }) => (
          <div
            key={l}
            style={{
              border: "1px solid #4a380a",
              padding: "8px 18px",
              background: "linear-gradient(135deg,#0d1020,#090c1a)",
              textAlign: "center",
              minWidth: 90,
            }}
          >
            <div
              style={{
                fontSize: 7,
                color: "#5a4a20",
                letterSpacing: 2,
                marginBottom: 4,
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 16,
                color: c,
                textShadow: `0 0 10px ${c}88`,
                fontWeight: 700,
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gridTemplateRows: "repeat(4, 80px)",
          gap: 6,
          padding: 10,
          background: "linear-gradient(135deg,#0d1020,#090c1a)",
          border: "1px solid #4a380a",
          boxShadow:
            "0 0 20px rgba(201,168,76,0.15), inset 0 0 30px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        {grid.flat().map((val, i) => {
          const tc = val ? TILE_COLORS[Math.min(val, 2048)] : null;
          return (
            <div
              key={i}
              style={{
                width: 80,
                height: 80,
                background: val ? tc.bg : "rgba(201,168,76,0.04)",
                border: val
                  ? `1px solid ${tc.shadow}`
                  : "1px solid rgba(201,168,76,0.08)",
                boxShadow: val
                  ? `0 0 12px ${tc.shadow}, inset 0 1px 0 rgba(255,255,255,0.08)`
                  : undefined,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cinzel', serif",
                fontSize: val && val >= 1000 ? 18 : val && val >= 100 ? 22 : 26,
                fontWeight: 700,
                color: tc ? tc.text : "transparent",
                textShadow: tc ? `0 0 15px ${tc.shadow}` : undefined,
                transition: "all 0.1s ease",
                position: "relative",
              }}
            >
              {val ?? ""}
              {val === 2048 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    border: "1px solid #ffd700",
                    boxShadow:
                      "0 0 20px #ffd70066, inset 0 0 20px rgba(255,215,0,0.05)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          );
        })}

        {(gs === "IDLE" || gs === "OVER" || gs === "WIN") && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(9,12,26,0.93)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            {gs === "WIN" && (
              <div
                style={{
                  fontSize: 13,
                  color: "#ffd700",
                  letterSpacing: 4,
                  textShadow: "0 0 20px #ffd70088",
                  animation: "regal-blink 1.5s infinite",
                }}
              >
                2048 ACHIEVED
              </div>
            )}
            {gs === "OVER" && (
              <div
                style={{
                  fontSize: 12,
                  color: "#ff4444",
                  letterSpacing: 3,
                  textShadow: "0 0 15px #ff444488",
                }}
              >
                REALM CRUMBLES
              </div>
            )}
            {gs === "IDLE" && (
              <div
                style={{
                  fontSize: 11,
                  color: "#c9a84c",
                  letterSpacing: 4,
                  textShadow: "0 0 15px #c9a84c88",
                  animation: "regal-blink 1.5s infinite",
                }}
              >
                UNITE THE TILES
              </div>
            )}
            {(gs === "OVER" || gs === "WIN") && (
              <div style={{ fontSize: 14, color: "#c9a84c" }}>
                {score}{" "}
                <span style={{ fontSize: 7, color: "#8b6914" }}>PTS</span>
              </div>
            )}
            <button onClick={startGame} style={btnStyle}>
              {gs === "WIN"
                ? "✦ CONTINUE ✦"
                : gs === "OVER"
                  ? "✦ RISE AGAIN ✦"
                  : "✦ BEGIN ✦"}
            </button>
            <div style={{ fontSize: 7, color: "#4a3810", letterSpacing: 1 }}>
              WASD / ARROWS · SWIPE ON MOBILE
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <MBtn onClick={() => moveDir("up")}>▲</MBtn>
        <div style={{ display: "flex", gap: 3 }}>
          <MBtn onClick={() => moveDir("left")}>◄</MBtn>
          <MBtn onClick={startGame} style={{ fontSize: 8, width: 38 }}>
            ↺
          </MBtn>
          <MBtn onClick={() => moveDir("right")}>►</MBtn>
        </div>
        <MBtn onClick={() => moveDir("down")}>▼</MBtn>
      </div>
    </div>
  );
}

const btnStyle = {
  fontFamily: "'Cinzel',serif",
  fontSize: 9,
  letterSpacing: 3,
  background: "linear-gradient(135deg,#100e00,#2a2000)",
  border: "1px solid #c9a84c",
  color: "#c9a84c",
  padding: "9px 22px",
  cursor: "pointer",
  boxShadow: "0 0 12px #c9a84c33",
};

function MBtn({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 38,
        height: 38,
        background: "linear-gradient(135deg,#100e00,#1e1800)",
        border: "1px solid #4a380a",
        color: "#c9a84c",
        fontFamily: "'Cinzel',serif",
        fontSize: 11,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
