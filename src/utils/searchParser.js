const parseAmount = (raw) => {
  let s = raw.toLowerCase().replace(/[₹,\s]/g, '')
  const kMatch = s.match(/(\d+(?:\.\d+)?)k/)
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000)
  const n = parseInt(s.replace(/[^\d]/g, ''), 10)
  return isNaN(n) ? null : n
}

export const parseNaturalLanguageSearch = (input) => {
  const result = {}
  if (!input) return result
  const text = input.toLowerCase()

  const budgetPatterns = [
    /(?:under|below|budget|upto|up to|max|around|rs\.?)\s*₹?\s*(\d[\d,]*\.?\d*\s*k?)/,
    /₹\s*(\d[\d,]*\.?\d*\s*k?)/,
    /(\d[\d,]*\.?\d*\s*k)\b/,
  ]
  for (const p of budgetPatterns) {
    const m = text.match(p)
    if (m) {
      const amt = parseAmount(m[1])
      if (amt && amt >= 1000) {
        result.budget = amt
        break
      }
    }
  }

  const distMatch = text.match(/(?:within|under|below)?\s*(\d+(?:\.\d+)?)\s*(?:km|kilomet)/)
  if (distMatch) result.maxDistance = parseFloat(distMatch[1])

  if (/non[-\s]?veg|non[-\s]?vegetarian/.test(text)) result.food = 'non-vegetarian'
  else if (/\bveg\b|vegetarian/.test(text)) result.food = 'vegetarian'

  const amenities = []
  if (/wi[-\s]?fi|internet/.test(text)) amenities.push('Wi-Fi')
  if (/\bac\b|air[-\s]?condition/.test(text)) amenities.push('AC')
  if (/laundry/.test(text)) amenities.push('Laundry')
  if (/washing machine/.test(text)) amenities.push('Washing Machine')
  if (/parking/.test(text)) amenities.push('Parking')
  if (/power backup|inverter|generator/.test(text)) amenities.push('Power Backup')
  if (/study table|study desk/.test(text)) amenities.push('Study Table')
  if (/cctv|camera/.test(text)) amenities.push('CCTV')
  if (/housekeeping|cleaning/.test(text)) amenities.push('Housekeeping')
  if (/attached (?:bath|washroom|toilet)/.test(text)) amenities.push('Attached Bathroom')
  if (amenities.length) result.amenities = amenities

  if (/\bgirls?\b|\bfemale\b|women/.test(text)) result.gender = 'Female'
  else if (/\bboys?\b|\bmale\b|\bmen\b/.test(text)) result.gender = 'Male'
  else if (/co[-\s]?living|unisex|mixed/.test(text)) result.gender = 'Co-living'

  if (/1\s?bhk|one bhk/.test(text)) result.type = '1BHK'
  else if (/hostel/.test(text)) result.type = 'Hostel'
  else if (/shared room/.test(text)) result.type = 'Shared room'
  else if (/private room/.test(text)) result.type = 'Private room'
  else if (/\bpg\b/.test(text)) result.type = 'PG'

  if (/available now|move in now|immediately/.test(text)) result.availableNow = true
  if (/verified/.test(text)) result.verifiedOnly = true

  const nearMatch = input.match(/near\s+([a-z0-9\s.]+?)(?:,|\.|$|\swith|\sunder|\swithin|\sfor)/i)
  if (nearMatch) result.query = nearMatch[1].trim()

  return result
}

export const describePreferences = (prefs) => {
  const chips = []
  if (prefs.query) chips.push({ key: 'query', label: `Near ${prefs.query}` })
  if (prefs.budget) chips.push({ key: 'budget', label: `₹${prefs.budget.toLocaleString('en-IN')} max` })
  if (prefs.maxDistance) chips.push({ key: 'maxDistance', label: `Within ${prefs.maxDistance} km` })
  if (prefs.food) chips.push({ key: 'food', label: prefs.food === 'vegetarian' ? 'Vegetarian' : prefs.food === 'non-vegetarian' ? 'Non-vegetarian' : 'Any food' })
  if (prefs.type) chips.push({ key: 'type', label: prefs.type })
  if (prefs.gender) chips.push({ key: 'gender', label: prefs.gender })
  if (prefs.amenities) prefs.amenities.forEach((a) => chips.push({ key: `amenity:${a}`, label: a }))
  if (prefs.verifiedOnly) chips.push({ key: 'verifiedOnly', label: 'Verified only' })
  if (prefs.availableNow) chips.push({ key: 'availableNow', label: 'Available now' })
  return chips
}
