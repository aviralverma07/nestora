import { Check, Sparkles } from 'lucide-react'

export default function MatchScore({ score, reasons = [] }) {
  return (
    <div className="matchbox">
      <div className="matchbox-head">
        <span className="matchbox-score">{score}%</span>
        <div>
          <div className="row gap-1" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
            <Sparkles size={15} color="var(--color-accent)" /> Nestora Match
          </div>
          <div className="text-xs muted">How well this fits what you asked for</div>
        </div>
      </div>
      <div className="meter" style={{ marginTop: 'var(--space-3)' }}>
        <span style={{ width: `${score}%` }} />
      </div>
      {reasons.length > 0 && (
        <ul className="matchbox-reasons">
          {reasons.map((r, i) => (
            <li key={i}>
              <Check size={15} /> {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
