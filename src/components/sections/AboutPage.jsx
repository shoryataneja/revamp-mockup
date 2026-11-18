import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RootLayout from '@layout/RootLayout'
import { LOGO_ON_LIGHT } from '@lib/brandAssets'
import { products } from '@data/products'
import { clientsByIndustry } from '@data/clients'
import Team from '@sections/Team'
import Careers from '@sections/Careers'
import TrustedBy from '@sections/TrustedBy'
import JobDetailPage from '@sections/careers/JobDetailPage'

const EASE = [0.16, 1, 0.3, 1]

// orbit ring config: radius, speed (deg/s), items, direction
const ring1Items = products.filter(p => !p.isCTA).map(p => p.name)
const ring2Items = clientsByIndustry.flatMap(c => c.companies)

function OrbitalVisual() {
  return (
    <div
      className="hidden md:flex items-center justify-center shrink-0"
      style={{ width: 'clamp(340px, 40vw, 520px)', height: 'clamp(340px, 40vw, 520px)', position: 'relative' }}
    >
      <style>{`
        @keyframes orbit-cw  { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
        @keyframes orbit-ccw { from { transform: rotate(0deg) }   to { transform: rotate(-360deg) } }
        @keyframes counter-cw  { from { transform: rotate(0deg) }   to { transform: rotate(-360deg) } }
        @keyframes counter-ccw { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
      `}</style>

      {/* Ring 1 — products, clockwise, 22s */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'orbit-cw 22s linear infinite',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 520 520" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="260" cy="260" r="155" fill="none" stroke="#D8D0C4" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
        {ring1Items.map((name, i) => {
          const angle = (360 / ring1Items.length) * i
          const rad = (angle * Math.PI) / 180
          const r = 155
          const cx = 260 + r * Math.cos(rad)
          const cy = 260 + r * Math.sin(rad)
          return (
            <div key={name} style={{
              position: 'absolute',
              left: `${(cx / 520) * 100}%`,
              top: `${(cy / 520) * 100}%`,
              transform: 'translate(-50%, -50%)',
              animation: 'counter-cw 22s linear infinite',
            }}>
              <span style={{
                display: 'block',
                background: '#1A1A1A',
                color: '#F5F0E8',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '4px 10px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
              }}>{name}</span>
            </div>
          )
        })}
      </div>

      {/* Ring 2 — clients, counter-clockwise, 30s */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'orbit-ccw 30s linear infinite',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 520 520" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="260" cy="260" r="230" fill="none" stroke="#D8D0C4" strokeWidth="1" strokeDasharray="2 8" />
        </svg>
        {ring2Items.map((name, i) => {
          const angle = (360 / ring2Items.length) * i
          const rad = (angle * Math.PI) / 180
          const r = 230
          const cx = 260 + r * Math.cos(rad)
          const cy = 260 + r * Math.sin(rad)
          return (
            <div key={name} style={{
              position: 'absolute',
              left: `${(cx / 520) * 100}%`,
              top: `${(cy / 520) * 100}%`,
              transform: 'translate(-50%, -50%)',
              animation: 'counter-ccw 30s linear infinite',
            }}>
              <span style={{
                display: 'block',
                background: '#EDE8DF',
                color: '#3D2B1F',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '3px 9px',
                borderRadius: '999px',
                border: '1px solid #D8D0C4',
                whiteSpace: 'nowrap',
              }}>{name}</span>
            </div>
          )
        })}
      </div>

      {/* Center logo */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: 100, height: 100,
        borderRadius: '50%',
        background: '#F5F0E8',
        border: '1px solid #D8D0C4',
        boxShadow: '0 0 0 12px rgba(216,208,196,0.25), 0 0 0 24px rgba(216,208,196,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}>
        <img src={LOGO_ON_LIGHT} alt="Popular Digital AI" style={{ width: '100%', objectFit: 'contain' }} draggable={false} />
      </div>
    </div>
  )
}

export default function AboutPage() {
  const [activeJob, setActiveJob] = useState(null)

  if (activeJob) {
    return (
      <AnimatePresence mode="wait">
        <JobDetailPage key={activeJob.id} job={activeJob} onClose={() => setActiveJob(null)} />
      </AnimatePresence>
    )
  }

  return (
    <RootLayout>
      {/* Hero */}
      <section
        style={{
          background: '#F5F0E8',
          paddingTop: 'clamp(7rem, 14vw, 10rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
          paddingInline: 'clamp(1.5rem, 6vw, 5rem)',
        }}
      >
        <div className="flex items-center justify-between gap-8">
          {/* Left: text */}
          <div className="flex flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#1A1A1A',
                textTransform: 'uppercase',
              }}
            >
              Glad you<br />found us.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-10"
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.7, maxWidth: 420 }}>
                Have an idea? We'd love to hear it. Let's build something intelligent together.
              </p>
              <a
                href="#contact"
                onClick={() => { window.location.hash = ''; setTimeout(() => { window.location.hash = '#contact' }, 0) }}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  background: '#1A1A1A',
                  color: '#F5F0E8',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
              >
                Get in touch ↗
              </a>
            </motion.div>
          </div>

          {/* Right: orbital visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          >
            <OrbitalVisual />
          </motion.div>
        </div>
      </section>

      <Team />
      <TrustedBy />
      <Careers onOpenJob={setActiveJob} />
    </RootLayout>
  )
}
