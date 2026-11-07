import React, { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Property, formatNaira } from '../data/properties';
import { MapPin, ExternalLink, ShieldCheck, Bed, Bath, ArrowUpRight } from 'lucide-react';

interface AbujaInteractiveMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (prop: Property) => void;
  activeDistrict?: string;
  height?: string;
}

// Center of Abuja luxury golden corridor (Maitama - Central Area - Asokoro)
const ABUJA_CENTER = { lat: 9.0667, lng: 7.4883 };

export const AbujaInteractiveMap: React.FC<AbujaInteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  activeDistrict,
  height = '520px'
}) => {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const filteredProperties = activeDistrict && activeDistrict !== 'All'
    ? properties.filter(p => p.district === activeDistrict)
    : properties;

  const activeProperty = properties.find(p => p.id === activeMarkerId) || selectedProperty;

  const handleMarkerClick = useCallback((prop: Property) => {
    setActiveMarkerId(prop.id);
    if (onSelectProperty) {
      onSelectProperty(prop);
    }
  }, [onSelectProperty]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#2A2D35] bg-[#181A1F] shadow-2xl">
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-[#121316]/90 backdrop-blur-md border border-[#2A2D35] px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
        <span className="text-xs uppercase tracking-wider text-[#A0A4B0] font-medium">Abuja Prime Corridors</span>
        <span className="text-xs text-[#E8E3D9] font-serif">· {filteredProperties.length} Verified Properties</span>
      </div>

      <div style={{ height, width: '100%' }}>
        <APIProvider apiKey={apiKey}>
          <Map
            mapId="DEMO_MAP_ID"
            defaultCenter={ABUJA_CENTER}
            defaultZoom={12}
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            {filteredProperties.map((prop) => {
              const isSelected = activeProperty?.id === prop.id;
              return (
                <AdvancedMarker
                  key={prop.id}
                  position={prop.coordinates}
                  title={`${prop.title} - ${formatNaira(prop.priceNaira)}`}
                  onClick={() => handleMarkerClick(prop)}
                >
                  <div className={`cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-full hover:scale-110 ${
                    isSelected ? 'scale-110 z-50' : 'z-20'
                  }`}>
                    <div className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-2xl border flex items-center gap-1.5 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#C5A880] text-[#121316] border-white font-bold ring-4 ring-[#C5A880]/30'
                        : 'bg-[#181A1F] text-[#F4F0E8] border-[#383D48] hover:border-[#C5A880]'
                    }`}>
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{formatNaira(prop.priceNaira)}</span>
                    </div>
                    {/* Marker pointer triangle */}
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#181A1F] mx-auto" />
                  </div>
                </AdvancedMarker>
              );
            })}

            {activeProperty && (
              <InfoWindow
                position={activeProperty.coordinates}
                onCloseClick={() => setActiveMarkerId(null)}
                pixelOffset={[0, -40]}
              >
                <div className="p-1 max-w-[280px] bg-[#121316] text-[#F4F0E8] rounded-xl font-sans">
                  <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2.5 bg-[#181A1F]">
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
                    <div className="absolute top-2 left-2 bg-[#121316]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#C5A880] font-medium">
                      {activeProperty.district}
                    </div>
                  </div>

                  <h4 className="font-serif text-sm font-semibold text-white leading-tight mb-1 line-clamp-1">
                    {activeProperty.title}
                  </h4>

                  <p className="text-xs text-[#A0A4B0] mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A880] shrink-0" />
                    <span className="truncate">{activeProperty.locationDetail}</span>
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2A2D35] text-xs">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#A0A4B0]">Asking Price</div>
                      <div className="font-serif text-sm font-bold text-[#C5A880]">
                        {formatNaira(activeProperty.priceNaira)}
                      </div>
                    </div>

                    {onSelectProperty && (
                      <button
                        onClick={() => onSelectProperty(activeProperty)}
                        className="px-3 py-1.5 rounded-lg bg-[#C5A880] text-[#121316] font-medium text-xs hover:bg-[#D4AF37] transition-colors flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Footer attribution strip */}
      <div className="bg-[#121316] border-t border-[#2A2D35] px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-[#A0A4B0]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>All coordinates verified in Abuja FCT prime zones (Maitama, Asokoro, Guzape, Katampe Ext, Wuse II)</span>
        </div>
        <div className="text-[#C5A880]/80">Interactive Google Maps Grounding</div>
      </div>
    </div>
  );
};
