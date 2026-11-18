import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@ui/SectionWrapper'
import { careersHero } from '@data/careers'
import CoreValues from './careers/CoreValues'
import Perks from './careers/Perks'
import OpenRoles from './careers/OpenRoles'

const EASE = [0.16, 1, 0.3, 1]

export default function Careers({ onOpenJob }) {
  return (
    <SectionWrapper id="careers" wrapperClassName="overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="relative z-10 flex flex-col gap-24">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
            Careers
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#1A1A1A',
            maxWidth: '14ch',
          }}>
            {careersHero.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.7, maxWidth: 480 }}>
            {careersHero.subtitle}
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('open-roles')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200"
            style={{
              border: '1px solid #D8D0C4',
              color: '#3D2B1F',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#EDE8DF'
              e.currentTarget.style.borderColor = '#C8BFB2'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = '#D8D0C4'
            }}
          >
            View Open Roles <ArrowRight size={15} />
          </button>
        </motion.div>

        <CoreValues />
        <Perks />
        <OpenRoles onOpen={onOpenJob} />
      </div>
    </SectionWrapper>
  )
}
