import { ProposalData } from '../types';
import { calculatePackagePricing } from './packageScopes';

export const DEFAULT_PROPOSAL: ProposalData = {
  id: 'proposal-keran-001',
  clientName: 'Eng. Karim El-Sayed',
  companyName: 'KÉRAN Architecture & Interiors',
  contactPerson: 'Founder & Principal Architect',
  proposalDate: 'September 2026',
  projectTitle: 'KÉRAN // Signature Digital Presence System',
  currentSituation: 'KÉRAN possesses an exceptional portfolio of executed luxury residential villas across New Cairo (Katameya Dunes, Lake View) and Sheikh Zayed. However, the studio relies almost entirely on fragmented Instagram posts and direct WhatsApp messages, with no cohesive digital trust architecture prior to initial meetings.',
  specificObservations: 'High-net-worth villa owners who discover KÉRAN on Instagram are forced to navigate through dozens of unorganized highlights to see executed work. There is no clear distinction between architectural design vs full turnkey finishing packages, resulting in senior staff spending hours answering basic qualification questions.',
  identifiedProblems: [
    'Portfolio Fragmentation: High-value executed projects scattered across social media without architectural context, material specs, or spatial depth.',
    'Time Sink Inquiries: Inability to filter client budgets (7.5M+ EGP / $150k+) prior to direct engineer consultation.',
    'Weak Trust Velocity: Wealthy villa principals cannot verify the full breadth of turnkey craftsmanship on an authoritative, branded digital asset.',
    'Zero Conversion Architecture: Inbound visitors bounce without taking a structured, qualified next step toward an architectural consultation.'
  ],
  opportunity: 'Position KÉRAN as the undisputed premier turnkey interior atelier in New Cairo and Sheikh Zayed, commanding premium design fees and filtering out unqualified inquiries before they reach leadership.',
  objectives: [
    'Establish an authoritative, editorial digital showroom commanding 0.01% Quiet Luxury aesthetics.',
    'Separate core services cleanly: Turnkey Architectural Fit-Out vs Bespoke Interior Architecture.',
    'Implement a streamlined client intake journey that qualifies property typology, compound location, and project timeline.',
    'Achieve lightning-fast load speeds (<1.0s) optimized for mobile viewports on iOS Safari and Android.'
  ],
  recommendedSolution: 'The NYVEQ Signature Digital Presence System — a bespoke, high-performance web platform engineered with interactive project showcases, sensory transformation highlights, and a zero-leakage consultation qualification mechanism.',
  scope: [
    'Up to 5 pages (Home, Projects Index, Single Project Case Studies, Services/Turnkey, About, Consultation Booking, Contact)',
    'Curated showcase of up to 15 premier projects with category filtering and material highlights',
    'VIP Consultation Intake Drawer with Direct WhatsApp and phone routing',
    'Sub-1.0s mobile performance on ultra-fast edge infrastructure',
    'Production domain deployment, SSL activation, and SEO foundation',
    '3 rounds of structured client revisions',
    '60 days of comprehensive post-launch priority hypercare and optimization'
  ],
  deliverables: [
    {
      title: 'Signature Digital Platform',
      description: 'A custom-coded, ultra-fast web domain reflecting KÉRAN’s quiet luxury aesthetic using Instrument Serif and obsidian palettes (up to 5 pages).'
    },
    {
      title: 'Curated Project Showcase (Up to 15 Projects)',
      description: 'Up to 15 premier executed residential case studies detailed with photography, built-up area (BUA), material choices, and location context.'
    },
    {
      title: 'Sensory Metamorphosis Showcase',
      description: 'Interactive comparison showing raw structural shell versus finished luxury turnkey handover.'
    },
    {
      title: 'Autonomous VIP Intake Drawer',
      description: 'Pre-qualification form capturing property type (Standalone Villa, Palace, Penthouse), compound, and built-up area before routing to WhatsApp.'
    },
    {
      title: 'Production Deployment & SLA',
      description: 'Seamless DNS routing to custom domain with SSL, performance verification, and zero downtime.'
    }
  ],
  process: [
    {
      phase: 'Phase 01: Audit & Information Architecture',
      duration: 'Days 01–03',
      details: 'Review all executed project assets, define layout hierarchy, and finalize core conversion copy.'
    },
    {
      phase: 'Phase 02: Platform Engineering & Motion',
      duration: 'Days 04–11',
      details: 'Build custom responsive interface, project showcases, and typography systems at 60fps performance.'
    },
    {
      phase: 'Phase 03: Intake Funnel Integration & Testing',
      duration: 'Days 12–15',
      details: 'Integrate VIP consultation flow, connect WhatsApp routing, and perform rigorous multi-device testing.'
    },
    {
      phase: 'Phase 04: Revision Sprint & Launch',
      duration: 'Days 16–18',
      details: 'Consolidated feedback review, client sign-off, DNS domain propagation, and official live handover.'
    }
  ],
  timeline: '10–18 Business Days from Deposit & Asset Handover',
  investment: '21,997 EGP Build Fee (+ optional 1,497 EGP/mo Managed Care)',
  deposit: '10,999 EGP (50% to secure commencement sprint)',
  remainingPayment: '10,998 EGP (50% upon final staging sign-off prior to live DNS launch)',
  revisionPolicy: 'Includes 3 rounds of structured revisions prior to final launch to ensure total alignment.',
  includedSupport: '60 days of complimentary post-launch priority support, daily backups, and security monitoring.',
  exclusions: [
    'On-site photography or videography production (provided by client)',
    'Third-party domain registration fees (if not already owned)',
    'Ongoing paid advertising budget or social media management'
  ],
  nextStep: 'To secure this production sprint, reply via WhatsApp or email to approve this proposal. We will issue the commencement agreement and deposit invoice immediately.',
  status: 'draft',
  createdAt: '2026-09-07',
  packageConfig: calculatePackagePricing('signature', false)
};
