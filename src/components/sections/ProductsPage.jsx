import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Zap, Phone } from 'lucide-react'
import { products } from '@data/products'

const EASE = [0.16, 1, 0.3, 1]

/* ── Static constellation visual ──────────────────────────────── */

// 5 nodes on the left, matching the reference image labels
const NODES = [
  { label: 'STRATEGY', color1: '#C8A882', color2: '#8B5E3C', color3: '#5C3317', top: '8%'  },
  { label: 'BRAND',    color1: '#C4A35A', color2: '#8B6914', color3: '#5C4200', top: '26%' },
  { label: 'DESIGN',   color1: '#5BAD6F', color2: '#2E7D45', color3: '#1A4D28', top: '44%' },
  { label: 'CODE',     color1: '#7B8FD4', color2: '#3D52A8', color3: '#1E2F6B', top: '62%' },
  { label: 'AI',       color1: '#D46FA8', color2: '#A83070', color3: '#6B1040', top: '80%' },
]

// Hub center in the SVG coordinate space
const HUB_X = 420
const HUB_Y = 300
const NODE_X = 110
const SVG_W = 640
const SVG_H = 600

function GlossySphere({ color1, color2, color3, size = 52 }) {
  const id = `g-${color1.replace('#', '')}`
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" style={{ display: 'block', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.22))' }}>
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor={color1} stopOpacity="1" />
          <stop offset="55%"  stopColor={color2} stopOpacity="1" />
          <stop offset="100%" stopColor={color3} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`${id}-shine`} cx="35%" cy="28%" r="40%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="26" r="25" fill={`url(#${id})`} />
      <circle cx="26" cy="26" r="25" fill={`url(#${id}-shine)`} />
    </svg>
  )
}

function ConstellationVisual() {
  // Node Y positions in SVG space (matching top % of 600px container)
  const nodeYs = NODES.map(n => parseFloat(n.top) / 100 * SVG_H)

  return (
    <div className="relative select-none" style={{ width: SVG_W, height: SVG_H, maxWidth: '100%' }}>

      {/* SVG layer: rings + lines */}
      <svg
        width={SVG_W} height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        {/* Concentric rings around hub */}
        {[52, 80, 115, 160].map((r, i) => (
          <circle
            key={r}
            cx={HUB_X} cy={HUB_Y} r={r}
            fill={i === 0 ? 'rgba(31,21,12,0.06)' : 'none'}
            stroke="#C8BFB2"
            strokeWidth={i === 0 ? 0 : 1}
            strokeDasharray={i % 2 === 0 ? '3 7' : '5 5'}
            opacity={0.45}
          />
        ))}

        {/* Lines from each node to hub */}
        {NODES.map((node, i) => (
          <motion.line
            key={node.label}
            x1={NODE_X + 26} y1={nodeYs[i] + 26}
            x2={HUB_X} y2={HUB_Y}
            stroke={node.color2}
            strokeWidth="1.5"
            strokeOpacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 + i * 0.12 }}
          />
        ))}

        {/* Small dot on each line near the node */}
        {NODES.map((node, i) => {
          const t = 0.22
          const dx = HUB_X - (NODE_X + 26)
          const dy = HUB_Y - (nodeYs[i] + 26)
          const dotX = (NODE_X + 26) + dx * t
          const dotY = (nodeYs[i] + 26) + dy * t
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={dotX} cy={dotY} r={3.5}
              fill={node.color2}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.12 }}
            />
          )
        })}

        {/* Dashed line from hub to "Your Business" */}
        <motion.line
          x1={HUB_X + 52} y1={HUB_Y}
          x2={SVG_W - 30} y2={HUB_Y}
          stroke="#C8BFB2"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          strokeOpacity="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
        />
        {/* Small dot on that line */}
        <motion.circle
          cx={HUB_X + 100} cy={HUB_Y} r={3.5}
          fill="#C8BFB2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />
      </svg>

      {/* Node spheres + labels */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * 0.1 }}
          className="absolute flex items-center gap-3"
          style={{ left: NODE_X - 70, top: nodeYs[i] }}
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#8A7D6E',
            textTransform: 'uppercase',
            width: 64,
            textAlign: 'right',
          }}>
            {node.label}
          </span>
          <GlossySphere color1={node.color1} color2={node.color2} color3={node.color3} />
        </motion.div>
      ))}

      {/* Central hub */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="absolute flex flex-col items-center justify-center rounded-full"
        style={{
          width: 96, height: 96,
          left: HUB_X - 48, top: HUB_Y - 48,
          background: 'radial-gradient(circle at 38% 35%, #3D2B1F 0%, #1F150C 60%, #0D0804 100%)',
          boxShadow: '0 0 0 10px rgba(31,21,12,0.07), 0 0 0 22px rgba(31,21,12,0.04), 0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#E1DCC9', letterSpacing: '0.04em' }}>PD</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.48rem', color: '#8A7D6E', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>POPULAR DIGITAL</span>
      </motion.div>

      {/* "Your Business" node — right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.3 }}
        className="absolute flex flex-col items-center gap-2"
        style={{ right: 10, top: HUB_Y - 44, zIndex: 8 }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 64, height: 64, background: '#EDE8DF', border: '1px solid #D8D0C4', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A7D6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 700, color: '#8A7D6E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          YOUR BUSINESS
        </span>
      </motion.div>
    </div>
  )
}

/* ── Product listing card ──────────────────────────────────────── */
const SHOWN_PRODUCTS = ['prizm360', 'agentic-ai']
const PRODUCT_ICONS = { prizm360: Zap, 'agentic-ai': Phone }

function ProductRow({ product, index, onNavigate }) {
  const { id, name, tagline, description, tags } = product
  const Icon = PRODUCT_ICONS[id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="flex flex-col gap-4 rounded-2xl p-7 cursor-pointer"
      style={{ background: '#FFFFFF', border: '1px solid #D8D0C4', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      onClick={() => onNavigate(id)}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: '#1F150C' }}>
            <Icon size={20} color="#E1DCC9" strokeWidth={1.75} />
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, color: '#1A1A1A' }}>{name}</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#8A7D6E' }}>{tagline}</p>
        </div>
        <span className="ml-auto shrink-0 flex items-center gap-1.5 text-sm font-medium" style={{ color: '#3D2B1F', fontFamily: 'var(--font-body)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
          Learn more <ArrowRight size={13} />
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#6B5A45', lineHeight: 1.7 }}>{description}</p>
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 500, color: '#6B5A45', background: 'rgba(61,43,31,0.06)', border: '1px solid #D8D0C4', borderRadius: 999, padding: '3px 10px', fontFamily: 'var(--font-body)' }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ProductsPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  function handleNavigate(id) {
    if (id === 'prizm360') window.location.hash = '#/prizm360'
    else window.location.hash = '#contact'
  }

  const listedProducts = products.filter(p => SHOWN_PRODUCTS.includes(p.id))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex min-h-screen flex-col"
      style={{ background: '#F5F0E8' }}
    >
      {/* Back bar */}
      <div
        className="sticky top-0 z-50 flex items-center px-6 py-4"
        style={{ background: 'rgba(245,240,232,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #D8D0C4' }}
      >
        <a href="#hero" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#3D2B1F', fontFamily: 'var(--font-body)' }}>
          <ArrowLeft size={16} /> Back to Home
        </a>
        <span className="ml-auto text-sm font-semibold" style={{ color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}>Our Products</span>
      </div>

      <main className="flex-1">
        {/* ── Hero split ── */}
        <section className="w-full overflow-hidden" style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: EASE }}
              className="flex flex-col gap-7 lg:w-[44%] shrink-0"
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
                Our Products
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
                Software that works<br />
                while your team{' '}
                <span style={{ color: '#3D2B1F' }}>focuses</span>.
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '42ch' }}>
                AI-powered products built for automotive and enterprise businesses — each one eliminating a specific bottleneck so your team can focus on what actually matters.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#products-list"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                  style={{ background: '#1A1A1A', color: '#F5F0E8', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
                >
                  Explore Products <ArrowRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                  style={{ background: 'transparent', color: '#3D2B1F', border: '1px solid #D8D0C4', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EDE8DF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  Talk to us
                </a>
              </div>
            </motion.div>

            {/* Right: constellation */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
              className="flex items-center justify-center lg:flex-1 w-full overflow-hidden"
            >
              <ConstellationVisual />
            </motion.div>
          </div>
        </section>

        {/* ── Product list ── */}
        <section id="products-list" style={{ background: '#EDE8DF', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
          <div className="mx-auto max-w-4xl flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex flex-col gap-3"
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
                All Products
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                Pick the one that fits your problem.
              </h2>
            </motion.div>
            <div className="flex flex-col gap-4">
              {listedProducts.map((product, i) => (
                <ProductRow key={product.id} product={product} index={i} onNavigate={handleNavigate} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  )
}
