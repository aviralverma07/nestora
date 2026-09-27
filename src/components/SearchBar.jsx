import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, MapPin } from 'lucide-react'
import { parseNaturalLanguageSearch } from '../utils/searchParser.js'

export default function SearchBar({ variant = 'hero' }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('smart')
  const [text, setText] = useState('')
  const [place, setPlace] = useState('')
  const [budget, setBudget] = useState('')

  const goSmart = () => {
    const prefs = parseNaturalLanguageSearch(text)
    const params = new URLSearchParams()
    if (text.trim()) params.set('nl', text.trim())
    if (prefs.budget) params.set('budget', prefs.budget)
    if (prefs.maxDistance) params.set('distance', prefs.maxDistance)
    if (prefs.food) params.set('food', prefs.food === 'vegetarian' ? 'Vegetarian' : 'Non-vegetarian')
    if (prefs.amenities) params.set('amenities', prefs.amenities.join(','))
    if (prefs.gender) params.set('gender', prefs.gender)
    if (prefs.type) params.set('type', prefs.type)
    if (prefs.verifiedOnly) params.set('verified', 'true')
    if (prefs.availableNow) params.set('available', 'now')
    if (prefs.query) params.set('q', prefs.query)
    navigate(`/explore?${params.toString()}`)
  }

  const goStructured = () => {
    const params = new URLSearchParams()
    if (place.trim()) params.set('q', place.trim())
    if (budget) params.set('budget', budget)
    navigate(`/explore?${params.toString()}`)
  }

  return (
    <div className={`searchbox searchbox-${variant}`}>
      <div className="searchbox-tabs">
        <button className={`sb-tab${mode === 'smart' ? ' active' : ''}`} onClick={() => setMode('smart')}>
          <Sparkles size={15} /> Smart search
        </button>
        <button className={`sb-tab${mode === 'basic' ? ' active' : ''}`} onClick={() => setMode('basic')}>
          <Search size={15} /> By location
        </button>
      </div>

      {mode === 'smart' ? (
        <div className="searchbox-row">
          <div className="sb-field">
            <Sparkles size={18} className="sb-icon" />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goSmart()}
              placeholder="Try: PG near IIT Roorkee under ₹8,000, vegetarian, Wi-Fi"
              aria-label="Describe what you're looking for"
            />
          </div>
          <button className="btn btn-accent btn-lg" onClick={goSmart}>
            Search
          </button>
        </div>
      ) : (
        <div className="searchbox-row">
          <div className="sb-field">
            <MapPin size={18} className="sb-icon" />
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goStructured()}
              placeholder="College, area or city"
              aria-label="Location"
            />
          </div>
          <div className="sb-field sb-budget">
            <span className="sb-prefix">₹</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goStructured()}
              placeholder="Max budget"
              aria-label="Maximum budget"
            />
          </div>
          <button className="btn btn-accent btn-lg" onClick={goStructured}>
            Search
          </button>
        </div>
      )}
      {variant === 'hero' && (
        <p className="searchbox-hint">
          Smart search understands plain English, budgets, distance, food and amenities.
        </p>
      )}
    </div>
  )
}
