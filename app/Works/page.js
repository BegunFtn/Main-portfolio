"use client";

import LuxuryRoyalBackground from "../components/Luxuryroyalbackground";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const goldText = {
  background: "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 12px rgba(255,180,0,0.4))",
};

const projects = [
  {
    name: "Portfolio Website",
    desc: "Personal portfolio built with Next.js and Tailwind CSS. Features luxury gold theme with animated backgrounds.",
    img: "/project1.png",
    live: null,
    github: null,
  },
  {
    name: "Khaesel's Cast",
    desc: "A modern movie streaming web app with dynamic content, trending movies, powerful search, and an engaging hero banner. Built with a focus on performance and responsive design.",
    img: "/projectMov.png",
    live: "https://khaesel-cast.vercel.app",
    github: null,
  },
  {
    name: "Online Everything",
    desc: "A modern e-commerce web app with categorized product browsing, responsive search, and a functional shopping cart.",
    img: "/projectECOM.png",
    live: "https://online-everything-s9yk.vercel.app",
    github: null,
  },
  {
    name: "Time To Travel",
    desc: "A modern travel web application showcasing destinations around the world. Features country-based browsing, travel plans, and an engaging visual design.",
    img: "/project4.png",
    live: "https://begun-three.vercel.app",
    github: null,
  },
  {
    name: "Handiv",
    desc: "Handiv is a transparent crowdfunding platform that connects people who need support with those who want to make a difference. Every contribution helps turn compassion into real impact.",
    img: "/project6.png",
    live: "https://handiv.vercel.app/",
    github: null,
  },
];

export default function Works() {
  const router = useRouter();

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

      <div className="relative z-10 flex flex-col items-center w-full max-w-[1250px] px-4 pt-28 pb-16 gap-10">
        {/* Back button */}
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

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <p
            className={`${mono.className} text-xs tracking-[0.4em] uppercase`}
            style={{ color: "rgba(255,200,50,0.5)" }}
          >
            // my projects
          </p>
          <h1
            className={`${bebas.className} text-7xl`}
            style={{ ...goldText, letterSpacing: "0.12em" }}
          >
            Works
          </h1>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #ffb300, transparent)",
            }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(6,3,15,0.7)",
                border: "1px solid rgba(255,200,50,0.15)",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,180,0,0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(255,180,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,200,50,0.15)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,0,0,0.4)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.style.background =
                      "linear-gradient(135deg, rgba(255,180,0,0.05), rgba(6,3,15,0.8))";
                  }}
                />
                <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[rgba(255,180,0,0.4)]" />
                <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[rgba(255,180,0,0.4)]" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 px-5 py-4 flex-1">
                <p
                  className={`${mono.className} text-xs tracking-[0.3em]`}
                  style={{ color: "rgba(255,180,0,0.4)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h2
                  className={`${bebas.className} text-2xl tracking-wider`}
                  style={goldText}
                >
                  {project.name}
                </h2>

                <div
                  className="w-10 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, #ffb300, transparent)",
                  }}
                />

                <p
                  className={`${mono.className} text-xs leading-relaxed flex-1`}
                  style={{ color: "rgba(255,200,50,0.55)" }}
                >
                  {project.desc}
                </p>

                {/* Links */}
                {(project.live || project.github) && (
                  <div
                    className="flex gap-3 mt-3 pt-3"
                    style={{ borderTop: "1px solid rgba(255,200,50,0.1)" }}
                  >
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          className={`${mono.className} text-xs tracking-[0.15em] uppercase px-4 py-1.5 rounded transition-all duration-200`}
                          style={{
                            background: "rgba(255,180,0,0.1)",
                            border: "1px solid rgba(255,180,0,0.3)",
                            color: "#ffb300",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,180,0,0.2)";
                            e.currentTarget.style.borderColor = "#ffb300";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,180,0,0.1)";
                            e.currentTarget.style.borderColor =
                              "rgba(255,180,0,0.3)";
                          }}
                        >
                          ↗ Live
                        </button>
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          className={`${mono.className} text-xs tracking-[0.15em] uppercase px-4 py-1.5 rounded transition-all duration-200`}
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(255,200,50,0.2)",
                            color: "rgba(255,200,50,0.6)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255,180,0,0.5)";
                            e.currentTarget.style.color = "#ffb300";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255,200,50,0.2)";
                            e.currentTarget.style.color =
                              "rgba(255,200,50,0.6)";
                          }}
                        >
                          GitHub
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
