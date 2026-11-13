import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Property, formatNaira, formatUSD, ASSET_IMAGES } from '../data/properties';
import { ImageSlider } from './ImageSlider';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
  TrendingUp,
  FileCheck,
  Film,
  Image as ImageIcon
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
  const [mediaMode, setMediaMode] = useState<'photos' | 'video'>('photos');

  useEffect(() => {
    setActiveImageIdx(0);
    setMediaMode('photos');
  }, [property?.id]);

  if (!property) return null;

  const currentPriceFormatted = currency === 'NGN'
    ? formatNaira(property.priceNaira)
    : formatUSD(property.priceNaira);

  const whatsAppMessage = encodeURIComponent(
    `Hello Vantage Luxury Realty, I am interested in inquiring about ${property.title} (${property.code}) in ${property.district}, Abuja. Asking price: ${formatNaira(property.priceNaira)}. Please provide availability status and arrange a private briefing.`
  );
  const whatsAppUrl = `https://wa.me/2348095008000?text=${whatsAppMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto my-auto glass-panel rounded-3xl shadow-2xl z-10 text-[#F4F0E8]"
      >
        {/* Sticky top action bar */}
        <div className="sticky top-0 z-30 bg-[#14161B]/85 backdrop-blur-xl border-b border-white/15 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#C5A880]">{property.code}</span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-xs text-[#E8E3D9] font-medium">{property.district}, Abuja</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close residence dossier"
            className="p-2 text-[#A0A4B0] hover:text-white rounded-full glass-btn transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Gallery & Architectural Video Tour */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#121316] border border-white/15 shadow-xl">
              {mediaMode === 'video' ? (
                <video
                  key={property.videoUrl}
                  src={property.videoUrl}
                  poster={property.images[0] || ASSET_IMAGES.hero}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageSlider
                  images={property.images}
                  alt={property.title}
                  currentIndex={activeImageIdx}
                  onIndexChange={setActiveImageIdx}
                  autoplay={true}
                  autoplayInterval={5500}
                  alwaysShowArrows={true}
                  dotsBottomClass="bottom-4"
                />
              )}

              {/* Media Switcher Controls (Top Right Overlay) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 p-1 rounded-xl bg-[#121316]/80 backdrop-blur-xl border border-white/15 text-xs">
                <button
                  type="button"
                  onClick={() => setMediaMode('photos')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
                    mediaMode === 'photos'
                      ? 'bg-[#C5A880] text-[#121316]'
                      : 'text-[#E8E3D9] hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode('video')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
                    mediaMode === 'video'
                      ? 'bg-[#C5A880] text-[#121316]'
                      : 'text-[#E8E3D9] hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Film Tour</span>
                </button>
              </div>

              {/* Status Overlay */}
              <div className="hidden sm:flex absolute bottom-4 left-4 z-20 glass-panel px-3 py-1.5 rounded-lg text-xs items-center gap-2 pointer-events-none">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-medium text-[#E8E3D9]">Advertised Resale Listing</span>
              </div>
            </div>

            {/* Thumbnails */}
            {mediaMode === 'photos' && property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#C5A880] scale-[1.03]' : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${property.title} preview ${idx + 1}`}
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
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Price Header */}
          <div className="border-b border-white/15 pb-6">
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

              <div className="glass-champagne p-4 rounded-2xl min-w-[240px]">
                <div className="text-[11px] uppercase tracking-wider text-[#C5A880]">Asking Price</div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {currentPriceFormatted}
                </div>
                <div className="text-xs text-[#C0C4D0] mt-1 font-mono tabular-nums">
                  {currency === 'NGN' ? `~${formatUSD(property.priceNaira)} USD` : `${formatNaira(property.priceNaira)}`}
                </div>
              </div>
            </div>
          </div>

          {/* Mandatory Resale Disclaimer & Source Attribution Box */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/15 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
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
            <div className="bg-white/[0.04] backdrop-blur-md p-4 rounded-xl border border-white/15">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Bed className="w-4 h-4 text-[#C5A880]" />
                <span>Bedrooms</span>
              </div>
              <div className="font-serif text-xl font-bold text-white">{property.bedrooms} Suites</div>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md p-4 rounded-xl border border-white/15">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Bath className="w-4 h-4 text-[#C5A880]" />
                <span>Bathrooms</span>
              </div>
              <div className="font-serif text-xl font-bold text-white">{property.bathrooms} Baths</div>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md p-4 rounded-xl border border-white/15">
              <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                <Car className="w-4 h-4 text-[#C5A880]" />
                <span>Parking Bay</span>
              </div>
              <div className="font-serif text-xl font-bold text-white">{property.parkingSpaces} Vehicles</div>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md p-4 rounded-xl border border-white/15">
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
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/15 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="text-[#E8E3D9]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment & Yield Profile (Advisory Metric) */}
          {property.investmentHighlights && (
            <div className="glass-champagne p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Vantage Advisory · Capital & Lease Profile</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-[#C0C4D0] block">Estimated Diplomatic Yield</span>
                  <span className="font-serif text-base font-bold text-[#F4F0E8]">{property.investmentHighlights.rentalYield}</span>
                </div>
                <div>
                  <span className="text-[#C0C4D0] block">Historical Capital Growth</span>
                  <span className="font-serif text-base font-bold text-[#F4F0E8]">{property.investmentHighlights.capitalAppreciation}</span>
                </div>
                <div>
                  <span className="text-[#C0C4D0] block">Primary Tenant Demographic</span>
                  <span className="font-medium text-[#E8E3D9]">{property.investmentHighlights.targetTenant}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Conversion CTA Strip */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestInspection(property);
              }}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm glass-btn-gold transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Private Inspection</span>
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/15"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Enquiry</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onEnquire(property);
              }}
              className="py-3.5 px-6 rounded-xl glass-btn text-white font-semibold text-sm transition-all"
            >
              General Enquiry
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


