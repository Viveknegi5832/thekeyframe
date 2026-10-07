import { useCallback, useEffect, useRef, useState } from "react";
import { loop, poster, shots, src } from "../cinema/data";
import { SoundIcon } from "./SoundIcon";

const N = shots.length;
const STEP = 360 / N;
const wrap = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180; // -> [-180, 180)

type Props = { onWatch: (i: number) => void };

export function Carousel({ onWatch }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontRef = useRef<HTMLVideoElement>(null);
  const angle = useRef(0); // ring rotation in degrees (positive = later cards come to front)
  const vel = useRef(0);
  const target = useRef<number | null>(0);
  const drag = useRef<{ x: number; a: number; t: number; moved: boolean } | null>(null);
  const idle = useRef(true);
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [near, setNear] = useState<number[]>([0, 1, N - 1]);
  const [dims, setDims] = useState({ w: 560, r: 1200 });

  // layout: card width + ring radius from the viewport
  useEffect(() => {
    const on = () => {
      const vw = window.innerWidth;
      const w = vw < 700 ? vw * 0.8 : Math.min(780, vw * 0.5);
      setDims({ w, r: (w / 2 / Math.tan(Math.PI / N)) * 1.08 });
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  // physics loop: drag / inertia / snap, plus per-card depth styling
  useEffect(() => {
    let raf = 0;
    let lastActive = -1;
    let lastNear = "";
    const tick = () => {
      if (!drag.current) {
        if (target.current !== null) {
          const d = target.current - angle.current;
          angle.current += d * 0.11;
          if (Math.abs(d) < 0.02) { angle.current = target.current; target.current = null; }
        } else if (Math.abs(vel.current) > 0.01) {
          angle.current += vel.current;
          vel.current *= 0.93;
          if (Math.abs(vel.current) < 0.15) {
            target.current = Math.round(angle.current / STEP) * STEP;
            vel.current = 0;
          }
        }
      }
      const a = angle.current;
      if (ringRef.current) ringRef.current.style.transform = `translateZ(${-dims.r}px) rotateY(${-a}deg)`;
      const nearList: number[] = [];
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(wrap(i * STEP - a));
        const k = Math.max(0, 1 - d / 95);
        const hidden = d > STEP * 2.3;
        el.style.visibility = hidden ? "hidden" : "visible";
        el.style.opacity = String(hidden ? 0 : Math.max(0, 1 - d / (STEP * 2.6)) * 0.85 + (d < 1 ? 0.15 : 0));
        el.style.filter = `brightness(${0.3 + 0.7 * Math.pow(k, 2.2)})`;
        el.style.pointerEvents = hidden ? "none" : "auto";
        if (d < STEP * 2.6) nearList.push(i);
      });
      const act = ((Math.round(a / STEP) % N) + N) % N;
      if (act !== lastActive) { lastActive = act; setActive(act); }
      const key = nearList.join(",");
      if (key !== lastNear) { lastNear = key; setNear(nearList); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dims.r]);

  const goTo = useCallback((i: number) => {
    // shortest way round to card i
    const cur = angle.current;
    const delta = wrap(i * STEP - cur);
    target.current = cur + delta;
    vel.current = 0;
  }, []);
  const step = useCallback((dir: number) => {
    target.current = Math.round(angle.current / STEP) * STEP + dir * STEP;
    vel.current = 0;
  }, []);

  // front video: restart on change, auto-advance at the end while idle
  useEffect(() => {
    const v = frontRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = !sound;
    void v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  useEffect(() => {
    const v = frontRef.current;
    if (!v) return;
    v.muted = !sound;
    if (sound) void v.play().catch(() => {});
  }, [sound]);
  // mute when the reel scrolls out of view
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !sound) return;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) setSound(false); }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [sound]);
  const watch = useCallback((i: number) => { setSound(false); onWatch(i); }, [onWatch]);
  const onEnded = () => { if (idle.current) step(1); };

  // keyboard arrows when the carousel is on screen
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const r = stageRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 100 || r.top > window.innerHeight - 100) return;
      if (e.key === "ArrowRight") { idle.current = false; step(1); }
      if (e.key === "ArrowLeft") { idle.current = false; step(-1); }
      if (e.key === "Enter") watch(active);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [active, step, watch]);

  const pxToDeg = () => 360 / (2 * Math.PI * dims.r) * 1.6;
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, a: angle.current, t: performance.now(), moved: false };
    target.current = null; vel.current = 0; idle.current = false;
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    if (!d.moved) return;
    const prev = angle.current;
    angle.current = d.a - dx * pxToDeg();
    const now = performance.now();
    vel.current = (angle.current - prev) * Math.min(1, 16 / Math.max(1, now - d.t));
    d.t = now;
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d && d.moved && Math.abs(vel.current) < 0.3) target.current = Math.round(angle.current / STEP) * STEP;
  };
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      idle.current = false; target.current = null;
      vel.current += e.deltaX * 0.012;
    }
  };

  const cur = shots[active];

  return (
    <section className="carousel" id="work" ref={stageRef}>
      <div className="bigtitle" aria-hidden key={`g-${cur.id}`}>{cur.title}</div>

      <div className="stage" data-cursor="drag" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onWheel={onWheel}>
        <div className="ring" ref={ringRef}>
          {shots.map((s, i) => {
            const isFront = i === active;
            const show = near.includes(i);
            return (
              <div
                key={s.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`card${isFront ? " front" : ""}`}
                style={{ width: dims.w, marginLeft: -dims.w / 2, marginTop: (-dims.w * 9) / 32, transform: `rotateY(${i * STEP}deg) translateZ(${dims.r}px)` }}
                onClick={() => { if (drag.current?.moved) return; if (isFront) watch(i); else { idle.current = false; goTo(i); } }}
                data-cursor={isFront ? "watch" : "drag"}
              >
                {s.vertical ? (
                  <div className="verts">
                    {s.vertical.map((v) => (show ? <video key={v} src={loop(v)} poster={poster(v)} muted autoPlay loop playsInline /> : <img key={v} src={poster(v)} alt="" />))}
                  </div>
                ) : isFront ? (
                  <video ref={frontRef} src={src(s.id)} poster={poster(s.id)} muted autoPlay playsInline onEnded={onEnded} />
                ) : show ? (
                  <video src={loop(s.id)} poster={poster(s.id)} muted autoPlay loop playsInline />
                ) : (
                  <img src={poster(s.id)} alt="" loading="lazy" />
                )}
                <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                {!s.vertical && (
                  <button
                    className={`card-sound${isFront && sound ? " on" : ""}`}
                    data-cursor=""
                    aria-label={isFront && sound ? "Mute" : "Play with sound"}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      idle.current = false;
                      if (isFront) setSound((v) => !v);
                      else { setSound(true); goTo(i); }
                    }}
                  >
                    <SoundIcon on={isFront && sound} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="caption">
        <button className="arrow" onClick={() => { idle.current = false; step(-1); }} aria-label="Previous">←</button>
        <div className="meta" key={cur.id}>
          <span className="count">{String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {cur.kind}</span>
          <h2>{cur.title}</h2>
        </div>
        <button className="arrow" onClick={() => { idle.current = false; step(1); }} aria-label="Next">→</button>
      </div>
    </section>
  );
}
