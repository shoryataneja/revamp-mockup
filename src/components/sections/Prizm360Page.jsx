import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Problem from './Problem'
import Workflow from './Workflow'
import Differentiation from './Differentiation'
import UseCases from './UseCases'
import Demo from './Demo'
import Roadmap from './Roadmap'
import Contact from './Contact'

export default function Prizm360Page() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-screen flex-col"
      style={{ background: '#F5F0E8' }}
    >
      {/* Back bar */}
      <div
        className="sticky top-0 z-50 flex items-center px-6 py-4"
        style={{
          background: 'rgba(245,240,232,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #D8D0C4',
        }}
      >
        <a
          href="#hero"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
          style={{ color: '#3D2B1F', fontFamily: 'var(--font-body)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </a>
        <span
          className="ml-auto text-sm font-semibold"
          style={{ color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}
        >
          Prizm360.ai
        </span>
      </div>

      <main className="flex-1">
        <Problem />
        <Workflow />
        <Differentiation />
        <UseCases />
        <Demo />
        <Roadmap />
        <Contact />
      </main>
    </motion.div>
  )
}
