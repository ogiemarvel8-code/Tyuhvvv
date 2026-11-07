import React, { useState } from 'react';
import { Property, formatNaira, formatUSD } from '../data/properties';
import { MapPin, ShieldCheck, ArrowUpRight, Bed, Bath, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

interface AbujaInteractiveMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (prop: Property) => void;
  activeDistrict?: string;
  height?: string;
}

// Visual layout coordinates for Abuja Prime Districts on our bespoke architectural map canvas (percentage 0-100)
const DISTRICT_NODES: Record<string, { x: number; y: number; label: string; tag: string }> = {
  'Katampe Extension': { x: 22, y: 22, label: 'Katampe Extension', tag: 'Diplomatic Hills · Elevated Plateau' },
  'Maitama': { x: 50, y: 32, label: 'Maitama', tag: "Ministers' Quarters · Sovereign Axis" },
  'Wuse II': { x: 30, y: 55, label: 'Wuse II', tag: 'Metropolitan Core · Luxury Penthouses' },
  'Asokoro': { x: 75, y: 48, label: 'Asokoro', tag: 'Presidential Ridge · Aso Rock Vistas' },
  'Guzape': { x: 62, y: 78, label: 'Guzape', tag: 'Asokoro Extension · Modern Mansions' }
};

// Map property pins to relative coordinates on our canvas based on their district and index
function getPropertyCanvasPosition(prop: Property, index: number): { x: number; y: number } {
  const base = DISTRICT_NODES[prop.district] || { x: 50, y: 50 };
  // Small deterministic offset so multiple properties in same district don't overlap completely
  const offsets = [
    { dx: 0, dy: 0 },
    { dx: 6, dy: -4 },
    { dx: -5, dy: 6 },
    { dx: 7, dy: 5 },
    { dx: -6, dy: -5 }
  ];
  const offset = offsets[index % offsets.length];
  return {
    x: Math.min(90, Math.max(10, base.x + offset.dx)),
    y: Math.min(90, Math.max(12, base.y + offset.dy))
  };
}

export const AbujaInteractiveMap: React.FC<AbujaInteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  activeDistrict,
  height = '520px'
}) => {
  const [activePinId, setActivePinId] = useState<string | null>(properties[0]?.id || null);

  const filteredProperties = activeDistrict && activeDistrict !== 'All'
    ? properties.filter(p => p.district === activeDistrict)
    : properties;

  const activeProperty = properties.find(p => p.id === activePinId) || selectedProperty || filteredProperties[0];

  const handlePinClick = (prop: Property) => {
    setActivePinId(prop.id);
    if (onSelectProperty) {
      onSelectProperty(prop);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#2A2D35] bg-[#14161A] shadow-2xl flex flex-col justify-between" style={{ minHeight: height }}>
      
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 bg-[#121316] border-b border-[#252830] flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
              Bespoke District Radar
            </span>
            <span className="font-serif text-sm font-bold text-white">
              Abuja Prime Corridor Navigator
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#A0A4B0]">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[#E8E3D9]">{filteredProperties.length} Properties Pinned</span>
          <span>·</span>
          <span>5 Sovereign Zones</span>
        </div>
      </div>

      {/* Main Architectural Map Canvas */}
      <div className="relative flex-1 w-full min-h-[380px] sm:min-h-[440px] bg-[#121316] overflow-hidden p-6 select-none">
        
        {/* Subtle Architectural Grid Lines & Contour Rings */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C5A880" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Concentric topographic rings representing Abuja's rolling topography */}
            <circle cx="50%" cy="45%" r="38%" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
            <circle cx="50%" cy="45%" r="24%" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
            <circle cx="50%" cy="45%" r="10%" fill="none" stroke="#C5A880" strokeWidth="1" opacity="0.8" />
          </svg>
        </div>

        {/* Landmark Accents in Background */}
        <div className="absolute top-8 right-10 text-right opacity-30 pointer-events-none">
          <div className="font-serif text-xs uppercase tracking-widest text-[#C5A880]">Aso Rock Geological Ridge</div>
          <div className="text-[10px] text-[#A0A4B0]">Presidential Protected Zone</div>
        </div>

        <div className="absolute bottom-8 left-8 opacity-30 pointer-events-none">
          <div className="font-serif text-xs uppercase tracking-widest text-[#C5A880]">Federal Capital Central Ring</div>
          <div className="text-[10px] text-[#A0A4B0]">Shehu Shagari Way Axis</div>
        </div>

        {/* District Region Outlines & Badges */}
        {Object.entries(DISTRICT_NODES).map(([distName, node]) => (
          <div
            key={distName}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 text-center"
          >
            <div className="w-24 h-24 rounded-full border border-[#C5A880]/15 bg-[#C5A880]/5 mx-auto -mb-14" />
            <span className="font-serif text-xs font-semibold tracking-wider text-[#A0A4B0]/80 uppercase block">
              {distName}
            </span>
            <span className="text-[9px] text-[#C5A880]/60 block">{node.tag.split('·')[0]}</span>
          </div>
        ))}

        {/* Interactive Property Markers */}
        {filteredProperties.map((prop, idx) => {
          const pos = getPropertyCanvasPosition(prop, idx);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => handlePinClick(prop)}
              className={`absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-full z-20 group ${
                isSelected ? 'scale-115 z-40' : 'hover:scale-110'
              }`}
            >
              {/* Pin Pill with Price */}
              <div className={`px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xl border flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#C5A880] text-[#121316] border-white font-bold ring-4 ring-[#C5A880]/30 shadow-[#C5A880]/30'
                  : 'bg-[#181A1F] text-[#F4F0E8] border-[#383D48] hover:border-[#C5A880] hover:text-white'
              }`}>
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#121316]' : 'text-[#C5A880]'}`} />
                <span>{formatNaira(prop.priceNaira)}</span>
              </div>

              {/* Pin Arrow Pointer */}
              <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] mx-auto transition-colors ${
                isSelected ? 'border-t-[#C5A880]' : 'border-t-[#181A1F]'
              }`} />
            </div>
          );
        })}

        {/* Active Property Preview Card overlay inside canvas */}
        {activeProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-[#181A1F]/95 backdrop-blur-md rounded-2xl border border-[#383D48] p-3.5 shadow-2xl z-30 transition-all text-xs">
            <div className="flex gap-3">
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-black">
                <img
                  src={activeProperty.images[0]}
                  alt={activeProperty.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = '/images/hero_abuja_luxury_villa_1794063269976.jpg';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-[#121316]/80 text-[9px] px-1.5 py-0.5 rounded text-[#C5A880]">
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
                <div className="font-serif text-sm font-bold text-[#C5A880] mt-1">
                  {formatNaira(activeProperty.priceNaira)}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#252830] flex items-center justify-between">
              <span className="text-[10px] text-[#A0A4B0]">
                {activeProperty.bedrooms} Beds · {activeProperty.bathrooms} Baths
              </span>

              {onSelectProperty && (
                <button
                  onClick={() => onSelectProperty(activeProperty)}
                  className="px-3 py-1 rounded-lg bg-[#C5A880] text-[#121316] font-semibold text-xs hover:bg-[#D4AF37] transition-all flex items-center gap-1"
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
      <div className="p-3 sm:p-4 bg-[#121316] border-t border-[#252830] flex flex-wrap items-center justify-between gap-2 text-xs text-[#A0A4B0]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Independent Abuja Luxury Property Radar · Maitama, Asokoro, Guzape, Katampe Ext, Wuse II</span>
        </div>
        <div className="text-[#C5A880] font-mono text-[11px]">Vantage Prime Coordinates</div>
      </div>

    </div>
  );
};
