"use client";

const images = [
  "/CS2.jpg",
  "/dota2.jpg",
  "/ARC.jpg",
  "/PEAK.jpg",
  "/PUBG.jpg",
  "/VALO.jpg",
  "/DeltaForce.jpg",
  "/CyberPunk.jpg",
];

export default function GameMarquee() {
  return (
    <div
      className="overflow-hidden w-full rounded-xl py-4 relative"
      style={{
        background: "rgba(6,3,15,0.6)",
        border: "1px solid rgba(255,200,50,0.15)",
        boxShadow: "0 0 30px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(6,3,15,0.9), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(6,3,15,0.9), transparent)",
        }}
      />

      <div className="flex animate-slide whitespace-nowrap">
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="relative mx-3 shrink-0 overflow-hidden rounded-lg group cursor-pointer"
            style={{
              border: "1px solid rgba(255,200,50,0.15)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,180,0,0.5)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(255,180,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,200,50,0.15)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={img}
              className="h-36 w-auto object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-105"
              alt="game"
            />
            <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[rgba(255,180,0,0.5)]" />
            <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[rgba(255,180,0,0.5)]" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
