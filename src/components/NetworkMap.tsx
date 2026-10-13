import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ExternalLink, Sparkles, Info } from 'lucide-react';
import { Community } from '../data/communities';

interface NetworkMapProps {
  communities: Community[];
  onSelectCommunity: (community: Community) => void;
  selectedCommunityId?: string | null;
  hoveredCommunityId?: string | null;
  searchQuery?: string;
  filterStatus?: 'all' | 'active' | 'prospective';
  resetKey?: number;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({
  communities,
  onSelectCommunity,
  selectedCommunityId,
  hoveredCommunityId,
  searchQuery = '',
  filterStatus = 'all',
  resetKey = 0,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedPin, setSelectedPin] = useState<Community | null>(communities[0] || null);

  useEffect(() => {
    if (resetKey > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.setView([25, 0], 2);
    }
  }, [resetKey]);

  const filteredCommunities = useMemo(() => {
    return communities.filter((c) => {
      // Status filter
      if (filterStatus === 'active' && c.status !== 'active') return false;
      if (filterStatus === 'prospective' && c.status === 'active') return false;

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchName = c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q);
      const matchDesc =
        c.description.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q);
      const matchCategory = c.category.toLowerCase().includes(q);
      const matchDomains = c.domains.some((d) => d.toLowerCase().includes(q));
      const matchInstitutes = c.institutes.some((inst) => inst.toLowerCase().includes(q));
      const matchCoordinators = c.coordinators.some(
        (coord) =>
          coord.name.toLowerCase().includes(q) || coord.affiliation.toLowerCase().includes(q)
      );
      const matchCityCountry =
        c.coordinates.city.toLowerCase().includes(q) ||
        c.coordinates.country.toLowerCase().includes(q) ||
        c.countryCodes.some((code) => code.toLowerCase().includes(q));

      return (
        matchName ||
        matchDesc ||
        matchCategory ||
        matchDomains ||
        matchInstitutes ||
        matchCoordinators ||
        matchCityCountry
      );
    });
  }, [communities, filterStatus, searchQuery]);

  // If selected pin is no longer in filtered list, select the first matching one
  useEffect(() => {
    if (filteredCommunities.length > 0) {
      if (!selectedPin || !filteredCommunities.some((c) => c.id === selectedPin.id)) {
        setSelectedPin(filteredCommunities[0]);
      }
    } else {
      setSelectedPin(null);
    }
  }, [filteredCommunities, selectedPin]);

  // Synchronize with external community selection or hover
  useEffect(() => {
    const targetId = hoveredCommunityId || selectedCommunityId;
    if (targetId) {
      const match = communities.find((c) => c.id === targetId);
      if (match) {
        setSelectedPin(match);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([match.coordinates.lat, match.coordinates.lng], 5, {
            duration: 0.8,
            easeLinearity: 0.25,
          });
        }
      }
    }
  }, [hoveredCommunityId, selectedCommunityId, communities]);

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [25, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true,
        zoomControl: false,
        attributionControl: false,
      });

      // Esri World Light Gray Canvas: High performance, clean light theme, free, zero API key required
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 16,
          attribution: 'Tiles &copy; Esri',
        }
      ).addTo(map);

      // Subtle reference labels layer (country/city boundaries and names)
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 16,
          attribution: '',
        }
      ).addTo(map);

      // Add Zoom control to top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Layer group to hold community markers
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when filtered communities or selectedPin changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    filteredCommunities.forEach((community) => {
      const isSelected = selectedPin?.id === community.id;
      const isActive = community.status === 'active';
      const isOnboarding = community.status === 'onboarding';

      const solidColor = isActive ? '#10b981' : isOnboarding ? '#06b6d4' : '#f59e0b';

      const ringColor = isActive
        ? 'rgba(16, 185, 129, 0.55)'
        : isOnboarding
          ? 'rgba(6, 182, 212, 0.55)'
          : 'rgba(245, 158, 11, 0.55)';

      // Custom pulsing HTML Marker Icon with active radar rings
      const customIcon = L.divIcon({
        className: 'custom-community-marker',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div class="marker-ping-ring" style="background-color: ${ringColor};"></div>
            <div class="marker-ping-ring-delayed" style="background-color: ${ringColor};"></div>
            <div style="
              position: relative;
              z-index: 10;
              width: ${isSelected ? '18px' : '14px'};
              height: ${isSelected ? '18px' : '14px'};
              border-radius: 9999px;
              background-color: ${solidColor};
              border: ${isSelected ? '3px solid #ffffff' : '2px solid #ffffff'};
              box-shadow: 0 0 ${isSelected ? '10px' : '6px'} ${ringColor}, 0 2px 6px rgba(0,0,0,0.3);
              transition: all 0.2s ease;
            "></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([community.coordinates.lat, community.coordinates.lng], {
        icon: customIcon,
        title: community.name,
      });

      marker.on('click', () => {
        setSelectedPin(community);
      });

      marker.addTo(markersLayer);
    });
  }, [filteredCommunities, selectedPin]);

  return (
    <div className="relative w-full" data-cy="network-map">
      {/* Immersive Leaflet Map Canvas Container */}
      <div className="relative aspect-[21/9] min-h-[540px] w-full overflow-hidden rounded-3xl sm:min-h-[600px] lg:min-h-[680px]">
        <div ref={mapContainerRef} className="immersive-map z-0 h-full w-full" />

        {/* Ambient Edge Vignettes - seamlessly melt the map into the slate-50 background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-32 bg-gradient-to-b from-slate-50 via-slate-50/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-slate-50 via-slate-50/85 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-28 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent sm:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-28 bg-gradient-to-l from-slate-50 via-slate-50/70 to-transparent sm:w-44" />
        <div className="pointer-events-none absolute inset-0 z-[4] [background:radial-gradient(ellipse_at_center,transparent_45%,#f8fafc_90%)]" />

        {/* Selected Community Floating Quick-Card */}
        {selectedPin && (
          <div className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl border border-slate-200 bg-white/95 p-5 text-slate-900 shadow-2xl backdrop-blur-xl transition-all duration-200 sm:right-auto sm:max-w-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      selectedPin.status === 'active'
                        ? 'bg-emerald-500'
                        : selectedPin.status === 'onboarding'
                          ? 'bg-cyan-500'
                          : 'bg-amber-500'
                    }`}
                  />
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    {selectedPin.name}
                  </h3>
                </div>
                <div className="mt-0.5 flex items-center space-x-1.5 text-xs text-slate-500">
                  <MapPin className="h-3 w-3 text-[#7e56c2]" />
                  <span>
                    {selectedPin.coordinates.city}, {selectedPin.coordinates.country}
                  </span>
                  <span>•</span>
                  <span>{selectedPin.category}</span>
                </div>
              </div>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  selectedPin.status === 'active'
                    ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                    : selectedPin.status === 'onboarding'
                      ? 'border border-cyan-200 bg-cyan-50 text-cyan-700'
                      : 'border border-amber-200 bg-amber-50 text-amber-700'
                }`}
              >
                {selectedPin.status}
              </span>
            </div>

            <p className="mt-2 line-clamp-2 text-xs text-slate-600">{selectedPin.description}</p>

            {/* Quick Metrics */}
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-2 text-center text-xs">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-1.5">
                <div className="font-bold text-[#7e56c2]">
                  {selectedPin.stats.subjectsCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Subjects</div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-1.5">
                <div className="font-bold text-purple-700">{selectedPin.stats.datasetsCount}</div>
                <div className="text-[10px] text-slate-500">Datasets</div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-1.5">
                <div className="font-bold text-emerald-700">{selectedPin.stats.nodesCount}</div>
                <div className="text-[10px] text-slate-500">Nodes</div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="mt-3 flex items-center justify-between gap-2">
              {selectedPin.portalUrl && selectedPin.status === 'active' ? (
                <a
                  href={selectedPin.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-[#7e56c2] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#6c45b0]"
                >
                  <span>Launch Query Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectCommunity(selectedPin)}
                  className="inline-flex flex-1 items-center justify-center space-x-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                >
                  <Sparkles className="h-3 w-3 text-amber-600" />
                  <span>Onboarding / Prospective Details</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onSelectCommunity(selectedPin)}
                className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                More Info
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span>Active Live Federation</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
            <span>Onboarding Nodes</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Prospective Working Group</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-slate-500">
          <Info className="h-3.5 w-3.5" />
          <span>
            Interactive map: Pan and zoom with mouse or controls. Click marker to inspect details.
          </span>
        </div>
      </div>
    </div>
  );
};
