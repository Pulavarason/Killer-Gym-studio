# Cinematic Gym Website

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Three.js / React Three Fiber / Drei · GSAP ScrollTrigger · Framer Motion

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What to edit — `lib/site.config.ts`
Everything business-specific lives in one file: gym name, phone/WhatsApp/email, address, hours, social links,
programs (toggle `enabled`), "why us" points, membership plans + prices, gallery photos and testimonials.

Nothing is invented: empty prices show "Enquire for pricing", empty testimonials show an invitation card,
empty contact fields show "Coming soon", and social icons stay disabled until a link is set.

- **WhatsApp**: set `whatsapp: "91XXXXXXXXXX"` (digits only) — every Enquire / Join button then opens a pre-filled chat.
- **Photos**: drop images in `public/gallery/` and reference them (e.g. `"/gallery/floor.jpg"`) in `gallery` and `programs[].image`.
  Until then, designed gold art panels are shown.
- **Logo**: `public/brand/` — `logo-gold.png` (3D + large use), `logo-gold-sm.png` (nav/footer), `logo-gold-full.png` (full-res, transparent).

## 3D scene
`components/three/GymScene.tsx` — a procedurally built gym (power rack, barbell, dumbbell wall, kettlebells, plyo boxes)
with the real logo lit in-scene. Scroll drives the camera along a spline through 5 scenes.
No external 3D assets are used, so there are no licensing concerns.

**Athlete character**: drop a properly licensed, rigged `.glb` at `public/models/athlete.glb` and set
`athleteModel: "/models/athlete.glb"` in the config. It loads and plays its first animation automatically.

## Performance / accessibility
- 3D auto-switches to a lighter mode on phones / low-core devices (no reflections, lower DPR, fewer particles).
- Falls back to a static hero if WebGL is unavailable or the user prefers reduced motion.
- The canvas stops rendering when scrolled out of view.

## Deploy (Vercel)
Push to GitHub → import in Vercel → framework "Next.js" (no settings needed). Optionally set
`NEXT_PUBLIC_SITE_URL` to your domain for correct social-share metadata.
