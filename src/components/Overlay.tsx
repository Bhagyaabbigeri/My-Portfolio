"use client";

import React, { useEffect, useState } from "react";
import { MotionValue, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const [activeBlock, setActiveBlock] = useState<number | null>(0);

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
        className="fixed inset-x-4 bottom-6 md:inset-x-auto md:left-8 md:bottom-12 lg:left-12 lg:bottom-16 z-[90] max-w-lg"
      >
        <div
          className="space-y-3 bg-[#030014]/80 border border-orange-500/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6"
          style={{ boxShadow: "0 0 40px rgba(249,115,22,0.15), 0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="flex flex-row items-center gap-4 sm:gap-6 text-left">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#030014]">
                <Image
                  src="/projects/ME.png"
                  alt="Bhagyashree Reddy"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-orange-400 font-mono text-[8px] sm:text-[10px] tracking-widest uppercase">PORTFOLIO</span>
              </div>
              <h1 className="text-lg sm:text-2xl md:text-4xl font-black tracking-tighter leading-[1.1]">
                <span className="text-white">Bhagyashree</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                  Reddy
                </span>
              </h1>
            </div>
          </div>
          <h2 className="text-[10px] sm:text-base md:text-lg text-orange-300 font-medium tracking-wide leading-tight">
            Software Engineer | AI Engineer | Space Tech
          </h2>
        </div>
      </div>

      {/* ── Block 0 Quote · Bottom Center ── */}
      <AnimatePresence>
        {activeBlock === 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              className="fixed top-[38%] left-6 md:left-[10%] lg:left-[18%] z-[80] pointer-events-none max-w-[250px]"
            >
              <p className="text-white/90 text-[10px] sm:text-lg md:text-xl font-light italic tracking-widest text-left"
                 style={{ textShadow: "0 0 15px rgba(255,255,255,0.6)" }}>
                And She once looked at the sky,
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              className="fixed top-[38%] right-6 md:right-[10%] lg:right-[18%] z-[80] pointer-events-none max-w-[250px]"
            >
              <p className="text-white/90 text-[10px] sm:text-lg md:text-xl font-light italic tracking-widest text-right"
                 style={{ textShadow: "0 0 15px rgba(255,255,255,0.6)" }}>
                dreaming beyond limits!
              </p>
            </motion.div>
          </>
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
              <p className="text-zinc-500 font-mono text-[8px] sm:text-[10px] mb-0.5">May 2026 – Present</p>
              <h4 className="text-white text-xs sm:text-sm font-bold">Tech & Design Director</h4>
              <p className="text-amber-300 text-[10px] sm:text-xs">Involynk</p>
              <p className="text-zinc-400 text-[8px] sm:text-[10px] mt-0.5">Web · App · AI · Branding · Automation</p>
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
