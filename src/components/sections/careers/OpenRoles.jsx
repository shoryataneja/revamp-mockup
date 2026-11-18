import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { openRoles } from '@data/careers'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

const ROLE_TYPES = ['All', 'Full Time Employee', 'Direct Consultant', 'Intern']

function FilterDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-150"
        style={{
          border: `1.5px solid ${open ? '#3D2B1F' : '#D8D0C4'}`,
          color: '#1A1A1A',
          background: '#F5F0E8',
          minWidth: 180,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span className="flex-1 text-left">{value === 'All' ? 'Role Type' : value}</span>
        <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms', color: '#6B5A45' }} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 z-50 rounded-2xl overflow-hidden py-2 min-w-[200px]"
          style={{
            background: '#F5F0E8',
            border: '1px solid #D8D0C4',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          {ROLE_TYPES.map(type => (
            <button
              key={type}
              onClick={() => { onChange(type); setOpen(false) }}
              className="w-full px-5 py-3 text-left text-sm transition-colors duration-100"
              style={{
                background: value === type ? 'rgba(61,43,31,0.08)' : 'transparent',
                color: value === type ? '#3D2B1F' : '#1A1A1A',
                fontWeight: value === type ? 600 : 400,
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { if (value !== type) e.currentTarget.style.background = '#EDE8DF' }}
              onMouseLeave={e => { if (value !== type) e.currentTarget.style.background = 'transparent' }}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function JobCard({ job, onOpen }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
      style={{
        background: '#FFFFFF',
        border: '1px solid #D8D0C4',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex flex-col gap-2">
        <h3
          className="font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A', fontSize: '1.0625rem' }}
        >
          {job.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: '#6B5A45' }}>
          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
          <span style={{ color: '#D8D0C4' }}>|</span>
          <span>{job.type}</span>
          <span style={{ color: '#D8D0C4' }}>|</span>
          <span>{job.department}</span>
        </div>
      </div>

      <button
        onClick={() => onOpen(job)}
        className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{
          background: '#1A1A1A',
          color: '#F5F0E8',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
      >
        Apply Now <ArrowRight size={14} />
      </button>
    </motion.div>
  )
}

export default function OpenRoles({ onOpen }) {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? openRoles : openRoles.filter(j => j.type === filter)

  return (
    <div id="open-roles" className="flex flex-col gap-10" style={{ scrollMarginTop: '100px' }}>
      <div className="flex items-center">
        <div style={{ flex: '1' }} />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center shrink-0"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
        >
          Open <span style={{ color: '#3D2B1F' }}>Roles</span>
        </motion.h2>
        <div className="flex justify-end" style={{ flex: '1' }}>
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-4"
        >
          {filtered.map(job => (
            <JobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </motion.div>
      ) : (
        <div className="py-16 text-center" style={{ color: '#6B5A45', fontFamily: 'var(--font-body)' }}>
          No open roles for this filter right now. Check back soon.
        </div>
      )}
    </div>
  )
}
