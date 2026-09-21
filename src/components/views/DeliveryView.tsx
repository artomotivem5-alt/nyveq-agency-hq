import React, { useState, useEffect } from 'react';
import {
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  Layers,
  FileCheck,
  FolderTree,
  FileText,
  Save,
  Building2,
  Check
} from 'lucide-react';
import { ViewMode, PackageTier } from '../../types';
import { INITIAL_PROSPECTS } from '../../data/prospectsData';
import { PACKAGE_PRESETS, formatEGP } from '../../data/packageScopes';

interface DeliveryViewProps {
  onSelectView?: (view: ViewMode) => void;
  defaultPhase?: string;
}

export const DeliveryView: React.FC<DeliveryViewProps> = ({ onSelectView, defaultPhase = '01' }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'intake'>('roadmap');
  const [selectedPhase, setSelectedPhase] = useState<string>(defaultPhase);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 19 Standardized Internal Intake Fields State (Filled by Ahmed directly)
  const [intakeData, setIntakeData] = useState(() => {
    const saved = localStorage.getItem('nyveq_internal_intake_dossier');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      clientName: 'Hedayet Islam & Dina El Khachab',
      companyName: 'Eklego Design',
      packageTier: 'founding' as PackageTier,
      businessModel: 'Turnkey Architectural Finishing & Bespoke Furniture',
      servicesOffered: 'Architecture, Interior Design, Turnkey Fit-out Contracting, Site Supervision',
      targetCustomer: 'High-net-worth standalone villa owners & commercial luxury headquarters',
      targetProjects: 'Katameya Heights, Katameya Dunes, Palm Hills, Marassi, Dubai',
      coreGoal: 'Establish definitive digital authority and automate budget pre-qualification ($150k+)',
      digitalGap: 'Static social media photos with zero conversion filtration or compound searchability',
      featuredProjects: 'Katameya Heights Private Villa (BUA 1,400 sqm), Marassi Summer Estate',
      primaryCtas: 'Book Private VIP Site Consultation, WhatsApp Direct Partner Line',
      aiAssistantGoal: 'Pre-qualify villa square meters, compound location, and finishing budget',
      qualificationFloor: 'Minimum project budget floor: 7.5M+ EGP / $150k USD contracts',
      contactInfo: '+20 2 2735 7776 • Waterway New Cairo & Zamalek Studio',
      visualDirection: 'Quiet Architectural Luxury, Deep Obsidian, Monochromatic Neutral Materials',
      seoCompounds: 'Turnkey Interior Design Katameya Dunes, Villa Finishing Palm Hills New Cairo',
      missingAssets: 'Drone aerial exterior photography for Marassi Estate, updated high-res logo SVG',
      authorizedApprover: 'Eng. Dina El Khachab (Managing Director)',
      launchWindow: 'Sprint Target: 14 business days from asset folder clearance'
    };
  });

  const handleSaveIntake = () => {
    localStorage.setItem('nyveq_internal_intake_dossier', JSON.stringify(intakeData));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSelectProspectToIntake = (leadId: string) => {
    const lead = INITIAL_PROSPECTS.find((p) => p.id === leadId);
    if (!lead) return;
    setIntakeData((prev: any) => ({
      ...prev,
      clientName: lead.contact,
      companyName: lead.company,
      packageTier: lead.targetTier,
      targetProjects: lead.location,
      digitalGap: lead.observedFlaw,
      featuredProjects: lead.standoutProject,
      contactInfo: `${lead.phone} • ${lead.location}`
    }));
  };

  // Per-Package Specs Matrix
  const packageSpecs = [
    {
      tier: PACKAGE_PRESETS.presence.name,
      price: formatEGP(PACKAGE_PRESETS.presence.standardBuildFee),
      pages: 'Single-page monograph',
      projects: 'Up to 8 projects',
      revisions: '2 rounds',
      timeline: PACKAGE_PRESETS.presence.timeline,
      support: PACKAGE_PRESETS.presence.includedSupport,
      managedCare: `${formatEGP(PACKAGE_PRESETS.presence.monthlyCareFee)} / mo`
    },
    {
      tier: `${PACKAGE_PRESETS.signature.name} (${PACKAGE_PRESETS.signature.badge})`,
      price: formatEGP(PACKAGE_PRESETS.signature.standardBuildFee),
      pages: 'Multi-page (3–5 pages)',
      projects: 'Up to 15 projects',
      revisions: '3 rounds',
      timeline: PACKAGE_PRESETS.signature.timeline,
      support: PACKAGE_PRESETS.signature.includedSupport,
      managedCare: `${formatEGP(PACKAGE_PRESETS.signature.monthlyCareFee)} / mo`
    },
    {
      tier: PACKAGE_PRESETS.authority.name,
      price: `${formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+`,
      pages: 'Monumental (up to 12 pages)',
      projects: 'Scalable master projects',
      revisions: '4 rounds',
      timeline: PACKAGE_PRESETS.authority.timeline,
      support: PACKAGE_PRESETS.authority.includedSupport,
      managedCare: `${formatEGP(PACKAGE_PRESETS.authority.monthlyCareFee)} / mo`
    },
  ];

  // The Standardized 6 Asset Folders
  const assetFolders = [
    { name: '01_LOGO_BRAND', desc: 'Vector SVG/PNG logos, brand marks, and typography/colors if established.' },
    { name: '02_PROJECTS', desc: 'Numbered subfolders per project containing uncompressed high-res photography (>1920px).' },
    { name: '03_SERVICES_PRICING', desc: 'Clear scope breakdown (Design consultation vs Turnkey fit-out execution).' },
    { name: '04_CONTACT_HOURS', desc: 'Office addresses, working hours, official phone, and primary WhatsApp numbers.' },
    { name: '05_TEAM_ABOUT', desc: 'Founder bio, studio philosophy, and leadership photography.' },
    { name: '06_OTHER', desc: 'Supplier partnerships, vendor logos, media features, or awards.' },
  ];

  // 10-Stage Sequential Delivery Flow
  const deliveryStages = [
    {
      step: '01',
      title: 'Rapid Internal Onboarding (24–48h)',
      timing: 'Days 01–02',
      summary: 'Ahmed fills internal intake from discovery notes. Dedicated Google Drive with 6 standardized folders is dispatched.',
      deliverables: ['Standardized 6-Folder Google Drive Workspace', 'Internal Intake Form Completed', 'Kickoff Welcome WhatsApp Message'],
    },
    {
      step: '02',
      title: 'Asset Quality Audit & Curation',
      timing: 'Days 02–03',
      summary: 'Audit photography for uncompressed print resolution (>1920px). Reject low-res social screenshots.',
      deliverables: ['High-Res Photography Curation', 'Featured Projects Selection per Tier Limit', 'Compound & BUA Extraction'],
    },
    {
      step: '03',
      title: 'Information Architecture & Layout Design',
      timing: 'Days 04–06',
      summary: 'Structure clear distinction between design consultation fees and turnkey fit-out execution.',
      deliverables: ['Sovereign Information Architecture', 'Customer Journey Wireframe', 'VIP Consultation Intake Fields'],
    },
    {
      step: '04',
      title: 'Platform Engineering & Component Build',
      timing: 'Days 07–12',
      summary: 'Custom code responsive layouts in Next.js/Tailwind with sensory before/after sliders and fast edge caching.',
      deliverables: ['Responsive Editorial Web Engine', 'Sensory Metamorphosis Slider', 'Curated Project Showcases'],
    },
    {
      step: '05',
      title: 'Internal QA & Cross-Device Audit',
      timing: 'Sprint Milestone',
      summary: 'Audit on iPhone Safari, Android Chrome, and Desktop. Test inquiry routing, loading speeds (<1.0s), and form validation.',
      deliverables: ['Mobile Safari 85%+ Verification', 'WhatsApp Direct Route Verification', 'Core Web Vitals Speed Test'],
    },
    {
      step: '06',
      title: 'Client Staging Presentation',
      timing: 'Sprint Milestone',
      summary: 'Present staging link to studio founder with a 3-minute video walkthrough explaining layout psychology.',
      deliverables: ['Live Staging URL', 'Guided Walkthrough Video', 'Consolidated Revision Feedback Sheet'],
    },
    {
      step: '07',
      title: 'Structured Revision Rounds',
      timing: '48h Feedback Sprint',
      summary: 'Execute structured revision rounds strictly within package limit (Presence: 2, Signature: 3, Authority: 4). Enforce scope boundaries.',
      deliverables: ['Consolidated Text & Photo Edits', 'Scope Boundary Lock', 'Signed-off Revisions Confirmation'],
    },
    {
      step: '08',
      title: 'Final Payment Clearance (MANDATORY)',
      timing: 'Pre-Launch',
      summary: 'Issue final invoice for the remaining 50% balance. Require payment clearance before live domain DNS switch.',
      deliverables: ['Final 50% Invoice', 'Bank Transfer / InstaPay Clearance', 'Official Payment Receipt'],
    },
    {
      step: '09',
      title: 'Custom Domain Launch & SSL',
      timing: 'Launch Day',
      summary: 'Configure DNS records, point custom domain (Cloudflare/Edge), generate SSL, and launch live to the public.',
      deliverables: ['Active Custom Domain with SSL Padlock', 'Live Mobile Submission Verified', 'Google Analytics 4 Live Tracking'],
    },
    {
      step: '10',
      title: 'Post-Launch Priority Support & Testimonial',
      timing: 'Post-Launch',
      summary: 'Activate support window (Presence: 14d, Signature: 30d, Authority: 45d). Capture client video testimonial and offer Managed Care.',
      deliverables: ['Post-Launch Technical Monitoring', 'Client Testimonial & Case Study', 'Optional Managed Care Retainer'],
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#1f1e2e] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12111c] border border-[#222135] text-[10px] font-mono text-purple-300 uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          <span>DELIVERY FRAMEWORK // OPERATIONAL BLUEPRINT</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif">
              Tier-Based Delivery &amp; Launch Architecture
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Rigorous 10-stage delivery blueprint activated upon signing. Structured revisions, verified payments, and zero scope creep.
            </p>
          </div>

          <div className="p-3 px-4 rounded-xl bg-[#0e0d16] border border-[#232135] text-xs font-mono text-zinc-400">
            DISCIPLINE: <span className="text-purple-300 font-bold">10 SEQUENTIAL STEPS</span>
          </div>
        </div>
      </div>

      {/* View Mode Switcher: Roadmap vs Internal Intake Dossier */}
      <div className="flex items-center gap-2 border-b border-[#1f1e2e] pb-3">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
            activeTab === 'roadmap'
              ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/25'
              : 'bg-[#121120] text-zinc-400 hover:text-white border border-[#201e32]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>10-Stage Delivery Roadmap &amp; Assets</span>
        </button>

        <button
          onClick={() => setActiveTab('intake')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
            activeTab === 'intake'
              ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/25'
              : 'bg-[#121120] text-zinc-400 hover:text-white border border-[#201e32]'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Internal Intake Dossier (19 Standardized Fields)</span>
        </button>
      </div>

      {activeTab === 'roadmap' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Package Specs Matrix */}
          <div className="p-6 rounded-2xl bg-[#0d0c15] border border-[#1f1d2b] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif text-white font-bold">
            Package Delivery &amp; Revision Matrix
          </h3>
          <span className="text-xs font-mono text-[var(--accent-purple)]">Standard Delivery Policies</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packageSpecs.map((pkg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-2.5 ${
                pkg.tier.includes('Signature')
                  ? 'bg-[#151322] border-[var(--accent-purple)]/50 shadow-md'
                  : 'bg-[#100f18] border-[#201e2e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-serif">{pkg.tier}</span>
                <span className="text-xs font-mono font-bold text-purple-300">{pkg.price}</span>
              </div>

              <div className="space-y-1 text-xs text-zinc-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Timeline:</span>
                  <span className="font-mono text-white">{pkg.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Revision Rounds:</span>
                  <span className="font-mono text-emerald-400 font-bold">{pkg.revisions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Post-Launch Support:</span>
                  <span className="font-mono text-white">{pkg.support}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Scope Limit:</span>
                  <span className="text-zinc-400">{pkg.pages} / {pkg.projects}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#181624]">
                  <span className="text-zinc-500">Managed Care:</span>
                  <span className="font-mono text-purple-300 font-medium">{pkg.managedCare}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standardized 6-Folder Asset Architecture - Editorial Filesystem */}
      <div className="p-6 rounded-2xl bg-[#0b0a12] border border-[#1a1928] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#181626] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#141222] border border-[#232038] flex items-center justify-center text-purple-400">
              <FolderTree className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-serif text-white font-medium">
                The 6-Folder Asset Architecture (Google Drive Workspace)
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono">WORKSPACE PROTOCOL // ZERO QUESTIONNAIRE FRICTION</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-[#12111c] border border-[#1f1d30] text-[10px] font-mono text-zinc-400">
            RAPID CLIENT INGESTION
          </div>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
          Never send tedious discovery forms to ultra-busy founders. Ahmed populates the internal intake directly from discovery conversations. The client receives a single pre-structured Google Drive workspace with these 6 clear repositories:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {assetFolders.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#0e0d16] border border-[#1b1929] hover:border-[#2b2742] transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-purple-300 font-semibold tracking-wide">{f.name}</span>
                <span className="text-[10px] font-mono text-zinc-600">DIR 0{i + 1}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10-Stage Sequential Delivery Roadmap (Vertical Progression Timeline) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              The 10 Sequential Delivery Milestones
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Chronological production progression from deposit clearance to live DNS handoff
            </p>
          </div>
          <div className="text-[11px] font-mono text-zinc-500">
            SELECT MILESTONE TO INSPECT
          </div>
        </div>

        <div className="relative border-l border-[#1f1d30] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {deliveryStages.map((stage) => {
            const isSelected = selectedPhase === stage.step;
            return (
              <div
                key={stage.step}
                onClick={() => setSelectedPhase(stage.step)}
                className="relative group cursor-pointer"
              >
                {/* Milestone Node on Progression Line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#0e0d16] border-[#25223a] text-zinc-500 group-hover:border-purple-500/50 group-hover:text-purple-300'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">{stage.step}</span>
                </div>

                {/* Milestone Card */}
                <div
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isSelected
                      ? 'bg-[#12101e] border-purple-500/50 shadow-lg shadow-purple-950/20'
                      : 'bg-[#0d0c15] border-[#1a1827] group-hover:border-[#2a2640]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                        STAGE {stage.step}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-mono text-zinc-400">{stage.timing}</span>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 w-fit">
                        ACTIVE INSPECTION
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-serif text-white font-medium">{stage.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{stage.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-[#181625] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Deliverables &amp; Handoff Artifacts:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stage.deliverables.map((deliv, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.5} />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )}

  {/* TAB 2: INTERNAL INTAKE DOSSIER (19 STANDARDIZED FIELDS) */}
  {activeTab === 'intake' && (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1e2e] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold uppercase">
            <span>DISCOVERY TO SPRINT // ZERO QUESTIONNAIRE TO CLIENT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-white font-bold">
            Internal Client Intake Dossier (19 Operational Fields)
          </h2>
          <p className="text-xs text-zinc-400">
            Filled directly by Ahmed from discovery notes. Clients never receive burdensome 20-page forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveIntake}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
                <span>Saved Dossier!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Save Intake Dossier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Ingestion from CRM Studios */}
      <div className="p-4 rounded-xl bg-[#0c0b13] border border-[#1d1b2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Building2 className="w-4 h-4 text-purple-400" />
          <span>Pre-fill from Scraped Studio:</span>
        </div>
        <select
          onChange={(e) => handleSelectProspectToIntake(e.target.value)}
          className="bg-[#141220] border border-[#262338] rounded-xl px-3 py-1.5 text-xs text-purple-300 font-mono focus:outline-none"
        >
          <option value="">Select Studio to Ingest...</option>
          {INITIAL_PROSPECTS.map((p) => (
            <option key={p.id} value={p.id}>{p.company} ({p.contact.split('(')[0].trim()})</option>
          ))}
        </select>
      </div>

      {/* 4 Grouped Fieldsets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GROUP 1: Core Studio & Stakeholders (Fields 1-4) */}
        <div className="p-6 rounded-2xl bg-[#0c0b14] border border-[#1e1c2e] space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold border-b border-[#1b1929] pb-2">
            01. Studio &amp; Stakeholder Parameters
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">1. Client / Decision Maker Name:</label>
              <input
                type="text"
                value={intakeData.clientName}
                onChange={(e) => setIntakeData({ ...intakeData, clientName: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">2. Company / Atelier Trade Name:</label>
              <input
                type="text"
                value={intakeData.companyName}
                onChange={(e) => setIntakeData({ ...intakeData, companyName: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">3. Package Tier Confirmed:</label>
              <select
                value={intakeData.packageTier}
                onChange={(e) => setIntakeData({ ...intakeData, packageTier: e.target.value as PackageTier })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-purple-300 font-mono font-bold focus:outline-none focus:border-purple-500"
              >
                <option value="signature">Signature Tier ({formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)} // 3–5 Pages // 15 Projects)</option>
                <option value="presence">Presence Tier ({formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)} // Monograph // 8 Projects)</option>
                <option value="authority">Authority Tier ({formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+ // Flagship)</option>
                <option value="founding">Founding Partner (Build Fee Waived 0 EGP)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">4. Primary Contact, Phone &amp; Physical Office:</label>
              <input
                type="text"
                value={intakeData.contactInfo}
                onChange={(e) => setIntakeData({ ...intakeData, contactInfo: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
          </div>
        </div>

        {/* GROUP 2: Commercial Scope & Service Model (Fields 5-8) */}
        <div className="p-6 rounded-2xl bg-[#0c0b14] border border-[#1e1c2e] space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold border-b border-[#1b1929] pb-2">
            02. Commercial Scope &amp; Positioning
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">5. Business Model Structure:</label>
              <input
                type="text"
                value={intakeData.businessModel}
                onChange={(e) => setIntakeData({ ...intakeData, businessModel: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">6. Primary Services Offered:</label>
              <input
                type="text"
                value={intakeData.servicesOffered}
                onChange={(e) => setIntakeData({ ...intakeData, servicesOffered: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">7. Target Customer Profile:</label>
              <input
                type="text"
                value={intakeData.targetCustomer}
                onChange={(e) => setIntakeData({ ...intakeData, targetCustomer: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">8. Target Enclaves &amp; Compound Locations:</label>
              <input
                type="text"
                value={intakeData.targetProjects}
                onChange={(e) => setIntakeData({ ...intakeData, targetProjects: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
          </div>
        </div>

        {/* GROUP 3: Conversion & Project Calibration (Fields 9-14) */}
        <div className="p-6 rounded-2xl bg-[#0c0b14] border border-[#1e1c2e] space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold border-b border-[#1b1929] pb-2">
            03. Conversion Engine &amp; Project Curation
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">9. Core Project Goal:</label>
              <input
                type="text"
                value={intakeData.coreGoal}
                onChange={(e) => setIntakeData({ ...intakeData, coreGoal: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">10. Diagnosed Digital Friction Flaw:</label>
              <input
                type="text"
                value={intakeData.digitalGap}
                onChange={(e) => setIntakeData({ ...intakeData, digitalGap: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">11. Key Projects to Feature (Name &amp; BUA):</label>
              <input
                type="text"
                value={intakeData.featuredProjects}
                onChange={(e) => setIntakeData({ ...intakeData, featuredProjects: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">12. Primary Calls-to-Action (CTAs):</label>
              <input
                type="text"
                value={intakeData.primaryCtas}
                onChange={(e) => setIntakeData({ ...intakeData, primaryCtas: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">13. Budget Qualification Floor:</label>
              <input
                type="text"
                value={intakeData.qualificationFloor}
                onChange={(e) => setIntakeData({ ...intakeData, qualificationFloor: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">14. AI Assistant / Intake Brief Goal:</label>
              <input
                type="text"
                value={intakeData.aiAssistantGoal}
                onChange={(e) => setIntakeData({ ...intakeData, aiAssistantGoal: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
          </div>
        </div>

        {/* GROUP 4: Technical Calibration & Governance (Fields 15-19) */}
        <div className="p-6 rounded-2xl bg-[#0c0b14] border border-[#1e1c2e] space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold border-b border-[#1b1929] pb-2">
            04. Technical Calibration &amp; Governance
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">15. Visual &amp; Architectural Direction:</label>
              <input
                type="text"
                value={intakeData.visualDirection}
                onChange={(e) => setIntakeData({ ...intakeData, visualDirection: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">16. Local SEO Compounds &amp; Keywords:</label>
              <input
                type="text"
                value={intakeData.seoCompounds}
                onChange={(e) => setIntakeData({ ...intakeData, seoCompounds: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">17. Missing Information / Assets Checklist:</label>
              <input
                type="text"
                value={intakeData.missingAssets}
                onChange={(e) => setIntakeData({ ...intakeData, missingAssets: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">18. Authorized Client Approver:</label>
              <input
                type="text"
                value={intakeData.authorizedApprover}
                onChange={(e) => setIntakeData({ ...intakeData, authorizedApprover: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">19. Target Launch Window (Sprint Deadlines):</label>
              <input
                type="text"
                value={intakeData.launchWindow}
                onChange={(e) => setIntakeData({ ...intakeData, launchWindow: e.target.value })}
                className="w-full bg-[#13121e] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};
