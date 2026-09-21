import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  Target,
  Sparkles,
  Flame,
  AlertOctagon,
  Check,
  Calendar,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';
import { AgencyTask, TaskStatus, ViewMode } from '../../types';

interface ProgressViewProps {
  onSelectView?: (view: ViewMode) => void;
  defaultTab?: 'all' | 'completed' | 'building' | 'next' | 'later' | 'decisions';
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  onSelectView,
  defaultTab = 'all',
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'building' | 'next' | 'later' | 'decisions'>(defaultTab);

  // Initial Section 19 tasks
  const defaultTasks: AgencyTask[] = [
    // COMPLETED
    { id: 'c-1', title: 'Company Name & Identity: NYVEQ', category: 'completed', completed: true },
    { id: 'c-2', title: 'Domain Secured: nyveq.com', category: 'completed', completed: true },
    { id: 'c-3', title: 'Public Platform V1 (Next.js Flagship Builds)', category: 'completed', completed: true },
    { id: 'c-4', title: 'Positioning: Digital systems for service businesses', category: 'completed', completed: true },
    { id: 'c-5', title: 'Niche V1: Interior Design & Turnkey Finishing Egypt', category: 'completed', completed: true },
    { id: 'c-6', title: 'ICP V1: Grade A/B/C Qualification Matrix', category: 'completed', completed: true },
    { id: 'c-7', title: 'Core Offer V1: NYVEQ Digital Presence System', category: 'completed', completed: true },
    { id: 'c-8', title: 'Sales Funnel V1: 11-Stage Operational Flow', category: 'completed', completed: true },
    { id: 'c-9', title: 'Cold Call Strategy: 30-Second Arabic Hook', category: 'completed', completed: true },
    { id: 'c-10', title: 'DM Strategy: 1-Observation Direct Message', category: 'completed', completed: true },
    { id: 'c-11', title: 'Demo Strategy: 60–90 Minute Concept Protocol', category: 'completed', completed: true },

    // IN PROGRESS
    { id: 'b-1', title: 'NYVEQ Agency HQ (Single Source of Truth Operating System)', category: 'building', completed: false },
    { id: 'b-2', title: 'Simple CRM (External Google Sheet with 18 Columns)', category: 'building', completed: false },
    { id: 'b-3', title: 'Prospect Database (15 Verified Egyptian Studios)', category: 'building', completed: false },

    // NEXT
    { id: 'n-1', title: 'Build first 15 qualified prospects list', category: 'next', completed: false },
    { id: 'n-2', title: 'Prospect research & note specific portfolio flaws', category: 'next', completed: false },
    { id: 'n-3', title: 'Execute first batch of cold calls', category: 'next', completed: false },
    { id: 'n-4', title: 'Send first batch of personalized DMs', category: 'next', completed: false },
    { id: 'n-5', title: 'Conduct first booked 15-minute diagnostic Zoom meeting', category: 'next', completed: false },
    { id: 'n-6', title: 'Build first 60–90 min custom concept demo', category: 'next', completed: false },
    { id: 'n-7', title: 'Present first bespoke monograph proposal in live split view', category: 'next', completed: false },
    { id: 'n-8', title: 'Close first paying client & collect 50% deposit', category: 'next', completed: false },

    // LATER (Section 19: Separate NOW from LATER)
    { id: 'l-1', title: 'n8n Workflow Automations & Webhooks', category: 'later', completed: false },
    { id: 'l-2', title: 'Advanced CRM Infrastructure (HubSpot / Salesforce)', category: 'later', completed: false },
    { id: 'l-3', title: 'Autonomous Multi-Agent AI Intake Concierge', category: 'later', completed: false },
    { id: 'l-4', title: 'Paid Meta & Google Client Acquisition Funnels', category: 'later', completed: false },
    { id: 'l-5', title: 'Team Hiring (Junior Technologists & Designers)', category: 'later', completed: false },
    { id: 'l-6', title: 'Interactive Client Construction Progress Portal', category: 'later', completed: false },
    { id: 'l-7', title: 'Advanced Business Analytics & Retention Cohorts', category: 'later', completed: false },
  ];

  const [tasks, setTasks] = useState<AgencyTask[]>(() => {
    const saved = localStorage.getItem('nyveq_agency_tasks_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultTasks;
      }
    }
    return defaultTasks;
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskStatus>('next');

  useEffect(() => {
    localStorage.setItem('nyveq_agency_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: AgencyTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed || t.category === 'completed').length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  // Section 22 Decision Log
  const decisionLog = [
    {
      date: 'Foundational',
      decision: 'Focus initial market strictly on Interior Design & Finishing companies in Egypt.',
      why: 'High visual assets, active Instagram, fragmented websites, accessible decision makers, high average contract margins ($150k+ / 7.5M+ EGP).',
      status: 'LOCKED',
    },
    {
      date: 'Foundational',
      decision: 'Sell Digital Presence System as entry offer.',
      why: 'Solves the primary trust and portfolio presentation bottleneck immediately; fast 21-day turnkey delivery with tangible value.',
      status: 'LOCKED',
    },
    {
      date: 'Foundational',
      decision: 'Do not lead with AI / Automation.',
      why: 'Unvalidated for local studios; solving digital presence and inquiry trust is step one. Never sell tools before solving the business problem.',
      status: 'LOCKED',
    },
    {
      date: 'Foundational',
      decision: 'Do not build full custom demos before prospect interest.',
      why: 'Cap demo production strictly at 60–90 minutes of concept work only after a 15-minute diagnostic confirmation.',
      status: 'LOCKED',
    },
    {
      date: 'Foundational',
      decision: 'Begin with cold calls + DMs.',
      why: 'Outbound direct sales provides immediate, unfiltered market feedback without burning cash on premature paid ads.',
      status: 'LOCKED',
    },
    {
      date: 'Foundational',
      decision: 'Do not automate before validating manually.',
      why: 'Premature optimization creates technical debt. Master manual closing and delivery for Client #01 first.',
      status: 'LOCKED',
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#1f1e2e] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12111c] border border-[#222135] text-[10px] font-mono text-purple-300 uppercase tracking-wider">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>EXECUTION MILESTONES &amp; ROADMAP // SECTION 19</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Progress, Decision Log &amp; Bottleneck
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Rigorous separation between what is COMPLETED, what is IN PROGRESS, what is NEXT, and what is LATER.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0d0c15] border border-[#1f1e2e]">
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">OVERALL TRACKER</div>
              <div className="text-base font-bold text-white font-mono">{progressPercent}%</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center font-mono text-xs font-bold text-purple-300">
              {completedCount}/{totalCount}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 20 & 21: BOTTLENECK & FOUNDER BRIEF HIGHLIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Bottleneck (Section 20) */}
        <div className="luxury-card p-6 rounded-2xl border-l-4 border-l-amber-500 space-y-3 bg-[#0d0c15] md:col-span-1">
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>SECTION 20 // CURRENT BOTTLENECK</span>
          </div>
          <h3 className="text-lg font-bold text-white">NO MARKET CONTACT YET</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Strategy exists. The next constraint is real conversations with qualified prospects. Action required:
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectView && onSelectView('sales-outreach')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-md cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>START OUTREACH</span>
            </button>
          </div>
        </div>

        {/* Founder Brief (Section 21) */}
        <div className="luxury-card p-6 rounded-2xl space-y-3 bg-[#0d0c15] md:col-span-2">
          <div className="flex items-center justify-between border-b border-[#1c1b28] pb-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">
              SECTION 21 // FOUNDER BRIEF
            </span>
            <span className="text-[10px] font-mono text-zinc-500">EXECUTIVE DIRECTIVE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">CURRENT MISSION</span>
              <p className="text-white font-medium">Acquire first paying client.</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">THIS WEEK</span>
              <p className="text-zinc-300">Build first qualified prospect list and begin outbound outreach.</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-purple-300 block mb-1">DECISION RULE</span>
              <p className="text-zinc-300">Do not make major strategic changes based on a handful of rejections.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 border-b border-[#1f1e2e] pb-3 overflow-x-auto custom-scrollbar">
        {[
          { id: 'all', label: 'All Milestones' },
          { id: 'completed', label: 'Completed (11)' },
          { id: 'building', label: 'In Progress (3)' },
          { id: 'next', label: 'Next / Actionable (8)' },
          { id: 'later', label: 'Later / Future (7)' },
          { id: 'decisions', label: 'Decision Log (Section 22)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wide transition-all shrink-0 ${
              activeFilter === tab.id
                ? 'bg-purple-600/20 text-purple-200 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#12111c]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RENDER DECISION LOG (EXECUTIVE CHRONICLE) */}
      {activeFilter === 'decisions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-8 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#181628] pb-4">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                  FOUNDER EXECUTIVE CHRONICLE // IMMUTABLE RECORD
                </span>
                <h3 className="text-xl font-serif text-white mt-1">
                  Permanent Strategic Decision Log
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">6 Core Decisions Locked</span>
            </div>

            {/* Executive Chronicle Entries */}
            <div className="divide-y divide-[#181628]">
              {decisionLog.map((item, idx) => (
                <article key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2 group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold text-purple-400">
                        DECISION 0{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        DATE: {item.date.toUpperCase()}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151324] text-zinc-300 border border-[#242138] uppercase self-start sm:self-auto font-medium">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight pt-1">
                    {item.decision}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-4xl">
                    <strong className="text-zinc-300 font-mono text-[11px]">Strategic Rationale: </strong>
                    {item.why}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RENDER TASKS GRID */}
      {activeFilter !== 'decisions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Quick Add Custom Task */}
          <form
            onSubmit={handleAddTask}
            className="p-4 rounded-2xl bg-[#0d0c15] border border-[#1f1e2e] flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="text"
              placeholder="Add custom task or operational checkpoint..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-[#12111c] border border-[#201f30] rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value as TaskStatus)}
              className="bg-[#12111c] border border-[#201f30] rounded-xl px-3 py-2 text-xs text-zinc-300 font-mono focus:outline-none"
            >
              <option value="next">Next</option>
              <option value="building">In Progress</option>
              <option value="completed">Completed</option>
              <option value="later">Later</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Tasks List */}
          <div className="space-y-2.5">
            {tasks
              .filter((t) => (activeFilter === 'all' ? true : t.category === activeFilter))
              .map((t) => {
                const isCompleted = t.completed || t.category === 'completed';
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer group ${
                      isCompleted
                        ? 'bg-[#0d0c15] border-[#1a1928] opacity-80'
                        : 'bg-[#11101a] border-[#222034] hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                            : 'border-zinc-600 group-hover:border-purple-400'
                        }`}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-xs sm:text-sm font-medium leading-snug ${
                            isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-200 group-hover:text-white'
                          }`}
                        >
                          {t.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                          t.category === 'completed'
                            ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40'
                            : t.category === 'building'
                            ? 'bg-blue-950/30 text-blue-300 border-blue-800/40'
                            : t.category === 'next'
                            ? 'bg-purple-950/30 text-purple-300 border-purple-800/40'
                            : 'bg-zinc-800/60 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {t.category}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(t.id);
                        }}
                        className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
