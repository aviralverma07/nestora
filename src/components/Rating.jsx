import { Star } from 'lucide-react'

export default function Rating({ value, count, size = 15, showCount = true }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <Star size={size} strokeWidth={0} />
      <span>{value.toFixed(1)}</span>
      {showCount && count !== undefined && <span className="count">({count})</span>}
    </span>
  )
}
