import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import VideoPlaceholder from './hero/VideoPlaceholder'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Problem() {
  return (
    <SectionWrapper id="problem" wrapperClassName="overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-5"
        >
          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            Your CRM knows a lead arrived. Why is your team still the one that has to act?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75 }}
          >
            Every new lead creates another manual chain: noticing, calling, chasing, and updating.
            Prizm360.ai automates the repeatable layer so your next action doesn&apos;t depend on manual memory.
          </motion.p>
        </motion.div>

        {/* Right: video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center justify-center"
        >
          <VideoPlaceholder />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
