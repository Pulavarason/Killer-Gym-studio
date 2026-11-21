import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Shows a real photo when one is supplied via site.config; otherwise a designed
 * gold-on-graphite art panel so the layout is complete without stock imagery.
 */
export default function ArtPanel({
  src,
  alt,
  label,
  variant = 0,
  className,
  sizes = "(min-width:1024px) 40vw, 90vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  label?: string;
  variant?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-graphite", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      </div>
    );
  }
  const a = [20, 140, 60, 200, 100, 170][variant % 6];
  return (
    <div role="img" aria-label={alt} className={cn("relative overflow-hidden bg-graphite", className)}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at ${30 + (variant * 17) % 50}% ${20 + (variant * 23) % 50}%, rgba(201,162,74,.28), transparent 55%), linear-gradient(${a}deg, #0d0d0d 0%, #181510 55%, #070707 100%)`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[.34]" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`g${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0d58a" />
            <stop offset="1" stopColor="#8a6a24" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={-60 + i * 62} y1="520" x2={140 + i * 62} y2="-20" stroke={`url(#g${variant})`} strokeWidth={i % 3 === 0 ? 1.4 : 0.5} />
        ))}
        <circle cx="300" cy="120" r="120" fill="none" stroke={`url(#g${variant})`} strokeWidth=".6" />
        <circle cx="300" cy="120" r="78" fill="none" stroke={`url(#g${variant})`} strokeWidth=".4" />
      </svg>
      {label && (
        <span className="display absolute -bottom-3 -left-1 select-none text-[clamp(4rem,14vw,9rem)] leading-none text-white/[.045]">{label}</span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  );
}
