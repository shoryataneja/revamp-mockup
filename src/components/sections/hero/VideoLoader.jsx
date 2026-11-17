import { motion } from 'framer-motion'
import { LOGO_ON_DARK } from '@lib/brandAssets'

export default function VideoLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-10 flex items-center justify-center"
      style={{ background: '#0D0D12' }}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="absolute pointer-events-none"
          style={{
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, rgba(26,109,232,0.18) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <img
          src={LOGO_ON_DARK}
          alt="Popular Digital AI"
          className="relative h-12 w-auto"
          decoding="async"
          style={{ filter: 'drop-shadow(0 0 12px rgba(74, 144, 240, 0.3))' }}
          onError={e => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement
              .querySelector('[data-logo-fallback]')
              ?.style.setProperty('display', 'flex')
          }}
        />
        <span
          data-logo-fallback
          className="relative hidden h-12 w-12 items-center justify-center rounded-lg text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-accent) 100%)',
            color: 'var(--color-on-primary)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
          }}
        >
          PD
        </span>
      </div>
    </motion.div>
  )
}
