"use client";
import { motion } from "framer-motion";
import { site } from "@/lib/site.config";
import { enquiryHref } from "@/lib/utils";
import MaskLines from "../MaskLines";
import Fade from "../Fade";

export default function Membership() {
  const ext = enquiryHref().startsWith("http");
  return (
    <section id="membership" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(201,162,74,.16), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1300px] px-6 md:px-10">
        <div className="mb-16 text-center md:mb-24">
          <Fade><p className="eyebrow mb-6 inline-flex items-center gap-4"><span className="h-px w-10 bg-gold" />Membership<span className="h-px w-10 bg-gold" /></p></Fade>
          <MaskLines lines={["Pick your", { text: "commitment.", className: "gold-text" }]} className="display text-[clamp(3rem,8vw,8rem)]" />
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {site.plans.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col p-8 md:p-10 ${p.featured ? "md:-my-6 md:py-14" : ""}`}
              style={{
                background: p.featured ? "linear-gradient(160deg, rgba(201,162,74,.16), rgba(10,10,10,.96) 55%)" : "linear-gradient(160deg, rgba(255,255,255,.04), rgba(10,10,10,.96) 60%)",
                boxShadow: p.featured ? "inset 0 0 0 1px rgba(240,213,138,.55), 0 30px 80px -30px rgba(201,162,74,.45)" : "inset 0 0 0 1px rgba(201,162,74,.18)",
              }}
            >
              {p.featured && <span className="absolute -top-3 left-8 bg-gold px-3 py-1 font-display text-xs font-bold uppercase tracking-[.25em] text-black">Most chosen</span>}
              <h3 className="display text-4xl md:text-5xl">{p.name}</h3>
              <p className="mt-1 font-display text-sm uppercase tracking-[.3em] text-gold">{p.duration}</p>

              <div className="my-8 border-y border-white/10 py-6">
                {p.price ? (
                  <p className="display text-6xl gold-text">{p.price}</p>
                ) : (
                  <p className="display text-3xl text-bone/90">Enquire for pricing</p>
                )}
              </div>

              <ul className="mb-10 flex-1 space-y-3 text-mist">
                {p.benefits.length ? (
                  p.benefits.map((b) => (
                    <li key={b} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{b}</li>
                  ))
                ) : (
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />Full details shared on enquiry</li>
                )}
              </ul>

              <a
                href={enquiryHref(`Hi ${site.name}, I'd like to enquire about the ${p.name} membership.`)}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`btn w-full ${p.featured ? "btn-gold" : "btn-ghost"}`}
              >
                Enquire
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
