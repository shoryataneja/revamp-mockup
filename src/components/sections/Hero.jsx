import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { heroContent } from '@data/hero'
import HangingSign from './hero/HangingSign'

const EASE = [0.16, 1, 0.3, 1]

const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

export default function Hero() {
  const { heading, description, cta } = heroContent

  return (
    <section
      id="hero"
      className="relative flex flex-nowrap min-h-screen w-full overflow-hidden"
      style={{ background: '#F5F0E8' }}
    >
      {/* ── Left panel — copy ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 min-w-0 px-8 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-40 lg:pt-0 lg:pb-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 max-w-lg"
        >
          {/* Heading */}
          <motion.div variants={item} className="flex flex-col gap-1">
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                color: '#1A1A1A',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              {heading[0]}
            </h1>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                color: '#3D2B1F',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              {heading[1]}
            </h1>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                color: '#3D2B1F',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              {heading[2]}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            style={{
              color: '#6B5A45',
              fontSize: '1rem',
              lineHeight: 1.75,
              fontFamily: 'var(--font-body)',
              maxWidth: 420,
            }}
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
            <a
              href={cta.primary.href}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                background: '#1A1A1A',
                color: '#F5F0E8',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
            >
              {cta.primary.label}
              <ArrowRight size={15} />
            </a>
            <a
              href={cta.secondary.href}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                background: 'transparent',
                color: '#1A1A1A',
                border: '1px solid rgba(26,26,26,0.25)',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(26,26,26,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,26,0.25)' }}
            >
              {cta.secondary.label}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Right panel — split Products / Services ── */}
      <div className="hidden lg:flex flex-col w-1/2 shrink-0 min-h-screen">

        {/* Products panel — top half */}
        <motion.a
          href="#/products"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
          className="relative flex flex-col flex-1 group overflow-hidden"
          style={{ background: '#1F150C', borderBottom: '1px solid rgba(65,45,21,0.6)' }}
        >
          {/* Hover tint */}
          <div
            className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ background: 'rgba(65,45,21,0.35)' }}
          />

          {/* Hanging sign — upper centre of panel */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-end pr-12 pt-16 pointer-events-none">
            <HangingSign />
          </div>

          {/* Text — vertically centred */}
          <div className="relative z-10 p-10 flex flex-col justify-center flex-1">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 700,
                color: '#E1DCC9',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              Products
            </h2>
            <p style={{ color: 'rgba(225,220,201,0.55)', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: 280, marginBottom: 16 }}>
              AI-powered software built to scale your business operations.
            </p>
            <span
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
              style={{ color: '#E1DCC9' }}
            >
              Explore products <ArrowRight size={15} />
            </span>
          </div>
        </motion.a>

        {/* Services panel — bottom half */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.45 }}
          className="relative flex flex-col justify-end flex-1 group overflow-hidden"
          style={{ background: '#412D15' }}
        >
          {/* Hover tint */}
          <div
            className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />

          <div className="relative z-10 p-10 flex flex-col justify-center flex-1">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 700,
                color: '#E1DCC9',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              Services
            </h2>
            <p style={{ color: 'rgba(225,220,201,0.55)', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: 280, marginBottom: 16 }}>
              Looking for a tech partner? We'll help you build and succeed with your product.
            </p>
            <span
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
              style={{ color: '#E1DCC9' }}
            >
              Work with us <ArrowRight size={15} />
            </span>
          </div>
        </motion.a>
      </div>

      {/* ── Mobile — Products / Services bottom strip ── */}
      <div className="lg:hidden absolute bottom-0 inset-x-0 flex" style={{ height: 120 }}>
        <a
          href="#/products"
          className="flex-1 flex flex-col justify-center px-6"
          style={{ background: '#1F150C', borderTop: '1px solid rgba(65,45,21,0.6)' }}
        >
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#E1DCC9' }}>Products</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(225,220,201,0.45)', marginTop: 4 }}>Explore →</span>
        </a>
        <div style={{ width: 1, background: 'rgba(65,45,21,0.6)' }} />
        <a
          href="#contact"
          className="flex-1 flex flex-col justify-center px-6"
          style={{ background: '#412D15', borderTop: '1px solid rgba(65,45,21,0.6)' }}
        >
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#E1DCC9' }}>Services</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(225,220,201,0.45)', marginTop: 4 }}>Work with us →</span>
        </a>
      </div>
    </section>
  )
}
