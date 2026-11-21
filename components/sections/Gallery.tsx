"use client";
import { motion } from "framer-motion";
import { site } from "@/lib/site.config";
import MaskLines from "../MaskLines";
import Fade from "../Fade";
import ArtPanel from "../ArtPanel";

// asymmetric bento layout — repeats if more photos are added to the config
const SPANS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export default function Gallery() {
  return (
    <section id="experience" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <Fade><p className="eyebrow mb-6 flex items-center gap-4"><span className="h-px w-10 bg-gold" />The gym experience</p></Fade>
            <MaskLines lines={["Step inside", { text: "the work.", className: "serif normal-case gold-text" }]} className="display text-[clamp(3rem,8vw,8rem)]" />
          </div>
          <Fade delay={0.1}><p className="max-w-sm text-mist">Real floors. Real iron. Real people putting in the hours.</p></Fade>
        </div>

        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:auto-rows-[300px] md:auto-rows-[270px] md:grid-cols-12 lg:auto-rows-[300px]">
          {site.gallery.map((g, i) => (
            <motion.figure
              key={g.label + i}
              initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.3, delay: (i % 2) * 0.12, ease: [0.76, 0, 0.24, 1] }}
              className={`group relative overflow-hidden ${SPANS[i % SPANS.length]}`}
            >
              <ArtPanel
                src={g.src}
                alt={g.alt}
                label={g.label}
                variant={i + 1}
                className="absolute inset-0 h-full w-full transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.06]"
                sizes="(min-width:768px) 55vw, 95vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />
              <figcaption className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5 md:p-7">
                <span className="display text-3xl md:text-4xl">{g.label}</span>
                <span className="grid h-11 w-11 translate-y-3 place-items-center rounded-full border border-gold/60 text-gold-hi opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>↗</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
