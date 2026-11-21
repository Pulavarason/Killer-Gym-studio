"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site.config";
import ArtPanel from "../ArtPanel";

export default function Environment() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0.05, 0.4], [12, 0]);
  const clip = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.02]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const textY = useTransform(scrollYProgress, [0.2, 0.8], ["12%", "-12%"]);
  const g = site.gallery[1] ?? site.gallery[0];

  return (
    <section ref={ref} className="relative h-[130svh] bg-ink md:h-[150svh]" aria-label="Training environment">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale }} className="absolute inset-0">
            <ArtPanel src={g?.src} alt={g?.alt ?? "Training environment"} label="Atmosphere" variant={4} className="h-full w-full" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
          <motion.img
            src="/brand/logo-gold.png"
            alt=""
            width={415}
            height={376}
            style={{ y: logoY }}
            className="pointer-events-none absolute right-[-12%] top-1/4 w-[75%] max-w-[780px] opacity-[.14] md:right-[2%] md:w-[42%]"
          />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-14 md:pb-24">
          <p className="eyebrow mb-6 flex items-center gap-4"><span className="h-px w-10 bg-gold" />The training environment</p>
          <h2 className="serif max-w-5xl text-[clamp(2.8rem,8vw,8.5rem)] leading-[.95]">
            Where effort becomes <span className="gold-text">identity.</span>
          </h2>
          <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              ["Focused", "Distraction-free, work-first energy."],
              ["Intense", "A floor that rewards effort."],
              ["Supportive", "People who push you forward."],
            ].map(([k, t]) => (
              <div key={k} className="border-t border-gold/40 pt-4">
                <p className="display text-2xl">{k}</p>
                <p className="mt-1 text-sm text-mist">{t}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
