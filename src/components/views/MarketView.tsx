import React, { useState } from 'react';
import {
  Users,
  Target,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  ArrowRight,
  ShieldAlert,
  Search,
  Sparkles
} from 'lucide-react';
import { ViewMode } from '../../types';
import { COMPANY_CONTEXT } from '../../data/companyData';
import { LeadScorer } from './LeadScorer';

interface MarketViewProps {
  onSelectView: (view: ViewMode) => void;
  defaultSection?: 'icp' | 'research' | 'scorer';
}

export const MarketView: React.FC<MarketViewProps> = ({
  onSelectView,
  defaultSection = 'icp',
}) => {
  const [section, setSection] = useState<'icp' | 'research' | 'scorer'>(defaultSection);

  const [researchSteps, setResearchSteps] = useState([
    { id: 1, text: 'Inspect last 6–9 Instagram posts: Verify real executed residential projects (not 100% 3D renders).', done: false },
    { id: 2, text: 'Click link-in-bio: Is website missing, broken, non-mobile responsive, or a passive PDF brochure?', done: false },
    { id: 3, text: 'Identify ONE standout project name & exact digital friction (e.g. highlights scattered, no turnkey breakdown).', done: false },
    { id: 4, text: 'Locate Founder, Principal Architect, or Managing Director name & WhatsApp/phone number.', done: false },
    { id: 5, text: 'Assign Lead Grade (A or B) and record in CRM with an immediate Next Action date within 24h.', done: false },
  ]);

  const toggleStep = (id: number) => {
    setResearchSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const resetChecklist = () => {
    setResearchSteps((prev) => prev.map((s) => ({ ...s, done: false })));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#20202c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent-purple)] uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>MARKET &amp; QUALIFICATION // V1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Ideal Client Profile &amp; Lead Scoring.
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Do not waste a single minute pitching unqualified leads. Outreach only to studios that meet strict Grade A or B criteria.
        </p>
      </div>

      {/* Navigation Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#20202c] pb-4">
        <button
          onClick={() => setSection('icp')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
            section === 'icp'
              ? 'bg-[var(--accent-purple)] text-white shadow-md'
              : 'bg-[var(--bg-elevated)] text-zinc-400 hover:text-zinc-200 border border-[var(--border-subtle)]'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>ICP V1 Matrix</span>
        </button>

        <button
          onClick={() => setSection('scorer')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
            section === 'scorer'
              ? 'bg-[var(--accent-purple)] text-white shadow-md'
              : 'bg-[var(--bg-elevated)] text-zinc-400 hover:text-zinc-200 border border-[var(--border-subtle)]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Lead Scorer (Tool)</span>
        </button>

        <button
          onClick={() => setSection('research')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
            section === 'research'
              ? 'bg-[var(--accent-purple)] text-white shadow-md'
              : 'bg-[var(--bg-elevated)] text-zinc-400 hover:text-zinc-200 border border-[var(--border-subtle)]'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>5–7 Min Research Checklist</span>
        </button>
      </div>

      {section === 'scorer' ? (
        <LeadScorer onSelectView={onSelectView} />
      ) : section === 'icp' ? (
        <div className="space-y-10">
          {/* ICP Core Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Positive Criteria */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>IDEAL TARGET PROFILE (MUST HAVE)</span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span><strong>Real Executed Projects:</strong> Visible on-site execution, luxury finishing, real client handovers (villas, duplexes, penthouses).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span><strong>Active Social Presence:</strong> Regularly posting on Instagram with good engagement and high craftsmanship.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span><strong>Obvious Digital Gap:</strong> No website, broken URL, slow loading, or unorganized Instagram highlights.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span><strong>Accessible Decision Maker:</strong> Founder, Principal Architect, or Managing Partner can be directly phoned or DM’d.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span><strong>High Average Contract Value:</strong> Executing residential projects where one closed client yields 200k+ EGP in margin.</span>
                </li>
              </ul>
            </div>

            {/* Disqualification Criteria */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-rose-500/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>STRICT DISQUALIFICATION (AVOID IN V1)</span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span><strong>Individual Freelancers &amp; Students:</strong> Solo 3D renderers with zero turnkey construction capacity.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span><strong>100% 3D Render Portfolios:</strong> No evidence of actual physically completed residential work.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span><strong>Price-Only Commodity Buyers:</strong> Inquiring who is the cheapest web designer instead of seeking value.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span><strong>Large Enterprise Developers:</strong> Real estate developers (e.g. Emaar, Palm Hills) with 6-month corporate red tape.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span><strong>Unreachable Founders:</strong> Companies where gatekeeper receptionists block all direct communication.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Lead Scoring Matrix (Grade A, B, C) */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-white tracking-tight">
              The Lead Scoring Matrix // A, B, C Triage
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Grade A */}
              <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--accent-purple)] space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--accent-purple)]">
                    GRADE A // PRIME OPPORTUNITY
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] font-bold">
                    PRIORITY 1
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Strong Projects + Glaring Digital Gap
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Real luxury projects (Katameya, Zayed). Active IG. Completely broken, outdated, or nonexistent website. Owner is clearly identified.
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-400 font-semibold">
                  Action: Cold call within 24 hours.
                </div>
              </div>

              {/* Grade B */}
              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    GRADE B // ACCEPTABLE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 text-amber-400 font-bold">
                    PRIORITY 2
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Good Projects + Moderate Gap
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Good residential portfolio. Has an average WordPress or Wix site that looks dated or lacks mobile optimization. Owner reachable.
                </p>
                <div className="pt-2 text-xs font-mono text-zinc-400 font-semibold">
                  Action: Outreach during secondary batch.
                </div>
              </div>

              {/* Grade C */}
              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-[#1e1e26] space-y-3 opacity-60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    GRADE C // DISQUALIFY
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-500 font-bold">
                    SKIP
                  </span>
                </div>
                <h4 className="text-base font-bold text-zinc-400">
                  Unqualified / Low Commercial Value
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Only 3D renders, inactive account for 6 months, no phone number, or commercial projects outside luxury focus.
                </p>
                <div className="pt-2 text-xs font-mono text-rose-400 font-semibold">
                  Action: Do not contact. Archive in CRM.
                </div>
              </div>
            </div>
          </div>

          {/* Target Enclaves in Egypt */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-purple)] font-semibold">
              <MapPin className="w-4 h-4" />
              <span>GEOGRAPHIC ENCLAVES (STARTING BOUNDARIES)</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {COMPANY_CONTEXT.targetLocations.map((loc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#181822] text-zinc-300 border border-[#262638]"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 5–7 Min Prospect Research Protocol */
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--accent-purple)]/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-purple)] font-bold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>THE 5–7 MINUTE TIME-BOX PROTOCOL</span>
              </div>
              <button
                onClick={resetChecklist}
                className="text-xs font-mono text-zinc-400 hover:text-white underline"
              >
                Reset Checklist
              </button>
            </div>
            <h3 className="text-xl font-serif text-white">
              Pre-Flight Qualification Checklist
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
              Spend exactly 5 to 7 minutes on a prospect before dialling or sending a DM. Never spend 30 minutes reading their bio. Check each item below to qualify:
            </p>

            {/* Interactive Research Steps */}
            <div className="space-y-3 pt-2">
              {researchSteps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    step.done
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-200'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={step.done}
                    onChange={() => {}}
                    className="w-4 h-4 rounded mt-0.5 accent-[var(--accent-purple)] cursor-pointer"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-white mr-2">
                      STEP 0{step.id}:
                    </span>
                    <span className="text-xs leading-relaxed">{step.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#222230]">
              <span className="text-xs font-mono text-zinc-400">
                Completed {researchSteps.filter((s) => s.done).length} of 5 steps
              </span>
              <button
                onClick={() => onSelectView('templates-catalog')}
                className="px-4 py-2 rounded-xl bg-[var(--accent-purple)] hover:bg-[#6d28d9] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Ready to Dial // Copy Script</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
