import { motion } from 'framer-motion'
import SmartImage from '@ui/SmartImage'

const EASE = [0.16, 1, 0.3, 1]
const ASPECT_RATIO = { square: '100%', wide: '66.66%', tall: '140%' }

export default function GalleryItem({ item, index, onOpen, buttonRef }) {
  const { src, aspect = 'square', caption, objectPosition = 'center', name, role, linkedin } = item

  const content = (
    <div className="relative w-full" style={{ paddingBottom: ASPECT_RATIO[aspect] }}>
      <div className="absolute inset-0">
        <SmartImage
          src={src}
          alt={caption}
          className="h-full w-full"
          imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition }}
        />
      </div>

      {/* Name + role overlay — only when the item defines a person */}
      {name && (
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
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 3) * 0.1 }}
      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
      style={{ border: '1px solid rgba(45,45,66,0.6)' }}
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
