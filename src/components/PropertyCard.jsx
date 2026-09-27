import { Link } from 'react-router-dom'
import { Heart, MapPin, Sparkles } from 'lucide-react'
import SmartImage from './SmartImage.jsx'
import Rating from './Rating.jsx'
import VerificationBadge from './VerificationBadge.jsx'
import { amenityIcon } from './AmenityList.jsx'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency, formatDistance, foodLabel } from '../utils/formatters.js'

export default function PropertyCard({ property, showCompare = true }) {
  const { isSaved, toggleSave, isComparing, toggleCompare } = useApp()
  const saved = isSaved(property.id)
  const keyAmenities = property.amenities.slice(0, 3)

  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/property/${property.id}`} aria-label={`View ${property.name}`}>
          <SmartImage src={property.images[0]} alt={`${property.name} in ${property.locality}`} />
        </Link>
        <div className="pcard-topleft">
          {property.verified && <VerificationBadge />}
          {!property.availability && <span className="tag tag-muted">Full</span>}
        </div>
        <button
          className={`pcard-save${saved ? ' saved' : ''}`}
          onClick={() => toggleSave(property.id)}
          aria-label={saved ? 'Remove from saved' : 'Save this place'}
          aria-pressed={saved}
        >
          <Heart size={18} />
        </button>
        {property.matchScore !== undefined && (
          <span className="pcard-match">
            <Sparkles size={12} /> {property.matchScore}% match
          </span>
        )}
      </div>

      <div className="pcard-body">
        <div className="pcard-head">
          <div>
            <Link to={`/property/${property.id}`}>
              <h3 className="pcard-name">{property.name}</h3>
            </Link>
            <div className="pcard-loc">
              <MapPin size={13} /> {property.locality}, {property.city}
            </div>
          </div>
          <Rating value={property.rating} count={property.reviewCount} showCount={false} />
        </div>

        <div className="pcard-meta">
          <span>{property.type}</span>
          <span className="sep">•</span>
          <span>{formatDistance(property.distanceFromCollege)} away</span>
          <span className="sep">•</span>
          <span>{foodLabel(property.food)}</span>
        </div>

        <div className="pcard-amen">
          {keyAmenities.map((a) => {
            const Icon = amenityIcon(a)
            return (
              <span className="mini" key={a}>
                <Icon size={12} /> {a}
              </span>
            )
          })}
        </div>

        <div className="pcard-foot">
          <div className="pcard-price">
            <span className="amt">{formatCurrency(property.rent)}</span>
            <span className="per"> /month</span>
            <span className="dep">{formatCurrency(property.deposit)} deposit</span>
          </div>
          <div className="stack gap-2" style={{ alignItems: 'flex-end' }}>
            <Link to={`/property/${property.id}`} className="btn btn-primary btn-sm">
              View details
            </Link>
            {showCompare && (
              <label className="pcard-compare">
                <input
                  type="checkbox"
                  checked={isComparing(property.id)}
                  onChange={() => toggleCompare(property.id)}
                />
                Compare
              </label>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
