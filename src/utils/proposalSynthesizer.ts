import { ProposalData, PackageTier } from '../types';
import { PACKAGE_PRESETS, calculatePackagePricing, formatEGP } from '../data/packageScopes';

export type ProposalTier = PackageTier | 'beta' | 'turnkey' | 'empire';

export interface SynthesizerParams {
  prospectName: string;
  firmName: string;
  contactTitle?: string;
  location: string;
  standoutProject: string;
  observedFlaw: string;
  tier: ProposalTier;
}

export function synthesizeProposal(params: SynthesizerParams): ProposalData {
  const {
    prospectName = 'Eng. Principal',
    firmName = 'Architectural Atelier',
    contactTitle = 'Founder & Managing Director',
    location = 'New Cairo & Sheikh Zayed',
    standoutProject = 'Private Residential Villa',
    observedFlaw = 'reliance on compressed social media galleries and manual WhatsApp qualification',
    tier = 'signature',
  } = params;

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const idTimestamp = Date.now().toString().slice(-6);

  // Normalize legacy tier keys
  const normalizedTier: PackageTier =
    tier === 'beta' ? 'founding' :
    tier === 'turnkey' ? 'signature' :
    tier === 'empire' ? 'authority' :
    tier;

  const isFounding = normalizedTier === 'founding';
  const pricing = calculatePackagePricing(normalizedTier, isFounding);

  // 1. PRESENCE PACKAGE (12,997 EGP)
  if (normalizedTier === 'presence') {
    return {
      id: `proposal-presence-${idTimestamp}`,
      clientName: prospectName,
      companyName: firmName,
      contactPerson: contactTitle,
      proposalDate: dateStr,
      projectTitle: `${firmName} // Presence Digital Architecture System`,
      currentSituation: `${firmName} demonstrates commendable craftsmanship across interior projects in ${location}, notably in works like "${standoutProject}". However, the firm currently lacks an authoritative official digital presence, relying instead on ${observedFlaw}. As a result, prospective clients searching on Google or seeking reassurance before committing cannot verify the studio's professional standing.`,
      specificObservations: `High-net-worth homeowners and commercial clients in ${location} expect immediate digital validation. Without a dedicated digital portfolio, initial conversations are slowed down by sending static PDFs or repetitive Instagram links.`,
      identifiedProblems: [
        `Missing Official Presence: Reliance on third-party social platforms leaves ${firmName} vulnerable to algorithmic changes and compressed imagery.`,
        `Low Digital Trust: High-budget clients comparing finishing studios favor firms with dedicated, professional web platforms.`,
        `Friction in Inquiries: Basic questions regarding service areas and past projects consume manual time over WhatsApp.`
      ],
      opportunity: `Establish an elegant, fast-loading digital footprint that validates ${firmName}'s execution quality and channels qualified inquiries directly to management.`,
      objectives: [
        `Deploy a focused, high-speed digital portfolio reflecting ${firmName}'s brand identity.`,
        `Curate up to 8 premier projects including "${standoutProject}" with high-resolution imagery.`,
        `Provide a streamlined inquiry path routing serious prospects directly to WhatsApp or phone.`,
        `Ensure 100% mobile optimization for high-status villa owners browsing on iPhone and Android.`
      ],
      recommendedSolution: `The NYVEQ Presence System — an essential, elegant digital presence engineered specifically for interior design studios ready to establish their official web authority.`,
      scope: [
        `Single-page architectural monograph reflecting studio identity and curated projects`,
        `Curation and presentation of up to 8 featured projects`,
        `Mobile-first luxury performance with sub-2s loading speeds`,
        `Instant WhatsApp ingestion bridge configured with pre-filled parameters`,
        `Basic architectural SEO setup (Google Search Console & on-page metadata)`,
        `2 rounds of structured client review prior to production deployment`,
        `14 days post-launch warranty, managed hosting, monthly backups & uptime monitoring`
      ],
      deliverables: [
        {
          title: 'Official Presence Web Monograph',
          description: `Custom-developed responsive single-page digital portfolio reflecting ${firmName}'s aesthetic language.`
        },
        {
          title: 'Featured Project Showcase (Up to 8 Projects)',
          description: `Spotlight projects with high-resolution imagery, location tags, and project metadata.`
        },
        {
          title: 'Direct WhatsApp Inquiry Bridge',
          description: 'Click-to-chat inquiry action configured with custom pre-filled greeting text.'
        },
        {
          title: 'Cloud Managed Deployment',
          description: 'Fast global CDN delivery, SSL encryption, and custom domain configuration.'
        }
      ],
      process: [
        {
          phase: 'Phase 01: Ingestion & Information Architecture',
          duration: 'Days 01–03',
          details: 'Gather high-res project photography, company details, and finalize page layouts.'
        },
        {
          phase: 'Phase 02: Platform Engineering & Review',
          duration: 'Days 04–08',
          details: 'Build responsive interface, upload featured projects, and conduct first revision round.'
        },
        {
          phase: 'Phase 03: Final Review & Live Deployment',
          duration: 'Days 09–12',
          details: 'Incorporate final feedback, configure domain DNS, SSL, and launch live.'
        }
      ],
      timeline: pricing.timeline,
      investment: `${formatEGP(pricing.standardBuildFee)} Build Fee (+ optional ${formatEGP(pricing.monthlyCareFee)}/mo Managed Care)`,
      deposit: `${formatEGP(pricing.kickoffDeposit)} (50% upfront deposit to initiate sprint)`,
      remainingPayment: `${formatEGP(pricing.beforeLaunchPayment)} (50% upon final staging sign-off before DNS launch)`,
      revisionPolicy: pricing.revisionPolicy,
      includedSupport: PACKAGE_PRESETS.presence.includedSupport,
      exclusions: [
        'On-site photo/video shooting (provided by client)',
        'Domain registration fees (if not already owned)',
        'Paid advertising or social media management'
      ],
      nextStep: `Confirm acceptance to begin the ${pricing.timeline} Presence sprint. We will issue the agreement and onboard project assets immediately.`,
      status: 'draft',
      createdAt: today.toISOString().split('T')[0],
      packageConfig: pricing
    };
  }

  // 2. AUTHORITY PACKAGE (34,997 EGP+)
  if (normalizedTier === 'authority') {
    return {
      id: `proposal-authority-${idTimestamp}`,
      clientName: prospectName,
      companyName: firmName,
      contactPerson: contactTitle,
      proposalDate: dateStr,
      projectTitle: `${firmName} // Authority Digital Architecture System`,
      currentSituation: `${firmName} commands an elite reputation delivering large-scale luxury residential finishing and architectural masterworks in ${location}, evidenced by landmark executions like "${standoutProject}". However, the firm's digital ecosystem does not fully reflect this commercial stature due to ${observedFlaw}. When competing for multi-million pound finishing tenders or regional clients, the current touchpoints under-communicate the firm's true sovereign capacity.`,
      specificObservations: `Ultra-high-net-worth villa owners and institutional clients demand deep architectural reassurance. They require comprehensive case studies, clear distinction between design and turnkey execution, and frictionless VIP inquiry routes before committing to eight-figure contracts.`,
      identifiedProblems: [
        `Scale Disconnect: Physical projects reach 10M–25M+ EGP, but digital channels feel informal, risking price resistance from elite clients.`,
        `Unfiltered Lead Influx: High-value studio principals spend valuable hours filtering unqualified inquiries manually.`,
        `Lack of Comprehensive Case Studies: Standout executions like "${standoutProject}" lack detailed spatial narratives, materials breakdowns, and architectural depth.`
      ],
      opportunity: `Establish ${firmName} as the undisputed market authority in ${location}, commanding premium margins and filtering inquiries so senior leadership only speaks with high-budget decision-makers.`,
      objectives: [
        `Engineer an expansive, monumental digital presence reflecting institutional authority.`,
        `Deploy Arabic & English full bilingual infrastructure for regional Gulf and local prestige.`,
        `Integrate an advanced VIP Consultation Gate & Budget Filter (7.5M+ EGP).`,
        `Achieve sub-800ms loading speeds with world-class typography and fluid responsive physics.`
      ],
      recommendedSolution: `The NYVEQ Authority System — an expansive, monumental digital presence platform designed for premier interior ateliers and master builders dominating their regional market.`,
      scope: [
        `Monumental multi-page digital flagship platform reflecting quiet luxury`,
        `Arabic & English full bilingual architectural infrastructure`,
        `Multi-facet master project explorer with in-depth technical case studies`,
        `Private VIP consultation gate & budget filter (screening 7.5M+ EGP contracts)`,
        `Direct CRM & multi-channel dispatch ingestion`,
        `Regional Gulf & Egyptian high-authority SEO engine`,
        `4 rounds of structured sprint revision rounds with direct executive access`,
        `90 days executive hypercare, speed optimization, and priority SLA`
      ],
      deliverables: [
        {
          title: 'Authority Flagship Platform (Bilingual AR/EN)',
          description: `Expansive, high-status digital platform engineered with bespoke typography and kinetic architectural transitions.`
        },
        {
          title: 'Master Project Explorer & Case Studies',
          description: `Deep case study layouts for premier projects like "${standoutProject}" with blueprints and material palettes.`
        },
        {
          title: 'VIP Consultation Gate & Lead Filtering',
          description: 'Multi-step qualification intake filtering location, project type, and budget threshold (7.5M+ EGP).'
        },
        {
          title: 'Sovereign CDN & Cloud Infrastructure',
          description: 'Ultra-performance enterprise CDN with 99.99% uptime guarantee and automated backups.'
        }
      ],
      process: [
        {
          phase: 'Phase 01: Architectural Extraction & Strategy',
          duration: 'Days 01–05',
          details: 'Audit complete project archive, interview leadership on client acquisition bottlenecks, and architect schemas.'
        },
        {
          phase: 'Phase 02: Platform Engineering & Spatial Layouts',
          duration: 'Days 06–15',
          details: 'Custom develop bilingual layouts, build project case studies, and implement fluid navigation.'
        },
        {
          phase: 'Phase 03: VIP Funnel Integration & Testing',
          duration: 'Days 16–20',
          details: 'Integrate qualification routing, test multi-device responsiveness, and conduct revision rounds.'
        },
        {
          phase: 'Phase 04: Launch, CDN Propagation & Handover',
          duration: 'Days 21–25',
          details: 'DNS propagation, live testing, admin documentation handover, and kickoff of 90-day executive hypercare.'
        }
      ],
      timeline: pricing.timeline,
      investment: `${formatEGP(pricing.standardBuildFee)}+ Build Fee (+ optional ${formatEGP(pricing.monthlyCareFee)}/mo Managed Care)`,
      deposit: `${formatEGP(pricing.kickoffDeposit)} (50% upfront deposit to initiate sprint)`,
      remainingPayment: `${formatEGP(pricing.beforeLaunchPayment)} (50% upon final staging sign-off before DNS launch)`,
      revisionPolicy: pricing.revisionPolicy,
      includedSupport: PACKAGE_PRESETS.authority.includedSupport,
      exclusions: [
        'On-site photo/video shooting (provided by client)',
        'Domain registration fees (if not already owned)',
        'Paid ad spend or social media management'
      ],
      nextStep: `Confirm acceptance to commission the Authority Sprint. We will coordinate onboarding and schedule the Phase 01 strategy session within 24 hours.`,
      status: 'draft',
      createdAt: today.toISOString().split('T')[0],
      packageConfig: pricing
    };
  }

  // 3. FOUNDING LAUNCH PARTNER COHORT (Presence Architecture - Build fee waived)
  if (normalizedTier === 'founding') {
    return {
      id: `proposal-founding-${idTimestamp}`,
      clientName: prospectName,
      companyName: firmName,
      contactPerson: contactTitle,
      proposalDate: dateStr,
      projectTitle: `${firmName} // Founding Launch Partner Cohort (Presence Architecture)`,
      currentSituation: `${firmName} has executed premier interior and finishing projects in ${location}, demonstrated by notable achievements like "${standoutProject}". However, the firm currently experiences ${observedFlaw}. As an official Founding Launch Partner, NYVEQ will engineer and deploy the complete Presence Digital Architecture System with the 12,997 EGP build fee 100% waived in exchange for a case study and video testimonial.`,
      specificObservations: `To establish definitive proof in the Egyptian luxury interior market, NYVEQ is partnering with 5–7 select studios. In exchange for case study rights, verified metrics, and active collaboration, the entire build fee is waived.`,
      identifiedProblems: [
        `Portfolio Fragmentation: Projects of the caliber of "${standoutProject}" are confined to social posts without an authoritative permanent showroom.`,
        `Digital Trust Gap: High-budget clients comparing studios favor firms with dedicated, verified web platforms.`,
        `Manual WhatsApp Overhead: Time lost answering basic qualification questions.`
      ],
      opportunity: `Partner with NYVEQ as an official Founding Design Firm to receive a high-converting Presence digital monograph with zero build fee, establishing a benchmark case study in ${location}.`,
      objectives: [
        `Deploy the full Presence Digital Presence System for ${firmName}.`,
        `Curate up to 8 premier projects with high-resolution photography and metadata.`,
        `Integrate an instant WhatsApp Ingestion Bridge to capture qualified inquiries.`,
        `Document a joint case study upon go-live showcasing the digital elevation.`
      ],
      recommendedSolution: `The NYVEQ Founding Partner Deployment — full delivery of the Presence Digital Presence System with the 12,997 EGP build fee 100% waived in exchange for case study participation and Managed Care enrollment.`,
      scope: [
        `Single-page architectural monograph showcasing studio identity and work (Build Fee Waived)`,
        `Curation and presentation of up to 8 featured projects`,
        `Instant WhatsApp ingestion bridge for rapid consultation routing`,
        `Mobile-first luxury performance with sub-2s loading speed`,
        `Basic architectural SEO setup & custom domain configuration`,
        `2 rounds of structured review prior to live release`,
        `14 days post-launch warranty, managed hosting, monthly backups & uptime monitoring`
      ],
      deliverables: [
        {
          title: 'Founding Partner Presence Monograph',
          description: `Custom-developed single-page web experience reflecting ${firmName}'s brand identity with build fee waived.`
        },
        {
          title: 'Curated Project Showcase (Up to 8 Projects)',
          description: `Structured showcase featuring "${standoutProject}" and past masterworks with high-res imagery.`
        },
        {
          title: 'Instant WhatsApp Ingestion Bridge',
          description: 'Pre-configured WhatsApp click-to-chat inquiry action for immediate prospect response.'
        },
        {
          title: 'Founding Partner Case Study & Feature',
          description: 'Joint documented case study highlighting the studio’s digital elevation in NYVEQ portfolio.'
        }
      ],
      process: [
        {
          phase: 'Phase 01: Asset Onboarding & Strategy',
          duration: 'Days 01–03',
          details: 'Rapid ingestion of high-res photography, project lists, and brand identity assets.'
        },
        {
          phase: 'Phase 02: Platform Engineering & Layouts',
          duration: 'Days 04–08',
          details: 'Custom development of single-page monograph, project showcases, and mobile optimization.'
        },
        {
          phase: 'Phase 03: Review & Final Staging',
          duration: 'Days 09–10',
          details: 'Incorporate review feedback, connect WhatsApp bridge, and perform device audits.'
        },
        {
          phase: 'Phase 04: Launch & Case Study Kickoff',
          duration: 'Days 11–12',
          details: 'DNS propagation, public release, and recording of written/video testimonial.'
        }
      ],
      timeline: pricing.timeline,
      investment: `Founding Partner Build Fee Waived (100% Waived from ${formatEGP(pricing.standardBuildFee)}) in exchange for Case Study & Testimonial`,
      deposit: '0 EGP (Build fee waived; client covers direct domain/hosting or optional 997 EGP/mo Managed Care)',
      remainingPayment: '0 EGP',
      revisionPolicy: pricing.revisionPolicy,
      includedSupport: PACKAGE_PRESETS.founding.includedSupport,
      exclusions: [
        'On-site photo/video shooting (provided by client)',
        'Direct third-party domain costs (if not already owned)',
        'Paid ad campaigns'
      ],
      nextStep: `Confirm acceptance to claim 1 of the 5–7 Founding Partner seats. We will initiate asset onboarding within 24 hours.`,
      status: 'draft',
      createdAt: today.toISOString().split('T')[0],
      packageConfig: pricing
    };
  }

  // 4. SIGNATURE PACKAGE (21,997 EGP) - MOST RECOMMENDED DEFAULT
  return {
    id: `proposal-signature-${idTimestamp}`,
    clientName: prospectName,
    companyName: firmName,
    contactPerson: contactTitle,
    proposalDate: dateStr,
    projectTitle: `${firmName} // Signature Digital Presence System`,
    currentSituation: `${firmName} executes exceptional residential and commercial finishing in ${location}, with standout excellence shown in "${standoutProject}". However, the firm's client acquisition relies on ${observedFlaw}, preventing high-budget clients from understanding the true breadth and turnkey quality of the atelier prior to meeting.`,
    specificObservations: `Prospective clients seeking complete turnkey design and execution face friction when trying to view finished work on mobile. High-value villa owners are forced to ask repetitive qualification questions over WhatsApp, diluting the studio's prestige and consuming valuable management time.`,
    identifiedProblems: [
      `Digital Perception Gap: The physical execution in "${standoutProject}" is world-class, but the digital storefront does not command the same luxury gravitas.`,
      `Unqualified Inquiries: Spending hours answering low-budget inquiries that do not meet the minimum contract threshold.`,
      `Loss of High-Ticket Inbound: High-net-worth clients shopping for turnkey execution choose competitors who present authoritative digital showcases.`
    ],
    opportunity: `Elevate ${firmName} into the recognized leader in turnkey architecture in ${location}, creating an automated pipeline of qualified high-ticket consultations.`,
    objectives: [
      `Build a dedicated, high-performance digital showroom platform for ${firmName} (up to 5 pages).`,
      `Integrate an automated pre-qualification filter for property size, compound, and budget.`,
      `Showcase signature works including "${standoutProject}" with interactive category filtering.`,
      `Attain sub-1.0s mobile loading speeds with complete iOS and Android optimization.`
    ],
    recommendedSolution: `The NYVEQ Signature System — a complete digital presence engineered specifically for luxury residential design studios, with built-in client intake qualification and premium presentation vaults.`,
    scope: [
      `Multi-page editorial atelier experience (3–5 pages: Home, Portfolio, Methodology, About, Contact)`,
      `Interactive project explorer with category filtering (Turnkey Villas, Penthouses, Commercial)`,
      `High-ticket project inquiry brief & qualification gate`,
      `Inquiry dispatch & WhatsApp VIP channel integration`,
      `Finishes & materiality showcase component`,
      `Executive social proof & compound endorsement architecture`,
      `Complete architectural on-page SEO engine`,
      `3 dedicated revision rounds across structure, content, and staging`,
      `60 days priority hypercare, daily backups, and security monitoring`
    ],
    deliverables: [
      {
        title: 'Signature Atelier Digital Platform (3–5 Pages)',
        description: `Custom-coded multi-page web application reflecting ${firmName}'s design philosophy with quiet luxury aesthetics.`
      },
      {
        title: 'Interactive Project Explorer with Category Filtering',
        description: `Curated portfolio detailed with high-resolution photography, material specifications, and location context.`
      },
      {
        title: 'High-Ticket Inquiry Brief & Qualification Gate',
        description: 'Bespoke qualification form capturing compound, project type, and budget threshold before routing.'
      },
      {
        title: 'Production Infrastructure & 60-Day Priority Hypercare',
        description: 'Complete DNS setup, SSL encryption, daily backups, and 60 days of direct priority technical hypercare.'
      }
    ],
    process: [
      {
        phase: 'Phase 01: Audit & Information Architecture',
        duration: 'Days 01–03',
        details: 'Audit existing portfolio assets, interview leadership, and map the VIP client journey.'
      },
      {
        phase: 'Phase 02: Platform Engineering & Motion',
        duration: 'Days 04–11',
        details: 'Custom development of 3–5 pages, interactive project explorer, and high-performance layouts.'
      },
      {
        phase: 'Phase 03: Intake Funnel Integration & Testing',
        duration: 'Days 12–15',
        details: 'Connect qualification workflows, WhatsApp routing, and run multi-device audits.'
      },
      {
        phase: 'Phase 04: Launch & Hypercare Kickoff',
        duration: 'Days 16–18',
        details: 'Final client sign-off, live domain propagation, and commencement of 60 days priority hypercare.'
      }
    ],
    timeline: pricing.timeline,
    investment: `${formatEGP(pricing.standardBuildFee)} Build Fee (+ optional ${formatEGP(pricing.monthlyCareFee)}/mo Managed Care)`,
    deposit: `${formatEGP(pricing.kickoffDeposit)} (50% upfront deposit to initiate sprint)`,
    remainingPayment: `${formatEGP(pricing.beforeLaunchPayment)} (50% upon final staging sign-off before live launch)`,
    revisionPolicy: pricing.revisionPolicy,
    includedSupport: PACKAGE_PRESETS.signature.includedSupport,
    exclusions: [
      'On-site photo/video shooting (provided by client)',
      'Third-party domain registration fees',
      'Paid advertising or social media campaigns'
    ],
    nextStep: `Approve this proposal to commission the Signature Sprint. We will issue the service agreement and commencement deposit invoice immediately.`,
    status: 'draft',
    createdAt: today.toISOString().split('T')[0],
    packageConfig: pricing
  };
}
