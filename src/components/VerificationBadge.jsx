import { ShieldCheck } from 'lucide-react'

export default function VerificationBadge({ inline = false, label = 'Verified' }) {
  return (
    <span className={`verify-badge${inline ? ' inline' : ''}`}>
      <ShieldCheck size={13} />
      {label}
    </span>
  )
}