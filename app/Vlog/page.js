"use client";

import LuxuryRoyalBackground from "../components/Luxuryroyalbackground";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const goldText = {
  background: "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 12px rgba(255,180,0,0.4))",
};

const videos = [
  { id: "dQw4w9WgXcQ", title: "Vlog #1", date: "2024" },
  { id: "dQw4w9WgXcQ", title: "Vlog #2", date: "2024" },
  { id: "dQw4w9WgXcQ", title: "Vlog #3", date: "2024" },
];

const posts = [
  {
    title: "My Coding Journey",
    date: "2024.03.01",
    tag: "Dev",
    body: "From HTML, CSS all the way to Next.js — sharing the path I've taken. Learned so much this year...",
  },
  {
    title: "New Project: Online Everything",
    date: "2024.02.15",
    tag: "Project",
    body: "Finished building the e-commerce site. Used Tailwind, React, and Next.js. Cart functionality took the most time...",
  },
  {
    title: "About Gaming",
    date: "2024.01.20",
    tag: "Gaming",
    body: "Sons of the Forest, GTA V, Minecraft — these are my favorite games. Wrote about what makes them special...",
  },
];

const tags = ["All", "Dev", "Project", "Gaming"];

export default function Vlog() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? posts : posts.filter((p) => p.tag === activeTag);

  return (
    <main className="relative flex flex-col items-center min-h-screen overflow-hidden">
      <LuxuryRoyalBackground />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[1150px] px-4 pt-28 pb-16 gap-12">
        <div className="w-full">
          <button
            onClick={() => router.back()}
            className={`${mono.className} flex items-center gap-2 text-sm tracking-[0.15em] uppercase transition-all duration-200`}
            style={{ color: "rgba(255,200,50,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffb300")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,200,50,0.5)")
            }
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p
            className={`${mono.className} text-xs tracking-[0.4em] uppercase`}
            style={{ color: "rgba(255,200,50,0.5)" }}
          >
            // my life
          </p>
          <h1
            className={`${bebas.className} text-7xl`}
            style={{ ...goldText, letterSpacing: "0.12em" }}
          >
            Vlog
          </h1>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #ffb300, transparent)",
            }}
          />
        </div>

        {/* VIDEOS */}
        <div className="w-full flex flex-col gap-6">
          <p
            className={`${mono.className} text-xs tracking-[0.3em] uppercase`}
            style={{ color: "rgba(255,200,50,0.5)" }}
          >
            // videos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,200,50,0.15)",
                  background: "rgba(6,3,15,0.6)",
                }}
              >
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <p
                    className={`${bebas.className} text-xl tracking-wider`}
                    style={goldText}
                  >
                    {v.title}
                  </p>
                  <p
                    className={`${mono.className} text-xs`}
                    style={{ color: "rgba(255,200,50,0.4)" }}
                  >
                    {v.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,200,50,0.2), transparent)",
          }}
        />

        {/* BLOG */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p
              className={`${mono.className} text-xs tracking-[0.3em] uppercase`}
              style={{ color: "rgba(255,200,50,0.5)" }}
            >
              // posts
            </p>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`${mono.className} text-xs px-3 py-1 rounded tracking-widest transition-all duration-200`}
                  style={{
                    border: "1px solid",
                    borderColor:
                      activeTag === tag ? "#ffb300" : "rgba(255,200,50,0.2)",
                    color:
                      activeTag === tag ? "#ffb300" : "rgba(255,200,50,0.5)",
                    background:
                      activeTag === tag
                        ? "rgba(255,180,0,0.08)"
                        : "transparent",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  border: "1px solid rgba(255,200,50,0.15)",
                  background: "rgba(6,3,15,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,180,0,0.35)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(255,180,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,200,50,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`${mono.className} text-xs px-2 py-0.5 rounded`}
                    style={{
                      border: "1px solid rgba(255,180,0,0.3)",
                      color: "#ffb300",
                      background: "rgba(255,180,0,0.08)",
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    className={`${mono.className} text-xs`}
                    style={{ color: "rgba(255,200,50,0.4)" }}
                  >
                    {post.date}
                  </span>
                </div>
                <h2
                  className={`${bebas.className} text-2xl tracking-wider`}
                  style={goldText}
                >
                  {post.title}
                </h2>
                <div
                  className="w-8 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, #ffb300, transparent)",
                  }}
                />
                <p
                  className={`${mono.className} text-xs leading-relaxed`}
                  style={{ color: "rgba(255,200,50,0.55)" }}
                >
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
