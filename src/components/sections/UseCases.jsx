import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@ui/SectionWrapper'
import { useCasesHeading, useCases } from '@data/useCases'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function UseCases() {
  return (
    <SectionWrapper id="use-cases" wrapperClassName="overflow-hidden" style={{ background: '#EDE8DF' }}>
      <div className="relative z-10 flex flex-col gap-14">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-4 text-center"
        >
          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
          >
            {useCasesHeading.title}
          </motion.h2>
          {useCasesHeading.subtitle && (
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
            >
              {useCasesHeading.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Use-case grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {useCases.map(({ id, icon: Icon, title, description }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="group flex flex-col gap-4 rounded-2xl p-6"
              style={{ background: '#F5F0E8', border: '1px solid #D8D0C4' }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: '#3D2B1F' }}
              >
                <Icon size={20} color="#F5F0E8" />
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}
              >
                {title}
              </h3>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', lineHeight: 1.6 }}>
                {description}
              </p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-center gap-4 rounded-2xl p-6"
            style={{ background: '#1F150C', border: '1px solid #412D15' }}
          >
            <h3
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-heading)', color: '#E1DCC9' }}
            >
              Ready to automate your workflow?
            </h3>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200"
              style={{ background: '#F5F0E8', color: '#1F150C', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E1DCC9' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F5F0E8' }}
            >
              Automate Your Workflow <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
