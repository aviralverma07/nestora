import { Link } from 'react-router-dom'
import { Home, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

const columns = [
  {
    title: 'Explore',
    links: [
      ['Search stays', '/explore'],
      ['Map view', '/explore'],
      ['Compare places', '/compare'],
      ['Saved', '/saved'],
    ],
  },
  {
    title: 'For students',
    links: [
      ['Roommate matching', '/roommates'],
      ['My enquiries', '/bookings'],
      ['How it works', '/#how'],
      ['Trust & safety', '/#trust'],
    ],
  },
  {
    title: 'For owners',
    links: [
      ['List your property', '/owner/add-property'],
      ['Owner dashboard', '/owner'],
      ['Verification', '/#trust'],
      ['Pricing', '/owner'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/'],
      ['Careers', '/'],
      ['Support', '/'],
      ['Legal', '/'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer" id="trust">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand" style={{ color: '#fff' }}>
              <span className="brand-mark"><Home size={17} strokeWidth={2.4} /></span>
              Nestora
            </Link>
            <p>Find verified PGs, hostels and rooms near your college or workplace, without the endless searching.</p>
          </div>
          {columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map(([label, to]) => (
                <Link to={to} key={label}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Nestora. A demo product built for portfolios and learning.</span>
          <div className="footer-social">
            <a href="/" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="/" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="/" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="/" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
