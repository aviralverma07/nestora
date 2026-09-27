import { useState } from 'react'
import { ImageOff } from 'lucide-react'

export default function SmartImage({ src, alt, className, style }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
      <div className={className} style={{ ...style, display: 'grid', placeItems: 'center', background: 'var(--color-bg-alt)', color: 'var(--color-faint)' }} aria-label={alt}>
        <ImageOff size={26} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity .4s ease' }}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  )
}
