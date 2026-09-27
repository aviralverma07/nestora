import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, ImagePlus, Home, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const STEPS = ['Basics', 'Pricing', 'Amenities', 'Photos', 'Review']
const TYPES = ['PG', 'Hostel', 'Shared room', 'Private room', '1BHK']
const GENDERS = ['Male', 'Female', 'Co-living']
const CITIES = ['Roorkee', 'Dehradun', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Jaipur']
const AMENITIES = ['Wi-Fi', 'AC', 'Washing Machine', 'Power Backup', 'Housekeeping', 'Parking', 'Study Table', 'Attached Bathroom', 'Laundry']
const SECURITY = ['CCTV', 'Warden', 'Biometric Entry', 'Security Guard']
const FOODS = ['Vegetarian', 'Non-vegetarian', 'Both', 'No food']

const initial = {
  name: '', type: 'PG', gender: 'Co-living', city: 'Delhi', locality: '', address: '',
  rent: '', deposit: '', maintenance: '', foodCharges: 'Included',
  amenities: [], security: [], food: [], description: '', photos: 0,
}

export default function AddProperty() {
  const navigate = useNavigate()
  const { addToast, pushNotification } = useApp()
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initial)

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const toggle = (k, v) => setData((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }))

  const canNext = () => {
    if (step === 0) return data.name && data.locality && data.address
    if (step === 1) return data.rent && data.deposit
    return true
  }

  const submit = () => {
    addToast('Your listing has been submitted for review')
    pushNotification(`Your listing "${data.name}" was submitted and is pending verification.`)
    navigate('/owner')
  }

  return (
    <div className="container section addprop">
      <div className="section-head">
        <div>
          <h1>List your property</h1>
          <p className="muted">Reach thousands of students looking for a place near your area.</p>
        </div>
      </div>

      <div className="steps-nav">
        {STEPS.map((s, i) => (
          <div key={s} className={`stepnav-item${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
            <span className="stepnav-num">{i < step ? <Check size={14} /> : i + 1}</span>
            <span className="stepnav-label">{s}</span>
          </div>
        ))}
      </div>

      <div className="form-card">
        {step === 0 && (
          <div className="form-stack">
            <label className="field"><span>Property name</span>
              <input className="input" value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Cedar House" />
            </label>
            <div className="form-grid">
              <label className="field"><span>Type</span>
                <select className="select" value={data.type} onChange={(e) => set('type', e.target.value)}>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="field"><span>For</span>
                <select className="select" value={data.gender} onChange={(e) => set('gender', e.target.value)}>
                  {GENDERS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </label>
              <label className="field"><span>City</span>
                <select className="select" value={data.city} onChange={(e) => set('city', e.target.value)}>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="field"><span>Locality</span>
                <input className="input" value={data.locality} onChange={(e) => set('locality', e.target.value)} placeholder="Area / neighbourhood" />
              </label>
            </div>
            <label className="field"><span>Full address</span>
              <input className="input" value={data.address} onChange={(e) => set('address', e.target.value)} placeholder="Street, landmark, city" />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="form-stack">
            <div className="form-grid">
              <label className="field"><span>Monthly rent (₹)</span>
                <input className="input" type="number" value={data.rent} onChange={(e) => set('rent', e.target.value)} placeholder="8000" />
              </label>
              <label className="field"><span>Security deposit (₹)</span>
                <input className="input" type="number" value={data.deposit} onChange={(e) => set('deposit', e.target.value)} placeholder="8000" />
              </label>
              <label className="field"><span>Maintenance (₹, optional)</span>
                <input className="input" type="number" value={data.maintenance} onChange={(e) => set('maintenance', e.target.value)} placeholder="500" />
              </label>
              <label className="field"><span>Food charges</span>
                <select className="select" value={data.foodCharges} onChange={(e) => set('foodCharges', e.target.value)}>
                  <option>Included</option>
                  <option>Extra</option>
                  <option>Not provided</option>
                </select>
              </label>
            </div>
            <div className="check-block">
              <h4>Food available</h4>
              <div className="check-grid">
                {FOODS.map((f) => (
                  <button key={f} className={`check-pill${data.food.includes(f) ? ' active' : ''}`} onClick={() => toggle('food', f)}>
                    {data.food.includes(f) && <Check size={13} />} {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-stack">
            <div className="check-block">
              <h4>Amenities</h4>
              <div className="check-grid">
                {AMENITIES.map((a) => (
                  <button key={a} className={`check-pill${data.amenities.includes(a) ? ' active' : ''}`} onClick={() => toggle('amenities', a)}>
                    {data.amenities.includes(a) && <Check size={13} />} {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="check-block">
              <h4>Security</h4>
              <div className="check-grid">
                {SECURITY.map((s) => (
                  <button key={s} className={`check-pill${data.security.includes(s) ? ' active' : ''}`} onClick={() => toggle('security', s)}>
                    {data.security.includes(s) && <Check size={13} />} {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-stack">
            <button className="photo-drop" onClick={() => set('photos', Math.min(6, data.photos + 1))}>
              <ImagePlus size={26} />
              <strong>Add photos</strong>
              <span className="muted text-sm">Tap to add sample photos ({data.photos} added). Clear, well-lit shots get more enquiries.</span>
            </button>
            <label className="field"><span>Description</span>
              <textarea className="textarea" rows={5} value={data.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the place, the neighbourhood and who it suits best." />
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="review-block">
            <div className="info-note"><Sparkles size={16} /> Review your details. This is a demo, so submitting won’t publish a real listing.</div>
            <div className="review-grid">
              <div><span className="muted text-xs">Name</span><strong>{data.name || '—'}</strong></div>
              <div><span className="muted text-xs">Type</span><strong>{data.type} · {data.gender}</strong></div>
              <div><span className="muted text-xs">Location</span><strong>{data.locality || '—'}, {data.city}</strong></div>
              <div><span className="muted text-xs">Rent</span><strong>{data.rent ? `₹${Number(data.rent).toLocaleString('en-IN')}/mo` : '—'}</strong></div>
              <div><span className="muted text-xs">Deposit</span><strong>{data.deposit ? `₹${Number(data.deposit).toLocaleString('en-IN')}` : '—'}</strong></div>
              <div><span className="muted text-xs">Photos</span><strong>{data.photos} added</strong></div>
            </div>
            {data.amenities.length > 0 && (
              <div className="rm-tags">{data.amenities.map((a) => <span key={a} className="tag">{a}</span>)}</div>
            )}
          </div>
        )}

        <div className="form-nav">
          {step > 0
            ? <button className="btn btn-ghost" onClick={() => setStep(step - 1)}><ChevronLeft size={16} /> Back</button>
            : <span />}
          {step < STEPS.length - 1
            ? <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(step + 1)}>Continue <ChevronRight size={16} /></button>
            : <button className="btn btn-accent" onClick={submit}><Home size={16} /> Submit listing</button>}
        </div>
      </div>
    </div>
  )
}
