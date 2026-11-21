"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site.config";
import MaskLines from "../MaskLines";
import Fade from "../Fade";
import ArtPanel from "../ArtPanel";

const PRINCIPLES = [
  { k: "Discipline", t: "Show up. Do the work. Repeat — until it becomes who you are." },
  { k: "Coaching", t: "Guidance that meets you where you are and asks for more." },
  { k: "Community", t: "A room full of people raising each other's standard." },
];
const WORDS = ["Strength", "Discipline", "Power", "Performance", "Transformation"];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-ink pt-28 md:pt-44">
      <span aria-hidden className="display pointer-events-none absolute -left-6 top-10 select-none text-[28vw] leading-none text-white/[.025]">01</span>
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-y-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-8">
          <Fade><p className="eyebrow mb-7 flex items-center gap-4"><span className="h-px w-10 bg-gold" />Our philosophy</p></Fade>
          <MaskLines
            lines={["More than a gym.", { text: "A different standard.", className: "outline-text" }]}
            className="display text-[clamp(3rem,9vw,9rem)]"
          />
        </div>

        <motion.div style={{ y: yText }} className="md:col-span-4 md:col-start-9 md:mt-40">
          <Fade delay={0.1}>
            <p className="serif text-3xl leading-snug text-bone md:text-[2.1rem]">Strength is the foundation. Discipline is what holds it up.</p>
            <p className="mt-6 text-mist">
              {site.name} is built for people who want more than a workout. We don&apos;t sell shortcuts — we create an environment where effort is expected,
              progress is measured and nobody trains alone.
            </p>
          </Fade>
        </motion.div>

        <div className="relative md:col-span-5 md:col-start-2">
          <motion.div style={{ y }} className="relative">
            <Fade y={60}>
              <ArtPanel src={site.gallery[0]?.src} alt={site.gallery[0]?.alt ?? "Training floor"} label="Standard" variant={2} className="aspect-[4/5] w-full" sizes="(min-width:768px) 40vw, 90vw" />
              <div className="absolute -bottom-6 -right-3 hidden border border-gold/30 bg-ink/90 px-6 py-5 backdrop-blur md:block">
                <p className="eyebrow !text-[.68rem]">Train different</p>
                <p className="display mt-1 text-4xl gold-text">Every day.</p>
              </div>
            </Fade>
          </motion.div>
        </div>

        <ul className="flex flex-col justify-end divide-y divide-white/10 md:col-span-5 md:col-start-8 md:pb-10">
          {PRINCIPLES.map((p, i) => (
            <Fade key={p.k} delay={i * 0.1}>
              <li className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-7">
                <span className="font-display text-sm tracking-[.3em] text-gold">0{i + 1}</span>
                <div>
                  <h3 className="display text-3xl transition-colors duration-500 group-hover:text-gold-hi md:text-4xl">{p.k}</h3>
                  <p className="mt-2 text-mist">{p.t}</p>
                </div>
              </li>
            </Fade>
          ))}
        </ul>
      </div>

      {/* marquee */}
      <div className="relative mt-28 overflow-hidden border-y border-gold/15 py-6 md:mt-40" aria-hidden>
        <div className="flex w-max gap-12 whitespace-nowrap" style={{ animation: "marquee 38s linear infinite" }}>
          {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="display flex items-center gap-12 text-5xl md:text-7xl">
              <span className={i % 2 ? "outline-text" : "text-bone/90"}>{w}</span>
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
