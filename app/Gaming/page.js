"use client";

import LuxuryRoyalBackground from "../components/Luxuryroyalbackground";
import { Bebas_Neue, Share_Tech_Mono } from "next/font/google";
import GameList from "../components/GameList";
import GameMarquee from "../components/GameMarqee";
import GameSlider from "../components/GameSlider";
import GameArcadeModal from "../components/Gamearcademodal";
import { useRouter } from "next/navigation";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const goldText = {
  background: "linear-gradient(135deg, #fffde7 0%, #ffe082 50%, #ffb300 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 12px rgba(255,180,0,0.4))",
};

export default function Gaming() {
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
            // hobby
          </p>
          <h1
            className={`${bebas.className} text-7xl tracking-widest`}
            style={{ ...goldText, letterSpacing: "0.12em" }}
          >
            Gaming
          </h1>
          <div
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #ffb300, transparent)",
            }}
          />
        </div>

        <div className="w-full">
          <GameMarquee />
        </div>
        <div className="w-full">
          <GameList />
        </div>

        {/* Royal Arcade — Play Games button */}
        <div className="flex justify-center w-full">
          <GameArcadeModal />
        </div>

        <div className="w-full">
          <GameSlider />
        </div>
      </div>
    </main>
  );
}
