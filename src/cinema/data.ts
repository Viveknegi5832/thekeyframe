const c = (f: string) => `${import.meta.env.BASE_URL}cinema/${f}`;

export type Shot = {
  id: string;
  title: string;
  kind: string;
  vertical?: string[]; // ids of vertical clips shown together
  note?: string;
  length?: string;
  accent?: string; // brand colour used for the glow behind featured work
};

/** Featured SaaS product launch films (concepts) — also lead the reel. */
export const saas: Shot[] = [
  { id: "saas-holo", title: "Holo", kind: "Product launch · Spec ad", note: "AI marketing team — Your whole marketing department. One hire.", length: "0:36", accent: "#a46bff" },
  { id: "saas-perix-intel", title: "Perix Intelligence", kind: "Product launch · Beta film", note: "Creator analytics — The creator economy moves fast. Stay in the picture.", length: "0:40", accent: "#e5322f" },
  { id: "saas-perix", title: "Perix × CharTheWise", kind: "Data story · Spec ad", note: "Creator partnerships — a creator pitch built from his real numbers.", length: "0:30", accent: "#e8384f" },
  { id: "saas-tally", title: "Tally", kind: "Product launch · Concept", note: "Money app — Make every dollar count.", length: "0:40", accent: "#ff7a2f" },
  { id: "saas-drift", title: "Drift", kind: "Product launch · Concept", note: "Calendar app — Plan less. Live more.", length: "0:30", accent: "#8b7cff" },
  { id: "saas-wander", title: "Wander", kind: "Product launch · Concept", note: "Group-trip planner — Every trip, in one place.", length: "0:36", accent: "#ff6a3d" },
  { id: "saas-sprout", title: "Sprout", kind: "Product launch · Concept", note: "AI brand studio — Sketch it. Ship it.", length: "0:25", accent: "#9be15d" },
];

const library: Shot[] = [
  { id: "madoff", title: "Madoff", kind: "Trailer" },
  { id: "reddit", title: "The Deadly Truth About Reddit", kind: "Documentary" },
  { id: "volkswagen", title: "The Disturbing History of Volkswagen", kind: "Documentary" },
  { id: "tudor-jones", title: "Paul Tudor Jones", kind: "Documentary" },
  { id: "kinetic-interview", title: "Founder Interview", kind: "Cold open" },
  { id: "yap-trailer", title: "Young and Profiting × Jim Kwik", kind: "Podcast trailer", length: "1:03" },
  { id: "ten-million", title: "$10.6M in Cash", kind: "YouTube intro" },
  { id: "cold-email", title: "5M Cold Emails", kind: "YouTube intro" },
  { id: "dropshipping", title: "3 Lies About Dropshipping", kind: "YouTube intro" },
  { id: "route-hub", title: "Not Every Buyer", kind: "Product film" },
  { id: "thousand-demos", title: "1,000 Product Demos", kind: "YouTube intro" },
  { id: "news-launch", title: "Breaking News", kind: "Launch film" },
  { id: "vibescaling", title: "1,000,000 Views", kind: "YouTube intro" },
  { id: "nine-to-five", title: "Quit Your 9–5", kind: "YouTube intro" },
  { id: "shorts", title: "Shorts", kind: "Vertical", vertical: ["short-a", "short-b", "short-c"] },
];

// reel order: a SaaS launch film in front, alternating with documentaries, then everything else
const docs = ["madoff", "reddit", "volkswagen", "tudor-jones"].map((id) => library.find((s) => s.id === id)!);
export const shots: Shot[] = [
  ...saas.flatMap((s, k) => (docs[k] ? [s, docs[k]] : [s])),
  ...library.filter((s) => !docs.includes(s)),
];

export type Category = { id: string; title: string; blurb: string; items: Shot[] };

const pick = (...ids: string[]) => ids.map((id) => library.find((s) => s.id === id)!);

export const categories: Category[] = [
  {
    id: "documentary",
    title: "Documentary",
    blurb: "Research-heavy stories, archival cuts and trailers that hold attention for the full runtime.",
    items: pick("madoff", "reddit", "volkswagen", "tudor-jones"),
  },
  {
    id: "b2b",
    title: "B2B",
    blurb: "Product films, launch videos and YouTube intros for founders, agencies and B2B brands.",
    items: pick("route-hub", "news-launch", "kinetic-interview", "yap-trailer", "ten-million", "cold-email", "thousand-demos", "dropshipping", "vibescaling", "nine-to-five"),
  },
  {
    id: "shorts",
    title: "Shorts & Reels",
    blurb: "Vertical edits built for the first second — captions, pace and hooks.",
    items: ["short-a", "short-b", "short-c"].map((id, k) => ({ id, title: `Short ${String(k + 1).padStart(2, "0")}`, kind: "Vertical", vertical: [id] })),
  },
];

export const src = (id: string) => c(`${id}.mp4`);
export const loop = (id: string) => c(`${id}-loop.mp4`);
export const poster = (id: string) => c(`${id}.jpg`);

export const contact = {
  name: "Vivek Negi",
  email: "singhvivek5832@gmail.com",
  whatsapp: "https://wa.me/919821506819",
  linkedin: "https://www.linkedin.com/in/vivek-negi-380a211b7/",
  instagram: "https://www.instagram.com/lastkeyframe/",
};
