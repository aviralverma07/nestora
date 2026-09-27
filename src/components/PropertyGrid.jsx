import PropertyCard from './PropertyCard.jsx'
import SkeletonCard from './SkeletonCard.jsx'

export default function PropertyGrid({ properties, loading = false, count = 6, showCompare = true, className = 'results-grid' }) {
  if (loading) {
    return (
      <div className={className}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }
  return (
    <div className={className}>
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} showCompare={showCompare} />
      ))}
    </div>
  )
}
