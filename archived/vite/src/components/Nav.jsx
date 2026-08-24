import { useEffect, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { nav, profile } from '../data/content'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-paper"
      >
        Skip to work
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 h-16 transition-colors duration-200 ${
          lifted ? 'border-b border-rule bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
      >
        <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-baseline gap-2.5">
            <span className="text-[15px] font-semibold tracking-[-0.02em]">{profile.name}</span>
            <span className="hidden font-mono text-[11px] text-graphite sm:inline">
              {profile.role}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] text-graphite transition-colors duration-150 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-[3px] border border-ink px-3.5 py-1.5 text-[13px] font-medium text-ink transition-[transform,background-color,color] duration-200 hover:bg-ink hover:text-paper active:scale-[0.98]"
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              Resume
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            {open ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 bg-paper pt-16 md:hidden">
          <nav className="flex flex-col px-5" aria-label="Sections">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rule-b py-5 text-2xl tracking-[-0.02em]"
                style={{
                  animation: `plate-in 240ms var(--ease-out-expo) both`,
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="rounded-[3px] bg-ink px-4 py-3.5 text-center text-[15px] font-medium text-paper"
              >
                Resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-[3px] border border-rule-strong px-4 py-3.5 text-center text-[15px] font-medium"
              >
                Email me
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
