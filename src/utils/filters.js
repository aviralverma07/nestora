export const PRICE_MIN = 3000
export const PRICE_MAX = 25000

export const defaultFilters = () => ({
  query: '',
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  maxDistance: null,
  types: [],
  foods: [],
  amenities: [],
  security: [],
  genders: [],
  availability: null,
  verifiedOnly: false,
})

const matchesFood = (property, foods) => {
  if (!foods.length) return true
  const pf = property.food
  return foods.some((f) => {
    if (f === 'Both') return pf.includes('Both')
    if (f === 'No food') return pf.includes('No food')
    if (f === 'Vegetarian') return pf.includes('Vegetarian') || pf.includes('Both')
    if (f === 'Non-vegetarian') return pf.includes('Non-vegetarian') || pf.includes('Both')
    return false
  })
}

export const filterProperties = (list, filters) => {
  const q = (filters.query || '').trim().toLowerCase()
  return list.filter((p) => {
    if (q) {
      const hay = `${p.name} ${p.city} ${p.locality} ${p.landmark} ${p.type}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (p.rent < filters.priceMin || p.rent > filters.priceMax) return false
    if (filters.maxDistance && p.distanceFromCollege > filters.maxDistance) return false
    if (filters.types.length && !filters.types.includes(p.type)) return false
    if (!matchesFood(p, filters.foods)) return false
    if (filters.amenities.length && !filters.amenities.every((a) => p.amenities.includes(a))) return false
    if (filters.security.length && !filters.security.every((s) => p.security.includes(s))) return false
    if (filters.genders.length && !filters.genders.includes(p.gender)) return false
    if (filters.verifiedOnly && !p.verified) return false
    if (filters.availability === 'now' && !p.availability) return false
    if (filters.availability === 'month') {
      const from = new Date(p.availableFrom)
      const limit = new Date('2026-10-31')
      if (!(from <= limit)) return false
    }
    return true
  })
}

export const buildPreferences = (filters) => {
  const prefs = {}
  if (filters.priceMax < PRICE_MAX) prefs.budget = filters.priceMax
  if (filters.maxDistance) prefs.maxDistance = filters.maxDistance
  if (filters.foods.includes('Vegetarian')) prefs.food = 'vegetarian'
  else if (filters.foods.includes('Non-vegetarian')) prefs.food = 'non-vegetarian'
  if (filters.amenities.length) prefs.amenities = filters.amenities
  if (filters.query) prefs.query = filters.query
  return prefs
}

export const sortProperties = (list, sortKey) => {
  const arr = [...list]
  switch (sortKey) {
    case 'price-low':
      return arr.sort((a, b) => a.rent - b.rent)
    case 'distance':
      return arr.sort((a, b) => a.distanceFromCollege - b.distanceFromCollege)
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating)
    case 'recent':
      return arr.sort((a, b) => new Date(b.verifiedOn || 0) - new Date(a.verifiedOn || 0))
    case 'recommended':
    default:
      return arr.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0) || b.rating - a.rating)
  }
}

export const countActiveFilters = (filters) => {
  let n = 0
  if (filters.priceMin > PRICE_MIN || filters.priceMax < PRICE_MAX) n += 1
  if (filters.maxDistance) n += 1
  n += filters.types.length
  n += filters.foods.length
  n += filters.amenities.length
  n += filters.security.length
  n += filters.genders.length
  if (filters.availability) n += 1
  if (filters.verifiedOnly) n += 1
  return n
}

export const filtersToParams = (filters) => {
  const p = new URLSearchParams()
  if (filters.query) p.set('q', filters.query)
  if (filters.priceMax < PRICE_MAX) p.set('budget', filters.priceMax)
  if (filters.priceMin > PRICE_MIN) p.set('min', filters.priceMin)
  if (filters.maxDistance) p.set('distance', filters.maxDistance)
  if (filters.types.length) p.set('type', filters.types.join(','))
  if (filters.foods.length) p.set('food', filters.foods.join(','))
  if (filters.amenities.length) p.set('amenities', filters.amenities.join(','))
  if (filters.genders.length) p.set('gender', filters.genders.join(','))
  if (filters.verifiedOnly) p.set('verified', 'true')
  if (filters.availability) p.set('available', filters.availability)
  return p
}

export const paramsToFilters = (params) => {
  const f = defaultFilters()
  if (params.get('q')) f.query = params.get('q')
  if (params.get('budget')) f.priceMax = Number(params.get('budget'))
  if (params.get('min')) f.priceMin = Number(params.get('min'))
  if (params.get('distance')) f.maxDistance = Number(params.get('distance'))
  if (params.get('type')) f.types = params.get('type').split(',')
  if (params.get('food')) f.foods = params.get('food').split(',')
  if (params.get('amenities')) f.amenities = params.get('amenities').split(',')
  if (params.get('gender')) f.genders = params.get('gender').split(',')
  if (params.get('verified') === 'true') f.verifiedOnly = true
  if (params.get('available')) f.availability = params.get('available')
  return f
}
