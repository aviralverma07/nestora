import { useApp } from '../context/AppContext.jsx'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function ToastHost() {
  const { toasts } = useApp()
  if (!toasts.length) return null
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast${t.type === 'error' ? ' err' : ''}`}>
          <span className="ticon">
            {t.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  )
}
