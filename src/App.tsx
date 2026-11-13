/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

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
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#121316] text-[#F4F0E8] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#121316]">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>
          </AnimatePresence>
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
    </MotionConfig>
  );
}

