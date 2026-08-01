import { useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
} from "lucide-react";
import { editorProfile, socialLinks } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(editorProfile.email);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = editorProfile.email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2400);
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-[#09090a] px-4 pb-6 pt-10 text-white md:px-6"
    >
      <SectionReveal className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#111115] px-5 py-14 md:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute bottom-[-22rem] left-1/2 h-[44rem] w-[80rem] -translate-x-1/2 rounded-[50%] bg-[#ff4d24]/40 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 contact-lines opacity-35" />

        <div className="relative flex flex-col items-center text-center">
          <span className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 font-mono text-[8px] uppercase tracking-[0.22em] text-white/45">
            <span className="h-2 w-2 rounded-full bg-[#68d36e] shadow-[0_0_14px_#68d36e]" />
            Taking on select projects
          </span>

          <h2 className="mt-10 max-w-6xl text-[clamp(3.6rem,8.7vw,9.4rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
            Make something
            <span className="block font-serif font-normal italic text-[#ff6845]">
              impossible to ignore.
            </span>
          </h2>

          <p className="mt-9 max-w-2xl text-lg leading-8 text-white/45">
            Send the idea, the footage details, and a couple of references.
            I’ll reply with the clearest route to a stronger final cut.
          </p>

          <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${editorProfile.email}?subject=New%20editing%20project`}
              className="group flex flex-1 items-center justify-between rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-[#ff4d24] hover:text-white"
            >
              <span className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                Email the brief
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a
              href={editorProfile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-1 items-center justify-between rounded-2xl border border-white/15 bg-black/20 px-5 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Vivek
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-white/55 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            aria-live="polite"
          >
            {emailCopied ? (
              <Check className="h-3.5 w-3.5 text-[#68d36e]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {emailCopied ? "Email copied" : "Copy email instead"}
          </button>

          <a
            href={`mailto:${editorProfile.email}`}
            className="group mt-12 flex max-w-full items-center gap-3 border-b border-white/25 pb-2 text-xl font-semibold tracking-[-0.03em] text-white transition hover:border-[#ff7455] md:text-3xl"
          >
            <span className="break-all">{editorProfile.email}</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-[#ff7455] transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative mt-20 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
              Based in
            </p>
            <p className="mt-2 text-sm text-white/58">
              India · Working worldwide
            </p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
              Best fit
            </p>
            <p className="mt-2 text-sm text-white/58">
              Creators · Podcasts · YouTube · Brands
            </p>
          </div>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
              Collaboration
            </p>
            <p className="mt-2 text-sm text-white/58">
              Direct, async-friendly, organized
            </p>
          </div>
        </div>
      </SectionReveal>

      <footer className="mx-auto mt-6 max-w-[1440px] border-t border-white/10 py-8">
        <div className="flex flex-col gap-9 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[10px] font-black text-black">
              TK
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[-0.025em]">
                TheKeyframe
              </span>
              <span className="mt-0.5 block font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
                Edited with intention
              </span>
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-white/45 transition hover:border-white/25 hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            <a
              href="#top"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-white/25 hover:text-white"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/20 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} TheKeyframe / Vivek Negi</p>
          <p>Short-form · Long-form · Motion · Sound</p>
        </div>
      </footer>
    </section>
  );
}
