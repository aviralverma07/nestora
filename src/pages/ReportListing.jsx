import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Flag, ShieldAlert, ArrowLeft, Check } from 'lucide-react'
import SmartImage from '../components/SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getPropertyById } from '../data/properties.js'

const REASONS = [
  'Listing is fake or a scam',
  'Wrong or misleading photos',
  'Incorrect price or hidden charges',
  'Property is no longer available',
  'Rude or unresponsive owner',
  'Something else',
]

export default function ReportListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useApp()
  const property = getPropertyById(id)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const submit = (e) => {
    e.preventDefault()
    addToast('Thanks — our team will review this listing')
    navigate(property ? `/property/${property.id}` : '/explore')
  }

  return (
    <div className="container section report-page">
      <nav className="breadcrumb">
        <button onClick={() => navigate(-1)} className="row gap-1"><ArrowLeft size={15} /> Back</button>
      </nav>

      <div className="report-head">
        <span className="report-ic"><Flag size={22} /></span>
        <div>
          <h1>Report this listing</h1>
          <p className="muted">Help us keep Nestora safe and accurate. Reports are confidential.</p>
        </div>
      </div>

      {property && (
        <div className="report-property">
          <SmartImage src={property.images[0]} alt={property.name} />
          <div>
            <strong>{property.name}</strong>
            <div className="text-xs muted">{property.locality}, {property.city}</div>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="form-card">
        <div className="form-stack">
          <div className="check-block">
            <h4>What’s wrong?</h4>
            <div className="reason-list">
              {REASONS.map((r) => (
                <label key={r} className={`reason${reason === r ? ' active' : ''}`}>
                  <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} />
                  <span className="reason-check">{reason === r && <Check size={13} />}</span>
                  {r}
                </label>
              ))}
            </div>
          </div>
          <label className="field">
            <span>Details (optional)</span>
            <textarea className="textarea" rows={4} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Tell us what happened so we can look into it." />
          </label>
          <div className="info-note"><ShieldAlert size={16} /> False reports may affect your account. Only report genuine issues.</div>
          <div className="row gap-3">
            <button type="submit" className="btn btn-accent btn-lg" disabled={!reason}>Submit report</button>
            <Link to={property ? `/property/${property.id}` : '/explore'} className="btn btn-ghost btn-lg">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
