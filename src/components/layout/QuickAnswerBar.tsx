import React from 'react';
import { ViewMode } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface QuickAnswerBarProps {
  onSelectView: (view: ViewMode) => void;
  onClose: () => void;
}

export const QuickAnswerBar: React.FC<QuickAnswerBarProps> = ({ onSelectView }) => {
  const answers = [
    {
      q: '1. Where are we?',
      a: 'Pre-Launch / Market Validation stage. All foundational assets (brand, offer, positioning, CRM) are complete.',
      actionLabel: 'View Command Center',
      view: 'command-center' as ViewMode,
    },
    {
      q: '2. What matters now?',
      a: 'Acquiring the first paying client (Client #01) in the Egyptian Interior Design & Finishing niche.',
      actionLabel: 'View Active Offer',
      view: 'offers-active' as ViewMode,
    },
    {
      q: '3. What should I do next?',
      a: 'Execute cold calls on the 15 qualified Grade A studios and verify their Instagram / Website.',
      actionLabel: 'Open 15 Studios CRM',
      view: 'crm-bridge' as ViewMode,
    },
    {
      q: '4. What do I say to a prospect?',
      a: 'Use the 30-second cold call script with ONE specific observation. Never pitch full service on call 1.',
      actionLabel: 'Open Call Cockpit',
      view: 'sales-cockpit' as ViewMode,
    },
    {
      q: '5. Where is the relevant SOP?',
      a: 'SOP 01 (Lead Research) and SOP 02 (Cold Call Outreach Protocol) are ready in the SOPs catalog.',
      actionLabel: 'Open Agency SOPs',
      view: 'sops-catalog' as ViewMode,
    },
    {
      q: '6. How do I create a proposal?',
      a: 'Open Proposal Studio, edit the structured fields, review live preview, and send executive web link.',
      actionLabel: 'Open Proposal Studio',
      view: 'proposals-builder' as ViewMode,
    },
  ];

  return (
    <div className="bg-[#0c0c11] border-b border-[#22212e] p-6 shadow-2xl no-print animate-in slide-in-from-top-4 duration-200">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c1b26] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfb76c]" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#dfb76c] font-bold">
              10-Second Founder Orientation Panel // Clarity &gt; Complexity
            </h2>
          </div>
          <span className="text-[11px] text-zinc-300 font-mono">
            Answer the 6 critical daily questions in seconds
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {answers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#121218] border border-[#22212e] hover:border-[#c5a880]/50 transition-all flex flex-col justify-between space-y-3 group shadow-md"
            >
              <div className="space-y-1.5">
                <div className="text-xs font-serif font-bold text-white font-mono tracking-wide">
                  {item.q}
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                  {item.a}
                </p>
              </div>

              <button
                onClick={() => onSelectView(item.view)}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#c5a880] group-hover:text-[#dfb76c] transition-colors self-start"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 text-[#dfb76c]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
