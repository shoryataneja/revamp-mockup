import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RootLayout from '@layout/RootLayout'
import Team from '@sections/Team'
import Careers from '@sections/Careers'
import TrustedBy from '@sections/TrustedBy'
import JobDetailPage from '@sections/careers/JobDetailPage'

const EASE = [0.16, 1, 0.3, 1]

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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-center gap-4 text-center"
        style={{ paddingTop: 'clamp(7rem, 14vw, 10rem)', paddingBottom: '2rem', background: '#F5F0E8' }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
          About Us
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#1A1A1A', maxWidth: '18ch' }}>
          The people and mission behind Popular Digital
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.7, maxWidth: 520 }}>
          We're a team of builders, designers, and AI practitioners helping businesses unlock the power of intelligent automation.
        </p>
      </motion.div>

      <Team />
      <TrustedBy />
      <Careers onOpenJob={setActiveJob} />
    </RootLayout>
  )
}
