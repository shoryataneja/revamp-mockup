import { motion } from 'framer-motion'
import { perks } from '@data/careers'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

function PerkCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-5 rounded-2xl p-6"
      style={{
        background: '#EDE8DF',
        border: '1px solid #D8D0C4',
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: '#3D2B1F' }}
      >
        <Icon size={18} color="#F5F0E8" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-2">
        <h4
          className="font-semibold leading-snug"
          style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A', fontSize: '1.0625rem' }}
        >
          {title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: '#6B5A45' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Perks() {
  return (
    <div className="flex flex-col gap-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col items-center gap-3 text-center"
      >
        <motion.h2
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
        >
          More reasons to love{' '}
          <span style={{ color: '#3D2B1F' }}>Popular Digital AI</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {perks.map(p => (
          <PerkCard key={p.title} {...p} />
        ))}
      </motion.div>
    </div>
  )
}
