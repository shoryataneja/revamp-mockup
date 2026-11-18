import { motion } from 'framer-motion'
import SmartImage from '@ui/SmartImage'

const EASE = [0.16, 1, 0.3, 1]
const ASPECT_RATIO = { square: '100%', wide: '66.66%', tall: '140%' }

export default function GalleryItem({ item, index, onOpen, buttonRef, placeholder }) {
  const { src, aspect = 'square', caption, objectPosition = 'center', name, role, linkedin } = item

  const content = (
    <div
      className="relative w-full"
      style={placeholder ? { height: 220 } : { paddingBottom: ASPECT_RATIO[aspect] }}
    >
      <div className="absolute inset-0">
        {placeholder ? (
          <div
            className="h-full w-full flex flex-col items-center justify-center gap-2"
            style={{ background: '#E4DDD2' }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8A7D6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#8A7D6E', letterSpacing: '0.06em' }}>
              Professional photos
            </span>
          </div>
        ) : (
          <SmartImage
            src={src}
            alt={caption}
            className="h-full w-full"
            imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            style={{ objectPosition }}
          />
        )}
      </div>

      {/* Name + role overlay — only when the item defines a person and not a placeholder */}
      {name && !placeholder && (
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }}
        >
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}
          >
            {name}
          </span>
          {role && (
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {role}
            </span>
          )}
        </div>
      )}

      {/* Name + role placeholder label */}
      {name && placeholder && (
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4"
          style={{ background: 'linear-gradient(to top, rgba(200,191,178,0.9) 0%, transparent 100%)' }}
        >
          <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)', color: '#3D2B1F' }}>
            {name}
          </span>
          {role && (
            <span className="text-xs" style={{ color: '#6B5A45' }}>{role}</span>
          )}
        </div>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 3) * 0.1 }}
      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
      style={{ border: '1px solid #D8D0C4' }}
    >
      {onOpen ? (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => onOpen(index)}
          className="block w-full cursor-zoom-in"
          aria-label={`View ${caption} enlarged`}
        >
          {content}
        </button>
      ) : linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`${name || caption} on LinkedIn`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  )
}
