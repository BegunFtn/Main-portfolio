"use client";
import { useEffect, useRef, useCallback, useState } from "react";

const GRID = 18;
const CELL = 22;
const INIT_SPEED = 145;
const OPP = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };

function rndFood(snake) {
  let p;
  do {
    p = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

export default function SnakeGame() {
  const initSnake = [
    { x: 9, y: 9 },
    { x: 8, y: 9 },
    { x: 7, y: 9 },
  ];
  const [snake, setSnake] = useState(initSnake);
  const [food, setFood] = useState({ x: 14, y: 9 });
  const [dir, setDir] = useState("RIGHT");
  const [gs, setGs] = useState("IDLE");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(INIT_SPEED);

  const dirRef = useRef("RIGHT");
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const scoreRef = useRef(0);
  const gsRef = useRef("IDLE");
  const ivRef = useRef(null);
  const speedRef = useRef(INIT_SPEED);

  snakeRef.current = snake;
  foodRef.current = food;
  scoreRef.current = score;
  gsRef.current = gs;
  speedRef.current = speed;

  const segPixelsRef = useRef(
    initSnake.map((s) => ({ x: s.x * CELL, y: s.y * CELL })),
  );
  const [segPixels, setSegPixels] = useState(segPixelsRef.current);
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);
  const prevSnakeRef = useRef(initSnake);

  useEffect(() => {
    const LERP = 22;
    const animate = (ts) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = ts;
      const logical = snakeRef.current;
      const pixels = segPixelsRef.current;
      while (pixels.length < logical.length)
        pixels.push({ ...pixels[pixels.length - 1] });
      if (pixels.length > logical.length) pixels.splice(logical.length);
      let changed = false;
      for (let i = 0; i < logical.length; i++) {
        const tx = logical[i].x * CELL,
          ty = logical[i].y * CELL;
        const cx = pixels[i].x,
          cy = pixels[i].y;
        const nx = cx + (tx - cx) * Math.min(1, LERP * dt);
        const ny = cy + (ty - cy) * Math.min(1, LERP * dt);
        if (Math.abs(nx - cx) > 0.05 || Math.abs(ny - cy) > 0.05) {
          pixels[i] = { x: nx, y: ny };
          changed = true;
        } else if (pixels[i].x !== tx || pixels[i].y !== ty) {
          pixels[i] = { x: tx, y: ty };
          changed = true;
        }
      }
      if (changed) setSegPixels([...pixels]);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const reset = useCallback(() => {
    const s = [
      { x: 9, y: 9 },
      { x: 8, y: 9 },
      { x: 7, y: 9 },
    ];
    segPixelsRef.current = s.map((seg) => ({
      x: seg.x * CELL,
      y: seg.y * CELL,
    }));
    setSegPixels([...segPixelsRef.current]);
    prevSnakeRef.current = s;
    setSnake(s);
    setFood(rndFood(s));
    setDir("RIGHT");
    dirRef.current = "RIGHT";
    setScore(0);
    setSpeed(INIT_SPEED);
    setLevel(1);
  }, []);

  const loopRef = useRef(null);
  loopRef.current = () => {
    if (gsRef.current !== "PLAYING") return;
    const cur = snakeRef.current,
      f = foodRef.current,
      d = dirRef.current;
    const h = cur[0];
    const nh =
      d === "UP"
        ? { x: h.x, y: h.y - 1 }
        : d === "DOWN"
          ? { x: h.x, y: h.y + 1 }
          : d === "LEFT"
            ? { x: h.x - 1, y: h.y }
            : { x: h.x + 1, y: h.y };
    if (
      nh.x < 0 ||
      nh.x >= GRID ||
      nh.y < 0 ||
      nh.y >= GRID ||
      cur.some((s) => s.x === nh.x && s.y === nh.y)
    ) {
      setGs("OVER");
      setBest((b) => Math.max(b, scoreRef.current));
      return;
    }
    const ate = nh.x === f.x && nh.y === f.y;
    const ns = ate ? [nh, ...cur] : [nh, ...cur.slice(0, -1)];
    if (ate) {
      setFood(rndFood(ns));
      setScore((p) => {
        const n = p + 10;
        const lv = Math.floor(n / 60) + 1;
        setLevel(lv);
        setSpeed(Math.max(60, INIT_SPEED - (lv - 1) * 14));
        return n;
      });
    }
    if (segPixelsRef.current.length > 0) {
      const prevHead = segPixelsRef.current[0];
      segPixelsRef.current = [
        { x: prevHead.x, y: prevHead.y },
        ...segPixelsRef.current.slice(0, ate ? undefined : ns.length - 1),
      ];
    }
    prevSnakeRef.current = ns;
    setSnake(ns);
  };

  const loop = useCallback(() => loopRef.current(), []);

  useEffect(() => {
    if (gs !== "PLAYING") return;
    if (ivRef.current) clearInterval(ivRef.current);
    ivRef.current = setInterval(loop, speed);
    return () => {
      if (ivRef.current) clearInterval(ivRef.current);
    };
  }, [speed, gs, loop]);

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: "UP",
        w: "UP",
        W: "UP",
        ArrowDown: "DOWN",
        s: "DOWN",
        S: "DOWN",
        ArrowLeft: "LEFT",
        a: "LEFT",
        A: "LEFT",
        ArrowRight: "RIGHT",
        d: "RIGHT",
        D: "RIGHT",
      };
      if (e.key === " ") {
        e.preventDefault();
        const s = gsRef.current;
        if (s === "IDLE" || s === "OVER") {
          reset();
          setGs("PLAYING");
        } else if (s === "PLAYING") setGs("PAUSED");
        else setGs("PLAYING");
        return;
      }
      if (map[e.key]) {
        e.preventDefault();
        const nd = map[e.key];
        if (nd !== OPP[dirRef.current]) {
          dirRef.current = nd;
          setDir(nd);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  const move = (d) => {
    if (gs === "PLAYING" && d !== OPP[dirRef.current]) {
      dirRef.current = d;
      setDir(d);
    }
  };

  const w = GRID * CELL,
    h = GRID * CELL;
  const total = segPixels.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        fontFamily: "'Cinzel', serif",
      }}
    >
      <div style={{ display: "flex", gap: 28 }}>
        {[
          { l: "SCORE", v: score, c: "#00d4ff" },
          { l: "LVL", v: level, c: "#88bbff" },
          { l: "BEST", v: best, c: "#ffaa44" },
        ].map(({ l, v, c }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 7,
                color: "#0a2040",
                letterSpacing: 2,
                marginBottom: 2,
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 14,
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
          position: "relative",
          border: "1px solid #0a2a48",
          boxShadow:
            "0 0 28px rgba(0,150,255,0.14), inset 0 0 40px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            width: w,
            height: h,
            background: "linear-gradient(160deg,#020a14,#061422,#040d1a)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg
            style={{ position: "absolute", top: 0, left: 0, opacity: 0.06 }}
            width={w}
            height={h}
          >
            {Array.from({ length: GRID + 1 }).map((_, i) => (
              <g key={i}>
                <line
                  x1={i * CELL}
                  y1={0}
                  x2={i * CELL}
                  y2={h}
                  stroke="#3090ff"
                  strokeWidth="0.5"
                />
                <line
                  x1={0}
                  y1={i * CELL}
                  x2={w}
                  y2={i * CELL}
                  stroke="#3090ff"
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </svg>

          {/* Food — warm orange orb */}
          <div
            style={{
              position: "absolute",
              left: food.x * CELL + 2,
              top: food.y * CELL + 2,
              width: CELL - 4,
              height: CELL - 4,
              background:
                "radial-gradient(circle at 35% 28%, #fff0a0, #ffaa00, #cc5500)",
              borderRadius: "50%",
              boxShadow: "0 0 8px #ffaa00, 0 0 18px rgba(255,140,0,0.35)",
            }}
          />

          {/* Snake — cyan head fading to deep navy tail */}
          {segPixels.map((px, i) => {
            const t = total <= 1 ? 0 : i / (total - 1);
            const g2 = Math.round(210 - 130 * t);
            const b2 = Math.round(255 - 110 * t);
            const alpha = Math.max(0.25, 1 - t * 0.7);
            const isHead = i === 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: px.x + 1,
                  top: px.y + 1,
                  width: CELL - 2,
                  height: CELL - 2,
                  background: isHead
                    ? "radial-gradient(circle at 38% 30%, #bbffff, #00ccee, #004477)"
                    : `rgba(0,${Math.max(0, Math.min(255, g2))},${Math.max(0, Math.min(255, b2))},${alpha})`,
                  borderRadius: isHead ? 6 : 3,
                  boxShadow: isHead
                    ? "0 0 14px rgba(0,220,255,0.85)"
                    : i < 4
                      ? "0 0 4px rgba(0,140,220,0.2)"
                      : undefined,
                  border: isHead
                    ? "1px solid rgba(160,255,255,0.65)"
                    : `1px solid rgba(0,${Math.max(50, 150 - i * 4)},${Math.max(60, 200 - i * 5)},0.18)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isHead && (
                  <span
                    style={{ opacity: 0.75, color: "#dfffff", fontSize: 6 }}
                  >
                    {dir === "UP"
                      ? "▲"
                      : dir === "DOWN"
                        ? "▼"
                        : dir === "LEFT"
                          ? "◄"
                          : "►"}
                  </span>
                )}
              </div>
            );
          })}

          {(gs === "IDLE" || gs === "OVER" || gs === "PAUSED") && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(2,8,18,0.93)",
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
                    color: "#00ccff",
                    letterSpacing: 4,
                    textShadow: "0 0 15px #00ccff88",
                    animation: "regal-blink 1.5s infinite",
                  }}
                >
                  BEGIN THY QUEST
                </div>
              )}
              {gs === "OVER" && (
                <>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#ff5566",
                      letterSpacing: 3,
                      textShadow: "0 0 15px #ff556688",
                    }}
                  >
                    SERPENT FALLS
                  </div>
                  <div style={{ fontSize: 13, color: "#00ccff" }}>
                    {score}{" "}
                    <span style={{ fontSize: 7, color: "#005577" }}>PTS</span>
                  </div>
                </>
              )}
              {gs === "PAUSED" && (
                <div
                  style={{
                    fontSize: 11,
                    color: "#66ccff",
                    letterSpacing: 3,
                    animation: "regal-blink 1.5s infinite",
                  }}
                >
                  REALM RESTS
                </div>
              )}
              <button
                onClick={() => {
                  reset();
                  setGs("PLAYING");
                }}
                style={btnStyle("#00aadd")}
              >
                {gs === "OVER" ? "✦ RISE AGAIN ✦" : "✦ COMMENCE ✦"}
              </button>
              <div
                style={{
                  fontSize: 7,
                  color: "#082030",
                  letterSpacing: 1,
                  textAlign: "center",
                  lineHeight: 2,
                }}
              >
                WASD / ARROWS · SPACE PAUSE
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <MBtn onClick={() => move("UP")}>▲</MBtn>
        <div style={{ display: "flex", gap: 3 }}>
          <MBtn onClick={() => move("LEFT")}>◄</MBtn>
          <MBtn
            onClick={() => {
              if (gs === "IDLE" || gs === "OVER") {
                reset();
                setGs("PLAYING");
              } else if (gs === "PLAYING") setGs("PAUSED");
              else setGs("PLAYING");
            }}
            style={{ fontSize: 9 }}
          >
            {gs === "PLAYING" ? "⏸" : "▶"}
          </MBtn>
          <MBtn onClick={() => move("RIGHT")}>►</MBtn>
        </div>
        <MBtn onClick={() => move("DOWN")}>▼</MBtn>
      </div>
    </div>
  );
}

const btnStyle = (c) => ({
  fontFamily: "'Cinzel', serif",
  fontSize: 10,
  letterSpacing: 3,
  background: "linear-gradient(135deg,#020c18,#051828)",
  border: `1px solid ${c}`,
  color: c,
  padding: "9px 22px",
  cursor: "pointer",
  boxShadow: `0 0 14px ${c}44`,
});

function MBtn({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 38,
        height: 38,
        background: "linear-gradient(135deg,#020c18,#061828)",
        border: "1px solid #0a2a44",
        color: "#00aacc",
        fontFamily: "'Cinzel',serif",
        fontSize: 11,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.08s",
        userSelect: "none",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}
