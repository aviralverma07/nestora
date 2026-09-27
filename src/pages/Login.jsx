import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Home, Mail, Lock, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [form, setForm] = useState({ email: '', password: '', role: 'student' })

  const submit = (e) => {
    e.preventDefault()
    login({ name: form.role === 'owner' ? 'Rohan Mehta' : 'Aarav Sharma', email: form.email, role: form.role })
    navigate(form.role === 'owner' ? '/owner' : '/explore')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-panel">
        <Link to="/" className="auth-logo"><span className="logo-mark"><Home size={18} /></span> Nestora</Link>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to save places, track enquiries and get matched.</p>

        <div className="role-toggle">
          <button className={form.role === 'student' ? 'active' : ''} onClick={() => setForm({ ...form, role: 'student' })}>I’m a student</button>
          <button className={form.role === 'owner' ? 'active' : ''} onClick={() => setForm({ ...form, role: 'owner' })}>I’m an owner</button>
        </div>

        <form onSubmit={submit} className="form-stack">
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
              <input className="input" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>
          </label>
          <button type="submit" className="btn btn-accent btn-lg btn-block">Sign in <ArrowRight size={16} /></button>
        </form>

        <p className="auth-alt">New to Nestora? <Link to="/signup" className="link-accent">Create an account</Link></p>
        <p className="muted text-xs auth-demo">Demo mode — any email and password will sign you in.</p>
      </div>
      <div className="auth-visual">
        <div className="auth-quote">
          <blockquote>Nestora made finding a place near campus feel simple and safe.</blockquote>
          <span>— Students across 7 cities</span>
        </div>
      </div>
    </div>
  )
}
