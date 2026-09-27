import { useState, useMemo } from 'react'
import { Users, SlidersHorizontal, MessageSquare, Check, RefreshCw } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { roommates } from '../data/roommates.js'
import { calculateCompatibility } from '../utils/matching.js'
import { initialsOf } from '../utils/formatters.js'

const CITIES = ['Roorkee', 'Dehradun', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Jaipur']
const QUESTIONS = [
  { key: 'sleepSchedule', label: 'Your daily rhythm', options: ['Early riser', 'Night owl', 'Flexible'] },
  { key: 'food', label: 'Food preference', options: ['Vegetarian', 'Non-vegetarian', 'Both'] },
  { key: 'cleanliness', label: 'How tidy are you?', options: ['Very tidy', 'Moderately tidy', 'Relaxed'] },
  { key: 'studyHabits', label: 'Study style', options: ['Quiet study', 'Music while working', 'Group study'] },
  { key: 'social', label: 'Social energy', options: ['Homebody', 'Balanced', 'Very social'] },
  { key: 'smoking', label: 'Smoking', options: ['Non-smoker', 'Occasional', 'Smoker'] },
]

const emptyProfile = {
  budget: 10000, area: 'Delhi', sleepSchedule: '', food: '', cleanliness: '',
  studyHabits: '', social: '', smoking: '',
}

const ringColor = (s) => (s >= 75 ? 'var(--color-accent)' : s >= 50 ? '#c98a1a' : '#9aa0a6')

export default function Roommates() {
  const { roommateProfile, setRoommateProfile, addToast } = useApp()
  const [profile, setProfile] = useState(() => roommateProfile || emptyProfile)
  const [editing, setEditing] = useState(!roommateProfile)

  const ready = QUESTIONS.every((q) => profile[q.key])

  const matches = useMemo(() => {
    if (!roommateProfile) return []
    return roommates
      .map((r) => ({ ...r, compat: calculateCompatibility(roommateProfile, r) }))
      .sort((a, b) => b.compat.score - a.compat.score)
  }, [roommateProfile])

  const save = () => {
    setRoommateProfile(profile)
    setEditing(false)
    addToast('Preferences saved — here are your matches')
  }

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>Find a roommate</h1>
          <p className="muted">Match on budget, routine and lifestyle with students looking in your city.</p>
        </div>
        {roommateProfile && !editing && (
          <button className="btn btn-soft btn-sm" onClick={() => setEditing(true)}><RefreshCw size={15} /> Edit preferences</button>
        )}
      </div>

      {editing ? (
        <div className="quiz">
          <div className="quiz-row">
            <label className="field">
              <span>Your monthly budget</span>
              <input className="input" type="number" value={profile.budget} onChange={(e) => setProfile({ ...profile, budget: Number(e.target.value) })} />
            </label>
            <label className="field">
              <span>City</span>
              <select className="select" value={profile.area} onChange={(e) => setProfile({ ...profile, area: e.target.value })}>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>

          {QUESTIONS.map((q) => (
            <div className="quiz-q" key={q.key}>
              <h4>{q.label}</h4>
              <div className="choice-grid">
                {q.options.map((o) => (
                  <button
                    key={o}
                    className={`choice${profile[q.key] === o ? ' active' : ''}`}
                    onClick={() => setProfile({ ...profile, [q.key]: o })}
                  >
                    {profile[q.key] === o && <Check size={14} />} {o}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button className="btn btn-accent btn-lg" disabled={!ready} onClick={save}>
            <Users size={17} /> See my matches
          </button>
          {!ready && <p className="muted text-sm">Answer every question to see your compatibility scores.</p>}
        </div>
      ) : (
        <div className="roommate-grid">
          {matches.map((r) => (
            <article className="roommate-card" key={r.id}>
              <div className="rm-head">
                <span className="avatar avatar-lg">{initialsOf(r.firstName)}</span>
                <div className="grow">
                  <strong>{r.firstName}, {r.age}</strong>
                  <div className="text-xs muted">{r.occupation} · {r.city}</div>
                </div>
                <div className="compat-ring" style={{ '--ring': ringColor(r.compat.score) }}>
                  <span>{r.compat.score}%</span>
                </div>
              </div>
              <p className="rm-bio">{r.bio}</p>
              <div className="rm-tags">
                <span className="tag">{r.sleepSchedule}</span>
                <span className="tag">{r.food}</span>
                <span className="tag">{r.cleanliness}</span>
                <span className="tag">₹{r.budget.toLocaleString('en-IN')}</span>
              </div>
              {r.compat.reasons.length > 0 && (
                <ul className="rm-reasons">
                  {r.compat.reasons.map((x, i) => <li key={i}><Check size={13} /> {x}</li>)}
                </ul>
              )}
              <button className="btn btn-soft btn-block btn-sm" onClick={() => addToast(`Connection request sent to ${r.firstName}`)}>
                <MessageSquare size={15} /> Connect
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
