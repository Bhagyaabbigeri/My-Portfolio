"use client";

import React, { useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import { MessageSquareCode, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IntroSection,
  EducationSection,
  SkillsSection,
  ExperienceSection,
  AchievementsSection,
  ContactSection,
} from "@/components/PortfolioSections";

// Self-contained custom SVG components for brand logos (since lucide v1.x removed brand icons)
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#intro" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#030014] text-[#f4f4f5] select-none">
      
      {/* Sticky Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-[110] bg-[#030014]/90 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-mono text-[10px] md:text-sm font-bold tracking-widest text-white uppercase whitespace-nowrap">
            BHAGYASHREE REDDY
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex space-x-6 text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-200">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/bhagyashree-reddy"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/20 border border-orange-500/30 hover:border-orange-400 hover:bg-orange-900/30 text-xs font-mono text-orange-200 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            Connect
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-[#030014] border-b border-white/5 flex flex-col items-center space-y-6 xl:hidden overflow-hidden"
            >
              <div className="py-10 flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs font-mono tracking-[0.3em] text-zinc-400 hover:text-white uppercase transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="https://linkedin.com/in/bhagyashree-reddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden inline-flex items-center gap-2 px-8 py-3 rounded-full bg-orange-500 text-black font-bold text-[10px] font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connect
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Layout Sections */}
      <main className="w-full">
        {/* Scrollytelling Interactive Area */}
        <ScrollyCanvas />

        {/* SECTION 1 — INTRO */}
        <IntroSection />

        {/* SECTION 2 — EDUCATION */}
        <EducationSection />

        {/* SECTION 3 — TECHNICAL SKILLS */}
        <SkillsSection />

        {/* SECTION 4 — EXPERIENCE */}
        <ExperienceSection />

        {/* SECTION 5 — PROJECTS */}
        <Projects />

        {/* SECTION 6 — ACHIEVEMENTS */}
        <AchievementsSection />

        {/* SECTION 7 — CONTACT */}
        <ContactSection />
      </main>
    </div>
  );
}

