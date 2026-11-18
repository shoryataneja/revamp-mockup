import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

const EASE = [0.16, 1, 0.3, 1]

export default function FullWidthCard({ product, index, onOpenPrizm360 }) {
  const { name, tagline, description, tags } = product
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => window.location.hash = '#contact'}
      className="cursor-pointer w-full"
      style={{
        background: hovered ? '#EDE8DF' : '#F5F0E8',
        transition: 'background 300ms ease',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Left — text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 560 }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight: 600,
          color: '#1A1A1A',
          lineHeight: 1.2,
        }}>
          {name}
        </h3>
        {tagline && (
          <p style={{ fontSize: '0.8rem', color: '#8A7D6E', fontFamily: 'var(--font-body)' }}>
            {tagline}
          </p>
        )}
        <p style={{
          fontSize: '0.9rem',
          color: '#6B5A45',
          lineHeight: 1.7,
          fontFamily: 'var(--font-body)',
          marginTop: 4,
        }}>
          {description}
        </p>
      </div>

      {/* Right — tags + CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
        {tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
            {tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: '#6B5A45',
                  background: hovered ? 'rgba(61,43,31,0.1)' : 'rgba(61,43,31,0.06)',
                  border: '1px solid #D8D0C4',
                  borderRadius: 999,
                  padding: '3px 10px',
                  fontFamily: 'var(--font-body)',
                  transition: 'background 300ms ease',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <motion.span
          animate={{ gap: hovered ? '10px' : '6px' }}
          className="inline-flex items-center text-sm font-semibold"
          style={{
            color: '#1A1A1A',
            background: hovered ? '#1A1A1A' : 'transparent',
            color: hovered ? '#F5F0E8' : '#1A1A1A',
            border: '1px solid #1A1A1A',
            borderRadius: 8,
            padding: '10px 20px',
            fontFamily: 'var(--font-body)',
            transition: 'background 300ms ease, color 300ms ease',
          }}
        >
          Let's build together <ArrowRight size={14} />
        </motion.span>
      </div>
    </motion.div>
  )
}
