import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SmartImage from './SmartImage.jsx'

export default function ImageGallery({ images = [], name }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const shown = images.slice(0, 5)

  const openAt = (i) => {
    setIndex(i)
    setOpen(true)
  }
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="gallery">
        {shown.map((src, i) => (
          <figure
            key={i}
            className={i === 0 ? 'g-main' : ''}
            onClick={() => openAt(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openAt(i)}
            aria-label={`Open photo ${i + 1} of ${name}`}
          >
            <SmartImage src={src} alt={`${name} photo ${i + 1}`} />
            {i === 4 && images.length > 5 && <span className="g-more">+{images.length - 5} photos</span>}
          </figure>
        ))}
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <button className="btn-icon" style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }} onClick={() => setOpen(false)} aria-label="Close gallery">
            <X size={18} />
          </button>
          <button className="btn-icon" style={{ position: 'fixed', left: 20, top: '50%' }} onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo">
            <ChevronLeft size={20} />
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '86vw', maxHeight: '84vh' }}>
            <SmartImage src={images[index]} alt={`${name} photo ${index + 1}`} style={{ maxHeight: '84vh', borderRadius: 'var(--radius-md)', objectFit: 'contain' }} />
            <div className="text-sm" style={{ textAlign: 'center', color: '#fff', marginTop: 10 }}>{index + 1} / {images.length}</div>
          </div>
          <button className="btn-icon" style={{ position: 'fixed', right: 20, top: '50%' }} onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo">
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  )
}
