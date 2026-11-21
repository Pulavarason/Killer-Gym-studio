import { site } from "@/lib/site.config";

const NAV = [
  ["#about", "Philosophy"],
  ["#programs", "Programs"],
  ["#experience", "Experience"],
  ["#why", "Why us"],
  ["#membership", "Membership"],
];

const waHref = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}` : "";

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const cls = "grid h-12 w-12 place-items-center border border-gold/30 text-bone transition-all duration-500";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} hover:border-gold-hi hover:bg-gold hover:text-black`}>
      {children}
    </a>
  ) : (
    <span aria-label={`${label} (coming soon)`} className={`${cls} cursor-not-allowed opacity-40`}>
      {children}
    </span>
  );
}

export default function Footer() {
  const Row = ({ k, v, href }: { k: string; v: string; href?: string }) => (
    <div>
      <dt className="eyebrow !text-[.68rem] !tracking-[.3em]">{k}</dt>
      <dd className="mt-1 text-bone/90">{v ? (href ? <a href={href} className="hover:text-gold-hi">{v}</a> : v) : <span className="text-mist/70">Coming soon</span>}</dd>
    </div>
  );

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-gold/20 bg-coal pt-20 md:pt-28">
      <div className="mx-auto mb-16 max-w-[1500px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Start your next chapter</p>
            <h2 className="display text-6xl md:text-8xl">LET’S <span className="gold-text">TALK.</span></h2>
            <p className="serif mt-6 max-w-lg text-2xl text-mist">Questions about training or membership? Send us a note and our team will be in touch.</p>
            <p className="mt-5 text-xs uppercase tracking-[.18em] text-gold/75">Sample contact details — replace before publishing</p>
          </div>
          <form action={`mailto:${site.email}`} method="post" encType="text/plain" className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-mist">Your name
              <input required name="Name" autoComplete="name" placeholder="Name" className="min-h-14 border border-gold/25 bg-white/[.03] px-4 text-base normal-case tracking-normal text-bone placeholder:text-mist/50" />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-mist">Email address
              <input required type="email" name="Email" autoComplete="email" placeholder="you@example.com" className="min-h-14 border border-gold/25 bg-white/[.03] px-4 text-base normal-case tracking-normal text-bone placeholder:text-mist/50" />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-mist sm:col-span-2">What can we help with?
              <textarea required name="Message" rows={4} placeholder="Tell us a little about your goals…" className="resize-y border border-gold/25 bg-white/[.03] p-4 text-base normal-case tracking-normal text-bone placeholder:text-mist/50" />
            </label>
            <button type="submit" className="btn btn-gold w-fit sm:col-span-2">Send enquiry <span aria-hidden="true">↗</span></button>
            <p className="text-xs text-mist/70 sm:col-span-2">This opens your email app to send the enquiry to {site.email}.</p>
          </form>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1500px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <img src="/brand/logo-gold-sm.png" alt={`${site.name} logo`} width={140} height={127} className="h-32 w-auto" loading="lazy" />
          <p className="display mt-6 text-5xl md:text-6xl">{site.name}</p>
          <p className="serif mt-4 max-w-sm text-2xl text-mist">{site.tagline}</p>
          <div className="mt-8 flex gap-3">
            <Social href={site.instagram} label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" /></svg>
            </Social>
            <Social href={site.facebook} label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8s-1.4-.3-2.8-.3c-2.8 0-4.4 1.7-4.4 4.7v2.3H7v3.3h2.7V22z" /></svg>
            </Social>
            <Social href={waHref} label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" fill="currentColor" stroke="none" /></svg>
            </Social>
          </div>
        </div>

        <nav className="md:col-span-3 md:col-start-7" aria-label="Footer">
          <p className="eyebrow mb-5">Navigate</p>
          <ul className="space-y-3">
            {NAV.map(([h, l]) => (
              <li key={h}><a href={h} className="display text-3xl transition-colors hover:text-gold-hi">{l}</a></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Visit & contact</p>
          <dl className="space-y-5">
            <Row k="Location" v={site.address} href={site.mapsUrl || undefined} />
            <Row k="Phone" v={site.phone} href={site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : undefined} />
            <Row k="Email" v={site.email} href={site.email ? `mailto:${site.email}` : undefined} />
            <Row k="Hours" v={site.hours} />
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1500px] px-6 md:px-10">
        <div className="gold-line" />
        <div className="flex flex-col items-center justify-between gap-3 py-8 text-sm text-mist md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="#top" className="font-display uppercase tracking-[.25em] hover:text-gold-hi">Back to top ↑</a>
        </div>
      </div>

      <p aria-hidden className="display pointer-events-none select-none overflow-hidden whitespace-nowrap text-center text-[22vw] leading-[.8] text-white/[.025]">{site.name.split(" ")[0]}</p>
    </footer>
  );
}
