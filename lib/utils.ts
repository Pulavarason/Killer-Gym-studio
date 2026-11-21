import { site } from "./site.config";

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** WhatsApp enquiry link if a number is configured, otherwise jump to the contact block. */
export function enquiryHref(message = `Hi ${site.name}, I'd like to know more about joining.`) {
  const n = site.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : "#contact";
}
export const isExternal = (href: string) => href.startsWith("http");

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
