# TODOS

Deferred work, with the reason it was deferred. Everything here was surfaced by a
review and consciously left undone, not forgotten. Live implementation tasks from the
2026-08-25 design review live in
`~/.gstack/projects/sankalp-happy-portfolio/design-review-tasks.jsonl`.

## The Ledger claims a 3rd zonal that names no project

**What.** Under Ledger, "Four hackathon wins" is detailed with "3RD ZONAL". Nirpeksha
is the project that placed, and it is not on the page. Either name it at the point of
the claim or add it to the Also-shipped index.

**Why.** Every other award on the page now traces to something a reader can look at:
the state-level 1st goes to MediAssist AI, the 48-hour runner-up goes to MediAssist AI,
SwitchBoard and PharmaGuard carry themselves. This one claim stands alone, and an
unattributed placement reads weaker than no placement at all.

**Context.** Surfaced as finding 1B in the 2026-08-25 design review. Offered as D5b,
where the index was deliberately kept at four rows so the "three carry the page, the
rest are an index" structure from PRODUCT.md principle 5 stays legible. That decision
stands; this note exists so the residual gap is not mistaken for an oversight later.

**Cost of leaving it.** One line in the Ledger that a careful reader cannot verify.

**Depends on.** Nothing.

## The blocked-font state has never been tested

**What.** Load the page with `fonts.googleapis.com` unreachable and check what breaks.

**Why.** The three families (Inter Tight, Source Serif 4, JetBrains Mono) come from
Google Fonts. On a corporate network that blocks the host, and inside some ATS preview
frames, the page falls back to Georgia, system-ui and Menlo. Menlo is measurably wider
than JetBrains Mono, and the rail's uppercase mono nav is sized to wrap at specific
widths, so the fallback almost certainly wraps differently from the tested layout.
PRODUCT.md names the operating context as a browser tab alongside a resume PDF and an
ATS, which is exactly where this happens.

**Context.** Surfaced as finding 2B in the 2026-08-25 design review. Not reproduced,
only reasoned from the stack. Related work: task T9 in the review artifact adds
`size-adjust` fallback metrics, which would narrow the gap between the webfont and the
fallback and may resolve most of this on its own.

**Cost of leaving it.** A reader on a locked-down network may get a rail that wraps to
an extra row and a page that looks unfinished, and nobody would know.

**Depends on.** Best done after T9 (font preload and fallback metrics), since T9
changes what the fallback looks like.
