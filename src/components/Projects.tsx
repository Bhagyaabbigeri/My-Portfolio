"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Code2,
  Satellite,
  Smartphone,
  Cpu,
  Trophy,
  Brain,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

/* ─── Custom Icons for compatibility ─── */
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function LeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function RightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  language: string;
  langColor: string;
  icon: React.ElementType;
  accent: string;
  image?: string;
  screenshots?: string[];
}

const projects: ProjectItem[] = [
  {
    id: "spacerisk-radar",
    num: "01",
    title: "SpaceRisk-Radar",
    desc: "A high-fidelity Space Situational Awareness platform. Features real-time SGP4/SDP4 propagation for 2,000+ satellites, conjunction threat detection, and advanced risk layers including debris cloud tracking and collision probability heatmaps.",
    tags: ["Python", "Flask", "SGP4", "Three.js", "Socket.IO", "Telemetry", "SSA"],
    link: "https://github.com/Bhagyaabbigeri/SpaceRisk-Radar",
    language: "Python",
    langColor: "#3572A5",
    icon: Satellite,
    accent: "from-cyan-500/30 to-blue-400/10",
    image: "/projects/spacerisk_main1.png",
    screenshots: [
      "/projects/spacerisk_main1.png",
      "/projects/spacerisk_main2.png",
      "/projects/spacerisk_main3.png",
      "/projects/spacerisk_main4.png",
      "/projects/spacerisk_main5.png",
    ],
  },
  {
    id: "gokulahealth",
    num: "02",
    title: "GokulaHealth",
    desc: "A comprehensive offline-first Android livestock management ecosystem. Built with MVVM + Clean Architecture, featuring automated milk yield analytics via MPAndroidChart, an intelligent vaccination scheduler with WorkManager, and multi-breed livestock profile management.",
    tags: ["Kotlin", "MVVM", "Room", "Hilt", "WorkManager", "Jetpack Compose", "MPAndroidChart"],
    link: "https://github.com/Bhagyaabbigeri/GokulaHealth",
    language: "Kotlin",
    langColor: "#A97BFF",
    icon: Smartphone,
    accent: "from-green-500/30 to-emerald-400/10",
    image: "/projects/GokulaHealth-1.png",
    screenshots: [
      "/projects/GokulaHealth-1.png",
      "/projects/GokulaHealth-2.png",
      "/projects/GokulaHealth-3.png",
      "/projects/GokulaHealth-4.png",
      "/projects/GokulaHealth-5.png",
    ],
  },
  {
    id: "empowerher",
    num: "03",
    title: "EmpowerHer",
    desc: "A comprehensive women's safety and empowerment platform. Features a one-tap SOS system with real-time GPS location sharing via Twilio, an AI-powered safety assistant for legal and self-defense guidance, and a community hub for mentorship and safe accommodation discovery.",
    tags: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Twilio", "AI Assistant"],
    link: "https://github.com/Bhagyaabbigeri/EmpowerHer",
    language: "TypeScript",
    langColor: "#3178C6",
    icon: Smartphone,
    accent: "from-rose-500/30 to-pink-400/10",
    image: "/projects/EmpowerHer-1.png",
    screenshots: [
      "/projects/EmpowerHer-1.png",
      "/projects/EmpowerHer-2.png",
      "/projects/EmpowerHer-3.png",
      "/projects/EmpowerHer-4.png",
      "/projects/EmpowerHer-5.png",
    ],
  },
  {
    id: "real-time-face-recognition",
    num: "04",
    title: "Real-time Face Recognition",
    desc: "Real-time face recognition system using OpenCV and LBPH algorithm for high-accuracy biometric identification.",
    tags: ["Python", "OpenCV", "LBPH Algorithm", "Face Recognition"],
    link: "https://github.com/Bhagyaabbigeri/Real-time-face-recongnition",
    language: "Python",
    langColor: "#3572A5",
    icon: Brain,
    accent: "from-rose-500/20 to-orange-400/10",
  },
  {
    id: "hackvyuha-03",
    num: "05",
    title: "HackVyuha-03",
    desc: "Hackathon project that secured a top 50 ranking out of 150 teams at BLDEAs HackVyuha.",
    tags: ["JavaScript", "HTML", "CSS", "Hackathon"],
    link: "https://github.com/Bhagyaabbigeri/HackVyuha-03",
    language: "JavaScript",
    langColor: "#F1E05A",
    icon: Trophy,
    accent: "from-amber-500/30 to-orange-400/10",
  },
  {
    id: "sde-full-stack",
    num: "06",
    title: "SDE-Full-Stack",
    desc: "Full-stack development projects from SDE Internship at Algorithms365, focusing on scalable Java systems.",
    tags: ["Java", "Full Stack", "Spring", "Database"],
    link: "https://github.com/Bhagyaabbigeri/SDE-Full-Stack",
    language: "Java",
    langColor: "#B07219",
    icon: Cpu,
    accent: "from-cyan-500/20 to-violet-400/10",
  },
];

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const Icon = project.icon;

  const images = project.screenshots || (project.image ? [project.image] : []);

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative w-full max-w-6xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.01] backdrop-blur-xl overflow-hidden mb-20 md:mb-32 flex flex-col shadow-2xl group"
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${project.accent} pointer-events-none`} />

      {/* ── CARD HEADER ── */}
      <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-orange-400 group-hover:text-white group-hover:bg-orange-500/20 transition-all duration-500 shadow-inner`}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 font-mono text-xs font-bold tracking-widest">{project.num}</span>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white group-hover:text-orange-200 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] text-zinc-500 font-mono group-hover:border-orange-500/20 group-hover:text-orange-300 transition-all duration-300 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-400 font-mono font-bold tracking-widest uppercase self-start md:self-auto shadow-sm">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.langColor }} />
          {project.language}
        </div>
      </div>

      {/* ── IMAGE SHOWCASE (SLIDER) ── */}
      <div className="relative w-full aspect-video min-h-[350px] md:min-h-[500px] overflow-hidden bg-black/40 group/slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={images[currentImg]}
              alt={`${project.title} showcase ${currentImg + 1}`}
              fill
              className="object-contain p-4 md:p-8"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-orange-500/40 hover:border-orange-500/50 transition-all z-20 backdrop-blur-md opacity-0 group-hover/slider:opacity-100"
            >
              <LeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-orange-500/40 hover:border-orange-500/50 transition-all z-20 backdrop-blur-md opacity-0 group-hover/slider:opacity-100"
            >
              <RightIcon className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImg ? "w-8 bg-orange-500" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── CARD FOOTER ── */}
      <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10 bg-gradient-to-b from-transparent to-black/20">
        <div className="space-y-6 flex-1">
          <div className="space-y-3">
            <h4 className="text-orange-400 font-mono text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Project Intel
            </h4>
            <p className="text-zinc-300 text-sm md:text-lg leading-relaxed font-light max-w-3xl">
              {project.desc}
            </p>
          </div>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-xs md:text-sm font-bold text-orange-400 tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] whitespace-nowrap"
        >
          <GithubIcon className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Deploy Artifact</span>
          <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors hover:bg-red-500/20 hover:border-red-500/50"
            >
              <CloseIcon className="w-8 h-8" />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={images[currentImg]}
                alt={`${project.title} lightbox`}
                fill
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImg(e); }}
                  className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/50 transition-all"
                >
                  <LeftIcon className="w-10 h-10" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImg(e); }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/50 transition-all"
                >
                  <RightIcon className="w-10 h-10" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SimpleProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const Icon = project.icon;
  return (
    <motion.a
      key={project.id}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full"
    >
      {/* Glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${project.accent} pointer-events-none`} />

      <div className="relative p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-orange-400 group-hover:text-white group-hover:bg-orange-500/20 transition-all duration-300`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-zinc-700 font-mono text-[10px] font-bold tracking-widest">{project.num}</span>
          </div>

          {/* Language badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[9px] text-zinc-400 font-mono font-bold tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: project.langColor }} />
            {project.language}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-200 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">
            {project.desc}
          </p>
        </div>

        {/* Tech Badges & View Link */}
        <div className="space-y-4 pt-4 border-t border-white/[0.05] z-10">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[9px] text-zinc-500 font-mono group-hover:border-orange-500/20 group-hover:text-orange-300 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Interactive Button */}
          <div className="group/btn relative inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[10px] font-bold text-orange-400 tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <span className="relative z-10">Deploy Artifact</span>
            <ArrowUpRight className="w-3 h-3 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const featuredProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  return (
    <section id="projects" className="relative w-full bg-[#030014] px-6 py-14 md:py-32 z-20 overflow-hidden">

      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/3 w-[800px] h-[800px] rounded-full bg-orange-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/[0.05] blur-[140px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
        <h2 className="text-[5rem] sm:text-[10rem] md:text-[22rem] font-black text-white tracking-tighter uppercase">
          PROJECTS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <div className="space-y-10 mb-20 md:mb-32 text-center md:text-left">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2 px-4"
            >
              <div className="flex items-center justify-center md:justify-start gap-3 text-orange-400 font-mono text-sm md:text-lg font-bold tracking-[0.4em] uppercase">
                <Code2 className="w-6 h-6 animate-pulse" />
                SELECTED PROJECTS
              </div>
              <div className="h-[2px] w-32 bg-gradient-to-r from-orange-500 to-transparent mx-auto md:mx-0" />
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white leading-none"
              >
                THINGS I&apos;VE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-violet-400">
                  BUILT
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 max-w-xl mx-auto md:mx-0 text-xs md:text-base leading-relaxed tracking-wide font-light"
              >
                Architecting real-world applications spanning space technology, mobile health, computer vision, and high-performance algorithms.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ── FEATURED PROJECTS (STACKED) ── */}
        <div className="flex flex-col">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* ── OTHER PROJECTS (GRID) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {otherProjects.map((project, idx) => (
            <SimpleProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
