"use client";

import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import LuxuryRoyalBackground from "../components/Luxuryroyalbackground";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const socials = [
  { href: "https://github.com/BegunFtn", img: "/github.png", label: "GitHub" },
  {
    href: "https://www.instagram.com/begun4h/",
    img: "/instagram.png",
    label: "Instagram",
  },
  {
    href: "https://discord.com/users/begun4h",
    img: "/discord.png",
    label: "Discord",
  },
];

export default function Home() {
  return (
    <main className="relative text-white flex items-center justify-center min-h-screen overflow-hidden">
      <LuxuryRoyalBackground />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 flex flex-row items-stretch xl:w-[1150px] xl:h-[680px] rounded-2xl overflow-hidden mt-6"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255,200,50,0.15)",
          boxShadow:
            "0 0 80px rgba(255,180,0,0.08), inset 0 0 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-yellow-400/60 z-20" />
        <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-yellow-400/60 z-20" />
        <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-yellow-400/60 z-20" />
        <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-yellow-400/60 z-20" />

        {/* Vertical gold line divider */}
        <div
          className="absolute left-[52%] top-12 bottom-12 w-px z-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,200,50,0.3), transparent)",
          }}
        />

        {/* ── LEFT ── */}
        <div className="relative z-10 flex flex-col justify-center pl-16 w-[52%] gap-3">
          <p
            className={`${mono.className} text-xs tracking-[0.4em] uppercase`}
            style={{ color: "rgba(255,200,50,0.6)" }}
          >
            // front-end developer
          </p>

          <div>
            <p
              className={`${mono.className} text-base`}
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
            >
              Hi, I&apos;m
            </p>
            <h1
              className={`${bebas.className} leading-none`}
              style={{
                fontSize: "clamp(4rem, 7vw, 6.5rem)",
                letterSpacing: "0.03em",
                background:
                  "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,180,0,0.4))",
              }}
            >
              Begun
              <br />
              Khaesel
            </h1>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="w-4 h-px" style={{ background: "#ffb300" }} />
            <p
              className={`${mono.className} text-sm`}
              style={{
                color: "rgba(255,220,100,0.8)",
                letterSpacing: "0.12em",
              }}
            >
              UI Designer
            </p>
            <span className="w-1 h-1 rounded-full bg-yellow-500/60" />
            <p
              className={`${mono.className} text-sm`}
              style={{
                color: "rgba(255,220,100,0.8)",
                letterSpacing: "0.12em",
              }}
            >
              Next.js
            </p>
          </div>

          <div
            className="w-20 h-px mt-2"
            style={{
              background: "linear-gradient(to right, #ffb300, transparent)",
            }}
          />

          <div className="flex items-center gap-4 mt-2">
            {socials.map(({ href, img, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="w-9 h-9 bg-cover bg-center cursor-pointer transition-all duration-300 hover:scale-125"
                  style={{
                    backgroundImage: `url('${img}')`,
                    filter:
                      "drop-shadow(0 0 5px rgba(255,180,0,0.35)) brightness(0.95)",
                  }}
                  aria-label={label}
                />
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/About">
              <button
                className={`${mono.className} text-sm tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300`}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,180,0,0.5)",
                  color: "#ffe082",
                  clipPath:
                    "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,180,0,0.15)";
                  e.currentTarget.style.borderColor = "#ffb300";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(255,180,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,180,0,0.5)";
                  e.currentTarget.style.color = "#ffe082";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View About Me →
              </button>
            </Link>
          </div>
        </div>

        {/* ── RIGHT — profile ── */}
        <div className="relative z-10 flex items-end justify-center w-[48%]">
          <div
            className="w-full h-[660px] bg-contain bg-bottom bg-no-repeat"
            style={{
              backgroundImage: "url('/profile.png')",
              filter: "drop-shadow(0 0 40px rgba(255,180,0,0.2))",
            }}
          />
        </div>
      </div>
    </main>
  );
}
