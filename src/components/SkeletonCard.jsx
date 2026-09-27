export default function SkeletonCard() {
  return (
    <div className="skel-card" aria-hidden="true">
      <div className="skel skel-media" />
      <div className="skel skel-line" style={{ width: '60%', marginTop: 14 }} />
      <div className="skel skel-line" style={{ width: '40%' }} />
      <div className="skel skel-line" style={{ width: '80%' }} />
      <div className="skel skel-line" style={{ width: '35%', marginBottom: 16 }} />
    </div>
  )
}