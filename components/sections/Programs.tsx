"use client";
import { motion } from "framer-motion";
import { site } from "@/lib/site.config";
import { enquiryHref } from "@/lib/utils";
import MaskLines from "../MaskLines";
import Fade from "../Fade";
import ArtPanel from "../ArtPanel";

export default function Programs() {
  const items = site.programs.filter((p) => p.enabled);
  return (
    <section id="programs" className="relative bg-coal py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-16 grid items-end gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-8">
            <Fade><p className="eyebrow mb-6 flex items-center gap-4"><span className="h-px w-10 bg-gold" />Training programs</p></Fade>
            <MaskLines lines={["Choose your", { text: "discipline.", className: "gold-text" }]} className="display text-[clamp(3rem,8vw,8rem)]" />
          </div>
          <Fade className="md:col-span-4" delay={0.1}>
            <p className="text-mist">Every program is built around progression, technique and consistency — so the work you put in shows up in the results.</p>
          </Fade>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {items.map((p, i) => (
            <motion.a
              key={p.title}
              href={enquiryHref(`Hi ${site.name}, I'm interested in ${p.title}.`)}
              {...(enquiryHref().startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative block aspect-[4/5] overflow-hidden ${i % 3 === 1 ? "lg:translate-y-14" : ""} focus-visible:outline-gold-hi`}
              aria-label={`${p.title} — enquire`}
            >
              <ArtPanel
                src={p.image}
                alt={p.title}
                variant={i}
                className="absolute inset-0 h-full w-full transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.07]"
                sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
              {/* sweeping gold frame */}
              <span className="pointer-events-none absolute inset-3 border border-gold/0 transition-all duration-700 group-hover:inset-4 group-hover:border-gold/60" />
              <span className="absolute left-0 top-0 h-px w-0 bg-gold-hi transition-all duration-700 group-hover:w-full" />

              <span className="display absolute right-5 top-4 text-6xl text-white/10 transition-colors duration-700 group-hover:text-gold/40">0{i + 1}</span>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="display text-4xl md:text-[2.6rem]">{p.title}</h3>
                <div className="grid grid-rows-[1fr] transition-all duration-700 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 max-w-xs text-sm text-bone/80">{p.description}</p>
                    <span className="mt-4 inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[.22em] text-gold-hi">
                      Enquire <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      <div className="h-14 lg:h-20" />
    </section>
  );
}
