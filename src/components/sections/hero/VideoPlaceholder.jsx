import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '@lib/assets'
import { LOGO_ON_DARK } from '@lib/brandAssets'
import VideoLoader from './VideoLoader'

const VIDEO_SRC = ASSETS.heroVideo

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* ── Icons ── */
function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  )
}
function IconPause() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}
function IconBack() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" />
    </svg>
  )
}
function IconForward() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" />
    </svg>
  )
}
function IconMuted() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
function IconUnmuted() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

export default function VideoPlaceholder() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [status, setStatus] = useState('loading')
  const revealedRef = useRef(false)

  // Reveal the video only once the browser can play it through without stalling.
  const reveal = useCallback(() => {
    const v = videoRef.current
    if (!v || revealedRef.current) return

    revealedRef.current = true
    if (v.currentTime > 0.5) v.currentTime = 0
    setStatus('ready')

    v.play()
      .then(() => {
        setPlaying(true)
        setShowOverlay(false)
      })
      .catch(() => {
        setPlaying(false)
        setShowOverlay(true)
      })
  }, [])

  // Never let a dead network keep the loader on screen forever.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!revealedRef.current) reveal()
    }, 20000)

    return () => window.clearTimeout(id)
  }, [reveal])

  // Autoplay muted, but defer until the video is in view and the browser is idle
  // so the download/decoding never competes with the initial paint (LCP).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    let cancelled = false
    let idleId = null
    let observer = null

    const attemptPlay = () => {
      if (cancelled) return
      v.muted = true
      v.preload = 'auto'
      // Starts buffering (and playback, hidden behind the loader) so the
      // browser can reach canplaythrough; the video is only revealed there.
      v.play().catch(() => {})
    }

    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(attemptPlay, { timeout: 2000 })
      } else {
        idleId = window.setTimeout(attemptPlay, 200)
      }
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            observer?.disconnect()
            observer = null
            schedule()
          }
        },
        { rootMargin: '200px 0px' }
      )
      observer.observe(v)
    } else {
      schedule()
    }

    return () => {
      cancelled = true
      observer?.disconnect()
      if (idleId != null) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
        else clearTimeout(idleId)
      }
    }
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
        .then(() => {
          revealedRef.current = true
          setStatus('ready')
          setPlaying(true)
          setShowOverlay(false)
        })
        .catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function handleError() {
    setStatus('error')
    setShowOverlay(true)
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  function skip(sec) {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.min(Math.max(0, v.currentTime + sec), v.duration || 0)
  }

  function handleTimeUpdate() {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
  }

  function handleSeek(e) {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  function handleEnded() {
    setPlaying(false)
    setShowOverlay(true)
  }

  const controlBtn = 'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150'
  const controlStyle = {
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(255,255,255,0.1)',
  }
  const controlHover = {
    background: 'rgba(26,109,232,0.3)',
    borderColor: 'rgba(74,144,240,0.5)',
    color: '#ffffff',
  }

  return (
    <div className="relative w-full max-w-[560px]">
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(26,109,232,0.4) 0%, rgba(74,144,240,0.1) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Video container */}
      <div
        className="relative aspect-video w-full rounded-2xl overflow-hidden"
        style={{
          background: '#0D0D12',
          border: '1px solid rgba(45,45,66,0.8)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(26,109,232,0.12)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: status === 'ready' ? 1 : 0 }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={e => setDuration(e.target.duration)}
          onCanPlayThrough={reveal}
          onEnded={handleEnded}
          onError={handleError}
          preload="metadata"
          muted
          playsInline
          loop={false}
        />

        {/* Logo watermark */}
        <div
          className="absolute top-3 left-3 flex items-center rounded-full px-3 py-2"
          style={{
            background: 'rgba(6,6,10,0.55)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            opacity: status !== 'ready' ? 0 : hovered || !playing ? 1 : 0.55,
            transition: 'opacity 0.25s',
          }}
        >
          <img src={LOGO_ON_DARK} alt="Popular Digital AI" className="h-6 w-auto" loading="lazy" decoding="async" />
        </div>

        {/* Initial play overlay */}
        {showOverlay && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 cursor-pointer"
            style={{ background: 'rgba(6,6,10,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={togglePlay}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: 'linear-gradient(135deg, #1A6DE8, #4A90F0)',
                boxShadow: '0 0 32px rgba(26,109,232,0.5)',
              }}
            >
              <IconPlay />
            </motion.div>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)' }}>
              Click to play
            </span>
          </div>
        )}

        {/* Controls bar — visible on hover or when paused */}
        <motion.div
          animate={{ opacity: status === 'ready' && (hovered || !playing) ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 inset-x-0 px-4 pb-3 pt-8"
          style={{
            background: 'linear-gradient(to top, rgba(6,6,10,0.9) 0%, transparent 100%)',
            pointerEvents: status === 'ready' && (hovered || !playing) ? 'auto' : 'none',
          }}
        >
          {/* Progress bar */}
          <div
            className="relative mb-3 cursor-pointer group/seek"
            style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }}
            onClick={handleSeek}
          >
            <div
              style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #1A6DE8, #4A90F0)',
                borderRadius: 99,
                transition: 'width 0.1s linear',
              }}
            />
            {/* Scrubber thumb */}
            <div
              style={{
                position: 'absolute', top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: 12, height: 12,
                borderRadius: '50%',
                background: '#4A90F0',
                boxShadow: '0 0 8px rgba(74,144,240,0.7)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2">
            {/* Skip back */}
            <button
              onClick={() => skip(-10)}
              className={controlBtn}
              style={controlStyle}
              title="-10s"
              onMouseEnter={e => Object.assign(e.currentTarget.style, controlHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, controlStyle)}
            >
              <IconBack />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #1A6DE8, #4A90F0)',
                color: '#ffffff',
                boxShadow: '0 0 12px rgba(26,109,232,0.4)',
              }}
              title={playing ? 'Pause' : 'Play'}
            >
              {playing ? <IconPause /> : <IconPlay />}
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(10)}
              className={controlBtn}
              style={controlStyle}
              title="+10s"
              onMouseEnter={e => Object.assign(e.currentTarget.style, controlHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, controlStyle)}
            >
              <IconForward />
            </button>

            {/* Time */}
            <span
              className="text-xs tabular-nums ml-1"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-heading)' }}
            >
              {fmt(currentTime)} / {fmt(duration)}
            </span>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className={controlBtn}
              style={controlStyle}
              title={muted ? 'Unmute' : 'Mute'}
              onMouseEnter={e => Object.assign(e.currentTarget.style, controlHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, controlStyle)}
            >
              {muted ? <IconMuted /> : <IconUnmuted />}
            </button>
          </div>
        </motion.div>

        {/* Muted badge — shown while muted and playing */}
        {muted && playing && !showOverlay && status === 'ready' && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={toggleMute}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(74,144,240,0.35)',
              color: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <IconMuted /> Tap to unmute
          </motion.button>
        )}

        {/* Brand loader — shown until the video can play through */}
        <AnimatePresence>
          {(status === 'loading' || status === 'error') && <VideoLoader key="loader" />}
        </AnimatePresence>
      </div>
    </div>
  )
}
