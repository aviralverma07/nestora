import { Link } from 'react-router-dom'
import { X, GitCompare, Check, Minus, Trophy } from 'lucide-react'
import SmartImage from '../components/SmartImage.jsx'
import Rating from '../components/Rating.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getPropertyById } from '../data/properties.js'
import { formatCurrency, formatDistance, foodLabel } from '../utils/formatters.js'

const AMENITY_KEYS = ['Wi-Fi', 'AC', 'Washing Machine', 'Power Backup', 'Housekeeping', 'Parking', 'Study Table', 'Attached Bathroom']

export default function Compare() {
  const { compare, toggleCompare, clearCompare } = useApp()
  const items = compare.map(getPropertyById).filter(Boolean)

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-ic"><GitCompare size={26} /></div>
          <h3>Nothing to compare yet</h3>
          <p className="muted">Add places from the explore page or a listing to see them side by side.</p>
          <Link to="/explore" className="btn btn-primary">Browse stays</Link>
        </div>
      </div>
    )
  }

  const cheapest = Math.min(...items.map((p) => p.rent))
  const nearest = Math.min(...items.map((p) => p.distanceFromCollege))
  const topRated = Math.max(...items.map((p) => p.rating))

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>Compare stays</h1>
          <p className="muted">{items.length} places side by side</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={clearCompare}>Clear all</button>
      </div>

      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="row-label" />
              {items.map((p) => (
                <th key={p.id}>
                  <div className="compare-card">
                    <button className="compare-remove" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name}`}><X size={15} /></button>
                    <Link to={`/property/${p.id}`}>
                      <SmartImage src={p.images[0]} alt={p.name} className="compare-img" />
                      <strong>{p.name}</strong>
                    </Link>
                    <div className="text-xs muted">{p.locality}, {p.city}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="row-label">Monthly rent</td>
              {items.map((p) => (
                <td key={p.id} className={p.rent === cheapest ? 'best' : ''}>
                  {formatCurrency(p.rent)}
                  {p.rent === cheapest && <span className="best-tag"><Trophy size={12} /> Lowest</span>}
                </td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Deposit</td>
              {items.map((p) => <td key={p.id}>{formatCurrency(p.deposit)}</td>)}
            </tr>
            <tr>
              <td className="row-label">Type</td>
              {items.map((p) => <td key={p.id}>{p.type}</td>)}
            </tr>
            <tr>
              <td className="row-label">For</td>
              {items.map((p) => <td key={p.id}>{p.gender}</td>)}
            </tr>
            <tr>
              <td className="row-label">Distance</td>
              {items.map((p) => (
                <td key={p.id} className={p.distanceFromCollege === nearest ? 'best' : ''}>
                  {formatDistance(p.distanceFromCollege)}
                  {p.distanceFromCollege === nearest && <span className="best-tag"><Trophy size={12} /> Nearest</span>}
                </td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Rating</td>
              {items.map((p) => (
                <td key={p.id} className={p.rating === topRated ? 'best' : ''}>
                  <Rating value={p.rating} count={p.reviewCount} size={13} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Food</td>
              {items.map((p) => <td key={p.id}>{foodLabel(p.food)}</td>)}
            </tr>
            <tr>
              <td className="row-label">Availability</td>
              {items.map((p) => <td key={p.id}>{p.availability ? 'Available now' : 'Full'}</td>)}
            </tr>
            <tr>
              <td className="row-label">Verified</td>
              {items.map((p) => <td key={p.id}>{p.verified ? <Check size={16} color="var(--color-accent)" /> : <Minus size={16} className="muted" />}</td>)}
            </tr>
            {AMENITY_KEYS.map((a) => (
              <tr key={a}>
                <td className="row-label">{a}</td>
                {items.map((p) => (
                  <td key={p.id}>
                    {p.amenities.includes(a) ? <Check size={16} color="var(--color-accent)" /> : <Minus size={16} className="muted" />}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="row-label" />
              {items.map((p) => (
                <td key={p.id}><Link to={`/property/${p.id}`} className="btn btn-primary btn-sm">View</Link></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
