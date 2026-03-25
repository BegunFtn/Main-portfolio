"use client";
import { useEffect, useRef, useCallback, useState } from "react";

const COLS = 10,
  ROWS = 18,
  CELL = 24;

const PIECES = [
  { shape: [[1, 1, 1, 1]], color: "#00d4ff" },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#c9a84c",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#d4a0d4",
  },
  {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "#3aff8a",
  },
  {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "#ff8c42",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#ff4466",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#ffe49a",
  },
];

function newBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function rotate(s) {
  return Array.from({ length: s[0].length }, (_, c) =>
    Array.from({ length: s.length }, (_, r) => s[s.length - 1 - r][c]),
  );
}

function rand() {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    ...p,
    shape: p.shape.map((r) => [...r]),
    x: Math.floor((COLS - p.shape[0].length) / 2),
    y: 0,
  };
}

function fits(b, shape, x, y) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) {
        const nr = y + r,
          nc = x + c;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || b[nr][nc])
          return false;
      }
  return true;
}

export default function TetrisGame() {
  const [board, setBoard] = useState(newBoard());
  const [cur, setCur] = useState(rand());
  const [next, setNext] = useState(rand());
  const [gs, setGs] = useState("IDLE");
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [best, setBest] = useState(0);
  const [clearing, setClearing] = useState([]);

  // Smooth piece position (pixel-level for animation)
  const [piecePixelY, setPiecePixelY] = useState(0);
  const [piecePixelX, setPiecePixelX] = useState(0);
  const animRef = useRef(null);
  const targetYRef = useRef(0);
  const targetXRef = useRef(0);
  const currentPxYRef = useRef(0);
  const currentPxXRef = useRef(0);
  const lastAnimTime = useRef(null);

  const bRef = useRef(board),
    cRef = useRef(cur),
    nRef = useRef(next);
  const gsRef = useRef("IDLE"),
    scoreRef = useRef(0),
    bestRef = useRef(0);
  const ivRef = useRef(null);

  bRef.current = board;
  cRef.current = cur;
  nRef.current = next;
  gsRef.current = gs;
  scoreRef.current = score;
  bestRef.current = best;

  // Smooth animation loop
  useEffect(() => {
    const LERP_SPEED = 18; // higher = faster catch-up

    const animate = (timestamp) => {
      if (!lastAnimTime.current) lastAnimTime.current = timestamp;
      const dt = Math.min((timestamp - lastAnimTime.current) / 1000, 0.05);
      lastAnimTime.current = timestamp;

      const ty = targetYRef.current;
      const tx = targetXRef.current;
      const cy = currentPxYRef.current;
      const cx = currentPxXRef.current;

      const newY = cy + (ty - cy) * Math.min(1, LERP_SPEED * dt);
      const newX = cx + (tx - cx) * Math.min(1, LERP_SPEED * dt);

      if (Math.abs(newY - cy) > 0.05 || Math.abs(newX - cx) > 0.05) {
        currentPxYRef.current = newY;
        currentPxXRef.current = newX;
        setPiecePixelY(newY);
        setPiecePixelX(newX);
      } else {
        currentPxYRef.current = ty;
        currentPxXRef.current = tx;
        setPiecePixelY(ty);
        setPiecePixelX(tx);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Sync target pixel position when cur changes
  useEffect(() => {
    targetYRef.current = cur.y * CELL;
    targetXRef.current = cur.x * CELL;
  }, [cur.y, cur.x]);

  const spd = (lv) => Math.max(80, 550 - (lv - 1) * 50);

  const spawnNext = useCallback(() => {
    const n = nRef.current;
    if (!fits(bRef.current, n.shape, n.x, 0)) {
      const f = scoreRef.current;
      setGs("OVER");
      if (f > bestRef.current) setBest(f);
      return;
    }
    // Snap new piece to top instantly
    currentPxYRef.current = 0;
    currentPxXRef.current = n.x * CELL;
    targetYRef.current = 0;
    targetXRef.current = n.x * CELL;
    setPiecePixelY(0);
    setPiecePixelX(n.x * CELL);
    setCur({ ...n, y: 0 });
    setNext(rand());
  }, []);

  const lock = useCallback(() => {
    const c = cRef.current,
      b = bRef.current.map((r) => [...r]);
    c.shape.forEach((row, r) =>
      row.forEach((v, col) => {
        if (v) b[c.y + r][c.x + col] = c.color;
      }),
    );
    const cleared = [];
    b.forEach((row, i) => {
      if (row.every((v) => v !== null)) cleared.push(i);
    });
    if (cleared.length) {
      setClearing(cleared);
      setTimeout(() => {
        const nb = b.filter((_, i) => !cleared.includes(i));
        while (nb.length < ROWS) nb.unshift(Array(COLS).fill(null));
        setBoard(nb);
        bRef.current = nb;
        setClearing([]);
        const pts = [0, 100, 300, 500, 800][cleared.length];
        setScore((p) => {
          const ns = p + pts;
          if (ns > bestRef.current) setBest(ns);
          return ns;
        });
        setLines((l) => {
          const nl = l + cleared.length;
          setLevel(Math.floor(nl / 10) + 1);
          return nl;
        });
        spawnNext();
      }, 220);
    } else {
      setBoard(b);
      bRef.current = b;
      spawnNext();
    }
  }, [spawnNext]);

  const levelRef = useRef(level);
  levelRef.current = level;

  const resetInterval = useCallback(() => {
    if (ivRef.current) clearInterval(ivRef.current);
    ivRef.current = setInterval(() => {
      if (gsRef.current !== "PLAYING") return;
      const c = cRef.current;
      if (fits(bRef.current, c.shape, c.x, c.y + 1))
        setCur((p) => ({ ...p, y: p.y + 1 }));
      else lock();
    }, spd(levelRef.current));
  }, [lock]);

  const moveDown = useCallback(() => {
    if (gsRef.current !== "PLAYING") return;
    const c = cRef.current;
    if (fits(bRef.current, c.shape, c.x, c.y + 1)) {
      setCur((p) => ({ ...p, y: p.y + 1 }));
      resetInterval();
    }
  }, [resetInterval]);

  const drop = useCallback(() => {
    if (gsRef.current !== "PLAYING") return;
    const c = cRef.current;
    if (fits(bRef.current, c.shape, c.x, c.y + 1))
      setCur((p) => ({ ...p, y: p.y + 1 }));
    else lock();
  }, [lock]);

  useEffect(() => {
    if (gs !== "PLAYING") return;
    resetInterval();
    return () => {
      if (ivRef.current) clearInterval(ivRef.current);
    };
  }, [gs, level]);

  const startGame = useCallback(() => {
    const b = newBoard(),
      c = rand(),
      n = rand();
    setBoard(b);
    bRef.current = b;
    currentPxYRef.current = 0;
    currentPxXRef.current = c.x * CELL;
    targetYRef.current = 0;
    targetXRef.current = c.x * CELL;
    setPiecePixelY(0);
    setPiecePixelX(c.x * CELL);
    setCur(c);
    setNext(n);
    setScore(0);
    setLines(0);
    setLevel(1);
    setClearing([]);
    setGs("PLAYING");
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        const s = gsRef.current;
        if (s === "IDLE" || s === "OVER") startGame();
        else if (s === "PLAYING") setGs("PAUSED");
        else setGs("PLAYING");
        return;
      }
      if (gsRef.current !== "PLAYING") return;
      const c = cRef.current,
        b = bRef.current;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        if (fits(b, c.shape, c.x - 1, c.y))
          setCur((p) => ({ ...p, x: p.x - 1 }));
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        if (fits(b, c.shape, c.x + 1, c.y))
          setCur((p) => ({ ...p, x: p.x + 1 }));
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        moveDown();
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        const rot = rotate(c.shape);
        if (fits(b, rot, c.x, c.y)) setCur((p) => ({ ...p, shape: rot }));
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (e.repeat) return;
        let ny = c.y;
        while (fits(b, c.shape, c.x, ny + 1)) ny++;
        targetYRef.current = ny * CELL;
        currentPxYRef.current = ny * CELL;
        setPiecePixelY(ny * CELL);
        setCur((p) => ({ ...p, y: ny }));
        setTimeout(lock, 16);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drop, moveDown, lock, startGame]);

  const ghostY = (() => {
    let gy = cur.y;
    while (fits(board, cur.shape, cur.x, gy + 1)) gy++;
    return gy;
  })();
  const w = COLS * CELL,
    h = ROWS * CELL;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        fontFamily: "'Cinzel', serif",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid #4a380a",
          boxShadow:
            "0 0 20px rgba(201,168,76,0.15), inset 0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            width: w,
            height: h,
            background: "linear-gradient(135deg,#0d1020,#090c1a)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg
            style={{ position: "absolute", top: 0, left: 0, opacity: 0.05 }}
            width={w}
            height={h}
          >
            {Array.from({ length: ROWS + 1 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * CELL}
                x2={w}
                y2={i * CELL}
                stroke="#c9a84c"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: COLS + 1 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * CELL}
                y1={0}
                x2={i * CELL}
                y2={h}
                stroke="#c9a84c"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* Locked board cells */}
          {board.map((row, r) =>
            row.map(
              (cell, c) =>
                cell && (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      position: "absolute",
                      left: c * CELL + 1,
                      top: r * CELL + 1,
                      width: CELL - 2,
                      height: CELL - 2,
                      background: clearing.includes(r)
                        ? `radial-gradient(circle at 50%,#ffe49a,${cell})`
                        : `radial-gradient(circle at 35% 30%,${cell}cc,${cell}77)`,
                      border: `1px solid ${cell}44`,
                      boxShadow: clearing.includes(r)
                        ? `0 0 20px #ffe49a`
                        : `inset 0 1px 0 rgba(255,255,255,0.15)`,
                      opacity: clearing.includes(r) ? 0 : 1,
                      transition: clearing.includes(r) ? "all 0.2s" : undefined,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>
                ),
            ),
          )}

          {/* Ghost piece */}
          {gs === "PLAYING" &&
            ghostY !== cur.y &&
            cur.shape.map((row, r) =>
              row.map((v, c) =>
                v ? (
                  <div
                    key={`g${r}-${c}`}
                    style={{
                      position: "absolute",
                      left: (cur.x + c) * CELL + 1,
                      top: (ghostY + r) * CELL + 1,
                      width: CELL - 2,
                      height: CELL - 2,
                      border: `1px solid ${cur.color}33`,
                      background: `${cur.color}10`,
                    }}
                  />
                ) : null,
              ),
            )}

          {/* Active piece — smoothly animated */}
          {gs === "PLAYING" &&
            cur.shape.map((row, r) =>
              row.map((v, c) =>
                v ? (
                  <div
                    key={`c${r}-${c}`}
                    style={{
                      position: "absolute",
                      // Use smooth pixel position for rendering
                      left: piecePixelX + c * CELL + 1,
                      top: piecePixelY + r * CELL + 1,
                      width: CELL - 2,
                      height: CELL - 2,
                      background: `radial-gradient(circle at 35% 30%,${cur.color}ee,${cur.color}88)`,
                      border: `1px solid ${cur.color}77`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2),0 0 6px ${cur.color}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // Smooth micro-transitions for rotation
                      transition: "width 0.05s, height 0.05s",
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.3)",
                      }}
                    />
                  </div>
                ) : null,
              ),
            )}

          {(gs === "IDLE" || gs === "OVER" || gs === "PAUSED") && (
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
                  LAY THY STONES
                </div>
              )}
              {gs === "OVER" && (
                <>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#ff4444",
                      letterSpacing: 3,
                      textShadow: "0 0 15px #ff444488",
                    }}
                  >
                    KINGDOM FALLS
                  </div>
                  <div style={{ fontSize: 13, color: "#c9a84c" }}>
                    {score}{" "}
                    <span style={{ fontSize: 7, color: "#8b6914" }}>PTS</span>
                  </div>
                </>
              )}
              {gs === "PAUSED" && (
                <div
                  style={{
                    fontSize: 11,
                    color: "#a0c8ff",
                    letterSpacing: 3,
                    animation: "regal-blink 1.5s infinite",
                  }}
                >
                  REALM RESTS
                </div>
              )}
              <button onClick={startGame} style={btnStyle("#c9a84c")}>
                {gs === "OVER" ? "✦ RISE AGAIN ✦" : "✦ BEGIN ✦"}
              </button>
              <div
                style={{
                  fontSize: 6,
                  color: "#4a3810",
                  letterSpacing: 1,
                  textAlign: "center",
                  lineHeight: 2.2,
                }}
              >
                ←→ MOVE · ↑ ROTATE · ↓ DROP · SPACE HARD · P PAUSE
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minWidth: 80,
        }}
      >
        {[
          { l: "SCORE", v: score, c: "#c9a84c" },
          { l: "LINES", v: lines, c: "#3aff8a" },
          { l: "LEVEL", v: level, c: "#a0c8ff" },
          { l: "BEST", v: best, c: "#d4a0d4" },
        ].map(({ l, v, c }) => (
          <div
            key={l}
            style={{
              border: "1px solid #4a380a",
              padding: "7px 10px",
              background: "linear-gradient(135deg,#0d1020,#090c1a)",
            }}
          >
            <div
              style={{
                fontSize: 6,
                color: "#5a4a20",
                letterSpacing: 2,
                marginBottom: 3,
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 13,
                color: c,
                textShadow: `0 0 8px ${c}88`,
                fontWeight: 700,
                transition: "color 0.3s",
              }}
            >
              {v}
            </div>
          </div>
        ))}

        <div
          style={{
            border: "1px solid #4a380a",
            padding: "7px 10px",
            background: "linear-gradient(135deg,#0d1020,#090c1a)",
          }}
        >
          <div
            style={{
              fontSize: 6,
              color: "#5a4a20",
              letterSpacing: 2,
              marginBottom: 6,
            }}
          >
            NEXT
          </div>
          <div style={{ width: 56, height: 48, position: "relative" }}>
            {next.shape.map((row, r) =>
              row.map((v, c) =>
                v ? (
                  <div
                    key={`n${r}-${c}`}
                    style={{
                      position: "absolute",
                      left: c * 14 + (4 - next.shape[0].length) * 7,
                      top: r * 14 + (3 - next.shape.length) * 7,
                      width: 12,
                      height: 12,
                      background: `radial-gradient(circle at 35%,${next.color}ee,${next.color}88)`,
                      border: `1px solid ${next.color}55`,
                      boxShadow: `0 0 4px ${next.color}44`,
                      transition: "all 0.15s ease",
                    }}
                  />
                ) : null,
              ),
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <MBtn
            onAction={() => {
              const rot = rotate(cRef.current.shape);
              if (fits(bRef.current, rot, cRef.current.x, cRef.current.y))
                setCur((p) => ({ ...p, shape: rot }));
            }}
          >
            ↺
          </MBtn>
          <div style={{ display: "flex", gap: 3 }}>
            <MBtn
              repeat
              onAction={() => {
                if (
                  fits(
                    bRef.current,
                    cRef.current.shape,
                    cRef.current.x - 1,
                    cRef.current.y,
                  )
                )
                  setCur((p) => ({ ...p, x: p.x - 1 }));
              }}
            >
              ◄
            </MBtn>
            <MBtn
              onAction={() => {
                if (gs === "IDLE" || gs === "OVER") startGame();
                else if (gs === "PLAYING") setGs("PAUSED");
                else setGs("PLAYING");
              }}
              style={{ fontSize: 8 }}
            >
              {gs === "PLAYING" ? "⏸" : "▶"}
            </MBtn>
            <MBtn
              repeat
              onAction={() => {
                if (
                  fits(
                    bRef.current,
                    cRef.current.shape,
                    cRef.current.x + 1,
                    cRef.current.y,
                  )
                )
                  setCur((p) => ({ ...p, x: p.x + 1 }));
              }}
            >
              ►
            </MBtn>
          </div>
          <MBtn repeat onAction={moveDown}>
            ▼
          </MBtn>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (c) => ({
  fontFamily: "'Cinzel',serif",
  fontSize: 9,
  letterSpacing: 3,
  background: "linear-gradient(135deg,#100e00,#2a2000)",
  border: `1px solid ${c}`,
  color: c,
  padding: "8px 18px",
  cursor: "pointer",
  boxShadow: `0 0 12px ${c}33`,
});

// Hold-to-repeat button:
// - onAction fires immediately on press
// - if repeat=true: after DELAY ms fires repeatedly every INTERVAL ms
// - accelerates: after ACC_AFTER repeats, interval halves
const HOLD_DELAY = 180;
const HOLD_INTERVAL = 80;
const HOLD_FAST = 40;
const HOLD_ACC_AFTER = 8;

function MBtn({ children, onAction, repeat = false, style }) {
  const holdRef = useRef(null);
  const countRef = useRef(0);

  const startHold = () => {
    onAction();
    if (!repeat) return;
    countRef.current = 0;
    holdRef.current = setTimeout(function fire() {
      onAction();
      countRef.current++;
      const interval =
        countRef.current >= HOLD_ACC_AFTER ? HOLD_FAST : HOLD_INTERVAL;
      holdRef.current = setTimeout(fire, interval);
    }, HOLD_DELAY);
  };

  const stopHold = () => {
    if (holdRef.current) {
      clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  };

  return (
    <button
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.92)";
        startHold();
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        stopHold();
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        stopHold();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        e.currentTarget.style.transform = "scale(0.92)";
        startHold();
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        stopHold();
      }}
      onTouchCancel={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        stopHold();
      }}
      style={{
        width: 34,
        height: 34,
        background: "linear-gradient(135deg,#100e00,#1e1800)",
        border: "1px solid #4a380a",
        color: "#c9a84c",
        fontFamily: "'Cinzel',serif",
        fontSize: 11,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.08s",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
