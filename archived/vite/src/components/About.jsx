import Reveal from './Reveal'
import portrait from '../assets/portrait.jpeg'
import { education } from '../data/content'

export default function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 border-t border-rule pt-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <figure>
            <div className="max-w-[300px] border border-rule-strong bg-surface p-1.5">
              <img
                src={portrait}
                alt="Sankalp Shankar"
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
                className="w-full grayscale-[0.85] contrast-[1.05]"
              />
            </div>
            <figcaption className="mt-3 max-w-[300px] font-mono text-[11px] leading-relaxed text-graphite">
              Sankalp Shankar. Bangalore.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <h2 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Still a student. Already shipping.
          </h2>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-[1.6]">
            I am in the AI and ML program at Acharya Institute of Technology, and most of what I
            know came from building things that had to work in front of someone. Retrieval that
            returns the right passage. A gateway that survives a provider outage. An API a frontend
            can actually consume.
          </p>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.65] text-graphite">
            The part I like least is the part I have gotten best at: deciding what the model is not
            allowed to do. Every project on this page has a deterministic layer between the
            generation and the person reading it, because that is the difference between a demo and
            something you can put in a hospital, a scanner, or a newsroom.
          </p>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.65] text-graphite">
            Outside the code, I run events. Tech Habba took a year of logistics, sponsorship and
            budget across a 3-day festival, and The Big O keeps me teaching juniors, which is still
            the fastest way I have found to learn something properly.
          </p>

          <dl className="mt-10 grid max-w-[54ch] gap-x-10 border-t border-rule sm:grid-cols-2">
            <div className="rule-b py-4">
              <dt className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
                Degree
              </dt>
              <dd className="mt-1.5 text-[15px]">{education.degree}</dd>
            </div>
            <div className="rule-b py-4 sm:border-t sm:border-rule">
              <dt className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
                Institution
              </dt>
              <dd className="mt-1.5 text-[15px]">{education.school}</dd>
            </div>
            <div className="rule-b py-4">
              <dt className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
                Standing
              </dt>
              <dd className="mt-1.5 text-[15px]">{education.grade}</dd>
            </div>
            <div className="rule-b py-4">
              <dt className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
                Graduating
              </dt>
              <dd className="mt-1.5 text-[15px]">{education.graduation}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
