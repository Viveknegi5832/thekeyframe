import { Mail, MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editorProfile } from "@/data/site";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-neutral-950 px-4 py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.22),transparent_35%)]" />

      <SectionReveal className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-14">
        <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">
          Let’s Work
        </Badge>

        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[0.95] tracking-[-0.045em] md:text-6xl">
          Have footage that needs to become scroll-stopping content?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-400">
          Send the raw footage, explain the goal, and let’s turn it into clean,
          high-retention video content.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-7">
            <a href={`mailto:${editorProfile.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/15 bg-white/[0.03] px-7 text-white hover:bg-white/10 hover:text-white"
          >
            <a
              href={editorProfile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
          <a
            href={`mailto:${editorProfile.email}`}
            className="rounded-3xl border border-white/10 bg-neutral-950/60 p-6 text-left transition hover:-translate-y-1 hover:border-violet-400/60"
          >
            <Mail className="mb-5 h-5 w-5 text-violet-300" />

            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
              Email
            </p>

            <p className="mt-2 break-all font-semibold">
              {editorProfile.email}
            </p>
          </a>

          <a
            href={`tel:${editorProfile.phone.replaceAll(" ", "")}`}
            className="rounded-3xl border border-white/10 bg-neutral-950/60 p-6 text-left transition hover:-translate-y-1 hover:border-violet-400/60"
          >
            <Phone className="mb-5 h-5 w-5 text-violet-300" />

            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
              Phone
            </p>

            <p className="mt-2 font-semibold">{editorProfile.phone}</p>
          </a>
        </div>
      </SectionReveal>

      <footer className="relative z-10 mx-auto mt-10 max-w-7xl text-center text-sm text-neutral-600">
  © 2026 TheKeyframe. All rights reserved.
</footer>
    </section>
  );
}