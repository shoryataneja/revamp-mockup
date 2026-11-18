import { useState, useEffect } from 'react'
import RootLayout from '@layout/RootLayout'
import Hero from '@sections/Hero'
import Products from '@sections/Products'
import Team from '@sections/Team'
import Careers from '@sections/Careers'
import TrustedBy from '@sections/TrustedBy'
import Contact from '@sections/Contact'
import JobDetailPage from '@sections/careers/JobDetailPage'
import Prizm360Page from '@sections/Prizm360Page'
import ProductsPage from '@sections/ProductsPage'
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
  const [activeJob, setActiveJob] = useState(null)

  if (hash === '#/products') {
    return (
      <AnimatePresence mode="wait">
        <ProductsPage key="products" />
      </AnimatePresence>
    )
  }

  if (hash === '#/prizm360') {
    return (
      <AnimatePresence mode="wait">
        <Prizm360Page />
      </AnimatePresence>
    )
  }

  if (activeJob) {
    return (
      <AnimatePresence mode="wait">
        <JobDetailPage key={activeJob.id} job={activeJob} onClose={() => setActiveJob(null)} />
      </AnimatePresence>
    )
  }

  return (
    <RootLayout>
      <Hero />
      <Products onOpenPrizm360={() => { window.location.hash = '#/prizm360' }} />
      <Team />
      <Careers onOpenJob={setActiveJob} />
      <TrustedBy />
      <Contact />
    </RootLayout>
  )
}
