import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@data/navigation'
import { LOGO_ON_LIGHT } from '@lib/brandAssets'

const EASE = [0.16, 1, 0.3, 1]

function HamburgerIcon({ isOpen }) {
  return (
    <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-px w-5 origin-center rounded-full"
        style={{ background: '#1A1A1A' }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-5 origin-center rounded-full"
        style={{ background: '#1A1A1A' }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-px w-5 origin-center rounded-full"
        style={{ background: '#1A1A1A' }}
      />
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className="absolute inset-0"
          style={{
            background: '#F5F0E8',
          }}
        />

        <nav className="relative flex items-center justify-between px-8 sm:px-12 lg:px-16 py-5">
          {/* Logo */}
          <a href="#hero" onClick={closeMenu} className="relative z-10 flex items-center gap-2.5 shrink-0">
            <img
              src={LOGO_ON_LIGHT}
              alt="Popular Digital AI"
              className="h-8 w-auto"
              decoding="async"
              fetchPriority="high"
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling?.style.setProperty('display', 'flex')
              }}
            />
            <span
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32, height: 32,
                borderRadius: 8,
                background: '#1A1A1A',
                color: '#F5F0E8',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              PD
            </span>
          </a>

          {/* Desktop nav links — centred */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 mx-auto">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative text-sm font-medium group whitespace-nowrap"
                  style={{ color: 'rgba(26,26,26,0.5)', transition: 'color 200ms', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#1A1A1A' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.5)' }}
                >
                  {label}
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250 rounded-full"
                    style={{ background: '#1A1A1A' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              className="text-sm font-semibold rounded-lg px-4 py-2 transition-all duration-200 whitespace-nowrap"
              style={{
                background: '#1A1A1A',
                color: '#F5F0E8',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
            >
              Work with us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-10 md:hidden p-2 rounded-md"
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <HamburgerIcon isOpen={isOpen} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: '#F5F0E8' }}
          >
            <div className="flex flex-1 flex-col justify-center px-8 py-8 overflow-y-auto">
              <img
                src={LOGO_ON_LIGHT}
                alt="Popular Digital AI"
                className="mb-10 h-8 w-auto"
                loading="lazy"
                decoding="async"
              />

              <ul className="flex flex-col">
                {navLinks.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.05 + i * 0.06 }}
                  >
                    <a
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-5 border-b"
                      style={{ borderColor: '#D8D0C4' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.75rem',
                          fontWeight: 600,
                          color: '#1A1A1A',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {label}
                      </span>
                      <span style={{ color: '#8A7D6E', fontSize: '1.1rem' }}>↗</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.4 }}
                className="mt-8 flex items-center justify-center rounded-lg py-4 text-base font-semibold"
                style={{ background: '#1A1A1A', color: '#F5F0E8', fontFamily: 'var(--font-body)' }}
              >
                Work with us
              </motion.a>
            </div>

            <div className="px-8 pb-8">
              <p style={{ fontSize: '0.75rem', color: 'rgba(26,26,26,0.3)' }}>
                © {new Date().getFullYear()} Popular Digital AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
