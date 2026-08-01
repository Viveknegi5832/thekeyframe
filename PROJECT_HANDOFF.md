# TheKeyframe Portfolio — Project Handoff

Saved: 31 July 2026  
Owner: Vivek Negi  
Local project: `C:\Users\Admin\video-editor-portfolio`  
Repository: `https://github.com/Viveknegi5832/thekeyframe.git`  
Branch: `main`  
Baseline commit before the redesign: `4981c4f`

## Objective

Build a distinctive, high-end portfolio for Vivek's video-editing brand,
TheKeyframe. It should feel cinematic, professional, interactive, and more
ambitious than a typical agency-template website.

Reference sites:

- https://rizescale.media/
- https://revscaled.io/

The first redesign attempt used black, ivory, and electric lime. Vivek rejected
it because it felt too basic and template-like. Do not return to that version.

The current redesign is the stronger second direction and should be preserved:

- Near-black, warm white, and signal-orange visual identity
- Interactive "cut room" hero rather than a generic landing-page hero
- Oversized Geist typography with an editorial serif/italic contrast
- Editing monitor with project bins, color scope, audio meters, timeline clips,
  moving playhead, timecode, and playback modal
- Cinematic vertical-project rail
- Long-form work presented as large case-study rows
- Interactive post-production/effects stack with a live program preview
- Scroll-driven workflow section with timeline and waveform details
- Orange personal/about statement: "One editor. Zero handoffs."
- Cinematic FAQ and conversion-focused contact section
- Responsive navigation and full mobile layouts
- Subtle grain, grids, gradients, hover depth, scroll progress, and motion

## Portfolio Structure

Target total: 17 project slots.

- 5 short-form/vertical projects
- 12 long-form slots
  - 4 existing live YouTube projects
  - 8 queued placeholders awaiting new YouTube uploads

The eight future videos are stored in the data layer but are presented publicly
as a professional render queue, not as empty cards.

Primary video data:

`src/data/videos.ts`

When new unlisted YouTube videos are ready, replace the placeholder entries in
that file. Preserve the `status`, `format`, project numbering, and metadata
structure so new projects automatically appear correctly.

## Contact and Social Details

- Brand: TheKeyframe
- Name: Vivek Negi
- Email: `singhvivek5832@gmail.com`
- Instagram: `https://www.instagram.com/lastkeyframe/`
- LinkedIn: `https://www.linkedin.com/in/vivek-negi-380a211b7/`
- WhatsApp: `https://wa.me/919821506819`
- YouTube and other social links will be supplied later

## Known Issue / Next Task

The WhatsApp button works. The email buttons currently use valid `mailto:`
links, but this Windows installation has a stale `mailto:` association pointing
to an unavailable AppX email application.

Recommended website improvement:

- Make the main email CTA open a reliable web compose experience, or
- Keep `mailto:` and add a clearly visible "Copy email" fallback

Do not assume every visitor uses Gmail. A universal approach should support
configured mail clients while still providing a copy-to-clipboard fallback.

## Current Validation Status

The current redesign has passed:

- `npm run build`
- `npm run lint`
- `git diff --check`
- Desktop visual QA at 1440px
- Mobile visual QA at 390px
- Short-form Google Drive modal test
- Long-form YouTube modal test
- Navigation, tabs, service interactions, FAQ, and contact checks

The local preview normally runs at:

`http://127.0.0.1:5173/thekeyframe/`

Start it with:

```powershell
cd C:\Users\Admin\video-editor-portfolio
npm run dev -- --host 127.0.0.1 --port 5173
```

## Important Files

- `src/components/sections/HeroSection.tsx`
- `src/components/sections/PortfolioSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/ProcessSection.tsx`
- `src/components/sections/FAQSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/components/shared/SiteHeader.tsx`
- `src/components/shared/SectionReveal.tsx`
- `src/data/site.ts`
- `src/data/videos.ts`
- `src/index.css`
- `index.html`
- `public/favicon.svg`

## Git and Deployment Status

The redesign is saved locally but is not committed. The working tree contains
all redesign changes plus this handoff file.

The redesigned website has not been deployed. The existing GitHub Pages site
remains unchanged until Vivek approves the final local version.

Before deployment:

1. Review the full website with Vivek.
2. Fix the email CTA/fallback.
3. Add or replace video links when supplied.
4. Add YouTube and any additional social links.
5. Run build, lint, and visual QA again.
6. Create a Git checkpoint commit.
7. Deploy only after explicit approval.

## Continuation Instruction

Continue from the current files rather than rebuilding or reverting. Start by
reading this handoff, checking `git status`, and launching the local preview.
The immediate next task is to improve the email contact behavior, followed by a
section-by-section review with Vivek.
