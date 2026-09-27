import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const AppContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    void 0
  }
}

let toastSeq = 0

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => load('nestora_user', null))
  const [saved, setSaved] = useState(() => load('nestora_saved', []))
  const [compare, setCompare] = useState(() => load('nestora_compare', []))
  const [preferences, setPreferences] = useState(() => load('nestora_prefs', null))
  const [roommateProfile, setRoommateProfile] = useState(() => load('nestora_roommate', null))
  const [enquiries, setEnquiries] = useState(() => load('nestora_enquiries', []))
  const [notifications, setNotifications] = useState(() => load('nestora_notifications', []))
  const [recentlyViewed, setRecentlyViewed] = useState(() => load('nestora_recent', []))
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  useEffect(() => save('nestora_user', user), [user])
  useEffect(() => save('nestora_saved', saved), [saved])
  useEffect(() => save('nestora_compare', compare), [compare])
  useEffect(() => save('nestora_prefs', preferences), [preferences])
  useEffect(() => save('nestora_roommate', roommateProfile), [roommateProfile])
  useEffect(() => save('nestora_enquiries', enquiries), [enquiries])
  useEffect(() => save('nestora_notifications', notifications), [notifications])
  useEffect(() => save('nestora_recent', recentlyViewed), [recentlyViewed])

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastSeq
    setToasts((t) => [...t, { id, message, type }])
    timers.current[id] = setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
      delete timers.current[id]
    }, 3200)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const pushNotification = useCallback((text) => {
    setNotifications((n) => [{ id: Date.now(), text, date: new Date().toISOString(), read: false }, ...n].slice(0, 30))
  }, [])

  const markNotificationsRead = useCallback(() => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })))
  }, [])

  const login = useCallback((profile) => {
    const u = { name: profile.name || 'Aarav Sharma', email: profile.email, role: profile.role || 'student' }
    setUser(u)
    addToast(`Welcome back, ${u.name.split(' ')[0]}`)
  }, [addToast])

  const signup = useCallback((profile) => {
    const u = { name: profile.name, email: profile.email, role: profile.role || 'student' }
    setUser(u)
    addToast('Your account is ready')
  }, [addToast])

  const logout = useCallback(() => {
    setUser(null)
    addToast('Signed out')
  }, [addToast])

  const toggleSave = useCallback((id) => {
    setSaved((s) => {
      if (s.includes(id)) {
        addToast('Removed from saved')
        return s.filter((x) => x !== id)
      }
      addToast('Saved to your list')
      pushNotification('You saved a place to your shortlist.')
      return [...s, id]
    })
  }, [addToast, pushNotification])

  const isSaved = useCallback((id) => saved.includes(id), [saved])

  const toggleCompare = useCallback((id) => {
    let ok = true
    setCompare((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id)
      if (c.length >= 4) {
        ok = false
        return c
      }
      return [...c, id]
    })
    if (!ok) addToast('You can compare up to 4 places', 'error')
    else addToast('Updated comparison')
  }, [addToast])

  const isComparing = useCallback((id) => compare.includes(id), [compare])
  const clearCompare = useCallback(() => setCompare([]), [])

  const addEnquiry = useCallback((property, kind) => {
    const entry = {
      id: Date.now(),
      propertyId: property.id,
      propertyName: property.name,
      city: property.city,
      image: property.images[0],
      rent: property.rent,
      kind,
      status: kind === 'visit' ? 'Visit requested' : 'Enquiry sent',
      date: new Date().toISOString(),
    }
    setEnquiries((e) => [entry, ...e])
    pushNotification(
      kind === 'visit'
        ? `Your visit request was sent to ${property.name}.`
        : `Your enquiry was sent to ${property.name}.`
    )
  }, [pushNotification])

  const recordView = useCallback((id) => {
    setRecentlyViewed((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8))
  }, [])

  const value = {
    user, login, signup, logout,
    saved, toggleSave, isSaved,
    compare, toggleCompare, isComparing, clearCompare,
    preferences, setPreferences,
    roommateProfile, setRoommateProfile,
    enquiries, addEnquiry,
    notifications, pushNotification, markNotificationsRead,
    recentlyViewed, recordView,
    toasts, addToast, dismissToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
