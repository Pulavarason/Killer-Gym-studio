/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the single file the gym owner / developer edits.
 *  Nothing here is invented: unknown details are left empty (null / "")
 *  and the UI shows a tasteful "to be confirmed" state until filled in.
 * ─────────────────────────────────────────────────────────────
 */

export type Program = {
  title: string;
  description: string;
  /** Put a photo in /public/gallery and reference it, e.g. "/gallery/strength.jpg". Leave null for the art panel. */
  image: string | null;
  /** Set false to hide a service the gym does NOT offer. */
  enabled: boolean;
};

export type Plan = {
  name: string;
  /** e.g. "₹2,500". Leave "" until the owner confirms — card shows "Enquire for pricing". */
  price: string;
  /** e.g. "per month" */
  duration: string;
  benefits: string[];
  featured?: boolean;
};

export type Testimonial = { name: string; role?: string; quote: string };

export const site = {
  /** Gym name shown beside the logo and in the footer / SEO. CHANGE ME. */
  name: "Killer Lifestyle and Fitness Studio",
  tagline: "Forged by discipline. Defined by strength.",
  description:
    "A premium strength & fitness studio built on discipline, coaching and a different standard of training.",

  /** WhatsApp number in international format, digits only, e.g. "919876543210". */
  whatsapp: "",
  phone: "+91 98765 43210",
  email: "hello@elitefitness.example",
  address: "2nd Floor, 24 Sample Road, Indiranagar, Bengaluru, Karnataka 560038 (sample address)",
  mapsUrl: "https://maps.google.com/?q=Indiranagar+Bengaluru",
  hours: "Mon–Sat, 6:00 AM–10:00 PM · Sun, 7:00 AM–1:00 PM (sample hours)",
  instagram: "",
  facebook: "",

  /**
   * Optional rigged athlete model (.glb). Drop a properly licensed file at
   * /public/models/athlete.glb and set this to "/models/athlete.glb".
   * Leave null to use the built-in gym-environment scene only.
   */
  athleteModel: null as string | null,

  programs: [
    { title: "Strength Training", description: "Progressive barbell and machine work built around real, measurable strength.", image: null, enabled: true },
    { title: "Personal Training", description: "One-to-one coaching shaped around your body, goals and schedule.", image: null, enabled: true },
    { title: "Functional Fitness", description: "Movement-first training for everyday power, mobility and control.", image: null, enabled: true },
    { title: "Cardio Training", description: "Conditioning sessions that build engine without burning out your drive.", image: null, enabled: true },
    { title: "Weight Training", description: "Free-weight fundamentals coached properly, from first rep to heavy sets.", image: null, enabled: true },
    { title: "Group Training", description: "High-energy sessions where the room pushes you further than you'd go alone.", image: null, enabled: true },
  ] as Program[],

  /** Gallery + environment photos. Add real photos in /public/gallery and list them here. */
  gallery: [
    { src: null as string | null, alt: "Main training floor", label: "The Floor" },
    { src: null, alt: "Free weights area", label: "Iron" },
    { src: null, alt: "Cardio zone", label: "Engine" },
    { src: null, alt: "Coaching in session", label: "Coaching" },
    { src: null, alt: "Group training", label: "Together" },
  ],

  /** "Why choose us" — edit or disable anything the gym does not stand behind. */
  strengths: [
    { title: "Professional Coaching", text: "Hands-on guidance that keeps every session safe, effective and honest.", enabled: true },
    { title: "Modern Equipment", text: "Quality kit for strength, conditioning and everything in between.", enabled: true },
    { title: "Supportive Environment", text: "A room that pushes you — and has your back while it does.", enabled: true },
    { title: "Personalised Guidance", text: "Training shaped around your body, your goals and your pace.", enabled: true },
    { title: "Structured Programs", text: "Clear progression, so every week builds on the last.", enabled: true },
  ] as { title: string; text: string; enabled: boolean }[],

  /**
   * Membership plans. Leave price "" until the owner confirms — the card then says "Enquire for pricing".
   * Add / remove / rename plans freely. benefits: [] shows "Details shared on enquiry".
   */
  plans: [
    { name: "Monthly", price: "", duration: "1 month", benefits: [] },
    { name: "Quarterly", price: "", duration: "3 months", benefits: [], featured: true },
    { name: "Annual", price: "", duration: "12 months", benefits: [] },
  ] as Plan[],

  /** Add REAL client testimonials only. While empty, the section shows an invitation instead. */
  testimonials: [] as Testimonial[],
};

export type SiteConfig = typeof site;
