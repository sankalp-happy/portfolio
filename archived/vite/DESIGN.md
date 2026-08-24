# Design

Recorded from the built page, not from intention. If code and this file disagree,
the code is right and this file is stale.

## Direction

A research-lab figure plate. The page presents an engineer the way a paper presents a
system: numbered figures carrying real architecture, a results table, hairline rules,
and mono annotation. It refuses the dark SaaS hero, the badge stack, and the grid of
equal project cards that this category ships by default.

The pinned brief (AI-researcher / frontier-lab monochrome) set the world. Motion follows
Emil Kowalski's rules by explicit request, which overrides the house preference for
reaching past transform and opacity.

## Ground and color

Two grounds, one accent, selected from a light-room use scene: a hiring manager reading
during a workday. Dark mode follows `prefers-color-scheme` only. There is no theme
toggle, because a toggle is chrome the page does not need.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--paper` | `#f0f0ec` | `#101114` | Page ground |
| `--surface` | `#f7f7f4` | `#16181c` | Plate interiors, figure nodes |
| `--sunken` | `#e8e8e2` | `#0b0c0e` | Reserved recess |
| `--ink` | `#131417` | `#edede8` | Primary text, primary button |
| `--graphite` | `#63666c` | `#9a9ea6` | Secondary text, annotation |
| `--rule` | `#d6d6ce` | `#2a2d33` | Hairlines |
| `--rule-strong` | `#b9b9ae` | `#3d4148` | Figure strokes, secondary button |
| `--accent` | `#1e3ac4` | `#8c9bff` | Live paths only |

Measured contrast: ink/paper 16.3:1, graphite/paper 5.0:1, accent/paper 7.4:1,
white/accent 8.5:1. All AA or better.

**The accent rule.** The blue never decorates. It marks exactly two things: the live
path through a figure, and the element a visitor is meant to act on. Anything else in
the palette is ink, graphite, or a rule.

`.invert-block` flips the ground for the closing footer. In light mode it is an ink
plate; in dark mode it lifts to `--surface` instead of glaring, so the gesture reads the
same in both themes. It rebinds `--graphite`, `--rule`, `--rule-strong` and `--accent`
locally so every child token stays correct inside the inversion.

## Type

Geist Variable for voice, Geist Mono Variable for annotation. Both self-hosted through
Fontsource, no CDN. Mono is used only where it means something: figure labels, table
headers, captions, stack lists, metadata. It is never a costume for "technical."

- Display: `2.25rem` at 390px, scaling to `76px` at `lg`. Tracking `-0.035em`,
  leading `0.94` to `0.97`. Ceiling is 76px, below the 6rem display cap.
- Section headings: `text-4xl` to `text-5xl`, tracking `-0.03em`.
- Body: 15px to 17px, leading 1.5 to 1.65, measure capped at 64ch to 68ch.
- Annotation: 11px mono, uppercase, tracking `0.04em` to `0.06em`.

Two-tone headlines carry emphasis: first line ink, second line graphite. Emphasis is
never a second font family and never a gradient.

**No eyebrows.** No small label sits above a section heading anywhere on the page. Mono
labels appear only as real structural headers inside a section (a table caption, a
column head), which is native grammar for this world.

## Figures

Four authored SVG plates, all sharing one stroke language so they read as coming from
one document:

| Plate | Content |
| --- | --- |
| Fig. 1 | The pipeline shape shared by every project. Hero. |
| Fig. 2 | PharmaGuard: VCF to PharmCAT to risk engine to explanation. |
| Fig. 3 | SwitchBoard: gateway, fallback chain, log stream. |
| Fig. 4 | MediAssist: agent, vector store, XGBoost, feedback loop. |

Rules for any new plate:

- 1px strokes (`--rule-strong`), 1.5px for the live path (`--accent`).
- Node boxes `rx="2"`, filled `--surface`, label 12px mono ink, sub-label 9.5px graphite.
- Dashed `3 4` for failure paths and feedback edges. Solid for the happy path.
- Every plate carries an `<title>` describing the flow in prose, referenced by
  `aria-labelledby`. That title is the only thing a screen reader gets, so it must
  actually explain the system.
- Every plate is wrapped in `<Plate>`, which supplies the ruled frame, the figure
  number, and a caption that says something the diagram does not.
- Figures carry information. A plate that would be decoration does not get drawn.

## Layout

Container `max-w-[1240px]`, gutters `px-5` rising to `px-8`. Twelve-column grid at `lg`.

The page runs six layout families and repeats none of them:

1. Hero: 7/5 split, argument left, plate right.
2. Lead project one: 5/7 split, argument left, plate right.
3. Lead project two: full-width plate, argument in two columns underneath.
4. Lead project three: 7/5 split, plate left, argument right.
5. Ledger rows: "Also shipped", leadership, certifications.
6. Table and index: Table 1, the four-column stack index, the three-column tail index.

The split-image-and-text pattern never runs three times consecutively; family three
breaks the zigzag by design. Section padding is `py-16` rising to `lg:py-24`, with more
space above a heading than below it.

Corner language: `2px` on figure nodes, `3px` on buttons, `0` everywhere else. There are
no pills, no elevation, and no cards. Grouping is done with hairlines and negative
space.

## Motion

Every transition on the page uses `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`)
or `--ease-out-quart`, and nothing runs longer than 260ms.

- `Reveal` is the one authored entrance: `translate3d(0, 14px, 0)` plus opacity, 260ms,
  fired by IntersectionObserver, unobserved after it lands.
- Figures stagger their `.stage` groups at 55ms intervals, 220ms each. Groups are
  visible by default; the animation only replays arrival.
- Hover is `-translate-y-px`, active is `scale(0.985)`. Nothing else moves.
- Transform and opacity only. No layout-triggering properties are animated.
- `prefers-reduced-motion: reduce` removes every entrance and caps all durations. The
  page is complete without any of it.
- The reveal styles are scoped to `.js`, added by `main.jsx` before render. A blocked
  bundle leaves a fully readable page instead of an empty one.

## Grain

`body::before`, fixed, `assets/grain.png` at 200px tile, `opacity 0.11` light and
`0.07` dark with `invert(1)`. No blend mode: a full-viewport blend layer repaints on
every scroll frame and bought nothing here.

## Copy

- Zero em-dashes and zero en-dashes, page-wide. Enforced by grep, not by intention.
- Every number traces to the resume. No rounded-up or decorative metrics.
- One label per intent: the resume action is always "Resume", the contact action is
  always "Email me" or the address itself.
- Voice is first person, plain, a little warm. "Chai and chat? I'm in." is his line and
  it stays.

## Structure

```
index.html          Vite entry. Direction contract lives in the body comment.
src/main.jsx        Adds .js, mounts App.
src/styles.css      Tokens, base, component classes, motion. The whole design system.
src/data/content.js All copy and facts. Nothing hardcoded in components.
src/components/     Nav, Hero, Work, Results, Stack, About, Contact, Figures, Reveal.
src/assets/         Grain tile and portrait, hashed by the build.
public/             Resume PDF, served at a stable path.
legacy/             The previous single-file site, kept as evidence.
```

Content edits happen in `src/data/content.js`. Adding a project means adding data and,
for a lead project, one plate in `Figures.jsx`.
