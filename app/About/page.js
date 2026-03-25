"use client";

import LuxuryRoyalBackground from "../components/Luxuryroyalbackground";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const hobbies = [
  { label: "Coding", href: null },
  { label: "Gaming", href: "/Gaming" },
  { label: "Watching Anime", href: "/Anime" },
  { label: "Traveling", href: null },
  { label: "Cooking", href: null },
  { label: "Music", href: null },
  { label: "Sports", href: null },
  { label: "Riding a Bike", href: null },
];

const skills = [
  { name: "HTML", pct: 85 },
  { name: "CSS", pct: 82 },
  { name: "Tailwind", pct: 75 },
  { name: "JavaScript", pct: 70 },
  { name: "React", pct: 68 },
  { name: "Next.js", pct: 65 },
  { name: "Git", pct: 72 },
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

  return (
    <main className="relative text-white flex items-center justify-center min-h-screen overflow-hidden px-4 py-10 md:py-8">
      <LuxuryRoyalBackground />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col xl:flex-row items-center xl:items-start gap-6 w-full max-w-[1150px] pt-10">
        {/* ── LEFT: Hobbies ── */}
        <div className="flex flex-col gap-4 w-full xl:w-[200px] xl:shrink-0 order-2 xl:order-1 pt-20">
          <p
            className={`${bebas.className} text-2xl tracking-widest`}
            style={goldText}
          >
            Hobbies
          </p>
          <ul className="flex flex-col gap-2">
            {hobbies.map(({ label, href }) => {
              const inner = (
                <li
                  key={label}
                  className={`${mono.className} text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer group`}
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
                    {label}
                  </span>
                </li>
              );
              return href ? (
                <Link key={label} href={href}>
                  {inner}
                </Link>
              ) : (
                <span key={label}>{inner}</span>
              );
            })}
          </ul>
          <div
            className="mt-2 p-3 rounded"
            style={{
              border: "1px solid rgba(255,200,50,0.15)",
              background: "rgba(255,180,0,0.04)",
            }}
          >
            <p className={`${mono.className} text-xs`} style={goldFaint}>
              P.S.
            </p>
            <p
              className={`${mono.className} text-xs mt-1`}
              style={{ ...goldDim, lineHeight: 1.6 }}
            >
              Click a hobby to learn more!
            </p>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div className="flex flex-col items-center flex-1 w-full order-1 xl:order-2">
          <h1
            className={`${bebas.className} text-4xl md:text-5xl tracking-widest mb-5`}
            style={{ ...goldText, letterSpacing: "0.12em" }}
          >
            About Me
          </h1>
          <div className="relative w-full max-w-[520px]">
            <Image
              src="/heyP.png"
              alt="Begun Khaesel"
              width={520}
              height={420}
              className="rounded-t-2xl w-full object-cover"
              style={{
                border: "1px solid rgba(255,200,50,0.25)",
                borderBottom: "none",
                boxShadow: "0 0 40px rgba(255,180,0,0.1)",
                display: "block",
              }}
            />
            <div
              className="rounded-b-2xl px-5 py-4"
              style={{
                background: "rgba(6,3,15,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,200,50,0.25)",
                borderTop: "none",
              }}
            >
              <p
                className={`${mono.className} text-sm leading-relaxed`}
                style={{ color: "rgba(255,220,150,0.8)" }}
              >
                Hi, I&apos;m{" "}
                <span style={{ color: "#ffb300" }}>Begun Khaesel</span> — an
                aspiring web developer passionate about technology and modern
                web design. I enjoy creating interactive websites using HTML,
                CSS, JavaScript, React, and Next.js. Constantly learning with
                the goal of becoming a professional developer in Mongolia.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: More About Me ── */}
        <div className="flex flex-col gap-5 w-full xl:w-[220px] xl:shrink-0 order-3 xl:order-3 pt-20">
          <p
            className={`${bebas.className} text-2xl tracking-widest`}
            style={goldText}
          >
            More About Me
          </p>
          <div>
            <p
              className={`${mono.className} text-xs tracking-[0.2em] mb-2`}
              style={goldFaint}
            >
              ACADEMY
            </p>
            <Link href="https://www.erxes.io/" target="_blank">
              <p
                className={`${mono.className} text-sm flex items-center gap-2 transition-colors duration-200`}
                style={goldMuted}
              >
                <span style={{ ...goldDim, fontSize: 10 }}>◆</span>
                Erxes Academy
              </p>
            </Link>
          </div>
          <div>
            <p
              className={`${mono.className} text-xs tracking-[0.2em] mb-3`}
              style={goldFaint}
            >
              CORE SKILLS
            </p>
            <div className="flex flex-col gap-3">
              {skills.map(({ name, pct }) => (
                <div key={name}>
                  <div className="flex justify-between mb-1">
                    <span
                      className={`${mono.className} text-xs`}
                      style={goldMuted}
                    >
                      {name}
                    </span>
                    <span
                      className={`${mono.className} text-xs`}
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
              className={`${mono.className} text-xs tracking-[0.2em] mb-2`}
              style={goldFaint}
            >
              CERTIFICATE
            </p>
            <Image
              src="/certificate.jpg"
              alt="Certificate"
              width={200}
              height={140}
              className="rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 w-full max-w-[200px]"
              onClick={() => setCertOpen(true)}
              style={{
                border: "1px solid rgba(255,200,50,0.3)",
                boxShadow: "0 0 16px rgba(255,180,0,0.15)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Certificate modal */}
      {certOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setCertOpen(false)}
        >
          <div
            className="relative w-full max-w-[800px]"
            style={{
              border: "1px solid rgba(255,200,50,0.3)",
              borderRadius: 12,
              boxShadow: "0 0 60px rgba(255,180,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/certificate.jpg"
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
          </div>
        </div>
      )}
    </main>
  );
}
