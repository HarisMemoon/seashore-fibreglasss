"use client";

import { SERVICE_AREA_MAP_POINTS } from "@seashore/content";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const shoreBounds = L.latLngBounds(
  SERVICE_AREA_MAP_POINTS.map((p) => [p.lat, p.lng] as [number, number])
);

export default function ServiceAreasMapInner() {
  return (
    <MapContainer
      bounds={shoreBounds}
      boundsOptions={{ padding: [28, 28] }}
      scrollWheelZoom
      className="z-0 h-full min-h-[280px] w-full"
      style={{ minHeight: 280 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {SERVICE_AREA_MAP_POINTS.map((p) => (
        <CircleMarker
          key={p.slug}
          center={[p.lat, p.lng]}
          radius={9}
          pathOptions={{
            color: "#1B3A5C",
            fillColor: "#2A7DA6",
            fillOpacity: 0.92,
            weight: 2,
          }}
        >
          <Popup>
            <div className="min-w-[140px] text-slate-800">
              <p className="font-semibold text-navy">{p.townName}</p>
              <Link href={`/service-areas/${p.slug}`} className="mt-1 inline-block text-sm font-medium text-turquoise underline">
                View area page
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
