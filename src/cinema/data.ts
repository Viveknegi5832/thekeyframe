const c = (f: string) => `${import.meta.env.BASE_URL}cinema/${f}`;

export type Shot = {
  id: string;
  title: string;
  kind: string;
  vertical?: string[]; // ids of vertical clips shown together
};

export const shots: Shot[] = [
  { id: "madoff", title: "Madoff", kind: "Trailer" },
  { id: "reddit", title: "The Deadly Truth About Reddit", kind: "Documentary" },
  { id: "volkswagen", title: "The Disturbing History of Volkswagen", kind: "Documentary" },
  { id: "tudor-jones", title: "Paul Tudor Jones", kind: "Documentary" },
  { id: "kinetic-interview", title: "Founder Interview", kind: "Cold open" },
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
