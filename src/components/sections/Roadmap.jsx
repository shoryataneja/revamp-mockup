import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import { roadmapHeading, implementationSteps, roadmapPhases } from '@data/roadmap'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

function StatusBadge({ live, status }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={
        live
          ? { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#16A34A' }
          : { background: '#EDE8DF', border: '1px solid #D8D0C4', color: '#6B5A45' }
      }
    >
      {live && <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#16A34A' }} />}
      {status}
    </span>
  )
}

export default function Roadmap() {
  return (
    <SectionWrapper id="roadmap" wrapperClassName="overflow-hidden" style={{ background: '#EDE8DF' }}>
      <div className="relative z-10 flex flex-col gap-16">

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
            {roadmapHeading.title}
          </motion.h2>
          {roadmapHeading.subtitle && (
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
            >
              {roadmapHeading.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Implementation steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {implementationSteps.map(({ step, title, description }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="flex flex-col gap-2 rounded-2xl p-5"
              style={{ background: '#F5F0E8', border: '1px solid #D8D0C4' }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: '#3D2B1F', fontFamily: 'var(--font-heading)' }}
              >
                {step}
              </span>
              <h3
                className="text-base font-semibold"
                style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}
              >
                {title}
              </h3>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', lineHeight: 1.6 }}>
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap phases */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto flex w-full max-w-3xl flex-col gap-4"
        >
          {roadmapPhases.map(({ id, phase, capability, status, live }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{
                background: live ? 'rgba(52,211,153,0.05)' : '#F5F0E8',
                border: live ? '1px solid rgba(52,211,153,0.25)' : '1px solid #D8D0C4',
              }}
            >
              <div className="flex flex-col gap-1">
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-body)', color: '#8A7D6E' }}
                >
                  {phase}
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}
                >
                  {capability}
                </h3>
              </div>
              <StatusBadge live={live} status={status} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
