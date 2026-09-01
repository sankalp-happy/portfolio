# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 19 + Tailwind CSS v4, self-hosted fonts via Fontsource, Phosphor icons.
Chosen by the user when asked whether to keep the zero-build static file or move to
React/Tailwind. Builds to static output, so any static host still works.

## Users

Primary: AI/ML recruiters and hiring managers evaluating Sankalp Shankar for an
engineering role. They arrive from a resume link, a LinkedIn profile, or a referral,
scan on a laptop during a workday, and decide in well under a minute whether to keep
reading. Secondary: engineering leads who want to see whether he can hold an
architecture conversation.

## Product Purpose

A single-page portfolio that makes one engineer legible fast: what he builds, evidence
it is real and shipped, and a direct path to his resume and inbox. Success is a reply
in his inbox or a resume download.

## Positioning

Not an ML student with notebooks. An engineer who owns full system lifecycles: model
layer, retrieval layer, API, frontend, container, deploy. The differentiator against a
neighboring candidate page is that each project is presented as an architecture with
named components and real constraints, not as a card with a tech-tag row.

## Operating Context

Read in a browser tab alongside a resume PDF and an ATS. Often opened on mobile between
meetings. The resume (`public/sankalp-shankar-resume.pdf`) is the artifact a recruiter
actually forwards, so it must stay one click away from every screen position.

## Capabilities and Constraints

- Static site, no backend, no forms, no analytics. Contact is a `mailto:` link.
- All content is factual and comes from the incumbent site and the resume. Nothing on
  the page may be invented: no fabricated employers, metrics, dates, or testimonials.
- He has no current employer to name; the work shown is projects, hackathons, and
  university leadership.
- Must degrade gracefully with reduced motion and work from 320px up.

## Brand Commitments

- Name and voice: first person, plain, a little warm. The incumbent site's closing line
  ("Chai and chat? I'm in.") was dropped deliberately. The closing statement on the page
  now carries the voice instead ("If you are putting a model somewhere it can do damage,
  I would like to hear about it."), and it is the line to preserve.
- Assets: profile portrait (`public/sankalp-shankar.jpeg`), resume PDF, paper grain
  texture carried over from the incumbent build.
- Links that must stay reachable: GitHub, LinkedIn, LeetCode, email. Wellfound was on
  this list and was dropped from the page deliberately, so it is not a regression.
- Aesthetic pinned by the user: AI-researcher / frontier-lab monochrome. Motion follows
  Emil Kowalski's rules (transform and opacity, under 300ms, custom easing, reduced
  motion respected).

## Evidence on Hand

Real, verified from the incumbent site and resume:

- Employment: Kapture CX, Machine Learning Intern, Bangalore, June 2026 to present.
  Tuned vLLM serving flags and restructured prompts for prefix-cache reuse, raising
  sustained rate from ~15 to ~40 RPS in benchmark and ~12 to 15 to ~25 RPS in
  production. Benchmarked GPTQ and AWQ quantization and vLLM configurations for
  Gemma 4 31B-IT on H200. Recommended vLLM-router over nginx round-robin for
  cache-aware routing; deployed vLLM as a systemd service.
  The benchmark and production numbers are separate measurements and must never be
  averaged, rounded, or reported as one figure.
- Employment: RDSO Documents, Southern Railway, freelance ML/backend engineer, remote,
  March to June 2026. ETag-based crawler for revised standards; weekly cron; delta sync
  only; superseded documents archived rather than deleted.
- Projects: PharmaGuard, SwitchBoard, MediAssist AI, Red Agent, VaidyaBot, Nirpeksha,
  Hybrid Semantic Search Engine, Groundwater Level Predictor, Neural Network from
  Scratch.
- Competition results: 7 wins total, including 1st place state level (VaidyaBot),
  48-hour hackathon runner-up (MediAssist AI), 3rd place zonal (Nirpeksha), 2 national
  AI ideathon titles, overall champions at XActitude (Kristu Jayanti College), gold in
  Tech Quiz and CTF, silver in SQL, 3rd in Code Relay and Prompt Engineering.
- Competitive programming: ~1600 LeetCode rating, 260+ problems solved.
- Leadership: Event Head, Tech Habba 2024 (3-day institute festival); Vice President,
  The Big O Tech Club (2023 to present, 500+ participant techfest).
- Education: BE in AI and ML, Acharya Institute of Technology, Bangalore. SGPA 8.7/10.
  Expected graduation July 2027.
- Certifications: NPTEL Deep Learning (IIT Ropar), 84% over 12 weeks; Meta Front-End
  Developer Professional Certificate, 9 courses with capstone.

Absent and not to be invented: revenue, user counts, press, funding, team size, any
metric for a system other than the two throughput figures and the SwitchBoard cache
measurements recorded above. Employment history, client names, and production traffic
numbers used to be on this list and are not any more, but only in the exact form
above: two employers, two dated engagements, four numbers.

## Product Principles

1. Architecture is the proof. Show how a system is wired before describing what it does.
2. Every number on the page traces to the resume. No rounded-up or decorative metrics.
3. The resume and the email address are never more than one action away.
4. Depth is opt-in: a recruiter gets the whole story in one scroll, an engineer can stop
   and read a figure.
5. Nine projects are not nine equals. Three carry the page; the rest are an index.

## Accessibility & Inclusion

WCAG AA contrast for all text and controls, full keyboard reachability with visible
focus, motion gated on `prefers-reduced-motion`, and a layout that holds from 320px
without horizontal scroll.
