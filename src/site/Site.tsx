import { useEffect, useRef, useState } from "react";
import { contact, loop, poster, shots, src } from "../cinema/data";
import { Carousel } from "./Carousel";
import { SoundIcon } from "./SoundIcon";

const SERVICES = [
  { n: "01", title: "Documentaries & trailers", clip: "reddit" },
  { n: "02", title: "Long-form YouTube", clip: "ten-million" },
  { n: "03", title: "Motion graphics", clip: "cold-email" },
  { n: "04", title: "Shorts & podcasts", clip: "kinetic-interview" },
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

function Player({ i, onClose, onStep }: { i: number; onClose: () => void; onStep: (d: number) => void }) {
  const s = shots[i];
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
            <video key={`${s.clip}-full`} className="on" src={src(s.clip)} poster={poster(s.clip)} autoPlay loop playsInline />
          ) : (
            <video key={s.clip} className={hover === i ? "on" : ""} src={loop(s.clip)} poster={poster(s.clip)} muted autoPlay loop playsInline />
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
    let x = -99, y = -99, cx = -99, cy = -99, raf = 0;
    const pick = () => {
      const el = document.elementFromPoint(x, y)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset.cursor === "watch" ? "Watch" : el?.dataset.cursor === "drag" ? "Drag" : "");
    };
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; pick(); };
    const tick = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (ref.current) ref.current.style.transform = `translate3d(${cx}px,${cy}px,0)`; raf = requestAnimationFrame(tick); };
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", pick, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", pick); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={`cur${label ? " big" : ""}`} aria-hidden><span>{label}</span></div>;
}

export function Site() {
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <>
      <Cursor />
      <Nav />
      <main id="top">
        <div className="intro">
          <span>Video editor — documentaries, trailers, YouTube &amp; motion</span>
          <span className="hint">Drag the reel · click a film to watch</span>
        </div>
        <Carousel onWatch={setPlaying} />
        <About />
        <Services />
        <Contact />
      </main>
      {playing !== null && (
        <Player
          i={playing}
          onClose={() => setPlaying(null)}
          onStep={(d) => setPlaying((p) => (p === null ? p : (p + d + shots.length) % shots.length))}
        />
      )}
    </>
  );
}
