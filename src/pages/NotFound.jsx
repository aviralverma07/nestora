import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container section">
      <div className="notfound">
        <span className="notfound-code">404</span>
        <h1>We couldn’t find that page</h1>
        <p className="muted">The link may be broken or the place you’re looking for has moved.</p>
        <div className="row gap-3 wrap" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg"><Home size={16} /> Go home</Link>
          <Link to="/explore" className="btn btn-ghost btn-lg"><Compass size={16} /> Explore stays</Link>
        </div>
      </div>
    </div>
  )
}
