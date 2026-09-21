import React, { useState } from 'react';
import {
  Building2,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Check,
  Target,
  ArrowRight,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import {
  COMPANY_CONTEXT,
  ROADMAP_STAGES,
  CORE_OPERATING_PRINCIPLES
} from '../../data/companyData';

interface CompanyViewProps {
  defaultTab?: 'positioning' | 'principles' | 'roadmap' | 'model';
}

export const CompanyView: React.FC<CompanyViewProps> = ({ defaultTab = 'positioning' }) => {
  const [activeTab, setActiveTab] = useState<'positioning' | 'principles' | 'roadmap' | 'model'>(defaultTab);

  const statusBadge = (status: 'ACTIVE' | 'VALIDATED' | 'HYPOTHESIS' | 'FUTURE' | 'NOT YET VALIDATED') => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1a172e] text-purple-300 border border-purple-500/30 uppercase tracking-wider">
            ACTIVE
          </span>
        );
      case 'VALIDATED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0b1c14] text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            VALIDATED
          </span>
        );
      case 'HYPOTHESIS':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1e1910] text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            HYPOTHESIS
          </span>
        );
      case 'FUTURE':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#14141a] text-zinc-400 border border-zinc-700/50 uppercase tracking-wider">
            FUTURE
          </span>
        );
      case 'NOT YET VALIDATED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1c0e12] text-rose-300 border border-rose-500/30 uppercase tracking-wider">
            NOT YET VALIDATED
          </span>
        );
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#1f1e2e] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12111d] border border-[#232135] text-[10px] font-mono text-purple-300 uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>STRATEGIC DNA // NYVEQ AGENCY HQ</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Company Positioning &amp; Operating Model
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Founder: <strong className="text-zinc-200">Ahmed</strong> • Domain: <code className="text-purple-300">nyveq.com</code> • Single Source of Truth
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-mono">STAGE:</span>
            {statusBadge('ACTIVE')}
            <span className="text-xs text-zinc-300 font-medium">Market Validation</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f1e2e] pb-3 overflow-x-auto custom-scrollbar">
        {[
          { id: 'positioning', label: 'Positioning & Reality' },
          { id: 'model', label: 'Strategic Growth Model' },
          { id: 'roadmap', label: '6-Stage Roadmap' },
          { id: 'principles', label: 'Inviolable Principles' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wide transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-purple-600/20 text-purple-200 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#12111c]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: POSITIONING & REALITY */}
      {activeTab === 'positioning' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Main Positioning Callout */}
          <div className="luxury-card p-8 rounded-2xl relative overflow-hidden border-l-4 border-l-[var(--accent-purple)] space-y-4 bg-[#0d0c15]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-semibold">
                CORE COMPANY POSITIONING (SECTION 9)
              </span>
              {statusBadge('ACTIVE')}
            </div>
            <p className="text-xl sm:text-2xl font-serif text-white leading-relaxed">
              “NYVEQ builds digital systems for service businesses using web, automation and AI.”
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="text-zinc-200">Operating Principle:</span>
              <span className="text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded border border-purple-800/40">
                “Start with the business problem, not the tool.”
              </span>
            </div>
          </div>

          {/* Current Reality vs Future Ambitions Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Visual State Matrix: Reality vs Ambition
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Zero Confusion Rule</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Core Reality */}
              <div className="luxury-card p-6 rounded-2xl space-y-3 bg-[#0d0c15]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">FOCUS NICHE</span>
                  {statusBadge('ACTIVE')}
                </div>
                <h4 className="text-base font-semibold text-white">Interior Design &amp; Finishing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Egypt residential turnkey studios (New Cairo, Zayed, 6th of October, Maadi). Commercially meaningful projects, high visual craft, fragmented digital presence.
                </p>
              </div>

              {/* Card 2: Core Offer */}
              <div className="luxury-card p-6 rounded-2xl space-y-3 bg-[#0d0c15]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">ACTIVE OFFER</span>
                  {statusBadge('ACTIVE')}
                </div>
                <h4 className="text-base font-semibold text-white">NYVEQ Digital Presence System</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Described as <em>Strategy + Web + Client Journey</em>. Transforming existing portfolio credibility into a high-trust conversion architecture.
                </p>
              </div>

              {/* Card 3: AI & Automation Reality */}
              <div className="luxury-card p-6 rounded-2xl space-y-3 bg-[#0d0c15]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">AI &amp; AUTOMATION</span>
                  {statusBadge('FUTURE')}
                </div>
                <h4 className="text-base font-semibold text-zinc-300">Autonomous Concierge &amp; n8n</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Do not lead with AI. Not sold as standalone commodity bots. Activates in Phase 2 only after core web presence is validated and generating traffic.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRATEGIC GROWTH MODEL */}
      {activeTab === 'model' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="luxury-card p-6 rounded-2xl space-y-4 bg-[#0d0c15]">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              The 7-Step Repeatable Scaling Model
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every stage must be validated before moving to the next. Do not expand prematurely.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 pt-2">
              {[
                { step: '01', name: 'One Niche', desc: 'Interior Design & Finishing Egypt', status: 'ACTIVE' as const },
                { step: '02', name: 'One Problem', desc: 'Fragmented portfolio & lost trust', status: 'ACTIVE' as const },
                { step: '03', name: 'One Offer', desc: 'Digital Presence System', status: 'ACTIVE' as const },
                { step: '04', name: 'Proof', desc: 'First paying client case study', status: 'NOT YET VALIDATED' as const },
                { step: '05', name: 'Systems', desc: 'Repeatable sales & delivery SOPs', status: 'HYPOTHESIS' as const },
                { step: '06', name: 'Team', desc: 'Specialized talent execution', status: 'FUTURE' as const },
                { step: '07', name: 'Expansion', desc: 'Adjacent niches & Gulf markets', status: 'FUTURE' as const },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-2 ${
                    m.status === 'ACTIVE'
                      ? 'bg-purple-950/20 border-purple-500/40'
                      : m.status === 'NOT YET VALIDATED'
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-[#11101a] border-[#1d1b2a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-zinc-500">{m.step}</span>
                    {statusBadge(m.status)}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">{m.name}</h5>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 6-STAGE EXPANSION ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROADMAP_STAGES.map((s, idx) => {
              const isCurrent = s.stage === 'Stage 1';
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    isCurrent
                      ? 'bg-[#131120] border-purple-500/50 shadow-xl shadow-purple-950/30'
                      : 'bg-[#0d0c15] border-[#1f1e2c]'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-zinc-400">{s.stage}</span>
                      {isCurrent ? statusBadge('ACTIVE') : statusBadge('FUTURE')}
                    </div>
                    <h4 className="text-base font-bold text-white tracking-tight">{s.name}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{s.summary}</p>
                  </div>

                  <div className="border-t border-[#1d1c2b] pt-3 space-y-1.5">
                    {s.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {item.done ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 ml-1 mr-1" />
                        )}
                        <span className={item.done ? 'text-zinc-200' : 'text-zinc-500'}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: INVIOLABLE PRINCIPLES */}
      {activeTab === 'principles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
          {CORE_OPERATING_PRINCIPLES.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0d0c15] border border-[#1f1e2c] space-y-2 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>0{idx + 1} // {p.title}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
