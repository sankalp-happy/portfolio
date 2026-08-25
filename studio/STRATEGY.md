# Portfolio — Design Strategy

Sankalp Shankar. Senior design engineer review, pre-implementation.

---

## Decisions locked (2026-08-10)

| # | Decision | Resolution |
|---|---|---|
| D2 | Subtraction | **Cut hard.** Three systems, no Skills section. Everything else to the Archive table. |
| D3 | Content authenticity | **Both real.** `Dropout, from scratch` and `Hybrid Semantic Search` exist, just unlisted on the CV. Both ship. Specifics still needed — see below. |
| D4 | Build target | **Static single file in `studio/`.** No build step. Isolated from the root Vite scaffold. |
| D5 | Accent | **Annotation red `#C4432A`.** Lime dropped. |
| D6 | Ground | **Inverted to warm cream**, matching the live SwitchBoard page. Dark spec withdrawn. Red now carries links as well as marks. |
| D7 | Systems 03 | ~~Nirpeksha~~ — withdrawn by client, does not exist yet. |
| D8 | Systems 03 | **RDSO Documents (Southern Railway)** — freelance team project, client work. |
| D9 | Citing it | **No repo link.** Cited as private client work. Credibility carried by mechanical specificity in the write-up and `Fig. 3`, not by a link. Certificate not published. |

## Revision 2 (2026-08-10) — after reading the live SwitchBoard page

`https://switchboard-tau-ruby.vercel.app` — reviewed live, 200, no console errors.

**This page is better than anything else in this repo, and it changes the plan.**

It already does everything §3 argues for: mono section eyebrows
(`THE PROBLEM … 3 FAULTS`), a real hero diagram with labelled routing nodes and a
legend, file paths used as citations (`gateway/main.py`, `cache/redis_client.py`),
and copy that is mechanism-first throughout. One line on it is the whole thesis
of this strategy, already written:

> "every claim on this page maps to a file in the repository."

The taste is not in question. It has already been demonstrated. What the
portfolio has to do is not fall below this bar.

### Three consequences

**1. The palette may need to invert.** SwitchBoard is a **warm cream page** with
a bronze accent and a slightly deeper cream plate for the diagram. My §3 spec is
the opposite: dark ground with cream plates. Put side by side they read as two
different authors. This is now the biggest open design decision — see D6.

Note that D5 survives an inversion and improves under it: annotation red
`#C4432A` on cream is ~5.5:1, so on paper it can carry link text as well as
marks, which it could not do on dark.

**2. SwitchBoard's figure changes.** It is no longer "failover timeline." The
live page reveals a far more interesting claim, with real numbers:

> `"Say hi in five words."` → MISS, groq, 424ms
> `"Say hi in five words."` → HIT, similarity 1.0000
> `"Greet me using five words."` → HIT, **similarity 0.9144**

The semantic cache catching a *rephrasing* is the demonstrable result. `Fig. 1`
becomes the cache-hit / rotation decision path, captioned with those numbers.

**3. Your CV is out of date on your best project.** `sankalp.pdf` says
SwitchBoard routes across "OpenAI and Gemini/Groq" and describes only failover,
retries and quota monitoring. The shipped system routes **Groq, Google and
Anthropic** and additionally has:

- Semantic cache — `gemini-embedding-001`, cosine ≥ 0.90, Redis, 1h TTL
- Quota-aware key selection, 5s sweeper reviving rate-limited keys
- Fernet-encrypted keys in SQLite, returned masked
- 7 metric families, Prometheus, 9 provisioned Grafana panels
- 6-service Docker Compose, one-command install
- ~2000 lines of Python

Fix the CV. The version on paper undersells the strongest thing you have built.

### Treatment for a system with a live demo

SwitchBoard gets different affordances from the other two: a `live` marker in the
mono metadata line, the deploy URL and the repo both linked, and the version
string `v0.2.0` shown as a fact. It leads `01 Systems` — best project, and the
only one a reader can go press buttons on.

## Revision 3 (2026-08-10) — RDSO Documents / Southern Railway

Client brief: freelance group project for Indian Southern Railway, putting RDSO
(Research Designs & Standards Organisation) documents from RailNet onto the
internet. Sankalp architected the cron job and crawler — detect new files, update
the server, ingest them. Completion certified by the Chief Engineer, Southern
Railway. **The certificate is not to be published** (client instruction).

### What the public repo actually contains

`github.com/sankalp-happy/railways` — public, 2 commits.

| Present | Absent |
|---|---|
| `rdso_documents_frontend/` — Flutter app on UX4G, the Government of India design system | **The crawler.** No cron, no ingest, no backend code at all. |
| README documenting 5 screens, HRMS login, Current/Archive split, revision notifications | `backend_structure.md` — **0 bytes, empty file** |
| | PDF viewer is a documented *placeholder* |

**The thing you are claiming is not in the repo you gave me.** That is entirely
normal for railway internal systems and I am not doubting the work. But it forces
a decision, because linking this repo as proof is actively worse than linking
nothing: a reader clicks expecting a crawler, finds a Flutter UI shell and an
empty backend doc, and now doubts the claim they would otherwise have accepted.

Same rule that governed `Dropout, from scratch` in §7 — no claim without a
mechanism the reader can reach. See D9.

### The mechanism (from the client, 2026-08-10)

My earlier three-way-classification guess was wrong. The real problem is sharper
and considerably more interesting.

The source is a portal on RailNet serving PDFs and images. **It reuses the same
URL across revisions.** When a standard is revised, the link does not change —
the bytes behind it do. So the link set, the obvious thing to crawl and diff, is
flat even when the corpus has changed. Watching links detects nothing.

The signal that does move is the **HTTP ETag**. The portal emits a fresh ETag when
the file behind a stable URL changes. So the crawler stores an ETag per URL, and
an ETag delta is the only honest evidence a document was revised.

Then only the delta crosses the network boundary — the changed rows are pushed
out of RailNet to the internet-facing server, not the whole database.

```
pass N     URL set   →  identical to pass N-1   ("nothing happened")
           ETags     →  one moved               (a standard was revised)
           delta     →  that row only, pushed out of RailNet
```

**Why this is the best engineering story on the page.** It is the recognition
that the observable you would naturally instrument — the set of links — is *not
correlated with the thing you care about*, and the identification of the one
channel that is. That is a research instinct applied to a plumbing problem, and
it is worth more to the §2 primary reader than the other two systems' happy paths.

The failure mode is also worse and more on-thesis than the one I guessed. It is
not duplication, it is **silent staleness**: trust the link list and revised RDSO
standards never propagate at all, while the internet-facing app keeps serving a
superseded safety standard that looks current to the engineer reading it. Nothing
errors. Nothing alerts. The page's thesis is the boundary where an automated
system must not be allowed to get a decision wrong, and this is that boundary
with a railway behind it.

### `Fig. 3` — "the link set is not the signal"

Two channels tracked across crawl passes, on one time axis:

- **Channel A, URL set** — flat. Unbroken across every pass. A naive crawler's
  entire view of the world, and it says nothing ever happens.
- **Channel B, ETag per URL** — one row moves at pass N.
- **Delta** — that single row crosses the RailNet boundary. Everything else stays.

The figure's whole job is to show an *absence* of signal in the channel you would
have instrumented, next to presence in the one that works. That is an analytical
diagram, not decoration — it argues something, which is the §3 bar for a figure.

Caption, draft: *"Fig. 3 The source portal reuses URLs across revisions, so the
link set stays flat while the corpus changes underneath it. The ETag is the only
channel that moves. Only changed rows cross the network boundary."*

### Copy note

The client said "I think" about the source being ASPX/.NET. The page's own rule
forbids unverifiable claims, and the source system's stack is not load-bearing
here — the interesting fact is *URL reuse across revisions*, which is true
regardless of what served it. Copy will say "the source portal" and omit the
stack unless it gets confirmed.

### Resolved (D9): no repo link

The entry is cited as private client work — Southern Railway / RDSO, delivered by
a freelance team, Sankalp on crawler and scheduled ingest architecture. No GitHub
link. The certificate is not published, per client instruction.

That places the entire burden of credibility on **mechanical specificity**. A
vague description with no link is a boast; a precise one is a fact. So this entry
must carry more concrete detail than the other two, not less.

### Operational detail (client, 2026-08-10) — resolved

| | |
|---|---|
| **What broke** | The first build had **no ETags**. Detection was link-based only, and updates silently never propagated. That failure is what drove the team past link diffing to look for another channel. |
| **Where it ran** | On RailNet itself, on a small allotted server inside the network. |
| **Cadence** | Weekly cron — revisions are infrequent — **plus** the run script was handed to the railway admin so they can trigger a pass on demand. |
| **New documents** | The link table is kept, so a URL absent from it is a new document. Both channels work: new links for discovery, ETag deltas for revision on existing links. |
| **Moved URLs** | Nothing is ever deleted. The prior file is moved to the Archive section — which is what the frontend's Current/Archive split is showing. |

**The "what broke" answer is the best sentence in this entry** and it goes in the
copy nearly verbatim. A shipped system that silently propagated nothing, a team
that noticed, and a redesign around the one channel that carried the signal — that
is a negative result and its diagnosis. It is the closest thing in this portfolio
to a research narrative, and it arrived from client work rather than from a paper.

### Consequences of D3

Both reproductions are real. **Client decision: both stay in `02 Archive`,** not
promoted to Systems. That keeps `01 Systems` at three and means neither needs a
paper-caption-depth write-up — an Archive line is one sentence.

The cost of that call, stated once and then dropped: those two are the only
items in the inventory that read as research rather than engineering, and in the
Archive they carry roughly a tenth of the weight. If the goal shifts toward
PhD applications, promoting `Dropout, from scratch` is the highest-leverage
single edit available to this page. Your call, and it is made.

### Revised `01 Systems` — three

| # | System | Figure | Status |
|---|---|---|---|
| 01 | **SwitchBoard** | Cache hit / rotation decision path | **Live demo + repo.** Leads. |
| 02 | **PharmaGuard** | Responsibility boundary | The page's central claim, drawn |
| 03 | **RDSO Documents** | Ingest decision — new / revision / unchanged | Southern Railway, client work |

`02 Archive`, one line each: MediAssist AI, Dropout from scratch, Hybrid Semantic
Search, Red Agent, Groundwater Predictor.

MediAssist's 1st-place result moves to `03 Ledger` so the award still reads even
though the project sits in the Archive.

**One consequence, noted once and then dropped.** All three systems are now
infrastructure engineering. The only two research-flavoured items you own —
`Dropout, from scratch` and `Hybrid Semantic Search` — are in the Archive by your
own call (D3). This is an excellent *engineer's* portfolio and a thin
*researcher's* one. That is a positioning choice, it is yours, and it is made.

---

## 0. What I read

| Source | What it is | Verdict |
|---|---|---|
| `legacy/index.html` (1130 lines, was `index.html`) | The client's own attempt | 3/10 for the stated audience |
| `explore/{plates,notebook,panes}.html` | Prior AI exploration, tonight | 7/10 — right genre, unverified content |
| `sankalp.pdf` | Real CV | The only source of truth for claims |
| Root scaffold (`package.json`, `vite.config.js`, `src/`) | Appeared mid-review | Unresolved — see D2 |

### Current state rating: 3/10

`legacy/index.html` is a competent 2015 student-portfolio template. Poppins +
Caveat + Oswald, coral `#E57373` on `#121212`, animated static overlay at 0.35
opacity, Font Awesome, and the IA `Home / About / Skills / Projects /
Achievements / Contact`. It is not badly built. It is aimed at the wrong reader.

What makes it a 3 for a research audience, specifically:

- **26 skill chips.** Python, React, Docker, VS Code as a badge. Nobody who
  reads papers lists VS Code. This is the single strongest junior signal on
  the page and it is above the fold of the projects section.
- **`hELLO. i aM SANKALP`** in mixed case, with a `Caveat` handwriting logo.
  Reads as personality substituting for evidence.
- **Nine projects, all equal weight.** Nothing is argued, everything is listed.
- **No figure anywhere.** Every project is prose plus tech tags. A researcher
  scanning for thinking finds only inventory.
- **No stated limitation.** The page has no failure mode, so it has no credibility.

What a 10 looks like for this page: a reader who evaluates ML researchers for a
living lands, recognises the genre in under five seconds, understands **one**
system and why its design was hard within thirty seconds, and finds a paragraph
saying what has *not* been validated. They leave believing the person is
honest before they believe the person is skilled.

### `explore/` rating: 7/10

The exploration already found the vein: dark ground, cream figure plates,
`Fig. N` captions, mono metadata, an `Archive` table, and a `Limits` section.
That is correct instinct and I am not going to re-invent it. Three points hold
it at 7 — content authenticity (§7), no responsive or accessibility spec, and a
palette decision I want to challenge (§3).

The best asset in this repo is one sentence in those mockups:

> "I work at the boundary where a model stops being allowed to decide."

That is a **thesis**, not a tagline. It stakes a real research area — reliability
and evaluation of LLM systems — and your actual CV supports it: PharmaGuard's
deterministic risk engine that the model is forbidden to override, SwitchBoard's
failover chains. Keep it. Everything below is built to serve it.

### DESIGN.md status

None exists. This document becomes it.

---

## 1. Brand-first or product-first?

**Neither. Document-first.**

The brand-first / product-first split assumes the two available genres are
"landing page" and "app." Both are wrong here. There is no product to operate
and no company to brand. Picking either one is how you end up with a hero
section and a three-column feature grid.

The genre to imitate is the **technical report**. Distill.pub, an arXiv preprint,
a lab notebook, a Tufte-set essay. That decision cascades into everything: the
grid is a document grid, the type is set for reading not scanning, figures carry
the argument, and the page is legible with JavaScript disabled.

Brand still exists — it just lives in *how the document is set*, not in a logo
or a gradient. Margin discipline, caption voice, one accent used sparingly. The
restraint **is** the brand. A researcher reading it should feel the care the
same way they feel it in a well-typeset paper: without being able to name it.

The thing being sold is not skills. It is **judgment**.

---

## 2. Who is the target audience?

In priority order. This ordering is a real decision and it costs something.

1. **Research-lab and PhD-admissions readers.** Professors, research engineers,
   MS/PhD committees. The primary reader. They read a great deal, they skim
   aggressively, and they are trained to distrust polish that outruns substance.
   They are looking for one signal: *does this person have research taste?*
   Meaning — can they ask a question, isolate a variable, report a negative
   result, and say what they do not know.
2. **ML-engineering hiring managers at AI-first startups.** Near-term income,
   graduating July 2027. They want shipped systems and will find them.
3. **Peers on GitHub / X.** Amplification. They share things that are *made*,
   not things that are *listed*.
4. **You, in 2028.** The page should be a substrate you can add a real paper to
   without a redesign, and should not embarrass you.

**Design consequence of ordering #1 first:** the audience is expert. Do not
explain what RAG is. Do not define a vector database. Assume the vocabulary.
The usual "don't make me think" rule inverts — the failure mode with this reader
is not confusion, it is condescension.

**The cost, stated plainly:** deleting the skills grid removes keyword surface
that ATS filters and junior recruiters scan for. Mitigation in §5 — an `Archive`
table and a linked resume PDF carry the keywords without putting them on the page.

---

## 3. What visual style should the UI express?

**Direction: a marked-up paper, rendered dark.**

Reference set: Distill.pub (figure gutters, margin notes, diagrams that are the
argument), tufte-css (sidenotes, small multiples), arXiv/LaTeX (`Fig. N` +
caption discipline), a physical lab notebook (grid ground, dated entries, red-pen
annotation).

### Typography — three roles, no fourth

| Role | Face | Use |
|---|---|---|
| Display | Inter Tight, or Geist if we keep the scaffold | Thesis line, section heads. Tight tracking at large optical size. |
| **Body** | **Source Serif 4** (optical-size axis) | All running prose. |
| Mono | JetBrains Mono / Geist Mono | Metadata, labels, code, table cells. **Never body prose.** |

The body serif is the decision that does the most work. Every AI-generated
portfolio in existence is Inter-only. A serif body at a real measure signals
*document* before a single word is read, and it is the cheapest differentiator
available. This is also where I disagree with the root scaffold, which currently
pulls only Geist and Geist Mono.

Four sizes. Not seven.

```
Display   clamp(36px, 5vw, 56px) / 1.05 / -0.02em
Head      22px / 1.25 / -0.01em
Body      18px / 1.65 / 0     measure 66ch
Meta      12px / 1.40 / +0.08em  uppercase, mono
```

### Color — warm paper, one panel, one accent (revised per D6)

```
ground      #F5F1E8     warm paper
plate       #EDE7D9     figure panel, hairline border
rule        #D8D0BE     hairlines
ink         #1A1815     primary text
ink-2       #6B655A     secondary
ink-3       #98918370   metadata
accent      #C4432A     annotation red — marks AND links
```

Two changes from the original spec, both from evidence rather than taste.

**Lime is dropped.** `explore/` used `#C8F135`, the single most overused accent
in AI-product design right now. Wearing it puts the page in exactly the genre we
are escaping.

**The ground inverted** (D6). The live SwitchBoard page is warm cream, and
matching it buys one authorial voice across everything Sankalp ships. It also
happens to be the stronger call on its own merits: dark-ground researcher
portfolios are the saturating cliché, paper is the metaphor the whole strategy
runs on, and annotation red clears ~5.5:1 on cream — so unlike on dark, it can
carry link text as well as figure marks. The accent gains range from the
inversion rather than losing it.

Still under ~2% of page area. Links get red plus an underline; the underline is
never dropped, so colour is never the only signal.

### Figures — the actual design decision

**Every system gets exactly one diagram that carries its claim.** Not a
screenshot. Not a logo wall. A hand-authored SVG on a cream plate with a
`Fig. N` label and a caption written in paper-caption voice.

The explore mockups already sketch the right five: a failover timeline, a
responsibility boundary showing what the model may and may not decide, a message
sequence, a train/val loss curve, a set-overlap diagram. The failover and
boundary figures are genuinely good — the boundary one *is* the thesis, drawn.

This is 60–70% of the total effort and it cannot be faked. See §7.

### Grid

Asymmetric. Persistent left rail (identity + section index, 220px), prose column
680px max, figure plates break out wider into the right gutter to ~920px. That
break-out is the distill/tufte move and it reads as *document* instantly.

### Motion budget: exactly three

1. Section-index marker moving to the current section. 150ms, linear-ish, no drama.
2. One state change per figure that has a before/after — the failover path
   lighting up, once, on scroll into view, 400ms. Only where it clarifies.
3. Link underline draw on hover, 120ms.

Nothing else. No fade-up on every block, no counters, no scroll-jacking.
`prefers-reduced-motion` kills all three.

---

## 4. What generic AI design patterns must be banned?

### Banned — carried over from `legacy/index.html`

- The skills grid. Any grid of technology chips or logos, at any size.
- Skill percentage bars.
- `Caveat` or any handwriting display face.
- Mixed-case cutesy headlines (`hELLO. i aM SANKALP`).
- The animated noise/static overlay.
- Font Awesome, or any icon font.
- The IA `Home / About / Skills / Projects / Achievements / Contact`.
- Coral-on-near-black as a palette.
- Nine projects at equal weight.

### Banned — universal AI slop

- Gradient mesh, animated blobs, particles, starfields, aurora.
- Three-column feature card grids.
- Bento grids. Now its own cliché.
- Glassmorphism, glow borders, gradient text, neon anything.
- Purple/blue gradients. Lime-on-black (§3).
- Typewriter / text-scramble effects on the headline.
- Count-up-on-scroll number animations.
- Testimonials. A student has none.
- Emoji as section markers.
- Stock 3D renders, isometric illustration, generic "AI brain" imagery.
- Project screenshots inside laptop/phone mockup frames.
- Dark-mode toggle presented as a feature.
- "Let's build something amazing together."
- Cards as the default container. If a card does not enclose a genuinely
  separable unit, it is a border with no argument.

### Banned — copy

Passionate, driven, cutting-edge, seamless, robust, innovative, leverage,
journey, ecosystem, "I love building," "excited to," "always learning."

No adjectives about yourself. Ever. Let the figure do it.

### Banned — structural

- Any claim without a mechanism.
- Any figure that decorates rather than evidences.
- Any number without an attribution next to it. `84%` alone is noise;
  `84% — NPTEL Deep Learning, IIT Ropar, 12 weeks` is a fact.
- Any technology named that you could not defend for ten minutes in an interview.

---

## 5. Information architecture

The current IA is a resume in HTML. Replace it:

| # | Section | Job |
|---|---|---|
| 00 | **Thesis** | One sentence naming the boundary you work at. Four attributed numbers. No buttons. |
| 01 | **Systems** | **Five**, not nine — see D3. Each: the question, the constraint, the figure, what it cost. |
| 02 | **Archive** | Everything else. A table, one line each. Volume without attention spend. |
| 03 | **Ledger** | Education, awards, leadership. Compressed to a table, not celebrated. |
| 04 | **Limits** | What is not validated. What is hackathon-scale. What you have not trained. |
| 05 | **Contact** | One line. Email, GitHub, LinkedIn, resume PDF. |

**There is no Skills section.** That is the most important subtraction on this
page. Skills are entailed by systems. A reader who sees a deterministic risk
engine reasoned about correctly does not need to be told you know Python.

`Limits` is the trust move. Nobody else in the applicant pile writes one. It is
what makes everything above it believable — the reservoir of goodwill gets filled
by the one section that is not selling.

---

## 6. What should the user feel?

Across three time horizons:

- **0–5s, visceral.** *"This person reads papers."* Genre recognition before a
  word is parsed. Specifically: the relief of finding a document instead of a pitch.
- **~30s, behavioural.** *"I understand one system and why its design was hard."*
  One understood, not six skimmed. If they leave having grasped the
  responsibility-boundary figure, the page worked.
- **~3min, reflective.** *"He knows what he hasn't done."* The `Limits` section
  converts competence into trust.

Net: **calm confidence, earned.** The feeling of talking to someone who is not
selling you anything.

And for you: a page you are not embarrassed by in 2028, and that accepts a real
paper as a new entry without a redesign.

---

## 7. The research-evidence gap — resolved, with a condition

The original concern: your CV is an engineer's CV. Four shipped LLM systems, four
hackathon wins, 1600 LeetCode, a club vice-presidency. Strong third-year
engineering record, but on paper it contains no papers, no reproductions, no
experiments and no negative results — while the `explore/` mockups listed two
projects appearing nowhere in `sankalp.pdf`.

**Resolved (D3): both are real and unlisted.** That materially changes the page.
`Dropout, from scratch` and `Hybrid Semantic Search` are the two strongest assets
you own for the §2 primary reader, and they were sitting off your CV. They are
now systems 04 and 05, and they should also go **on the CV**.

The condition that remains: a reproduction is only evidence if the write-up shows
the reasoning. "Reproduced the paper's figure" is a claim. "Reproduced Fig. 4;
my validation curve separated ~15 epochs earlier than theirs, which traces to
batch size" is evidence. The captions cannot be written without the specifics
listed under *Decisions locked*.

If those details are thin, the honest move is to spend an evening re-running and
writing it up properly rather than shipping a vague claim to the one audience
that checks.

---

## 8. Accessibility and responsive — specified, or it will not exist

**Contrast** (revised for the cream ground, D6). Ink `#1A1815` on `#F5F1E8` is
~15:1. Secondary `#6B655A` is ~6:1. Accent red `#C4432A` is ~5.5:1 — clears AA
for body text, so it may carry links. Metadata `ink-3` is deliberately below AA
and is therefore restricted to decorative labels that are never the only carrier
of a fact.

Links are red **and** underlined. The underline is never dropped — colour is
never the only signal.

**Figures.** Every SVG carries `<title>` and `<desc>`, and every caption states
the same claim in prose. The figure is never the only channel.

**Keyboard.** The section rail is real `<nav>` with visible focus rings.
Skip-to-content link. Full tab order.

**Motion.** `prefers-reduced-motion: reduce` disables all three motions.

**No-JS.** The page is completely readable with JavaScript disabled. This genre
demands it and it costs nothing if planned now.

**Print.** Ship a print stylesheet that inverts to paper. A professor may
literally print this. Almost nobody does it; it is on-theme and cheap.

**Three responsive layouts, intentionally designed — not one stacked:**

- **≥1200px** — rail + prose + plates breaking wide into the right gutter.
- **768–1199px** — rail collapses to a sticky top strip; plates go full prose width.
- **<768px** — no rail; **plates become horizontally scrollable inside a bounded
  frame with a visible scroll affordance.** This is the failure mode of this
  entire genre: a schematic squeezed to 360px is unreadable, and every
  implementation discovers this after shipping. Design it now.

---

## 9. Risks

1. ~~**Content authenticity.**~~ Resolved by D3. Downgraded to: reproduction
   write-ups must show reasoning, not just claim a result. See §7.
2. **Figure cost.** Three to five real diagrams are most of the work. If they are
   not made properly, the direction collapses into pretension — which is worse
   than the honest template we started from.
3. ~~**Genre saturation.**~~ Largely resolved by D6. "Dark terminal researcher
   portfolio" is the saturating cliché; warm paper sidesteps it. The residual
   risk stands: differentiation must come from the figures being *real*. A
   beautifully set page with decorative figures is slop wearing a lab coat.
4. **Audience trade.** Deleting the skills grid costs keyword surface. Mitigated
   by the Archive table and the linked resume PDF.
5. **Concurrent scaffold.** A Vite/React/Tailwind app appeared at repo root
   during this review, contradicting `CLAUDE.md`. Sidestepped by D4 — `studio/`
   is self-contained and touches nothing at root — but the contradiction is
   still live in the repo and someone should resolve it.

---

## 10. Build order

1. `studio/DESIGN.md` — tokens, scale, figure spec, motion budget, copy rules.
2. **Figures first, before any layout.** Five SVGs on cream plates. The diagrams
   are the page; design them first or the layout is decoration.
3. Direction synthesised from `explore/`, not a fourth from scratch. `panes` has
   the best structural idea, `plates` the best figure treatment.
4. `studio/index.html` — static, self-contained, no build step, per D4.
5. Full §8 pass (contrast, no-JS, print, three responsive layouts, reduced
   motion) before it is called done.

Blocked on the `Dropout` / `Hybrid Semantic Search` specifics under
*Decisions locked* — steps 1–3 can start without them; captions cannot.

---

## Revision 4 (2026-08-25) — current employment, one line, no figure

The resume gained an employer. `01 Systems` stays **three**: D3's ceiling holds.

Kapture CX appears as a single line under the thesis lede, in the mono annotation
voice: employer, role, and area of expertise, nothing further. Client decision, and the
right one for this page. A fourth system would have owed a fourth figure, and the only
figure available was a throughput before/after whose two numbers (synthetic harness and
live traffic) cannot honestly be drawn as one claim. Better absent than averaged.

The throughput numbers stay in `PRODUCT.md` as evidence on hand and stay off the page.
The thesis lede names `serving` in its opening list because the work is real; the stat
strip is unchanged and still opens with the state-level hackathon.

---

## Revision 5 (2026-08-25) — plain section names, Projects split out, panel view

Three changes, all client-directed.

**The `00 / 01 / 02` counters are gone**, from the rail, the section heads, and the
`1.1 / 1.2` prefixes on each write-up. Read as generated-portfolio decoration rather
than as document structure, which is fair: the page never referenced a section by
number, so the numbers carried nothing. `Fig. N` stays. Those are referenced by the
captions and by Limits, and they are the one numbering the plate language actually
needs.

**IA, replacing the table in §5:**

| Section | Job |
|---|---|
| **About** | The boundary sentence, current position in one line, four attributed numbers |
| **Work** | Paid engagement. RDSO Documents, `Fig. 1` |
| **Projects** | SwitchBoard (`Fig. 2`), PharmaGuard (`Fig. 3`), then "Also shipped" as a table |
| **Ledger** | Education, awards, leadership |
| **Limits** | What is not validated |
| **Contact** | One line |

`Archive` is gone as a section name; its table is now `Also shipped` inside Projects,
under a rule rather than a second `sec-head`, so it reads as subordinate to the two
write-ups above it. Work and Projects are split because the resume splits them, and
because "this was paid for" is the single strongest signal on the page.

**Panel view at ≥1100px.** The rail is already a persistent sidebar there, so it now
behaves as a tab list: one section visible, the others out of the flow. Below 1100px
the rail is a horizontal strip and the page stays one continuous scroll, which is what
the section index was built for.

Three constraints this had to respect, all of them met:

- The click is authoritative and the URL is written afterwards on a best-effort basis.
  Deriving the panel from the hash alone dies in any context where the hash is not
  writable, which is not a hypothetical: the local preview serves the file as a `data:`
  document and hash writes throw there.
- `[data-panels]` is set by JS only, so no-JS renders the full document with every
  section reachable. The feature is additive, not load-bearing.
- The scroll index still runs, gated to the narrow layout, so the marker keeps doing
  its old job where the page still scrolls as one piece.

Motion budget unchanged at 2 of 3: a panel switch is a swap, not a transition. Nothing
fades, nothing slides. `scroll-behavior:smooth` means the reset to top is animated by
the browser, and `prefers-reduced-motion` already kills that.

---

## Revision 6 (2026-08-25) — copy pass against cursor/unslop

Ran every visible string against the `unslop` rules. The page was already clean on AI
vocabulary (zero hits for crucial, delve, robust, showcase, testament, leverage,
utilize, seamless, landscape, "serves as", "not just X but Y"), so the work was in
three places, and two of them were self-inflicted.

**Colons as connectors (rule 14), seven instances.** Every one of them arrived when the
em-dashes were stripped in an earlier pass and replaced with colons. That is trading one
tell for another, which the rule names explicitly. `product: the half that`,
`one job: writing`, `deleted: a superseded file`, `enough: one finds meaning`,
`outward: routing, retrieval`, `ETag changed: same URL`, and the `GOLD:` ledger line are
now sentences or commas. Added to the hard rules in `CLAUDE.md` so the next dash removal
does not recreate them.

**Captions restating the body (rules 11, 28).** The worst tell on the page, and not one
the rule list names directly. Fig. 1 and Fig. 3 each repeated the prose above them
almost sentence for sentence, in slightly different words. Fig. 3's body said "the
clinician loses the prose and keeps the recommendation" and its caption said "loses the
prose, not the guidance"; the same argument twice, reworded. Both captions now describe
what the drawing shows and nothing else. Fig. 1 counts passes and names the token that
changes; Fig. 3 traces the one arrow and the absence of a return arrow. Fig. 2 was
already doing this and was left alone.

**Naming a feeling instead of a mechanism (rule 27).** "The unglamorous half of an LLM
product" and "the plumbing that decides whether a model is safe to touch" both went.
The rule's sharpest test is the one that caught the section tail "Built to ship, not to
demo": it could appear unchanged in any other project's docs, so it says nothing about
this one.

Smaller: passive voice given an actor in three places ("a semantic cache answers repeat
questions", "a deterministic risk engine makes every clinical call"), the adverbs
propping up weak verbs ("quietly being revised", "a channel that actually moves"),
`Surface` renamed to `Endpoint` in the SwitchBoard table because "API surface" is on the
metaphor-noun list, curly quotes straightened, and Red Agent's three-item feature list
rewritten as a sentence.

One rule was applied against my own judgement, recorded here so it can be reversed
knowingly: **rule 19, curly quotes.** `'The Big O'` now uses straight quotes. In a page
this typographically deliberate, curly quotes are the correct setting rather than an AI
tell, and the rule is aimed at generated markdown. It is one club name and reverting it
is a two-character edit.

What was deliberately kept: the h1, which is abstract but is the page's actual claim and
belongs to nobody else; "Things with a date attached", which is dry and accurate; "It is
correct, not fast, and it has never been asked to be", which is voice, and rule 27's
"add soul" section asks for exactly that; and the four bold sentences, one per write-up,
which are an emphasis pattern rather than the bold-every-noun tell of rule 15.

---

## Revision 7 (2026-08-25) — Experience, and an About that answers the first question

**`Work` is now `Experience`,** holding both paid engagements in resume order, newest
first, each with its dates in the mono annotation line.

**Kapture CX is back, at the right depth this time.** Revision 4 cut it to one line
because a fourth system would have owed a fourth figure. As an Experience entry it owes
nothing, so it gets two paragraphs: the prefix-cache mechanism, the quantization
benchmarks, and the routing argument. The throughput numbers stay off the page. They
need the benchmark-versus-production split to be honest, that split needs a figure, and
a figure is exactly what this section does not have. `PRODUCT.md` still holds them.

**RDSO lost its figure and two thirds of its words.** Client work with no public
artefact, so the plate was a drawing of a system nobody can go and look at. The one
insight worth keeping is that the portal reuses a URL on revision, which makes the link
set useless and the ETag the only honest signal. That survives in two paragraphs. The
seven-row spec table is down to three.

Figures renumbered again as a consequence: SwitchBoard is `Fig. 1`, PharmaGuard is
`Fig. 2`, and the two Limits cross-references moved with them. **Only Projects carries
figures now,** which is a cleaner rule than the old one: a figure means there is
something deployed you can go and check.

**About answers what a first-time reader actually asks.** It was a headline, one lede,
and a stats strip, which said what the page was about but not what the person can do.
Now: what I build, in concrete mechanisms rather than a skills list. Then what I have
actually done, in four sentences. Then one opinion, because a first impression made
entirely of facts reads like a spec sheet.

The new `.job` block is deliberately lighter than `.system`: title, dates, two
paragraphs, a short spec list, no plate. One bug worth recording. The first pass named
it `.role`, which the rail's own identity line already used, so the experience styles
leaked onto "ML Engineer, Bengaluru" in the sidebar. Renamed to `.job`. The blind
find-and-replace that fixed it then renamed the rail's class too and broke it the other
way, which is the second lesson: a class rename across a single-file page needs the
occurrences read, not counted.

Unslop pass on the new copy. "Two are my own" went because the antecedent was missing.
The Kapture paragraph names the mechanism (a byte-identical prefix is what lets the
cache hit) rather than the feeling of speed. No colons as connectors, no dashes, and the
opinion at the end of About is concrete about three specific failures rather than
gesturing at rigour.

---

## Revision 8 (2026-08-25) — the rail was set at annotation size

The rail was doing navigation at the same 10.5px the figures use for axis labels, which
is how the resume ended up as the third grey line in a footer list. Fixed by treating
the rail as navigation rather than as marginalia.

Rail 200px to 236px, shell 1240 to 1280 so `main` keeps its measure (900px, so the
plates still break out to their full width). Name 17 to 19px, section index 10.5 to
12px with the marker grown to 6px to match.

**The resume gets a hairline box.** Not a filled button: the page already means
"bounded region" with a 1px rule in every plate and table, so a solid pill would be the
one element speaking a different language. It sits first in the foot now, with GitHub and
LinkedIn as plain lines below it, because those two are not what a hiring reader came to
leave with.

Two bugs found while doing it, both worth recording because neither was visible in the
change I set out to make.

**The resume was unreachable on every touch viewport.** The tablet and mobile rule was
`.rail-foot{display:none}`, written when the foot held three equal grey links and the
horizontal strip had no room. That silently took the PDF with it, leaving Contact as the
only path to it on a phone. Now the foot stays and only the non-resume links hide, so
the box moves into the strip at a 44px target. The complaint that started this revision
was about desktop, and the mobile case was worse.

**`scroll-margin-top` was a hardcoded 132px.** A taller rail made the sticky strip 215px
on a phone, so tapping a section landed its heading 80px underneath the strip. The strip
wraps to a different height at every width, so a constant was always going to be wrong
at some size. JS now measures the rail into `--rail-h` on resize and the rule reads
`calc(var(--rail-h, 132px) + 14px)`, with the old constant as the no-JS fallback.
Verified: the Projects heading now lands 90px clear of the strip at 375px.

---

## Revision 9 (2026-08-25) — project headings link to the deployed site

`SwitchBoard` and `PharmaGuard` were headings above a spec table whose `Live` row held
the URL, so the most useful click on the page was its least obvious one.

Both headings are now links to the deployment, with a `↗` (U+2197) and
`target="_blank" rel="noopener noreferrer"`.

**At rest the heading stays ink.** A 29px accent underline would outrank the h1 and turn
the page into a link farm, so the tilted arrow carries the affordance instead, in ink-3
at 0.6em. The accent and a 1px underline at 7px offset arrive on hover, which is the
third and last item in the motion budget. `cursor:pointer` and a `:focus-visible`
outline come with it.

The arrow is `aria-hidden`, with a `.vh` visually-hidden span saying "live site, opens in
a new tab" so the arrow's meaning is not sighted-only.

**Every off-site link now opens in a new tab,** not only the two headings, because the
`Live` rows point at the same URLs and a heading that opens a tab next to a row that
does not is a coin flip for the reader. Eleven external anchors, all with `noopener`.
The hash nav is untouched, which matters: giving those a target would break the panel
switching entirely.

Verification note worth keeping. The in-app preview pane does not produce a real CSS
`:hover`, so hovering there proved nothing and the screenshots looked like the effect
was missing. `browse hover` on the gstack Chromium does drive a real pointer, and
confirmed the rest state (ink, no underline) against the hover state (accent, underline
1px, offset 7px, arrow accent). Use the gstack browser for hover and focus states.

---

## Revision 10 (2026-08-25) — the Projects spec tables are gone

Both `dl.meta` blocks under Projects removed. Each write-up now ends on its figure and
caption, which is the right place to stop: the caption is the evidence and the table was
a second, quieter version of the same claims.

The two under Experience stay. They are doing different work there, standing in for the
figure those entries do not get.

**One thing left the page with them.** SwitchBoard's `Live` row held the only link to
`github.com/sankalp-happy/switchboard`. The deployment survived, because the heading now
carries it, but the source repo is only reachable through the GitHub profile in the rail
and in Contact. Flagged to the client rather than silently preserved, since the
instruction was to remove the section and a lone `source` link hanging under a figure
would have been a different design decision than the one asked for.

`dl.meta` styles stay in the sheet, still used by Experience.

## Revision 11: the intro, and the rhythm underneath it

The About section was written as a thesis, not an introduction. It opened on a
claim ("I work at the boundary where a model stops being allowed to decide")
and never said who was speaking or what he actually does. It also narrowed him
to one activity, LLM serving, when the work is LLMOps and model training and
the current role is an internship. The h1 now introduces him by name and by
field, and the lede states the role, the employer and the city before it states
anything clever.

Four rhetorical habits were running as a template across the whole page, and a
reader clocks the rhythm before the words:

- One bolded mic-drop sentence per paragraph. Six on the page. Now one, the
  clinical-validation caveat in Limits, which is the only place emphasis is
  load-bearing rather than decorative.
- "It is not X, it is Y." Five instances, including two in the also-shipped
  table. One survives, in the last About paragraph.
- Noun-list-as-sentence ("Gateways, serving, retrieval, ingest, failover.")
  twice, nearly verbatim, in About and Limits. Both are sentences now.
- The word "boundary" in the title, the meta description, the h1, the Fig. 2
  caption and twice in Limits. It now appears once, in the Fig. 2 title, where
  it names a dashed line that is literally drawn.

Aphoristic closers went with them. The Fig. 2 footer said "ONE ARROW, ONE
DIRECTION. THAT CONSTRAINT IS THE ARCHITECTURE."; it now states what the drawing
shows. Rule going forward: a device used more than once in a page is a template,
and the fix is to break the rhythm rather than to soften the content.

Two corrections found while editing. Limits claimed "two reproductions under
Projects" and the table lists one. And the Ledger carried the page's only curly
quotes.

## Revision 12: motion, borrowed from thegustafson.com

The reference site (Nick Gustafson's) shares this page's ground already, warm paper,
mono eyebrows, hairline rules. Four things it does that this page did not:

**Links wear their underline at rest.** His prose links carry a light underline that
inks in on hover, transitioned over 150ms. This page thickened the underline instead,
1px to 2px, which moves the line by a pixel while nothing around it moves, and reads as
a rendering glitch rather than as a response. Now the underline sits in rule grey at
4px offset and the colour goes to accent over 160ms. Nav, contact and rail links are
unaffected; they were never underlined.

**The resume is linked inside a sentence.** His "More about me" sits in the intro
paragraph with an arrow after it. The rail box stays, because a hiring reader who has
already scrolled needs it in reach, but the lede now carries the same link inline with
an arrow that slides 3px on hover. Two placements, one for each way of reading a page.

**One word in the headline types itself.** His hero cycles a word with a blinking
caret. Here the heading's last word cycles LLMOps, model training, LLM serving,
retrieval, which is the same set the sections below cover, so the motion carries
information instead of decorating a heading. The markup holds the full static phrase
for no-JS and reduced-motion readers, the animated span is `aria-hidden` with a
visually hidden copy beside it, and the slot is emptied during parse rather than after
load, because the static phrase is the only state that wraps the heading to a fourth
line and clearing it late dropped the lede 59px in front of the reader.

The word also has to change without the heading re-wrapping around it. Four words of
different lengths at the end of a 19ch measure meant the last line reflowed, and at
some widths the word split across two lines, which is worse than no animation at all.
The em now reserves 6.4em, the width of the longest word it will ever show plus the
caret, and takes `white-space: nowrap`. The reservation sits on the em and not on the
text slot, or the caret parks at the far edge of an empty box instead of staying
against the last letter. Measured at 375, 500, 700, 900, 1100, 1300 and 1440px, the
line count is identical for all four words and the empty state.

**Blocks respond as a whole.** His post rows take a soft background on hover, padded
wider than the text. The also-shipped table now does the same, so the row is the
target rather than the link inside it.

One thing added that is not his: section text rises 7px into place, staggered across
the first blocks, replaying whenever a panel is switched so the tab reads as a page
being turned. Below 1100px an IntersectionObserver adds the class on the way in and
unobserves, since this is an entrance and not a state. Every rule above lives inside
`prefers-reduced-motion: no-preference`, the class is JS-set, and the reduce block
still zeroes animation and transition globally, so a no-JS document is never left
holding invisible text.

Not borrowed: his top nav (the rail is load-bearing here), his portrait, and his
icon row.

## Revision 13: the homepage index

Panel view shows one section at a time, so About was a dead end. The rail listed five
more names and nothing on the page said what any of them held. About now ends in an
index of the other five, each row a link. One href serves both layouts, a panel switch
above 1100px and an anchor scroll below it, and the rows go through the same click
handler the rail uses. `aria-current` stays on the rail alone, because marking a
preview row current would tell a screen reader the reader is inside a section they are
only looking at from outside.

The first version of this was a mono label, a sentence, and an arrow per row. It was a
table of contents, and it read as one: correct, and completely flat. It had quietly
opted out of the page's strongest move, which is that this page draws things.

Each row now carries a small drawing built from the same figure primitives as Fig. 1
and Fig. 2, so the marks re-theme with the page and cost no assets:

- Experience, two spans on one time axis, the second open-ended with an arrow.
- Projects, one endpoint fanning to three, which is Fig. 1's shape in miniature.
- Ledger, a date column and four ruled entries of different length.
- Limits, a solid line that stops at a tick and continues dashed.
- Contact, one arrow leaving a bounded frame.

Then the section name at display size, 23px, and one line of measurement in mono, which
is the voice the plates and the ledger already use. The prose description came out. A
count is denser than a sentence and it does not repeat the section tail the reader is
about to land on. Every count refers to what is actually on the page: two write-ups,
two figures, four table rows, five paragraphs under Limits.

Hover fills the row with `--band`, inks the name and the arrow to accent, and moves one
part of the drawing 4px, the part that already points somewhere. One moving element per
mark, not five.

Two defects the first build shipped and the inspection pass caught. The name and the
measurement rendered on one line, because the middle column was a bare inline `span`.
And the rest-state arrow was set in `--rule`, which is a hairline colour, around 1.9:1
on slate; it is an affordance, so it went to `--ink-3` like the measurement beside it.

## Revision 14: the contact cluster

Four addresses sit directly under the heading, so the first thing after the name is a
way to reach it: LinkedIn, GitHub, Email, LeetCode, in the order the user named them.
Icon only. A label under each mark made the block a second navigation bar competing
with the index below it; the mark alone reads as a control, and the service name is
carried in a visually hidden span so the link still announces itself.

The first build put them in the 4-up ruled grid the page used for its numbers, with
labels, below the intro paragraphs. Wrong on both counts: too far down to be the thing
after the name, and too wordy for what it is.

Circles, at 46px with a 19px mark, 44px on small screens. This is the one round shape
on a page that means "bounded region" with a 1px rectangle everywhere else, and it is
deliberate: a round hairline target reads as a control rather than as another framed
block of text. Gaps are even at 14px.

The marks are the official brand silhouettes, GitHub, LinkedIn and LeetCode from
simple-icons, which is CC0. They are filled rather than drawn in the figures' 1.25px
stroke, because a brand mark is recognised by its silhouette and an outlined octocat is
not a thing anyone recognises. Every mark takes `fill: currentColor`, so one path per
service covers both grounds and the hover accent, with no second asset and no
`prefers-color-scheme` branch. The envelope is authored here, since an inbox has no
logo; it was rendered at 240px and inspected before going in at 19.

Contact now appears in the rail, in this cluster, and in the Contact section. That is
deliberate: PRODUCT.md holds the address to one action from any screen position, and in
panel view About is the only screen a reader is guaranteed to see.
