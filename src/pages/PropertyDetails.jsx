import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin, Heart, GitCompare, Share2, Flag, ShieldCheck, ChevronRight,
  Utensils, BedDouble, Clock, Check, Phone, CalendarClock, ArrowLeft,
} from 'lucide-react'
import ImageGallery from '../components/ImageGallery.jsx'
import Rating from '../components/Rating.jsx'
import VerificationBadge from '../components/VerificationBadge.jsx'
import MatchScore from '../components/MatchScore.jsx'
import AmenityList, { amenityIcon } from '../components/AmenityList.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import MapView from '../components/MapView.jsx'
import Modal from '../components/Modal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getPropertyById, properties } from '../data/properties.js'
import { getReviewsByProperty } from '../data/reviews.js'
import { calculateMatchScore } from '../utils/matching.js'
import { formatCurrency, formatDistance, formatDate, foodLabel } from '../utils/formatters.js'

const ALL_AMENITIES = ['Wi-Fi', 'AC', 'Washing Machine', 'Power Backup', 'Housekeeping', 'Parking', 'Study Table', 'Attached Bathroom', 'Laundry']

export default function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = getPropertyById(id)
  const { isSaved, toggleSave, isComparing, toggleCompare, preferences, addEnquiry, recordView, addToast } = useApp()
  const [contactOpen, setContactOpen] = useState(false)
  const [visitOpen, setVisitOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [visit, setVisit] = useState({ date: '', slot: 'Morning' })

  useEffect(() => {
    if (property) recordView(property.id)
  }, [property, recordView])

  const reviews = useMemo(() => (property ? getReviewsByProperty(property.id) : []), [property])
  const match = useMemo(() => (property ? calculateMatchScore(property, preferences || {}) : null), [property, preferences])
  const similar = useMemo(() => {
    if (!property) return []
    return properties.filter((p) => p.id !== property.id && p.city === property.city).slice(0, 3)
  }, [property])

  if (!property) {
    return (
      <div className="container section">
        <div className="empty-state">
          <h3>This listing isn’t available</h3>
          <p className="muted">It may have been removed or the link is incorrect.</p>
          <Link to="/explore" className="btn btn-primary">Back to explore</Link>
        </div>
      </div>
    )
  }

  const saved = isSaved(property.id)
  const comparing = isComparing(property.id)

  const submitContact = (e) => {
    e.preventDefault()
    addEnquiry(property, 'enquiry')
    setContactOpen(false)
    setForm({ name: '', phone: '', message: '' })
    addToast('Your enquiry was sent to the owner')
  }
  const submitVisit = (e) => {
    e.preventDefault()
    addEnquiry(property, 'visit')
    setVisitOpen(false)
    addToast('Visit request sent')
  }
  const share = () => {
    addToast('Link copied to clipboard')
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).catch(() => {})
  }

  return (
    <div className="pd">
      <div className="container">
        <nav className="breadcrumb">
          <button onClick={() => navigate(-1)} className="row gap-1"><ArrowLeft size={15} /> Back</button>
          <span className="sep"><ChevronRight size={14} /></span>
          <Link to="/explore">Explore</Link>
          <span className="sep"><ChevronRight size={14} /></span>
          <span className="muted">{property.name}</span>
        </nav>

        <ImageGallery images={property.images} name={property.name} />

        <div className="pd-layout">
          <div className="pd-main">
            <header className="pd-head">
              <div className="row gap-2 wrap" style={{ alignItems: 'center' }}>
                {property.verified && <VerificationBadge />}
                <span className="tag">{property.type}</span>
                <span className="tag">{property.gender}</span>
              </div>
              <h1>{property.name}</h1>
              <div className="pd-sub">
                <span className="row gap-1"><MapPin size={15} /> {property.address}</span>
                <Rating value={property.rating} count={property.reviewCount} />
              </div>
              <div className="pd-actions">
                <button className={`btn btn-soft btn-sm${saved ? ' active' : ''}`} onClick={() => toggleSave(property.id)}>
                  <Heart size={16} /> {saved ? 'Saved' : 'Save'}
                </button>
                <button className={`btn btn-soft btn-sm${comparing ? ' active' : ''}`} onClick={() => toggleCompare(property.id)}>
                  <GitCompare size={16} /> {comparing ? 'Comparing' : 'Compare'}
                </button>
                <button className="btn btn-soft btn-sm" onClick={share}><Share2 size={16} /> Share</button>
                <Link to={`/report/${property.id}`} className="btn btn-soft btn-sm"><Flag size={16} /> Report</Link>
              </div>
            </header>

            {match && <MatchScore score={match.score} reasons={match.reasons} />}

            <section className="pd-block">
              <h2>About this place</h2>
              <p className="pd-desc">{property.description}</p>
              <div className="pd-quickfacts">
                <div><BedDouble size={16} /> {property.type}</div>
                <div><MapPin size={16} /> {formatDistance(property.distanceFromCollege)} from {property.landmark}</div>
                <div><Utensils size={16} /> {foodLabel(property.food)}</div>
                <div><Clock size={16} /> Updated {formatDate(property.updatedAt)}</div>
              </div>
            </section>

            <section className="pd-block">
              <h2>Rooms &amp; pricing</h2>
              <div className="room-cards">
                {property.rooms.map((r) => (
                  <div className={`room-card${r.available ? '' : ' unavailable'}`} key={r.type}>
                    <SmartImage src={r.image} alt={r.type} />
                    <div className="room-info">
                      <div className="row spread">
                        <strong>{r.type}</strong>
                        <span className={`tag ${r.available ? 'tag-accent' : 'tag-muted'}`}>{r.available ? 'Available' : 'Full'}</span>
                      </div>
                      <div className="room-price">{formatCurrency(r.rent)}<span className="per">/mo</span></div>
                      <div className="text-xs muted">{formatCurrency(r.deposit)} deposit</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pd-block">
              <h2>Amenities</h2>
              <AmenityList items={property.amenities} all={ALL_AMENITIES} />
            </section>

            <section className="pd-block">
              <h2>Food</h2>
              <div className="pd-food">
                <div className="row gap-2 wrap">
                  {property.food.map((f) => <span key={f} className="tag tag-accent">{f}</span>)}
                </div>
                {property.meals && property.meals.length > 0 && (
                  <p className="muted text-sm" style={{ marginTop: 'var(--space-3)' }}>
                    Meals served: {property.meals.join(', ')}
                  </p>
                )}
              </div>
            </section>

            <section className="pd-block">
              <h2>Safety &amp; security</h2>
              <div className="amen-grid">
                {property.security.map((s) => {
                  const Icon = amenityIcon(s)
                  return (
                    <div key={s} className="amen-item">
                      <span className="ai"><Icon size={17} /></span>
                      <span>{s}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="pd-block">
              <h2>What’s nearby</h2>
              <ul className="dist-list">
                {Object.entries(property.distances).map(([place, km]) => (
                  <li key={place}>
                    <span className="row gap-1"><MapPin size={14} /> {place}</span>
                    <strong>{formatDistance(km)}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pd-block">
              <h2>House rules</h2>
              <ul className="rules-list">
                {property.rules.map((r) => <li key={r}><Check size={15} /> {r}</li>)}
              </ul>
            </section>

            <section className="pd-block">
              <h2>Location</h2>
              <div className="pd-map">
                <MapView properties={[property]} center={[property.latitude, property.longitude]} zoom={15} />
              </div>
            </section>

            <section className="pd-block">
              <div className="rating-summary">
                <div className="rating-big">
                  <span className="rs-score">{property.rating.toFixed(1)}</span>
                  <Rating value={property.rating} showCount={false} />
                  <span className="muted text-sm">{property.reviewCount} reviews</span>
                </div>
                <h2>What students say</h2>
              </div>
              {reviews.length > 0 ? (
                <div className="reviews-list">
                  {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                </div>
              ) : (
                <p className="muted">No reviews yet for this place.</p>
              )}
            </section>

            {similar.length > 0 && (
              <section className="pd-block">
                <h2>Similar stays in {property.city}</h2>
                <div className="similar-row">
                  {similar.map((p) => (
                    <Link key={p.id} to={`/property/${p.id}`} className="similar-card">
                      <SmartImage src={p.images[0]} alt={p.name} />
                      <div className="similar-info">
                        <strong>{p.name}</strong>
                        <div className="text-xs muted">{p.locality}</div>
                        <div className="row spread" style={{ marginTop: 4 }}>
                          <span>{formatCurrency(p.rent)}/mo</span>
                          <Rating value={p.rating} showCount={false} size={13} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="pd-side">
            <div className="booking-panel">
              <div className="booking-price">
                <span className="amt">{formatCurrency(property.rent)}</span>
                <span className="per">/month</span>
              </div>
              <div className="booking-meta">
                <div className="row spread"><span className="muted">Deposit</span><strong>{formatCurrency(property.deposit)}</strong></div>
                <div className="row spread"><span className="muted">Maintenance</span><strong>{property.maintenance ? formatCurrency(property.maintenance) : 'None'}</strong></div>
                <div className="row spread"><span className="muted">Food</span><strong>{property.foodCharges}</strong></div>
              </div>
              <div className={`booking-avail${property.availability ? '' : ' full'}`}>
                {property.availability
                  ? <><Check size={15} /> Available from {formatDate(property.availableFrom)}{property.roomsLeft ? ` · ${property.roomsLeft} rooms left` : ''}</>
                  : <>Currently full</>}
              </div>
              <button className="btn btn-accent btn-lg btn-block" onClick={() => setVisitOpen(true)} disabled={!property.availability}>
                <CalendarClock size={17} /> Request a visit
              </button>
              <button className="btn btn-ghost btn-block" onClick={() => setContactOpen(true)}>
                <Phone size={16} /> Contact owner
              </button>
              <p className="booking-note muted text-xs">No booking fee. You deal directly with the owner.</p>
            </div>
          </aside>
        </div>
      </div>

      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title={`Contact ${property.name}`}>
        <form onSubmit={submitContact} className="form-stack">
          <div className="info-note">
            <ShieldCheck size={16} /> Your details are shared only with this owner. This is a demo, so no real message is sent.
          </div>
          <label className="field">
            <span>Your name</span>
            <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
          </label>
          <label className="field">
            <span>Phone number</span>
            <input className="input" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea className="textarea" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={`Hi, I'm interested in ${property.name}. Is it still available?`} />
          </label>
          <button type="submit" className="btn btn-accent btn-block btn-lg">Send enquiry</button>
        </form>
      </Modal>

      <Modal open={visitOpen} onClose={() => setVisitOpen(false)} title="Request a visit">
        <form onSubmit={submitVisit} className="form-stack">
          <div className="info-note">
            <CalendarClock size={16} /> Pick a preferred day and time. The owner will confirm your slot.
          </div>
          <label className="field">
            <span>Preferred date</span>
            <input className="input" type="date" required value={visit.date} onChange={(e) => setVisit({ ...visit, date: e.target.value })} />
          </label>
          <label className="field">
            <span>Preferred time</span>
            <select className="select" value={visit.slot} onChange={(e) => setVisit({ ...visit, slot: e.target.value })}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>
          <button type="submit" className="btn btn-accent btn-block btn-lg">Request visit</button>
        </form>
      </Modal>
    </div>
  )
}
