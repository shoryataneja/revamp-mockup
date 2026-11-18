import { motion } from 'framer-motion'
import { clientsByIndustry } from '@data/clients'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function TrustedBy() {
  return (
    <section
      id="trusted-by"
      className="relative w-full overflow-hidden"
      style={{ background: '#EDE8DF', paddingBlock: 'clamp(5rem, 10vw, 8rem)' }}
    >
      <div className="relative z-10 flex flex-col gap-12">

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #D8D0C4 30%, #D8D0C4 70%, transparent)' }} />

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-3 text-center px-6"
        >
          <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
            Trusted By
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
          >
            We serve these <span style={{ color: '#3D2B1F' }}>companies</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#6B5A45', maxWidth: 480, lineHeight: 1.7 }}>
            Trusted by businesses across industries to build and deploy intelligent AI solutions.
          </motion.p>
        </motion.div>

        {/* Industry cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="container-site grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {clientsByIndustry.map(({ id, industry, companies }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-2xl p-6"
              style={{ background: '#F5F0E8', border: '1px solid #D8D0C4' }}
            >
              {/* Industry label */}
              <div className="flex items-center gap-3">
                <span
                  className="font-semibold text-sm tracking-wide uppercase"
                  style={{ color: '#3D2B1F', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}
                >
                  {industry}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: '#D8D0C4' }} />

              {/* Company names */}
              <div className="flex flex-col gap-2.5">
                {companies.map(name => (
                  <div key={name} className="flex items-center gap-2.5 text-sm" style={{ color: '#4A3F35', fontFamily: 'var(--font-body)' }}>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#3D2B1F' }} />
                    {name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #D8D0C4 30%, #D8D0C4 70%, transparent)' }} />
      </div>
    </section>
  )
}
