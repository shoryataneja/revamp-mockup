import { useEffect, useRef } from 'react'
import { trackPageView } from '@lib/analytics'

function currentPath() {
  const { hash, pathname } = window.location
  return hash.startsWith('#/') ? hash.slice(1) : pathname
}

export function usePageViews() {
  const lastSent = useRef(null)

  useEffect(() => {
    const send = () => {
      const path = currentPath()
      if (lastSent.current === path) return
      lastSent.current = path
      trackPageView(path)
    }

    send()
    window.addEventListener('hashchange', send)
    return () => window.removeEventListener('hashchange', send)
  }, [])
}
