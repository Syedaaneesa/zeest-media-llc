'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const hotspots = [
  { id: 1, name: 'New York', lat: 40.7128, lng: -74.0060, readers: '45K' },
  { id: 2, name: 'London', lat: 51.5074, lng: -0.1278, readers: '32K' },
  { id: 3, name: 'Singapore', lat: 1.3521, lng: 103.8198, readers: '28K' },
  { id: 4, name: 'Dubai', lat: 25.2048, lng: 55.2708, readers: '15K' },
  { id: 5, name: 'Tokyo', lat: 35.6762, lng: 139.6503, readers: '22K' },
  { id: 6, name: 'Sydney', lat: -33.8688, lng: 151.2093, readers: '12K' },
  { id: 7, name: 'Los Angeles', lat: 34.0522, lng: -118.2437, readers: '38K' },
  { id: 8, name: 'Frankfurt', lat: 50.1109, lng: 8.6821, readers: '18K' },
  { id: 9, name: 'Mumbai', lat: 19.0760, lng: 72.8777, readers: '25K' },
  { id: 10, name: 'São Paulo', lat: -23.5505, lng: -46.6333, readers: '14K' },
];

function AnimatedMarkers() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      {hotspots.map((spot) => (
        <CircleMarker
          key={spot.id}
          center={[spot.lat, spot.lng]}
          pathOptions={{
            radius: 12,
            fillColor: '#D34586',
            fillOpacity: 0.7,
            color: '#D34586',
            weight: 2,
          }}
        >
          <Popup>
            <div className="text-center">
              <p className="font-bold text-[#0B163F]">{spot.name}</p>
              <p className="text-[#D34586] font-semibold">
                {spot.readers} readers
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

export default function WorldMapLeafletClient() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[#0B163F] rounded-3xl p-6 lg:p-8 relative overflow-hidden"
    >
      <h3 className="text-xl font-bold text-white mb-6">
        Global Readership Distribution
      </h3>

      <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden">
        <MapContainer
          center={new LatLng(20, 0)}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom
          className="rounded-2xl z-10"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <AnimatedMarkers />
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6">
        {hotspots.slice(0, 5).map((spot) => (
          <div key={spot.id} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#D34586]" />
            <span className="text-white/70 text-sm">
              {spot.name}: {spot.readers}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
