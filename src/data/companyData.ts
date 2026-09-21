import { AgencyTask } from '../types';
import { PACKAGE_PRESETS, FOUNDING_OFFER } from './packageScopes';

export const COMPANY_CONTEXT = {
  name: "NYVEQ",
  founder: "Ahmed",
  domain: "nyveq.com",
  type: "Digital systems studio / client acquisition & digital presence systems company",
  positioning: "NYVEQ builds high-conversion digital presence systems for interior design and finishing firms.",
  operatingPhilosophy: "Start with the business problem, not the tool.",
  designPhilosophy: "CLARITY > COMPLEXITY",
  currentStage: "Pre-Launch / Market Validation",
  primaryGoal: "Acquire the first paying clients and validate the offer.",
  primaryNiche: "Interior Design & Finishing Companies in Egypt",
  activeOffer: "NYVEQ Digital Presence System // 3-Tier Architecture + Founding Partner Cohort",
  
  // Package Architecture - dynamically populated from canonical source of truth
  packages: {
    presence: {
      id: "presence",
      name: PACKAGE_PRESETS.presence.name,
      tierLabel: "Entry / Foundation",
      buildPrice: `${PACKAGE_PRESETS.presence.standardBuildFee.toLocaleString()} EGP`,
      buildPriceNum: PACKAGE_PRESETS.presence.standardBuildFee,
      managedCareMonthly: `${PACKAGE_PRESETS.presence.monthlyCareFee.toLocaleString()} EGP / Month`,
      managedCareMonthlyNum: PACKAGE_PRESETS.presence.monthlyCareFee,
      scopePages: "Single-page architectural monograph",
      scopeProjects: "Up to 8 featured projects",
      revisions: PACKAGE_PRESETS.presence.revisionPolicy,
      deliveryTimeline: PACKAGE_PRESETS.presence.timeline,
      postLaunchSupport: PACKAGE_PRESETS.presence.includedSupport,
      idealFor: PACKAGE_PRESETS.presence.recommendedFor
    },
    signature: {
      id: "signature",
      name: PACKAGE_PRESETS.signature.name,
      tierLabel: "Most Recommended // Core System",
      buildPrice: `${PACKAGE_PRESETS.signature.standardBuildFee.toLocaleString()} EGP`,
      buildPriceNum: PACKAGE_PRESETS.signature.standardBuildFee,
      managedCareMonthly: `${PACKAGE_PRESETS.signature.monthlyCareFee.toLocaleString()} EGP / Month`,
      managedCareMonthlyNum: PACKAGE_PRESETS.signature.monthlyCareFee,
      scopePages: "Multi-page editorial atelier experience (3–5 pages)",
      scopeProjects: "Interactive project explorer with category filtering",
      revisions: PACKAGE_PRESETS.signature.revisionPolicy,
      deliveryTimeline: PACKAGE_PRESETS.signature.timeline,
      postLaunchSupport: PACKAGE_PRESETS.signature.includedSupport,
      idealFor: PACKAGE_PRESETS.signature.recommendedFor
    },
    authority: {
      id: "authority",
      name: PACKAGE_PRESETS.authority.name,
      tierLabel: "Full Sovereign Scale",
      buildPrice: `${PACKAGE_PRESETS.authority.standardBuildFee.toLocaleString()} EGP+`,
      buildPriceNum: PACKAGE_PRESETS.authority.standardBuildFee,
      managedCareMonthly: `${PACKAGE_PRESETS.authority.monthlyCareFee.toLocaleString()} EGP / Month`,
      managedCareMonthlyNum: PACKAGE_PRESETS.authority.monthlyCareFee,
      scopePages: "Monumental multi-page digital flagship platform (Arabic & English bilingual)",
      scopeProjects: "Multi-facet master project explorer with case studies",
      revisions: PACKAGE_PRESETS.authority.revisionPolicy,
      deliveryTimeline: PACKAGE_PRESETS.authority.timeline,
      postLaunchSupport: PACKAGE_PRESETS.authority.includedSupport,
      idealFor: PACKAGE_PRESETS.authority.recommendedFor
    }
  },

  // Founding Launch Offer (Special Cohort)
  foundingOffer: {
    name: "Founding Launch Partner Cohort",
    concept: "Build fee waived in exchange for proof and collaboration",
    buildFeeOriginal: `${PACKAGE_PRESETS.presence.standardBuildFee.toLocaleString()} EGP (Presence Tier)`,
    buildFeeWaived: "0 EGP (100% Build Fee Waived)",
    seatsLimit: `${FOUNDING_OFFER.totalSpots} Design Firms Only (${FOUNDING_OFFER.remainingSpots} Remaining)`,
    clientObligations: FOUNDING_OFFER.requirements,
    strictRule: "NEVER pitch as a 'free website'. Always position as 'Build fee waived for 5–7 founding design partners in exchange for a case study.'"
  },

  currentPriority: "Execute targeted outreach across New Cairo and Sheikh Zayed studios to close first clients and launch founding case studies.",
  targetLocations: [
    "New Cairo (Katameya Heights, Katameya Dunes, Lake View, Mivida)",
    "Sheikh Zayed & 6th of October (Palm Hills, Allegria, Arkan)",
    "Maadi & Zamalek",
    "Alexandria & North Coast (Phase 2)",
    "Dubai & Riyadh (Phase 3 Regional Expansion)"
  ],
  expansionModel: "Founding Cohort (5–7 Case Studies) → Repeatable Paid Engine (Signature 21,997 EGP) → Gulf & Regional Ateliers",
  
  coreHypothesis: `Many top-tier interior design & finishing companies in Egypt have:
• Exceptional executed residential and commercial projects
• High craftsmanship and verified execution capacity
• Active Instagram profiles showcasing beautiful finishes

Yet suffer from:
• Outdated, broken, or completely missing official websites
• High-value portfolios fragmented across Instagram posts, highlights, and WhatsApp PDFs
• Unclear service distinction (design-only vs. turnkey finishing fit-out)
• Weak digital trust architecture when pitching HNW villa owners (10M+ EGP contracts)
• Zero structured qualification flow to filter serious high-budget inquiries from window shoppers.`
};

export const INITIAL_TASKS: AgencyTask[] = [
  // Completed
  { id: 'c-1', title: 'Company Name & Brand Anchor: NYVEQ', category: 'completed', completed: true },
  { id: 'c-2', title: 'Domain Acquired & Secured: nyveq.com', category: 'completed', completed: true },
  { id: 'c-3', title: 'Public Digital Platform V1 (Next.js flagship builds)', category: 'completed', completed: true },
  { id: 'c-4', title: 'Core Market Positioning defined (Clarity > Complexity)', category: 'completed', completed: true },
  { id: 'c-5', title: 'Initial Niche Locked: Interior Design & Finishing (Egypt)', category: 'completed', completed: true },
  { id: 'c-6', title: 'Ideal Client Profile (ICP V1) formulated', category: 'completed', completed: true },
  { id: 'c-7', title: '3-Tier Pricing Model Locked (Presence 12,997 / Signature 21,997 / Authority 34,997 EGP)', category: 'completed', completed: true },
  { id: 'c-8', title: 'Founding Launch Partner Structure defined (Build fee waived for 5-7 firms)', category: 'completed', completed: true },
  { id: 'c-9', title: '5-Angle Cold Call Opener Matrix formulated', category: 'completed', completed: true },
  { id: 'c-10', title: 'Value-First Instagram DM Framework established', category: 'completed', completed: true },
  { id: 'c-11', title: 'Demo Boundary Locked: 10–20 min focused live walkthrough', category: 'completed', completed: true },

  // Currently Building
  { id: 'b-1', title: 'NYVEQ Agency HQ (Internal Operating System V1)', category: 'building', completed: false, description: 'Single source of truth, SOP engine, CRM pipeline, and proposal builder' },
  { id: 'b-2', title: 'Unified CRM Pipeline (17 Standard Stages)', category: 'building', completed: false, description: 'Enforce rule: No lead without a Next Action' },
  { id: 'b-3', title: 'Prospect Research & Diagnosis Protocol', category: 'building', completed: false, description: '5-7 min qualification protocol to identify 1 real digital flaw' },

  // Next (Immediate focus)
  { id: 'n-1', title: 'Assemble first 15 qualified Grade A/B interior studios', category: 'next', completed: false },
  { id: 'n-2', title: 'Execute targeted Cold Calls using 5-Angle Matrix', category: 'next', completed: false },
  { id: 'n-3', title: 'Execute personalized Instagram DMs for studios without direct phone numbers', category: 'next', completed: false },
  { id: 'n-4', title: 'Conduct 15-20 min Diagnostic Discovery calls with studio founders', category: 'next', completed: false },
  { id: 'n-5', title: 'Present 10-20 min focused Live Demos showing studio projects in modern UI', category: 'next', completed: false },
  { id: 'n-6', title: 'Send web-based Proposals (Signature Tier @ 21,997 EGP or Founding Partner)', category: 'next', completed: false },
  { id: 'n-7', title: 'Collect 50% deposit and sign Client #01', category: 'next', completed: false },
  { id: 'n-8', title: 'Execute onboarding and deliver live platform within 10–18 business days', category: 'next', completed: false },

  // Later (Future)
  { id: 'l-1', title: 'Complex CRM Backends & Multi-board Systems', category: 'later', completed: false, description: '[FUTURE / NOT ACTIVE]' },
  { id: 'l-2', title: 'Automated n8n Webhooks & Auto-emails', category: 'later', completed: false, description: '[FUTURE / NOT ACTIVE]' },
  { id: 'l-3', title: 'Autonomous Multi-Agent AI Intake Engines', category: 'later', completed: false, description: '[FUTURE / NOT ACTIVE]' },
  { id: 'l-4', title: 'Paid Ad Client Acquisition Funnels', category: 'later', completed: false, description: '[FUTURE / NOT ACTIVE]' },
  { id: 'l-5', title: 'Team Hiring (Developers, 3D Artists, SDRs)', category: 'later', completed: false, description: '[FUTURE / NOT ACTIVE]' },
  { id: 'l-6', title: 'Client Portal with Live Project Tracking', category: 'later', completed: false, description: '[FUTURE / NOT ACTIVE]' }
];

export const ROADMAP_STAGES = [
  {
    stage: "STAGE 0",
    name: "FOUNDATION",
    status: "MOSTLY COMPLETE",
    statusColor: "emerald",
    items: [
      { name: "Strategy & Core Positioning", done: true },
      { name: "Niche Selection: Interior Design & Finishing Egypt", done: true },
      { name: "3-Tier Pricing Model (12,997 / 21,997 / 34,997 EGP)", done: true },
      { name: "Founding Partner Strategy (5-7 Case Studies)", done: true },
      { name: "Ideal Client Profile (ICP V1)", done: true },
      { name: "Public Concept Website V1", done: true }
    ],
    summary: "Foundational agency narrative, pricing packages, and sales scripts established."
  },
  {
    stage: "STAGE 1",
    name: "MARKET ENTRY",
    status: "CURRENT ACTIVE STAGE",
    statusColor: "purple",
    items: [
      { name: "Build 15-Prospect Qualified Target List", done: true },
      { name: "Direct Outreach (Cold Calls & DMs using 5 Angles)", done: false },
      { name: "Initiate Discovery Conversations (6 Core Questions)", done: false },
      { name: "Book Initial Diagnostic Meetings", done: false }
    ],
    summary: "Validate the pitch with active interior studios in New Cairo and Sheikh Zayed."
  },
  {
    stage: "STAGE 2",
    name: "VALIDATION & FIRST CLIENTS",
    status: "PENDING",
    statusColor: "zinc",
    items: [
      { name: "Sign First Paying / Founding Partners", done: false },
      { name: "Execute Rapid Internal Onboarding (24-48h)", done: false },
      { name: "Deliver Platform within Package Timeline (10-18 days)", done: false },
      { name: "Client Launch & First Video/Written Testimonial", done: false }
    ],
    summary: "Prove offer viability and client satisfaction with real deliverables."
  },
  {
    stage: "STAGE 3",
    name: "REPEATABILITY",
    status: "LATER",
    statusColor: "zinc",
    items: [
      { name: "Standardize Repeatable Sales Motion", done: false },
      { name: "Streamline Component Delivery Pipeline", done: false },
      { name: "Scale Signature Package (21,997 EGP)", done: false },
      { name: "Expand Managed Care Retainers (1,497 EGP/mo)", done: false }
    ],
    summary: "Turn early case studies into a predictable monthly client acquisition engine."
  },
  {
    stage: "STAGE 4",
    name: "GROWTH",
    status: "LATER",
    statusColor: "zinc",
    items: [
      { name: "Paid Acquisition (Meta/LinkedIn Ads)", done: false },
      { name: "Automated Lead Routing & Follow-ups", done: false },
      { name: "AI-Powered Concierge Add-ons for Design Studios", done: false },
      { name: "Expand to Architecture & Landscaping Niches", done: false }
    ],
    summary: "Scale deal flow with capital, automation, and advanced tech."
  },
  {
    stage: "STAGE 5",
    name: "REGIONAL SCALE",
    status: "LATER",
    statusColor: "zinc",
    items: [
      { name: "Expand to Gulf Markets (Dubai, Riyadh, Doha)", done: false },
      { name: "Hire Project Lead & Full-Time Technologists", done: false },
      { name: "High-Ticket Enterprise Contracts ($10k+ USD)", done: false }
    ],
    summary: "Regional luxury digital systems studio dominating Gulf and Middle Eastern markets."
  }
];

export const CORE_OPERATING_PRINCIPLES = [
  {
    title: "Clarity > Complexity",
    description: "Every internal tool, client conversation, and deliverable must prioritize crystal-clear simplicity over flashy but useless sophistication."
  },
  {
    title: "Diagnose Before Prescribing",
    description: "Never pitch a solution until you understand their exact workflow, where their inquiries drop off, and how they currently present projects."
  },
  {
    title: "One Specific Observation",
    description: "Never send generic spam. Every single cold outreach must hinge on one real, truthful, verifiable observation from their actual work."
  },
  {
    title: "Listen More Than You Speak",
    description: "In discovery calls, the prospect should talk 70% of the time. The goal is to uncover real pain, not show off technical jargon."
  },
  {
    title: "Truth & Reality > False Hype",
    description: "Never invent metrics, case studies, or guarantees. NYVEQ wins through technical authority and engineering precision."
  },
  {
    title: "No Lead Without a Next Action",
    description: "A contact without a clear scheduled next step is a dead lead. Every interaction in the CRM must have an assigned date and next move."
  },
  {
    title: "A Digital Presence System, Not a Cheap Website",
    description: "We don't sell 'websites'. We build high-converting digital presence systems that elevate portfolio trust, filter high-ticket leads, and convert luxury villa inquiries."
  }
];
