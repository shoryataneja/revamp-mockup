import { motion } from 'framer-motion'
import ProductCarousel from './products/ProductCarousel'
import { products, productsHeading } from '@data/products'

const EASE = [0.16, 1, 0.3, 1]

export default function Products({ onOpenPrizm360 }) {
  return (
    <section
      id="products"
      className="relative w-full"
      style={{ background: '#F5F0E8', paddingBlock: 'clamp(5rem, 10vw, 8rem)' }}
    >
      <div className="container-site flex flex-col gap-14">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#8A7D6E',
          }}>
            Our Products
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            {productsHeading.title}
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#6B5A45',
            lineHeight: 1.7,
            maxWidth: 520,
          }}>
            {productsHeading.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <ProductCarousel products={products} onOpenPrizm360={onOpenPrizm360} />

      </div>
    </section>
  )
}
