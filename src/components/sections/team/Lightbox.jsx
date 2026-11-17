import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const isOpen = index !== null && index >= 0 && index < items.length
  const item = isOpen ? items[index] : null
  const closeRef = useRef(null)
  const [loadedId, setLoadedId] = useState(null)
  const imageLoaded = loadedId === item?.id

  const go = useCallback(
    dir => {
      onIndexChange((index + dir + items.length) % items.length)
    },
    [index, items.length, onIndexChange]
  )

  useEffect(() => {
    if (!isOpen) return

    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }

    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, go, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.caption || 'Photo'} — enlarged`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(5,5,10,0.88)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 sm:right-6 sm:top-6"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFFFFF',
            }}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 sm:left-6"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFFFFF',
              }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 sm:right-6"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFFFFF',
              }}
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Image */}
          <div className="relative z-10 flex max-h-full max-w-full items-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.id}
                src={item.src}
                alt={item.caption}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE }}
                decoding="async"
                onLoad={() => setLoadedId(item.id)}
                className="max-h-[78vh] max-w-[90vw] rounded-xl object-contain"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </AnimatePresence>

            {!imageLoaded && (
              <div
                className="img-skeleton absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
                aria-hidden="true"
                style={{ width: 'min(90vw, 900px)', height: 'min(60vh, 540px)' }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
