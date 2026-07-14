"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type MarkerType = "medical" | "supplies" | "user";

interface MapMarkerData {
  lat: number;
  lng: number;
  type: MarkerType;
  label: string;
}

interface LeafletMapProps {
  activeTab: "medical" | "supplies";
}

/* ── Inline SVG for custom markers ─────────────────────────────────── */
function buildMarkerSvg(type: MarkerType): string {
  const colorMap: Record<MarkerType, string> = {
    medical: "#FF8A80",
    supplies: "#4DD0E1",
    user: "#00ACC1",
  };
  const color = colorMap[type];

  if (type === "user") {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="10" cy="10" r="3" fill="white"/>
      </svg>`;
  }

  const icon =
    type === "medical"
      ? `<path d="M8 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M8 15a6 6 0 0 0 12 0v-3" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="scale(0.62) translate(3,3)"/><circle cx="13" cy="6.5" r="1.3" stroke="white" stroke-width="1.6" fill="none" transform="scale(0.62) translate(3,3)"/>`
      : `<path d="M10.5 6a3 3 0 0 1-6 0" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M3 4.5h9" stroke="white" stroke-width="1.6" stroke-linecap="round" fill="none"/><path d="M3.2 4a1.5 1.5 0 0 0-.3.9V13a1.5 1.5 0 0 0 1.5 1.5h6A1.5 1.5 0 0 0 12 13V4.9a1.5 1.5 0 0 0-.3-.9L10.5 2.6A1.5 1.5 0 0 0 9.3 2H5.7a1.5 1.5 0 0 0-1.2.6z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="52" viewBox="0 0 42 52">
    <defs><filter id="ms" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="${color}" flood-opacity="0.35"/></filter></defs>
    <path d="M21 2C10.5 2 2 10.5 2 21 2 34 21 50 21 50S40 34 40 21C40 10.5 31.5 2 21 2Z" fill="${color}" filter="url(#ms)"/>
    <circle cx="21" cy="21" r="12" fill="white" opacity="0.15"/>
    <svg x="9" y="9" width="24" height="24" viewBox="0 0 24 24">${icon}</svg>
  </svg>`;
}

/* ── Locations ──────────────────────────────────────────────────────── */
const clinicLocations: MapMarkerData[] = [
  { lat: 51.515, lng: -0.090, type: "medical",  label: "Central Vet" },
  { lat: 51.507, lng: -0.075, type: "medical",  label: "PetCare" },
  { lat: 51.522, lng: -0.105, type: "medical",  label: "Wellness" },
];
const shopLocations: MapMarkerData[] = [
  { lat: 51.512, lng: -0.110, type: "supplies", label: "Premium Pets" },
  { lat: 51.504, lng: -0.086, type: "supplies", label: "PetWorld" },
  { lat: 51.519, lng: -0.095, type: "supplies", label: "Essentials" },
];
const userLocation = { lat: 51.513, lng: -0.092 };

/* ═══════════════════════ COMPONENT ════════════════════════════════════ */
export default function LeafletMap({ activeTab }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  /* ── Init once ────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current) return;

      // If Leaflet already initialised this element, remove the stale instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existing = (containerRef.current as any)._leaflet_id;
      if (existing) return; // already mounted (StrictMode double-invoke guard)

      const map = L.map(containerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: true,
      });

      // Clean, light CartoDB Positron tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { attribution: "© OpenStreetMap contributors © CARTO", subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      mapRef.current = map;

      // User "you are here" marker
      const userIcon = L.divIcon({
        html: `<div style="filter:drop-shadow(0 0 8px rgba(0,172,193,0.6))">${buildMarkerSvg("user")}</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: "",
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .bindTooltip("You are here", { permanent: false, direction: "top", className: "vet-tooltip" })
        .addTo(map);

      // Draw initial tab markers
      drawMarkers(L, map, activeTab);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Swap markers on tab change ───────────────────────────────────── */
  useEffect(() => {
    if (!mapRef.current) return;
    (async () => {
      const L = (await import("leaflet")).default;
      if (mapRef.current) drawMarkers(L, mapRef.current, activeTab);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  /* ── Helper ───────────────────────────────────────────────────────── */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function drawMarkers(L: any, map: any, tab: "medical" | "supplies") {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const locations = tab === "medical" ? clinicLocations : shopLocations;

    locations.forEach((loc) => {
      const icon = L.divIcon({
        html: buildMarkerSvg(loc.type),
        iconSize: [42, 52],
        iconAnchor: [21, 52],
        popupAnchor: [0, -54],
        className: "",
      });

      const marker = L.marker([loc.lat, loc.lng], { icon })
        .bindPopup(
          `<div style="font-family:inherit;min-width:120px;padding:2px 0">
            <strong style="color:#004D40;font-size:13px">${loc.label}</strong>
            <p style="margin:4px 0 0;font-size:11px;color:#546E7A">
              ${tab === "medical" ? "Veterinary Clinic" : "Pet Supply Shop"}
            </p>
          </div>`,
          { offset: [0, -50], closeButton: false }
        )
        .addTo(map);

      markersRef.current.push(marker);
    });
  }

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px]">
      {/* Leaflet renders into this div */}
      <div ref={containerRef} className="absolute inset-0 rounded-3xl" />

      {/* Custom zoom controls */}
      <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/90 text-[#546E7A] backdrop-blur-sm transition-all hover:text-[#004D40] hover:bg-white shadow-sm hover:shadow-md"
          aria-label="Zoom in"
        >
          <span className="text-lg font-medium leading-none">+</span>
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/90 text-[#546E7A] backdrop-blur-sm transition-all hover:text-[#004D40] hover:bg-white shadow-sm hover:shadow-md"
          aria-label="Zoom out"
        >
          <span className="text-lg font-medium leading-none">−</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-white/60 bg-white/90 px-4 py-3 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF8A80]" />
            <span className="text-xs text-[#546E7A]">Clinic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#4DD0E1]" />
            <span className="text-xs text-[#546E7A]">Shop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-[#00ACC1] bg-[#00ACC1]/50" />
            <span className="text-xs text-[#546E7A]">You</span>
          </div>
        </div>
      </div>

      <style>{`
        .vet-tooltip {
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(0,172,193,0.25);
          border-radius: 8px;
          color: #004D40;
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(0,172,193,0.18);
          padding: 4px 10px;
        }
        .vet-tooltip::before { display: none; }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          border: 1px solid rgba(0,172,193,0.18);
          box-shadow: 0 8px 32px rgba(0,172,193,0.15);
          background: rgba(255,255,255,0.97);
          padding: 10px 14px;
        }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-control-attribution {
          font-size: 9px;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(4px);
          border-radius: 6px 0 0 0;
        }
        .leaflet-attribution-flag { display: none !important; }
      `}</style>
    </div>
  );
}
