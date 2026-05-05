# Noor's CV Generator

Personal portfolio + AI-powered CV tailoring tool for **Noorafshan Aftab**.

## What it does

- **Landing page** (`/`) — portfolio site built from Noor's IdeaBank (story, experience, strengths, education, contact).
- **Customize CV** (`/customize`) — passcode-gated. Recruiter pastes a job description, Claude returns:
  - Tailored CV (markdown + browser-print PDF)
  - JD–CV match score with covered/missing keyword breakdown
  - 80–120 word cover-letter pitch in Noor's voice

The system prompt enforces **confident reframing only** — it reuses Noor's actual experience in the JD's vocabulary, but never invents employers, dates, titles, technologies, or quantitative metrics.

## Setup

```bash
cd web
cp .env.local.example .env.local
# Edit .env.local and add ANTHROPIC_API_KEY + CUSTOMIZE_PASSCODE
npm install
npm run dev
```

Open http://localhost:3000.

## Project layout

```
web/
├── app/
│   ├── page.tsx               Landing page
│   ├── customize/page.tsx     Customize CV flow
│   ├── api/
│   │   ├── passcode/          Verify passcode
│   │   └── tailor/            Call Claude with IdeaBank + JD
│   ├── layout.tsx             Inter + Source Serif fonts, metadata
│   └── globals.css            Slate/blue corporate theme + print stylesheet
├── components/                React components for landing + customize flow
├── lib/
│   ├── profile.ts             Typed Noor profile data (consumed by landing)
│   ├── ideabank.ts            Loads content/ideabank.md (server-side, cached)
│   ├── cv-prompt.ts           System prompt — guardrails against fabrication
│   ├── anthropic.ts           SDK client + model id (claude-sonnet-4-6)
│   └── types.ts               Shared types
└── content/
    └── ideabank.md            Source of truth for AI tailoring
```

## Source of truth

- **`content/ideabank.md`** — Noor's full personal/career context. Loaded server-side and sent to Claude as the cached context block on every tailor request. Update this file when her experience changes.
- **`lib/profile.ts`** — A typed, structured subset for the landing page. Update this in parallel with `ideabank.md` so the landing reflects the latest.

## Deployment

Deploy to Vercel:

1. Push to GitHub.
2. Import to Vercel.
3. Set `ANTHROPIC_API_KEY` and `CUSTOMIZE_PASSCODE` in Vercel Environment Variables.
4. Deploy.

## Cost notes

- Anthropic prompt caching is enabled on the IdeaBank block. First call writes to cache; subsequent calls within ~5 min read from cache.
- Typical tailoring run uses ~6k input tokens (cached) + ~1.5k output tokens — roughly $0.01–$0.02 per call on Sonnet 4.6.

## Tailoring tone

The system prompt forbids:

- Inventing employers, dates, titles, certifications, technologies, client names, or metrics.
- Claiming deep specialization where the IdeaBank flagged it as "brief exposure" (specifically: US payroll compliance).

It allows:

- Reframing bullets in the JD's vocabulary.
- Reordering and pruning bullets per relevance.
- Choosing the strongest of four CV "angles" (CS / Compliance / Product / Story).

If you want to change this calibration, edit [lib/cv-prompt.ts](lib/cv-prompt.ts).
