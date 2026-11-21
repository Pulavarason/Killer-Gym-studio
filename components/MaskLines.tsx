"use client";
import { useEffect, useRef, type ElementType } from "react";
import { useReducedMotion } from "framer-motion";
import { getGsap } from "@/lib/gsap";

/**
 * Line-by-line masked headline reveal, triggered on scroll.
 * Each entry in `lines` is its own masked line; wrap a line in {text, className} to style it.
 */
export type Line = string | { text: string; className?: string };

export default function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  trigger = true,
}: {
  lines: Line[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** set false to hold the animation until it becomes true (used for the hero after the loader) */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>(".mask > span");
    if (reduce || !trigger) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(spans, { yPercent: 110, opacity: 1 }, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [reduce, delay, trigger]);

  return (
    <Tag ref={ref} className={`${className} ${reduce ? "" : "mask-hidden"}`}>
      {lines.map((l, i) => {
        const t = typeof l === "string" ? l : l.text;
        const c = typeof l === "string" ? "" : l.className ?? "";
        return (
          <span key={i} className="mask">
            <span className={c}>
              {t}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
