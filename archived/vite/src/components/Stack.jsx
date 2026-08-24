import Reveal from './Reveal'
import { stack } from '../data/content'

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal as="h2" className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
          What I work in
        </Reveal>

        <div className="mt-12 grid border-t border-rule-strong sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((column, i) => (
            <Reveal
              key={column.group}
              delay={i * 60}
              className="rule-b border-rule px-0 py-7 sm:px-6 sm:py-8 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:pb-2"
            >
              <h3 className="text-[13px] font-medium tracking-[-0.01em]">{column.group}</h3>
              <ul className="mt-4 space-y-2">
                {column.items.map((item) => (
                  <li key={item} className="font-mono text-[13px] leading-snug text-graphite">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
