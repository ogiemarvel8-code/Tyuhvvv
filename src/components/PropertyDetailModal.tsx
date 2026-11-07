import React, { useState } from 'react';
import { Property, formatNaira, formatUSD } from '../data/properties';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  currency: 'NGN' | 'USD';
  onClose: () => void;
  onRequestInspection: (property: Property) => void;
  onEnquire: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  onClose,
  onRequestInspection,
  onEnquire
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!property) return null;

  const currentPriceFormatted = currency === 'NGN'
    ? formatNaira(property.priceNaira)
    : formatUSD(property.priceNaira);

  // WhatsApp enquiry URL with structured message
  const whatsAppMessage = encodeURIComponent(
    `Hello Vantage Luxury Realty, I am interested in inquiring about ${property.title} (${property.code}) in ${property.district}, Abuja. Asking price: ${formatNaira(property.priceNaira)}. Please provide availability status and arrange a private briefing.`
  );
  const whatsAppUrl = `https://wa.me/2348095008000?text=${whatsAppMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#181A1F] border border-[#2A2D35] rounded-3xl shadow-2xl z-10 text-[#F4F0E8]">
        
        {/* Sticky top action bar */}
        <div className="sticky top-0 z-20 bg-[#181A1F]/90 backdrop-blur-md border-b border-[#252830] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#A0A4B0]">{property.code}</span>
            <span className="text-[#C5A880] text-xs">·</span>
            <span className="text-xs text-[#E8E3D9] font-medium">{property.district}, Abuja</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#A0A4B0] hover:text-white rounded-full hover:bg-[#252830] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-black">
              <img
                src={property.images[activeImageIdx]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Prev / Next buttons if multiple */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Status Overlay */}
              <div className="absolute bottom-4 left-4 bg-[#121316]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#2A2D35] text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-[#E8E3D9]">Advertised Resale Listing</span>
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#C5A880]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Price Header */}
          <div className="border-b border-[#252830] pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-2">
                  <span>{property.propertyType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{property.district}</span>
                  <span aria-hidden="true">·</span>
                  <span>Abuja FCT</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F0E8] leading-tight">
                  {property.title}
                </h2>
                <p className="text-sm text-[#A0A4B0] mt-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{property.locationDetail}</span>
                </p>
              </div>

              <div className="bg-[#121316] p-4 rounded-2xl border border-[#2A2D35] min-w-[240px]">
                <div className="text-[11px] uppercase tracking-wider text-[#A0A4B0]">Asking Price</div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880]">
                  {currentPriceFormatted}
                </div>
                <div className="text-xs text-[#8E929F] mt-1 font-mono">
                  {currency === 'NGN' ? `~${formatUSD(property.priceNaira)} USD` : `${formatNaira(property.priceNaira)}`}
                </div>
              </div>
            </div>
          </div>

          {/* Mandatory Resale Disclaimer & Source Attribution Box */}
          <div className="bg-[#121316] border border-[#343946] p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#E8E3D9]">Resale & Brokerage Attribution Notice</div>
                <p className="text-[#A0A4B0] mt-0.5">
                  This residence is an advertised resale property listed via{' '}
                  <span className="text-[#C5A880] font-semibold">{property.sourceAttribution}</span>.
                  Vantage acts as an independent buyer advisory and acquisition brokerage.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[11px] text-[#A0A4B0]">Last Agent Verification</div>
              <div className="font-medium text-[#C5A880]">{property.lastVerifiedDate}</div>
            </div>
          </div>

          {/* Quantitative Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#121316] p-4 rounded-xl border border-[#252830]">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Bed className="w-4 h-4 text-[#C5A880]" />
                <span>Bedrooms</span>
              </div>
              <div className="font-serif text-xl font-bold text-white">{property.bedrooms} Suites</div>
            </div>

            <div className="bg-[#121316] p-4 rounded-xl border border-[#252830]">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Bath className="w-4 h-4 text-[#C5A880]" />
                <span>Bathrooms</span>
              </div>
              <div className="font-serif text-xl font-bold text-white">{property.bathrooms} Baths</div>
            </div>

            <div className="bg-[#121316] p-4 rounded-xl border border-[#252830]">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Car className="w-4 h-4 text-[#C5A880]" />
                <span>Parking Bay</span>
              </div>
              <div className="font-serif text-xl font-bold text-white">{property.parkingSpaces} Vehicles</div>
            </div>

            <div className="bg-[#121316] p-4 rounded-xl border border-[#252830]">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                <span>Parcel & Built</span>
              </div>
              <div className="font-serif text-sm font-bold text-white">{property.builtArea} / {property.landSize}</div>
            </div>
          </div>

          {/* Narrative Property Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#E8E3D9]">Architectural Overview</h3>
            <div className="space-y-3 text-sm text-[#B0B4C0] leading-relaxed">
              {property.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Verified Amenities */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#E8E3D9]">Verified Amenities & Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-[#121316] rounded-xl border border-[#252830] text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="text-[#E8E3D9]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment & Yield Profile (Advisory Metric) */}
          {property.investmentHighlights && (
            <div className="bg-gradient-to-br from-[#121316] to-[#1C1F26] border border-[#C5A880]/30 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Vantage Advisory · Capital & Lease Profile</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-[#A0A4B0] block">Estimated Diplomatic Yield</span>
                  <span className="font-serif text-base font-bold text-[#F4F0E8]">{property.investmentHighlights.rentalYield}</span>
                </div>
                <div>
                  <span className="text-[#A0A4B0] block">Historical Capital Growth</span>
                  <span className="font-serif text-base font-bold text-[#F4F0E8]">{property.investmentHighlights.capitalAppreciation}</span>
                </div>
                <div>
                  <span className="text-[#A0A4B0] block">Primary Tenant Demographic</span>
                  <span className="font-medium text-[#E8E3D9]">{property.investmentHighlights.targetTenant}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Conversion CTA Strip */}
          <div className="pt-4 border-t border-[#252830] flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestInspection(property);
              }}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all shadow-lg shadow-[#C5A880]/15 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Private Inspection</span>
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/15"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Enquiry</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onEnquire(property);
              }}
              className="py-3.5 px-6 rounded-xl bg-[#242832] hover:bg-[#2F3442] text-white font-semibold text-sm border border-[#343946] transition-colors"
            >
              General Enquiry
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
