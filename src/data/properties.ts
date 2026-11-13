import maitamaDuplexImg from '../assets/images/maitama_duplex_residence_1794063270579.jpg';
import heroVillaImg from '../assets/images/hero_abuja_luxury_villa_1794063269976.jpg';
import guzapeMansionImg from '../assets/images/guzape_modern_mansion_1794063272211.jpg';
import katampeResidenceImg from '../assets/images/katampe_luxury_residence_1794063272325.jpg';
import asokoroEstateImg from '../assets/images/asokoro_hilltop_estate_1794063271005.jpg';

export const ASSET_IMAGES = {
  hero: heroVillaImg,
  maitama: maitamaDuplexImg,
  guzape: guzapeMansionImg,
  katampe: katampeResidenceImg,
  asokoro: asokoroEstateImg
};

export const ASSET_VIDEOS = {
  heroReel: '/videos/abuja_hero_reel.mp4',
  maitama: '/videos/maitama_tour.mp4',
  asokoro: '/videos/asokoro_tour.mp4',
  guzape: '/videos/guzape_tour.mp4',
  katampe: '/videos/katampe_tour.mp4'
};

export interface Property {
  id: string;
  code: string;
  title: string;
  district: 'Maitama' | 'Asokoro' | 'Guzape' | 'Katampe Extension' | 'Wuse II';
  locationDetail: string;
  priceNaira: number;
  propertyType: 'Luxury Duplex' | 'Detached Duplex' | 'Penthouse' | 'Ambassadorial Mansion';
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  landSize: string;
  builtArea: string;
  summary: string;
  description: string[];
  amenities: string[];
  featured: boolean;
  images: string[];
  videoUrl: string;
  sourceAttribution: string;
  sourceUrlText: string;
  lastVerifiedDate: string;
  status: 'Available' | 'Under Offer' | 'Private Review';
  coordinates: {
    lat: number;
    lng: number;
  };
  investmentHighlights?: {
    rentalYield: string;
    targetTenant: string;
    capitalAppreciation: string;
  };
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-01',
    code: 'VLR-MT-01',
    title: '6-Bedroom Ultra-Luxury Duplex with Private Elevator',
    district: 'Maitama',
    locationDetail: "Ministers' Quarters, Maitama, Abuja",
    priceNaira: 1200000000, // ₦1.2 Billion
    propertyType: 'Luxury Duplex',
    bedrooms: 6,
    bathrooms: 7,
    parkingSpaces: 6,
    landSize: '1,500 sqm',
    builtArea: '880 sqm',
    summary: 'An opulent architectural masterpiece situated in the secure heart of Ministers’ Quarters, featuring a private glass elevator, infinity pool, and expansive landscaped grounds.',
    description: [
      "Nestled inside the ultra-exclusive Ministers' Quarters in Maitama, this exceptional residence defines prestige in the Federal Capital Territory. The residence commands an elevated parcel with sweeping sightlines and unmatched privacy.",
      "The home features a bespoke panoramic glass passenger elevator servicing all three levels, an expansive master wing with his-and-hers walk-in dressing suites, imported Italian marble flooring, and double-height ceiling voids in the grand reception salon.",
      "Outdoors, a turquoise infinity swimming pool is flanked by an open-air pavilion, shaded dining pergola, and a self-contained 2-bedroom staff quarters (BQ) with independent access."
    ],
    amenities: [
      'Panoramic Glass Elevator',
      'Turquoise Infinity Pool',
      '2-Room Staff Quarters (BQ)',
      'Underground Water Filtration & Borehole',
      'Dedicated 50kVA Inverter & Solar Backup',
      '6-Vehicle Covered Motor Court',
      'Automated Access Control & Perimeter CCTV',
      'Fitted Chef Kitchen with Miele Appliances',
      'Private Home Cinema / Media Room'
    ],
    featured: true,
    images: [
      maitamaDuplexImg,
      heroVillaImg
    ],
    videoUrl: '/videos/maitama_tour.mp4',
    sourceAttribution: 'PropertyPro Nigeria',
    sourceUrlText: 'propertypro.ng/advert/maitama-ministers-quarters-duplex',
    lastVerifiedDate: 'November 2026',
    status: 'Available',
    coordinates: {
      lat: 9.0915,
      lng: 7.4952
    },
    investmentHighlights: {
      rentalYield: '₦65M - ₦80M p.a.',
      targetTenant: 'Diplomatic Missions & Multinational C-Suite',
      capitalAppreciation: '18.4% 3-Yr Avg'
    }
  },
  {
    id: 'prop-02',
    code: 'VLR-GZ-02',
    title: '5-Bedroom Fully Detached Contemporary Duplex with BQ',
    district: 'Guzape',
    locationDetail: 'FHA Guzape (Diplomatic Zone), Abuja',
    priceNaira: 600000000, // ₦600 Million
    propertyType: 'Detached Duplex',
    bedrooms: 5,
    bathrooms: 6,
    parkingSpaces: 5,
    landSize: '950 sqm',
    builtArea: '620 sqm',
    summary: 'A modernist architectural haven in FHA Guzape with panoramic views of the Abuja hillside, private swimming pool, and high-spec European fittings.',
    description: [
      'Positioned along the scenic ridge of FHA Guzape, this newly completed 5-bedroom residence captures the essence of contemporary tropical architecture with clean lines and expansive glass fenestrations.',
      'The open-concept layout seamlessly bridges indoor formal dining with an outdoor sun deck and private swimming pool. Every bedroom is an en-suite sanctuary with customized walnut millwork and designer sanitary ware.',
      'Includes a fully finished self-contained boys quarters (BQ), dedicated laundry room, solar energy integration, and multi-zone climate conditioning throughout.'
    ],
    amenities: [
      'Private Heated Swimming Pool',
      'Self-Contained 1-Bed BQ',
      'Fitted Designer Kitchen with Island',
      'Smart Home Lighting & Sound Automation',
      'Hillside Panoramic Viewing Balcony',
      'Borehole with Industrial Osmosis System',
      'High-Clearance 5-Car Paved Driveway',
      'Perimeter Electric Fencing & Guard House'
    ],
    featured: true,
    images: [
      guzapeMansionImg,
      heroVillaImg
    ],
    videoUrl: '/videos/guzape_tour.mp4',
    sourceAttribution: 'PropertyAgentsNG',
    sourceUrlText: 'propertyagentsng.com/listings/fha-guzape-5bed-detached',
    lastVerifiedDate: 'November 2026',
    status: 'Available',
    coordinates: {
      lat: 9.0298,
      lng: 7.5195
    },
    investmentHighlights: {
      rentalYield: '₦35M - ₦42M p.a.',
      targetTenant: 'Expatriate Consultants & Tech Executives',
      capitalAppreciation: '22.1% 3-Yr Avg'
    }
  },
  {
    id: 'prop-03',
    code: 'VLR-KT-03',
    title: '4-Bedroom Detached Luxury Residence on Elevated Plateau',
    district: 'Katampe Extension',
    locationDetail: 'Katampe Extension Diplomatic Hill, Abuja',
    priceNaira: 460000000, // ₦460 Million
    propertyType: 'Detached Duplex',
    bedrooms: 4,
    bathrooms: 5,
    parkingSpaces: 4,
    landSize: '800 sqm',
    builtArea: '520 sqm',
    summary: 'Architecturally striking residence blending slate stone with warm timber slats, offering peaceful hill views and fast accessibility to Maitama.',
    description: [
      'Located in the serene elevated corridor of Katampe Extension (often referred to as Abuja’s diplomatic hillside enclave), this 4-bedroom detached villa delivers privacy and modern architectural refinement.',
      'The exterior showcases rich horizontal timber cladding contrasted against dark basalt stonework and floor-to-ceiling glass balconies. Inside, high ceilings and expansive corridors channel natural cross-ventilation.',
      'Equipped with an imported gourmet kitchen, private family lounge on the first level, motorized security gate, and an independent en-suite domestic staff unit.'
    ],
    amenities: [
      'Elevated City View Terraces',
      'Fully Fitted Granite Kitchen',
      'Private Domestic Staff Suite',
      'Solar Hybrid Energy Setup',
      'Automated Sliding Gate & Intercom',
      'Starlight Ambient Night Lighting',
      'Custom Walk-in Wardrobes in All Suites',
      'Industrial Water Storage Facility'
    ],
    featured: true,
    images: [
      katampeResidenceImg,
      heroVillaImg
    ],
    videoUrl: '/videos/katampe_tour.mp4',
    sourceAttribution: 'PropertyAgentsNG',
    sourceUrlText: 'propertyagentsng.com/listings/katampe-extension-4bed',
    lastVerifiedDate: 'November 2026',
    status: 'Available',
    coordinates: {
      lat: 9.1028,
      lng: 7.4612
    },
    investmentHighlights: {
      rentalYield: '₦28M - ₦34M p.a.',
      targetTenant: 'Diplomatic Aides & Corporate Directors',
      capitalAppreciation: '19.8% 3-Yr Avg'
    }
  },
  {
    id: 'prop-04',
    code: 'VLR-AS-04',
    title: '5-Bedroom Luxury Detached Villa with Panoramic Rooftop Lounge',
    district: 'Asokoro',
    locationDetail: 'Asokoro Extension (Hillside Ridge), Abuja',
    priceNaira: 1200000000, // ₦1.2 Billion
    propertyType: 'Luxury Duplex',
    bedrooms: 5,
    bathrooms: 6,
    parkingSpaces: 6,
    landSize: '1,400 sqm',
    builtArea: '820 sqm',
    summary: 'A hilltop architectural statement in Asokoro Extension boasting an executive rooftop entertaining deck, infinity edge pool, and bronze facade detailing.',
    description: [
      'Commanding one of Asokoro Extension’s most prestigious hillside addresses, this 5-bedroom luxury villa is engineered for high-society entertaining and sovereign privacy.',
      'The centerpiece is an expansive open-air rooftop entertaining terrace equipped with ambient perimeter LED ribbons, outdoor wet bar, and 360-degree vistas overlooking the Aso Rock range and Abuja central district.',
      'Complete with private security post, 2-bedroom detached service quarters, bespoke Italian fitted kitchen with central breakfast island, and private ground-floor executive study.'
    ],
    amenities: [
      'Executive Rooftop Terrace & Sky Lounge',
      'Infinity Edge Lap Pool',
      '2-Bed Attached Service Quarters',
      'German Fitted Wet & Dry Kitchens',
      'Dedicated Armed Guard Security Outpost',
      'Borehole with Tri-Stage Purification',
      'Smart Fingerprint & Facial Recognition Entry',
      'Integrated High-Fidelity Audio System'
    ],
    featured: true,
    images: [
      asokoroEstateImg,
      heroVillaImg
    ],
    videoUrl: '/videos/asokoro_tour.mp4',
    sourceAttribution: 'Nigeria Property Centre',
    sourceUrlText: 'nigeriapropertycentre.com/for-sale/houses/detached-duplexes/abuja/asokoro/1.2b-5bed-rooftop',
    lastVerifiedDate: 'November 2026',
    status: 'Available',
    coordinates: {
      lat: 9.0442,
      lng: 7.5328
    },
    investmentHighlights: {
      rentalYield: '₦70M - ₦85M p.a.',
      targetTenant: 'Ambassadors & Global Financial Institutions',
      capitalAppreciation: '17.2% 3-Yr Avg'
    }
  },
  {
    id: 'prop-05',
    code: 'VLR-WS-05',
    title: '4-Bedroom Executive Penthouse with Private Sky Garden',
    district: 'Wuse II',
    locationDetail: 'Adetokunbo Ademola Crescent Corridor, Wuse II, Abuja',
    priceNaira: 750000000, // ₦750 Million
    propertyType: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    parkingSpaces: 3,
    landSize: 'N/A (Strata Title)',
    builtArea: '560 sqm',
    summary: 'An exclusive crown penthouse residence in vibrant Wuse II with direct private elevator entry, 24/7 uninterrupted power, concierge service, and wrap-around city views.',
    description: [
      'Perched atop one of Wuse II’s premier boutique residential towers, this penthouse offers the epitome of metropolitan luxury in the Federal Capital.',
      'Direct elevator access opens directly into a private reception vestibule leading to a dramatic double-volume living salon. Floor-to-ceiling glass frames dynamic views across Abuja’s high-end lifestyle district.',
      'Includes 24/7 dedicated facility management, dual standby 250kVA Perkins generators, Olympic-standard communal gymnasium, and high-speed fiber connectivity.'
    ],
    amenities: [
      'Direct Key-Card Penthouse Elevator',
      'Wrap-Around Private Sky Garden',
      '24/7 Uninterrupted Prime Power Grid',
      'Concierge & Uniformed Security',
      'Private 3-Bay Secure Basement Parking',
      'Designer Poggenpohl Kitchen Suite',
      'Integrated Wine Cellar & Cigar Lounge',
      'Full Home Automation System'
    ],
    featured: false,
    images: [
      heroVillaImg,
      maitamaDuplexImg
    ],
    videoUrl: '/videos/abuja_hero_reel.mp4',
    sourceAttribution: 'Private Property Nigeria',
    sourceUrlText: 'privateproperty.com.ng/abuja/wuse-2/luxury-penthouse',
    lastVerifiedDate: 'November 2026',
    status: 'Available',
    coordinates: {
      lat: 9.0745,
      lng: 7.4762
    },
    investmentHighlights: {
      rentalYield: '₦45M - ₦55M p.a.',
      targetTenant: 'Multinational Heads & Diplomatic Attachés',
      capitalAppreciation: '16.5% 3-Yr Avg'
    }
  },
  {
    id: 'prop-06',
    code: 'VLR-MT-06',
    title: '7-Bedroom Ambassadorial Compound with Olympic Pool & Guest Lodge',
    district: 'Maitama',
    locationDetail: 'Amazon Street / Mississippi Enclave, Maitama, Abuja',
    priceNaira: 2800000000, // ₦2.8 Billion
    propertyType: 'Ambassadorial Mansion',
    bedrooms: 7,
    bathrooms: 9,
    parkingSpaces: 10,
    landSize: '3,200 sqm',
    builtArea: '1,450 sqm',
    summary: 'A monumental sovereign-grade estate on over 3,200 sqm in prime Maitama. Tailored for diplomatic chancelleries, ambassadors, and multi-generational family offices.',
    description: [
      'A rare offering in the most tightly held diplomatic enclave in West Africa. This compound spans 3,200 square meters of prime Maitama soil, walled behind 4-meter reinforced perimeter masonry.',
      'The main palace houses 7 cavernous bedroom suites, an official banquet hall seating 24 guests, state-of-the-art security bunker, private lift, and a fully detached 3-bedroom guest chancellery lodge.',
      'The grounds feature a 25-meter Olympic lap pool, manicured date palms, private helipad landing pad space, and armored motor court accommodating over 10 vehicles.'
    ],
    amenities: [
      '3,200 sqm Sovereign Diplomatic Compound',
      '25m Olympic Lap Pool & Cabana',
      'Detached 3-Bed Guest Chancellery Lodge',
      'Commercial-Grade Industrial Kitchen',
      '10-Car Armored Motor Court',
      'Triple-Redundant Solar & Generator Power',
      'Reinforced Security Safe Room',
      'Chamberlain Staff Quarters (4 Units)'
    ],
    featured: false,
    images: [
      heroVillaImg,
      asokoroEstateImg
    ],
    videoUrl: '/videos/abuja_hero_reel.mp4',
    sourceAttribution: 'PropertyPro Nigeria',
    sourceUrlText: 'propertypro.ng/advert/maitama-ambassadorial-compound',
    lastVerifiedDate: 'November 2026',
    status: 'Private Review',
    coordinates: {
      lat: 9.0888,
      lng: 7.4912
    },
    investmentHighlights: {
      rentalYield: '₦140M - ₦180M p.a.',
      targetTenant: 'Sovereign Diplomatic Embassy / Ambassador Residence',
      capitalAppreciation: '15.0% 3-Yr Avg'
    }
  }
];

export interface DistrictInfo {
  id: string;
  name: 'Maitama' | 'Asokoro' | 'Guzape' | 'Katampe Extension' | 'Wuse II';
  tagline: string;
  description: string;
  averagePriceSqm: string;
  diplomaticPresence: string;
  securityRating: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
}

export const ABUJA_DISTRICTS: DistrictInfo[] = [
  {
    id: 'dist-maitama',
    name: 'Maitama',
    tagline: "The Pinnacle of Diplomatic Prestige",
    description: "Abuja’s most established sovereign address, home to foreign embassies, ministers, and top-tier diplomatic missions. Unmatched security infrastructure and tranquil tree-lined boulevards.",
    averagePriceSqm: '₦850,000 / sqm',
    diplomaticPresence: 'High (US, UK, EU missions corridor)',
    securityRating: 'Tier 1 Prime Zone',
    coordinates: { lat: 9.0882, lng: 7.4933 },
    highlights: ["Ministers' Quarters", 'Transcorp Hilton Axis', 'IBB Golf Course Proximity', 'Amazon & Mississippi Street Enclaves']
  },
  {
    id: 'dist-asokoro',
    name: 'Asokoro',
    tagline: 'Sovereign Hills & Presidential Enclave',
    description: 'Nestled directly beside the Presidential Villa and ECOWAS secretariat, Asokoro is celebrated for hill-elevated estates with sweeping vistas over Aso Rock and the National Arboretum.',
    averagePriceSqm: '₦800,000 / sqm',
    diplomaticPresence: 'High (ECOWAS, High Commissions)',
    securityRating: 'Tier 1 Sovereign Zone',
    coordinates: { lat: 9.0433, lng: 7.5312 },
    highlights: ['Aso Rock Panoramic Views', 'Yakubu Gowon Crescent', 'Asokoro Extension Ridge', 'Maximum Surveillance Corridor']
  },
  {
    id: 'dist-guzape',
    name: 'Guzape',
    tagline: "Abuja's Architectural Renaissance",
    description: 'The premier contemporary growth district, offering modern multi-level villas perched on dramatic rocky elevations with commanding views of the city skyline.',
    averagePriceSqm: '₦550,000 / sqm',
    diplomaticPresence: 'Growing Expatriate & Executive Enclave',
    securityRating: 'Tier 1 Residential',
    coordinates: { lat: 9.0289, lng: 7.5189 },
    highlights: ['Hilltop Topography', 'Modern Minimalist Architecture', 'FHA Prime Section', 'Rapid Capital Appreciation']
  },
  {
    id: 'dist-katampe',
    name: 'Katampe Extension',
    tagline: 'The Elevated Sanctuary',
    description: 'Perched above the city with cool hill breezes and immediate 5-minute arterial links to Maitama, Katampe Extension is Abuja’s choice for serene luxury detached homes.',
    averagePriceSqm: '₦480,000 / sqm',
    diplomaticPresence: 'Medium (Diplomats & Senior Executives)',
    securityRating: 'Tier 1 Gated Zones',
    coordinates: { lat: 9.1022, lng: 7.4589 },
    highlights: ['Panoramic Sunset Ridges', '5-Min Drive to Maitama', 'Lower Density Living', 'Custom Architectural Duplexes']
  },
  {
    id: 'dist-wuse2',
    name: 'Wuse II',
    tagline: 'Metropolitan Sophistication & Luxury Penthouses',
    description: 'Abuja’s cosmopolitan epicenter, combining fine dining, exclusive retail, and elite residential penthouses with 24/7 security and high rental yields.',
    averagePriceSqm: '₦620,000 / sqm',
    diplomaticPresence: 'Corporate & Consular Presence',
    securityRating: 'Tier 1 Monitored Hub',
    coordinates: { lat: 9.0734, lng: 7.4739 },
    highlights: ['Adetokunbo Ademola Corridor', 'High-Yield Rental Performance', 'Boutique Penthouse Living', 'Fine Dining & Lifestyle']
  }
];

export function formatNaira(amount: number): string {
  if (amount >= 1000000000) {
    const b = amount / 1000000000;
    return `₦${b.toFixed(b % 1 === 0 ? 0 : 2)} Billion`;
  }
  if (amount >= 1000000) {
    const m = amount / 1000000;
    return `₦${m.toFixed(m % 1 === 0 ? 0 : 0)} Million`;
  }
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatUSD(amountInNaira: number, exchangeRate = 1600): string {
  const usd = amountInNaira / exchangeRate;
  if (usd >= 1000000) {
    return `$${(usd / 1000000).toFixed(2)}M`;
  }
  return `$${Math.round(usd).toLocaleString('en-US')}`;
}
