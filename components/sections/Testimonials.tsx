"use client";
import { site } from "@/lib/site.config";
import { enquiryHref } from "@/lib/utils";
import MaskLines from "../MaskLines";
import Fade from "../Fade";

export default function Testimonials() {
  const t = site.testimonials;
  const ext = enquiryHref().startsWith("http");
  return (
    <section id="stories" className="relative bg-coal py-28 md:py-40">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <Fade><p className="eyebrow mb-6 flex items-center gap-4"><span className="h-px w-10 bg-gold" />Member stories</p></Fade>
          <MaskLines lines={["Proof is in", { text: "the work.", className: "gold-text" }]} className="display text-[clamp(3rem,8vw,8rem)]" />
        </div>

        {t.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.map((q, i) => (
              <Fade key={q.name} delay={i * 0.08}>
                <figure className="hairline relative h-full bg-graphite/60 p-8 md:p-10">
                  <span aria-hidden className="serif absolute right-6 top-2 text-8xl text-gold/25">“</span>
                  <blockquote className="serif relative text-2xl leading-snug">{q.quote}</blockquote>
                  <figcaption className="mt-8 border-t border-white/10 pt-5">
                    <p className="display text-xl">{q.name}</p>
                    {q.role && <p className="text-sm text-mist">{q.role}</p>}
                  </figcaption>
                </figure>
              </Fade>
            ))}
          </div>
        ) : (
          <Fade>
            <div className="hairline relative overflow-hidden bg-graphite/50 p-10 md:p-16">
              <span aria-hidden className="serif pointer-events-none absolute -right-2 -top-10 text-[16rem] leading-none text-gold/10">“</span>
              <p className="serif relative max-w-3xl text-3xl leading-snug md:text-5xl">Real stories from our members will live here — in their own words.</p>
              <div className="relative mt-10">
                <a href={enquiryHref(`Hi ${site.name}, I'd like to start my journey.`)} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn btn-ghost">
                  Be the next story
                </a>
              </div>
            </div>
          </Fade>
        )}
      </div>
    </section>
  );
}
