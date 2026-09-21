import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Compass,
  PhoneCall,
  Truck,
  BookOpen,
  Map,
  ChevronDown,
  Building2,
  FileText,
  Radio,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { ViewMode } from '../../types';

interface SidebarProps {
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  num: string;
  items: {
    id: ViewMode;
    label: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onSelectView }) => {
  const sections: NavSection[] = [
    {
      id: 'strategy',
      label: 'STRATEGY',
      num: '02',
      icon: Compass,
      items: [
        { id: 'company-overview', label: 'Company' },
        { id: 'company-positioning', label: 'Positioning' },
        { id: 'market-icp', label: 'ICP' },
        { id: 'offers-active', label: 'Offers' },
        { id: 'market-research', label: 'Market' },
        { id: 'company-roadmap', label: 'Roadmap' },
      ],
    },
    {
      id: 'sales',
      label: 'SALES',
      num: '03',
      icon: PhoneCall,
      items: [
        { id: 'sales-funnel', label: 'Funnel' },
        { id: 'sales-outreach', label: 'Outreach' },
        { id: 'sales-discovery', label: 'Discovery' },
        { id: 'sales-demo', label: 'Demo' },
        { id: 'proposals-builder', label: 'Proposal Studio' },
        { id: 'proposals-library', label: 'Proposal Library' },
        { id: 'sales-closing', label: 'Closing' },
        { id: 'sales-objections', label: 'Objections' },
        { id: 'sales-followup', label: 'Follow-up' },
      ],
    },
    {
      id: 'delivery',
      label: 'DELIVERY',
      num: '04',
      icon: Truck,
      items: [
        { id: 'delivery-onboarding', label: 'Onboarding' },
        { id: 'delivery-discovery', label: 'Discovery' },
        { id: 'delivery-strategy', label: 'Strategy' },
        { id: 'delivery-build', label: 'Build' },
        { id: 'delivery-review', label: 'Review' },
        { id: 'delivery-revisions', label: 'Revisions' },
        { id: 'delivery-launch', label: 'Launch' },
        { id: 'delivery-postlaunch', label: 'Post-launch' },
      ],
    },
    {
      id: 'library',
      label: 'LIBRARY',
      num: '05',
      icon: BookOpen,
      items: [
        { id: 'sops-catalog', label: 'SOPs' },
        { id: 'templates-catalog', label: 'Templates' },
        { id: 'library-scripts', label: 'Scripts' },
        { id: 'library-notes', label: 'Internal Notes' },
      ],
    },
    {
      id: 'progress',
      label: 'PROGRESS',
      num: '06',
      icon: Map,
      items: [
        { id: 'progress-completed', label: 'Completed' },
        { id: 'progress-in-progress', label: 'In Progress' },
        { id: 'progress-next', label: 'Next' },
        { id: 'progress-later', label: 'Later' },
        { id: 'progress-decision-log', label: 'Decision Log' },
      ],
    },
  ];

  // Track expanded state of sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    strategy: false,
    sales: false,
    delivery: false,
    library: false,
    progress: false,
  });

  // Auto-expand section containing the active view
  useEffect(() => {
    sections.forEach((sec) => {
      const hasActive = sec.items.some((it) => it.id === activeView);
      if (hasActive) {
        setOpenSections((prev) => ({ ...prev, [sec.id]: true }));
      }
    });
  }, [activeView]);

  const toggleSection = (secId: string) => {
    setOpenSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  const isItemActive = (id: ViewMode) => {
    if (activeView === id) return true;
    if (id === 'company-overview' && (activeView === 'company-overview' || activeView === 'company-principles')) return true;
    if (id === 'offers-active' && (activeView === 'offers-active' || activeView === 'offers-future' || activeView === 'company-offers')) return true;
    if (id === 'market-icp' && (activeView === 'market-icp' || activeView === 'market-scoring' || activeView === 'company-icp')) return true;
    if (id === 'market-research' && (activeView === 'market-research' || activeView === 'company-market')) return true;
    if (id === 'proposals-builder' && (activeView === 'proposals-builder' || activeView === 'proposals-library')) return true;
    if (id === 'sops-catalog' && activeView === 'sops-catalog') return true;
    if (id === 'templates-catalog' && activeView === 'templates-catalog') return true;
    if (id === 'delivery-onboarding' && activeView.startsWith('delivery-')) return true;
    if (id === 'progress-completed' && activeView.startsWith('progress-')) return true;
    return false;
  };

  const isSectionActive = (sec: NavSection) => {
    return sec.items.some((it) => isItemActive(it.id));
  };

  return (
    <aside className="w-64 h-screen bg-[#07070a] border-r border-[#1a1926] flex flex-col shrink-0 select-none no-print">
      {/* Brand Header — Editorial Monogram matching Image 2 */}
      <div className="p-6 pb-6 border-b border-[#151420]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light tracking-[0.28em] text-white">
              N Y V E Q
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-purple)] shadow-[0_0_8px_var(--accent-purple)]" />
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                AGENCY HQ // OS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        {/* COMMAND CENTER (Fixed Top Station) */}
        <button
          onClick={() => onSelectView('command-center')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left group ${
            activeView === 'command-center'
              ? 'bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white shadow-lg shadow-purple-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-[#12111c]'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`text-[10px] font-mono tracking-wider shrink-0 ${
                activeView === 'command-center' ? 'text-purple-200' : 'text-zinc-600 group-hover:text-zinc-400'
              }`}
            >
              01
            </span>
            <div className="flex items-center gap-2.5 min-w-0">
              <LayoutDashboard
                className={`w-4 h-4 shrink-0 ${
                  activeView === 'command-center' ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              />
              <span
                className={`text-[13px] tracking-wide truncate ${
                  activeView === 'command-center' ? 'font-semibold text-white' : 'font-medium'
                }`}
              >
                Command Center
              </span>
            </div>
          </div>
        </button>

        {/* FOUNDER EXECUTION (Primary Internal Section) */}
        <button
          onClick={() => onSelectView('founder-execution')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left group ${
            activeView === 'founder-execution'
              ? 'bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white shadow-lg shadow-purple-950/40'
              : 'text-zinc-400 hover:text-white hover:bg-[#12111c]'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`text-[10px] font-mono tracking-wider shrink-0 ${
                activeView === 'founder-execution' ? 'text-purple-200' : 'text-zinc-600 group-hover:text-zinc-400'
              }`}
            >
              EX
            </span>
            <div className="flex items-center gap-2.5 min-w-0">
              <Target
                className={`w-4 h-4 shrink-0 ${
                  activeView === 'founder-execution' ? 'text-white' : 'text-amber-400/90 group-hover:text-amber-300'
                }`}
              />
              <span
                className={`text-[13px] tracking-wide truncate ${
                  activeView === 'founder-execution' ? 'font-semibold text-white' : 'font-medium'
                }`}
              >
                Founder Execution
              </span>
            </div>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 group-hover:bg-amber-300" />
        </button>

        {/* NESTED SECTIONS: STRATEGY, SALES, DELIVERY, LIBRARY, PROGRESS */}
        <div className="pt-2 space-y-1">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isOpen = openSections[sec.id];
            const hasActiveChild = isSectionActive(sec);

            return (
              <div key={sec.id} className="rounded-xl overflow-hidden">
                {/* Section Header Button */}
                <button
                  onClick={() => toggleSection(sec.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition-all text-left group ${
                    hasActiveChild && !isOpen
                      ? 'bg-[#141320] text-purple-300 border border-purple-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-[#100f18]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 shrink-0">
                      {sec.num}
                    </span>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          hasActiveChild ? 'text-[var(--accent-purple)]' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      />
                      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-300 group-hover:text-white">
                        {sec.label}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-zinc-300' : ''
                    }`}
                  />
                </button>

                {/* Sub Items Accordion */}
                {isOpen && (
                  <div className="pl-9 pr-2 py-1 space-y-0.5 border-l border-[#1a1926] ml-5 my-1">
                    {sec.items.map((item) => {
                      const active = isItemActive(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelectView(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                            active
                              ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-medium'
                              : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#151422]'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-purple)] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* OPERATIONS / QUICK HUBS */}
        <div className="pt-4 pb-2 border-t border-[#151420] mt-4">
          <div className="px-3.5 text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
            OPERATIONS & PIPELINE
          </div>

          <button
            onClick={() => onSelectView('crm-bridge')}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition-all text-left group ${
              activeView === 'crm-bridge'
                ? 'bg-[#151422] text-purple-200 border border-purple-500/30 font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-[#100f18]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Building2
                className={`w-4 h-4 shrink-0 ${
                  activeView === 'crm-bridge' ? 'text-[var(--accent-purple)]' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              />
              <span className="text-xs font-medium tracking-wide truncate">CRM / 15 Studios</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">↗</span>
          </button>

          <button
            onClick={() => onSelectView('sales-cockpit')}
            className={`w-full flex items-center justify-between px-3.5 py-2 mt-1 rounded-xl transition-all text-left group ${
              activeView === 'sales-cockpit'
                ? 'bg-[#151422] text-purple-200 border border-purple-500/30 font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-[#100f18]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Radio
                className={`w-4 h-4 shrink-0 ${
                  activeView === 'sales-cockpit' ? 'text-[var(--accent-purple)]' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              />
              <span className="text-xs font-medium tracking-wide truncate">Call Cockpit</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Footer Branding & Manifesto */}
      <div className="p-4 border-t border-[#151420]">
        <div className="text-center">
          <p className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-1">
            DISCIPLINE CREATES FREEDOM
          </p>
          <div className="w-6 h-[1px] bg-[#232234] mx-auto mb-1.5" />
          <p className="text-[9px] font-mono tracking-widest text-zinc-600">
            NYVEQ // 2024
          </p>
        </div>
      </div>
    </aside>
  );
};
