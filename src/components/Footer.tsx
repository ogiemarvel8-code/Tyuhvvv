import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'collection' | 'about') => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="bg-[#0E0F12] border-t border-[#252830] text-[#A0A4B0] text-xs pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D3F] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#121316] rounded-[7px] flex items-center justify-center">
                  <span className="font-serif text-base font-bold text-[#C5A880]">V</span>
                </div>
              </div>
              <span className="font-serif text-lg font-bold tracking-[0.16em] text-white uppercase">
                VANTAGE LUXURY REALTY
              </span>
            </div>

            <p className="text-xs text-[#8E929F] max-w-sm leading-relaxed">
              Abuja’s premier private client property advisory. Curating verified prime residential real estate across Maitama, Asokoro, Guzape, Katampe Extension, and Wuse II.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A880]">
              <ShieldCheck className="w-4 h-4" />
              <span>Registered Luxury Brokerage · FCT Abuja</span>
            </div>
          </div>

          {/* Nav Col */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-white font-semibold block">Navigation</span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  Home Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('collection'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  Property Collection
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  About Vantage
                </button>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="hover:text-white transition-colors text-[#C5A880]">
                  Private Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Districts Col */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-white font-semibold block">Prime Corridors</span>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                Maitama Ministers' Quarters
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                Asokoro Presidential Ridge
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                FHA Guzape Hillside
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                Katampe Diplomatic Extension
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                Wuse II Metropolitan Enclave
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-white font-semibold block">Abuja Office</span>
            <div className="space-y-2 text-[#8E929F]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>14 Amazon Street, Maitama, Abuja</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href="tel:+2348095008000" className="hover:text-white">+234 (0) 809 500 8000</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href="mailto:privateclient@vantagerealty.ng" className="hover:text-white">privateclient@vantagerealty.ng</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/2348095008000" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Source Attribution Strip */}
        <div className="pt-8 border-t border-[#1C1F26] text-[11px] text-[#727684] space-y-3 leading-relaxed">
          <p>
            <strong className="text-[#A0A4B0]">Attribution & Regulatory Statement:</strong> Vantage Luxury Realty acts as an independent buyer advisory and real estate brokerage in the Federal Capital Territory, Abuja. All residences featured are authentic advertised resale properties originally listed via verified channels (including PropertyPro Nigeria, Nigeria Property Centre, PropertyAgentsNG, and Private Property Nigeria). Vantage Luxury Realty does not claim proprietary developer ownership of listed residences. Property specifications, asking prices, and availability are subject to contract verification with listing principals prior to site viewing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-[#5E6370]">
            <div>
              © {new Date().getFullYear()} Vantage Luxury Realty. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Abuja Geographic Information Systems (AGIS) Verified</span>
              <span>·</span>
              <span>Privacy & NDA Protocol</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
