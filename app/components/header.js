"use client";

import { Share_Tech_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const navLinks = [
  { href: "/About", label: "About Me" },
  { href: "/Works", label: "Works" },
  { href: "/Vlog", label: "Vlog" },
];

export default function Header() {
  const path = usePathname();

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

        {/* Nav */}
        <nav
          className={`${mono.className} flex flex-row items-center gap-1 px-3 py-2`}
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

          {/* Divider */}
          <span
            className="w-px h-5 mx-1"
            style={{ background: "rgba(255,200,50,0.2)" }}
          />

          {/* Contact Me */}
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
      </div>
    </header>
  );
}
