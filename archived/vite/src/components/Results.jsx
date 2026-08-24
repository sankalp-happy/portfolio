import Reveal from './Reveal'
import { results, leadership, certifications, codeStats } from '../data/content'

export default function Results() {
  return (
    <section id="results" className="relative z-10 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal as="header" className="max-w-[62ch]">
          <h2 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Track record</h2>
          <p className="mt-4 text-[17px] leading-[1.55] text-graphite">
            Seven competition wins, and the two things they do not show: how much I run, and how
            much I read.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <table className="w-full border-collapse text-left">
              <caption className="mb-4 text-left font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
                Table 1. Competition results, 2022 to present
              </caption>
              <thead>
                <tr className="border-t border-b border-rule-strong">
                  <th scope="col" className="py-2.5 pr-4 font-mono text-[11px] font-normal tracking-[0.04em] text-graphite uppercase">
                    Result
                  </th>
                  <th scope="col" className="py-2.5 pr-4 font-mono text-[11px] font-normal tracking-[0.04em] text-graphite uppercase">
                    Event
                  </th>
                  <th scope="col" className="hidden py-2.5 font-mono text-[11px] font-normal tracking-[0.04em] text-graphite uppercase sm:table-cell">
                    Entry
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={`${row.result}-${row.event}`} className="rule-b align-baseline">
                    <td className="py-3.5 pr-4 text-[15px] font-medium whitespace-nowrap">
                      {row.result}
                    </td>
                    <td className="py-3.5 pr-4 text-[15px] text-graphite">
                      {row.event}
                      {row.detail ? (
                        <span className="mt-1 block text-[13px] sm:hidden">{row.detail}</span>
                      ) : null}
                    </td>
                    <td className="hidden py-3.5 text-[15px] text-graphite sm:table-cell">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-10">
              <h3 className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
                Competitive programming
              </h3>
              <dl className="mt-3 flex flex-wrap gap-x-10 gap-y-2">
                {codeStats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-2.5">
                    <dt className="text-[15px] text-graphite">{stat.label}</dt>
                    <dd className="font-mono text-[15px] font-medium">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5">
            <h3 className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
              Leadership
            </h3>
            <div className="mt-4">
              {leadership.map((item) => (
                <div key={item.role} className="rule-b py-5 first:border-t first:border-rule">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-[17px] font-medium tracking-[-0.015em]">{item.role}</h4>
                    <span className="font-mono text-[11px] text-graphite">{item.period}</span>
                  </div>
                  <p className="mt-2 max-w-[52ch] text-[14.5px] leading-[1.6] text-graphite">
                    {item.line}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
              Certifications
            </h3>
            <div className="mt-4">
              {certifications.map((item) => (
                <div key={item.name} className="rule-b py-5 first:border-t first:border-rule">
                  <h4 className="text-[15px] font-medium">{item.name}</h4>
                  <p className="mt-1.5 text-[14px] text-graphite">
                    {item.issuer}. {item.detail}.
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
