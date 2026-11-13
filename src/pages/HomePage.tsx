import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Property,
  ABUJA_DISTRICTS,
  formatNaira,
  formatUSD,
  ASSET_IMAGES,
  ASSET_VIDEOS
} from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { AbujaInteractiveMap } from '../components/AbujaInteractiveMap';
import {
  ArrowRight,
  TrendingUp,
  Award,
  PhoneCall,
  CheckCircle2,
  Lock,
  ChevronRight,
  Play,
  Pause,
  Film,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  properties: Property[];
  currency: 'NGN' | 'USD';
  onSelectProperty: (property: Property) => void;
  onEnquire: (property: Property) => void;
  onRequestInspection: (property: Property) => void;
  onNavigate: (page: 'home' | 'collection' | 'about') => void;
  onOpenConsultation: () => void;
}

const MARQUEE_ITEMS = [
  "MAITAMA MINISTERS' QUARTERS · ₦1.2 BILLION",
  'ASOKORO EXTENSION RIDGE · ₦1.2 BILLION',
  'FHA GUZAPE DIPLOMATIC ZONE · ₦600 MILLION',
  'KATAMPE EXTENSION PLATEAU · ₦460 MILLION',
  'WUSE II SKY PENTHOUSE · ₦750 MILLION',
  'PRIVATE CLIENT ADVISORY · ABUJA FCT'
];

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  currency,
  onSelectProperty,
  onEnquire,
  onRequestInspection,
  onNavigate,
  onOpenConsultation
}) => {
  const [selectedDistrictTab, setSelectedDistrictTab] = useState<string>('Maitama');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState<boolean>(true);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const featuredProperties = properties.filter((p) => p.featured);
  const spotlightList = featuredProperties.length > 0 ? featuredProperties : properties;
  const activeSpotlight = spotlightList[spotlightIndex % spotlightList.length];
  const activeDistrictInfo =
    ABUJA_DISTRICTS.find((d) => d.name === selectedDistrictTab) || ABUJA_DISTRICTS[0];
  const activeReelProperty = spotlightList[activeReelIndex % spotlightList.length];

  // Auto-advance sliding hero spotlight text
  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % spotlightList.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [spotlightList.length]);

  const toggleHeroVideo = () => {
    if (!heroVideoRef.current) return;
    if (heroVideoPlaying) {
      heroVideoRef.current.pause();
      setHeroVideoPlaying(false);
    } else {
      heroVideoRef.current.play().then(() => setHeroVideoPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* HERO SECTION — Animated Architectural Video + Glassmorphism + Sliding Headline */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 overflow-hidden bg-[#121316]">
        {/* Background Animated Video with Static Poster Fallback */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSET_IMAGES.hero}
            alt="Abuja Luxury Villa Backdrop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-[0.42]"
          />
          <video
            ref={heroVideoRef}
            src={ASSET_VIDEOS.heroReel}
            poster={ASSET_IMAGES.hero}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/55 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121316]/90 via-[#121316]/45 to-transparent" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            {/* Left Column: Sliding Editorial Typography & CTAs (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold"
              >
                <span className="w-8 h-[1px] bg-[#C5A880]" />
                <span>Vantage Luxury Realty · Abuja, Nigeria</span>
              </motion.div>

              {/* Masked Sliding Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#F4F0E8] leading-[1.12] text-balance pb-1">
                <motion.span
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  EXCEPTIONAL PROPERTIES.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  <span className="italic font-normal text-[#C5A880]">EXTRAORDINARY</span> LIVING.
                </motion.span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl text-[#D0D4DF] font-normal leading-relaxed max-w-2xl"
              >
                Discover Abuja's finest residential properties, curated for those who expect more.
                Verified prime listings across Maitama, Asokoro, Guzape, Katampe Extension, and Wuse II.
              </motion.p>

              {/* Hero CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => onNavigate('collection')}
                  className="py-4 px-8 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all glass-btn-gold flex items-center justify-center gap-3 group"
                >
                  <span>Explore Property Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="py-4 px-8 rounded-xl glass-btn text-[#F4F0E8] font-semibold text-sm transition-all text-center"
                >
                  Schedule Private Consultation
                </button>
              </motion.div>
            </div>

            {/* Right Column: Frosted Glass Sliding Spotlight Card + Video Control (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              {activeSpotlight && (
                <div className="glass-panel rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    <span>Featured Spotlight</span>
                    <button
                      type="button"
                      onClick={toggleHeroVideo}
                      className="flex items-center gap-1.5 text-[11px] text-[#E8E3D9] hover:text-[#C5A880] transition-colors font-sans normal-case tracking-normal"
                    >
                      {heroVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{heroVideoPlaying ? 'Pause Film' : 'Play Film'}</span>
                    </button>
                  </div>

                  {/* Sliding Text Residence Switcher */}
                  <div className="min-h-[96px] flex flex-col justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSpotlight.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-1.5"
                      >
                        <div className="text-xs text-[#A0A4B0]">
                          {activeSpotlight.district} · {activeSpotlight.bedrooms} Bedrooms
                        </div>
                        <h3 className="font-serif text-base font-bold text-white leading-snug line-clamp-2">
                          {activeSpotlight.title}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-serif text-lg font-bold text-[#C5A880] tabular-nums">
                            {currency === 'NGN'
                              ? formatNaira(activeSpotlight.priceNaira)
                              : formatUSD(activeSpotlight.priceNaira)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectProperty(activeSpotlight)}
                            className="text-xs font-semibold text-[#F4F0E8] hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Progress Indicator Bars */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {spotlightList.map((item, idx) => (
                      <button
                        type="button"
                        key={item.id}
                        aria-label={`Spotlight ${item.district}`}
                        onClick={() => setSpotlightIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          idx === spotlightIndex % spotlightList.length
                            ? 'flex-1 bg-[#C5A880]'
                            : 'w-5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Glassmorphic Key Metrics Strip below Hero */}
          <div className="mt-14 glass-panel rounded-2xl p-6 sm:p-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#E8E3D9]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Capital Focus</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880]">Abuja FCT</span>
              <span className="text-xs text-[#8E929F] block mt-0.5">Maitama · Asokoro · Guzape</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Average Asking</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880] tabular-nums">
                {currency === 'NGN' ? '₦1.2B' : '$750K+'}
              </span>
              <span className="text-xs text-[#8E929F] block mt-0.5">Verified Resale Portfolios</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Diplomatic Yield</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880] tabular-nums">8% – 12%</span>
              <span className="text-xs text-[#8E929F] block mt-0.5">USD & Hard Currency Leases</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Advisory Protocol</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880]">100% NDA</span>
              <span className="text-xs text-[#8E929F] block mt-0.5">Strict High-Net-Worth Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDING EDITORIAL MARQUEE RIBBON */}
      <div className="-mt-24 sm:-mt-32 border-y border-white/15 bg-[#16181D]/75 backdrop-blur-xl py-4 overflow-hidden marquee-wrapper">
        <div className="animate-marquee flex items-center gap-10 pr-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
            <div key={idx} className="flex items-center gap-10 shrink-0">
              <span className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#E8E3D9] uppercase">
                {text}
              </span>
              <span className="text-[#C5A880] text-xs" aria-hidden="true">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ARCHITECTURAL FILM REELS — Animated Video Walkthrough Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Video Player Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#121316] border border-white/15 shadow-2xl">
                <video
                  key={activeReelProperty?.videoUrl}
                  src={activeReelProperty?.videoUrl || ASSET_VIDEOS.heroReel}
                  poster={activeReelProperty?.images[0] || ASSET_IMAGES.hero}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/90 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-lg text-[11px] text-[#C5A880] font-medium flex items-center gap-2">
                  <Film className="w-3.5 h-3.5" />
                  <span>Architectural Motion Reel · {activeReelProperty?.district}</span>
                </div>

                {activeReelProperty && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-[#C0C4D0] block">
                        {activeReelProperty.locationDetail}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                        {activeReelProperty.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectProperty(activeReelProperty)}
                      className="shrink-0 px-4 py-2 rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] text-xs font-semibold transition-colors glass-btn-gold"
                    >
                      Inspect Residence
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sliding Reel Selector Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1.5">
                  Private Cinema Previews
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F0E8]">
                  Architectural Motion Tours
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A4B0] mt-2 leading-relaxed">
                  Preview architectural proportions, elevations, and poolside grounds across Abuja's four flagship residential mandates.
                </p>
              </div>

              <div className="space-y-2.5">
                {spotlightList.slice(0, 4).map((prop, idx) => {
                  const isActive = idx === activeReelIndex % spotlightList.length;
                  return (
                    <button
                      type="button"
                      key={prop.id}
                      onClick={() => setActiveReelIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'glass-champagne text-white'
                          : 'bg-white/[0.04] backdrop-blur-md border-white/15 text-[#A0A4B0] hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] text-[#C5A880] font-medium">
                          {prop.district} · {prop.bedrooms} Bed
                        </div>
                        <div className="font-serif text-sm font-semibold text-[#F4F0E8] truncate">
                          {prop.title}
                        </div>
                      </div>
                      <span className="font-serif text-sm font-bold text-[#C5A880] shrink-0 tabular-nums">
                        {currency === 'NGN' ? formatNaira(prop.priceNaira) : formatUSD(prop.priceNaira)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LUXURY LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
              Curated Resale Portfolios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F0E8]">
              Featured Luxury Residences
            </h2>
            <p className="text-sm text-[#A0A4B0] mt-2 max-w-xl">
              Authentic luxury properties currently advertised for sale in Abuja’s prime districts, each verified through partner listing agencies.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('collection')}
            className="self-start md:self-end px-5 py-2.5 rounded-lg glass-btn text-xs font-semibold text-[#E8E3D9] transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>View All {properties.length} Properties</span>
            <ChevronRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProperties.slice(0, 4).map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              currency={currency}
              onSelect={onSelectProperty}
              onEnquire={onEnquire}
              onRequestInspection={onRequestInspection}
            />
          ))}
        </div>
      </section>

      {/* LOCATION-BASED BROWSING & INTERACTIVE CORRIDOR RADAR */}
      <section id="abuja-districts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
            Abuja Prime Corridors
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F0E8]">
            Explore by Prime District
          </h2>
          <p className="text-sm text-[#A0A4B0]">
            Abuja’s real estate wealth is concentrated in five sovereign and high-yield corridors. Explore district infrastructure, security ratings, and verified resale opportunities.
          </p>

          {/* Segmented District Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {ABUJA_DISTRICTS.map((district) => (
              <button
                type="button"
                key={district.id}
                onClick={() => setSelectedDistrictTab(district.name)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedDistrictTab === district.name
                    ? 'bg-[#C5A880] text-[#121316] font-bold glass-btn-gold'
                    : 'glass-btn text-[#A0A4B0] hover:text-white'
                }`}
              >
                {district.name}
              </button>
            ))}
          </div>
        </div>

        {/* District Profile & Radar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Glassmorphic District Profile Card (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDistrictInfo.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-2xl font-bold text-white">{activeDistrictInfo.name}</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 backdrop-blur-md border border-white/15 text-[11px] text-[#C5A880] font-medium">
                    {activeDistrictInfo.securityRating}
                  </span>
                </div>

                <div className="text-xs text-[#C5A880] font-medium italic">
                  "{activeDistrictInfo.tagline}"
                </div>

                <p className="text-sm text-[#A0A4B0] leading-relaxed">
                  {activeDistrictInfo.description}
                </p>

                <div className="pt-4 border-t border-white/15 space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#8E929F]">Avg. Land Benchmark:</span>
                    <span className="font-semibold text-white tabular-nums">{activeDistrictInfo.averagePriceSqm}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#8E929F]">Diplomatic Presence:</span>
                    <span className="font-semibold text-[#E8E3D9]">{activeDistrictInfo.diplomaticPresence}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15">
                  <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block mb-2">Prime Enclaves</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#E8E3D9]">
                    {activeDistrictInfo.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('collection')}
                className="w-full py-3 rounded-xl glass-btn text-[#F4F0E8] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Browse {activeDistrictInfo.name} Listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Corridor Radar (7 cols) */}
          <div className="lg:col-span-7">
            <AbujaInteractiveMap
              properties={properties}
              activeDistrict={selectedDistrictTab}
              onSelectProperty={onSelectProperty}
              height="520px"
            />
          </div>
        </div>
      </section>

      {/* FEATURED INVESTMENT & CAPITAL APPRECIATION OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-10 relative">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Strategic Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F0E8]">
              Why Abuja Real Estate Holds Generational Capital
            </h2>
            <p className="text-sm text-[#A0A4B0]">
              As the diplomatic and political capital of Africa's largest economy, prime residential land in Abuja functions as an inflation hedge, wealth preserver, and hard-currency income generator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Consistent Capital Growth</h3>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                Prime Maitama and Asokoro freeholds have compounded at 18.2% annually over the last decade, outperforming traditional equities with minimal downside volatility.
              </p>
              <div className="pt-2 text-xs font-mono text-[#C5A880] tabular-nums">+18.2% 10-Year Annualized</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Sovereign Diplomatic Tenancies</h3>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                Embassies, international aid institutions, and oil conglomerates lease executive compounds on 2–5 year upfront terms in USD and EUR currencies.
              </p>
              <div className="pt-2 text-xs font-mono text-[#C5A880]">Upfront Hard-Currency Leases</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Off-Market Private Placements</h3>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                Many of Abuja's most prestigious ambassadorial residences never reach public portals. Vantage maintains private mandates with prominent landholding families.
              </p>
              <div className="pt-2 text-xs font-mono text-[#C5A880]">Confidential Advisory Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE PROPERTY CONSULTATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden glass-champagne p-8 sm:p-14 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Private Client Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight text-balance">
              Property Is More Than An Address. It's A Statement.
            </h2>
            <p className="text-sm sm:text-base text-[#D0D4DF]">
              Whether acquiring an ambassadorial compound in Maitama or a hilltop villa in Asokoro, our senior partners provide discreet representation from initial search to deed execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="py-4 px-8 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all glass-btn-gold flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Confidential Consultation</span>
            </button>

            <a
              href="https://wa.me/2348095008000?text=Hello%20Vantage%20Luxury%20Realty%2C%20I%20would%20like%20to%20request%20a%20private%20property%20consultation%20in%20Abuja."
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-xl glass-btn text-white font-semibold text-sm transition-all flex items-center gap-2"
            >
              <span>Instant WhatsApp Desk (+234 809 500 8000)</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#C0C4D0]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Strict Non-Disclosure Protocol</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct AGIS Legal Verification</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
