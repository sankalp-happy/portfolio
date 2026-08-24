# Portfolio

Single-page portfolio for Sankalp Shankar (ML engineer). The live site is one
self-contained file: `index.html`. No build step, no dependencies. Fonts come from
Google Fonts; figures are inline SVG driven by CSS tokens so they re-theme with the
page. Netlify publishes the repo root as-is (`netlify.toml`).

```bash
open index.html
```

Sections are About, Work, Projects, Ledger, Limits, Contact. At 1100px and up the rail
is a tab list and one section shows at a time (`[data-panels="on"]`, set by JS only, so
no-JS keeps the full scrolling document); below that it is one continuous scroll with
the rail as a scroll index. There is no section numbering. `Fig. N` labels stay and are
referenced by captions and by Limits, so renumbering one means updating those too.

- `PRODUCT.md` holds product truth: users, positioning, and the facts no work may
  invent. Read it before changing copy.
- `studio/STRATEGY.md` holds the visual system for the live page: tokens, figure
  stroke language, layout families, motion rules.
- `studio/figures.html` is the figure sandbox, not shipped.
- `archived/` holds superseded versions, kept as evidence only: `archived/vite/` is
  the Vite + React 19 + Tailwind build, `archived/legacy/` the first single-file
  site, `archived/explore/` three direction studies.

Two hard rules that are easy to break by accident:

- No colons as mid-sentence connectors. A colon before a list or a real example is
  fine; `X: the thing that Y` is not. Removing em-dashes by swapping in colons just
  trades one tell for another, which is exactly how they got here.
- A figure caption describes the drawing. The prose above it makes the argument. If the
  caption restates a sentence from the body in different words, cut the caption's
  version, not the body's.
- No em-dashes or en-dashes anywhere visible, entities included. `grep` for the raw
  character misses `&mdash;` and `&ndash;`, so check with:
  `perl -CSD -ne 'print "$.: $_" if /[\x{2013}\x{2014}]|&[mn]dash;/' index.html`
  Hits inside CSS or JS comments are fine; anything the reader can see is not.
- Every number on the page must trace to the resume. Nothing rounded up, nothing added.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
