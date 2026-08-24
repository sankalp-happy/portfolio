/**
 * Plates. Every diagram on this page is drawn from the same stroke language:
 * 1px hairlines, 2px corners, mono annotation, and the accent reserved for the
 * live path. They carry real architecture, so nothing here is decoration.
 */

function Arrowheads({ id }) {
  return (
    <defs>
      <marker
        id={`${id}-head`}
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0.5 0.8 L7 4 L0.5 7.2 Z" fill="var(--rule-strong)" />
      </marker>
      <marker
        id={`${id}-head-live`}
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0.5 0.8 L7 4 L0.5 7.2 Z" fill="var(--accent)" />
      </marker>
    </defs>
  )
}

function Node({ x, y, w = 124, h = 44, label, sub, live = false }) {
  return (
    <g>
      <rect
        className="node"
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        style={live ? { stroke: 'var(--accent)' } : undefined}
      />
      <text
        className="node-label"
        x={x + w / 2}
        y={sub ? y + 19 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize="12"
      >
        {label}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + 33} textAnchor="middle" fontSize="9.5">
          {sub}
        </text>
      ) : null}
    </g>
  )
}

export function Plate({ number, caption, children, className = '' }) {
  return (
    <figure className={`plate ${className}`}>
      <div className="rule-t rule-b border-x border-rule bg-surface/60 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
      <figcaption className="mt-3 flex gap-3 font-mono text-[11px] leading-relaxed text-graphite">
        <span className="shrink-0 text-ink">{number}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------ Fig. 1 */

export function FigurePipeline() {
  const id = 'f1'
  return (
    <svg viewBox="0 0 460 342" className="w-full" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        A request travels from the interface through an API, splits into vector retrieval and an
        LLM provider, is checked by a rule engine, and returns as a response that feeds back into
        retrieval.
      </title>
      <Arrowheads id={id} />

      <g className="stage" style={{ '--i': 0 }}>
        <Node x={155} y={6} label="Interface" sub="React" />
      </g>

      <g className="stage" style={{ '--i': 1 }}>
        <path className="edge-live" d="M230 50 L230 74" markerEnd={`url(#${id}-head-live)`} />
        <Node x={155} y={80} label="API" sub="FastAPI" live />
      </g>

      <g className="stage" style={{ '--i': 2 }}>
        <path className="edge" d="M230 124 L230 142 L110 142 L110 158" markerEnd={`url(#${id}-head)`} />
        <path
          className="edge-live"
          d="M230 124 L230 142 L350 142 L350 158"
          markerEnd={`url(#${id}-head-live)`}
        />
        <Node x={25} y={164} w={170} label="Vector retrieval" sub="context" />
        <Node x={265} y={164} w={170} label="LLM provider" sub="generation" live />
      </g>

      <g className="stage" style={{ '--i': 3 }}>
        <path className="edge" d="M110 208 L110 228 L230 228 L230 246" markerEnd={`url(#${id}-head)`} />
        <path
          className="edge-live"
          d="M350 208 L350 228 L230 228 L230 246"
          markerEnd={`url(#${id}-head-live)`}
        />
        <Node x={155} y={252} label="Rule engine" sub="deterministic" />
      </g>

      <g className="stage" style={{ '--i': 4 }}>
        <path className="edge-live" d="M230 296 L230 316" markerEnd={`url(#${id}-head-live)`} />
        <rect className="node" x={155} y={318} width={150} height={20} rx="2" />
        <text className="node-label" x={230} y={332} textAnchor="middle" fontSize="11">
          Response
        </text>
      </g>

      <g className="stage" style={{ '--i': 5 }}>
        <path
          className="edge"
          strokeDasharray="3 4"
          d="M155 328 L14 328 L14 186 L25 186"
          markerEnd={`url(#${id}-head)`}
        />
        <text x={20} y={122} fontSize="9.5" transform="rotate(-90 20 122)" textAnchor="middle">
          feedback
        </text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ Fig. 2 */

export function FigurePharmaGuard() {
  const id = 'f2'
  const y = 58
  const cols = [10, 154, 298, 442, 586]
  return (
    <svg viewBox="0 0 720 250" className="w-full" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        A genomic VCF file is called by PharmCAT, scored by a deterministic CPIC risk engine, then
        explained by Llama 3.3 for the clinician view. The risk engine also emits EHR-ready JSON.
      </title>
      <Arrowheads id={id} />

      <g className="stage" style={{ '--i': 0 }}>
        <Node x={cols[0]} y={y} label="VCF file" sub="genomic input" />
      </g>
      <g className="stage" style={{ '--i': 1 }}>
        <path className="edge-live" d={`M134 ${y + 22} L148 ${y + 22}`} markerEnd={`url(#${id}-head-live)`} />
        <Node x={cols[1]} y={y} label="PharmCAT" sub="star alleles" />
      </g>
      <g className="stage" style={{ '--i': 2 }}>
        <path className="edge-live" d={`M278 ${y + 22} L292 ${y + 22}`} markerEnd={`url(#${id}-head-live)`} />
        <Node x={cols[2]} y={y} label="Risk engine" sub="CPIC rules" live />
      </g>
      <g className="stage" style={{ '--i': 3 }}>
        <path className="edge-live" d={`M422 ${y + 22} L436 ${y + 22}`} markerEnd={`url(#${id}-head-live)`} />
        <Node x={cols[3]} y={y} label="Llama 3.3" sub="on Groq" />
        <text x={504} y={142} textAnchor="middle" fontSize="9.5">
          explains, never decides
        </text>
        <path className="edge" strokeDasharray="3 4" d={`M504 ${y + 44} L504 130`} />
      </g>
      <g className="stage" style={{ '--i': 4 }}>
        <path className="edge-live" d={`M566 ${y + 22} L580 ${y + 22}`} markerEnd={`url(#${id}-head-live)`} />
        <Node x={cols[4]} y={y} label="Clinician view" sub="React" />
      </g>
      <g className="stage" style={{ '--i': 5 }}>
        <path className="edge" d={`M360 ${y + 44} L360 176`} markerEnd={`url(#${id}-head)`} />
        <Node x={298} y={182} label="EHR JSON" sub="export" />
      </g>
      <g className="stage" style={{ '--i': 6 }}>
        <path className="tick" d="M10 26 L710 26" />
        <text x={10} y={18} fontSize="9.5">
          FastAPI service boundary
        </text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ Fig. 3 */

export function FigureSwitchBoard() {
  const id = 'f3'
  return (
    <svg viewBox="0 0 720 286" className="w-full" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        A request enters one gateway that tries OpenAI first, then falls back to Gemini and Groq on
        quota or timeout errors, returning a single response and writing every attempt to one log
        stream.
      </title>
      <Arrowheads id={id} />

      <g className="stage" style={{ '--i': 0 }}>
        <Node x={10} y={104} w={110} label="Request" sub="one endpoint" />
      </g>

      <g className="stage" style={{ '--i': 1 }}>
        <path className="edge-live" d="M120 126 L154 126" markerEnd={`url(#${id}-head-live)`} />
        <Node x={160} y={104} w={140} label="Gateway" sub="route + retry" live />
      </g>

      <g className="stage" style={{ '--i': 2 }}>
        <text x={392} y={26} fontSize="9.5">
          fallback chain
        </text>
        <path className="edge-live" d="M300 126 L336 126 L336 56 L374 56" markerEnd={`url(#${id}-head-live)`} />
        <path
          className="edge"
          strokeDasharray="3 4"
          d="M300 126 L336 126 L336 126 L374 126"
          markerEnd={`url(#${id}-head)`}
        />
        <path
          className="edge"
          strokeDasharray="3 4"
          d="M300 126 L336 126 L336 196 L374 196"
          markerEnd={`url(#${id}-head)`}
        />
        <Node x={380} y={34} w={150} h={44} label="OpenAI" sub="primary" live />
        <Node x={380} y={104} w={150} h={44} label="Gemini" sub="fallback 1" />
        <Node x={380} y={174} w={150} h={44} label="Groq" sub="fallback 2" />
        <text x={344} y={160} fontSize="9.5">
          429 / timeout
        </text>
      </g>

      <g className="stage" style={{ '--i': 3 }}>
        <path className="edge-live" d="M530 56 L570 56 L570 120 L586 120" markerEnd={`url(#${id}-head-live)`} />
        <path className="edge" strokeDasharray="3 4" d="M530 126 L570 126" />
        <path className="edge" strokeDasharray="3 4" d="M530 196 L570 196 L570 132" />
        <Node x={592} y={104} w={118} label="Response" sub="provider-agnostic" />
      </g>

      <g className="stage" style={{ '--i': 4 }}>
        <path className="edge" strokeDasharray="3 4" d="M230 148 L230 226" markerEnd={`url(#${id}-head)`} />
        <Node x={160} y={232} w={140} h={40} label="Log stream" sub="every attempt" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ Fig. 4 */

export function FigureMediAssist() {
  const id = 'f4'
  return (
    <svg viewBox="0 0 720 272" className="w-full" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        Symptoms reach a LangChain agent that queries a medical vector store for context, passes the
        result through an XGBoost scorer, and returns a ranked differential whose corrections feed
        back into the store.
      </title>
      <Arrowheads id={id} />

      <g className="stage" style={{ '--i': 0 }}>
        <Node x={10} y={98} w={130} label="Symptoms" sub="free text" />
      </g>

      <g className="stage" style={{ '--i': 1 }}>
        <path className="edge-live" d="M140 120 L164 120" markerEnd={`url(#${id}-head-live)`} />
        <Node x={170} y={98} w={130} label="Agent" sub="LangChain" live />
      </g>

      <g className="stage" style={{ '--i': 2 }}>
        <path className="edge-live" d="M300 112 L316 112 L316 46 L324 46" markerEnd={`url(#${id}-head-live)`} />
        <path className="edge" d="M324 62 L316 62 L316 128 L300 128" markerEnd={`url(#${id}-head)`} />
        <Node x={330} y={24} w={150} label="Vector store" sub="medical corpus" />
        <text x={318} y={92} fontSize="9.5" textAnchor="end">
          query / context
        </text>
      </g>

      <g className="stage" style={{ '--i': 3 }}>
        <path className="edge-live" d="M300 134 L316 134 L316 190 L324 190" markerEnd={`url(#${id}-head-live)`} />
        <Node x={330} y={168} w={150} label="XGBoost" sub="confidence score" />
      </g>

      <g className="stage" style={{ '--i': 4 }}>
        <path className="edge-live" d="M480 190 L512 190 L512 128 L534 128" markerEnd={`url(#${id}-head-live)`} />
        <Node x={540} y={106} w={170} label="Ranked differential" sub="with confidence" />
      </g>

      <g className="stage" style={{ '--i': 5 }}>
        <path
          className="edge"
          strokeDasharray="3 4"
          d="M625 150 L625 250 L300 250 L300 46 L324 46"
          markerEnd={`url(#${id}-head)`}
        />
        <text x={462} y={244} textAnchor="middle" fontSize="9.5">
          feedback loop re-ranks retrieval
        </text>
      </g>
    </svg>
  )
}

export const figureByProject = {
  pharmaguard: FigurePharmaGuard,
  switchboard: FigureSwitchBoard,
  mediassist: FigureMediAssist,
}
