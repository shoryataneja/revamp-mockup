import { useRef, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductCarousel({ products, onOpenPrizm360 }) {
  const row1 = products.slice(0, 3)
  const row2 = products.slice(3)
  const containerRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: -999, y: -999, visible: false })

  function handleMouseMove(e) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }

  function handleMouseLeave() {
    setSpotlight(s => ({ ...s, visible: false }))
  }

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl overflow-hidden"
        style={{ borderRadius: 16 }}
      >
        <div
          style={{
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,43,31,0.07) 0%, transparent 70%)',
            transform: `translate(${spotlight.x - 210}px, ${spotlight.y - 210}px)`,
            opacity: spotlight.visible ? 1 : 0,
            transition: 'opacity 400ms ease',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Row 1 — 3 equal columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid #D8D0C4',
          borderRadius: '16px 16px 0 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {row1.map((product, i) => (
          <div
            key={product.id}
            style={{ borderRight: i < row1.length - 1 ? '1px solid #D8D0C4' : 'none' }}
          >
            <ProductCard product={product} index={i} onOpenPrizm360={onOpenPrizm360} />
          </div>
        ))}
      </div>

      {/* Row 2 — 2 cards centered, each 1/3 width */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            width: `calc(100% / 3 * ${row2.length})`,
            border: '1px solid #D8D0C4',
            borderRadius: '0 0 16px 16px',
          }}
        >
          {row2.map((product, i) => (
            <div
              key={product.id}
              style={{
                flex: 1,
                borderRight: i < row2.length - 1 ? '1px solid #D8D0C4' : 'none',
              }}
            >
              <ProductCard product={product} index={row1.length + i} onOpenPrizm360={onOpenPrizm360} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
