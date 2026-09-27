import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, Menu, X, Heart, GitCompare, Bell, User, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import Modal from './Modal.jsx'
import { timeAgo } from '../utils/formatters.js'

function BrandLogo() {
  return (
    <Link to="/" className="brand" aria-label="Nestora home">
      <span className="brand-mark"><Home size={17} strokeWidth={2.4} /></span>
      Nestora
    </Link>
  )
}

export default function Navbar() {
  const { user, logout, saved, compare, notifications, markNotificationsRead } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()
  const unread = notifications.filter((n) => !n.read).length

  const openNotif = () => {
    setNotifOpen(true)
    markNotificationsRead()
  }

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <BrandLogo />

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/explore" className="nav-link">Explore</NavLink>
          {user ? (
            <>
              <NavLink to="/saved" className="nav-link">Saved</NavLink>
              <NavLink to="/roommates" className="nav-link">Roommates</NavLink>
              <NavLink to="/owner" className="nav-link">For owners</NavLink>
            </>
          ) : (
            <>
              <a href="/#how" className="nav-link">How it works</a>
              <NavLink to="/owner" className="nav-link">For owners</NavLink>
              <NavLink to="/roommates" className="nav-link">Roommates</NavLink>
            </>
          )}
        </nav>

        <div className="nav-actions">
          <button className="btn-icon nav-icon-btn" onClick={openNotif} aria-label="Notifications">
            <Bell size={18} />
            {unread > 0 && <span className="nav-count-dot">{unread}</span>}
          </button>
          <Link to="/compare" className="btn-icon nav-icon-btn" aria-label="Compare" title="Compare">
            <GitCompare size={18} />
            {compare.length > 0 && <span className="nav-count-dot">{compare.length}</span>}
          </Link>
          {user ? (
            <div className="nav-desktop-actions row gap-2">
              <Link to="/saved" className="btn-icon" aria-label="Saved">
                <Heart size={18} />
              </Link>
              <Link to="/profile" className="btn btn-ghost btn-sm">
                <User size={16} /> {user.name.split(' ')[0]}
              </Link>
            </div>
          ) : (
            <div className="nav-desktop-actions row gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Get started</Link>
            </div>
          )}
          <button className="btn-icon nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()} style={{ top: 0, bottom: 'auto', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
            <div className="drawer-head">
              <BrandLogo />
              <button className="btn-icon" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button>
            </div>
            <div className="drawer-body" style={{ paddingBlock: 'var(--space-4)' }}>
              <nav className="stack gap-1" onClick={() => setMenuOpen(false)}>
                <Link className="nav-link" to="/explore">Explore</Link>
                <Link className="nav-link" to="/saved">Saved</Link>
                <Link className="nav-link" to="/compare">Compare</Link>
                <Link className="nav-link" to="/roommates">Roommates</Link>
                <Link className="nav-link" to="/bookings">My enquiries</Link>
                <Link className="nav-link" to="/owner">For owners</Link>
                {user && <Link className="nav-link" to="/profile">Profile</Link>}
              </nav>
              <div className="divider" style={{ margin: 'var(--space-4) 0' }} />
              {user ? (
                <button className="btn btn-ghost btn-block" onClick={handleLogout}><LogOut size={16} /> Sign out</button>
              ) : (
                <div className="stack gap-2" onClick={() => setMenuOpen(false)}>
                  <Link to="/login" className="btn btn-ghost btn-block">Log in</Link>
                  <Link to="/signup" className="btn btn-primary btn-block">Get started</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifications">
        {notifications.length === 0 ? (
          <p className="muted text-sm">No notifications yet. Save a place or request a visit and updates will show up here.</p>
        ) : (
          <div className="stack gap-3">
            {notifications.map((n) => (
              <div key={n.id} className="row gap-3" style={{ alignItems: 'flex-start' }}>
                <span className="ai" style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--color-accent-soft)', color: 'var(--color-accent-strong)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Bell size={15} />
                </span>
                <div>
                  <div className="text-sm">{n.text}</div>
                  <div className="text-xs muted">{timeAgo(n.date)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </header>
  )
}
