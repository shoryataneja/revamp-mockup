import { motion } from 'framer-motion'

export default function HangingSign() {
  return (
    <div className="flex flex-col items-center select-none" style={{ paddingTop: 0 }}>
      {/* Strings row */}
      <div className="flex justify-between" style={{ width: 220, height: 40 }}>
        <svg width="2" height="40" viewBox="0 0 2 40" style={{ overflow: 'visible' }}>
          <line x1="1" y1="0" x2="1" y2="40" stroke="#8A7D68" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
        <svg width="2" height="40" viewBox="0 0 2 40" style={{ overflow: 'visible' }}>
          <line x1="1" y1="0" x2="1" y2="40" stroke="#8A7D68" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      </div>

      {/* Sign board with pendulum swing */}
      <motion.div
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
      >
        <div
          className="relative"
          style={{
            width: 240,
            background: '#E1DCC9',
            border: '3px solid #8A7D68',
            borderRadius: 12,
            padding: '20px 24px 22px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          {/* Inner border */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: 8,
              border: '1.5px solid rgba(138,125,104,0.45)',
              borderRadius: 6,
            }}
          />

          {/* Nail left */}
          <div
            className="absolute rounded-full"
            style={{
              width: 9, height: 9,
              top: 10, left: 28,
              background: 'radial-gradient(circle at 35% 35%, #C4BDA8, #6B5A45)',
              border: '1px solid #412D15',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          />
          {/* Nail right */}
          <div
            className="absolute rounded-full"
            style={{
              width: 9, height: 9,
              top: 10, right: 28,
              background: 'radial-gradient(circle at 35% 35%, #C4BDA8, #6B5A45)',
              border: '1px solid #412D15',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          />

          {/* Text */}
          <div className="relative z-10 flex flex-col items-center gap-0.5 text-center mt-2">
            <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.95rem', color: '#1F150C' }}>
              Yes we're
            </p>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.6rem',
                fontWeight: 900,
                color: '#412D15',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              OPEN
            </p>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.6rem',
                fontWeight: 700,
                color: '#1F150C',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              FOR NEW CLIENTS
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
