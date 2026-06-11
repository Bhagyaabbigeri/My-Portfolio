"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";
import Overlay from "./Overlay";

/* ─── Keyword data ───────────────────────────────────────────────── */
const rightKeywords = [
  { text: "React",      delay: 0,    left: "12%", duration: 14, size: "text-sm",   color: "text-cyan-300"   },
  { text: "Next.js",   delay: 3,    left: "48%", duration: 17, size: "text-base", color: "text-cyan-400"   },
  { text: "Python",    delay: 6,    left: "72%", duration: 16, size: "text-sm",   color: "text-orange-400" },
  { text: "Kotlin",    delay: 1.5,  left: "28%", duration: 19, size: "text-base", color: "text-cyan-300"   },
  { text: "Three.js",  delay: 4.5,  left: "82%", duration: 15, size: "text-sm",   color: "text-orange-300" },
  { text: "AI",        delay: 8,    left: "18%", duration: 13, size: "text-lg",   color: "text-cyan-400"   },
  { text: "Space Tech",delay: 10,   left: "55%", duration: 21, size: "text-sm",   color: "text-orange-300" },
  { text: "MongoDB",   delay: 2,    left: "76%", duration: 18, size: "text-sm",   color: "text-cyan-500"   },
];

const leftKeywords = [
  { text: "Java",      delay: 1,    left: "8%",  duration: 15, size: "text-sm",   color: "text-orange-400" },
  { text: "TypeScript",delay: 4,    left: "50%", duration: 18, size: "text-base", color: "text-orange-300" },
  { text: "Firebase",  delay: 7,    left: "22%", duration: 16, size: "text-sm",   color: "text-amber-500"  },
  { text: "Flask",     delay: 2.5,  left: "72%", duration: 19, size: "text-base", color: "text-orange-500" },
  { text: "Node.js",   delay: 5.5,  left: "34%", duration: 14, size: "text-sm",   color: "text-amber-400"  },
  { text: "OpenCV",    delay: 9,    left: "12%", duration: 17, size: "text-sm",   color: "text-orange-400" },
  { text: "LangChain", delay: 11,   left: "62%", duration: 20, size: "text-sm",   color: "text-orange-300" },
  { text: "OpenAI",    delay: 3,    left: "82%", duration: 15, size: "text-base", color: "text-amber-400"  },
  { text: "REST APIs", delay: 0.5,  left: "46%", duration: 22, size: "text-sm",   color: "text-orange-500" },
  { text: "Tailwind",  delay: 8.5,  left: "76%", duration: 13, size: "text-sm",   color: "text-orange-400" },
];

/* ─── Circuit-grid SVG background ───────────────────────────────── */
function CircuitGrid({ color }: { color: "orange" | "cyan" }) {
  const stroke = color === "orange" ? "rgba(249,115,22,0.18)" : "rgba(6,182,212,0.18)";
  const dot    = color === "orange" ? "rgba(249,115,22,0.35)" : "rgba(6,182,212,0.35)";
  const CELL   = 40;
  const COLS   = 8;
  const ROWS   = 20;

  const lines: React.ReactNode[] = [];
  // vertical lines
  for (let c = 0; c <= COLS; c++) {
    lines.push(
      <line key={`v${c}`} x1={c * CELL} y1={0} x2={c * CELL} y2={ROWS * CELL} stroke={stroke} strokeWidth="0.5" />
    );
  }
  // horizontal lines
  for (let r = 0; r <= ROWS; r++) {
    lines.push(
      <line key={`h${r}`} x1={0} y1={r * CELL} x2={COLS * CELL} y2={r * CELL} stroke={stroke} strokeWidth="0.5" />
    );
  }
  // dots at intersections
  const dots: React.ReactNode[] = [];
  for (let c = 0; c <= COLS; c++) {
    for (let r = 0; r <= ROWS; r++) {
      if ((c + r) % 5 === 0) {
        dots.push(
          <circle key={`d${c}-${r}`} cx={c * CELL} cy={r * CELL} r="1.5" fill={dot} />
        );
      }
    }
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
    >
      {lines}
      {dots}
    </svg>
  );
}

/* ─── Animated inner-edge border line ───────────────────────────── */
function InnerBorderLine({ side, color }: { side: "left" | "right"; color: "orange" | "cyan" }) {
  const fromColor = color === "orange" ? "rgba(249,115,22,0)" : "rgba(6,182,212,0)";
  const midColor  = color === "orange" ? "rgba(249,115,22,0.8)" : "rgba(6,182,212,0.8)";
  const glowColor = color === "orange" ? "rgba(249,115,22,0.6)" : "rgba(6,182,212,0.6)";

  return (
    <motion.div
      className="absolute top-0 bottom-0 w-[1.5px] pointer-events-none"
      style={{
        [side === "left" ? "right" : "left"]: 0,
        background: `linear-gradient(to bottom, ${fromColor}, ${midColor} 30%, ${midColor} 70%, ${fromColor})`,
        boxShadow: `0 0 8px 1px ${glowColor}`,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Space Background Components ───────────────────────────────── */
function Starfield({ count = 200 }) {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 1.5 + 0.3}px`,
            height: `${Math.random() * 1.5 + 0.3}px`,
            opacity: Math.random(),
            animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 5}s, drift ${Math.random() * 50 + 50}s infinite linear`,
            boxShadow: Math.random() > 0.95 ? '0 0 6px 1px rgba(255, 255, 255, 0.4)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

function MilkyWay() {
  return (
    <div
      className="absolute inset-0 z-[-3] opacity-20 pointer-events-none"
      style={{
        background: 'linear-gradient(45deg, transparent 20%, rgba(200, 230, 255, 0.15) 45%, rgba(255, 255, 255, 0.2) 50%, rgba(200, 230, 255, 0.15) 55%, transparent 80%)',
        filter: 'blur(80px)'
      }}
    />
  );
}

function Nebula({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div className="absolute inset-0 z-[-2] pointer-events-none">
      <div
        className="absolute w-[200%] h-[200%] opacity-40 blur-[120px]"
        style={{
          top: isLeft ? '-40%' : '0%',
          left: isLeft ? '-40%' : '-60%',
          background: isLeft
            ? 'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.4) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)'
            : 'radial-gradient(circle at 70% 30%, rgba(6,182,212,0.4) 0%, rgba(168,85,247,0.3) 30%, rgba(249,115,22,0.2) 60%, transparent 80%)',
          animation: 'nebulaPulse 12s infinite alternate ease-in-out',
        }}
      />
    </div>
  );
}

function GalaxySpiral() {
  return (
    <div className="absolute top-[-5%] left-[-15%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] opacity-40 pointer-events-none z-[-3] hidden sm:block">
      <div
        className="w-full h-full rounded-full animate-[spin_240s_linear_infinite]"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(249,115,22,0.5) 15%, rgba(168,85,247,0.4) 30%, transparent 45%, rgba(255,215,0,0.3) 70%, transparent)',
          filter: 'blur(80px)'
        }}
      />
    </div>
  );
}

function OrbitalRing({ color = "orange" }) {
  const glow = color === "orange" ? "rgba(249,115,22,0.4)" : "rgba(6,182,212,0.4)";
  return (
    <div className="absolute top-[40%] left-[20%] w-[200px] h-[70px] sm:w-[250px] sm:h-[85px] md:w-[300px] md:h-[100px] z-[-1] pointer-events-none hidden sm:block">
      <div
        className="w-full h-full border border-white/5 rounded-[100%] relative"
        style={{
          transform: `rotateX(70deg) rotateZ(${color === "orange" ? "20deg" : "-25deg"})`,
          boxShadow: `0 0 10px ${glow}`
        }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
          style={{ animation: `orbit ${color === "orange" ? "15s" : "22s"} infinite linear` }}
        />
      </div>
    </div>
  );
}

function TinyPlanets({ count = 3 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full z-[-1] pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: 'white',
            boxShadow: `0 0 12px 2px rgba(${Math.random() * 255}, ${Math.random() * 100 + 100}, 255, 0.6)`,
            opacity: 0.6,
          }}
        />
      ))}
    </>
  );
}

function DistantMoon() {
  return (
    <div className="absolute top-[12%] right-[25%] w-8 h-8 z-[-1] pointer-events-none opacity-80">
       <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-500 via-zinc-800 to-black shadow-[0_0_15px_rgba(100,200,255,0.2),inset_-2px_-2px_6px_black]" />
       <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md" />
    </div>
  );
}

function ShootingStars({ count = 8 }) {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${Math.random() * 4 + 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function Planet() {
  return (
    <div className="absolute top-[25%] left-[10%] w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 z-[-1] pointer-events-none hidden sm:block">
      {/* Planet Body */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-[inset_-12px_-12px_25px_rgba(0,0,0,1),0_0_30px_rgba(249,115,22,0.25)]" />
      {/* Orange Ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190%] h-[15%] rounded-[100%] border-[2px] border-orange-500/40"
        style={{
          transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(15deg)',
          boxShadow: '0 0 20px rgba(249,115,22,0.3)',
          animation: 'rotateRing 25s infinite linear'
        }}
      />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function ScrollyCanvas() {
  const containerRef     = useRef<HTMLDivElement>(null);
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const imagesRef        = useRef<HTMLImageElement[]>([]);
  const currentFrameRef  = useRef(0);

  const [isLoading,    setIsLoading]    = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imageLayout,  setImageLayout]  = useState({ dx: 0, dw: 0, showLines: false });

  const totalFrames = 60;
  const startFrame  = 16;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 200,
    restDelta: 0.0001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 0.85], [0, totalFrames - 1], {
    clamp: true,
  });

  const canvasScale   = useTransform(scrollYProgress, [0.8,  0.95], [1,    0.94], { clamp: true });
  const canvasOpacity = useTransform(scrollYProgress, [0.85, 0.96], [1,    0   ], { clamp: true });

  /* ── helpers ── */
  const getFrameUrl = (index: number) => {
    const padded = String(index + startFrame).padStart(2, "0");
    return `/sequence/frame_${padded}_delay-0.066s.webp`;
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx)   return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imageRatio  = iw / ih;
    let dw: number, dh: number, dx: number, dy: number;

    if (canvasRatio > imageRatio) {
      dh = ch; dw = ch * imageRatio; dx = (cw - dw) / 2; dy = ch * 0.06;
    } else {
      dw = cw; dh = cw / imageRatio; dx = 0; dy = ch * 0.06;
    }

    // Warm cinematic gradient background
    const grad = ctx.createRadialGradient(
      cw * 0.5, ch * 0.62, 0,
      cw * 0.5, ch * 0.62, Math.max(cw, ch) * 0.72
    );
    grad.addColorStop(0,    "rgba(120, 40,  5, 1)");
    grad.addColorStop(0.25, "rgba(80,  22,  4, 1)");
    grad.addColorStop(0.55, "rgba(25,  8,   3, 1)");
    grad.addColorStop(1,    "rgba(3,   0,  14, 1)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    // Draw the sequence frame
    ctx.drawImage(img, dx, dy, dw, dh);

    currentFrameRef.current = index;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = window.devicePixelRatio || 1;
    const newW = window.innerWidth;
    const newH = window.innerHeight;

    if (canvas.width !== newW * dpr || canvas.height !== newH * dpr) {
      canvas.width  = newW * dpr;
      canvas.height = newH * dpr;
    }

    const img = imagesRef.current[currentFrameRef.current] || imagesRef.current[0];
    const iw  = img?.naturalWidth  || 800;
    const ih  = img?.naturalHeight || 1200;
    const canvasRatio = newW / newH;
    const imageRatio  = iw / ih;

    let dw: number, dx: number;
    if (canvasRatio > imageRatio) {
      dw = newH * imageRatio;
      dx = (newW - dw) / 2;
    } else {
      dw = newW;
      dx = 0;
    }

    setImageLayout({
      dx:        Math.round(dx),
      dw:        Math.round(dw),
      showLines: canvasRatio > imageRatio,
    });

    drawFrame(currentFrameRef.current);
  };

  /* ── preload ── */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload frame 0 first so we can draw it and show the page immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      resizeCanvas();
      drawFrame(0);
      setIsLoading(false); // Hide loading overlay immediately once frame 0 is ready!
    };
    firstImg.onerror = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      setIsLoading(false); // Fallback if frame 0 fails to load
    };
    images[0] = firstImg;

    // Load the rest of the frames in the background
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      };
      images[i] = img;
    }
    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.min(totalFrames - 1, Math.max(0, Math.round(latest))));
  });

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#030014]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes drift {
          from { transform: translateY(0); }
          to { transform: translateY(-100px); }
        }
        @keyframes nebulaPulse {
          from { opacity: 0.2; transform: scale(1); }
          to { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes rotateRing {
          from { transform: translate(-50%, -50%) rotateX(75deg) rotateY(0deg); }
          to { transform: translate(-50%, -50%) rotateX(75deg) rotateY(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(-45deg) scale(0); opacity: 0; }
          10% { transform: translateX(-100px) translateY(100px) rotate(-45deg) scale(1); opacity: 1; }
          20% { transform: translateX(-500px) translateY(500px) rotate(-45deg) scale(0); opacity: 0; }
          100% { transform: translateX(-500px) translateY(500px) rotate(-45deg) scale(0); opacity: 0; }
        }
        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          box-shadow: 0 0 10px 2px #fff, 0 0 20px 4px rgba(249,115,22,0.4);
          animation: shooting 10s infinite ease-in;
        }
      `}} />

      {/* ── Preloader ── */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030014] text-white select-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-orange-500/20 bg-orange-950/10">
              <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-400">
                {loadProgress}%
              </span>
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="stroke-orange-950/30 fill-transparent" strokeWidth="2" />
                <motion.circle
                  cx="50" cy="50" r="45"
                  className="stroke-orange-500 fill-transparent"
                  strokeWidth="2"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * loadProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-[0.2em] text-orange-300 uppercase">
                Loading Portfolio
              </h3>
              <p className="text-xs text-zinc-500 tracking-[0.1em]">
                Preloading {loadProgress}% of {totalFrames} cinematic frames
              </p>
            </div>
            <div className="w-52 h-[1px] bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-violet-500 transition-all duration-200 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Sticky Canvas ── */}
      <motion.div
        style={{ scale: canvasScale, opacity: canvasOpacity }}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#030014]"
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/70 via-transparent to-[#030014]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(3,0,20,0.4)_100%)] pointer-events-none" />
      </motion.div>

      {/* ── Side panels (only when canvas leaves side gaps) ── */}
      {!isLoading && imageLayout.showLines && (
        <div className="hidden lg:block">
          {/* ════ LEFT PANEL ════ */}
          <div
            className="fixed top-0 bottom-0 z-10 pointer-events-none overflow-hidden"
            style={{
              left: 0,
              width: `${imageLayout.dx}px`,
              background: "linear-gradient(to right, #03000e 0%, #1a0602 60%, #2a0a03 100%)",
            }}
          >
            {/* Edge fade */}
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#190803] to-transparent z-20" />

            {/* Space Background */}
            <Starfield count={525} />
            <MilkyWay />
            <Nebula side="left" />
            <GalaxySpiral />
            <OrbitalRing color="orange" />
            <TinyPlanets count={4} />
            <Planet />
            <ShootingStars count={8} />

            {/* Circuit grid */}
            <div className="absolute inset-0 opacity-30">
              <CircuitGrid color="orange" />
            </div>

            {/* Pulsing orange radial glow — matches center cinematic right edge bleed */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 100% 50%, rgba(249,115,22,0.2) 0%, transparent 60%)",
              }}
              initial={{ opacity: 0.75 }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Warm amber overlay — always visible */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 30% 50%, rgba(251,146,60,0.12) 0%, transparent 60%)",
              }}
            />
            {/* Secondary cyan tint */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 40% 30%, rgba(6,182,212,0.05) 0%, transparent 65%)",
              }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />

            {/* Floating keywords — LEFT (orange/amber) */}
            {leftKeywords.map((kw) => (
              <motion.span
                key={kw.text}
                initial={{ y: "110vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 0.9, 0.9, 0] }}
                transition={{
                  duration: kw.duration,
                  repeat: Infinity,
                  delay: kw.delay,
                  ease: "linear",
                }}
                className={`absolute font-mono ${kw.color} ${kw.size} font-bold tracking-widest`}
                style={{
                  left: kw.left,
                  filter: "drop-shadow(0 0 8px rgba(249,115,22,0.6))",
                  textShadow: "0 0 12px rgba(249,115,22,0.5)",
                }}
              >
                {kw.text}
              </motion.span>
            ))}

            {/* Inner-edge animated glow border */}
            <InnerBorderLine side="left" color="orange" />
          </div>

          {/* ════ RIGHT PANEL ════ */}
          <div
            className="fixed top-0 bottom-0 z-10 pointer-events-none overflow-hidden"
            style={{
              left: `${imageLayout.dx + imageLayout.dw}px`,
              right: 0,
              background: "linear-gradient(to left, #03000e 0%, #1a0210 60%, #250315 100%)",
            }}
          >
            {/* Edge fade */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#190803] to-transparent z-20" />

            {/* Space Background */}
            <Starfield count={525} />
            <MilkyWay />
            <Nebula side="right" />
            <OrbitalRing color="cyan" />
            <TinyPlanets count={3} />
            <DistantMoon />
            <ShootingStars count={8} />

            {/* Circuit grid */}
            <div className="absolute inset-0 opacity-30">
              <CircuitGrid color="cyan" />
            </div>

            {/* Pulsing glow — matches center cinematic left edge bleed (purple/orange) */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 0% 50%, rgba(168,85,247,0.15) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)",
              }}
              initial={{ opacity: 0.75 }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Warm orange bleed from center image — always visible */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 0% 60%, rgba(249,115,22,0.10) 0%, transparent 55%)",
              }}
            />
            {/* Secondary blue tint */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 60% 30%, rgba(59,130,246,0.06) 0%, transparent 65%)",
              }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Floating keywords — RIGHT (cyan) */}
            {rightKeywords.map((kw) => (
              <motion.span
                key={kw.text}
                initial={{ y: "110vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 0.9, 0.9, 0] }}
                transition={{
                  duration: kw.duration,
                  repeat: Infinity,
                  delay: kw.delay,
                  ease: "linear",
                }}
                className={`absolute font-mono ${kw.color} ${kw.size} font-bold tracking-widest`}
                style={{
                  left: kw.left,
                  filter: "drop-shadow(0 0 8px rgba(6,182,212,0.6))",
                  textShadow: "0 0 12px rgba(6,182,212,0.5)",
                }}
              >
                {kw.text}
              </motion.span>
            ))}

            {/* Inner-edge animated glow border */}
            <InnerBorderLine side="right" color="cyan" />
          </div>
        </div>
      )}

      {/* ── Scroll-linked text overlays ── */}
      {!isLoading && <Overlay scrollYProgress={scrollYProgress} imageLayout={imageLayout} />}
    </div>
  );
}
