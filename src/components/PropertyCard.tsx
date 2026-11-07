import React from 'react';
import { Property, formatNaira, formatUSD } from '../data/properties';
import { Bed, Bath, Car, ArrowUpRight, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  currency: 'NGN' | 'USD';
  onSelect: (property: Property) => void;
  onEnquire: (property: Property) => void;
  onRequestInspection: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  onSelect,
  onEnquire,
  onRequestInspection
}) => {
  return (
    <article className="group relative bg-[#181A1F] rounded-2xl overflow-hidden border border-[#252830] hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#C5A880]/5">
      
      {/* Media Container */}
      <div 
        onClick={() => onSelect(property)}
        className="relative h-64 sm:h-72 w-full overflow-hidden cursor-pointer bg-[#121316]"
      >
        <img
          src={property.images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = 'true';
              target.src = '/images/hero_abuja_luxury_villa_1794063269976.jpg';
            }
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181A1F] via-[#181A1F]/20 to-black/30" />

        {/* Top Floating Attribution / Status */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
          <div className="bg-[#121316]/85 backdrop-blur-md border border-[#2A2D35] px-3 py-1 rounded-md text-[#E8E3D9] font-medium tracking-wide">
            {property.district}
          </div>

          <div className="bg-[#121316]/85 backdrop-blur-md border border-[#2A2D35] px-2.5 py-1 rounded-md text-[11px] text-[#A0A4B0] flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              property.status === 'Available' ? 'bg-emerald-400' : 'bg-amber-400'
            }`} />
            <span>{property.status}</span>
          </div>
        </div>

        {/* Bottom Property Code / Quick Hint */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E8E3D9]">
          <span className="font-mono text-[11px] tracking-wider text-[#A0A4B0]">{property.code}</span>
          <span className="text-[11px] text-[#C5A880] flex items-center gap-1 font-medium group-hover:underline">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-2.5">
            <span>{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.builtArea}</span>
            <span aria-hidden="true">·</span>
            <span>{property.landSize}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(property)}
            className="font-serif text-lg sm:text-xl font-bold text-[#F4F0E8] group-hover:text-[#C5A880] transition-colors cursor-pointer mb-2 line-clamp-2 leading-snug"
          >
            {property.title}
          </h3>

          {/* Location details */}
          <p className="text-xs text-[#A0A4B0] mb-4 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate">{property.locationDetail}</span>
          </p>

          {/* Specs icons row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#252830] mb-4 text-xs text-[#E8E3D9]">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{property.parkingSpaces} Cars</span>
            </div>
          </div>

          {/* Key Amenities Snippet */}
          <div className="space-y-1 mb-5">
            {property.amenities.slice(0, 2).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#A0A4B0]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Price & Listing Attribution */}
          <div className="pt-2 border-t border-[#252830]/80 mb-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A0A4B0] block">Asking Price</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C5A880]">
                  {currency === 'NGN' ? formatNaira(property.priceNaira) : formatUSD(property.priceNaira)}
                </span>
              </div>

              {currency === 'NGN' && (
                <span className="text-xs text-[#A0A4B0] font-mono">
                  ~{formatUSD(property.priceNaira)} USD
                </span>
              )}
            </div>

            {/* Source Attribution & Last Verified Date */}
            <div className="mt-2.5 pt-2 border-t border-[#252830]/60 flex items-center justify-between text-[11px] text-[#8E929F]">
              <span className="truncate">
                Source: <span className="text-[#C5A880] font-medium">{property.sourceAttribution}</span>
              </span>
              <span className="shrink-0 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#A0A4B0]" />
                <span>Verified {property.lastVerifiedDate}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onEnquire(property)}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#F4F0E8] bg-[#242832] hover:bg-[#2F3442] hover:text-white rounded-lg transition-colors border border-[#343946] text-center"
            >
              Enquire
            </button>

            <button
              onClick={() => onRequestInspection(property)}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#121316] bg-[#C5A880] hover:bg-[#D4AF37] rounded-lg transition-all text-center shadow-md shadow-[#C5A880]/10"
            >
              Book Inspection
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
