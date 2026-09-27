import { formatCurrency } from '../utils/formatters.js'
import { PRICE_MIN, PRICE_MAX } from '../utils/filters.js'

const TYPES = ['PG', 'Hostel', 'Shared room', 'Private room', '1BHK']
const FOODS = ['Vegetarian', 'Non-vegetarian', 'Both', 'No food']
const AMENITIES = ['Wi-Fi', 'AC', 'Washing Machine', 'Power Backup', 'Housekeeping', 'Parking', 'Study Table', 'Attached Bathroom', 'Laundry']
const SECURITY = ['CCTV', 'Warden', 'Biometric Entry', 'Security Guard']
const GENDERS = ['Male', 'Female', 'Co-living']
const DISTANCES = [1, 2, 3, 5]

export default function FilterSidebar({ filters, setFilters }) {
  const toggleArr = (key, value) => {
    setFilters((f) => {
      const arr = f[key]
      return { ...f, [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] }
    })
  }
  const setScalar = (key, value) => setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }))

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <h4>Monthly budget</h4>
        <div className="range-wrap">
          <div className="range-vals">
            <span>{formatCurrency(PRICE_MIN)}</span>
            <span>{formatCurrency(filters.priceMax)}{filters.priceMax >= PRICE_MAX ? '+' : ''}</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={filters.priceMax}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))}
            aria-label="Maximum monthly budget"
          />
        </div>
      </div>

      <div className="filter-group">
        <h4>Distance from location</h4>
        <div className="opt-pills">
          {DISTANCES.map((d) => (
            <button key={d} className={`chip${filters.maxDistance === d ? ' active' : ''}`} onClick={() => setScalar('maxDistance', d)}>
              Under {d} km
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Stay type</h4>
        <div className="filter-opts">
          {TYPES.map((t) => (
            <label className="opt" key={t}>
              <input type="checkbox" checked={filters.types.includes(t)} onChange={() => toggleArr('types', t)} />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Food</h4>
        <div className="filter-opts">
          {FOODS.map((t) => (
            <label className="opt" key={t}>
              <input type="checkbox" checked={filters.foods.includes(t)} onChange={() => toggleArr('foods', t)} />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Amenities</h4>
        <div className="filter-opts">
          {AMENITIES.map((t) => (
            <label className="opt" key={t}>
              <input type="checkbox" checked={filters.amenities.includes(t)} onChange={() => toggleArr('amenities', t)} />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Security</h4>
        <div className="filter-opts">
          {SECURITY.map((t) => (
            <label className="opt" key={t}>
              <input type="checkbox" checked={filters.security.includes(t)} onChange={() => toggleArr('security', t)} />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Gender</h4>
        <div className="opt-pills">
          {GENDERS.map((g) => (
            <button key={g} className={`chip${filters.genders.includes(g) ? ' active' : ''}`} onClick={() => toggleArr('genders', g)}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Availability</h4>
        <div className="opt-pills">
          <button className={`chip${filters.availability === 'now' ? ' active' : ''}`} onClick={() => setScalar('availability', 'now')}>Available now</button>
          <button className={`chip${filters.availability === 'month' ? ' active' : ''}`} onClick={() => setScalar('availability', 'month')}>This month</button>
        </div>
      </div>

      <div className="filter-group">
        <label className="opt">
          <input type="checkbox" checked={filters.verifiedOnly} onChange={() => setFilters((f) => ({ ...f, verifiedOnly: !f.verifiedOnly }))} />
          <strong>Verified listings only</strong>
        </label>
      </div>
    </div>
  )
}
