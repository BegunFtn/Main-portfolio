"use client";

import { T } from "../components/i18n/LanguageProvider";
import "./about.css";

import PortfolioBackground from "../components/backgrounds/PortfolioBackground";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const hobbies = [
  { label: "Code", href: "/Code" },
  { label: "Game", href: "/Gaming" },
  { label: "Anime", href: "/Anime" },
  { label: "Travel", href: "/Travel" },
  { label: "Cook", href: null },
  { label: "Music", href: null },
  { label: "Sports", href: null },
  { label: "Riding a Bike", href: null },
];

const skills = [
  { name: "HTML", pct: 80 },
  { name: "CSS", pct: 80 },
  { name: "Tailwind", pct: 75 },
  { name: "JavaScript", pct: 80 },
  { name: "React", pct: 70 },
  { name: "Next.js", pct: 80 },
  { name: "Git", pct: 90 },
];

const goldText = {
  background: "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 12px rgba(255,180,0,0.4))",
};

const goldMuted = { color: "rgba(255,210,80,0.75)" };
const goldDim = { color: "rgba(255,200,50,0.45)" };
const goldFaint = { color: "rgba(255,200,50,0.5)" };

export default function About() {
  const [certOpen, setCertOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (label) => {
    setToast(label);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="about-page relative text-white flex items-center justify-center min-h-screen overflow-hidden px-4 py-10 md:py-8">
      <PortfolioBackground/>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <div className="about-layout relative z-10 flex flex-col xl:flex-row items-center xl:items-start gap-6 w-full max-w-[1150px] pt-10">
        {/* ── LEFT: Hobbies ── */}
        <div className="about-hobbies flex flex-col gap-4 w-full xl:w-[200px] xl:shrink-0 order-2 xl:order-1 pt-20">
          <p
            className={`${bebas.className} type-heading text-2xl tracking-widest`}
            style={goldText}
          ><T>{"Hobbies"}</T></p>
          <ul className="flex flex-col gap-2">
            {hobbies.map(({ label, href }) => {
              const inner = (
                <li
                  key={label}
                  className={`${mono.className} type-copy text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer group`}
                  style={goldMuted}
                >
                  <span
                    className="text-[10px] transition-colors duration-200"
                    style={goldDim}
                  >
                    ◆
                  </span>
                  <span
                    className="group-hover:translate-x-1 transition-all duration-200"
                    style={goldMuted}
                  >
                    <T>{label}</T>
                  </span>
                  {!href && (
                    <span
                      className={`${mono.className} type-copy text-[9px] tracking-widest ml-auto`}
                      style={{ color: "rgba(255,200,50,0.3)" }}
                    ><T>{"SOON"}</T></span>
                  )}
                </li>
              );

              return href ? (
                <Link key={label} href={href}>
                  {inner}
                </Link>
              ) : (
                <span key={label} onClick={() => showToast(label)}>
                  {inner}
                </span>
              );
            })}
          </ul>
          <div
            className="about-note mt-2 p-3 rounded"
            style={{
              border: "1px solid rgba(255,200,50,0.15)",
              background: "rgba(255,180,0,0.04)",
            }}
          >
            <p className={`${mono.className} type-copy text-xs`} style={goldFaint}><T>{"P.S."}</T></p>
            <p
              className={`${mono.className} type-copy text-xs mt-1`}
              style={{ ...goldDim, lineHeight: 1.6 }}
            ><T>{"Click a hobby to learn more!"}</T></p>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div className="about-center flex flex-col items-center flex-1 w-full order-1 xl:order-2">
          <h1
            className={`type-page-title ${bebas.className} type-heading text-4xl md:text-5xl tracking-widest mb-5`}
            style={{ ...goldText, letterSpacing: "0.12em" }}
          ><T>{"About Me"}</T></h1>
          <div className="about-profile-card relative w-full max-w-[520px]">
            <Image
              src="/portraits/about-portrait.png"
              alt="Begun Ganbold"
              width={520}
              height={420}
              className="about-profile-image rounded-t-2xl w-full object-cover"
              sizes="(min-width: 1000px) 520px, (min-width: 640px) 600px, 100vw"
              style={{
                border: "1px solid rgba(255,200,50,0.25)",
                borderBottom: "none",
                boxShadow: "0 0 40px rgba(255,180,0,0.1)",
                display: "block",
              }}
            />
            <div
              className="about-bio rounded-b-2xl px-5 py-4"
              style={{
                background: "rgba(6,3,15,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,200,50,0.25)",
                borderTop: "none",
              }}
            >
              <p
                className={`${mono.className} type-copy text-sm leading-relaxed`}
                style={{ color: "rgba(255,220,150,0.8)" }}
              >
                <T>{"Hi, I'm"}</T>{" "}
                <span style={{ color: "#ffb300" }}><T>{"Begun"}</T>{" "}<T>{"Ganbold"}</T></span>{" "}<T>{"— an aspiring web developer passionate about technology and modern web design. I enjoy creating interactive websites using HTML, CSS, JavaScript, React, and Next.js. Constantly learning with the goal of becoming a professional developer in Mongolia."}</T></p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: More About Me ── */}
        <div className="about-details flex flex-col gap-5 w-full xl:w-[220px] xl:shrink-0 order-3 xl:order-3 pt-20">
          <p
            className={`${bebas.className} type-heading text-2xl tracking-widest`}
            style={goldText}
          ><T>{"More About Me"}</T></p>
          <div>
            <p
              className={`${mono.className} type-copy text-xs tracking-[0.2em] mb-2`}
              style={goldFaint}
            ><T>{"ACADEMY"}</T></p>
            <Link href="https://academy.erxes.mn/" target="_blank">
              <p
                className={`${mono.className} type-copy text-sm flex items-center gap-2 transition-colors duration-200`}
                style={goldMuted}
              >
                <span style={{ ...goldDim, fontSize: 10 }}>◆</span>
                Erxes Academy
              </p>
            </Link>
          </div>
          <div>
            <p
              className={`${mono.className} type-copy text-xs tracking-[0.2em] mb-3`}
              style={goldFaint}
            ><T>{"CORE SKILLS"}</T></p>
            <div className="about-skills flex flex-col gap-3">
              {skills.map(({ name, pct }) => (
                <div key={name}>
                  <div className="about-skill-label flex justify-between mb-1">
                    <span
                      className={`${mono.className} type-copy text-xs`}
                      style={goldMuted}
                    >
                      {name}
                    </span>
                    <span
                      className={`${mono.className} type-copy text-xs`}
                      style={goldDim}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="h-[3px] w-full rounded-full"
                    style={{ background: "rgba(255,180,0,0.1)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(to right, #7a4400, #ffb300)",
                        boxShadow: "0 0 6px rgba(255,180,0,0.4)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p
              className={`${mono.className} type-copy text-xs tracking-[0.2em] mb-2`}
              style={goldFaint}
            ><T>{"CERTIFICATE"}</T></p>
            <Image
              src="/certificates/frontend-development.png"
              alt="Certificate"
              width={200}
              height={140}
              className="about-certificate rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 w-full max-w-[200px]"
              onClick={() => setCertOpen(true)}
              style={{
                border: "1px solid rgba(255,200,50,0.3)",
                boxShadow: "0 0 16px rgba(255,180,0,0.15)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Certificate modal ── */}
     <AnimatePresence>
  {certOpen && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setCertOpen(false)}
    >
     <motion.div
  initial={{ scale: 0.5, opacity: 0, rotateY: 360 }}
  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
  exit={{ scale: 0.5, opacity: 0, rotateY: 360 }}
  transition={{ type: "spring", damping: 18, stiffness: 150 }}
  style={{
    border: "1px solid rgba(255,200,50,0.3)",
    borderRadius: 12,
    boxShadow: "0 0 60px rgba(255,180,0,0.2)",
    perspective: 1000,
  }}
  className="relative w-full max-w-[800px]"
  onClick={(e) => e.stopPropagation()}
>
        <Image
          src="/certificates/frontend-development.png"
          alt="Certificate"
          width={800}
          height={560}
          className="rounded-xl w-full"
          style={{ display: "block" }}
        />
        <button
          onClick={() => setCertOpen(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255,180,0,0.15)",
            border: "1px solid rgba(255,200,50,0.4)",
            color: "#ffb300",
          }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* ── Coming Soon Toast ── */}
      {toast && (
        <div
          className={`${mono.className} type-copy fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-lg text-sm pointer-events-none`}
          style={{
            background: "rgba(6,3,15,0.97)",
            border: "1px solid rgba(255,200,50,0.4)",
            boxShadow:
              "0 0 40px rgba(255,180,0,0.25), 0 4px 24px rgba(0,0,0,0.6)",
            color: "rgba(255,200,50,0.6)",
            animation: "toastIn 0.25s ease",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "rgba(255,200,50,0.4)", fontSize: 10 }}>◆</span>
          <span style={{ color: "rgba(255,210,80,1)" }}><T>{toast}</T></span>
          <span><T>{"— coming soon"}</T></span>
          <style>{`
            @keyframes toastIn {
              from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
              to   { opacity: 1; transform: translateX(0) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}
