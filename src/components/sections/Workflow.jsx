import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import { workflowHeading, workflowSteps } from '@data/workflow'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Workflow() {
  return (
    <SectionWrapper id="work" wrapperClassName="overflow-hidden" style={{ background: '#F5F0E8' }}>
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
            {workflowHeading.title}
          </motion.h2>
          {workflowHeading.subtitle && (
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
            >
              {workflowHeading.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Step flow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {workflowSteps.map(({ step, title, description }, i) => (
            <motion.div key={step} variants={fadeUp} className="relative flex flex-col gap-3">
              {/* Connector (desktop) */}
              {i < workflowSteps.length - 1 && (
                <div
                  className="absolute top-5 left-[calc(50%+2.5rem)] hidden h-px lg:block"
                  style={{ width: 'calc(100% - 5rem)', background: 'linear-gradient(90deg, #C8BFB2, #EDE8DF)' }}
                />
              )}

              <div
                className="flex flex-col gap-3 rounded-2xl p-5"
                style={{ background: '#EDE8DF', border: '1px solid #D8D0C4' }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    background: '#3D2B1F',
                    color: '#F5F0E8',
                    fontFamily: 'var(--font-heading)',
                  }}
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
