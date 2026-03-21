"use client";

import { Share_Tech_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const navLinks = [
  { href: "/About", label: "About Me" },
  { href: "/Works", label: "Works" },
  { href: "/Vlog", label: "Vlog" },
];

export default function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-[-15px] items-center pt-4 px-4">
      <div className="flex justify-between xl:w-[1150px] w-full items-center">
        {/* Logo */}
        <Link href="/Home">
          <Image
            src="/begun-logo.svg"
            alt="Begun"
            width={150}
            height={90}
            style={{ filter: "drop-shadow(0 0 8px rgba(255,180,0,0.3))" }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`${mono.className} hidden md:flex flex-row items-center gap-1 px-3 py-2`}
          style={{
            background: "rgba(6,3,15,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,200,50,0.15)",
            borderRadius: "14px",
            boxShadow:
              "0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          {navLinks.map(({ href, label }) => {
            const active = path.startsWith(href);
            return (
              <Link key={href} href={href}>
                <button
                  className="text-sm px-5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 tracking-widest uppercase"
                  style={{
                    color: active ? "#ffb300" : "rgba(255,210,80,0.6)",
                    border: active
                      ? "1px solid rgba(255,180,0,0.4)"
                      : "1px solid transparent",
                    background: active ? "rgba(255,180,0,0.08)" : "transparent",
                    filter: active
                      ? "drop-shadow(0 0 6px rgba(255,180,0,0.4))"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#ffb300";
                      e.currentTarget.style.borderColor =
                        "rgba(255,180,0,0.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "rgba(255,210,80,0.6)";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  {label}
                </button>
              </Link>
            );
          })}

          <span
            className="w-px h-5 mx-1"
            style={{ background: "rgba(255,200,50,0.2)" }}
          />

          <Link href="/ContactMe">
            <button
              className="text-sm px-5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 tracking-widest uppercase"
              style={{
                background:
                  path === "/ContactMe"
                    ? "rgba(255,180,0,0.12)"
                    : "rgba(255,180,0,0.08)",
                color: "#ffe082",
                border: "1px solid rgba(255,180,0,0.35)",
                clipPath:
                  "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,180,0,0.18)";
                e.currentTarget.style.borderColor = "rgba(255,180,0,0.6)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                if (path !== "/ContactMe") {
                  e.currentTarget.style.background = "rgba(255,180,0,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,180,0,0.35)";
                  e.currentTarget.style.color = "#ffe082";
                }
              }}
            >
              Contact Me
            </button>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg transition-all duration-200"
          style={{
            background: "rgba(6,3,15,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,200,50,0.15)",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "#ffb300",
              transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "#ffb300",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "#ffb300",
              transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className={`${mono.className} md:hidden absolute top-full left-4 right-4 mt-2 rounded-xl overflow-hidden`}
          style={{
            background: "rgba(6,3,15,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,200,50,0.15)",
            boxShadow: "0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          {[...navLinks, { href: "/ContactMe", label: "Contact Me" }].map(
            ({ href, label }, i, arr) => {
              const active = path.startsWith(href);
              const isLast = i === arr.length - 1;
              return (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                  <div
                    className="flex items-center gap-3 px-5 py-3.5 transition-all duration-200"
                    style={{
                      borderBottom: isLast
                        ? "none"
                        : "1px solid rgba(255,200,50,0.08)",
                      background: active
                        ? "rgba(255,180,0,0.08)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="text-[8px]"
                      style={{
                        color: active ? "#ffb300" : "rgba(255,200,50,0.3)",
                      }}
                    >
                      ◆
                    </span>
                    <span
                      className="text-sm tracking-widest uppercase"
                      style={{
                        color: active ? "#ffb300" : "rgba(255,210,80,0.7)",
                      }}
                    >
                      {label}
                    </span>
                    {active && (
                      <span
                        className="ml-auto text-[8px]"
                        style={{ color: "rgba(255,180,0,0.5)" }}
                      >
                        ●
                      </span>
                    )}
                  </div>
                </Link>
              );
            },
          )}
        </div>
      )}
    </header>
  );
}
