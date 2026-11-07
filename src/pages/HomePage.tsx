import React, { useState } from 'react';
import { Property, ABUJA_DISTRICTS, formatNaira, formatUSD, ASSET_IMAGES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { AbujaInteractiveMap } from '../components/AbujaInteractiveMap';
import {
  Compass,
  Shield,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  Award,
  PhoneCall,
  Search,
  CheckCircle2,
  Lock,
  ChevronRight,
  Eye
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
  const [heroDistrictFilter, setHeroDistrictFilter] = useState<string>('All');

  const featuredProperties = properties.filter((p) => p.featured);
  const activeDistrictInfo = ABUJA_DISTRICTS.find((d) => d.name === selectedDistrictTab) || ABUJA_DISTRICTS[0];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* HERO SECTION — Cinematic Luxury */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 overflow-hidden">
        {/* Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSET_IMAGES.hero}
            alt="Abuja Luxury Villa"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = '/images/hero_abuja_luxury_villa_1794063269976.jpg';
              }
            }}
            className="w-full h-full object-cover object-center brightness-[0.4] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121316]/90 via-[#121316]/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
          <div className="max-w-3xl space-y-6">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span>Vantage Luxury Realty · Abuja, Nigeria</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#F4F0E8] leading-[1.08] text-balance">
              EXCEPTIONAL PROPERTIES. <br />
              <span className="italic font-normal text-[#C5A880]">EXTRAORDINARY</span> LIVING.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#C0C4D0] font-normal leading-relaxed max-w-2xl">
              Discover Abuja's finest residential properties, curated for those who expect more.
              Verified prime listings across Maitama, Asokoro, Guzape, Katampe Extension, and Wuse II.
            </p>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('collection')}
                className="py-4 px-8 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all shadow-xl shadow-[#C5A880]/20 flex items-center justify-center gap-3 group"
              >
                <span>Explore Property Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="py-4 px-8 rounded-xl bg-[#181A1F]/90 hover:bg-[#252830] text-[#F4F0E8] font-semibold text-sm border border-[#2A2D35] hover:border-[#C5A880]/50 transition-all backdrop-blur-md text-center"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>

          {/* Key Metrics Strip below Hero */}
          <div className="mt-16 pt-8 border-t border-[#252830]/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#E8E3D9]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Capital Focus</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880]">Abuja FCT</span>
              <span className="text-xs text-[#8E929F] block mt-0.5">Maitama · Asokoro · Guzape</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Average Asking</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880]">
                {currency === 'NGN' ? '₦1.2B' : '$750K+'}
              </span>
              <span className="text-xs text-[#8E929F] block mt-0.5">Verified Resale Portfolios</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A4B0] block">Diplomatic Yield</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880]">8% – 12%</span>
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


      {/* FEATURED LUXURY LISTINGS (REAL VERIFIED PROPERTIES) */}
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
              Authentic luxury properties currently advertised for sale in Abuja’s prime districts, each verified through verified partner listing agencies.
            </p>
          </div>

          <button
            onClick={() => onNavigate('collection')}
            className="self-start md:self-end px-5 py-2.5 rounded-lg border border-[#2A2D35] hover:border-[#C5A880] text-xs font-semibold text-[#E8E3D9] transition-colors flex items-center gap-2 group whitespace-nowrap"
          >
            <span>View All {properties.length} Properties</span>
            <ChevronRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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


      {/* LOCATION-BASED BROWSING & INTERACTIVE GOOGLE MAP */}
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

          {/* District selector buttons (Segmented Control) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {ABUJA_DISTRICTS.map((district) => (
              <button
                key={district.id}
                onClick={() => setSelectedDistrictTab(district.name)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedDistrictTab === district.name
                    ? 'bg-[#C5A880] text-[#121316] font-bold shadow-lg shadow-[#C5A880]/15'
                    : 'bg-[#181A1F] text-[#A0A4B0] border border-[#2A2D35] hover:text-white hover:border-[#383D48]'
                }`}
              >
                {district.name}
              </button>
            ))}
          </div>
        </div>

        {/* District Detail & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* District Profile Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#181A1F] rounded-2xl border border-[#2A2D35] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-white">{activeDistrictInfo.name}</span>
                <span className="px-2.5 py-1 rounded bg-[#121316] border border-[#2A2D35] text-[11px] text-[#C5A880] font-medium">
                  {activeDistrictInfo.securityRating}
                </span>
              </div>

              <div className="text-xs text-[#C5A880] font-medium italic">
                "{activeDistrictInfo.tagline}"
              </div>

              <p className="text-sm text-[#A0A4B0] leading-relaxed">
                {activeDistrictInfo.description}
              </p>

              {/* District Metrics */}
              <div className="pt-4 border-t border-[#252830] space-y-3 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#8E929F]">Avg. Land Benchmark:</span>
                  <span className="font-semibold text-white">{activeDistrictInfo.averagePriceSqm}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#8E929F]">Diplomatic Presence:</span>
                  <span className="font-semibold text-[#E8E3D9]">{activeDistrictInfo.diplomaticPresence}</span>
                </div>
              </div>

              {/* District Highlights */}
              <div className="pt-4 border-t border-[#252830]">
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
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('collection')}
                className="w-full py-3 rounded-xl bg-[#242832] hover:bg-[#2F3442] text-[#F4F0E8] font-semibold text-xs border border-[#343946] transition-colors flex items-center justify-center gap-2"
              >
                <span>Browse {activeDistrictInfo.name} Listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Google Map (7 cols) */}
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
        <div className="bg-gradient-to-br from-[#181A1F] to-[#121316] rounded-3xl border border-[#2A2D35] p-8 sm:p-12 relative overflow-hidden">
          
          {/* Subtle gold line ornament */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-10">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#14161A] border border-[#252830] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Consistent Capital Growth</h3>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                Prime Maitama and Asokoro freeholds have compounded at 18.2% annually over the last decade, outperforming traditional equities with minimal downside volatility.
              </p>
              <div className="pt-2 text-xs font-mono text-[#C5A880]">+18.2% 10-Year Annualized</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#14161A] border border-[#252830] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Sovereign Diplomatic Tenancies</h3>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                Embassies, international aid institutions, and oil conglomerates lease executive compounds on 2–5 year upfront terms in USD and EUR currencies.
              </p>
              <div className="pt-2 text-xs font-mono text-[#C5A880]">Upfront Hard-Currency Leases</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#14161A] border border-[#252830] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
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
        <div className="relative rounded-3xl overflow-hidden border border-[#C5A880]/40 bg-[#181A1F] p-8 sm:p-14 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Private Client Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Property Is More Than An Address. It's A Statement.
            </h2>
            <p className="text-sm sm:text-base text-[#A0A4B0]">
              Whether acquiring an ambassadorial compound in Maitama or a hilltop villa in Asokoro, our senior partners provide discreet representation from initial search to deed execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenConsultation}
              className="py-4 px-8 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all shadow-xl shadow-[#C5A880]/20 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Confidential Consultation</span>
            </button>

            <a
              href="https://wa.me/2348095008000?text=Hello%20Vantage%20Luxury%20Realty%2C%20I%20would%20like%20to%20request%20a%20private%20property%20consultation%20in%20Abuja."
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-xl bg-[#242832] hover:bg-[#2F3442] text-white font-semibold text-sm border border-[#343946] transition-all flex items-center gap-2"
            >
              <span>Instant WhatsApp Desk (+234 809 500 8000)</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-[#8E929F]">
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
