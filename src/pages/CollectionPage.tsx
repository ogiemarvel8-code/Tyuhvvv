import React, { useState, useMemo } from 'react';
import { Property, formatNaira, formatUSD } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { AbujaInteractiveMap } from '../components/AbujaInteractiveMap';
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Map as MapIcon,
  Search,
  CheckCircle2,
  Calendar,
  Building,
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
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
              Curated Residential Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F0E8]">
              Abuja Prime Property Collection
            </h1>
            <p className="text-sm text-[#A0A4B0] mt-2 max-w-2xl">
              Authentic, advertised luxury properties for sale across Abuja's most sought-after diplomatic and residential enclaves.
            </p>
          </div>

          {/* Listing Management Button for Testing/Editing */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenManager}
              className="px-4 py-2 rounded-xl bg-[#1E222B] hover:bg-[#252830] text-[#C5A880] border border-[#2A2D35] hover:border-[#C5A880] text-xs font-semibold flex items-center gap-2 transition-colors"
              title="Edit property prices, availability, and sources in real-time"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Listing Manager Console</span>
            </button>
          </div>
        </div>

        {/* Resale Notice Banner */}
        <div className="bg-[#181A1F] border border-[#252830] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A0A4B0]">
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
      <div className="bg-[#181A1F] border border-[#252830] rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#7E8392]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by address, district, or code (e.g. Ministers Quarters, VLR-MT-01)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-xs text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Quick Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            {/* District */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-[#F4F0E8] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="All">All Districts</option>
                <option value="Maitama">Maitama</option>
                <option value="Asokoro">Asokoro</option>
                <option value="Guzape">Guzape</option>
                <option value="Katampe Extension">Katampe Extension</option>
                <option value="Wuse II">Wuse II</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-[#F4F0E8] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="All">All Property Types</option>
                <option value="Luxury Duplex">Luxury Duplex</option>
                <option value="Detached Duplex">Detached Duplex</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Ambassadorial Mansion">Ambassadorial Mansion</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-[#F4F0E8] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="All">Any Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5 Bedrooms</option>
                <option value="6+">6+ Bedrooms</option>
              </select>
            </div>

            {/* Sort Price */}
            <div>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-[#F4F0E8] hover:border-[#C5A880] flex items-center justify-between text-left"
              >
                <span>Price: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}</span>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121316] border border-[#2A2D35] rounded-xl self-end lg:self-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#C5A880] text-[#121316]' : 'text-[#A0A4B0] hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#C5A880] text-[#121316]' : 'text-[#A0A4B0] hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-[#C5A880] text-[#121316]' : 'text-[#A0A4B0] hover:text-white'
              }`}
              title="Interactive Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Active Filter Indicators & Count */}
        <div className="flex items-center justify-between pt-2 border-t border-[#252830] text-xs text-[#A0A4B0]">
          <div>
            Showing <strong className="text-white">{filteredProperties.length}</strong> of{' '}
            {properties.length} verified listings
          </div>

          {(selectedDistrict !== 'All' || selectedType !== 'All' || selectedBedrooms !== 'All' || searchQuery) && (
            <button
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

      {/* 1. Map View Mode */}
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
            <div className="text-center py-16 bg-[#181A1F] rounded-3xl border border-[#252830] space-y-3">
              <p className="font-serif text-xl text-white">No properties match your current filters</p>
              <p className="text-xs text-[#A0A4B0]">Try broadening your district selection or bedroom count.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#C5A880] text-[#121316] font-semibold text-xs hover:bg-[#D4AF37]"
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
              className="bg-[#181A1F] border border-[#252830] hover:border-[#C5A880]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row gap-6 p-5 sm:p-6 hover:shadow-xl"
            >
              <div 
                onClick={() => onSelectProperty(prop)}
                className="relative w-full md:w-80 h-56 rounded-xl overflow-hidden cursor-pointer shrink-0 bg-black"
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#121316]/85 backdrop-blur-md px-2.5 py-1 rounded text-xs text-[#E8E3D9]">
                  {prop.district}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#A0A4B0] mb-1">
                    <span className="font-mono text-[11px] text-[#C5A880]">{prop.code}</span>
                    <span>·</span>
                    <span>{prop.propertyType}</span>
                    <span>·</span>
                    <span>{prop.locationDetail}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProperty(prop)}
                    className="font-serif text-xl font-bold text-white hover:text-[#C5A880] cursor-pointer"
                  >
                    {prop.title}
                  </h3>

                  <p className="text-xs text-[#A0A4B0] mt-2 line-clamp-2 leading-relaxed">
                    {prop.summary}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-[#E8E3D9]">
                    <span>{prop.bedrooms} Bed Suites</span>
                    <span>·</span>
                    <span>{prop.bathrooms} Baths</span>
                    <span>·</span>
                    <span>{prop.parkingSpaces} Parking Bays</span>
                    <span>·</span>
                    <span>{prop.builtArea}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#252830] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#A0A4B0] block">Asking Price</span>
                    <span className="font-serif text-2xl font-bold text-[#C5A880]">
                      {currency === 'NGN' ? formatNaira(prop.priceNaira) : formatUSD(prop.priceNaira)}
                    </span>
                    <span className="text-[11px] text-[#8E929F] block">
                      Source: {prop.sourceAttribution} · Verified {prop.lastVerifiedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onEnquire(prop)}
                      className="px-4 py-2.5 rounded-xl bg-[#242832] hover:bg-[#2F3442] text-xs font-semibold text-white border border-[#343946]"
                    >
                      Enquire
                    </button>
                    <button
                      onClick={() => onRequestInspection(prop)}
                      className="px-4 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-xs font-semibold text-[#121316] shadow-md shadow-[#C5A880]/15"
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
