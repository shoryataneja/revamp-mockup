import { useEffect, useState } from 'react'
import RootLayout from '@layout/RootLayout'
import Hero from '@sections/Hero'
import Products from '@sections/Products'
import Contact from '@sections/Contact'
import AboutPage from '@sections/AboutPage'
import ProductsPage from '@sections/ProductsPage'
import ServicesPage from '@sections/ServicesPage'
import { useLenis } from '@hooks/useLenis'
import { usePageViews } from '@hooks/usePageViews'
import { AnimatePresence } from 'framer-motion'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

export default function App() {
  useLenis()
  usePageViews()
  const hash = useHashRoute()

  if (hash === '#/about') {
    return (
      <AnimatePresence mode="wait">
        <AboutPage key="about" />
      </AnimatePresence>
    )
  }

  if (hash === '#/services') {
    return (
      <AnimatePresence mode="wait">
        <ServicesPage key="services" />
      </AnimatePresence>
    )
  }

  if (hash === '#/products') {
    return (
      <AnimatePresence mode="wait">
        <ProductsPage key="products" />
      </AnimatePresence>
    )
  }

  return (
    <RootLayout>
      <Hero />
      <Products onOpenPrizm360={() => { window.location.hash = '#/prizm360' }} />
      <Contact />
    </RootLayout>
  )
}
