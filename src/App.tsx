/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, Property } from './data/properties';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { InspectionModal } from './components/InspectionModal';
import { ListingManagerModal } from './components/ListingManagerModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'collection' | 'about'>('home');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  
  // Modals state
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState<Property | null>(null);
  const [inspectionTargetProperty, setInspectionTargetProperty] = useState<Property | null>(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isListingManagerOpen, setIsListingManagerOpen] = useState(false);

  // Google Maps Platform Demo Key quota state listener
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };

    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'NGN' ? 'USD' : 'NGN'));
  };

  const handleOpenInspection = (prop?: Property | null) => {
    setInspectionTargetProperty(prop || null);
    setIsInspectionModalOpen(true);
  };

  const handleUpdateProperty = (updated: Property) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleResetProperties = () => {
    setProperties(INITIAL_PROPERTIES);
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#F4F0E8] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#121316]">
      
      {/* Google Maps Quota Warning Banner (Mandatory Demo Key Handler) */}
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        onOpenConsultation={() => handleOpenInspection(null)}
      />

      {/* Active Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            properties={properties}
            currency={currency}
            onSelectProperty={setSelectedPropertyForDetail}
            onEnquire={(p) => handleOpenInspection(p)}
            onRequestInspection={(p) => handleOpenInspection(p)}
            onNavigate={setCurrentPage}
            onOpenConsultation={() => handleOpenInspection(null)}
          />
        )}

        {currentPage === 'collection' && (
          <CollectionPage
            properties={properties}
            currency={currency}
            onSelectProperty={setSelectedPropertyForDetail}
            onEnquire={(p) => handleOpenInspection(p)}
            onRequestInspection={(p) => handleOpenInspection(p)}
            onOpenManager={() => setIsListingManagerOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutContactPage
            properties={properties}
            onOpenConsultation={() => handleOpenInspection(null)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onOpenConsultation={() => handleOpenInspection(null)}
      />

      {/* Property Details Modal / Overlay */}
      <PropertyDetailModal
        property={selectedPropertyForDetail}
        currency={currency}
        onClose={() => setSelectedPropertyForDetail(null)}
        onRequestInspection={(prop) => {
          setSelectedPropertyForDetail(null);
          handleOpenInspection(prop);
        }}
        onEnquire={(prop) => {
          setSelectedPropertyForDetail(null);
          handleOpenInspection(prop);
        }}
      />

      {/* Inspection & Advisory Consultation Modal */}
      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
        property={inspectionTargetProperty}
        propertiesList={properties}
        mode={inspectionTargetProperty ? 'inspection' : 'consultation'}
      />

      {/* Property Manager Modal */}
      <ListingManagerModal
        isOpen={isListingManagerOpen}
        onClose={() => setIsListingManagerOpen(false)}
        properties={properties}
        onUpdateProperty={handleUpdateProperty}
        onResetProperties={handleResetProperties}
      />

    </div>
  );
}
