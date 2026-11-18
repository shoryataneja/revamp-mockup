import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import GalleryItem from './team/GalleryItem'
import Lightbox from './team/Lightbox'
import { teamItems, cultureItems, workspaceItems, teamTabs, teamGalleryMeta } from '@data/team'

const EASE = [0.16, 1, 0.3, 1]

const tabItems = {
  team:      teamItems,
  culture:   cultureItems,
  workspace: workspaceItems,
}

export default function Team() {
  const [activeTab, setActiveTab] = useState('culture')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const triggerRefs = useRef([])

  const items = tabItems[activeTab]

  const handleTabChange = id => {
    setLightboxIndex(null)
    setActiveTab(id)
  }

  const handleClose = () => {
    const i = lightboxIndex
    setLightboxIndex(null)
    requestAnimationFrame(() => triggerRefs.current[i]?.focus())
  }

  return (
    <SectionWrapper id="team" wrapperClassName="overflow-hidden" style={{ background: '#EDE8DF' }}>
      <div className="relative z-10 flex flex-col gap-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7D6E' }}>
            Our Team
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {teamGalleryMeta.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#6B5A45', lineHeight: 1.7, maxWidth: 520 }}>
            {teamGalleryMeta.intro}
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="flex"
        >
          <div
            className="flex gap-1 rounded-xl p-1"
            style={{ background: 'rgba(61,43,31,0.06)', border: '1px solid #D8D0C4' }}
          >
            {teamTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{
                  color: activeTab === tab.id ? '#1A1A1A' : '#8A7D6E',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: '#F5F0E8', border: '1px solid #D8D0C4' }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="columns-1 sm:columns-2 lg:columns-3"
            style={{ columnGap: '1rem' }}
          >
            {items.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                onOpen={activeTab === 'culture' ? setLightboxIndex : undefined}
                buttonRef={el => (triggerRefs.current[i] = el)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        items={items}
        index={activeTab === 'culture' ? lightboxIndex : null}
        onClose={handleClose}
        onIndexChange={setLightboxIndex}
      />
    </SectionWrapper>
  )
}
