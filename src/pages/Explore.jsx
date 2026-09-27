import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, X, Map as MapIcon, LayoutGrid, Sparkles, GitCompare } from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar.jsx'
import PropertyGrid from '../components/PropertyGrid.jsx'
import MapView from '../components/MapView.jsx'
import { useApp } from '../context/AppContext.jsx'
import { properties } from '../data/properties.js'
import {
  paramsToFilters, filtersToParams, filterProperties, buildPreferences,
  sortProperties, countActiveFilters, defaultFilters,
} from '../utils/filters.js'
import { calculateMatchScore } from '../utils/matching.js'
import { parseNaturalLanguageSearch, describePreferences } from '../utils/searchParser.js'

const SORTS = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'price-low', label: 'Price: low to high' },
  { key: 'distance', label: 'Nearest first' },
  { key: 'rating', label: 'Top rated' },
  { key: 'recent', label: 'Recently verified' },
]

export default function Explore() {
  const [params, setParams] = useSearchParams()
  const { compare } = useApp()
  const [filters, setFilters] = useState(() => paramsToFilters(params))
  const [sortKey, setSortKey] = useState('recommended')
  const [view, setView] = useState('list')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  const nlText = params.get('nl') || ''
  const parsedChips = useMemo(() => (nlText ? describePreferences(parseNaturalLanguageSearch(nlText)) : []), [nlText])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const next = filtersToParams(filters)
    if (nlText) next.set('nl', nlText)
    setParams(next, { replace: true })
  }, [filters])

  const prefs = useMemo(() => buildPreferences(filters), [filters])

  const results = useMemo(() => {
    const filtered = filterProperties(properties, filters).map((p) => {
      const { score } = calculateMatchScore(p, prefs)
      return { ...p, matchScore: score }
    })
    return sortProperties(filtered, sortKey)
  }, [filters, prefs, sortKey])

  const activeCount = countActiveFilters(filters)
  const clearAll = () => setFilters(defaultFilters())

  return (
    <div className="explore">
      <div className="container">
        <div className="explore-topbar">
          <div>
            <h1>{filters.query ? `Stays near ${filters.query}` : 'Explore stays'}</h1>
            <p className="muted">{results.length} {results.length === 1 ? 'place' : 'places'} available</p>
          </div>
          <div className="explore-controls">
            <div className="seg">
              <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view">
                <LayoutGrid size={16} /> List
              </button>
              <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')} aria-label="Map view">
                <MapIcon size={16} /> Map
              </button>
            </div>
            <label className="sort-select">
              <span className="sr-only">Sort by</span>
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </label>
            <button className="btn btn-soft btn-sm filter-toggle" onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontal size={16} /> Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
          </div>
        </div>

        {parsedChips.length > 0 && (
          <div className="parsed-banner">
            <span className="row gap-1"><Sparkles size={16} color="var(--color-accent)" /> <strong>We understood:</strong></span>
            <div className="row gap-2 wrap">
              {parsedChips.map((c) => <span key={c.key} className="tag tag-accent">{c.label}</span>)}
            </div>
          </div>
        )}

        <div className="explore-layout">
          <aside className="explore-filters">
            <div className="filter-head">
              <h3>Filters</h3>
              {activeCount > 0 && <button className="link-accent text-sm" onClick={clearAll}>Clear all</button>}
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          <div className="explore-results">
            {view === 'map' ? (
              <div className="explore-map">
                <MapView properties={results} selectedId={selectedId} onSelect={setSelectedId} />
              </div>
            ) : loading ? (
              <PropertyGrid loading count={6} className="results-grid" />
            ) : results.length === 0 ? (
              <div className="empty-state">
                <div className="empty-ic"><SlidersHorizontal size={26} /></div>
                <h3>No stays match those filters</h3>
                <p className="muted">Try widening your budget or distance, or clear a few filters.</p>
                <button className="btn btn-primary" onClick={clearAll}>Clear all filters</button>
              </div>
            ) : (
              <PropertyGrid properties={results} className="results-grid" />
            )}
          </div>
        </div>
      </div>

      {compare.length > 0 && (
        <Link to="/compare" className="compare-fab">
          <GitCompare size={18} /> Compare ({compare.length})
        </Link>
      )}

      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h3>Filters</h3>
              <button className="btn-icon" onClick={() => setDrawerOpen(false)} aria-label="Close filters"><X size={18} /></button>
            </div>
            <div className="drawer-body">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
            <div className="drawer-foot">
              <button className="btn btn-ghost" onClick={clearAll}>Clear all</button>
              <button className="btn btn-primary btn-block" onClick={() => setDrawerOpen(false)}>
                Show {results.length} {results.length === 1 ? 'place' : 'places'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
