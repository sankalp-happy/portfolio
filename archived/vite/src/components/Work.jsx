import { Trophy } from '@phosphor-icons/react'
import Reveal from './Reveal'
import { Plate, figureByProject } from './Figures'
import { leadProjects, secondaryProjects, indexProjects } from '../data/content'

function Award({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-ink uppercase">
      <Trophy size={13} weight="regular" />
      {children}
    </span>
  )
}

function Facts({ rows }) {
  return (
    <dl className="mt-7 max-w-[46ch]">
      {rows.map(([key, value]) => (
        <div key={key} className="rule-b flex gap-4 py-2.5 first:border-t first:border-rule">
          <dt className="w-[42%] shrink-0 font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
            {key}
          </dt>
          <dd className="text-[13.5px] leading-snug">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Meta({ project }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">{project.name}</h3>
        <span className="font-mono text-[11px] tracking-[0.06em] text-graphite uppercase">
          {project.kind}
        </span>
      </div>
      {project.award ? (
        <div className="mt-3">
          <Award>{project.award}</Award>
        </div>
      ) : null}
      <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.5]">{project.summary}</p>
      {project.body.map((para) => (
        <p key={para.slice(0, 24)} className="mt-4 max-w-[66ch] text-[15px] leading-[1.65] text-graphite">
          {para}
        </p>
      ))}
      <p className="mt-6 font-mono text-[11.5px] leading-relaxed text-graphite">
        {project.stack.join('  ·  ')}
      </p>
    </>
  )
}

export default function Work() {
  const [first, second, third] = leadProjects

  return (
    <section id="work" className="relative z-10 px-5 pt-14 pb-20 sm:px-8 lg:pt-20 lg:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal as="header" className="max-w-[62ch]">
          <h2 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Selected work</h2>
          <p className="mt-4 text-[17px] leading-[1.55] text-graphite">
            Three systems I owned from architecture to deploy. Each figure is the real wiring, not
            an illustration of it.
          </p>
        </Reveal>

        {/* Entry one: argument left, plate right. */}
        <article className="mt-16 grid gap-10 border-t border-rule pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Meta project={first} />
            <Facts rows={first.facts} />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7 lg:pt-2">
            <Plate
              number={first.figure}
              caption={`${first.name}. The model sits after the rule engine, so a prescribing recommendation is never something an LLM decided.`}
            >
              {(() => {
                const F = figureByProject[first.id]
                return <F />
              })()}
            </Plate>
          </Reveal>
        </article>

        {/* Entry two: plate runs full width, argument reads underneath in two columns. */}
        <article className="mt-20 border-t border-rule pt-12 lg:mt-28">
          <Reveal>
            <Plate
              number={second.figure}
              caption={`${second.name}. The dashed edges are the paths nobody designs for: quota errors and timeouts. They are the reason this exists.`}
            >
              {(() => {
                const F = figureByProject[second.id]
                return <F />
              })()}
            </Plate>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal delay={60} className="lg:col-span-7">
              <Meta project={second} />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <Facts rows={second.facts} />
            </Reveal>
          </div>
        </article>

        {/* Entry three: plate left, argument right. */}
        <article className="mt-20 grid gap-10 border-t border-rule pt-12 lg:mt-28 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7 lg:order-1 lg:pt-2">
            <Plate
              number={third.figure}
              caption={`${third.name}. Retrieval answers what is known. XGBoost answers how sure the system is. Keeping those separate is what makes the output auditable.`}
            >
              {(() => {
                const F = figureByProject[third.id]
                return <F />
              })()}
            </Plate>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5 lg:order-2">
            <Meta project={third} />
            <Facts rows={third.facts} />
          </Reveal>
        </article>

        {/* Secondary work: a ledger, not more cards. */}
        <div className="mt-24 border-t border-rule pt-12 lg:mt-32">
          <Reveal as="h3" className="text-2xl font-medium tracking-[-0.025em]">
            Also shipped
          </Reveal>
          <div className="mt-8">
            {secondaryProjects.map((project, i) => (
              <Reveal
                key={project.name}
                delay={i * 60}
                className="rule-b grid gap-x-10 gap-y-3 py-7 first:border-t first:border-rule lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <h4 className="text-xl font-medium tracking-[-0.02em]">{project.name}</h4>
                  <p className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-graphite uppercase">
                    {project.kind}
                  </p>
                  {project.award ? (
                    <div className="mt-3">
                      <Award>{project.award}</Award>
                    </div>
                  ) : null}
                </div>
                <div className="lg:col-span-8">
                  <p className="max-w-[68ch] text-[15px] leading-[1.65] text-graphite">
                    {project.line}
                  </p>
                  <p className="mt-3 font-mono text-[11.5px] text-graphite">
                    {project.stack.join('  ·  ')}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-3">
            {indexProjects.map((project) => (
              <div key={project.name}>
                <h4 className="text-[15px] font-medium">{project.name}</h4>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-graphite">{project.line}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
