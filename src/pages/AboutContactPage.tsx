import React, { useState } from 'react';
import { Property, formatNaira, ASSET_IMAGES } from '../data/properties';
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Send,
  Lock,
  ArrowRight,
  Award,
  Users2,
  Briefcase,
  TrendingUp
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

interface AboutContactPageProps {
  properties: Property[];
  onOpenConsultation: () => void;
}

// Vantage Realty Maitama Office Coordinates
const OFFICE_COORDINATES = { lat: 9.0912, lng: 7.4948 };

export const AboutContactPage: React.FC<AboutContactPageProps> = ({
  properties,
  onOpenConsultation
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyOfInterest, setPropertyOfInterest] = useState('');
  const [budget, setBudget] = useState('₦600M - ₦1.2B');
  const [inspectionDate, setInspectionDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    const ref = `VLR-CON-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketRef(ref);
    setSubmitted(true);
  };

  const whatsAppDirectUrl = `https://wa.me/2348095008000?text=${encodeURIComponent(
    'Hello Vantage Luxury Realty, I would like to schedule an introductory private advisory consultation regarding Abuja prime residential acquisitions.'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
      
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden border border-[#252830] bg-[#181A1F] p-8 sm:p-16 lg:p-20 text-center space-y-6">
        <div className="absolute inset-0 bg-radial from-[#C5A880]/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
            Vantage Luxury Realty · Corporate Profile
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F0E8] leading-tight text-balance">
            PROPERTY IS MORE THAN AN ADDRESS. <br />
            <span className="italic font-normal text-[#C5A880]">IT'S A STATEMENT.</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#A0A4B0] max-w-2xl mx-auto leading-relaxed">
            Representing high-net-worth individuals, diplomatic missions, and institutional family offices in the acquisition of Abuja’s most distinguished residential assets.
          </p>
        </div>

        {/* Corporate Trust Badges */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs text-[#E8E3D9]">
          <div className="p-4 rounded-xl bg-[#121316] border border-[#252830]">
            <Award className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
            <span className="font-semibold block text-white">Maitama & Asokoro Focus</span>
            <span className="text-[11px] text-[#8E929F]">Sovereign residential core</span>
          </div>
          <div className="p-4 rounded-xl bg-[#121316] border border-[#252830]">
            <Lock className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
            <span className="font-semibold block text-white">Confidential Mandates</span>
            <span className="text-[11px] text-[#8E929F]">Discreet off-market access</span>
          </div>
          <div className="p-4 rounded-xl bg-[#121316] border border-[#252830]">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
            <span className="font-semibold block text-white">Verified Title Due Diligence</span>
            <span className="text-[11px] text-[#8E929F]">AGIS & FCDA authenticated</span>
          </div>
          <div className="p-4 rounded-xl bg-[#121316] border border-[#252830]">
            <Users2 className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
            <span className="font-semibold block text-white">Private Client Associates</span>
            <span className="text-[11px] text-[#8E929F]">Dedicated partner representation</span>
          </div>
        </div>
      </section>

      {/* COMPANY INTRODUCTION, MISSION & VISION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              The Firm
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Redefining Abuja Prime Real Estate Advisory
            </h2>
          </div>

          <p className="text-sm text-[#B0B4C0] leading-relaxed">
            Headquartered in the prestigious diplomatic district of Maitama, Vantage Luxury Realty operates at the highest tier of Nigeria’s luxury residential market. We bridge discerning property buyers with authentic, verified properties for sale across Abuja’s sovereign corridors.
          </p>

          <p className="text-sm text-[#B0B4C0] leading-relaxed">
            In a market often complicated by opaque listings and unverified titles, Vantage maintains rigorous institutional transparency. We never invent developments or claim proprietary ownership of third-party resales. Every asset in our portfolio is meticulously researched, legal title cross-checked against Abuja Geographic Information Systems (AGIS), and verified with listing partners prior to client viewing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-[#181A1F] border border-[#252830] space-y-2">
              <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider block">Our Mission</span>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                To provide high-net-worth investors and diplomatic entities with uncompromising advisory, total discretion, and verified access to Abuja’s finest residential real estate.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#181A1F] border border-[#252830] space-y-2">
              <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider block">Our Vision</span>
              <p className="text-xs text-[#A0A4B0] leading-relaxed">
                To be West Africa's benchmark luxury real estate brokerage, setting international standards for fiduciary integrity, architectural curation, and private client service.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden border border-[#2A2D35] bg-[#181A1F] shadow-2xl">
            <img
              src={ASSET_IMAGES.maitama}
              alt="Vantage Maitama Architectural Residence"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true';
                  target.src = '/images/maitama_duplex_residence_1794063270579.jpg';
                }
              }}
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#121316]/90 backdrop-blur-md border border-[#2A2D35] text-xs">
              <div className="flex items-center gap-2 text-[#C5A880] font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Prime Maitama Ministers' Hill Axis</span>
              </div>
              <p className="text-[#A0A4B0] mt-1 text-[11px]">
                Advising on transactions from ₦450 Million detached duplexes to ₦3.0 Billion ambassadorial compounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE SERVICES PILLARS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
            Comprehensive Advisory Suite
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Core Brokerage & Advisory Services
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A4B0]">
            Four pillars of representation structured around the unique needs of wealthy buyers and institutional investors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service 1 */}
          <div className="p-6 rounded-2xl bg-[#181A1F] border border-[#252830] hover:border-[#C5A880]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Property Acquisition Advisory</h3>
            <p className="text-xs text-[#A0A4B0] leading-relaxed">
              Bespoke buyer representation. We curate properties matching strict architectural, security, and location criteria, conducting exhaustive title searches before submission.
            </p>
            <ul className="text-xs text-[#E8E3D9] space-y-1.5 pt-2 border-t border-[#252830]">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Off-market portfolio sourcing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Title verification with AGIS/FCDA</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Price benchmark analysis</span>
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="p-6 rounded-2xl bg-[#181A1F] border border-[#252830] hover:border-[#C5A880]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Luxury Residential Sales</h3>
            <p className="text-xs text-[#A0A4B0] leading-relaxed">
              Targeted representation for verified sellers and estate owners in Maitama, Asokoro, and Guzape, reaching qualified domestic and international buyers.
            </p>
            <ul className="text-xs text-[#E8E3D9] space-y-1.5 pt-2 border-t border-[#252830]">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Architectural photography & media</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Vetted buyer qualification</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Confidential negotiation</span>
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="p-6 rounded-2xl bg-[#181A1F] border border-[#252830] hover:border-[#C5A880]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Investment Consultation</h3>
            <p className="text-xs text-[#A0A4B0] leading-relaxed">
              Structuring real estate holdings for wealth preservation, hedge against currency devaluation, and diplomatic lease income optimization.
            </p>
            <ul className="text-xs text-[#E8E3D9] space-y-1.5 pt-2 border-t border-[#252830]">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Yield modeling & lease forecasting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Embassy lease negotiations</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Capital redeployment strategy</span>
              </li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="p-6 rounded-2xl bg-[#181A1F] border border-[#252830] hover:border-[#C5A880]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Private Property Inspections</h3>
            <p className="text-xs text-[#A0A4B0] leading-relaxed">
              Unaccompanied or chauffeured estate viewings conducted under strict NDA. Designed for public officials, corporate chairs, and foreign dignitaries.
            </p>
            <ul className="text-xs text-[#E8E3D9] space-y-1.5 pt-2 border-t border-[#252830]">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Non-disclosure compliance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Armored escort upon request</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                <span>Comprehensive technical review</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* INTERACTIVE CONTACT FORM & HEADQUARTERS DETAILS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Details & Google Map Pin (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Abuja Headquarters
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Connect With Our Partners
            </h2>
            <p className="text-xs text-[#A0A4B0]">
              Our private offices are centrally located in Maitama. Consultations are scheduled by prior appointment to safeguard client privacy.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="bg-[#181A1F] rounded-2xl border border-[#252830] p-6 space-y-4 text-xs">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Abuja Office:</span>
                <span className="text-[#A0A4B0] leading-relaxed block">
                  14 Amazon Street, Ministers' Hill Enclave, Maitama, Abuja, FCT, Nigeria
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-3 border-t border-[#252830]">
              <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Direct Private Client Lines:</span>
                <a href="tel:+2348095008000" className="text-[#E8E3D9] hover:text-[#C5A880] block">
                  +234 (0) 809 500 8000
                </a>
                <a href="tel:+2349024009000" className="text-[#A0A4B0] hover:text-[#C5A880] block">
                  +234 (0) 902 400 9000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-3 border-t border-[#252830]">
              <Mail className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Confidential Inquiries:</span>
                <a href="mailto:privateclient@vantagerealty.ng" className="text-[#C5A880] hover:underline block">
                  privateclient@vantagerealty.ng
                </a>
                <span className="text-[11px] text-[#7E8392]">PGP Encrypted Mail Supported</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-3 border-t border-[#252830]">
              <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Advisory Hours:</span>
                <span className="text-[#A0A4B0] block">Monday – Friday: 08:30 – 18:00 WAT</span>
                <span className="text-[#A0A4B0] block">Saturday: By Private Appointment</span>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="pt-2">
              <a
                href={whatsAppDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+234 809 500 8000)</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map of Office */}
          <div className="rounded-2xl overflow-hidden border border-[#2A2D35] bg-[#181A1F] h-64 relative">
            <APIProvider apiKey={apiKey}>
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={OFFICE_COORDINATES}
                defaultZoom={15}
                gestureHandling="cooperative"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
              >
                <AdvancedMarker position={OFFICE_COORDINATES} title="Vantage Luxury Realty — Maitama Office">
                  <div className="bg-[#C5A880] text-[#121316] font-bold px-3 py-1.5 rounded-lg text-xs shadow-xl flex items-center gap-1.5 border border-white">
                    <MapPin className="w-4 h-4" />
                    <span>Vantage Office · Maitama</span>
                  </div>
                </AdvancedMarker>
              </Map>
            </APIProvider>
          </div>
        </div>

        {/* Working Comprehensive Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#181A1F] border border-[#2A2D35] rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
              Confidential Client Intake
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              Request Private Property Consultation
            </h3>
            <p className="text-xs text-[#A0A4B0] mt-1">
              Please complete the brief below. A Senior Partner will reach out within 2 hours with tailored portfolio recommendations.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">Consultation Intake Received</h4>
              <p className="text-sm text-[#A0A4B0] max-w-md mx-auto">
                Thank you, <strong className="text-white">{fullName}</strong>. Your consultation file has been assigned under reference <span className="font-mono text-[#C5A880] font-semibold">{ticketRef}</span>.
              </p>
              <div className="p-4 bg-[#121316] rounded-xl border border-[#252830] text-xs max-w-sm mx-auto text-left space-y-1">
                <div><span className="text-[#8E929F]">Budget Bracket:</span> <span className="text-white font-medium">{budget}</span></div>
                <div><span className="text-[#8E929F]">Property Focus:</span> <span className="text-white font-medium">{propertyOfInterest || 'Full Portfolio'}</span></div>
                <div><span className="text-[#8E929F]">Preferred Date:</span> <span className="text-white font-medium">{inspectionDate || 'Earliest slot'}</span></div>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#242832] text-xs font-semibold text-white hover:bg-[#2F3442]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-[#A0A4B0] mb-1 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Senator / Dr. / Alhaji / Mr. ..."
                  className="w-full px-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Phone Number (with country code) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full px-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Confidential Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Property of Interest</label>
                  <select
                    value={propertyOfInterest}
                    onChange={(e) => setPropertyOfInterest(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="">General Abuja Acquisition</option>
                    {properties.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.code} - {p.district} ({formatNaira(p.priceNaira)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#A0A4B0] mb-1 font-medium">Investment Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="₦400M - ₦600M">₦400M – ₦600 Million</option>
                    <option value="₦600M - ₦1.2B">₦600M – ₦1.2 Billion</option>
                    <option value="₦1.2B - ₦2.5B">₦1.2B – ₦2.5 Billion</option>
                    <option value="₦2.5B+">₦2.5 Billion + (Ambassadorial Enclave)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A0A4B0] mb-1 font-medium">Preferred Inspection Date</label>
                <input
                  type="date"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[#A0A4B0] mb-1 font-medium">Additional Message / Specifications</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify particular requirements such as swimming pool, elevator, security outpost, land size, or diplomatic lease targets..."
                  className="w-full px-4 py-2.5 bg-[#121316] border border-[#2A2D35] rounded-xl text-white placeholder-[#5E6370] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-semibold text-sm transition-all shadow-lg shadow-[#C5A880]/15 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Advisory Request</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-[#7E8392] pt-2">
                All communications handled under non-disclosure protocol · Abuja Geographic Information Systems (AGIS) title verified.
              </div>
            </form>
          )}

        </div>

      </section>

    </div>
  );
};
