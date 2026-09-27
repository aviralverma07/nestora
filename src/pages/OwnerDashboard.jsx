import { Link } from 'react-router-dom'
import { Plus, Eye, MessageSquare, Home, TrendingUp, ShieldCheck, Pencil } from 'lucide-react'
import SmartImage from '../components/SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'
import { properties } from '../data/properties.js'
import { formatCurrency } from '../utils/formatters.js'

const myListings = properties.slice(0, 4)
const views = (p) => 120 + p.id * 37 + Math.round(p.rating * 20)
const enquiriesFor = (p) => 3 + (p.id % 5) + (p.roomsLeft || 0)

export default function OwnerDashboard() {
  const { addToast } = useApp()
  const totalViews = myListings.reduce((s, p) => s + views(p), 0)
  const totalEnq = myListings.reduce((s, p) => s + enquiriesFor(p), 0)
  const verified = myListings.filter((p) => p.verified).length

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>Owner dashboard</h1>
          <p className="muted">Manage your listings and see how they’re performing.</p>
        </div>
        <Link to="/owner/add-property" className="btn btn-accent"><Plus size={17} /> Add property</Link>
      </div>

      <div className="stat-row owner-stats">
        <div className="stat"><span className="stat-ic"><Home size={18} /></span><strong>{myListings.length}</strong><span className="muted text-sm">Active listings</span></div>
        <div className="stat"><span className="stat-ic"><Eye size={18} /></span><strong>{totalViews.toLocaleString('en-IN')}</strong><span className="muted text-sm">Total views</span></div>
        <div className="stat"><span className="stat-ic"><MessageSquare size={18} /></span><strong>{totalEnq}</strong><span className="muted text-sm">Enquiries</span></div>
        <div className="stat"><span className="stat-ic"><ShieldCheck size={18} /></span><strong>{verified}/{myListings.length}</strong><span className="muted text-sm">Verified</span></div>
      </div>

      <section className="panel">
        <h3>Your listings</h3>
        <div className="owner-list">
          {myListings.map((p) => (
            <div className="owner-row" key={p.id}>
              <Link to={`/property/${p.id}`} className="list-media">
                <SmartImage src={p.images[0]} alt={p.name} />
              </Link>
              <div className="list-body">
                <div className="row gap-2 wrap" style={{ alignItems: 'center' }}>
                  <Link to={`/property/${p.id}`}><strong>{p.name}</strong></Link>
                  <span className={`tag ${p.availability ? 'tag-accent' : 'tag-muted'}`}>{p.availability ? 'Live' : 'Full'}</span>
                </div>
                <div className="text-xs muted">{p.locality}, {p.city} · {formatCurrency(p.rent)}/mo</div>
                <div className="owner-metrics text-xs muted">
                  <span className="row gap-1"><Eye size={13} /> {views(p)} views</span>
                  <span className="row gap-1"><MessageSquare size={13} /> {enquiriesFor(p)} enquiries</span>
                  <span className="row gap-1"><TrendingUp size={13} /> {p.reviewCount} reviews</span>
                </div>
              </div>
              <button className="btn btn-soft btn-sm" onClick={() => addToast('Editing is disabled in this demo')}>
                <Pencil size={14} /> Edit
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
