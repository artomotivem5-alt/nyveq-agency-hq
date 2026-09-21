import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ViewMode } from '../../types';
import { PACKAGE_PRESETS, formatEGP } from '../../data/packageScopes';

interface OffersViewProps {
  onSelectView: (view: ViewMode) => void;
  defaultTab?: 'active' | 'future';
}

export const OffersView: React.FC<OffersViewProps> = ({
  onSelectView,
  defaultTab = 'active',
}) => {
  const [tab, setTab] = useState<'active' | 'future'>(defaultTab);

  const activeComponents = [
    { title: 'Strategic Discovery & Framing', desc: 'Audit existing portfolio, identify leakage points, and target high-net-worth villa enclaves.' },
    { title: 'Information Architecture', desc: 'Structure clear separation between interior architecture design and turnkey execution services.' },
    { title: 'Bespoke Editorial Web Platform', desc: 'High-contrast, quiet luxury layout engineered with Instrument Serif and 60fps responsive physics.' },
    { title: 'Curated Project Showcases', desc: 'Individual project showcases with photography, materials, location, and built-up area (BUA).' },
    { title: 'Sensory Transformation Sliders', desc: 'Interactive comparison showing raw structural concrete shell vs finished turnkey luxury.' },
    { title: 'Digital Trust Architecture', desc: 'Prominent placement of verified compound handovers, supplier partnerships, and craftsmanship standards.' },
    { title: 'VIP Consultation Intake Drawer', desc: 'Pre-qualifying intake form capturing property typology, compound, and timeframe prior to contact.' },
    { title: 'Zero-Loss Lead Routing', desc: 'Direct WhatsApp and email routing ensuring high-ticket villa inquiries are immediately delivered to leadership.' },
    { title: 'Mobile First 85%+ Calibration', desc: 'Sub-1.0s loading speeds optimized specifically for iPhone Safari and mobile viewports.' },
    { title: 'Basic SEO Foundation', desc: 'Targeted local compound keywords (e.g. Turnkey Interior Design Katameya Dunes / Palm Hills).' },
    { title: 'Analytics & Event Tracking', desc: 'Google Analytics 4 & Meta Pixel integration for visitor traffic and consultation attribution.' },
    { title: 'Zero-Downtime Deployment', desc: 'DNS propagation to client custom domain with SSL certificate and post-launch priority support.' },
  ];

  const futureCapabilities = [
    {
      title: 'Automated Multi-Board CRM Backends',
      status: 'FUTURE / NOT ACTIVE',
      desc: 'Complex custom CRM databases with automated n8n webhook pipelines across external tools.',
      reason: 'Unnecessary complexity for initial client acquisition. A single unified 17-status CRM suffices.'
    },
    {
      title: 'Autonomous Multi-Agent AI Intake Concierge',
      status: 'FUTURE / NOT ACTIVE',
      desc: '24/7 AI chat advisor answering finish questions, marble specs, and filtering client budgets automatically.',
      reason: 'Do not deploy until client demand and manual conversion scripts are thoroughly validated.'
    },
    {
      title: 'Paid Meta & Google Client Acquisition Funnels',
      status: 'FUTURE / NOT ACTIVE',
      desc: 'Running paid ad campaigns targeting luxury villa owners in New Cairo and Zayed.',
      reason: 'Outbound direct sales (Cold Calls & DMs) is the mandatory validation engine for V1.'
    },
    {
      title: 'Interactive Client Portal & Progress Dashboard',
      status: 'FUTURE / NOT ACTIVE',
      desc: 'A private dashboard where villa owners track site execution stages, daily photos, and material milestones.',
      reason: 'Advanced SaaS capability reserved for Stage 4–5 growth.'
    }
  ];

  const handleLaunchTierProposal = (tier: 'presence' | 'signature' | 'authority' | 'founding') => {
    localStorage.setItem(
      'nyveq_proposal_target',
      JSON.stringify({
        prospectName: 'Eng. Founder',
        firmName: 'Luxury Interior Studio',
        contactTitle: 'Founder & Principal Architect',
        location: 'New Cairo & Sheikh Zayed',
        standoutProject: 'Signature Villa Handover',
        observedFlaw: 'reliance on fragmented social media highlights without structured qualification',
        tier
      })
    );
    onSelectView('proposals-builder');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent-purple)] uppercase tracking-wider">
          <Package className="w-3.5 h-3.5" />
          <span>OFFER REPERTORY // SOVEREIGN V1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          One Core Problem. One Repeatable Offer.
        </h1>
        <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
          Do not confuse the market or yourself with a dozen unproven services. We sell exactly ONE proven, high-converting system: The NYVEQ Digital Presence System.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
        <button
          onClick={() => setTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            tab === 'active'
              ? 'bg-[var(--accent-purple)] text-black shadow-md shadow-[var(--accent-purple)]/20'
              : 'bg-[var(--bg-elevated)] text-zinc-300 hover:text-white border border-[var(--border-subtle)]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Offer: Digital Presence System</span>
        </button>

        <button
          onClick={() => setTab('future')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            tab === 'future'
              ? 'bg-zinc-800 text-white'
              : 'bg-[var(--bg-elevated)] text-zinc-400 hover:text-zinc-200 border border-[var(--border-subtle)]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Future Capabilities (Not Active)</span>
        </button>
      </div>

      {tab === 'active' ? (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Active Offer Hero Card */}
          <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-purple)]/40 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-purple)]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-purple)] font-bold">
                  FLAGSHIP CORE OFFER // 3-TIER ARCHITECTURE
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  NYVEQ Digital Presence System
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#161622] text-[var(--accent-purple)] border border-[var(--accent-purple)]/40 font-bold">
                  FOUNDING LAUNCH COHORT: 5–7 FIRMS ONLY
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-200 leading-relaxed max-w-3xl relative z-10 font-sans">
              Turn an interior design studio’s existing executed work, craftsmanship, and credibility into an editorial digital conversion asset that helps wealthy villa owners understand the firm, explore real projects, verify finishing quality, and book a VIP site consultation.
            </p>

            {/* Positioning Guardrail Alert */}
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-amber-500/30 flex items-start gap-3 text-xs text-zinc-200 relative z-10">
              <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Crucial Sales Guardrail:</strong> Never position NYVEQ as simply "a website agency". You are building a <em className="text-[var(--accent-purple)] not-italic font-bold">Digital Presence System</em> (Portfolio presentation, Credibility &amp; trust, High-intent client inquiries, Mobile performance, and Conversion flow) that pays for itself with a single turnkey villa contract ($150k+ / 7.5M+ EGP).
              </div>
            </div>
          </div>

          {/* FOUNDING LAUNCH PARTNER COHORT BANNER */}
          <div className="p-6 rounded-2xl bg-[#0f0e1a] border-2 border-[var(--accent-purple)] space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[var(--accent-purple)] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                    SPECIAL COHORT
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">5–7 Design Firms Only</span>
                </div>
                <h3 className="text-xl font-serif text-white font-bold">
                  Founding Launch Partner Offer
                </h3>
                <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                  To establish definitive proof in the Egyptian luxury interior market, NYVEQ waives the complete build fee in exchange for case study rights and collaboration.
                </p>
              </div>

              <button
                onClick={() => handleLaunchTierProposal('founding')}
                className="px-5 py-2.5 rounded-xl bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
              >
                Draft Founding Proposal →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-zinc-300">
              <div className="p-3 rounded-xl bg-[#151322] border border-[#26233a] space-y-1">
                <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold">Commercial Terms</span>
                <p className="text-white font-mono font-bold">Build Fee 100% Waived</p>
                <p className="text-[11px] text-zinc-400">Client covers own domain/hosting directly or enters Managed Care.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#151322] border border-[#26233a] space-y-1">
                <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold">Partner Obligations</span>
                <p className="text-white font-mono font-bold">Testimonial &amp; Case Study</p>
                <p className="text-[11px] text-zinc-400">Video or written review upon launch + active asset collaboration.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#151322] border border-[#26233a] space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Strict Rule</span>
                <p className="text-white font-mono font-bold">NEVER say "Free Website"</p>
                <p className="text-[11px] text-zinc-400">Always position as "Build fee waived for 5–7 founding design partners in exchange for proof."</p>
              </div>
            </div>
          </div>

          {/* CUSTOMER JOURNEY ARCHITECTURE */}
          <div className="p-6 rounded-2xl space-y-4 bg-[#0d0c15] border border-[#1f1d2b]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[var(--accent-purple)] uppercase font-semibold">
                  VISITOR TRANSFORMATION FLOW
                </span>
                <h3 className="text-base font-semibold text-white mt-1 font-serif">
                  The 5-Stage High-Trust Customer Journey
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">Conversion Engine</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {[
                { num: '01', stage: 'Discover', desc: 'Arrives from Instagram, Referral, or Direct Search', focus: 'Immediate visual hook' },
                { num: '02', stage: 'Understand', desc: 'Clearly sees service boundaries (Design vs Turnkey fit-out)', focus: 'Zero cognitive friction' },
                { num: '03', stage: 'Trust', desc: 'Verifies real compound handovers, materials & craft', focus: 'Quiet luxury credibility' },
                { num: '04', stage: 'Explore Projects', desc: 'Deep-dives into curated project showcases & transformation', focus: 'Sensory proof of craft' },
                { num: '05', stage: 'Contact / Consult', desc: 'Seamless VIP consultation intake with pre-qualification', focus: 'High-intent booking' },
              ].map((j, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#12111c] border border-[#201f30] hover:border-[var(--accent-purple)]/40 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[var(--accent-purple)]">{j.num}</span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">STEP</span>
                    </div>
                    <h5 className="text-xs font-semibold text-white mt-1">{j.stage}</h5>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{j.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-[#1a1928] text-[10px] font-mono text-[var(--accent-purple)]">
                    {j.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* THE 9 PILLARS OF THE DIGITAL PRESENCE SYSTEM */}
          <div className="p-6 rounded-2xl space-y-4 bg-[#0c0b13] border border-[#1e1c2b]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-semibold">
                  CORE SYSTEM ARCHITECTURE // NOT JUST A WEBSITE
                </span>
                <h3 className="text-base font-semibold text-white mt-1 font-serif">
                  The 9 Structural Components of the Digital Presence System
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:inline">9 Core Foundations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {activeComponents.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#111019] border border-[#1e1c2c] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-serif">{c.title}</span>
                    <span className="text-[10px] font-mono text-purple-400">0{i + 1}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* THE 3-TIER PACKAGES GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif text-white tracking-tight">
                  Standard Commercial Packages
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Standardized pricing architecture: Presence, Signature (Recommended), and Authority
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* TIER 1: PRESENCE */}
              <div className="p-7 rounded-2xl bg-[#0c0b14] border border-[#1e1c2e] space-y-6 flex flex-col justify-between hover:border-[#2f2b48] transition-all shadow-xl">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      TIER 01 // FOUNDATION
                    </span>
                    <h4 className="text-xl font-serif text-white">
                      Presence System
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[48px]">
                    Essential digital authority for emerging ateliers transitioning from fragmented Instagram DMs to verified web credibility.
                  </p>

                  {/* Price Box */}
                  <div className="p-5 rounded-xl bg-[#08070d] border border-[#1a1828] space-y-1.5">
                    <div className="text-2xl font-mono font-bold text-white tracking-tight">
                      {formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)}
                    </div>
                    <div className="text-xs font-mono text-zinc-400">
                      Standard Build Fee
                    </div>
                    <div className="border-t border-[#181628] pt-2 mt-2 flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">Care Retainer:</span>
                      <span className="text-zinc-300">{formatEGP(PACKAGE_PRESETS.presence.monthlyCareFee)} / mo</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">Sprint Delivery:</span>
                      <span className="text-purple-300">{PACKAGE_PRESETS.presence.timeline}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold block">
                      Scope Specifications
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Single-Page Architectural Monograph</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Curated Showcase (Up to 8 Projects)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Direct WhatsApp VIP Ingestion Drawer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Sub-2.0s Fast Edge Mobile Delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>2 Structured Review Rounds Prior to Launch</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchTierProposal('presence')}
                  className="w-full py-2.5 rounded-xl bg-[#141322] hover:bg-[#1e1c32] text-zinc-200 hover:text-white border border-[#252238] text-xs font-mono font-medium transition-all mt-4"
                >
                  Draft Presence Proposal →
                </button>
              </div>

              {/* TIER 2: SIGNATURE (MOST RECOMMENDED) */}
              <div className="p-7 rounded-2xl bg-[#0f0e1a] border-2 border-purple-500/70 space-y-6 flex flex-col justify-between shadow-2xl relative">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  ★ MOST RECOMMENDED
                </div>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                      TIER 02 // CORE SYSTEM
                    </span>
                    <h4 className="text-xl font-serif text-white">
                      Signature System
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed min-h-[48px]">
                    The complete digital presence standard for established Egyptian ateliers competing for 2M–10M+ EGP residential turnkey commissions.
                  </p>

                  {/* Price Box */}
                  <div className="p-5 rounded-xl bg-[#090812] border border-purple-500/30 space-y-1.5">
                    <div className="text-2xl font-mono font-bold text-white tracking-tight">
                      {formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)}
                    </div>
                    <div className="text-xs font-mono text-purple-300 font-bold">
                      Standard Build Fee
                    </div>
                    <div className="border-t border-[#201d36] pt-2 mt-2 flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">Care Retainer:</span>
                      <span className="text-purple-300 font-bold">{formatEGP(PACKAGE_PRESETS.signature.monthlyCareFee)} / mo</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">Sprint Delivery:</span>
                      <span className="text-emerald-400 font-bold">{PACKAGE_PRESETS.signature.timeline}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider font-bold block">
                      Signature Scope Specifications
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-200">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Multi-Page Atelier Platform (3–5 Pages)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Interactive Project Explorer with Category Filtering</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>VIP Consultation Brief &amp; Budget Qualification Gate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Interactive Finishes &amp; Materiality Moodboard Preview</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>3 Revision Rounds &amp; Private Staging Review</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchTierProposal('signature')}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition-all shadow-lg shadow-purple-600/30 mt-4"
                >
                  Draft Signature Proposal →
                </button>
              </div>

              {/* TIER 3: AUTHORITY */}
              <div className="p-7 rounded-2xl bg-[#0c0b14] border border-[#1e1c2e] space-y-6 flex flex-col justify-between hover:border-[#2f2b48] transition-all shadow-xl">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      TIER 03 // MONUMENTAL
                    </span>
                    <h4 className="text-xl font-serif text-white">
                      Authority System
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[48px]">
                    Flagship digital platform for master residential builders and premier ateliers targeting high-net-worth investors across Egypt and the Gulf.
                  </p>

                  {/* Price Box */}
                  <div className="p-5 rounded-xl bg-[#08070d] border border-[#1a1828] space-y-1.5">
                    <div className="text-2xl font-mono font-bold text-white tracking-tight">
                      {formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+
                    </div>
                    <div className="text-xs font-mono text-zinc-400">
                      Standard Build Fee
                    </div>
                    <div className="border-t border-[#181628] pt-2 mt-2 flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">Care Retainer:</span>
                      <span className="text-zinc-300">{formatEGP(PACKAGE_PRESETS.authority.monthlyCareFee)} / mo</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">Sprint Delivery:</span>
                      <span className="text-purple-300">{PACKAGE_PRESETS.authority.timeline}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold block">
                      Authority Specifications
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Monumental Multi-Page Digital Flagship Platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Arabic &amp; English Full Bilingual Architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Private VIP Consultation Gate &amp; Budget Filter ($150k+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>Founder Monograph &amp; Atelier Legacy Showcase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>3 Priority Sprints &amp; Founder-Level Access</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchTierProposal('authority')}
                  className="w-full py-2.5 rounded-xl bg-[#141322] hover:bg-[#1e1c32] text-zinc-200 hover:text-white border border-[#252238] text-xs font-mono font-medium transition-all mt-4"
                >
                  Draft Authority Proposal →
                </button>
              </div>
            </div>
          </div>

          {/* MANAGED CARE MONTHLY PLANS BREAKDOWN */}
          <div className="p-6 rounded-2xl bg-[#0c0b12] border border-[#1e1c2a] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b1926] pb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-base font-serif font-bold text-white">
                    Optional Managed Care Plans
                  </h4>
                </div>
                <p className="text-xs text-zinc-400">
                  Peace-of-mind monthly hosting, security updates, backups, and portfolio maintenance.
                </p>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 bg-[#14131f] px-3 py-1 rounded-lg border border-[#232034]">
                NO LOCK-IN // CANCEL ANYTIME
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#111019] border border-[#222030] space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Presence Care</span>
                <div className="text-lg font-mono font-bold text-white">{formatEGP(PACKAGE_PRESETS.presence.monthlyCareFee)} <span className="text-[11px] font-sans text-zinc-400 font-normal">/ month</span></div>
                <p className="text-[11px] text-zinc-400 pt-1">Cloud hosting, SSL renewal, security monitoring, and 1 monthly project photo update.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#141220] border border-[var(--accent-purple)]/30 space-y-1">
                <span className="text-[10px] font-mono text-[var(--accent-purple)] font-bold uppercase">Signature Care (Recommended)</span>
                <div className="text-lg font-mono font-bold text-white">{formatEGP(PACKAGE_PRESETS.signature.monthlyCareFee)} <span className="text-[11px] font-sans text-zinc-400 font-normal">/ month</span></div>
                <p className="text-[11px] text-zinc-400 pt-1">High-speed Edge CDN, automated weekly backups, up to 3 monthly project updates, and priority bug fixes.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#111019] border border-[#222030] space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Authority Care</span>
                <div className="text-lg font-mono font-bold text-white">{formatEGP(PACKAGE_PRESETS.authority.monthlyCareFee)} <span className="text-[11px] font-sans text-zinc-400 font-normal">/ month</span></div>
                <p className="text-[11px] text-zinc-400 pt-1">Enterprise CDN &amp; 99.99% SLA, monthly conversion reporting, unlimited minor content edits, and 24h turnarounds.</p>
              </div>
            </div>
          </div>

          {/* 12 Core Components */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-white tracking-tight">
              The 12 Core System Deliverables
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeComponents.map((c, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2 hover:border-[var(--accent-purple)]/50 transition-all shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-mono font-bold text-white">
                      0{idx + 1} // {c.title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Trigger to Proposal */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-purple)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
            <div className="space-y-1">
              <h4 className="text-base font-serif font-bold text-white">
                Ready to prepare an offer for a qualified studio?
              </h4>
              <p className="text-xs text-zinc-300">
                Generate a custom web proposal for Presence ({formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)}), Signature ({formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)}), Authority ({formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+), or Founding Partner.
              </p>
            </div>
            <button
              onClick={() => onSelectView('proposals-builder')}
              className="px-6 py-3 rounded-xl bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Proposal Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Future Capabilities (Not Active) */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2.5">
            <AlertOctagon className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>INTERNAL DISCIPLINE RULE:</strong> These capabilities are strictly marked as FUTURE. Do NOT present them to prospects or build backend infrastructure for them until the first paying clients have validated the core offer.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureCapabilities.map((fc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 opacity-85"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    STAGE 4–5 CAPABILITY
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold">
                    {fc.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-200">
                  {fc.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {fc.desc}
                </p>

                <div className="pt-2 border-t border-[#1a1a22] text-[11px] text-zinc-500 font-mono">
                  <strong>Why disabled in V1:</strong> {fc.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
