import React, { useState, useEffect, useId } from 'react';
import { Property, formatNaira, ASSET_IMAGES } from '../data/properties';
import { MapPin, ShieldCheck, ArrowUpRight, Compass } from 'lucide-react';

interface AbujaInteractiveMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (prop: Property) => void;
  activeDistrict?: string;
  height?: string;
}

const DISTRICT_NODES: Record<string, { x: number; y: number; label: string; tag: string }> = {
  'Katampe Extension': { x: 22, y: 24, label: 'Katampe Extension', tag: 'Diplomatic Hills' },
  'Maitama': { x: 50, y: 30, label: 'Maitama', tag: "Ministers' Quarters" },
  'Wuse II': { x: 26, y: 56, label: 'Wuse II', tag: 'Metropolitan Core' },
  'Asokoro': { x: 76, y: 44, label: 'Asokoro', tag: 'Presidential Ridge' },
  'Guzape': { x: 58, y: 74, label: 'Guzape', tag: 'FHA Diplomatic Zone' }
};

function getPropertyCanvasPosition(prop: Property, indexInDistrict: number): { x: number; y: number } {
  const base = DISTRICT_NODES[prop.district] || { x: 50, y: 50 };
  const offsets = [
    { dx: 0, dy: 0 },
    { dx: 7, dy: -6 },
    { dx: -7, dy: 6 },
    { dx: 6, dy: 6 }
  ];
  const offset = offsets[indexInDistrict % offsets.length];
  return {
    x: Math.min(86, Math.max(14, base.x + offset.dx)),
    y: Math.min(72, Math.max(18, base.y + offset.dy))
  };
}

export const AbujaInteractiveMap: React.FC<AbujaInteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  activeDistrict,
  height = '520px'
}) => {
  const patternId = useId();
  const filteredProperties = activeDistrict && activeDistrict !== 'All'
    ? properties.filter(p => p.district === activeDistrict)
    : properties;

  const [activePinId, setActivePinId] = useState<string | null>(
    filteredProperties[0]?.id || properties[0]?.id || null
  );

  // Synchronize active preview pin whenever district filter changes
  useEffect(() => {
    if (filteredProperties.length > 0) {
      const stillVisible = filteredProperties.some((p) => p.id === activePinId);
      if (!stillVisible) {
        setActivePinId(filteredProperties[0].id);
      }
    }
  }, [activeDistrict, filteredProperties, activePinId]);

  const activeProperty =
    filteredProperties.find(p => p.id === activePinId) ||
    (selectedProperty && filteredProperties.some(p => p.id === selectedProperty.id) ? selectedProperty : null) ||
    filteredProperties[0] ||
    properties[0];

  const handlePinClick = (prop: Property) => {
    setActivePinId(prop.id);
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden glass-card flex flex-col justify-between"
      style={{ minHeight: height }}
    >
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 bg-[#121316]/75 backdrop-blur-md border-b border-white/15 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
              Abuja District Radar
            </span>
            <span className="font-serif text-sm font-bold text-white">
              Prime Corridor Navigator
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#A0A4B0]">
          <span className="text-[#E8E3D9]">{filteredProperties.length} Verified Listings</span>
          <span aria-hidden="true">·</span>
          <span>5 Prime Corridors</span>
        </div>
      </div>

      {/* Main Architectural Map Canvas */}
      <div className="relative flex-1 w-full min-h-[380px] sm:min-h-[440px] bg-[#101215] overflow-hidden p-6 select-none">
        {/* Subtle Architectural Grid Lines & Contour Rings */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C5A880" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            <circle cx="50%" cy="44%" r="38%" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
            <circle cx="50%" cy="44%" r="24%" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
            <circle cx="50%" cy="44%" r="10%" fill="none" stroke="#C5A880" strokeWidth="1" opacity="0.8" />
          </svg>
        </div>

        {/* Landmark Accents */}
        <div className="absolute top-6 right-8 text-right opacity-35 pointer-events-none">
          <div className="font-serif text-xs uppercase tracking-widest text-[#C5A880]">Aso Rock Ridge</div>
          <div className="text-[10px] text-[#A0A4B0]">Presidential Protected Zone</div>
        </div>

        <div className="hidden sm:block absolute bottom-6 left-6 opacity-35 pointer-events-none">
          <div className="font-serif text-xs uppercase tracking-widest text-[#C5A880]">Central Ring</div>
          <div className="text-[10px] text-[#A0A4B0]">Shehu Shagari Way Axis</div>
        </div>

        {/* District Region Outlines & Labels */}
        {Object.entries(DISTRICT_NODES).map(([distName, node]) => {
          const isActiveDist = !activeDistrict || activeDistrict === 'All' || activeDistrict === distName;
          return (
            <div
              key={distName}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 text-center transition-opacity duration-300 ${
                isActiveDist ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className="w-24 h-24 rounded-full border border-[#C5A880]/15 bg-[#C5A880]/5 mx-auto -mb-14" />
              <span className="font-serif text-xs font-semibold tracking-wider text-[#A0A4B0]/90 uppercase block">
                {distName}
              </span>
              <span className="text-[9px] text-[#C5A880]/70 block">{node.tag}</span>
            </div>
          );
        })}

        {/* Interactive Property Markers */}
        {filteredProperties.map((prop, idx) => {
          const pos = getPropertyCanvasPosition(prop, idx);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <button
              type="button"
              key={prop.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => handlePinClick(prop)}
              className={`absolute cursor-pointer transition-transform duration-200 -translate-x-1/2 -translate-y-full focus:outline-none ${
                isSelected ? 'scale-110 z-30' : 'z-20 hover:scale-105'
              }`}
            >
              <div className={`px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xl border flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-[#C5A880] text-[#121316] border-white font-bold ring-4 ring-[#C5A880]/30'
                  : 'bg-[#181A1F]/90 backdrop-blur-md text-[#F4F0E8] border-white/15 hover:border-[#C5A880]'
              }`}>
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#121316]' : 'text-[#C5A880]'}`} />
                <span className="tabular-nums">{formatNaira(prop.priceNaira)}</span>
              </div>

              <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] mx-auto ${
                isSelected ? 'border-t-[#C5A880]' : 'border-t-[#181A1F]'
              }`} />
            </button>
          );
        })}

        {/* Active Property Frosted Glass Preview Card */}
        {activeProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 glass-panel rounded-2xl p-3.5 z-40 text-xs">
            <div className="flex gap-3">
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-[#121316] border border-white/15">
                <img
                  src={activeProperty.images[0]}
                  alt={activeProperty.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = ASSET_IMAGES.hero;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-[#121316]/85 backdrop-blur-sm text-[9px] px-1.5 py-0.5 rounded text-[#C5A880]">
                  {activeProperty.district}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-white text-xs truncate leading-snug">
                  {activeProperty.title}
                </h4>
                <div className="text-[11px] text-[#A0A4B0] mt-0.5 truncate">
                  {activeProperty.locationDetail}
                </div>
                <div className="font-serif text-sm font-bold text-[#C5A880] mt-1 tabular-nums">
                  {formatNaira(activeProperty.priceNaira)}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
              <span className="text-[10px] text-[#A0A4B0]">
                {activeProperty.bedrooms} Beds · {activeProperty.bathrooms} Baths
              </span>

              {onSelectProperty && (
                <button
                  type="button"
                  onClick={() => onSelectProperty(activeProperty)}
                  className="px-3 py-1 rounded-lg bg-[#C5A880] text-[#121316] font-semibold text-xs hover:bg-[#D4AF37] transition-colors glass-btn-gold flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="p-3 sm:p-4 bg-[#121316]/75 backdrop-blur-md border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs text-[#A0A4B0]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Maitama, Asokoro, Guzape, Katampe Extension & Wuse II</span>
        </div>
        <div className="text-[#C5A880] font-mono text-[11px]">Abuja FCT Coordinates</div>
      </div>
    </div>
  );
};
