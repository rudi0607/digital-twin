import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export const MapView = ({ earthquakes, hotZones }) => (
  <section className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
    <MapContainer center={[20, 0]} zoom={2} className="h-[420px] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {earthquakes.slice(0, 120).map((q) => {
        const [lng, lat] = q.coordinates.coordinates;
        return (
          <Marker key={q.usgsId} position={[lat, lng]} icon={markerIcon}>
            <Popup>
              <p className="font-semibold">{q.place}</p>
              <p>Magnitude: {q.magnitude}</p>
              <p>{new Date(q.time).toLocaleString()}</p>
            </Popup>
          </Marker>
        );
      })}

      {(hotZones || []).map((zone) => (
        <Circle
          key={zone.key}
          center={[zone.lat, zone.lng]}
          radius={70000}
          pathOptions={{ color: '#ef4444', fillOpacity: 0.2 }}
        >
          <Popup>
            Risk Zone Intensity: <strong>{zone.intensity}</strong>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  </section>
);
