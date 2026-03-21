"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LuxuryRoyalBackground from "./components/Luxuryroyalbackground";

function Typewriter({ text, speed = 40, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed,
    );
    return () => clearTimeout(t);
  }, [displayed, started, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-5 bg-yellow-400 animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  );
}

const gold = {
  background: "linear-gradient(to right, #fff8dc, #ffd700, #fff8dc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 8px rgba(255,215,0,0.5))",
};

export default function IntroPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden font-mono">
      <LuxuryRoyalBackground />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-20 gap-6 md:gap-16 py-12 md:py-0">
        {/* HI! */}
        <div className="flex-shrink-0 select-none">
          <span
            className="font-black leading-none"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              letterSpacing: "-0.08em",
              fontSize: "clamp(6rem, 25vw, 20rem)",
              background:
                "linear-gradient(135deg, #fffde7 0%, #ffd700 50%, #b8860b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 60px rgba(255,180,0,0.5)) drop-shadow(0 0 120px rgba(255,140,0,0.25))",
            }}
          >
            HI!
          </span>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-3 max-w-lg w-full text-center md:text-left">
          <h1
            className="text-sm sm:text-base md:text-xl font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase"
            style={gold}
          >
            <Typewriter
              text="WELCOME TO BEGUN'S PORTFOLIO"
              speed={45}
              delay={300}
            />
          </h1>

          <div
            className="text-sm sm:text-base md:text-lg leading-relaxed tracking-wide"
            style={gold}
          >
            <Typewriter
              text="This website is where I share the projects I've built and the technologies I'm learning."
              speed={20}
              delay={1800}
            />
          </div>

          <div
            className="text-sm sm:text-base md:text-lg leading-relaxed tracking-wide"
            style={gold}
          >
            <Typewriter
              text="It represents my journey of becoming a better developer."
              speed={20}
              delay={4800}
            />
          </div>

          <div className="mt-4 flex justify-center md:justify-start">
            <Link
              href="/Home"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                border: "1px solid #ffd700",
                color: "#ffd700",
                boxShadow: "0 0 20px rgba(255,215,0,0.3)",
              }}
            >
              ENTER
            </Link>
          </div>
        </div>
      </div>

      {/* Scanline */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />
    </main>
  );
}
