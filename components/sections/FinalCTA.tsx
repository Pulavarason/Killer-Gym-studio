"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site.config";
import { enquiryHref } from "@/lib/utils";
import MaskLines from "../MaskLines";
import Magnetic from "../Magnetic";
import Fade from "../Fade";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 1.15]);
  const href = enquiryHref(`Hi ${site.name}, I'm ready to join.`);
  const ext = href.startsWith("http");

  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-6 py-32 text-center">
      <div className="absolute inset-0" style={{ background: "radial-gradient(55% 55% at 50% 50%, rgba(201,162,74,.28), rgba(5,5,5,0) 70%)" }} />
      <motion.img
        src="/brand/logo-gold.png"
        alt=""
        width={415}
        height={376}
        style={{ y, scale: s }}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-[.13] md:w-[70vw]"
      />
      {[1, 2, 3].map((r) => (
        <span key={r} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" style={{ width: `${r * 38}vmax`, height: `${r * 38}vmax` }} />
      ))}

      <div className="relative z-10">
        <Fade><p className="eyebrow mb-8">The standard is waiting</p></Fade>
        <MaskLines lines={["Your next chapter", { text: "starts here.", className: "gold-text sheen" }]} className="display text-[clamp(3.2rem,10.5vw,10.5rem)]" />
        <Fade delay={0.15}>
          <div className="mt-12">
            <Magnetic strength={0.35}>
              <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: (e: React.MouseEvent) => (e.preventDefault(), document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })) })} className="btn btn-gold !px-12 !py-6 !text-lg">
                Join the movement
              </a>
            </Magnetic>
          </div>
        </Fade>
      </div>
    </section>
  );
}
