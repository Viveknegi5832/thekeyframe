import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { categories, contact, loop, poster, saas, shots, src, type Category, type Shot } from "../cinema/data";
import { Carousel } from "./Carousel";
import { SoundIcon } from "./SoundIcon";

const SERVICES = [
  { n: "01", title: "SaaS product launch videos", clip: "saas-wander" },
  { n: "02", title: "Documentaries & trailers", clip: "reddit" },
  { n: "03", title: "B2B & long-form YouTube", clip: "ten-million" },
  { n: "04", title: "Motion graphics", clip: "cold-email" },
  { n: "05", title: "Shorts & reels", clip: "short-b", vertical: true },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

/** Live on-screen flag (unlike useInView, flips back off when scrolled away). */
function useOnScreen<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav${solid ? " solid" : ""}`}>
      <a href="#top" className="brand">Vivek Negi<span>Editor</span></a>
      <nav>
        <a href="#work">Work</a>
        <a href="#saas" className="hot">Product launch</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact" className="talk">Let's talk</a>
      </nav>
    </header>
  );
}

/** Several vertical shorts side by side; only the focused one has sound, the rest play muted + dimmed. */
function ShortsPlayer({ ids }: { ids: string[] }) {
  const [focus, setFocus] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    refs.current.forEach((v, k) => {
      if (!v) return;
      v.muted = k !== focus;
      if (k === focus) { v.currentTime = 0; void v.play().catch(() => {}); }
    });
  }, [focus]);
  return (
    <div className="pverts">
      {ids.map((v, k) => (
        <button key={v} className={`pshort${k === focus ? " on" : ""}`} onClick={() => setFocus(k)} aria-label={`Play short ${k + 1} with sound`} aria-pressed={k === focus}>
          <video
            ref={(el) => { refs.current[k] = el; }}
            src={src(v)}
            poster={poster(v)}
            autoPlay
            muted={k !== 0}
            playsInline
            loop={k !== focus}
            onEnded={() => setFocus((f) => (f + 1) % ids.length)}
          />
          <span className="pshort-tag"><SoundIcon on={k === focus} />{k === focus ? "Sound on" : "Tap for sound"}</span>
        </button>
      ))}
    </div>
  );
}

function Player({ list, i, onClose, onStep }: { list: Shot[]; i: number; onClose: () => void; onStep: (d: number) => void }) {
  const s = list[i];
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [onClose, onStep]);
  return (
    <div className="player" onClick={onClose} role="dialog" aria-label={s.title} data-cursor="">
      <div className="player-in" onClick={(e) => e.stopPropagation()}>
        {s.vertical ? (
          <ShortsPlayer ids={s.vertical} />
        ) : (
          <video key={s.id} src={src(s.id)} poster={poster(s.id)} controls autoPlay playsInline />
        )}
        <div className="pbar">
          <span>{String(i + 1).padStart(2, "0")} — {s.title} <em>{s.kind}</em></span>
          <span className="pnav">
            <button onClick={() => onStep(-1)}>← Prev</button>
            <button onClick={() => onStep(1)}>Next →</button>
            <button onClick={onClose}>Close ✕</button>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Silent looping tile; the corner button swaps in the full clip with sound, clicking the video opens the player. */
function Tile({ s, sound, onSound, onOpen }: { s: Shot; sound: boolean; onSound: (on: boolean) => void; onOpen: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const visible = useOnScreen(box);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (visible) void v.play().catch(() => {}); else v.pause();
  }, [visible, sound]);
  // mute again when the tile scrolls out of view
  useEffect(() => { if (!visible && sound) onSound(false); }, [visible, sound, onSound]);
  return (
    <div className="tile" ref={box}>
      <button className="tile-media" data-cursor="watch" onClick={onOpen} aria-label={`Watch ${s.title}`}>
        {sound ? (
          <video key="full" ref={vid} src={src(s.id)} poster={poster(s.id)} loop playsInline />
        ) : (
          <video key="loop" ref={vid} src={loop(s.id)} poster={poster(s.id)} muted loop playsInline preload="none" />
        )}
      </button>
      <button className={`card-sound${sound ? " on" : ""}`} onClick={() => onSound(!sound)} aria-pressed={sound} aria-label={sound ? `Mute ${s.title}` : `Unmute ${s.title}`}>
        <SoundIcon on={sound} />
      </button>
      <span className="tile-cap"><b>{s.title}</b><em>{s.length ?? s.kind}</em></span>
      {s.note && <span className="tile-note">{s.note}</span>}
    </div>
  );
}

function CategorySection({ c, n, soundKey, setSoundKey, onWatch }: {
  c: Category; n: number; soundKey: string | null; setSoundKey: (k: string | null) => void; onWatch: (i: number) => void;
}) {
  const [ref, on] = useInView<HTMLElement>();
  return (
    <section className={`cat rv${on ? " in" : ""}${c.id === "shorts" ? " tall" : ""}${c.id === "saas" ? " featured" : ""}`} id={c.id} ref={ref}>
      <header className="cat-head">
        <span className="label">{String(n).padStart(2, "0")} — {c.title}</span>
        <h3>{c.title}</h3>
        <p>{c.blurb}</p>
      </header>
      <div className="cat-grid">
        {c.items.map((s, k) => {
          const key = `${c.id}:${s.id}`;
          return (
            <Tile
              key={s.id}
              s={s}
              sound={soundKey === key}
              onSound={(on) => setSoundKey(on ? key : soundKey === key ? null : soundKey)}
              onOpen={() => onWatch(k)}
            />
          );
        })}
      </div>
    </section>
  );
}

const SAAS: Category = {
  id: "saas",
  title: "SaaS Product Launch",
  blurb: "Launch films and spec ads I designed, animated and cut end to end: UI motion, kinetic type and sound design.",
  items: saas,
};

function WorkByType({ onWatch }: { onWatch: (list: Shot[], i: number) => void }) {
  const [soundKey, setSoundKey] = useState<string | null>(null); // only one tile speaks at a time
  return (
    <div className="types" id="types">
      <nav className="type-chips" aria-label="Work by type">
        <span>Work by type</span>
        {[SAAS, ...categories].map((c) => <a key={c.id} href={`#${c.id}`} className={c.id === "saas" ? "hot" : undefined}>{c.title}</a>)}
      </nav>
      {[SAAS, ...categories].map((c, k) => (
        <CategorySection
          key={c.id}
          c={c}
          n={k + 1}
          soundKey={soundKey}
          setSoundKey={setSoundKey}
          onWatch={(i) => { setSoundKey(null); onWatch(c.items, i); }}
        />
      ))}
    </div>
  );
}

function About() {
  const [ref, on] = useInView<HTMLElement>();
  return (
    <section className={`about rv${on ? " in" : ""}`} id="about" ref={ref}>
      <p className="lead">
        I'm Vivek — an independent editor. I cut documentaries, trailers and YouTube videos for creators, founders and brands,
        and build the motion graphics myself.
      </p>
      <div className="nums">
        <div><b>50+</b><span>videos delivered</span></div>
        <div><b>20+</b><span>creators &amp; brands</span></div>
        <div><b>8–10</b><span>videos a month</span></div>
      </div>
    </section>
  );
}

function Services() {
  const [hover, setHover] = useState(0);
  const [sound, setSound] = useState(false);
  const [ref, on] = useInView<HTMLElement>();
  const [visible, setVisible] = useState(false);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  useEffect(() => {
    vids.current.forEach((v, i) => { if (!v) return; if (visible && i === hover) void v.play().catch(() => {}); else v.pause(); });
  }, [visible, hover, sound]);
  // mute again when the section scrolls out of view
  useEffect(() => {
    const el = ref.current;
    if (!el || !sound) return;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) setSound(false); }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [sound, ref]);
  return (
    <section className={`services rv${on ? " in" : ""}`} id="services" ref={ref}>
      <div className="svc-list">
        <span className="label">Services</span>
        {SERVICES.map((s, i) => (
          <button key={s.n} className={`svc${hover === i ? " on" : ""}`} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setHover(i)}>
            <span>{s.n}</span>{s.title}
          </button>
        ))}
      </div>
      <div className="svc-view">
        {SERVICES.map((s, i) =>
          sound && hover === i ? (
            // sound on: the full clip with audio, from the top
            <video key={`${s.clip}-full`} ref={(el) => { vids.current[i] = el; }} className={`on${s.vertical ? " fit" : ""}`} src={src(s.clip)} poster={poster(s.clip)} loop playsInline />
          ) : (
            <video key={s.clip} ref={(el) => { vids.current[i] = el; }} className={`${hover === i ? "on" : ""}${s.vertical ? " fit" : ""}`} src={loop(s.clip)} poster={poster(s.clip)} muted loop playsInline />
          ),
        )}
        <button className="svc-sound" onClick={() => setSound((v) => !v)} aria-pressed={sound}>
          <SoundIcon on={sound} /> {sound ? "Sound on" : "Sound off"}
        </button>
      </div>
    </section>
  );
}

const SUBJECT = "Video editing enquiry";
const MAIL_OPTIONS = [
  { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encodeURIComponent(SUBJECT)}` },
  { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${contact.email}&subject=${encodeURIComponent(SUBJECT)}` },
  { label: "Email app", href: `mailto:${contact.email}?subject=${encodeURIComponent(SUBJECT)}` },
];

/** Email button: opens a compose window in Gmail / Outlook / the default mail app. */
function MailButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("pointerdown", close); window.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div className="mailbtn" ref={ref}>
      <button className="btn" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {contact.email} <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="mailmenu" role="menu">
          <span>Write to me with</span>
          {MAIL_OPTIONS.map((o) => (
            <a key={o.label} role="menuitem" href={o.href} target={o.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={() => setOpen(false)}>
              {o.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(contact.email); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    catch { window.prompt("Email", contact.email); }
  };
  return (
    <section className="contact" id="contact">
      <span className="label">Contact</span>
      <h2>Got footage?<br />Let's make it <em>worth watching.</em></h2>
      <div className="cta">
        <MailButton />
        <button className="btn ghost" onClick={copy}>{copied ? "Copied ✓" : "Copy email"}</button>
        <a className="btn ghost" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
      <footer>
        <span>© {new Date().getFullYear()} Vivek Negi</span>
        <span className="soc">
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </span>
      </footer>
    </section>
  );
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    let x = -99, y = -99, raf = 0;
    const pick = () => {
      raf = 0;
      const el = document.elementFromPoint(x, y)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset.cursor === "watch" ? "Watch" : el?.dataset.cursor === "drag" ? "Drag" : "");
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(pick); };
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      queue();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", queue); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={`cur${label ? " big" : ""}`} aria-hidden><span>{label}</span></div>;
}

export function Site() {
  const [playing, setPlaying] = useState<{ list: Shot[]; i: number } | null>(null);
  const watchReel = useCallback((i: number) => setPlaying({ list: shots, i }), []);
  const watch = useCallback((list: Shot[], i: number) => setPlaying({ list, i }), []);
  return (
    <>
      <Cursor />
      <Nav />
      <main id="top">
        <div className="intro">
          <span>Video editor — SaaS launch films, documentaries, YouTube &amp; motion</span>
          <span className="hint">Drag the reel · click a film to watch</span>
        </div>
        <Carousel onWatch={watchReel} />
        <WorkByType onWatch={watch} />
        <About />
        <Services />
        <Contact />
      </main>
      {playing !== null && (
        <Player
          list={playing.list}
          i={playing.i}
          onClose={() => setPlaying(null)}
          onStep={(d) => setPlaying((p) => (p === null ? p : { ...p, i: (p.i + d + p.list.length) % p.list.length }))}
        />
      )}
    </>
  );
}
