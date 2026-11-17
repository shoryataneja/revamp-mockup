import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@utils/cn'

export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  style,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) {
  const imgRef = useRef(null)
  const [status, setStatus] = useState('loading')

  // A cached image can finish before React attaches onLoad, which would leave
  // the skeleton on screen forever — check the element directly instead.
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    if (img.complete) {
      setStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
    } else {
      setStatus('loading')
    }
  }, [src])

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      aria-busy={status === 'loading'}
    >
      <div
        className="img-skeleton absolute inset-0"
        data-visible={status === 'loading'}
        aria-hidden="true"
      />

      {status === 'error' && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'var(--color-card-bg)' }}
          aria-hidden="true"
        >
          <ImageOff size={22} strokeWidth={1.5} style={{ color: 'var(--color-subtle)' }} />
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn('relative h-full w-full', imgClassName, status === 'error' && 'invisible')}
        style={style}
        loading={loading}
        decoding={decoding}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        {...rest}
      />
    </div>
  )
}
