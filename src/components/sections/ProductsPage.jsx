import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Timer, Users, Zap, Repeat, PhoneCall, BarChart2 } from 'lucide-react'
import RootLayout from '@layout/RootLayout'
import { LOGO_ON_DARK } from '@lib/brandAssets'
import VideoPlaceholder from './hero/VideoPlaceholder'
import { workflowHeading, workflowSteps } from '@data/workflow'
import { demoHeading, benchmark } from '@data/demo'
import { roadmapHeading, implementationSteps, roadmapPhases } from '@data/roadmap'
import { useCasesHeading, useCases } from '@data/useCases'

const EASE = [0.16, 1, 0.3, 1]

const NODES = [
  { label: 'STRATEGY', color1: '#C8A882', color2: '#8B5E3C', color3: '#5C3317', top: '8%'  },
  { label: 'BRAND',    color1: '#C4A35A', color2: '#8B6914', color3: '#5C4200', top: '26%' },
  { label: 'DESIGN',   color1: '#5BAD6F', color2: '#2E7D45', color3: '#1A4D28', top: '44%' },
  { label: 'CODE',     color1: '#7B8FD4', color2: '#3D52A8', color3: '#1E2F6B', top: '62%' },
  { label: 'AI',       color1: '#D46FA8', color2: '#A83070', color3: '#6B1040', top: '80%' },
]

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
  const nodeYs = NODES.map(n => parseFloat(n.top) / 100 * SVG_H)
  return (
    <div className="relative select-none" style={{ width: SVG_W, height: SVG_H, maxWidth: '100%' }}>
      <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="absolute inset-0" style={{ overflow: 'visible' }}>
        {[52, 80, 115, 160].map((r, i) => (
          <circle key={r} cx={HUB_X} cy={HUB_Y} r={r}
            fill={i === 0 ? 'rgba(31,21,12,0.06)' : 'none'}
            stroke="#C8BFB2" strokeWidth={i === 0 ? 0 : 1}
            strokeDasharray={i % 2 === 0 ? '3 7' : '5 5'} opacity={0.45}
          />
        ))}
        {NODES.map((node, i) => (
          <motion.line key={node.label}
            x1={NODE_X + 26} y1={nodeYs[i] + 26} x2={HUB_X} y2={HUB_Y}
            stroke={node.color2} strokeWidth="1.5" strokeOpacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 + i * 0.12 }}
          />
        ))}
        {NODES.map((node, i) => {
          const t = 0.22
          const dotX = (NODE_X + 26) + (HUB_X - (NODE_X + 26)) * t
          const dotY = (nodeYs[i] + 26) + (HUB_Y - (nodeYs[i] + 26)) * t
          return (
            <motion.circle key={`dot-${i}`} cx={dotX} cy={dotY} r={3.5} fill={node.color2}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.12 }}
            />
          )
        })}
        <motion.line x1={HUB_X + 52} y1={HUB_Y} x2={SVG_W - 30} y2={HUB_Y}
          stroke="#C8BFB2" strokeWidth="1.5" strokeDasharray="5 5" strokeOpacity="0.7"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
        />
        <motion.circle cx={HUB_X + 100} cy={HUB_Y} r={3.5} fill="#C8BFB2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        />
      </svg>

      {NODES.map((node, i) => (
        <motion.div key={node.label}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * 0.1 }}
          className="absolute flex items-center gap-3"
          style={{ left: NODE_X - 70, top: nodeYs[i] }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#8A7D6E', textTransform: 'uppercase', width: 64, textAlign: 'right' }}>
            {node.label}
          </span>
          <GlossySphere color1={node.color1} color2={node.color2} color3={node.color3} />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="absolute flex flex-col items-center justify-center rounded-full"
        style={{ width: 96, height: 96, left: HUB_X - 48, top: HUB_Y - 48, background: 'radial-gradient(circle at 38% 35%, #3D2B1F 0%, #1F150C 60%, #0D0804 100%)', boxShadow: '0 0 0 10px rgba(31,21,12,0.07), 0 0 0 22px rgba(31,21,12,0.04), 0 8px 32px rgba(0,0,0,0.3)', zIndex: 10 }}
      >
        <img src={LOGO_ON_DARK} alt="Popular Digital AI" style={{ width: 56, height: 'auto' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.3 }}
        className="absolute flex flex-col items-center gap-2"
        style={{ right: 10, top: HUB_Y - 44, zIndex: 8 }}
      >
        <div className="flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: '#EDE8DF', border: '1px solid #D8D0C4', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A7D6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 700, color: '#8A7D6E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>YOUR BUSINESS</span>
      </motion.div>
    </div>
  )
}

function StatusBadge({ live, status }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={live
        ? { background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#16A34A' }
        : { background: '#EDE8DF', border: '1px solid #D8D0C4', color: '#6B5A45' }}
    >
      {live && <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#16A34A' }} />}
      {status}
    </span>
  )
}

export default function ProductsPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <RootLayout>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <main>

        {/* ── Hero split ── */}
        <section className="w-full overflow-hidden" style={{ background: '#F5F0E8', paddingBlock: 'clamp(4rem, 8vw, 7rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center">
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: EASE }} className="flex flex-col gap-7 lg:w-[44%] shrink-0"
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>Our Products</span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
                Software that works<br />while your team <span style={{ color: '#3D2B1F' }}>focuses</span>.
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '42ch' }}>
                AI-powered products built for automotive and enterprise businesses — each one eliminating a specific bottleneck so your team can focus on what actually matters.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#prizm-content" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                  style={{ background: '#1A1A1A', color: '#F5F0E8', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#3D2B1F' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A' }}
                >
                  Explore Prizm360 <ArrowRight size={15} />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
                  style={{ background: 'transparent', color: '#3D2B1F', border: '1px solid #D8D0C4', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EDE8DF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  Talk to us
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
              className="flex items-center justify-center lg:flex-1 w-full overflow-hidden"
            >
              <ConstellationVisual />
            </motion.div>
          </div>
        </section>

        {/* ── Prizm360 content ── */}
        <div id="prizm-content">

          {/* Problem */}
          <section style={{ background: '#F5F0E8', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE }} className="flex flex-col gap-5"
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>Prizm360.ai</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  Your CRM knows a lead arrived. Why is your team still the one that has to act?
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75 }}>
                  Every new lead creates another manual chain: noticing, calling, chasing, and updating. Prizm360.ai automates the repeatable layer so your next action doesn't depend on manual memory.
                </p>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
                className="flex items-center justify-center"
              >
                <VideoPlaceholder />
              </motion.div>
            </div>
          </section>

          {/* Differentiation */}
          <section style={{ background: '#EDE8DF', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-3xl flex flex-col items-center gap-5 text-center">
              <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.15 }}
              >
                AI calling is a feature. The workflow is <span style={{ color: '#3D2B1F' }}>the product</span>.
              </motion.h2>
              <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
              >
                A phone call is easy to compare. We connect that call to your business systems. Your CRM records what happened; we help make something happen.
              </motion.p>
            </div>
          </section>

          {/* Workflow */}
          <section style={{ background: '#F5F0E8', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-6xl flex flex-col gap-16">
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
                >
                  {workflowHeading.title}
                </motion.h2>
                <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
                >
                  {workflowHeading.subtitle}
                </motion.p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {workflowSteps.map(({ step, title, description }, i) => (
                  <motion.div key={step}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                    className="relative flex flex-col gap-3"
                  >
                    {i < workflowSteps.length - 1 && (
                      <div className="absolute top-5 left-[calc(50%+2.5rem)] hidden h-px lg:block"
                        style={{ width: 'calc(100% - 5rem)', background: 'linear-gradient(90deg, #C8BFB2, #EDE8DF)' }}
                      />
                    )}
                    <div className="flex flex-col gap-3 rounded-2xl p-5" style={{ background: '#EDE8DF', border: '1px solid #D8D0C4' }}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                        style={{ background: '#3D2B1F', color: '#F5F0E8', fontFamily: 'var(--font-heading)' }}
                      >{step}</span>
                      <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}>{title}</h3>
                      <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', lineHeight: 1.6 }}>{description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section style={{ background: '#EDE8DF', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-6xl flex flex-col gap-14">
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
                >{useCasesHeading.title}</motion.h2>
                <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
                >{useCasesHeading.subtitle}</motion.p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map(({ id, icon: Icon, title, description }, i) => (
                  <motion.div key={id}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                    className="flex flex-col gap-4 rounded-2xl p-6" style={{ background: '#F5F0E8', border: '1px solid #D8D0C4' }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: '#3D2B1F' }}>
                      <Icon size={20} color="#F5F0E8" />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}>{title}</h3>
                    <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', lineHeight: 1.6 }}>{description}</p>
                  </motion.div>
                ))}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
                  className="flex flex-col items-start justify-center gap-4 rounded-2xl p-6"
                  style={{ background: '#1F150C', border: '1px solid #412D15' }}
                >
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#E1DCC9' }}>Ready to automate your workflow?</h3>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200"
                    style={{ background: '#F5F0E8', color: '#1F150C', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#E1DCC9' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F5F0E8' }}
                  >
                    Automate Your Workflow <ArrowRight size={16} />
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Demo */}
          <section style={{ background: '#F5F0E8', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-6xl flex flex-col gap-16">
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
                >{demoHeading.title}</motion.h2>
                <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
                >{demoHeading.subtitle}</motion.p>
              </div>
              <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mx-auto w-full max-w-2xl"
              >
                <div className="relative rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #D8D0C4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E4DDD2' }}>
                    <div className="flex items-center gap-2.5">
                      <Timer size={16} style={{ color: '#3D2B1F' }} />
                      <span className="text-sm font-medium" style={{ color: '#1A1A1A', fontFamily: 'var(--font-heading)' }}>Stopwatch Test</span>
                    </div>
                    <span className="text-xs" style={{ color: '#8A7D6E', fontFamily: 'var(--font-body)' }}>Lead → Action</span>
                  </div>
                  {benchmark.map(({ event, latency, state }, i) => (
                    <div key={event} className="flex items-center gap-4 px-6 py-4"
                      style={{ background: i % 2 === 0 ? '#FAFAF8' : 'transparent', borderTop: i !== 0 ? '1px solid #E4DDD2' : 'none' }}
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#1A1A1A' }}>{event}</span>
                        <span className="text-xs" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>{state}</span>
                      </div>
                      <span className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums"
                        style={{ background: '#EDE8DF', border: '1px solid #D8D0C4', color: '#3D2B1F', fontFamily: 'var(--font-heading)' }}
                      >{latency}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Roadmap */}
          <section style={{ background: '#EDE8DF', paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-6xl flex flex-col gap-16">
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em' }}
                >{roadmapHeading.title}</motion.h2>
                <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#6B5A45', lineHeight: 1.75, maxWidth: '56ch' }}
                >{roadmapHeading.subtitle}</motion.p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {implementationSteps.map(({ step, title, description }, i) => (
                  <motion.div key={step}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                    className="flex flex-col gap-2 rounded-2xl p-5" style={{ background: '#F5F0E8', border: '1px solid #D8D0C4' }}
                  >
                    <span className="text-xs font-bold" style={{ color: '#3D2B1F', fontFamily: 'var(--font-heading)' }}>{step}</span>
                    <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}>{title}</h3>
                    <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', lineHeight: 1.6 }}>{description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
                {roadmapPhases.map(({ id, phase, capability, status, live }, i) => (
                  <motion.div key={id}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                    className="flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
                    style={{ background: live ? 'rgba(52,211,153,0.05)' : '#F5F0E8', border: live ? '1px solid rgba(52,211,153,0.25)' : '1px solid #D8D0C4' }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)', color: '#8A7D6E' }}>{phase}</span>
                      <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}>{capability}</h3>
                    </div>
                    <StatusBadge live={live} status={status} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </motion.div>
    </RootLayout>
  )
}
