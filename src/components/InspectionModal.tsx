import React, { useState, useEffect } from 'react';
import { Property, formatNaira } from '../data/properties';
import { X, Calendar, ShieldCheck, CheckCircle2, Phone, Mail, User, Clock, Building, ArrowRight } from 'lucide-react';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  propertiesList: Property[];
  mode?: 'inspection' | 'consultation' | 'enquiry';
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  property,
  propertiesList,
  mode = 'inspection'
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPropertyCode, setSelectedPropertyCode] = useState(property?.code || '');
  const [budget, setBudget] = useState('₦600M - ₦1.2B');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 1:00 PM)');
  const [requiresChauffeur, setRequiresChauffeur] = useState(false);
  const [requiresNDA, setRequiresNDA] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    if (property) {
      setSelectedPropertyCode(property.code);
    }
  }, [property]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    const ref = `VLR-INSP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingReference(ref);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={handleResetAndClose} />

      <div className="relative w-full max-w-xl bg-[#181A1F] border border-[#2A2D35] rounded-3xl shadow-2xl z-10 text-[#F4F0E8] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#121316] border-b border-[#252830] px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
              Vantage Private Client Division
            </span>
            <h3 className="font-serif text-lg font-bold text-white mt-0.5">
              {mode === 'inspection' ? 'Schedule Confidential Inspection' : 'Private Property Advisory Briefing'}
            </h3>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 text-[#A0A4B0] hover:text-white rounded-full hover:bg-[#252830] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#C5A880]/10 border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-white">Inspection Request Confirmed</h4>
              <p className="text-sm text-[#A0A4B0] max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{fullName}</span>. Your dedicated Vantage private client associate will contact you within 2 hours to confirm security protocol and access credentials.
              </p>
            </div>

            <div className="bg-[#121316] p-4 rounded-xl border border-[#252830] text-xs space-y-1.5 max-w-md mx-auto text-left">
              <div className="flex justify-between">
                <span className="text-[#A0A4B0]">Reference Code:</span>
                <span className="font-mono text-[#C5A880] font-semibold">{bookingReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A0A4B0]">Property Code:</span>
                <span className="text-white">{selectedPropertyCode || 'Portfolio Briefing'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A0A4B0]">Preferred Date:</span>
                <span className="text-white">{preferredDate || 'Earliest available'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A0A4B0]">Confidentiality:</span>
                <span className="text-emerald-400">Strict NDA Protocol Protected</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-[#C5A880] text-[#121316] font-semibold text-sm hover:bg-[#D4AF37] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
            
            {/* Property Target Indicator */}
            {property && (
              <div className="p-3 bg-[#121316] rounded-xl border border-[#2A2D35] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-[#A0A4B0] block">Target Listing</span>
                  <span className="font-serif text-sm font-semibold text-[#F4F0E8]">{property.title}</span>
                  <span className="text-[11px] text-[#C5A880] block">{property.locationDetail} · {formatNaira(property.priceNaira)}</span>
                </div>
                <span className="font-mono text-xs px-2 py-1 rounded bg-[#242832] text-[#A0A4B0]">{property.code}</span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="space-y-3">
              <div>
                <label className="block text-[#A0A4B0] mb-1 font-medium">Full Legal Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#7E8392]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief Dr. Aminu Bello / Ambassador..."
                    className="w-full pl-9 pr-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Direct Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-[#7E8392]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full pl-9 pr-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Confidential Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[#7E8392]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@enterprise.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Property of Interest</label>
                  <select
                    value={selectedPropertyCode}
                    onChange={(e) => setSelectedPropertyCode(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="">General Portfolio Exploration</option>
                    {propertiesList.map((p) => (
                      <option key={p.id} value={p.code}>
                        {p.code} - {p.district} ({formatNaira(p.priceNaira)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Target Acquisition Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="₦400M - ₦600M">₦400M - ₦600 Million</option>
                    <option value="₦600M - ₦1.2B">₦600M - ₦1.2 Billion</option>
                    <option value="₦1.2B - ₦2.5B">₦1.2B - ₦2.5 Billion</option>
                    <option value="₦2.5B+">₦2.5 Billion + (Ambassadorial Tier)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Preferred Inspection Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#7E8392]" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Preferred Window</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-[#7E8392]" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      <option>Morning (10:00 AM - 1:00 PM)</option>
                      <option>Afternoon (1:00 PM - 4:00 PM)</option>
                      <option>Sunset Viewing (4:30 PM - 6:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Protocol Toggles */}
              <div className="pt-2 flex flex-col gap-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-[#A0A4B0] hover:text-white">
                  <input
                    type="checkbox"
                    checked={requiresNDA}
                    onChange={(e) => setRequiresNDA(e.target.checked)}
                    className="rounded border-[#2A2D35] text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <span>Execute standard Non-Disclosure Agreement (NDA) prior to estate site visit</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[#A0A4B0] hover:text-white">
                  <input
                    type="checkbox"
                    checked={requiresChauffeur}
                    onChange={(e) => setRequiresChauffeur(e.target.checked)}
                    className="rounded border-[#2A2D35] text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <span>Request armored chauffeur escort from Transcorp Hilton / Nnamdi Azikiwe International Airport</span>
                </label>
              </div>

              <div>
                <label className="block text-[#A0A4B0] mb-1 font-medium">Specific Requests / Brief</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquiring regarding payment terms, legal title documentation verification (C of O), or off-market options..."
                  className="w-full px-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#252830]">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all shadow-lg shadow-[#C5A880]/15 flex items-center justify-center gap-2"
              >
                <span>Submit Confidential Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-[#7E8392]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Encrypted transmission · Direct associate dispatch</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
