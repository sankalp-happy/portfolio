import { ArrowUpRight } from '@phosphor-icons/react'
import Reveal from './Reveal'
import { Plate, FigurePipeline } from './Figures'
import { profile } from '../data/content'

export default function Hero() {
  return (
    <section id="top" className="relative z-10 px-5 pt-24 pb-10 sm:px-8 lg:pb-14">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:pt-6">
          <Reveal as="h1" className="max-w-[13ch] text-[2.25rem] leading-[0.96] font-medium tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[76px] lg:leading-[0.94]">
            I ship LLM systems,
            <br />
            <span className="text-graphite">not demos.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={70}
            className="mt-7 max-w-[52ch] text-lg leading-[1.55] text-graphite sm:text-xl"
          >
            ML engineer. RAG pipelines, LLM routing, and the FastAPI and React systems that put them
            in front of users.
          </Reveal>

          <Reveal delay={140} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[3px] bg-ink px-5 py-3 text-[15px] font-medium text-paper transition-transform duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.985]"
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              Resume
              <ArrowUpRight size={15} weight="bold" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-[3px] border border-rule-strong px-5 py-3 text-[15px] font-medium transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-ink active:translate-y-0 active:scale-[0.985]"
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              Email me
            </a>
          </Reveal>
        </div>

        <Reveal delay={180} className="lg:col-span-5">
          <Plate
            number="Fig. 1"
            caption="The shape every system on this page takes. Retrieval and generation stay separate, and a deterministic layer sits between the model and the person reading its output."
          >
            <FigurePipeline />
          </Plate>
        </Reveal>
      </div>
    </section>
  )
}
