"use client";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site.config";
import { getGsap } from "@/lib/gsap";
import MaskLines from "../MaskLines";
import Fade from "../Fade";

export default function WhyUs() {
  const list = useRef<HTMLOListElement>(null);
  const items = site.strengths.filter((s) => s.enabled);

  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rule").forEach((r) =>
        gsap.fromTo(r, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: r, start: "top 90%", end: "top 55%", scrub: true } })
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative bg-coal py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(50% 40% at 85% 20%, rgba(201,162,74,.10), transparent 70%)" }} />
      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Fade><p className="eyebrow mb-6 flex items-center gap-4"><span className="h-px w-10 bg-gold" />Why choose us</p></Fade>
            <MaskLines lines={["Built for", "people who", { text: "commit.", className: "gold-text" }]} className="display text-[clamp(3.2rem,7vw,7rem)]" />
            <Fade delay={0.1}><p className="mt-8 max-w-sm text-mist">No gimmicks. Just the things that actually move you forward — done properly, every single session.</p></Fade>
          </div>
        </div>

        <ol ref={list} className="md:col-span-7">
          {items.map((s, i) => (
            <li key={s.title} className="group relative">
              <div className="rule absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-gold via-gold/40 to-transparent" />
              <Fade delay={0.05}>
                <div className="grid grid-cols-[4.5rem_1fr] items-start gap-4 py-9 transition-transform duration-700 ease-[var(--ease-cine)] md:grid-cols-[7rem_1fr] md:py-12 md:group-hover:translate-x-3">
                  <span className="display text-6xl text-white/[.12] transition-colors duration-700 group-hover:text-gold md:text-8xl">0{i + 1}</span>
                  <div>
                    <h3 className="display text-3xl md:text-5xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-mist md:text-lg">{s.text}</p>
                  </div>
                </div>
              </Fade>
            </li>
          ))}
          <li className="relative h-px"><div className="rule absolute inset-0 origin-left bg-gradient-to-r from-gold via-gold/40 to-transparent" /></li>
        </ol>
      </div>
    </section>
  );
}
