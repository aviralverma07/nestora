import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Home, User, Mail, Lock, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })

  const submit = (e) => {
    e.preventDefault()
    signup({ name: form.name, email: form.email, role: form.role })
    navigate(form.role === 'owner' ? '/owner' : '/explore')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-panel">
        <Link to="/" className="auth-logo"><span className="logo-mark"><Home size={18} /></span> Nestora</Link>
        <h1>Create your account</h1>
        <p className="muted">Join to save places, compare stays and find a roommate.</p>

        <div className="role-toggle">
          <button className={form.role === 'student' ? 'active' : ''} onClick={() => setForm({ ...form, role: 'student' })}>I’m a student</button>
          <button className={form.role === 'owner' ? 'active' : ''} onClick={() => setForm({ ...form, role: 'owner' })}>I’m an owner</button>
        </div>

        <form onSubmit={submit} className="form-stack">
          <label className="field">
            <span>Full name</span>
            <div className="input-icon">
              <User size={16} />
              <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
          </label>
          <label className="field">
            <span>Email</span>
            <div className="input-icon">
              <Mail size={16} />
              <input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@college.edu" />
            </div>
          </label>
          <label className="field">
            <span>Password</span>
            <div className="input-icon">
              <Lock size={16} />
              <input className="input" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Create a password" />
            </div>
          </label>
          <button type="submit" className="btn btn-accent btn-lg btn-block">Create account <ArrowRight size={16} /></button>
        </form>

        <p className="auth-alt">Already have an account? <Link to="/login" className="link-accent">Sign in</Link></p>
        <p className="muted text-xs auth-demo">Demo mode — your details stay on this device.</p>
      </div>
      <div className="auth-visual">
        <div className="auth-quote">
          <blockquote>Compare verified stays, skip the broker calls, move in with confidence.</blockquote>
          <span>— The Nestora way</span>
        </div>
      </div>
    </div>
  )
}
