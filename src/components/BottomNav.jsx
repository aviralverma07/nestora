import { NavLink } from 'react-router-dom'
import { Search, Heart, GitCompare, Users, User } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const items = [
  { to: '/explore', label: 'Explore', icon: Search },
  { to: '/saved', label: 'Saved', icon: Heart, badgeKey: 'saved' },
  { to: '/compare', label: 'Compare', icon: GitCompare, badgeKey: 'compare' },
  { to: '/roommates', label: 'Roommates', icon: Users },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const { saved, compare } = useApp()
  const badges = { saved: saved.length, compare: compare.length }
  return (
    <nav className="bottom-nav" aria-label="Mobile">
      <div className="bottom-nav-inner">
        {items.map(({ to, label, icon: Icon, badgeKey }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `bn-item${isActive ? ' active' : ''}`}>
            <Icon size={20} />
            {label}
            {badgeKey && badges[badgeKey] > 0 && <span className="bn-badge">{badges[badgeKey]}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
