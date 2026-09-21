import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Bell,
  Copy,
  Check,
  ChevronDown,
  Command,
  ArrowRight,
  FileText,
  FileCode,
  Files,
  HelpCircle,
  X,
  Target
} from 'lucide-react';
import { ViewMode } from '../../types';
import { TEMPLATES_DATA } from '../../data/templatesData';
import { SOPS_DATA } from '../../data/sopsData';
import { OBJECTIONS_DATA } from '../../data/objectionsData';

interface TopHeaderProps {
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  showQuickAnswers: boolean;
  onToggleQuickAnswers: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeView,
  onSelectView,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Global Command+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyColdCall = () => {
    const coldCall = TEMPLATES_DATA.find((t) => t.id === 't-cold-call-ar') || TEMPLATES_DATA[0];
    if (coldCall) {
      navigator.clipboard.writeText(coldCall.content);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'command-center':
        return 'Command Center // Founder Dashboard';
      case 'founder-execution':
        return 'Founder Execution // Brutal Clarity';
      case 'company-overview':
      case 'company-positioning':
      case 'company-principles':
      case 'company-roadmap':
        return 'Strategy // Core Positioning & Expansion';
      case 'offers-active':
      case 'offers-future':
      case 'company-offers':
        return 'Strategy // Digital Presence System';
      case 'market-icp':
      case 'market-scoring':
      case 'market-scorer':
      case 'company-icp':
        return 'Strategy // ICP & Qualification';
      case 'market-research':
      case 'company-market':
        return 'Strategy // Market Analysis & Territories';
      case 'sales-funnel':
        return 'Sales // 10-Stage Operating Funnel';
      case 'sales-outreach':
        return 'Sales // Outreach & Cold Contact';
      case 'sales-discovery':
        return 'Sales // 10-Question Diagnostic';
      case 'sales-demo':
        return 'Sales // Custom Demo Protocol';
      case 'sales-closing':
        return 'Sales // Closing & Value Guardrails';
      case 'sales-objections':
        return 'Sales // Objection Handling Framework';
      case 'sales-followup':
        return 'Sales // Systematic Follow-up Loops';
      case 'sales-cockpit':
        return 'Sales // Real-Time Call Cockpit';
      case 'delivery-overview':
      case 'delivery-onboarding':
      case 'delivery-discovery':
      case 'delivery-strategy':
      case 'delivery-build':
      case 'delivery-review':
      case 'delivery-revisions':
      case 'delivery-launch':
      case 'delivery-postlaunch':
        return 'Delivery // 21-Day Turnkey Framework';
      case 'sops-catalog':
        return 'Library // Standard Operating Procedures';
      case 'templates-catalog':
        return 'Library // Communication Templates';
      case 'library-scripts':
        return 'Library // Sales Scripts & Pitches';
      case 'library-notes':
        return 'Library // Founder Notes & Axioms';
      case 'proposals-builder':
      case 'proposals-library':
        return 'Proposals // Bespoke Document Studio';
      case 'progress-tracker':
      case 'progress-completed':
      case 'progress-in-progress':
      case 'progress-next':
      case 'progress-later':
      case 'progress-decision-log':
        return 'Progress // Execution & Decision Log';
      case 'crm-bridge':
        return 'CRM // 15 Egyptian Interior Studios';
      default:
        return 'NYVEQ Agency HQ // Executive Console';
    }
  };

  // Search Results aggregation
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const results: {
      id: string;
      title: string;
      subtitle: string;
      category: string;
      icon: React.ComponentType<{ className?: string }>;
      action: () => void;
    }[] = [];

    // Search in SOPs
    SOPS_DATA.forEach((sop) => {
      if (
        sop.title.toLowerCase().includes(q) ||
        sop.purpose.toLowerCase().includes(q) ||
        sop.whenToUse.toLowerCase().includes(q)
      ) {
        results.push({
          id: `sop-${sop.id}`,
          title: sop.title,
          subtitle: sop.purpose,
          category: 'SOP',
          icon: FileCode,
          action: () => {
            onSelectView('sops-catalog');
            setShowSearch(false);
          },
        });
      }
    });

    // Search in Templates
    TEMPLATES_DATA.forEach((tpl) => {
      if (
        tpl.title.toLowerCase().includes(q) ||
        tpl.content.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: `tpl-${tpl.id}`,
          title: tpl.title,
          subtitle: tpl.description,
          category: 'Template',
          icon: Files,
          action: () => {
            onSelectView('templates-catalog');
            setShowSearch(false);
          },
        });
      }
    });

    // Search in Objections
    OBJECTIONS_DATA.forEach((obj) => {
      if (
        obj.exactObjection.toLowerCase().includes(q) ||
        obj.meaning.toLowerCase().includes(q) ||
        obj.exampleResponseArabic.toLowerCase().includes(q)
      ) {
        results.push({
          id: `obj-${obj.id}`,
          title: obj.exactObjection,
          subtitle: obj.meaning,
          category: 'Objection',
          icon: HelpCircle,
          action: () => {
            onSelectView('sales-objections');
            setShowSearch(false);
          },
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, onSelectView]);

  return (
    <header className="h-16 bg-[#07070a] border-b border-[#1a1926] px-8 flex items-center justify-between shrink-0 z-20 sticky top-0">
      {/* Title / Breadcrumb */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold tracking-wide text-zinc-100 flex items-center gap-2">
          {getTitle()}
        </h1>
      </div>

      {/* Center - Search Bar matching Image 2 */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!showSearch) setShowSearch(true);
          }}
          onFocus={() => setShowSearch(true)}
          className="block w-full pl-10 pr-12 py-2 border border-[#201f30] rounded-xl leading-5 bg-[#12111c] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[var(--accent-purple)] focus:border-[var(--accent-purple)] transition-all sm:text-xs"
          placeholder="Search commands, scripts, SOPs... [⌘K]"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-zinc-500 flex items-center gap-1 text-[10px] font-mono bg-[#07070a] px-1.5 py-0.5 rounded border border-[#201f30]">
            <Command className="w-3 h-3" /> K
          </span>
        </div>
      </div>

      {/* Right - Actions & Founder Profile */}
      <div className="flex items-center gap-4">
        {/* Fast Copy Pitch Action */}
        <button
          onClick={handleCopyColdCall}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-[#12111c] hover:bg-[#181724] border border-[#201f30] transition-all shadow-sm group"
          title="Copy the 30-Second Arabic Cold Call Script"
        >
          {copiedScript ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-mono font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--accent-purple)] group-hover:text-purple-300" />
              <span className="text-xs font-mono">Copy Pitch</span>
            </>
          )}
        </button>

        {/* Notification Indicator */}
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-purple)] rounded-full border border-[#07070a]" />
        </button>

        {/* Subtle Divider */}
        <div className="w-px h-6 bg-[#1a1926]" />

        {/* Founder Profile Pill matching Image 2 */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <img
              src="/ahmed-founder.jpg"
              alt="Ahmed"
              className="w-8 h-8 rounded-full border border-purple-500/40 object-cover group-hover:border-[var(--accent-purple)] transition-all shadow-md"
              onError={(e) => {
                e.currentTarget.src =
                  'https://ui-avatars.com/api/?name=Ahmed&background=12111c&color=8b5cf6';
              }}
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#07070a]" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">Ahmed</p>
            <p className="text-[9px] text-zinc-500 font-mono tracking-wider">FOUNDER</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform" />
        </div>
      </div>

      {/* Global Interactive Command Palette Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="bg-[#0e0d16] border border-[#28263c] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input in modal */}
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-purple-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across SOPs, scripts, offers, ICP, objections..."
                className="w-full bg-[#151422] border border-[#28263c] rounded-xl py-3 pl-11 pr-10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[var(--accent-purple)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results or Quick Shortcuts */}
            <div className="max-h-96 overflow-y-auto space-y-1">
              {searchResults.length > 0 ? (
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1 tracking-wider">
                    MATCHING RESULTS ({searchResults.length})
                  </p>
                  {searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="w-full text-left p-3 rounded-xl hover:bg-[#181728] border border-transparent hover:border-purple-500/20 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-800/30 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-purple-300" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate group-hover:text-purple-200">
                              {item.title}
                            </p>
                            <p className="text-xs text-zinc-400 truncate">{item.subtitle}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/30 text-purple-300 border border-purple-800/40 shrink-0 ml-2">
                          {item.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : searchQuery ? (
                <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                  No matching SOPs or scripts found for "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-3 p-2">
                  <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                    FREQUENT OPERATING ACTIONS
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onSelectView('proposals-builder');
                        setShowSearch(false);
                      }}
                      className="p-3 bg-[#151422] hover:bg-[#1a192c] border border-[#252438] rounded-xl text-left transition-all flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="text-xs font-medium text-white">Create Proposal</div>
                        <div className="text-[10px] text-zinc-500">Live Client Monograph</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onSelectView('crm-bridge');
                        setShowSearch(false);
                      }}
                      className="p-3 bg-[#151422] hover:bg-[#1a192c] border border-[#252438] rounded-xl text-left transition-all flex items-center gap-3"
                    >
                      <Target className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-medium text-white">Open CRM</div>
                        <div className="text-[10px] text-zinc-500">15 Egyptian Studios</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onSelectView('sales-cockpit');
                        setShowSearch(false);
                      }}
                      className="p-3 bg-[#151422] hover:bg-[#1a192c] border border-[#252438] rounded-xl text-left transition-all flex items-center gap-3"
                    >
                      <Files className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-xs font-medium text-white">Call Cockpit</div>
                        <div className="text-[10px] text-zinc-500">Arabic Script HUD</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onSelectView('market-icp');
                        setShowSearch(false);
                      }}
                      className="p-3 bg-[#151422] hover:bg-[#1a192c] border border-[#252438] rounded-xl text-left transition-all flex items-center gap-3"
                    >
                      <HelpCircle className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-xs font-medium text-white">ICP Guardrails</div>
                        <div className="text-[10px] text-zinc-500">Grade A/B/C Criteria</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-[#1a1926] flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>Press [ESC] to dismiss</span>
              <span className="text-[var(--accent-purple)]">NYVEQ SOVEREIGN OS // GLOBAL SEARCH</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
