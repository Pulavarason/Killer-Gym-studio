"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getGsap } from "@/lib/gsap";
import { site } from "@/lib/site.config";
import { scrollToId } from "@/lib/utils";
import MaskLines from "./MaskLines";
import Magnetic from "./Magnetic";

const GymScene = dynamic(() => import("./three/GymScene"), { ssr: false });

const STATION_COUNT = 5; // keep in sync with components/three/GymScene.tsx

type Mode = "pending" | "3d" | "static";

const CAPTIONS = [
  { k: "01 — Strength", h: ["BUILT UNDER", "THE BAR."], p: "Heavy iron, honest effort. Every rep earns its place.", side: "left" },
  { k: "02 — Discipline", h: ["SHOW UP.", "EVERY SINGLE DAY."], p: "Consistency is the only shortcut worth taking.", side: "right" },
  { k: "03 — Performance", h: ["TRAIN WITH", "PURPOSE."], p: "Strength, conditioning and movement — held to one standard.", side: "left" },
  { k: "04 — Your Move", h: ["STEP INTO", "THE STANDARD."], p: "This is where the work begins.", side: "center" },
] as const;

function detect(): { mode: Mode; lite: boolean } {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let gl = false;
  try {
    const c = document.createElement("canvas");
    gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    gl = false;
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lite = window.matchMedia("(max-width: 767px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) < 4;
  return { mode: reduce || !gl ? "static" : "3d", lite };
}

function HeroCopy({ ready }: { ready: boolean }) {
  return (
    <div className="w-full max-w-[1300px]">
      <motion.p className="eyebrow mb-5 md:mb-6 flex items-center gap-4" initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}>
        <span className="h-px w-10 bg-gold" /> {site.name}
      </motion.p>
      <MaskLines
        as="h1"
        trigger={ready}
        delay={0.15}
        className="display text-[clamp(2.6rem,7.4vw,8.4rem)]"
        lines={["Forged by discipline.", { text: "Defined by strength.", className: "gold-text sheen" }]}
      />
      <motion.p
        className="mt-7 max-w-md text-base text-mist md:text-lg"
        initial={{ opacity: 0, y: 18 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.85 }}
      >
        Your transformation begins where your excuses end.
      </motion.p>
      <motion.div className="mt-9 flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 18 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 1.05 }}>
        <Magnetic>
          <a href="#membership" onClick={(e) => (e.preventDefault(), scrollToId("membership"))} className="btn btn-gold">
            Start your journey
          </a>
        </Magnetic>
        <Magnetic>
          <a href="#programs" onClick={(e) => (e.preventDefault(), scrollToId("programs"))} className="btn btn-ghost">
            Explore the gym
          </a>
        </Magnetic>
      </motion.div>
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 md:flex" aria-hidden>
      <span className="eyebrow !text-[.65rem] !tracking-[.4em] text-mist">Scroll</span>
      <span className="relative block h-12 w-px overflow-hidden bg-white/15">
        <span className="absolute inset-x-0 top-0 block h-1/2 bg-gold-hi" style={{ animation: "scrollcue 2s var(--ease-cine) infinite" }} />
      </span>
    </div>
  );
}

export default function CinematicHero({ ready }: { ready: boolean }) {
  const [mode, setMode] = useState<Mode>("pending");
  const [lite, setLite] = useState(false);
  const [active, setActive] = useState(true);
  const runway = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const d = detect();
    setLite(d.lite);
    setMode(d.mode);
  }, []);

  const fallback = useCallback(() => setMode("static"), []);

  useEffect(() => {
    if (mode !== "3d" || !runway.current) return;
    const { gsap, ScrollTrigger } = getGsap();
    const step = 1 / (STATION_COUNT - 1);
    const paint = (p: number) => {
      progress.current = p;
      layers.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(p - i * step) / (step * 0.42);
        const w = Math.max(0, 1 - d);
        const e = w * w * (3 - 2 * w);
        el.style.opacity = String(e);
        el.style.transform = `translate3d(0, ${(1 - e) * (p > i * step ? -26 : 26)}px, 0)`;
        el.style.visibility = e < 0.01 ? "hidden" : "visible";
        el.style.pointerEvents = e > 0.6 ? "auto" : "none";
      });
      dots.current.forEach((el, i) => {
        if (!el) return;
        const on = Math.abs(p - i * step) < step / 2;
        el.style.background = on ? "#f0d58a" : "rgba(255,255,255,.22)";
        el.style.transform = on ? "scale(1.5)" : "scale(1)";
      });
    };
    paint(0);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: runway.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (s) => paint(s.progress),
      });
      // render only while the runway is near the viewport
      ScrollTrigger.create({
        trigger: runway.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (s) => setActive(s.isActive),
      });
    }, runway);
    return () => ctx.revert();
  }, [mode]);

  /* ——— static / no-WebGL / reduced-motion fallback ——— */
  // On phones, keep the intro to one viewport so Philosophy follows immediately.
  if (mode !== "3d" || lite) {
    return (
      <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink px-6 pb-20 pt-32 md:px-14">
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 72% 40%, rgba(201,162,74,.25), transparent 65%), linear-gradient(180deg,#050505,#0d0b07 60%,#050505)" }} />
        <img src="/brand/logo-gold.png" alt={`${site.name} logo`} width={415} height={376} className="pointer-events-none absolute right-[-8%] top-[8%] w-[85%] max-w-[760px] opacity-90 drop-shadow-[0_0_80px_rgba(201,162,74,.35)] md:right-[4%] md:top-[12%] md:w-[44%]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        <div className="relative z-10">
          <HeroCopy ready={ready || mode === "static"} />
        </div>
      </section>
    );
  }

  return (
    <section id="top" ref={runway} className="relative" style={{ height: lite ? "440vh" : "540vh" }} aria-label="Cinematic introduction">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <GymScene progress={progress} lite={lite} active={active} athleteModel={site.athleteModel} onError={fallback} />
        </div>
        {/* cinematic grade */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 40%, rgba(0,0,0,.75) 100%)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

        {/* scene 0 — hero copy */}
        <div ref={(el) => void (layers.current[0] = el)} className="absolute inset-0 flex items-end px-6 pb-24 will-change-transform md:px-14 md:pb-20">
          <HeroCopy ready={ready} />
          <ScrollCue />
        </div>

        {/* scenes 1–4 — captions */}
        {CAPTIONS.map((c, i) => (
          <div
            key={c.k}
            ref={(el) => void (layers.current[i + 1] = el)}
            className={`invisible absolute inset-0 flex items-end px-6 pb-24 will-change-transform md:px-14 md:pb-24 ${c.side === "right" ? "justify-end text-right" : c.side === "center" ? "justify-center text-center" : ""}`}
          >
            <div className="max-w-2xl">
              <p className={`eyebrow mb-5 flex items-center gap-4 ${c.side === "right" ? "justify-end" : c.side === "center" ? "justify-center" : ""}`}>
                <span className="h-px w-10 bg-gold" /> {c.k}
              </p>
              <h2 className="display text-[clamp(2.8rem,7.5vw,7rem)]">
                {c.h[0]}
                <br />
                <span className="gold-text">{c.h[1]}</span>
              </h2>
              <p className="mt-5 max-w-md text-mist md:text-lg">{c.p}</p>
              {i === 3 && (
                <div className="mt-8">
                  <Magnetic>
                    <a href="#about" onClick={(e) => (e.preventDefault(), scrollToId("about"))} className="btn btn-gold">
                      Enter
                    </a>
                  </Magnetic>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* progress rail */}
        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex" aria-hidden>
          {Array.from({ length: STATION_COUNT }).map((_, i) => (
            <span key={i} ref={(el) => void (dots.current[i] = el)} className="block h-1.5 w-1.5 rounded-full transition-all duration-500" />
          ))}
        </div>
      </div>
    </section>
  );
}
