"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site.config";

/** Premium loading screen: real logo, gold progress line, then a curtain lift. */
export default function Loader({ done, onDone }: { done: boolean; onDone: () => void }) {
  useEffect(() => {
    const min = new Promise((r) => setTimeout(r, 1500));
    const load = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });
    const cap = new Promise((r) => setTimeout(r, 3200));
    Promise.race([Promise.all([min, load]), cap]).then(onDone);
  }, [onDone]);

  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="flex flex-col items-center gap-7">
            <motion.img
              src="/brand/logo-gold-sm.png"
              alt=""
              width={120}
              height={109}
              className="h-28 w-auto drop-shadow-[0_0_40px_rgba(201,162,74,.45)]"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="h-px w-56 overflow-hidden bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-gold-lo via-gold-hi to-gold" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }} />
            </div>
            <span className="eyebrow !tracking-[.5em] text-mist">{site.name}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
