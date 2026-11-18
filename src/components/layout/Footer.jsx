import { motion } from 'framer-motion'
import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@data/siteConfig'
import { products } from '@data/products'
import { LOGO_ON_DARK } from '@lib/brandAssets'

const EASE = [0.16, 1, 0.3, 1]

const quickLinks = [
  { label: 'Home',     href: '#hero'     },
  { label: 'Products', href: '#products' },
  { label: 'Careers',  href: '#careers'  },
  { label: 'Contact',  href: '#contact'  },
]

const socialLinks = [
  { icon: FiLinkedin,  href: siteConfig.social.linkedin,  label: 'LinkedIn'  },
  { icon: FiInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
]

const contactDetails = [
  { icon: MapPin, lines: [siteConfig.address.line1, siteConfig.address.line2, siteConfig.address.line3], href: siteConfig.address.mapsUrl },
  { icon: Mail,   lines: [siteConfig.email],  href: `mailto:${siteConfig.email}` },
  { icon: Phone,  lines: [siteConfig.phone],  href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
]

function ColHeading({ children }) {
  return (
    <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E', marginBottom: 20 }}>
      {children}
    </h4>
  )
}

function FooterLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group inline-flex items-center gap-1 text-sm transition-all duration-200"
      style={{ color: '#8A7D6E', fontFamily: 'var(--font-body)' }}
      onMouseEnter={e => { e.currentTarget.style.color = '#E1DCC9' }}
      onMouseLeave={e => { e.currentTarget.style.color = '#8A7D6E' }}
    >
      {children}
      {external && <ArrowUpRight size={11} className="opacity-0 transition-all duration-200 group-hover:opacity-100" />}
    </a>
  )
}

function SocialBtn({ icon: Icon, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
      style={{ background: 'rgba(225,220,201,0.06)', border: '1px solid rgba(225,220,201,0.12)', color: '#8A7D6E' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(225,220,201,0.12)'
        e.currentTarget.style.borderColor = 'rgba(225,220,201,0.3)'
        e.currentTarget.style.color = '#E1DCC9'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(225,220,201,0.06)'
        e.currentTarget.style.borderColor = 'rgba(225,220,201,0.12)'
        e.currentTarget.style.color = '#8A7D6E'
      }}
    >
      <Icon size={15} />
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: '#1F150C' }}>

      {/* Top border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(225,220,201,0.15) 30%, rgba(225,220,201,0.15) 70%, transparent)' }} />

      <div className="container-site pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr]"
        >
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <a href="#hero" className="inline-flex items-center self-start">
              <img
                src={LOGO_ON_DARK}
                alt="Popular Digital AI"
                className="h-10 w-auto"
                loading="lazy"
                decoding="async"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </a>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#8A7D6E', lineHeight: 1.7, maxWidth: 260 }}>
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(s => <SocialBtn key={s.label} {...s} />)}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}><FooterLink href={href}>{label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <ColHeading>Products</ColHeading>
            <ul className="flex flex-col gap-3">
              {products.map(({ id, name, href }) => (
                <li key={id}><FooterLink href={href}>{name}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <ColHeading>Contact</ColHeading>
            <ul className="flex flex-col gap-4">
              {contactDetails.map(({ icon: Icon, lines, href }) => (
                <li key={lines[0]}>
                  <a
                    href={href}
                    className="flex items-start gap-3 transition-opacity duration-200 hover:opacity-80"
                    {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                      style={{ background: 'rgba(225,220,201,0.08)', border: '1px solid rgba(225,220,201,0.12)' }}
                    >
                      <Icon size={12} style={{ color: '#8A7D6E' }} strokeWidth={2} />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {lines.map((line, i) => (
                        <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: i === 0 ? '#C4BDA8' : '#8A7D6E', lineHeight: 1.5 }}>
                          {line}
                        </span>
                      ))}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="container-site pb-8">
        <div style={{ height: 1, background: 'rgba(225,220,201,0.08)', marginBottom: 24 }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(225,220,201,0.25)' }}>
          © {new Date().getFullYear()} Popular Digital AI Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
