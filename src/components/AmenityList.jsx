import {
  Wifi, Snowflake, WashingMachine, Zap, Sparkles, Car, BookOpen,
  Bath, Shirt, ShieldCheck, UserCheck, Fingerprint, Camera, Dot,
} from 'lucide-react'

export const amenityIcon = (name) => {
  const map = {
    'Wi-Fi': Wifi,
    AC: Snowflake,
    'Washing Machine': WashingMachine,
    'Power Backup': Zap,
    Housekeeping: Sparkles,
    Parking: Car,
    'Study Table': BookOpen,
    'Attached Bathroom': Bath,
    Laundry: Shirt,
    CCTV: Camera,
    Warden: UserCheck,
    'Biometric Entry': Fingerprint,
    'Security Guard': ShieldCheck,
  }
  return map[name] || Dot
}

export default function AmenityList({ items = [], all = null }) {
  const list = all || items
  return (
    <div className="amen-grid">
      {list.map((name) => {
        const Icon = amenityIcon(name)
        const off = all ? !items.includes(name) : false
        return (
          <div key={name} className={`amen-item${off ? ' off' : ''}`}>
            <span className="ai"><Icon size={17} /></span>
            <span>{name}</span>
          </div>
        )
      })}
    </div>
  )
}
