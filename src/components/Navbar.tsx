import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'collection' | 'about';
  onNavigate: (page: 'home' | 'collection' | 'about') => void;
  currency: 'NGN' | 'USD';
  onToggleCurrency: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currency,
  onToggleCurrency,
  onOpenConsultation
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'collection' | 'about') => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-2.5 sm:top-3 z-40 px-3 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto glass-nav rounded-2xl px-4 sm:px-6 pointer-events-auto transition-all">
        <div className="flex items-center justify-between gap-8 h-16 sm:h-[72px]">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D3F] p-[1px] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#121316] rounded-[7px] flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-[#C5A880] group-hover:scale-105 transition-transform">V</span>
              </div>
            </div>
            <span className="font-serif text-lg md:text-xl font-bold tracking-[0.18em] text-[#F4F0E8] uppercase">
              VANTAGE
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A0A4B0]">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#F4F0E8] transition-colors py-1 whitespace-nowrap shrink-0 relative ${
                currentPage === 'home' ? 'text-[#F4F0E8] font-semibold' : ''
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('collection')}
              className={`hover:text-[#F4F0E8] transition-colors py-1 whitespace-nowrap shrink-0 relative ${
                currentPage === 'collection' ? 'text-[#F4F0E8] font-semibold' : ''
              }`}
            >
              Property Collection
              {currentPage === 'collection' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('abuja-districts')?.scrollIntoView({ behavior: 'smooth' });
                  }, 320);
                } else {
                  document.getElementById('abuja-districts')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-[#F4F0E8] transition-colors py-1 whitespace-nowrap shrink-0"
            >
              Abuja Districts
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#F4F0E8] transition-colors py-1 whitespace-nowrap shrink-0 relative ${
                currentPage === 'about' ? 'text-[#F4F0E8] font-semibold' : ''
              }`}
            >
              About & Advisory
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880] rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action + subtle currency switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onToggleCurrency}
              title="Toggle Currency Display (NGN ₦ / USD $)"
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg glass-btn text-[#A0A4B0] hover:text-[#F4F0E8] transition-colors whitespace-nowrap shrink-0"
            >
              <span className="text-[#C5A880] font-semibold">{currency === 'NGN' ? '₦ NGN' : '$ USD'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121316] bg-[#C5A880] hover:bg-[#D4AF37] rounded-lg glass-btn-gold transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Private Consultation</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A0A4B0] hover:text-white rounded-lg glass-btn focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl glass-panel px-4 pt-4 pb-6 space-y-2.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'home' ? 'bg-white/10 text-[#C5A880]' : 'text-[#A0A4B0] hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('collection')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'collection' ? 'bg-white/10 text-[#C5A880]' : 'text-[#A0A4B0] hover:text-white'
            }`}
          >
            Property Collection
          </button>
          <button
            type="button"
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                document.getElementById('abuja-districts')?.scrollIntoView({ behavior: 'smooth' });
              }, 320);
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#A0A4B0] hover:text-white"
          >
            Abuja Prime Districts
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'about' ? 'bg-white/10 text-[#C5A880]' : 'text-[#A0A4B0] hover:text-white'
            }`}
          >
            About & Advisory
          </button>

          <div className="pt-2 border-t border-white/15 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#121316] bg-[#C5A880] glass-btn-gold rounded-lg"
            >
              Request Private Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
