import { ArrowUpRight } from '@phosphor-icons/react'
import Reveal from './Reveal'
import { profile, links, interests } from '../data/content'

export default function Contact() {
  return (
    <footer id="contact" className="invert-block relative z-10 px-5 pt-20 pb-10 sm:px-8 lg:pt-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal as="h2" className="max-w-[14ch] text-[2.5rem] leading-[0.97] font-medium tracking-[-0.035em] sm:text-6xl lg:text-[68px] lg:leading-[0.95]">
              Chai and chat?
              <br />
              <span className="text-graphite">I&rsquo;m in.</span>
            </Reveal>
            <Reveal
              as="p"
              delay={70}
              className="mt-7 max-w-[50ch] text-lg leading-[1.55] text-graphite"
            >
              Hiring for ML or full-stack work, or want to argue about retrieval? Write to me. I
              read everything that lands.
            </Reveal>
            <Reveal delay={130} className="mt-9">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-baseline gap-3 text-xl font-medium tracking-[-0.02em] break-all sm:text-2xl"
              >
                <span className="border-b border-current pb-1 transition-[border-color] duration-200 group-hover:border-transparent">
                  {profile.email}
                </span>
              </a>
            </Reveal>
            <Reveal delay={180} className="mt-9">
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[3px] border border-rule-strong px-5 py-3 text-[15px] font-medium transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-current active:translate-y-0 active:scale-[0.985]"
                style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
              >
                Resume
                <ArrowUpRight size={15} weight="bold" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-5 lg:pt-4">
            <h3 className="font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
              Elsewhere
            </h3>
            <ul className="mt-4 border-t border-rule">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-rule py-4 text-[15px] transition-transform duration-200 hover:translate-x-1"
                    style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                  >
                    {link.label}
                    <ArrowUpRight
                      size={15}
                      weight="regular"
                      className="text-graphite transition-colors duration-150 group-hover:text-current"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-mono text-[11px] tracking-[0.04em] text-graphite uppercase">
              Interested in
            </h3>
            <p className="mt-3 max-w-[42ch] font-mono text-[13px] leading-[1.8] text-graphite">
              {interests.join(', ')}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-rule pt-6 font-mono text-[11px] text-graphite sm:flex-row sm:items-center sm:justify-between">
          <span>
            {profile.name}. {profile.location}.
          </span>
          <span>Designed and built by hand.</span>
        </div>
      </div>
    </footer>
  )
}
