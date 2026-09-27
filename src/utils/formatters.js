export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—'
  return '₹' + Number(value).toLocaleString('en-IN')
}

export const formatRent = (value) => `${formatCurrency(value)}/mo`

export const formatDistance = (km) => {
  if (km === null || km === undefined) return '—'
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

export const initialsOf = (name) => {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const formatDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d)) return '—'
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
}

export const formatShortDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d)) return '—'
  return `${d.getDate()} ${monthNames[d.getMonth()]}`
}

export const timeAgo = (iso) => {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  const now = Date.now()
  const days = Math.round((now - then) / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.round(days / 7)} weeks ago`
  if (days < 365) return `${Math.round(days / 30)} months ago`
  return `${Math.round(days / 365)} years ago`
}

export const foodLabel = (food) => {
  if (!food || food.length === 0) return 'No food'
  if (food.includes('Both')) return 'Veg & Non-veg'
  return food.join(', ')
}
