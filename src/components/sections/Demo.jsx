import { motion } from 'framer-motion'
import { Timer } from 'lucide-react'
import SectionWrapper from '@ui/SectionWrapper'
import { demoHeading, benchmark } from '@data/demo'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Demo() {
  return (
    <SectionWrapper id="demo" wrapperClassName="overflow-hidden" style={{ background: '#F5F0E8' }}>
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
            {demoHeading.title}
          </motion.h2>
          {demoHeading.subtitle && (
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
            >
              {demoHeading.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Stopwatch benchmark panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto w-full max-w-2xl"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid #D8D0C4',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b"
              style={{ borderColor: '#E4DDD2' }}
            >
              <div className="flex items-center gap-2.5">
                <Timer size={16} style={{ color: '#3D2B1F' }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}
                >
                  Stopwatch Test
                </span>
              </div>
              <span className="text-xs" style={{ color: '#8A7D6E', fontFamily: 'var(--font-body)' }}>
                Lead → Action
              </span>
            </div>

            {/* Benchmark rows */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col"
            >
              {benchmark.map(({ event, latency, state }, i) => (
                <motion.div
                  key={event}
                  variants={fadeUp}
                  className="flex items-center gap-4 px-4 py-3 sm:px-6 sm:py-4"
                  style={{
                    background: i % 2 === 0 ? '#FAFAF8' : 'transparent',
                    borderTop: i !== 0 ? '1px solid #E4DDD2' : 'none',
                  }}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#1A1A1A' }}>
                      {event}
                    </span>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
                      {state}
                    </span>
                  </div>
                  <span
                    className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums"
                    style={{
                      background: '#EDE8DF',
                      border: '1px solid #D8D0C4',
                      color: '#3D2B1F',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {latency}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
