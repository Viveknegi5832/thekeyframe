import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  X,
} from "lucide-react";
import { editorProfile } from "@/data/site";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const dockTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

function BrandMark() {
  return (
    <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#0a0b0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
      <span className="h-3 w-3 rotate-45 rounded-[2px] bg-[#f06a4f] shadow-[0_0_14px_rgba(240,106,79,0.65)]" />
      <span className="absolute h-1 w-1 rotate-45 bg-white" />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const updateHeader = () => {
      const collapseAt = Math.max(320, window.innerHeight * 0.5);
      const expandAt = collapseAt - Math.min(110, window.innerHeight * 0.12);

      setIsCompact((current) =>
        window.scrollY > (current ? expandAt : collapseAt),
      );
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3.5 sm:pt-5"
    >
      <div className="relative mx-auto w-fit max-w-full">
        <motion.nav
          layout
          data-header-state={isCompact ? "compact" : "expanded"}
          aria-label="Primary navigation"
          transition={reduceMotion ? { duration: 0 } : dockTransition}
          className="pointer-events-auto relative flex items-center overflow-hidden rounded-2xl border border-white/20 bg-[#151719]/88 p-1.5 text-white shadow-[0_18px_65px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          <span className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f06a4f]/80 to-transparent" />

          <AnimatePresence initial={false} mode="popLayout">
            {isCompact ? (
              <motion.button
                key="compact-content"
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                aria-expanded={menuOpen}
                aria-controls="floating-dock-menu"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: 8 }}
                transition={contentTransition}
                className="group flex h-10 items-center gap-2 rounded-xl text-left"
              >
                <BrandMark />
                <span className="min-w-[4.75rem] pr-1">
                  <span className="block text-[11px] font-semibold leading-none tracking-[-0.015em]">
                    Vivek Negi
                  </span>
                  <span className="mt-1 block text-[6px] uppercase leading-none tracking-[0.19em] text-white/30">
                    TheKeyframe
                  </span>
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-xl text-white/38 transition duration-300 group-hover:bg-white/[0.06] group-hover:text-white">
                  <MoreHorizontal className="h-[18px] w-[18px]" />
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="expanded-content"
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                transition={contentTransition}
                className="flex items-center gap-1"
              >
                <a
                  href="#top"
                  aria-label={`${editorProfile.studioName} home`}
                  className="group flex min-w-0 items-center gap-2.5 rounded-xl py-1 pl-1 pr-3 text-white transition hover:bg-white/[0.05]"
                >
                  <BrandMark />
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[-0.015em] sm:text-xs">
                      Vivek Negi
                    </span>
                    <span className="mt-0.5 hidden text-[7px] uppercase tracking-[0.16em] text-white/30 sm:block">
                      TheKeyframe / Editor
                    </span>
                  </span>
                </a>

                <span className="mx-1 hidden h-5 w-px bg-white/12 md:block" aria-hidden="true" />

                <div className="hidden items-center md:flex">
                  {navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-xl px-3 py-2.5 text-[10px] font-medium text-white/52 transition hover:bg-white/[0.055] hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="group ml-1 hidden min-h-10 items-center gap-2 rounded-xl bg-[#f1ede5] px-4 text-[10px] font-semibold text-black transition hover:bg-[#f06a4f] hover:text-black md:inline-flex"
                >
                  Contact
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setMenuOpen((current) => !current)}
                  aria-expanded={menuOpen}
                  aria-controls="floating-dock-menu"
                  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                  className="ml-1 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-white/65 transition hover:border-[#f06a4f]/60 hover:text-white md:hidden"
                >
                  {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="floating-dock-menu"
              role="dialog"
              aria-label="Navigation and contact options"
              initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -7, scale: 0.97 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
              }
              className="pointer-events-auto absolute left-1/2 top-[calc(100%+0.65rem)] w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-[1.2rem] border border-white/15 bg-[#111315]/96 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            >
              <div className="grid grid-cols-3 gap-1 border-b border-white/10 pb-2">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-xl px-3 py-3 text-center text-[10px] font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-2 grid gap-1">
                <a
                  href={`mailto:${editorProfile.email}?subject=Video%20editing%20project`}
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-xs font-semibold text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#f06a4f]" />
                    Email Vivek
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`${editorProfile.whatsappUrl}?text=Hi%20Vivek%2C%20I%27d%20like%20to%20discuss%20a%20video%20editing%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl bg-[#f06a4f] px-3 py-3 text-xs font-semibold text-black transition hover:bg-[#f1ede5]"
                >
                  <span className="flex items-center gap-2.5">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Vivek
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
