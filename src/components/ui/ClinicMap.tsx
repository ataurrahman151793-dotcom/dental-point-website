'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pulsingIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;">
      <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(47,93,82,0.3);animation:locpulse 2s ease-in-out infinite;"></div>
      <div style="position:absolute;width:20px;height:20px;border-radius:50%;background:#2F5D52;border:3px solid #C8E0D6;"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const CLINIC_LATLNG: [number, number] = [26.139001, 91.789896];

export default function ClinicMap() {
  return (
    <>
      <style>{`
        @keyframes locpulse {
          0%,100%{transform:scale(1);opacity:0.8}
          50%{transform:scale(1.8);opacity:0}
        }
        .leaflet-container { background: #0d1a13; }
      `}</style>
      <MapContainer
        center={CLINIC_LATLNG}
        zoom={14}
        style={{ height: '100%', width: '100%', minHeight: '280px' }}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={CLINIC_LATLNG} icon={pulsingIcon} />
      </MapContainer>
    </>
  );
}
