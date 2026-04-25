'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OFFICES = [
  { city: 'Paris', label: 'Siège social', lat: 48.8566, lng: 2.3522, primary: true },
  { city: 'Toulouse', label: 'Bureau Sud-Ouest', lat: 43.6047, lng: 1.4442 },
  { city: 'Montpellier', label: 'Bureau Sud', lat: 43.6108, lng: 3.8767 },
  { city: 'Clermont-Ferrand', label: 'Bureau Centre', lat: 45.7772, lng: 3.087 },
];

// Centre approximatif des 3 bureaux (barycentre visuel France)
const CENTER: [number, number] = [46.2, 2.6];

export default function LeafletMap() {
  return (
    <MapContainer
      center={CENTER}
      zoom={5}
      minZoom={4}
      maxZoom={9}
      scrollWheelZoom={false}
      dragging={true}
      zoomControl={true}
      attributionControl={true}
      className="h-full w-full"
      style={{ background: 'var(--bg)' }}
    >
      {/* CARTO Voyager — fond propre, lisible en dark + light, attribution OSM visible */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains={['a', 'b', 'c', 'd']}
        maxZoom={20}
      />
      {OFFICES.map((o) => (
        <CircleMarker
          key={o.city}
          center={[o.lat, o.lng]}
          radius={o.primary ? 11 : 9}
          pathOptions={{
            color: 'var(--accent)',
            fillColor: 'var(--accent)',
            fillOpacity: 0.9,
            weight: 2,
          }}
        >
          <Popup>
            <strong>{o.city}</strong>
            <br />
            {o.label}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
