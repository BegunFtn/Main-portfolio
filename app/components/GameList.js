"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const games = [
  { name: "GTA V", img: "/GTA V.jpg" },
  { name: "Call of Duty", img: "/COD.webp" },
  { name: "Minecraft", img: "/MC.jpg" },
  { name: "Sons of the Forest", img: "/Sons.avif" },
];

export default function GameList() {
  return (
    <div className="w-full mx-auto mt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        style={{ paddingBottom: "36px" }}
      >
        {games.map((game, i) => (
          <SwiperSlide key={i}>
            <div
              className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.03]"
              style={{
                border: "1px solid rgba(255,200,50,0.15)",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={game.img}
                alt={game.name}
                className="w-full h-44 object-cover transition-all duration-300 group-hover:brightness-75"
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2"
                style={{
                  background: "rgba(6,3,15,0.85)",
                  backdropFilter: "blur(6px)",
                  borderTop: "1px solid rgba(255,200,50,0.15)",
                }}
              >
                <p
                  className="text-center text-sm font-mono tracking-wider truncate"
                  style={{ color: "rgba(255,210,80,0.9)" }}
                >
                  {game.name}
                </p>
              </div>

              <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[rgba(255,180,0,0.4)]" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[rgba(255,180,0,0.4)]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #ffb300 !important;
          filter: drop-shadow(0 0 6px rgba(255,180,0,0.6));
        }
        .swiper-pagination-bullet {
          background: rgba(255,180,0,0.4) !important;
        }
        .swiper-pagination-bullet-active {
          background: #ffb300 !important;
          box-shadow: 0 0 6px rgba(255,180,0,0.8);
        }
      `}</style>
    </div>
  );
}
