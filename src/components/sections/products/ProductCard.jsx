import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

const EASE = [0.16, 1, 0.3, 1]

export default function ProductCard({ product, index, onOpenPrizm360 }) {
  const { id, name, tagline, description, tags, isCTA } = product
  const [hovered, setHovered] = useState(false)
  const DETAIL_PAGES = ['prizm360', 'agentic-ai']

  function handleClick() {
    if (DETAIL_PAGES.includes(id)) onOpenPrizm360?.()
    else window.location.hash = '#contact'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col gap-4 p-8 cursor-pointer h-full relative"
      onClick={handleClick}
      style={{
        background: hovered ? '#EDE8DF' : 'transparent',
        transition: 'background 300ms ease',
      }}
    >
      {/* Name + tagline */}
      <div className="flex flex-col gap-1">
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: '#1A1A1A',
          lineHeight: 1.2,
        }}>
          {name}
        </h3>
        {tagline && (
          <p style={{ fontSize: '0.75rem', color: '#8A7D6E', fontFamily: 'var(--font-body)' }}>
            {tagline}
          </p>
        )}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.875rem',
        color: '#6B5A45',
        lineHeight: 1.7,
        fontFamily: 'var(--font-body)',
        flexGrow: 1,
      }}>
        {description}
      </p>

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
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

      {/* CTA link */}
      <motion.span
        animate={{ gap: hovered ? '10px' : '6px' }}
        className="inline-flex items-center text-sm font-medium"
        style={{
          color: '#3D2B1F',
          textDecoration: 'underline',
          textUnderlineOffset: 4,
          fontFamily: 'var(--font-body)',
        }}
      >
        {isCTA ? 'Get in touch' : 'Learn more'} <ArrowRight size={13} />
      </motion.span>
    </motion.div>
  )
}
