import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Property, formatNaira, formatUSD, ASSET_IMAGES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { AbujaInteractiveMap } from '../components/AbujaInteractiveMap';
import { ImageSlider } from '../components/ImageSlider';
import {
  LayoutGrid,
  List,
  Map as MapIcon,
  Search,
  ShieldCheck,
  Edit,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';

interface CollectionPageProps {
  properties: Property[];
  currency: 'NGN' | 'USD';
  onSelectProperty: (property: Property) => void;
  onEnquire: (property: Property) => void;
  onRequestInspection: (property: Property) => void;
  onOpenManager: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  properties,
  currency,
  onSelectProperty,
  onEnquire,
  onRequestInspection,
  onOpenManager
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (selectedDistrict !== 'All' && p.district !== selectedDistrict) return false;
        if (selectedType !== 'All' && p.propertyType !== selectedType) return false;
        if (selectedBedrooms !== 'All') {
          const bedCount = Number(selectedBedrooms);
          if (selectedBedrooms === '6+' && p.bedrooms < 6) return false;
          if (selectedBedrooms !== '6+' && p.bedrooms !== bedCount) return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLoc = p.locationDetail.toLowerCase().includes(q);
          const matchDist = p.district.toLowerCase().includes(q);
          const matchCode = p.code.toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchDist && !matchCode) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'desc') return b.priceNaira - a.priceNaira;
        return a.priceNaira - b.priceNaira;
      });
  }, [properties, selectedDistrict, selectedType, selectedBedrooms, sortOrder, searchQuery]);

  const handleResetFilters = () => {
    setSelectedDistrict('All');
    setSelectedType('All');
    setSelectedBedrooms('All');
    setSortOrder('desc');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title & Resale Protocol Notice */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1"
            >
              Curated Residential Catalog
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F0E8]"
            >
              Abuja Prime Property Collection
            </motion.h1>
            <p className="text-sm text-[#A0A4B0] mt-2 max-w-2xl">
              Authentic, advertised luxury properties for sale across Abuja's most sought-after diplomatic and residential enclaves.
            </p>
          </div>

          {/* Listing Management Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenManager}
              className="px-4 py-2 rounded-xl glass-btn text-[#C5A880] text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap"
              title="Edit property prices, availability, and sources in real-time"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Listing Manager Console</span>
            </button>
          </div>
        </div>

        {/* Resale Notice Banner */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A0A4B0]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>
              <strong className="text-white">Resale Listing Governance:</strong> All properties are sourced from licensed partner brokerages. Availability and contracts are confirmed prior to private inspection.
            </span>
          </div>
          <span className="shrink-0 text-[#C5A880] font-medium">Updated November 2026</span>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full xl:min-w-[260px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#7E8392]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by address, district, or code (e.g. Ministers Quarters, VLR-MT-01)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#121316]/75 backdrop-blur-md border border-white/15 rounded-xl text-xs text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Quick Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                aria-label="Filter by District"
                className="w-full px-3 py-2.5 bg-[#121316]/75 backdrop-blur-md border border-white/15 rounded-xl text-[#F4F0E8] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="All">All Districts</option>
                <option value="Maitama">Maitama</option>
                <option value="Asokoro">Asokoro</option>
                <option value="Guzape">Guzape</option>
                <option value="Katampe Extension">Katampe Extension</option>
                <option value="Wuse II">Wuse II</option>
              </select>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by Property Type"
                className="w-full px-3 py-2.5 bg-[#121316]/75 backdrop-blur-md border border-white/15 rounded-xl text-[#F4F0E8] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="All">All Property Types</option>
                <option value="Luxury Duplex">Luxury Duplex</option>
                <option value="Detached Duplex">Detached Duplex</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Ambassadorial Mansion">Ambassadorial Mansion</option>
              </select>
            </div>

            <div>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                aria-label="Filter by Bedroom Count"
                className="w-full px-3 py-2.5 bg-[#121316]/75 backdrop-blur-md border border-white/15 rounded-xl text-[#F4F0E8] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="All">Any Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5 Bedrooms</option>
                <option value="6+">6+ Bedrooms</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="w-full px-3 py-2.5 glass-btn rounded-xl text-[#F4F0E8] flex items-center justify-between text-left transition-all"
              >
                <span>Price: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}</span>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121316]/75 backdrop-blur-md border border-white/15 rounded-xl self-end xl:self-center">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#C5A880] text-[#121316]' : 'text-[#A0A4B0] hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#C5A880] text-[#121316]' : 'text-[#A0A4B0] hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-[#C5A880] text-[#121316]' : 'text-[#A0A4B0] hover:text-white'
              }`}
              title="Interactive Corridor View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Filter Indicators & Count */}
        <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-[#A0A4B0]">
          <div>
            Showing <strong className="text-white tabular-nums">{filteredProperties.length}</strong> of{' '}
            {properties.length} verified listings
          </div>

          {(selectedDistrict !== 'All' || selectedType !== 'All' || selectedBedrooms !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#C5A880] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODES RENDERING */}
      {/* 1. Map / Corridor Radar View Mode */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          <AbujaInteractiveMap
            properties={filteredProperties}
            onSelectProperty={onSelectProperty}
            height="620px"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
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
        </div>
      )}

      {/* 2. Grid View Mode */}
      {viewMode === 'grid' && (
        <>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
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
          ) : (
            <div className="text-center py-16 glass-card rounded-3xl space-y-3">
              <p className="font-serif text-xl text-white">No properties match your current filters</p>
              <p className="text-xs text-[#A0A4B0]">Try broadening your district selection or bedroom count.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#C5A880] text-[#121316] font-semibold text-xs glass-btn-gold hover:bg-[#D4AF37]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* 3. List View Mode */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="glass-card hover:border-[#C5A880]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row gap-6 p-5 sm:p-6"
            >
              <div className="relative w-full md:w-80 h-56 rounded-xl overflow-hidden cursor-pointer shrink-0 bg-[#121316] border border-white/15">
                <div className="absolute inset-0">
                  <ImageSlider
                    images={prop.images}
                    alt={prop.title}
                    fallbackSrc={ASSET_IMAGES.hero}
                    autoplay={true}
                    autoplayInterval={5800}
                    onImageClick={() => onSelectProperty(prop)}
                    dotsBottomClass="bottom-3"
                  />
                </div>
                <div className="absolute top-3 left-3 z-20 glass-panel px-2.5 py-1 rounded text-xs text-[#E8E3D9] pointer-events-none">
                  {prop.district}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                    <span className="font-mono text-[11px] text-[#C5A880]">{prop.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{prop.propertyType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{prop.locationDetail}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProperty(prop)}
                    className="font-serif text-xl font-bold text-white hover:text-[#C5A880] cursor-pointer transition-colors"
                  >
                    {prop.title}
                  </h3>

                  <p className="text-xs text-[#A0A4B0] mt-2 line-clamp-2 leading-relaxed">
                    {prop.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#E8E3D9]">
                    <span>{prop.bedrooms} Bed Suites</span>
                    <span aria-hidden="true">·</span>
                    <span>{prop.bathrooms} Baths</span>
                    <span aria-hidden="true">·</span>
                    <span>{prop.parkingSpaces} Parking Bays</span>
                    <span aria-hidden="true">·</span>
                    <span>{prop.builtArea}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#A0A4B0] block">Asking Price</span>
                    <span className="font-serif text-2xl font-bold text-[#C5A880] tabular-nums">
                      {currency === 'NGN' ? formatNaira(prop.priceNaira) : formatUSD(prop.priceNaira)}
                    </span>
                    <span className="text-[11px] text-[#8E929F] block">
                      Source: {prop.sourceAttribution} · Verified {prop.lastVerifiedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onEnquire(prop)}
                      className="px-4 py-2.5 rounded-xl glass-btn text-xs font-semibold text-white transition-all"
                    >
                      Enquire
                    </button>
                    <button
                      type="button"
                      onClick={() => onRequestInspection(prop)}
                      className="px-4 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-xs font-semibold text-[#121316] glass-btn-gold transition-all"
                    >
                      Book Inspection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


