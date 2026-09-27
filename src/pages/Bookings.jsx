import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, MessageSquare, Clock } from 'lucide-react'
import SmartImage from '../components/SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency, formatDate } from '../utils/formatters.js'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'enquiry', label: 'Enquiries' },
  { key: 'visit', label: 'Visits' },
]

export default function Bookings() {
  const { enquiries } = useApp()
  const [tab, setTab] = useState('all')
  const list = tab === 'all' ? enquiries : enquiries.filter((e) => e.kind === tab)

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>Your enquiries</h1>
          <p className="muted">Track the places you’ve contacted and visits you’ve requested.</p>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          <div className="empty-ic"><MessageSquare size={26} /></div>
          <h3>No {tab === 'all' ? 'enquiries' : tab === 'visit' ? 'visit requests' : 'enquiries'} yet</h3>
          <p className="muted">Contact an owner or request a visit and it’ll appear here.</p>
          <Link to="/explore" className="btn btn-primary">Browse stays</Link>
        </div>
      ) : (
        <div className="booking-list">
          {list.map((e) => (
            <div className="list-row" key={e.id}>
              <Link to={`/property/${e.propertyId}`} className="list-media">
                <SmartImage src={e.image} alt={e.propertyName} />
              </Link>
              <div className="list-body">
                <Link to={`/property/${e.propertyId}`}><strong>{e.propertyName}</strong></Link>
                <div className="text-xs muted">{e.city} · {formatCurrency(e.rent)}/mo</div>
                <div className="row gap-2" style={{ marginTop: 6 }}>
                  <span className="tag tag-accent">
                    {e.kind === 'visit' ? <CalendarClock size={12} /> : <MessageSquare size={12} />} {e.status}
                  </span>
                </div>
              </div>
              <div className="list-side text-xs muted row gap-1">
                <Clock size={13} /> {formatDate(e.date)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
