import { motion } from 'framer-motion'
import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { contactInfo } from '@data/contact'
import { siteConfig } from '@data/siteConfig'

const EASE = [0.16, 1, 0.3, 1]

const socialLinks = [
  { icon: FiLinkedin,  href: siteConfig.social.linkedin,  label: 'LinkedIn'  },
  { icon: FiInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
]

function InfoCard({ item, index }) {
  const { icon: Icon, label, lines, href } = item

  const content = (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: '1px solid #D8D0C4',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#EDE8DF'
        e.currentTarget.style.borderColor = '#C8BFB2'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#FFFFFF'
        e.currentTarget.style.borderColor = '#D8D0C4'
      }}
    >
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: '#EDE8DF', border: '1px solid #D8D0C4' }}
      >
        <Icon size={16} style={{ color: '#3D2B1F' }} strokeWidth={1.75} />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#8A7D6E' }}>
          {label}
        </span>
        {lines.map((line, i) => (
          <span
            key={i}
            className="text-sm leading-snug"
            style={{ color: i === 0 ? '#1A1A1A' : '#6B5A45' }}
          >
            {line}
          </span>
        ))}
      </div>
    </motion.div>
  )

  const isExternal = href?.startsWith('http')

  return href ? (
    <a
      href={href}
      className="block"
      aria-label={label}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE }}
        className="flex flex-col gap-2"
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
          Company Information
        </span>
        <h3
          className="text-xl font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}
        >
          Popular Digital AI
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#6B5A45' }}>
          Building intelligent, reliable, and scalable AI solutions for enterprises worldwide.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {contactInfo.map((item, i) => (
          <InfoCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        className="flex items-center gap-3 pt-1"
      >
        <span className="text-xs" style={{ color: '#8A7D6E' }}>Follow us</span>
        <div className="h-px flex-1" style={{ background: '#D8D0C4' }} />
        <div className="flex items-center gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
              style={{
                background: '#EDE8DF',
                border: '1px solid #D8D0C4',
                color: '#6B5A45',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#3D2B1F'
                e.currentTarget.style.borderColor = '#3D2B1F'
                e.currentTarget.style.color = '#F5F0E8'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#EDE8DF'
                e.currentTarget.style.borderColor = '#D8D0C4'
                e.currentTarget.style.color = '#6B5A45'
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
