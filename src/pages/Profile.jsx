import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Heart, GitCompare, MessageSquare, LogOut, Eye, Pencil, Check } from 'lucide-react'
import SmartImage from '../components/SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getPropertyById } from '../data/properties.js'
import { initialsOf, formatCurrency } from '../utils/formatters.js'

export default function Profile() {
  const { user, login, logout, saved, compare, enquiries, recentlyViewed, roommateProfile } = useApp()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user ? user.name : '')

  if (!user) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-ic"><User size={26} /></div>
          <h3>Sign in to see your profile</h3>
          <p className="muted">Save places, track enquiries and get personalised matches.</p>
          <Link to="/login" className="btn btn-primary">Sign in</Link>
        </div>
      </div>
    )
  }

  const recent = recentlyViewed.map(getPropertyById).filter(Boolean)
  const saveName = () => {
    login({ name: name || user.name, email: user.email, role: user.role })
    setEditing(false)
  }

  return (
    <div className="container section">
      <div className="profile-layout">
        <aside className="profile-card">
          <span className="avatar avatar-xl">{initialsOf(user.name)}</span>
          {editing ? (
            <div className="stack gap-2" style={{ width: '100%' }}>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
              <button className="btn btn-accent btn-sm btn-block" onClick={saveName}><Check size={15} /> Save</button>
            </div>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p className="muted text-sm">{user.email}</p>
              <span className="tag tag-accent" style={{ marginTop: 8 }}>{user.role === 'owner' ? 'Property owner' : 'Student'}</span>
              <button className="btn btn-soft btn-sm" style={{ marginTop: 'var(--space-4)' }} onClick={() => { setName(user.name); setEditing(true) }}>
                <Pencil size={14} /> Edit name
              </button>
            </>
          )}
          <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 'var(--space-3)' }} onClick={logout}>
            <LogOut size={15} /> Sign out
          </button>
        </aside>

        <div className="profile-main">
          <div className="stat-row">
            <Link to="/saved" className="stat">
              <span className="stat-ic"><Heart size={18} /></span>
              <strong>{saved.length}</strong>
              <span className="muted text-sm">Saved</span>
            </Link>
            <Link to="/compare" className="stat">
              <span className="stat-ic"><GitCompare size={18} /></span>
              <strong>{compare.length}</strong>
              <span className="muted text-sm">Comparing</span>
            </Link>
            <Link to="/bookings" className="stat">
              <span className="stat-ic"><MessageSquare size={18} /></span>
              <strong>{enquiries.length}</strong>
              <span className="muted text-sm">Enquiries</span>
            </Link>
          </div>

          {roommateProfile && (
            <section className="panel">
              <h3>Roommate preferences</h3>
              <div className="rm-tags">
                <span className="tag">{roommateProfile.area}</span>
                <span className="tag">{formatCurrency(roommateProfile.budget)}</span>
                {roommateProfile.sleepSchedule && <span className="tag">{roommateProfile.sleepSchedule}</span>}
                {roommateProfile.food && <span className="tag">{roommateProfile.food}</span>}
                {roommateProfile.cleanliness && <span className="tag">{roommateProfile.cleanliness}</span>}
              </div>
              <Link to="/roommates" className="link-accent text-sm">Update preferences</Link>
            </section>
          )}

          <section className="panel">
            <div className="row spread">
              <h3>Recently viewed</h3>
              <Eye size={16} className="muted" />
            </div>
            {recent.length === 0 ? (
              <p className="muted text-sm">Places you view will show up here.</p>
            ) : (
              <div className="recent-row">
                {recent.map((p) => (
                  <Link key={p.id} to={`/property/${p.id}`} className="recent-card">
                    <SmartImage src={p.images[0]} alt={p.name} />
                    <div className="recent-info">
                      <strong>{p.name}</strong>
                      <span className="text-xs muted">{p.locality} · {formatCurrency(p.rent)}/mo</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
