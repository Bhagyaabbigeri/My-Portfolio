"use client";

import React, { useEffect, useState } from "react";
import { MotionValue, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
  imageLayout?: { dx: number; dw: number; showLines: boolean };
}

export default function Overlay({ scrollYProgress, imageLayout }: OverlayProps) {
  const [activeBlock, setActiveBlock] = useState<number | null>(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 0.00 && v < 0.20)       setActiveBlock(0);
      else if (v >= 0.20 && v < 0.25)  setActiveBlock(null);
      else if (v >= 0.25 && v < 0.45)  setActiveBlock(1);
      else if (v >= 0.45 && v < 0.50)  setActiveBlock(null);
      else if (v >= 0.50 && v < 0.70)  setActiveBlock(2);
      else if (v >= 0.70 && v < 0.75)  setActiveBlock(null);
      else if (v >= 0.75 && v < 0.95)  setActiveBlock(3);
      else                              setActiveBlock(null);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const show = (idx: number) => ({
    opacity: activeBlock === idx ? 1 : 0,
    pointerEvents: (activeBlock === idx ? "auto" : "none") as React.CSSProperties["pointerEvents"],
    transition: "opacity 0.4s ease",
  });

  return (
    <>
      {/* ── Block 0 · Name + Title — BOTTOM LEFT ── */}
      <div
        style={show(0)}
        className="fixed inset-x-4 bottom-6 md:inset-x-auto md:left-6 md:bottom-8 lg:left-10 lg:bottom-10 z-[90] max-w-[280px] sm:max-w-sm md:max-w-md"
      >
        <div
          className="space-y-2 bg-[#030014]/80 border border-orange-500/30 backdrop-blur-xl rounded-2xl p-3 sm:p-4"
          style={{ boxShadow: "0 0 30px rgba(249,115,22,0.1), 0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="flex flex-row items-center gap-3 sm:gap-4 text-left">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-white/10 bg-[#030014]">
                <Image
                  src="/projects/ME.png"
                  alt="Bhagyashree Reddy"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-orange-400 font-mono text-[7px] sm:text-[9px] tracking-widest uppercase">PORTFOLIO</span>
              </div>
              <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tighter leading-[1.1]">
                <span className="text-white">Bhagyashree</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                  Reddy
                </span>
              </h1>
            </div>
          </div>
          <h2 className="text-[9px] sm:text-[11px] md:text-xs text-orange-300 font-medium tracking-wide leading-tight">
            Software Engineer | AI Engineer | Space Tech | Creative Director
          </h2>
        </div>
      </div>

      {/* ── Block 0 Quote · Center ── */}
      <AnimatePresence>
        {activeBlock === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center px-6 md:block"
          >
            <div
              className="relative flex flex-col items-center text-center"
              style={viewportWidth >= 768 && imageLayout && imageLayout.dw > 0 ? {
                position: "absolute",
                top: "44%",
                left: `${imageLayout.dx + imageLayout.dw / 2}px`,
                transform: "translateX(-50%)",
                width: `${imageLayout.dw * 0.85}px`,
              } : {
                width: "100%",
                maxWidth: "340px"
              }}
            >
              <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent mb-4 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
              <p className="text-white text-[13px] sm:text-lg md:text-xl font-light italic tracking-[0.15em] md:tracking-widest leading-relaxed"
                 style={{ textShadow: "0 0 15px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.9)" }}>
                And She once looked at the sky,<br className="md:hidden" /> dreaming beyond limits!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Block 1 · Education — BOTTOM RIGHT ── */}
      <div
        style={show(1)}
        className="fixed inset-x-4 bottom-6 md:inset-x-auto md:right-8 md:bottom-12 lg:right-12 lg:bottom-16 z-[90] max-w-md"
      >
        <div
          className="space-y-3 bg-[#030014]/80 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6"
          style={{ boxShadow: "0 0 40px rgba(6,182,212,0.15), 0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-[8px] sm:text-[10px] tracking-widest uppercase">Education</span>
          </div>
          <h3 className="text-white text-lg md:text-xl font-bold leading-snug">B.Tech Computer Science</h3>
          <p className="text-zinc-300 text-[10px] sm:text-sm leading-relaxed">
            VTU CPGS Kalaburagi
            <span className="text-zinc-500 ml-2 font-mono text-[10px]">2022 – 2026</span>
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30">
            <span className="text-cyan-300 font-mono text-[10px] md:text-xs font-semibold tracking-wider">CGPA 8.03 / 10</span>
          </div>
        </div>
      </div>

      {/* ── Block 2 · Experience — BOTTOM LEFT ── */}
      <div
        style={show(2)}
        className="fixed inset-x-4 bottom-6 md:inset-x-auto md:left-8 md:bottom-12 lg:left-12 lg:bottom-16 z-[90] max-w-md"
      >
        <div
          className="space-y-3 bg-[#030014]/80 border border-orange-500/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6"
          style={{ boxShadow: "0 0 40px rgba(249,115,22,0.15), 0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 font-mono text-[8px] sm:text-[10px] tracking-widest uppercase">Experience</span>
          </div>
          <div className="space-y-4">
            <div className="border-l-2 border-orange-500/40 pl-4 text-left">
              <p className="text-zinc-500 font-mono text-[8px] sm:text-[10px] mb-0.5">Aug 2025 – Mar 2026</p>
              <h4 className="text-white text-xs sm:text-sm font-bold">SDE Intern</h4>
              <p className="text-orange-300 text-[10px] sm:text-xs">Algorithms365</p>
              <p className="text-zinc-400 text-[8px] sm:text-[10px] mt-0.5">Java · Python · DSA · System Design</p>
            </div>
            <div className="border-l-2 border-amber-500/40 pl-4 text-left">
              <p className="text-zinc-500 font-mono text-[8px] sm:text-[10px] mb-0.5">Apr 2026 – Present</p>
              <h4 className="text-white text-xs sm:text-sm font-bold">Creative Director</h4>
              <p className="text-orange-300 text-[10px] sm:text-xs">Involynk</p>
              <p className="text-zinc-400 text-[8px] sm:text-[10px] mt-0.5">Visual Identity · UI/UX · Brand Storytelling · Creative Direction</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Block 3 · Featured Projects — BOTTOM RIGHT ── */}
      <div
        style={show(3)}
        className="fixed inset-x-4 bottom-6 md:inset-x-auto md:right-8 md:bottom-12 lg:right-12 lg:bottom-16 z-[90] max-w-md"
      >
        <div
          className="space-y-3 bg-[#030014]/80 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6"
          style={{ boxShadow: "0 0 40px rgba(6,182,212,0.15), 0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-[8px] sm:text-[10px] tracking-widest uppercase">Featured Projects</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "SpaceRisk-Radar", desc: "Real-time 3D satellite tracking", dot: "bg-orange-400" },
              { name: "GokulaHealth",    desc: "Offline-first Android cattle farm app", dot: "bg-cyan-400"   },
              { name: "EmpowerHer",     desc: "Women's safety platform with SOS", dot: "bg-amber-400"  },
            ].map((p) => (
              <div key={p.name} className="flex items-start gap-3 text-left">
                <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${p.dot}`} />
                <div>
                  <p className="text-white text-[10px] sm:text-sm font-semibold leading-none mb-0.5">{p.name}</p>
                  <p className="text-zinc-400 text-[8px] sm:text-[10px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
