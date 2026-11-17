export function trackPageView(path) {
  if (typeof window.gtag !== 'function') return

  window.gtag('event', 'page_view', {
    page_location: window.location.origin + path,
    page_title: document.title,
  })
}
