import React, { useState, useRef } from 'react';
import { Property, formatNaira, formatUSD, ASSET_IMAGES } from '../data/properties';
import { ImageSlider } from './ImageSlider';
import { Bed, Bath, Car, ArrowUpRight, ShieldCheck, MapPin, Calendar, Play, Pause } from 'lucide-react';

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
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleToggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    } else {
      videoRef.current.play().then(() => setIsPlayingVideo(true)).catch(() => {});
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative glass-card rounded-2xl overflow-hidden hover:border-[#C5A880]/55 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Media Container: Horizontal Image Slider + Animated Film Preview */}
      <div className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-[#121316] border-b border-white/15">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isPlayingVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <ImageSlider
            images={property.images}
            alt={property.title}
            fallbackSrc={ASSET_IMAGES.hero}
            autoplay={true}
            autoplayInterval={5400}
            paused={isPlayingVideo || isHovered}
            onImageClick={() => onSelect(property)}
            dotsBottomClass="bottom-10"
          />
        </div>

        {/* Animated Architectural Video Preview on Hover / Toggle */}
        <video
          ref={videoRef}
          src={property.videoUrl}
          poster={property.images[0]}
          muted
          loop
          playsInline
          preload="metadata"
          onClick={() => onSelect(property)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isPlayingVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161B] via-[#14161B]/20 to-black/35 pointer-events-none" />

        {/* Top Floating Glass Strip */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-xs gap-2 pointer-events-none">
          <div className="bg-[#121316]/65 backdrop-blur-md border border-white/15 px-3 py-1 rounded-md text-[#E8E3D9] font-medium tracking-wide">
            {property.district} · {property.status}
          </div>

          <button
            type="button"
            onClick={handleToggleVideo}
            aria-label={isPlayingVideo ? 'Pause architectural film preview' : 'Play architectural film preview'}
            className="pointer-events-auto glass-btn hover:border-[#C5A880] px-2.5 py-1 rounded-md text-[11px] text-[#C5A880] flex items-center gap-1.5 transition-colors"
          >
            {isPlayingVideo ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlayingVideo ? 'Film Active' : 'Film Tour'}</span>
          </button>
        </div>

        {/* Bottom Property Code / Quick Hint */}
        <div
          onClick={() => onSelect(property)}
          className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs text-[#E8E3D9]"
        >
          <span className="font-mono text-[11px] tracking-wider text-[#C0C4D0]">{property.code}</span>
          <span className="text-[11px] text-[#C5A880] flex items-center gap-1 font-medium group-hover:underline">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata */}
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

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/15 mb-4 text-xs text-[#E8E3D9]">
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
          <div className="pt-2 border-t border-white/15 mb-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A0A4B0] block">Asking Price</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C5A880] tabular-nums">
                  {currency === 'NGN' ? formatNaira(property.priceNaira) : formatUSD(property.priceNaira)}
                </span>
              </div>

              {currency === 'NGN' && (
                <span className="text-xs text-[#A0A4B0] font-mono tabular-nums">
                  ~{formatUSD(property.priceNaira)} USD
                </span>
              )}
            </div>

            {/* Source Attribution & Last Verified Date */}
            <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-[#8E929F]">
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
              type="button"
              onClick={() => onEnquire(property)}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#F4F0E8] glass-btn hover:text-white rounded-lg transition-all text-center"
            >
              Enquire
            </button>

            <button
              type="button"
              onClick={() => onRequestInspection(property)}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#121316] bg-[#C5A880] hover:bg-[#D4AF37] rounded-lg glass-btn-gold transition-all text-center"
            >
              Book Inspection
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

