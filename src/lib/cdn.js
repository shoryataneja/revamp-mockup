const base = (import.meta.env.VITE_CDN_BASE || '').replace(/\/+$/, '')

if (!base) {
  throw new Error('VITE_CDN_BASE is not set — copy .env.example to .env')
}

export const CDN_BASE = base

export function cdn(path) {
  return `${base}/${String(path).replace(/^\/+/, '')}`
}
