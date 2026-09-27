import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import { formatCurrency, formatDistance } from '../utils/formatters.js'

const priceLabel = (rent) => `₹${(rent / 1000).toFixed(rent % 1000 === 0 ? 0 : 1)}k`

const makeIcon = (rent, selected) =>
  L.divIcon({
    className: 'price-marker-wrap',
    html: `<div class="price-marker${selected ? ' selected' : ''}">${priceLabel(rent)}</div>`,
    iconSize: [50, 26],
    iconAnchor: [25, 13],
  })

function Recenter({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, zoom ?? map.getZoom(), { animate: true })
  }, [center, zoom, map])
  return null
}

export default function MapView({ properties, center, zoom = 13, selectedId, onSelect }) {
  const first = properties[0]
  const mapCenter = center || (first ? [first.latitude, first.longitude] : [28.6139, 77.209])

  return (
    <div className="map-shell" style={{ height: '100%', minHeight: 320 }}>
      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter center={center} zoom={zoom} />
        {properties.map((p) => (
          <Marker
            key={p.id}
            position={[p.latitude, p.longitude]}
            icon={makeIcon(p.rent, selectedId === p.id)}
            eventHandlers={{ click: () => onSelect && onSelect(p.id) }}
          >
            <Popup>
              <div className="map-popup-card">
                <Link to={`/property/${p.id}`}>
                  <SmartImage src={p.images[0]} alt={p.name} />
                </Link>
                <h5>{p.name}</h5>
                <div className="text-xs muted">{p.locality} · {formatDistance(p.distanceFromCollege)}</div>
                <div className="row spread" style={{ marginTop: 6 }}>
                  <strong>{formatCurrency(p.rent)}/mo</strong>
                  <Link to={`/property/${p.id}`} className="link-accent text-xs">View</Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
