import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Differentiation() {
  return (
    <SectionWrapper
      id="differentiation"
      wrapperClassName="overflow-hidden"
      style={{ background: '#EDE8DF' }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
      >
        <motion.h2
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.15 }}
        >
          AI calling is a feature. The workflow is{' '}
          <span style={{ color: '#3D2B1F' }}>the product</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
        >
          A phone call is easy to compare. We connect that call to your business systems.
          Your CRM records what happened; we help make something happen.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  )
}
