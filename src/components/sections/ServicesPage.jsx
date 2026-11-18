import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Wrench, Car, CheckCircle } from 'lucide-react'
import RootLayout from '@layout/RootLayout'
import { products } from '@data/products'

const EASE = [0.16, 1, 0.3, 1]

const SERVICES = products.filter(p => ['servicemetrik', 'carmetrik'].includes(p.id))

/* ── Animated visual: stacked floating cards ───────────────────── */
const PILLARS = [
  { label: 'Repair Orders',   value: '2,400+', color: '#3D2B1F', bg: '#E1DCC9' },
  { label: 'Cars Valued',     value: '18,000', color: '#F5F0E8', bg: '#412D15' },
  { label: 'Avg. Turnaround', value: '< 4 hrs', color: '#3D2B1F', bg: '#D8D0C4' },
  { label: 'Workshops Live',  value: '340+',   color: '#F5F0E8', bg: '#1F150C' },
]

const FEATURES = [
  'AI-powered job card automation',
  'Real-time vehicle valuation engine',
  'CRM & DMS integration ready',
  'Custom workflows per business',
  'Live analytics dashboard',
  'Multi-location support',
]

function ServicesVisual() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 480 }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 55% 50%, rgba(61,43,31,0.07) 0%, transparent 70%)',
      }} />

      {/* Central card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="relative z-10 rounded-2xl p-8 flex flex-col gap-6"
        style={{ background: '#FFFFFF', border: '1px solid #D8D0C4', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', width: 320 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: '#1F150C' }}>
            <Wrench size={18} color="#E1DCC9" strokeWidth={1.75} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600, color: '#1A1A1A' }}>Automotive Suite</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#8A7D6E' }}>Popular Digital AI</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E4DDD2' }} />

        {/* Feature checklist */}
        <div className="flex flex-col gap-2.5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <CheckCircle size={14} style={{ color: '#3D2B1F', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#4A3F35' }}>{f}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stat pills — floating around the card */}
      {PILLARS.map((p, i) => {
        const positions = [
          { top: '4%',  left: '58%' },
          { top: '22%', left: '72%' },
          { top: '58%', left: '70%' },
          { top: '76%', left: '52%' },
        ]
        const pos = positions[i]
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.12 }}
            className="absolute rounded-xl px-4 py-2.5 flex flex-col gap-0.5"
            style={{ ...pos, background: p.bg, border: '1px solid rgba(200,191,178,0.3)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 12 }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: p.color }}>{p.value}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: p.color === '#F5F0E8' ? 'rgba(245,240,232,0.65)' : '#8A7D6E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.label}</span>
          </motion.div>
        )
      })}

      {/* Decorative dashed arc */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 600 480" style={{ overflow: 'visible' }}>
        <ellipse cx="310" cy="240" rx="220" ry="180" fill="none" stroke="#D8D0C4" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
        <ellipse cx="310" cy="240" rx="280" ry="230" fill="none" stroke="#D8D0C4" strokeWidth="1" strokeDasharray="3 10" opacity="0.3" />
      </svg>
    </div>
  )
}

/* ── Service card ──────────────────────────────────────────────── */
const SERVICE_ICONS = { servicemetrik: Wrench, carmetrik: Car }

function ServiceCard({ product, index }) {
  const { id, name, tagline, description, tags } = product
  const Icon = SERVICE_ICONS[id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-5 rounded-2xl p-8 cursor-pointer"
      style={{ background: '#FFFFFF', border: '1px solid #D8D0C4', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      onClick={() => { window.location.hash = '#contact' }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: '#1F150C' }}>
          <Icon size={22} color="#E1DCC9" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: '#1A1A1A' }}>{name}</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#8A7D6E' }}>{tagline}</p>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#6B5A45', lineHeight: 1.75 }}>{description}</p>

      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 500, color: '#6B5A45', background: 'rgba(61,43,31,0.06)', border: '1px solid #D8D0C4', borderRadius: 999, padding: '3px 10px', fontFamily: 'var(--font-body)' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: '#3D2B1F', fontFamily: 'var(--font-body)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
        Get in touch <ArrowRight size={13} />
      </span>
    </motion.div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ServicesPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <RootLayout>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {/* ── Hero split ── */}
        <section style={{ background: '#F5F0E8', paddingBlock: 'clamp(4rem, 8vw, 7rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: EASE }}
              className="flex flex-col gap-7 lg:w-[44%] shrink-0"
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
                Our Services
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
                Built for the way<br />automotive businesses<br /><span style={{ color: '#3D2B1F' }}>actually work</span>.
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '42ch' }}>
                Purpose-built software for service centres and used car dealerships — AI-powered, fully customised, and designed to eliminate the manual work that slows your team down.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#services-list"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                  style={{ background: '#1A1A1A', color: '#F5F0E8', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
                >
                  View Services <ArrowRight size={15} />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                  style={{ background: 'transparent', color: '#3D2B1F', border: '1px solid #D8D0C4', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EDE8DF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  Talk to us
                </a>
              </div>
            </motion.div>

            {/* Right: visual */}
            <motion.div
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
              className="lg:flex-1 w-full"
            >
              <ServicesVisual />
            </motion.div>
          </div>
        </section>

        {/* ── Service cards ── */}
        <section id="services-list" style={{ background: '#EDE8DF', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
          <div className="mx-auto max-w-5xl flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
              className="flex flex-col gap-3"
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
                What we offer
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                Two products. One industry. Zero compromise.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.id} product={s} index={i} />
              ))}
            </div>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
              className="flex flex-col items-center gap-4 rounded-2xl p-8 text-center"
              style={{ background: '#1F150C', border: '1px solid #412D15' }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: '#E1DCC9' }}>
                Not sure which one fits?
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(225,220,201,0.6)', maxWidth: '44ch', lineHeight: 1.7 }}>
                Tell us about your business and we'll recommend the right solution — or build something custom.
              </p>
              <a href="#contact"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                style={{ background: '#F5F0E8', color: '#1F150C', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E1DCC9' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F5F0E8' }}
              >
                Get in touch <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </RootLayout>
  )
}
