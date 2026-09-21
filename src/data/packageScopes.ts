import { PackageTier, ScopeItem, ProposalSectionItem, PackageConfig } from '../types';

export interface PackagePresetDefinition {
  tier: PackageTier;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  standardBuildFee: number;
  monthlyCareFee: number;
  timeline: string;
  revisionPolicy: string;
  includedSupport: string;
  recommendedFor: string;
  features: string[];
  deliverables: ScopeItem[];
}

export const PACKAGE_PRESETS: Record<PackageTier, PackagePresetDefinition> = {
  presence: {
    tier: 'presence',
    name: 'Presence System',
    tagline: 'Establish a credible, high-aesthetic architectural presence for studios currently relying exclusively on Instagram.',
    description: 'Single-page architectural digital presence designed for emerging studios to immediately elevate beyond social media and capture qualified private inquiries.',
    standardBuildFee: 12997,
    monthlyCareFee: 997,
    timeline: '7–12 business days',
    revisionPolicy: '2 comprehensive structured review rounds prior to production deployment.',
    includedSupport: '14 days post-launch warranty, managed hosting, monthly backups & uptime monitoring.',
    recommendedFor: 'Emerging interior designers and boutique finishing studios moving beyond Instagram DMs.',
    features: [
      'Single-Page Architectural Monograph',
      'Curated Portfolio Showcase (Up to 8 Projects)',
      'Instant WhatsApp Ingestion Bridge',
      'Mobile-First Luxury Performance (<2s)',
      'Foundational Architectural SEO Setup',
      'Managed Cloud Infrastructure & Domain Setup',
    ],
    deliverables: [
      {
        id: 'pres-1',
        deliverableNumber: 'DELIVERABLE 01',
        title: 'Single-Page Architectural Monograph',
        description: 'A focused, editorial single-page web experience showcasing studio identity, curated projects, and core services with zero fluff.',
        enabled: true,
        category: 'core',
      },
      {
        id: 'pres-2',
        deliverableNumber: 'DELIVERABLE 02',
        title: 'Curated Portfolio Showcase (Up to 8 Projects)',
        description: 'High-resolution image gallery highlighting standout residential or commercial executions with clean project metadata.',
        enabled: true,
        category: 'portfolio',
      },
      {
        id: 'pres-3',
        deliverableNumber: 'DELIVERABLE 03',
        title: 'Instant WhatsApp Ingestion Bridge',
        description: 'Direct WhatsApp click-to-chat action pre-configured with project inquiry parameters to accelerate prospect response time.',
        enabled: true,
        category: 'conversion',
      },
      {
        id: 'pres-4',
        deliverableNumber: 'DELIVERABLE 04',
        title: 'Mobile-First Luxury Performance',
        description: 'Optimized specifically for high-net-worth clients browsing from mobile devices with sub-2-second load speeds.',
        enabled: true,
        category: 'performance',
      },
      {
        id: 'pres-5',
        deliverableNumber: 'DELIVERABLE 05',
        title: 'Basic Architectural Search Optimization',
        description: 'Google Search Console setup and foundational on-page meta tags for studio name and primary operating location.',
        enabled: true,
        category: 'seo',
      },
    ],
  },

  signature: {
    tier: 'signature',
    name: 'Signature System',
    badge: 'MOST RECOMMENDED',
    tagline: 'The complete digital presence standard for established Egyptian interior design and finishing firms handling high-ticket residential contracts.',
    description: 'Multi-page editorial digital platform engineering complete brand authority, interactive project exploration, and high-ticket qualification.',
    standardBuildFee: 21997,
    monthlyCareFee: 1497,
    timeline: '10–18 business days',
    revisionPolicy: '3 dedicated revision rounds across structure, content, and staging.',
    includedSupport: '60 days priority hypercare, automated daily backups, security monitoring, and 2 content updates/month.',
    recommendedFor: 'Established ateliers competing for 2M–10M+ EGP residential turnkey finishing commissions.',
    features: [
      'Multi-Page Editorial Atelier Experience (3–5 Pages)',
      'Interactive Project Explorer with Category Filtering',
      'High-Ticket Project Inquiry Brief & Qualification Gate',
      'Inquiry Dispatch & WhatsApp VIP Channel Integration',
      'Interactive Finishes & Materiality Component',
      'Executive Social Proof & Endorsement Architecture',
      'Complete Architectural On-Page SEO Engine',
      'Custom Domain, Security & Private Staging Review',
    ],
    deliverables: [
      {
        id: 'sig-1',
        deliverableNumber: 'DELIVERABLE 01',
        title: 'Multi-Page Editorial Atelier Experience (3–5 Pages)',
        description: 'Complete digital platform comprising Home Monograph, Curated Portfolio, Methodology & Finishes, About the Atelier, and Contact & Brief.',
        enabled: true,
        category: 'core',
      },
      {
        id: 'sig-2',
        deliverableNumber: 'DELIVERABLE 02',
        title: 'Interactive Project Explorer with Category Filtering',
        description: 'Dynamic portfolio categorized by typology (Turnkey Villas, Penthouses, Commercial Ateliers) with individual project deep-dives.',
        enabled: true,
        category: 'portfolio',
      },
      {
        id: 'sig-3',
        deliverableNumber: 'DELIVERABLE 03',
        title: 'High-Ticket Project Inquiry Brief & Qualification Gate',
        description: 'Bespoke inquiry questionnaire capturing project location, budget range, and timeline to eliminate unqualified price shoppers.',
        enabled: true,
        category: 'qualification',
      },
      {
        id: 'sig-4',
        deliverableNumber: 'DELIVERABLE 04',
        title: 'Inquiry Dispatch & WhatsApp VIP Channel Integration',
        description: 'Instant synchronized notifications to WhatsApp and private Google Sheet tracker for zero response lag.',
        enabled: true,
        category: 'conversion',
      },
      {
        id: 'sig-5',
        deliverableNumber: 'DELIVERABLE 05',
        title: 'Interactive Finishes & Materiality Preview Component',
        description: 'Showcases the firm’s craft, material standards (marble, wood, lighting), and architectural execution process.',
        enabled: true,
        category: 'brand',
      },
      {
        id: 'sig-6',
        deliverableNumber: 'DELIVERABLE 06',
        title: 'Executive Social Proof & Endorsement Architecture',
        description: 'Editorial presentation of client commendations, compound locations (Katameya Dunes, Palm Hills, etc.), and industry standing.',
        enabled: true,
        category: 'authority',
      },
      {
        id: 'sig-7',
        deliverableNumber: 'DELIVERABLE 07',
        title: 'Complete Architectural On-Page SEO Engine',
        description: 'Targeted local and regional keyword structuring for Egyptian luxury real estate and interior finishing terms.',
        enabled: true,
        category: 'seo',
      },
      {
        id: 'sig-8',
        deliverableNumber: 'DELIVERABLE 08',
        title: 'Custom Domain, Security & Private Staging Review',
        description: 'High-security SSL configuration, custom domain DNS management, and private staging preview prior to public launch.',
        enabled: true,
        category: 'infrastructure',
      },
    ],
  },

  authority: {
    tier: 'authority',
    name: 'Authority System',
    tagline: 'Monumental digital platform for top-tier master builders and ateliers targeting high-net-worth investors across Egypt and the Gulf.',
    description: 'Monumental bespoke digital flagship with full Arabic/English bilingual architecture, investor-grade inquiry screening, and sovereign CDN infrastructure.',
    standardBuildFee: 34997,
    monthlyCareFee: 1997,
    timeline: '15–25 business days',
    revisionPolicy: '4 dedicated sprint revision rounds with direct executive access.',
    includedSupport: '90 days executive hypercare, continuous speed optimization, monthly strategy check-in, and priority SLA.',
    recommendedFor: 'Premier architectural ateliers and master builders handling multi-million EGP private compounds and regional clients.',
    features: [
      'Monumental Multi-Page Digital Flagship Platform',
      'Arabic & English Full Bilingual Infrastructure',
      'Multi-Facet Master Project Explorer with Case Studies',
      'Private VIP Consultation Gate & Budget Filter (7.5M+ EGP)',
      'Direct CRM & Multi-Channel Dispatch Ingestion',
      'Founder Monograph & Atelier Legacy Showcase',
      'Interactive Architectural Process & Material Specification',
      'Regional Gulf & Egyptian High-Authority SEO Engine',
      'Ultra-Performance Sovereign CDN & Hosting (99.99% SLA)',
    ],
    deliverables: [
      {
        id: 'auth-1',
        deliverableNumber: 'DELIVERABLE 01',
        title: 'Monumental Multi-Page Digital Flagship Platform',
        description: 'Bespoke architectural design system reflecting monumental quiet luxury with editorial typography and kinetic transitions.',
        enabled: true,
        category: 'core',
      },
      {
        id: 'auth-2',
        deliverableNumber: 'DELIVERABLE 02',
        title: 'Arabic & English Full Bilingual Infrastructure',
        description: 'Flawlessly crafted bilingual copy reflecting nuanced architectural terminology in both Arabic and English.',
        enabled: true,
        category: 'bilingual',
      },
      {
        id: 'auth-3',
        deliverableNumber: 'DELIVERABLE 03',
        title: 'Multi-Facet Master Project Explorer with Case Studies',
        description: 'Exhaustive project galleries featuring architectural blueprints, material palettes, before/after photography, and video embed.',
        enabled: true,
        category: 'portfolio',
      },
      {
        id: 'auth-4',
        deliverableNumber: 'DELIVERABLE 04',
        title: 'Private VIP Consultation Gate & Budget Filter',
        description: 'Executive project intake pipeline that screens for verified 7.5M+ EGP / $150k+ contracts before scheduling consultations.',
        enabled: true,
        category: 'qualification',
      },
      {
        id: 'auth-5',
        deliverableNumber: 'DELIVERABLE 05',
        title: 'Direct CRM & Multi-Channel Dispatch Ingestion',
        description: 'Direct pipeline synchronization into Google Sheets / Airtable / CRM with real-time lead notification.',
        enabled: true,
        category: 'conversion',
      },
      {
        id: 'auth-6',
        deliverableNumber: 'DELIVERABLE 06',
        title: 'Founder Monograph & Atelier Legacy Showcase',
        description: 'Distinguished profile celebrating founder background, professional certifications, and executed landmark residences.',
        enabled: true,
        category: 'authority',
      },
      {
        id: 'auth-7',
        deliverableNumber: 'DELIVERABLE 07',
        title: 'Interactive Architectural Process & Material Specification',
        description: 'Comprehensive breakdown of design phases, 3D visualization, MEP engineering, and on-site turnkey supervision standards.',
        enabled: true,
        category: 'brand',
      },
      {
        id: 'auth-8',
        deliverableNumber: 'DELIVERABLE 08',
        title: 'Regional Gulf & Egyptian High-Authority SEO Engine',
        description: 'Strategic search optimization capturing regional queries from Gulf investors acquiring prime Egyptian coastal & Cairo properties.',
        enabled: true,
        category: 'seo',
      },
      {
        id: 'auth-9',
        deliverableNumber: 'DELIVERABLE 09',
        title: 'Ultra-Performance CDN & Sovereign Hosting Architecture',
        description: 'Enterprise CDN deployment ensuring instantaneous media rendering globally with 99.99% uptime guarantee.',
        enabled: true,
        category: 'infrastructure',
      },
    ],
  },

  founding: {
    tier: 'founding',
    name: 'Founding Launch Partner Cohort',
    tagline: 'Exclusive partnership tier for 5–7 qualified Egyptian design firms. Presence build fee waived (0 EGP) in exchange for verified case study, metrics, and video testimonial.',
    description: 'Presence System digital monograph with 12,997 EGP build fee waived completely for the first 5–7 qualified launch partners. Managed care at 997 EGP/month.',
    standardBuildFee: 12997,
    monthlyCareFee: 997,
    timeline: '7–12 business days',
    revisionPolicy: '2 comprehensive structured review rounds prior to production deployment.',
    includedSupport: '14 days post-launch warranty, managed hosting, monthly backups & uptime monitoring.',
    recommendedFor: 'Strictly limited cohort of 5–7 high-reputation ateliers in New Cairo, Katameya, and Sheikh Zayed.',
    features: [
      'Complete Presence Architectural Monograph (Build Fee Waived)',
      'Curated Portfolio Showcase (Up to 8 Projects)',
      'Instant WhatsApp Ingestion Bridge',
      'Mobile-First Luxury Performance (<2s)',
      'Foundational Architectural SEO Setup',
      'Editorial Co-Branding & Flagship Case Study Feature',
    ],
    deliverables: [
      {
        id: 'found-1',
        deliverableNumber: 'DELIVERABLE 01',
        title: 'Single-Page Architectural Monograph (Build Fee Waived)',
        description: 'A focused, editorial single-page web experience showcasing studio identity, curated projects, and core services with zero fluff.',
        enabled: true,
        category: 'core',
      },
      {
        id: 'found-2',
        deliverableNumber: 'DELIVERABLE 02',
        title: 'Curated Portfolio Showcase (Up to 8 Projects)',
        description: 'High-resolution image gallery highlighting standout residential or commercial executions with clean project metadata.',
        enabled: true,
        category: 'portfolio',
      },
      {
        id: 'found-3',
        deliverableNumber: 'DELIVERABLE 03',
        title: 'Instant WhatsApp Ingestion Bridge',
        description: 'Direct WhatsApp click-to-chat action pre-configured with project inquiry parameters to accelerate prospect response time.',
        enabled: true,
        category: 'conversion',
      },
      {
        id: 'found-4',
        deliverableNumber: 'DELIVERABLE 04',
        title: 'Editorial Co-Branding & Case Study Showcase',
        description: 'Feature as a flagship NYVEQ Founding Partner with verified metrics and high-visibility architectural prestige.',
        enabled: true,
        category: 'authority',
      },
      {
        id: 'found-5',
        deliverableNumber: 'DELIVERABLE 05',
        title: 'Custom Domain, Security & Managed Cloud Infrastructure',
        description: 'Complete high-performance CDN deployment, SSL certification, and priority staging preview.',
        enabled: true,
        category: 'infrastructure',
      },
    ],
  },
};

export const FOUNDING_OFFER = {
  totalSpots: 7,
  allocatedSpots: 3,
  remainingSpots: 4,
  targetTier: 'presence' as PackageTier,
  standardFee: 12997,
  partnerFee: 0,
  monthlyCare: 997,
  savingsAmount: 12997,
  requirements: [
    'Portfolio of minimum 3 completed residential or commercial projects',
    'Active Instagram account with minimum 1,500 followers or high-end portfolio',
    'Agreement to 30-minute founder discovery interview',
    'Agreement to provide written + video testimonial upon launch',
    'Commitment to Managed Care Retainer (997 EGP/month) to ensure uptime & maintenance',
    'Agreement to be featured as a NYVEQ case study',
  ],
  terms: [
    'Build fee waived entirely (12,997 EGP value)',
    'Client covers domain purchase (~$12–$20/year) and specialized third-party tool accounts if required',
    'Managed Care Retainer (997 EGP/month) begins at production launch',
    'Non-transferable to other entities',
    'NYVEQ retains rights to feature the project in agency portfolio, social media, and case study documentation',
  ],
};

export const DEFAULT_PROPOSAL_SECTIONS: ProposalSectionItem[] = [
  { id: 'sec-1', key: 'hero', title: 'Cover & Title', subtitle: 'Atelier Branding & Monograph Header', enabled: true, order: 1 },
  { id: 'sec-2', key: 'executive_summary', title: 'Executive Summary', subtitle: 'Strategic Overview for the Founder', enabled: true, order: 2 },
  { id: 'sec-3', key: 'current_situation', title: 'Current Context', subtitle: 'Present Digital Reality & Ingestion Gaps', enabled: true, order: 3 },
  { id: 'sec-4', key: 'identified_problems', title: 'Diagnostic Findings', subtitle: 'Structural Conversion Bottlenecks', enabled: true, order: 4 },
  { id: 'sec-5', key: 'the_opportunity', title: 'The Opportunity', subtitle: 'Commercial & Brand Potential', enabled: true, order: 5 },
  { id: 'sec-6', key: 'recommended_solution', title: 'Recommended Solution', subtitle: 'Digital Presence System Strategy', enabled: true, order: 6 },
  { id: 'sec-7', key: 'what_we_will_build', title: 'Scope & Deliverables', subtitle: 'Comprehensive Architectural Deliverables', enabled: true, order: 7 },
  { id: 'sec-8', key: 'process', title: 'Execution Methodology', subtitle: 'Sprint Phases & Collaborative Milestones', enabled: true, order: 8 },
  { id: 'sec-9', key: 'timeline', title: 'Timeline & Milestones', subtitle: 'Target Delivery Window', enabled: true, order: 9 },
  { id: 'sec-10', key: 'investment', title: 'Investment Structure', subtitle: 'Transparent Capital Commitment', enabled: true, order: 10 },
  { id: 'sec-11', key: 'managed_care', title: 'Managed Care Retainer', subtitle: 'Continuous Support, Backups & Maintenance', enabled: true, order: 11 },
  { id: 'sec-12', key: 'terms_summary', title: 'Terms & Policies', subtitle: 'Payment Schedule, Revisions & Warranty', enabled: true, order: 12 },
  { id: 'sec-13', key: 'next_step', title: 'Next Steps & Acceptance', subtitle: 'How to Proceed With NYVEQ', enabled: true, order: 13 },
];

export function getStandardScope(tier: PackageTier): ScopeItem[] {
  const preset = PACKAGE_PRESETS[tier] || PACKAGE_PRESETS.signature;
  return preset.deliverables.map((d) => ({ ...d }));
}

export function getDefaultSections(): ProposalSectionItem[] {
  return DEFAULT_PROPOSAL_SECTIONS.map((s) => ({ ...s }));
}

export function formatEGP(amount: number): string {
  return `${amount.toLocaleString('en-US')} EGP`;
}

export function calculatePackagePricing(
  tier: PackageTier,
  isFoundingPartner: boolean,
  specialApprovedPrice?: number
): PackageConfig {
  const preset = PACKAGE_PRESETS[tier] || PACKAGE_PRESETS.signature;
  const standardFee = preset.standardBuildFee;
  let actualBuildFee = standardFee;

  if (isFoundingPartner) {
    if (tier === 'presence' || tier === 'founding') {
      // Automatic waiver for Presence tier under Founding Partner cohort
      actualBuildFee = 0;
    } else if (typeof specialApprovedPrice === 'number' && !isNaN(specialApprovedPrice) && specialApprovedPrice >= 0) {
      // Manual special approved price for Signature or Authority
      actualBuildFee = Math.round(specialApprovedPrice);
    } else {
      actualBuildFee = standardFee;
    }
  } else if (typeof specialApprovedPrice === 'number' && !isNaN(specialApprovedPrice) && specialApprovedPrice >= 0) {
    actualBuildFee = Math.round(specialApprovedPrice);
  }

  // 50/50 payment split: Kickoff deposit = ceil(50%), Final launch payment = remainder
  const kickoffDeposit = actualBuildFee === 0 ? 0 : Math.ceil(actualBuildFee * 0.5);
  const beforeLaunchPayment = actualBuildFee === 0 ? 0 : actualBuildFee - kickoffDeposit;

  return {
    tier,
    isFoundingPartner,
    specialApprovedPrice,
    standardBuildFee: standardFee,
    actualBuildFee,
    kickoffDeposit,
    beforeLaunchPayment,
    monthlyCareFee: preset.monthlyCareFee,
    timeline: preset.timeline,
    revisionPolicy: preset.revisionPolicy,
  };
}
