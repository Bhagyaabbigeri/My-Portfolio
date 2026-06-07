"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Satellite,
  Smartphone,
  BookOpen,
  Cpu,
  Trophy,
  Brain,
  ArrowUpRight,
} from "lucide-react";

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
}

const projects: ProjectItem[] = [
  {
    id: "spacerisk-radar",
    num: "01",
    title: "SpaceRisk-Radar",
    desc: "Built a real-time SSA platform propagating 2,000+ satellites via SGP4/SDP4 with conjunction screening, collision probability estimation, and a 3D Three.js globe with live trajectories and Kessler syndrome simulation.",
    tags: ["Python", "Flask", "Flask-SocketIO", "SGP4", "Three.js", "Socket.IO", "SQLite", "PyJWT"],
    link: "https://github.com/Bhagyaabbigeri/SpaceRisk-Radar",
    language: "Python",
    langColor: "#3572A5",
    icon: Satellite,
    accent: "from-orange-500/30 to-amber-400/10",
  },
  {
    id: "gokulahealth",
    num: "02",
    title: "GokulaHealth",
    desc: "Built an offline-first Android cattle farm app with MVVM + Clean Architecture, featuring livestock profiles, milk yield tracking, MPAndroidChart analytics, and a WorkManager-powered vaccination scheduler.",
    tags: ["Kotlin", "MVVM", "Room", "Hilt", "WorkManager", "Jetpack Navigation", "MPAndroidChart", "Material Design 3"],
    link: "https://github.com/Bhagyaabbigeri/GokulaHealth",
    language: "Kotlin",
    langColor: "#A97BFF",
    icon: Smartphone,
    accent: "from-violet-500/30 to-purple-400/10",
  },
  {
    id: "empowerher",
    num: "03",
    title: "EmpowerHer",
    desc: "Built a full-stack women's safety platform with one-tap SOS, Twilio SMS/voice alerts, GPS tracking, AI threat detection, and an empowerment hub, backed by JWT auth, Firebase, and MongoDB + Express REST API.",
    tags: ["React", "TypeScript", "Vite", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Twilio", "Firebase"],
    link: "https://github.com/Bhagyaabbigeri/EmpowerHer",
    language: "TypeScript",
    langColor: "#3178C6",
    icon: Smartphone,
    accent: "from-purple-500/30 to-pink-400/10",
  },
  {
    id: "real-time-face-recognition",
    num: "04",
    title: "Real-time-face-recongnition",
    desc: "Real-time face recognition system using OpenCV and LBPH algorithm.",
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
    desc: "Hackathon project (Top 50/150 at BLDEAs HackVyuha).",
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
    desc: "Full-stack development projects from SDE Internship at Algorithms365.",
    tags: ["Java", "Full Stack", "Spring", "Database"],
    link: "https://github.com/Bhagyaabbigeri/SDE-Full-Stack",
    language: "Java",
    langColor: "#B07219",
    icon: Cpu,
    accent: "from-cyan-500/20 to-violet-400/10",
  },
];


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="relative w-full bg-[#030014] px-6 py-14 md:py-22 z-20 overflow-hidden">

      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/3 w-[800px] h-[800px] rounded-full bg-orange-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/[0.05] blur-[140px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
        <h2 className="text-[5rem] sm:text-[10rem] md:text-[18rem] font-black text-white tracking-tighter">
          CREATIONS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── PROJECTS SECTION ── */}
        <div className="space-y-10">

          {/* Header */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2 px-4"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 text-orange-400 font-mono text-[10px] sm:text-sm md:text-base font-bold tracking-[0.3em] uppercase">
                <Code2 className="w-5 h-5 animate-pulse" />
                Selected Projects
              </div>
              <div className="h-[2px] w-20 bg-gradient-to-r from-orange-500 to-transparent mx-auto md:mx-0" />
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left px-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none"
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
                className="text-zinc-400 max-w-md mx-auto md:mx-0 text-[10px] sm:text-xs md:text-sm leading-relaxed tracking-wide font-light"
              >
                Architecting real-world applications spanning space technology, mobile health, computer vision, and high-performance algorithms.
              </motion.p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  {/* Glow on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${project.accent} pointer-events-none`}
                  />

                  <div className="relative p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3.5 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-orange-400 group-hover:text-white group-hover:bg-orange-500/20 transition-all duration-300`}>
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
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
