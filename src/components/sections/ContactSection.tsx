import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import { editorProfile, socialLinks } from "@/data/site";

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
    window.setTimeout(() => setEmailCopied(false), 2200);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 px-4 pb-8 pt-20 text-white sm:px-6 md:pt-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f06a4f]">
              Have footage? / Let&apos;s talk
            </p>
            <h2 className="mt-5 text-[clamp(3.2rem,8.4vw,8.2rem)] font-[600] leading-[0.84] tracking-[-0.06em]">
              Let&apos;s find
              <span className="block text-white/30">the story in it.</span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <p className="text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
              Send the idea, footage details, and a couple of references. I&apos;ll
              reply with a clear route to the final cut.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${editorProfile.email}?subject=New%20editing%20project`}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f06a4f] px-6 text-[10px] font-bold text-black transition hover:bg-[#f1ede5]"
              >
                Email the brief
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`${editorProfile.whatsappUrl}?text=Hi%20Vivek%2C%20I%27d%20like%20to%20discuss%20a%20video%20editing%20project.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-[10px] font-semibold text-white/65 transition hover:border-white/35 hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-y border-white/15 py-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.16em] text-white/28">Email</p>
            <a
              href={`mailto:${editorProfile.email}`}
              className="mt-2 block break-all text-sm font-semibold text-white/75 transition hover:text-[#f06a4f]"
            >
              {editorProfile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-live="polite"
              className="mt-3 inline-flex items-center gap-1.5 text-[9px] text-white/32 transition hover:text-white"
            >
              {emailCopied ? <Check className="h-3 w-3 text-[#f06a4f]" /> : <Copy className="h-3 w-3" />}
              {emailCopied ? "Copied" : "Copy email"}
            </button>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[0.16em] text-white/28">Phone</p>
            <p className="mt-2 text-sm font-semibold text-white/75">{editorProfile.phone}</p>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[0.16em] text-white/28">Social</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 transition hover:text-[#f06a4f]"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[0.16em] text-white/28">Location</p>
            <p className="mt-2 text-sm font-semibold text-white/75">India / Worldwide</p>
          </div>
        </div>

        <footer className="py-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <a href="#top" className="group flex items-center gap-3">
              <span className="relative grid h-8 w-8 place-items-center">
                <span className="h-3.5 w-3.5 rotate-45 border border-[#f06a4f] bg-[#f06a4f]/15 transition group-hover:bg-[#f06a4f]" />
                <span className="absolute h-1.5 w-1.5 rotate-45 bg-white" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em]">TheKeyframe</span>
                <span className="mt-0.5 block text-[8px] uppercase tracking-[0.16em] text-white/28">Cut with intent</span>
              </span>
            </a>

            <div className="flex items-center gap-5 text-[9px] text-white/32">
              <span>© {new Date().getFullYear()} Vivek Negi</span>
              <a href="#work" className="transition hover:text-white">Work</a>
              <a href="#process" className="transition hover:text-white">Process</a>
              <a
                href="#top"
                aria-label="Back to top"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-[#f06a4f] hover:text-white"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6" aria-hidden="true">
            <p className="flex flex-wrap items-baseline gap-x-[0.25em] gap-y-1 text-[clamp(2rem,6.3vw,5.6rem)] font-[600] uppercase leading-none tracking-[-0.055em] text-white/[0.11]">
              <span>TheKeyframe</span>
              <span className="text-[#f06a4f]/45">—</span>
              <span>Vivek Negi</span>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
