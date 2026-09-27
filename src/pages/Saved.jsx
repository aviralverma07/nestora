import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import PropertyGrid from '../components/PropertyGrid.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getPropertyById } from '../data/properties.js'

export default function Saved() {
  const { saved } = useApp()
  const items = saved.map(getPropertyById).filter(Boolean)

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>Saved places</h1>
          <p className="muted">{items.length} {items.length === 1 ? 'place' : 'places'} on your shortlist</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-ic"><Heart size={26} /></div>
          <h3>You haven’t saved anything yet</h3>
          <p className="muted">Tap the heart on any listing to keep it here for later.</p>
          <Link to="/explore" className="btn btn-primary">Find stays</Link>
        </div>
      ) : (
        <PropertyGrid properties={items} className="card-grid" />
      )}
    </div>
  )
}
