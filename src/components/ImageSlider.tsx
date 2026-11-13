import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/properties';

interface ImageSliderProps {
  images: string[];
  alt: string;
  currentIndex?: number;
  onIndexChange?: (idx: number) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  paused?: boolean;
  onImageClick?: () => void;
  fallbackSrc?: string;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  dotsBottomClass?: string;
  alwaysShowArrows?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  alt,
  currentIndex,
  onIndexChange,
  autoplay = true,
  autoplayInterval = 5200,
  paused = false,
  onImageClick,
  fallbackSrc = ASSET_IMAGES.hero,
  className = '',
  showArrows = true,
  showDots = true,
  dotsBottomClass = 'bottom-3.5',
  alwaysShowArrows = false
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const wasSwipeRef = useRef<boolean>(false);

  const safeImages = images.length > 0 ? images : [fallbackSrc];
  const isControlled = typeof currentIndex === 'number';
  const rawIndex = isControlled ? (currentIndex as number) : internalIndex;
  const activeIndex = ((rawIndex % safeImages.length) + safeImages.length) % safeImages.length;

  const setIndex = useCallback(
    (next: number) => {
      const normalized = ((next % safeImages.length) + safeImages.length) % safeImages.length;
      if (!isControlled) {
        setInternalIndex(normalized);
      }
      onIndexChange?.(normalized);
    },
    [isControlled, onIndexChange, safeImages.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIndex(activeIndex + 1);
    },
    [activeIndex, setIndex]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIndex(activeIndex - 1);
    },
    [activeIndex, setIndex]
  );

  useEffect(() => {
    if (!autoplay || paused || isHovered || safeImages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex(activeIndex + 1);
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, paused, isHovered, activeIndex, safeImages.length, setIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    wasSwipeRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const delta = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;

    if (Math.abs(delta) > 14) {
      wasSwipeRef.current = true;
      setTimeout(() => {
        wasSwipeRef.current = false;
      }, 250);
    }

    if (Math.abs(delta) > 38 && safeImages.length > 1) {
      if (delta < 0) {
        setIndex(activeIndex + 1);
      } else {
        setIndex(activeIndex - 1);
      }
    }
  };

  const handleContainerClick = () => {
    if (wasSwipeRef.current) {
      wasSwipeRef.current = false;
      return;
    }
    onImageClick?.();
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleContainerClick}
      className={`relative w-full h-full overflow-hidden select-none group/slider ${className}`}
    >
      {/* Horizontal Sliding Track */}
      <div
        className="flex w-full h-full will-change-transform slider-track"
        style={{
          transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
          transition: 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {safeImages.map((src, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div key={`${src}-${idx}`} className="relative min-w-full w-full h-full shrink-0 overflow-hidden">
              <img
                src={src}
                alt={`${alt}${safeImages.length > 1 ? ` — View ${idx + 1}` : ''}`}
                referrerPolicy="no-referrer"
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = fallbackSrc;
                  }
                }}
                className={`w-full h-full object-cover slider-zoom transition-transform duration-[1400ms] ease-out ${
                  isActive ? 'scale-[1.04]' : 'scale-100'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Glassmorphic) */}
      {showArrows && safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#121316]/60 backdrop-blur-md border border-white/15 text-white hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-200 ${
              alwaysShowArrows
                ? 'opacity-90 hover:opacity-100'
                : 'opacity-80 sm:opacity-0 sm:group-hover/slider:opacity-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#121316]/60 backdrop-blur-md border border-white/15 text-white hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-200 ${
              alwaysShowArrows
                ? 'opacity-90 hover:opacity-100'
                : 'opacity-80 sm:opacity-0 sm:group-hover/slider:opacity-100'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Minimal Pagination Dots */}
      {showDots && safeImages.length > 1 && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 ${dotsBottomClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {safeImages.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                type="button"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(idx);
                }}
                aria-label={`View image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-5 bg-[#C5A880] shadow-sm shadow-[#C5A880]/40'
                    : 'w-1.5 bg-white/45 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
