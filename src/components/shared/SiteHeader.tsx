import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { editorProfile } from "@/data/site";

const navigation = [
  { label: "Selected work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#ff4d24]"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div
          className={`mx-auto flex w-full max-w-[1440px] items-center justify-between rounded-[1.15rem] border px-3 py-2.5 transition duration-500 md:px-4 ${
            scrolled || menuOpen
              ? "border-white/12 bg-[#080809]/88 shadow-[0_18px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border-white/[0.07] bg-black/20 backdrop-blur-md"
          }`}
        >
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-3"
            aria-label={`${editorProfile.studioName} home`}
          >
            <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white text-[10px] font-black text-black">
              <span className="absolute inset-x-0 bottom-0 h-1 bg-[#ff4d24]" />
              TK
            </span>
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.13em] text-white min-[420px]:text-xs">
                TheKeyframe
              </span>
              <span className="mt-0.5 hidden text-[8px] uppercase tracking-[0.2em] text-white/35 min-[420px]:block">
                Edit · Motion · Sound
              </span>
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center rounded-full border border-white/[0.07] bg-white/[0.025] p-1 md:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-xs font-medium text-white/45 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group hidden items-center gap-3 rounded-xl bg-[#ff4d24] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black md:inline-flex"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 flex flex-col bg-[#09090a] px-5 pb-8 pt-28 md:hidden"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff6a45]">
            Navigate / 05
          </p>

          <nav className="mt-5 border-t border-white/10">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-5 text-3xl font-semibold tracking-[-0.045em] text-white"
              >
                {item.label}
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/30">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-auto flex items-center justify-between rounded-2xl bg-[#ff4d24] p-5 text-lg font-semibold text-white"
          >
            Start a project
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      )}
    </>
  );
}
