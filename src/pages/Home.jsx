import { Link } from 'react-router-dom'
import {
  ShieldCheck, Sparkles, Map, Users, SlidersHorizontal, MessageSquare,
  Star, ArrowRight, BadgeCheck, Search,
} from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import PropertyGrid from '../components/PropertyGrid.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { properties } from '../data/properties.js'
import { featuredCities, popularSearches } from '../data/locations.js'

const featured = [...properties].sort((a, b) => b.rating - a.rating).slice(0, 6)

const features = [
  { icon: Sparkles, title: 'Search in plain English', text: 'Type what you want the way you’d say it and Nestora turns it into filters instantly.' },
  { icon: ShieldCheck, title: 'Verified listings', text: 'Owner details and photos are checked, so what you see is what you get.' },
  { icon: Map, title: 'See it on the map', text: 'Compare distance to campus, markets and transport before you visit.' },
  { icon: Users, title: 'Find a roommate', text: 'Match on budget, routine and habits to share a place with someone you’ll get along with.' },
]

const steps = [
  { n: 1, title: 'Tell us what you need', text: 'Budget, distance, food and the amenities that matter to you.' },
  { n: 2, title: 'Compare real options', text: 'Browse verified stays with honest photos, reviews and a match score.' },
  { n: 3, title: 'Visit and move in', text: 'Request a visit or enquire directly, then book the room you like.' },
]

const testimonials = [
  { name: 'Ishita Rane', course: 'M.Sc, Pune', text: 'I found a vegetarian PG ten minutes from campus in an afternoon. The match score actually lined up with what I cared about.' },
  { name: 'Dhruv Malhotra', course: 'B.Tech, Roorkee', text: 'Being able to compare four places side by side made the decision easy. No back and forth with random brokers.' },
  { name: 'Fatima Sheikh', course: 'BBA, Delhi', text: 'The roommate matching paired me with someone on the same schedule. We’ve been sharing a flat since.' },
]

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow"><BadgeCheck size={15} /> Trusted by students across 7 cities</span>
            <h1>Student housing that actually fits your life.</h1>
            <p className="hero-lead">
              PGs, hostels and shared flats near your campus — verified, honestly priced and easy to compare.
              Tell Nestora what you need and skip the endless group chats.
            </p>
            <SearchBar variant="hero" />
            <div className="hero-popular">
              <span className="muted text-sm">Popular:</span>
              {popularSearches.map((s) => (
                <Link key={s.label} to={`/explore?q=${encodeURIComponent(s.landmark)}`} className="chip">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-row">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <span className="feature-ic"><f.icon size={20} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Top-rated stays this week</h2>
              <p className="muted">Hand-picked places students are loving right now.</p>
            </div>
            <Link to="/explore" className="link-accent row gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <PropertyGrid properties={featured} className="card-grid" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <h2>How Nestora works</h2>
            <p className="muted">Three simple steps from search to move-in.</p>
          </div>
          <div className="steps">
            {steps.map((s) => (
              <div className="step" key={s.n}>
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Explore by city</h2>
              <p className="muted">Find stays in the cities students search most.</p>
            </div>
          </div>
          <div className="loc-grid">
            {featuredCities.map((c) => (
              <Link key={c.id} to={`/explore?q=${encodeURIComponent(c.name)}`} className="loc-card">
                <SmartImage src={c.image} alt={c.name} />
                <div className="loc-overlay">
                  <h3>{c.name}</h3>
                  <span>{c.count} stays</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-cta">
            <div className="split-copy">
              <span className="hero-eyebrow"><Users size={15} /> Roommate matching</span>
              <h2>Don’t just find a room. Find the right person to share it with.</h2>
              <p className="muted">
                Answer a few questions about your budget, routine and habits. Nestora scores how compatible
                you are with others looking in the same city, so you can share with confidence.
              </p>
              <Link to="/roommates" className="btn btn-primary btn-lg">
                Find a roommate <ArrowRight size={16} />
              </Link>
            </div>
            <div className="split-visual">
              <div className="mini-match">
                <div className="row spread">
                  <strong>Compatibility</strong>
                  <span className="rating"><Star size={13} strokeWidth={0} /> 92%</span>
                </div>
                <div className="meter"><span style={{ width: '92%' }} /></div>
                <ul className="mini-reasons">
                  <li><SlidersHorizontal size={14} /> Similar budget</li>
                  <li><MessageSquare size={14} /> Same food preference</li>
                  <li><ShieldCheck size={14} /> Both non-smokers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item"><ShieldCheck size={22} /><h3>Verified owners</h3><p>Identity and listing details are checked before a place goes live.</p></div>
            <div className="trust-item"><Star size={22} /><h3>Honest reviews</h3><p>Ratings come from students who actually stayed, not paid promotions.</p></div>
            <div className="trust-item"><Search size={22} /><h3>No broker spam</h3><p>Enquire directly with owners. No middlemen, no surprise fees.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <h2>What students say</h2>
            <p className="muted">Real experiences from people who found their place on Nestora.</p>
          </div>
          <div className="testi-grid">
            {testimonials.map((t) => (
              <figure className="testi" key={t.name}>
                <div className="rating" style={{ marginBottom: 'var(--space-3)' }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} strokeWidth={0} />)}
                </div>
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span className="muted">{t.course}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="final-cta">
            <h2>Ready to find your place?</h2>
            <p>Start with a search or list your property if you’re an owner.</p>
            <div className="row gap-3 wrap" style={{ justifyContent: 'center' }}>
              <Link to="/explore" className="btn btn-accent btn-lg">Browse stays</Link>
              <Link to="/owner" className="btn btn-ghost btn-lg">List your property</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
