import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import ContactForm from './contact/ContactForm'
import ContactInfo from './contact/ContactInfo'
import { contactHeading } from '@data/contact'

const EASE = [0.16, 1, 0.3, 1]

export default function Contact() {
  return (
    <SectionWrapper id="contact" wrapperClassName="overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="relative z-10 flex flex-col gap-14">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
            {contactHeading.eyebrow}
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {contactHeading.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#6B5A45', lineHeight: 1.7, maxWidth: 520 }}>
            {contactHeading.subtitle}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">

          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative rounded-2xl p-6 sm:p-8"
            style={{
              background: '#FFFFFF',
              border: '1px solid #D8D0C4',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, transparent, #C8BFB2, transparent)' }}
            />

            <div className="mb-7 flex flex-col gap-1">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: '#1A1A1A' }}>
                Send us a message
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#8A7D6E' }}>
                Fill in the form and we'll be in touch within one business day.
              </p>
            </div>

            <ContactForm />
          </motion.div>

          {/* Right: Company info */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
