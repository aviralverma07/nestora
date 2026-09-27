export const calculateMatchScore = (property, preferences = {}) => {
  const reasons = []
  let score = 0

  if (preferences.budget) {
    const b = preferences.budget
    if (property.rent <= b) {
      score += 30
      reasons.push('Within your budget')
    } else {
      const over = (property.rent - b) / b
      if (over <= 0.15) {
        score += 20
        reasons.push('Just over your budget')
      } else if (over <= 0.35) {
        score += 10
      }
    }
  } else {
    score += 30
  }

  if (preferences.maxDistance) {
    const d = property.distanceFromCollege
    if (d <= preferences.maxDistance) {
      score += 25
      reasons.push(`${d.toFixed(1)} km from your location`)
    } else {
      const ratio = preferences.maxDistance / d
      score += Math.round(25 * Math.max(0, ratio))
    }
  } else {
    score += 25
    if (property.distanceFromCollege <= 2) reasons.push(`Close by, ${property.distanceFromCollege.toFixed(1)} km away`)
  }

  if (preferences.food) {
    const pref = preferences.food.toLowerCase()
    const pf = property.food.map((f) => f.toLowerCase())
    const matched =
      (pref === 'vegetarian' && (pf.includes('vegetarian') || pf.includes('both'))) ||
      (pref === 'non-vegetarian' && (pf.includes('non-vegetarian') || pf.includes('both'))) ||
      (pref === 'both')
    if (matched) {
      score += 15
      reasons.push(pref === 'vegetarian' ? 'Vegetarian food available' : 'Food preference matches')
    }
  } else {
    score += 15
  }

  if (preferences.amenities && preferences.amenities.length) {
    const have = preferences.amenities.filter((a) =>
      property.amenities.some((pa) => pa.toLowerCase() === a.toLowerCase())
    )
    const frac = have.length / preferences.amenities.length
    score += Math.round(15 * frac)
    if (frac === 1) reasons.push(`All requested amenities: ${preferences.amenities.join(', ')}`)
    else if (have.length) reasons.push(`Has ${have.join(', ')}`)
  } else {
    score += 15
  }

  score += Math.round((property.rating / 5) * 10)
  if (property.rating >= 4.4) reasons.push(`Highly rated at ${property.rating}`)

  if (property.verified) {
    score += 5
    reasons.push('Verified owner')
  }

  score = Math.max(0, Math.min(100, Math.round(score)))
  return { score, reasons: reasons.slice(0, 5) }
}

const same = (a, b) => a && b && a === b

export const calculateCompatibility = (profile, roommate) => {
  if (!profile) return { score: 0, reasons: [] }
  const reasons = []
  let score = 0

  if (profile.budget && roommate.budget) {
    const diff = Math.abs(profile.budget - roommate.budget)
    if (diff <= 1500) {
      score += 20
      reasons.push('Similar budget')
    } else if (diff <= 3500) {
      score += 12
    } else if (diff <= 6000) {
      score += 6
    }
  }

  if (same(profile.area, roommate.city)) {
    score += 10
    reasons.push(`Both looking in ${roommate.city}`)
  }

  if (same(profile.sleepSchedule, roommate.sleepSchedule)) {
    score += 15
    reasons.push('Similar sleep schedule')
  } else if (profile.sleepSchedule === 'Flexible' || roommate.sleepSchedule === 'Flexible') {
    score += 8
  }

  if (same(profile.food, roommate.food)) {
    score += 15
    reasons.push('Same food preference')
  } else if (profile.food === 'Both' || roommate.food === 'Both') {
    score += 8
  }

  if (same(profile.cleanliness, roommate.cleanliness)) {
    score += 15
    reasons.push('Matching tidiness habits')
  } else {
    score += 6
  }

  if (same(profile.studyHabits, roommate.studyHabits)) {
    score += 10
    reasons.push('Similar study style')
  } else {
    score += 4
  }

  if (same(profile.social, roommate.social)) {
    score += 10
    reasons.push('Similar social energy')
  } else {
    score += 4
  }

  if (same(profile.smoking, roommate.smoking)) {
    score += 5
    if (roommate.smoking === 'Non-smoker') reasons.push('Both non-smokers')
  }

  score = Math.max(0, Math.min(100, Math.round(score)))
  return { score, reasons: reasons.slice(0, 4) }
}
