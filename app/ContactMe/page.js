"use client";

import LuxuryRoyalBackground from "../components/Luxuryroyalbackground";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const goldText = {
  background: "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 12px rgba(255,180,0,0.4))",
};

export default function ContactMe() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <LuxuryRoyalBackground />

      {/* vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 flex justify-evenly items-center rounded-2xl xl:w-[980px] xl:h-[620px] mt-8"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,200,50,0.15)",
          boxShadow: "0 0 80px rgba(255,180,0,0.08)",
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-yellow-400/50" />
        <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-yellow-400/50" />
        <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-yellow-400/50" />
        <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-yellow-400/50" />

        {/* ── LEFT: Photo card ── */}
        <div
          className="relative w-[380px] h-[540px] rounded-2xl overflow-hidden shrink-0"
          style={{
            border: "1px solid rgba(255,200,50,0.2)",
            boxShadow: "0 0 40px rgba(255,180,0,0.12)",
          }}
        >
          <Image
            src="/ya.png"
            alt="Contact"
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
            }}
          />

          {/* Hello! top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex justify-center items-center h-14"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid rgba(255,200,50,0.15)",
            }}
          >
            <h2
              className={`${bebas.className} text-3xl tracking-widest`}
              style={goldText}
            >
              Hello!
            </h2>
          </div>

          {/* Bottom info */}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 px-6 py-4"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              borderTop: "1px solid rgba(255,200,50,0.15)",
            }}
          >
            <Link
              href="https://maps.app.goo.gl/v4h4WUmXrdD7rbwe7"
              target="_blank"
            >
              <p
                className={`${mono.className} text-xs leading-relaxed hover:opacity-100 transition-opacity duration-200`}
                style={{ color: "rgba(255,210,80,0.8)" }}
              >
                📍 WXFF+8V9 Цайз, BZD - 40 khoroo, Ulaanbaatar 13321
              </p>
            </Link>
            <Link href="tel:+97689087052">
              <p
                className={`${mono.className} text-xs hover:opacity-100 transition-opacity duration-200`}
                style={{ color: "rgba(255,210,80,0.8)" }}
              >
                📞 +97689087052
              </p>
            </Link>
            <div className="flex gap-3 mt-1">
              {[
                {
                  href: "https://github.com/BegunFtn",
                  img: "/github.png",
                  label: "GitHub",
                },
                {
                  href: "https://www.instagram.com/begun4h/",
                  img: "/instagram.png",
                  label: "Instagram",
                },
              ].map(({ href, img, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="w-8 h-8 bg-cover bg-center cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundImage: `url('${img}')`,
                      filter: "drop-shadow(0 0 4px rgba(255,180,0,0.4))",
                    }}
                    aria-label={label}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex flex-col justify-center w-[460px] gap-4 px-2">
          <div>
            <h1
              className={`${bebas.className} text-4xl tracking-widest`}
              style={goldText}
            >
              Contact Me
            </h1>
            <p
              className={`${mono.className} text-base mt-1`}
              style={{ color: "rgba(255,210,80,0.7)" }}
            >
              Let&apos;s Build Something Great
            </p>
          </div>

          <div
            className="w-16 h-px"
            style={{
              background: "linear-gradient(to right, #ffb300, transparent)",
            }}
          />

          <p
            className={`${mono.className} text-xs leading-relaxed`}
            style={{ color: "rgba(255,200,50,0.5)" }}
          >
            I&apos;m always excited to connect with people building interesting
            things. Whether it&apos;s a collaboration, a project, or a position
            on your team — feel free to reach out. Let&apos;s turn ideas into
            reality.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
            <div>
              <label
                className={`${mono.className} text-xs tracking-[0.2em] block mb-1`}
                style={{ color: "rgba(255,200,50,0.7)" }}
              >
                EMAIL
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className={`${mono.className} w-full text-sm px-4 py-2 rounded outline-none transition-all duration-200`}
                style={{
                  background: "rgba(255,180,0,0.05)",
                  border: "1px solid rgba(255,200,50,0.2)",
                  color: "#ffe082",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(255,180,0,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,200,50,0.2)")
                }
              />
            </div>
            <div>
              <label
                className={`${mono.className} text-xs tracking-[0.2em] block mb-1`}
                style={{ color: "rgba(255,200,50,0.7)" }}
              >
                YOUR NAME
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                className={`${mono.className} w-full text-sm px-4 py-2 rounded outline-none transition-all duration-200`}
                style={{
                  background: "rgba(255,180,0,0.05)",
                  border: "1px solid rgba(255,200,50,0.2)",
                  color: "#ffe082",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(255,180,0,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,200,50,0.2)")
                }
              />
            </div>
            <button
              type="submit"
              className={`${mono.className} text-sm tracking-[0.2em] uppercase py-2 mt-1 transition-all duration-300`}
              style={{
                background: sent ? "rgba(255,180,0,0.2)" : "transparent",
                border: "1px solid rgba(255,180,0,0.5)",
                color: sent ? "#fff" : "#ffe082",
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,180,0,0.15)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                if (!sent) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#ffe082";
                }
              }}
            >
              {sent ? "✓ Sent!" : "[ Send Message ]"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
