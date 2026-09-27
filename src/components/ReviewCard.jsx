import { Star, BadgeCheck } from 'lucide-react'
import { initialsOf, timeAgo } from '../utils/formatters.js'

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-head">
        <span className="avatar">{initialsOf(review.name)}</span>
        <div className="grow">
          <div className="review-name row gap-1">
            {review.name}
            {review.verifiedStudent && <BadgeCheck size={14} color="var(--color-accent)" title="Verified student" />}
          </div>
          <div className="review-sub">{review.course} · {timeAgo(review.date)}</div>
        </div>
        <span className="rating">
          <Star size={13} strokeWidth={0} />
          {review.rating.toFixed(1)}
        </span>
      </div>
      <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>{review.text}</p>
    </div>
  )
}