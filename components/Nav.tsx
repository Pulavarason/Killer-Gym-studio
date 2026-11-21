"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { enquiryHref, scrollToId } from "@/lib/utils";

const HEADER_NAME = "Killer Fitness Studio";

const LINKS = [
  { id: "about", label: "Philosophy" },
  { id: "programs", label: "Programs" },
  { id: "experience", label: "Experience" },
  { id: "why", label: "Why Us" },
  { id: "membership", label: "Membership" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the mobile menu unlock scrolling before travelling
    setTimeout(() => (id === "top" ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToId(id)), open ? 350 : 0);
  };

  const href = enquiryHref();
  const external = href.startsWith("http");

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-[background,backdrop-filter,padding] duration-500 ${scrolled ? "border-b border-gold/15 bg-ink/75 py-2.5 backdrop-blur-xl" : "bg-transparent py-5"}`}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10" aria-label="Primary">
          <a href="#top" onClick={go("top")} className="flex items-center gap-3" aria-label={`${HEADER_NAME} - back to top`}>
            <img src="/brand/logo-gold-sm.png" alt="" width={56} height={51} className={`w-auto transition-all duration-500 ${scrolled ? "h-9" : "h-12"}`} />
            <span className="display hidden text-xl tracking-[.08em] sm:block">{HEADER_NAME}</span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.slice(0, 5).map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="group relative py-2 font-display text-[.95rem] font-semibold uppercase tracking-[.2em] text-bone/80 transition-colors hover:text-gold-hi">
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-hi transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: go("contact") })}
              className="btn btn-gold hidden !px-6 !py-3 !text-[.82rem] sm:inline-flex"
            >
              Enquire now
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] grid h-12 w-12 place-items-center lg:hidden"
            >
              <span className={`absolute h-px w-7 bg-bone transition-all duration-500 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-px w-7 bg-bone transition-all duration-500 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-px w-7 bg-bone transition-all duration-500 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: bar }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold-lo via-gold-hi to-gold" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="grain fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-ink px-7 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -right-24 top-1/3 w-[420px] opacity-[.12]">
              <img src="/brand/logo-gold-sm.png" alt="" width={415} height={376} />
            </div>
            <ul className="relative flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <a href={`#${l.id}`} onClick={go(l.id)} className="display flex items-baseline gap-4 border-b border-white/5 py-3.5 text-[clamp(2.4rem,11vw,3.6rem)] active:text-gold-hi">
                    <span className="font-display text-sm tracking-[.3em] text-gold">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="relative mt-10">
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: go("contact") })} className="btn btn-gold w-full">
                Enquire now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
