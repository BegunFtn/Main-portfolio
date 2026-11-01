"use client";

import { T } from "../components/i18n/LanguageProvider";

import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import PortfolioBackground from "../components/backgrounds/PortfolioBackground";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const socials = [
  { href: "https://github.com/BegunFtn", img: "/social/github.png", label: "GitHub" },
  {
    href: "https://www.instagram.com/begun4h/",
    img: "/social/instagram.png",
    label: "Instagram",
  },
  {
    href: "https://discord.gg/tmKJQ8An",
    img: "/social/discord.png",
    label: "Discord",
  },
];

export default function Home() {
  return (
    <main className="home-page relative text-white min-h-screen overflow-hidden">
      <PortfolioBackground />

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
        className="home-card relative z-10 rounded-2xl overflow-hidden"
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

        <div className="home-divider" aria-hidden="true" />

        {/* ── LEFT ── */}
        <div className="home-copy relative z-10">
          <p
            className={`${mono.className} type-copy text-xs tracking-[0.4em] uppercase`}
            style={{ color: "rgba(255,200,50,0.6)" }}
          ><T>{"// front-end developer"}</T></p>

          <div>
            <p
              className={`${mono.className} type-copy text-base`}
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
            ><T>{"Hi! I'm"}</T></p>
            <h1
              className={`${bebas.className} type-heading profile-name leading-none`}
              style={{
                letterSpacing: "0.03em",
                background:
                  "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,180,0,0.4))",
              }}
            ><T>{"Begun"}</T><br /><T>{"Ganbold"}</T></h1>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <span className="w-4 h-px" style={{ background: "#ffb300" }} />
            <p
              className={`${mono.className} type-copy text-sm`}
              style={{
                color: "rgba(255,220,100,0.8)",
                letterSpacing: "0.12em",
              }}
            ><T>{"UI Designer"}</T></p>
            <span className="w-1 h-1 rounded-full bg-yellow-500/60" />
            <p
              className={`${mono.className} type-copy text-sm`}
              style={{
                color: "rgba(255,220,100,0.8)",
                letterSpacing: "0.12em",
              }}
            >
              Next.js
            </p>
          </div>

          <div
            className="w-20 h-px mt-2 mx-auto md:mx-0"
            style={{
              background: "linear-gradient(to right, #ffb300, transparent)",
            }}
          />

          <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
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

          <div className="home-cta mt-6">
            <Link href="/About">
              <button
                className={`${mono.className} type-copy text-sm tracking-[0.2em] uppercase px-6 sm:px-8 py-3 transition-all duration-300`}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,180,0,0.5)",
                  color: "#ffe082",
                  clipPath:
                    "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    cursor: "pointer",
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
              ><T>{"View About Me →"}</T></button>
            </Link>
          </div>
        </div>

        {/* ── RIGHT — profile ── */}
        <div className="home-portrait relative z-10">
          <div
            className="home-portrait-image w-full bg-contain bg-bottom bg-no-repeat"
            style={{
              backgroundImage: "url('/portraits/home-portrait.png')",
              filter: "drop-shadow(0 0 40px rgba(255,180,0,0.2))",
            }}
          />
        </div>
      </div>
    </main>
  );
}
