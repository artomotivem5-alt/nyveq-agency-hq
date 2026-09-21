import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Target,
  ExternalLink,
  PhoneCall,
  Copy,
  Check
} from 'lucide-react';
import { ViewMode } from '../../types';

interface LeadScorerProps {
  onSelectView?: (view: ViewMode) => void;
}

interface Criterion {
  id: string;
  category: string;
  title: string;
  detail: string;
  points: number;
}

export const LeadScorer: React.FC<LeadScorerProps> = ({ onSelectView }) => {
  const [studioName, setStudioName] = useState('KÉRAN Atelier');
  const [location, setLocation] = useState('Katameya Dunes / New Cairo');
  const [founderName, setFounderName] = useState('Eng. Karim El-Sayed');
  const [profileUrl, setProfileUrl] = useState('instagram.com/keran.atelier');

  // Criteria evaluation checklist
  const criteriaList: Criterion[] = [
    {
      id: 'c1',
      category: 'PORTFOLIO CALIBER',
      title: 'Real Luxury Residential Handover',
      detail: 'Executes actual private villas, standalone palaces, or luxury penthouses (NOT 100% 3D renders or generic office fit-outs).',
      points: 25,
    },
    {
      id: 'c2',
      category: 'TICKET SIZE',
      title: 'High-Ticket Project Value (> 5M–15M EGP)',
      detail: 'Client base invests $100k+ / 5M+ EGP per residential project on architectural and turnkey finishing.',
      points: 20,
    },
    {
      id: 'c3',
      category: 'DIGITAL FRICTION',
      title: 'Severe Digital Presentation Gap',
      detail: 'Has no website, a broken/slow mobile site, a passive PDF brochure, or an Instagram that fails to convey their real-world caliber.',
      points: 20,
    },
    {
      id: 'c4',
      category: 'ACCESSIBILITY',
      title: 'Direct Founder / Decision Maker Access',
      detail: 'Direct WhatsApp, mobile, or Instagram DM access to the Principal Architect or Managing Partner (no bureaucratic RFP wall).',
      points: 15,
    },
    {
      id: 'c5',
      category: 'GEOGRAPHY',
      title: 'Tier-1 Enclave Concentration',
      detail: 'Projects situated in Katameya Dunes, Palm Hills, Mivida, Marassi, New Cairo, Sheikh Zayed, or Dubai/Riyadh.',
      points: 10,
    },
    {
      id: 'c6',
      category: 'PIPELINE ACTIVITY',
      title: 'Active Operations & Fresh Projects',
      detail: 'Active within the last 30–60 days, showcasing ongoing site work, handovers, or expanding their client intake.',
      points: 10,
    },
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(['c1', 'c2', 'c3', 'c4', 'c5']);

  const toggleCriterion = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  // Compute Score
  const currentScore = criteriaList
    .filter((c) => checkedIds.includes(c.id))
    .reduce((sum, c) => sum + c.points, 0);

  // Determine Grade
  let grade: 'Grade A' | 'Grade B' | 'Grade C';
  let gradeBadgeColor: string;
  let verdictTitle: string;
  let verdictDescription: string;
  let recommendedAction: string;

  if (currentScore >= 80) {
    grade = 'Grade A';
    gradeBadgeColor = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400';
    verdictTitle = '🔥 GRADE A: IMMEDIATE OUTREACH PRIORITY';
    verdictDescription =
      'This firm represents the ideal NYVEQ target. High architectural caliber coupled with obvious digital presentation friction. Immediate cold call or direct WhatsApp voice note recommended within 24 hours.';
    recommendedAction = 'Execute 30-Second Pattern Interrupt Cold Call or Send Bespoke DM.';
  } else if (currentScore >= 50) {
    grade = 'Grade B';
    gradeBadgeColor = 'bg-amber-500/15 border-amber-500/40 text-amber-400';
    verdictTitle = '⚡ GRADE B: SECONDARY TARGET';
    verdictDescription =
      'Qualified potential with minor friction or missing direct founder access. Approach with a soft, warm Instagram DM or LinkedIn InMail first before escalating to phone outreach.';
    recommendedAction = 'Send Personalized Instagram DM with 60-Second Video Audit Link.';
  } else {
    grade = 'Grade C';
    gradeBadgeColor = 'bg-zinc-800 border-zinc-700 text-zinc-400';
    verdictTitle = '⛔ GRADE C: DO NOT PURSUE / DISQUALIFIED';
    verdictDescription =
      'Does not meet NYVEQ sovereign standards (e.g. student renders, commercial fit-outs, low budget, or unreachable). Do not invest a single minute of outreach time.';
    recommendedAction = 'Log as Disqualified and proceed to the next lead on the target list.';
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#20202c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#272738] text-[11px] font-mono text-[#a855f7] uppercase tracking-wider">
          <Target className="w-3.5 h-3.5" />
          <span>LEAD QUALIFICATION // INTERACTIVE SCORER</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Interactive Lead Qualification Scorer.
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed mt-1">
              Score architecture &amp; interior design studios across 6 sovereign criteria before initiating contact. Never waste time on Grade C leads.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-[#14141c] hover:bg-[#1a1a24] text-zinc-400 hover:text-zinc-200 border border-[#232332] text-xs font-mono flex items-center gap-1.5 transition-colors self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Evaluation</span>
          </button>
        </div>
      </div>

      {/* Lead Information Bar */}
      <div className="p-5 rounded-2xl bg-[#0c0c12] border border-[#1f1f2c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
            Studio / Firm Name:
          </label>
          <input
            type="text"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            className="w-full bg-[#13131c] border border-[#20202e] rounded-xl px-3 py-2 text-xs text-zinc-100 font-sans focus:outline-none focus:border-[#7c3aed]"
            placeholder="Studio Name"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
            Primary Geography / Enclave:
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#13131c] border border-[#20202e] rounded-xl px-3 py-2 text-xs text-zinc-100 font-sans focus:outline-none focus:border-[#7c3aed]"
            placeholder="Katameya Dunes, New Cairo"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
            Founder / Principal Architect:
          </label>
          <input
            type="text"
            value={founderName}
            onChange={(e) => setFounderName(e.target.value)}
            className="w-full bg-[#13131c] border border-[#20202e] rounded-xl px-3 py-2 text-xs text-zinc-100 font-sans focus:outline-none focus:border-[#7c3aed]"
            placeholder="Eng. Karim El-Sayed"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
            Instagram / Link-In-Bio:
          </label>
          <input
            type="text"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="w-full bg-[#13131c] border border-[#20202e] rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono text-[11px] focus:outline-none focus:border-[#7c3aed]"
            placeholder="instagram.com/studio"
          />
        </div>
      </div>

      {/* Main Scoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Criteria Checkboxes (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              QUALIFICATION CRITERIA (6 VECTORS)
            </span>
            <span className="text-xs font-mono text-zinc-500">
              {checkedIds.length} of {criteriaList.length} criteria satisfied
            </span>
          </div>

          <div className="space-y-3">
            {criteriaList.map((crit) => {
              const isChecked = checkedIds.includes(crit.id);
              return (
                <div
                  key={crit.id}
                  onClick={() => toggleCriterion(crit.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-4 ${
                    isChecked
                      ? 'bg-[#12121c] border-[#7c3aed]/50 shadow-md'
                      : 'bg-[#0b0b10] border-[#1c1c28] hover:border-[#2a2a3a] opacity-75'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#191924] text-[#c084fc] font-bold uppercase">
                        {crit.category}
                      </span>
                      <h4 className="text-sm font-semibold text-white tracking-tight">
                        {crit.title}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      {crit.detail}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      +{crit.points} pts
                    </span>
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-[#7c3aed] border-[#9333ea] text-white'
                          : 'border-[#2c2c3e] bg-[#14141d]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Score Gauge & Verdict (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0c0c12] border border-[#20202c] shadow-2xl space-y-5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
              LIVE SCORE VERDICT
            </span>

            {/* Score Number Gauge */}
            <div className="p-5 rounded-xl bg-[#12121a] border border-[#20202e] text-center space-y-2">
              <div className="text-5xl font-mono font-bold text-white tracking-tight">
                {currentScore}
                <span className="text-xl text-zinc-500 font-normal"> / 100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-[#1b1b26] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    currentScore >= 80
                      ? 'bg-emerald-500'
                      : currentScore >= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${currentScore}%` }}
                />
              </div>

              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-widest ${gradeBadgeColor}`}
                >
                  {grade}
                </span>
              </div>
            </div>

            {/* Verdict Explanation */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-white tracking-wide">
                {verdictTitle}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {verdictDescription}
              </p>
            </div>

            {/* Recommended Protocol */}
            <div className="p-3.5 rounded-xl bg-[#14141e] border border-[#242436] space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block font-semibold">
                Recommended Action:
              </span>
              <p className="text-xs text-zinc-200 font-medium">
                {recommendedAction}
              </p>
            </div>

            {/* Quick Action Navigation */}
            <div className="space-y-2 pt-2">
              {onSelectView && (
                <>
                  <button
                    onClick={() => onSelectView('templates-catalog')}
                    className="w-full p-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Prospect Script →</span>
                  </button>

                  <button
                    onClick={() => onSelectView('sales-cockpit')}
                    className="w-full p-2.5 rounded-xl bg-[#14141e] hover:bg-[#1c1c28] text-zinc-300 border border-[#242436] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                    <span>Open Live Call Cockpit</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
