import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ClipboardList,
  Compass,
  Check,
  Clock,
  Layers,
} from 'lucide-react';
import { SOPS_DATA } from '../../data/sopsData';
import { SOPItem } from '../../types';

export const SopsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSopId, setActiveSopId] = useState<string>(SOPS_DATA[0].id);

  const categories = [
    { id: 'all', label: 'All SOPs', count: SOPS_DATA.length },
    { id: 'research', label: 'Research', count: SOPS_DATA.filter((s) => s.category === 'research').length },
    { id: 'outreach', label: 'Outreach', count: SOPS_DATA.filter((s) => s.category === 'outreach').length },
    { id: 'discovery', label: 'Discovery', count: SOPS_DATA.filter((s) => s.category === 'discovery').length },
    { id: 'demo', label: 'Demo', count: SOPS_DATA.filter((s) => s.category === 'demo').length },
    { id: 'proposal', label: 'Proposal', count: SOPS_DATA.filter((s) => s.category === 'proposal').length },
    { id: 'closing', label: 'Closing', count: SOPS_DATA.filter((s) => s.category === 'closing').length },
    { id: 'onboarding', label: 'Onboarding', count: SOPS_DATA.filter((s) => s.category === 'onboarding').length },
    { id: 'delivery', label: 'Delivery', count: SOPS_DATA.filter((s) => s.category === 'delivery').length },
  ];

  const filteredSops = SOPS_DATA.filter((sop) => {
    const matchesCategory = selectedCategory === 'all' || sop.category === selectedCategory;
    const matchesSearch =
      sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSop: SOPItem =
    SOPS_DATA.find((s) => s.id === activeSopId) || SOPS_DATA[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#1c1a2c] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121120] border border-[#242238] text-[11px] font-mono text-purple-300 uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
          <span>OPERATIONAL PLAYBOOK // SOPS 01–10</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Standard Operating Procedures
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Standardized execution protocols governing NYVEQ client acquisition, discovery diagnosis, live concept demonstrations, proposal synthesis, and turnkey delivery.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search procedures by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f0e18] border border-[#222034] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/80 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/20'
                  : 'bg-[#121120] text-zinc-400 hover:text-white border border-[#201e32]'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column SOP Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
        {/* Left Column: Navigation Directory */}
        <div className="space-y-2">
          {filteredSops.map((sop) => {
            const isActive = sop.id === activeSop.id;
            return (
              <button
                key={sop.id}
                onClick={() => setActiveSopId(sop.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex flex-col space-y-1.5 group ${
                  isActive
                    ? 'bg-[#151326] border-purple-500/60 text-white shadow-lg ring-1 ring-purple-500/20'
                    : 'bg-[#0d0c15] border-[#1c1a2a] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-purple-300' : 'text-zinc-500'}`}>
                    {sop.number}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171626] text-zinc-400 uppercase tracking-wider">
                    {sop.category}
                  </span>
                </div>
                <div className="text-xs font-semibold leading-snug group-hover:text-white transition-colors">
                  {sop.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Editorial SOP Monograph */}
        <article className="p-8 sm:p-10 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] space-y-10 shadow-2xl">
          {/* SOP Header */}
          <div className="space-y-4 border-b border-[#1a1829] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-500/30 font-bold">
                {activeSop.number}
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                PHASE // {activeSop.category.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              {activeSop.title}
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              <strong className="text-purple-400 font-medium">Core Purpose:</strong> {activeSop.purpose}
            </p>
          </div>

          {/* Context & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-[#090810] border border-[#1a1829]">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>When To Use</span>
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeSop.whenToUse}
              </p>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1a1829] pt-4 md:pt-0 md:pl-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Required Inputs</span>
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeSop.inputs.map((inp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Execution Protocol with Vertical Progression Line */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                Sequential Execution Protocol
              </h3>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-px before:bg-[#252238]">
              {activeSop.steps.map((step) => (
                <div key={step.order} className="relative space-y-2 group">
                  {/* Step Milestone Marker */}
                  <div className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full bg-[#0d0c15] border-2 border-purple-500/60 text-purple-300 text-[10px] font-mono font-bold flex items-center justify-center shadow-md">
                    {step.order}
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {step.detail}
                    </p>

                    {step.tip && (
                      <div className="p-3 rounded-lg bg-[#141322] border-l-2 border-purple-500 text-[11px] text-zinc-300 leading-relaxed font-mono">
                        <span className="text-purple-400 font-bold">Protocol Tip: </span>
                        {step.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Output */}
          <div className="p-5 rounded-xl bg-[#090810] border border-[#1a1829] space-y-2">
            <span className="text-[11px] font-mono uppercase text-purple-400 font-bold tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Expected Output &amp; Asset Produced</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {activeSop.expectedOutput}
            </p>
          </div>

          {/* Done When & Common Mistakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Done When (Exit Criteria) */}
            <div className="p-6 rounded-xl bg-[#07130f] border border-emerald-500/30 space-y-4">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                <span>Done When (Exit Criteria)</span>
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-200">
                {activeSop.doneWhen.map((dw, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="leading-relaxed">{dw}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="p-6 rounded-xl bg-[#140b0f] border border-rose-500/30 space-y-4">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-2">
                <AlertOctagon className="w-4 h-4" strokeWidth={1.5} />
                <span>Common Mistakes to Avoid</span>
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {activeSop.commonMistakes.map((cm, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
