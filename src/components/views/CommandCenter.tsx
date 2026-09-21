import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Trophy,
  Users,
  Box,
  Zap,
  CheckCircle2,
  Clock,
  AlertOctagon,
  FileText,
  PhoneCall,
  Activity,
  AlertTriangle,
  Flame,
  Copy,
  Check,
  Search,
  Play,
  Edit2
} from 'lucide-react';
import {
  ViewMode,
  AgencyTask,
  FounderDailyMove,
  FocusSession,
  ShippedOutput,
  WeeklyReview
} from '../../types';
import { INITIAL_TASKS } from '../../data/companyData';
import { TEMPLATES_DATA } from '../../data/templatesData';
import {
  FOUNDER_STORAGE_KEYS,
  INITIAL_FOUNDER_ONE_MOVE,
  INITIAL_SHIPPED_OUTPUTS,
  INITIAL_FOCUS_SESSIONS,
  formatSecondsToDuration,
  getLocalDateString,
  readCrmMetrics,
  getTodayFocusSeconds,
  getTodayShippedOutputs,
  computeDaySignal,
  checkImbalanceObservation
} from '../../data/founderExecutionData';

interface CommandCenterProps {
  onSelectView: (view: ViewMode) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onSelectView }) => {
  const [tasks, setTasks] = useState<AgencyTask[]>(() => {
    const saved = localStorage.getItem('nyveq_agency_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [copiedPitch, setCopiedPitch] = useState(false);

  useEffect(() => {
    localStorage.setItem('nyveq_agency_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleCopyPitch = () => {
    const coldCall = TEMPLATES_DATA.find((t) => t.id === 't-cold-call-ar') || TEMPLATES_DATA[0];
    if (coldCall) {
      navigator.clipboard.writeText(coldCall.content);
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    }
  };

  // 1. ONE MOVE State
  const [oneMove, setOneMove] = useState<FounderDailyMove>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.ONE_MOVE);
    if (saved) {
      try {
        const parsed: FounderDailyMove = JSON.parse(saved);
        if (parsed.date === getLocalDateString()) return parsed;
      } catch (e) {}
    }
    return INITIAL_FOUNDER_ONE_MOVE;
  });

  const [isEditingOneMove, setIsEditingOneMove] = useState(false);
  const [oneMoveText, setOneMoveText] = useState(oneMove.text);

  useEffect(() => {
    localStorage.setItem(FOUNDER_STORAGE_KEYS.ONE_MOVE, JSON.stringify(oneMove));
  }, [oneMove]);

  const handleToggleOneMove = () => {
    setOneMove((prev) => ({
      ...prev,
      completed: !prev.completed,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSaveOneMove = () => {
    if (!oneMoveText.trim()) return;
    setOneMove((prev) => ({
      ...prev,
      text: oneMoveText.trim(),
      updatedAt: new Date().toISOString()
    }));
    setIsEditingOneMove(false);
  };

  // 2. Focus Sessions & Shipped Outputs State
  const [sessions] = useState<FocusSession[]>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.FOCUS_SESSIONS);
    return saved ? JSON.parse(saved) : INITIAL_FOCUS_SESSIONS;
  });

  const [shippedOutputs] = useState<ShippedOutput[]>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.SHIPPED_OUTPUTS);
    return saved ? JSON.parse(saved) : INITIAL_SHIPPED_OUTPUTS;
  });

  const [weeklyReviews] = useState<WeeklyReview[]>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.WEEKLY_REVIEWS);
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate live values
  const crmMetrics = readCrmMetrics();
  const todayFocusSeconds = getTodayFocusSeconds(sessions);
  const todayShipped = getTodayShippedOutputs(shippedOutputs);
  const daySignal = computeDaySignal(crmMetrics, todayFocusSeconds, todayShipped.length, sessions);
  const imbalanceObservation = checkImbalanceObservation(sessions);
  const currentOperatingChange =
    weeklyReviews[0]?.nextWeekOperatingChange || 'Revenue activity before optimization.';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. MASTER HERO BANNER (Image 2 Benchmark) */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between bg-[#0b0a12] border border-[#1d1c2b] rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[var(--accent-purple)] opacity-[0.08] rounded-full blur-[110px] pointer-events-none" />

        {/* Left Copy & Primary CTAs */}
        <div className="flex-1 p-8 md:p-10 space-y-6 relative z-10 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[10px] font-mono tracking-widest text-[var(--accent-purple)] uppercase font-semibold">
                CURRENT STAGE // MARKET VALIDATION
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.06]">
              Welcome to{' '}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9061f9] to-[#6366f1]">
                NYVEQ
              </span>
            </h1>
          </div>

          <p className="text-sm md:text-base text-zinc-200 font-medium max-w-xl leading-relaxed">
            Digital systems built around your business.
          </p>

          <p className="text-xs md:text-sm text-zinc-400 max-w-lg leading-relaxed -mt-3">
            Current priority: Build first 15 qualified prospects and begin outbound outreach.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectView('sales-outreach')}
              className="px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#8b5cf6] hover:to-[#7c3aed] text-white rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-950/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Start Outreach</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectView('crm-bridge')}
              className="px-6 py-3 bg-[#13121e] hover:bg-[#1a1928] border border-[#232133] text-zinc-300 hover:text-white rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Open CRM (15 Studios)</span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Right: Master Founder Cutout matching Image 2 */}
        <div className="lg:w-[46%] relative flex items-stretch justify-end overflow-hidden min-h-[260px] lg:min-h-[310px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a12] via-transparent to-transparent z-10 pointer-events-none hidden lg:block w-28" />
          <img
            src="/hero-founder.png"
            alt="Ahmed, Founder of NYVEQ"
            className="w-full h-full object-cover object-left-top relative z-0 filter brightness-95 contrast-105"
            onError={(e) => {
              e.currentTarget.src = '/command-center-ref.png';
            }}
          />
        </div>
      </div>

      {/* 2. ROW OF 5 EXECUTIVE STATE CARDS (Answers "Where are we?" in 10s) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Stage */}
        <div className="luxury-card p-5 rounded-2xl space-y-2.5 group hover:border-[var(--accent-purple)]/50 transition-colors">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
            <Target className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
            <span>CURRENT STAGE</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm truncate">Pre-Launch</div>
            <div className="text-xs text-zinc-400 mt-0.5 truncate">Market Validation</div>
          </div>
        </div>

        {/* Goal */}
        <div className="luxury-card p-5 rounded-2xl space-y-2.5 group hover:border-[var(--accent-purple)]/50 transition-colors">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>PRIMARY GOAL</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm truncate">First Paying Client</div>
            <div className="text-xs text-zinc-400 mt-0.5 truncate">Validate &amp; Scale</div>
          </div>
        </div>

        {/* Niche */}
        <div className="luxury-card p-5 rounded-2xl space-y-2.5 group hover:border-[var(--accent-purple)]/50 transition-colors">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>PRIMARY NICHE</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm truncate">Interior Design</div>
            <div className="text-xs text-zinc-400 mt-0.5 truncate">Egypt Studios &amp; Fit-out</div>
          </div>
        </div>

        {/* Offer */}
        <div className="luxury-card p-5 rounded-2xl space-y-2.5 group hover:border-[var(--accent-purple)]/50 transition-colors">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
            <Box className="w-3.5 h-3.5 text-purple-400" />
            <span>ACTIVE OFFER</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm truncate">Digital Presence</div>
            <div className="text-xs text-zinc-400 mt-0.5 truncate">Strategy + Web + Journey</div>
          </div>
        </div>

        {/* Bottleneck */}
        <div className="luxury-card p-5 rounded-2xl space-y-2.5 group border-amber-500/30 hover:border-amber-400/60 transition-colors bg-[#110f17]">
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 tracking-wider font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>BOTTLENECK</span>
          </div>
          <div>
            <div className="text-amber-200 font-semibold text-sm truncate">No Market Contact</div>
            <div className="text-xs text-zinc-400 mt-0.5 truncate">Action: Start Outreach</div>
          </div>
        </div>
      </div>

      {/* 3. TODAY EXECUTION LAYER (Section 2 - Prompt) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)] shadow-[0_0_8px_var(--accent-purple)]" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              TODAY EXECUTION LAYER
            </h2>
            <span className="text-zinc-600 font-mono text-xs">•</span>
            {/* Subtle Day Signal */}
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold flex items-center gap-1.5 ${
                daySignal === 'MOVING'
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                  : daySignal === 'AT RISK'
                  ? 'bg-amber-950/40 text-amber-400 border-amber-500/40'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  daySignal === 'MOVING'
                    ? 'bg-emerald-400 animate-pulse'
                    : daySignal === 'AT RISK'
                    ? 'bg-amber-400'
                    : 'bg-zinc-500'
                }`}
              />
              DAY SIGNAL: {daySignal}
            </span>
          </div>

          <button
            onClick={() => onSelectView('founder-execution')}
            className="text-xs font-mono text-purple-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Open Founder Execution Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle Imbalance Alert if triggered */}
        {imbalanceObservation && (
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Observation:</strong> {imbalanceObservation}
              </span>
            </div>
            <button
              onClick={() => onSelectView('crm-bridge')}
              className="text-[11px] font-mono text-amber-300 hover:text-white underline cursor-pointer shrink-0"
            >
              Shift to Market Contact →
            </button>
          </div>
        )}

        {/* 4 Execution Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1: ONE MOVE */}
          <div className="luxury-card p-5 rounded-2xl space-y-3 flex flex-col justify-between border border-[#232138] hover:border-purple-500/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/30 font-bold">
                  01 // ONE MOVE
                </span>
                {!isEditingOneMove && (
                  <button
                    onClick={() => {
                      setOneMoveText(oneMove.text);
                      setIsEditingOneMove(true);
                    }}
                    className="text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer"
                    title="Edit today's one move"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-zinc-400">
                Single highest-priority business move for today.
              </p>

              {isEditingOneMove ? (
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={3}
                    value={oneMoveText}
                    onChange={(e) => setOneMoveText(e.target.value)}
                    className="w-full p-2 bg-[#0e0d17] border border-[#26253a] rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setIsEditingOneMove(false)}
                      className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveOneMove}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold rounded-lg cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleToggleOneMove}
                  className="p-2.5 rounded-xl bg-[#0f0e1a] border border-[#1e1c2b] flex items-start gap-2.5 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border shrink-0 transition-colors ${
                      oneMove.completed
                        ? 'bg-[var(--accent-purple)] border-[var(--accent-purple)]'
                        : 'border-zinc-600 group-hover:border-[var(--accent-purple)]'
                    }`}
                  >
                    {oneMove.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <p
                    className={`text-xs leading-snug font-medium ${
                      oneMove.completed ? 'text-zinc-500 line-through' : 'text-zinc-100 group-hover:text-white'
                    }`}
                  >
                    {oneMove.text}
                  </p>
                </div>
              )}
            </div>

            <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-[#181726]">
              {oneMove.completed ? '✓ Completed today' : '• Pending execution'}
            </div>
          </div>

          {/* Pillar 2: MARKET CONTACT */}
          <div className="luxury-card p-5 rounded-2xl space-y-3 flex flex-col justify-between border border-[#232138] hover:border-emerald-500/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/30 font-bold">
                  02 // MARKET CONTACT
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {crmMetrics.totalLeads} Studios
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Single source of truth via 15 Studios CRM pipeline.
              </p>

              <div className="p-2.5 rounded-xl bg-[#0f0e1a] border border-[#1e1c2b] space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-200">
                  <span>Contacted</span>
                  <strong className="text-white">{crmMetrics.prospectsContacted}</strong>
                </div>
                <div className="flex items-center justify-between text-zinc-200">
                  <span>Conversations</span>
                  <strong className="text-blue-400">{crmMetrics.realConversations}</strong>
                </div>
                <div className="flex items-center justify-between text-zinc-200">
                  <span>Meetings Booked</span>
                  <strong className="text-amber-400">{crmMetrics.meetingsBooked}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectView('crm-bridge')}
              className="w-full py-2 bg-[#12111c] hover:bg-[#1b1928] border border-[#262438] text-zinc-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Open CRM</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* Pillar 3: DEEP WORK */}
          <div className="luxury-card p-5 rounded-2xl space-y-3 flex flex-col justify-between border border-[#232138] hover:border-purple-500/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/30 font-bold">
                  03 // DEEP WORK
                </span>
                <Clock className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-[11px] text-zinc-400">
                Today focused sprint duration.
              </p>

              <div className="p-3 rounded-xl bg-[#0f0e1a] border border-[#1e1c2b] text-center">
                <div className="text-3xl font-mono font-bold text-white tracking-tight">
                  {formatSecondsToDuration(todayFocusSeconds)}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  Across {sessions.filter((s) => s.date === getLocalDateString()).length} logged sprints
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectView('founder-execution')}
              className="w-full py-2 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#8b5cf6] hover:to-[#7c3aed] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-950/40 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>START FOCUS</span>
            </button>
          </div>

          {/* Pillar 4: SHIPPED */}
          <div className="luxury-card p-5 rounded-2xl space-y-3 flex flex-col justify-between border border-[#232138] hover:border-amber-500/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/30 font-bold">
                  04 // SHIPPED
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  {todayShipped.length} today
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Meaningful outputs completed today.
              </p>

              <div className="space-y-1.5">
                {todayShipped.length === 0 ? (
                  <div className="p-3 rounded-xl bg-[#0f0e1a] border border-[#1e1c2b] text-center text-xs text-zinc-500">
                    No outputs shipped today yet.
                  </div>
                ) : (
                  todayShipped.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-lg bg-[#0f0e1a] border border-[#1e1c2b] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-zinc-200 truncate font-medium">
                        {item.title}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectView('founder-execution')}
              className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer py-1"
            >
              <span>View Shipped Log →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. EXECUTION TRIAD: Completed Foundations | Operating Change | Mountain Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Completed Foundations */}
        <div className="luxury-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Completed Foundations
            </h3>
            <button
              onClick={() => onSelectView('progress-completed')}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Company identity: NYVEQ & nyveq.com', date: 'Valid' },
              { title: 'Public digital presence & Next.js flagship', date: 'Valid' },
              { title: 'Positioning & Interior Design ICP V1', date: 'Valid' },
              { title: 'Digital Presence System 3-tier architecture', date: 'Valid' },
              { title: 'Cold Call & DM 4-Angle Arabic Script Suite', date: 'Valid' },
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-zinc-300 text-xs truncate">{task.title}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold shrink-0">
                  {task.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Strategic Operating Anchor (From Weekly Review) */}
        <div className="luxury-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[var(--accent-purple)]" />
                Strategic Operating Anchor
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/50 text-purple-300 border border-purple-800/40 font-bold">
                WEEK RULE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#11101a] border border-[#211f32] space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                LOCKED OPERATING CHANGE
              </p>
              <p className="text-xs md:text-sm text-white font-medium italic leading-relaxed">
                "{currentOperatingChange}"
              </p>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong>Rule 01:</strong> Revenue activity before optimization. Direct outreach to interior ateliers must execute before touching code.
            </p>
          </div>

          <button
            onClick={() => onSelectView('founder-execution')}
            className="w-full py-2 bg-[#12111c] hover:bg-[#1a1928] border border-[#232133] text-purple-300 hover:text-white rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Review Operating Rules &amp; Weekly Calibrations →</span>
          </button>
        </div>

        {/* Card 3: Mountain Quote Card matching Image 2 */}
        <div className="luxury-card rounded-2xl relative overflow-hidden flex flex-col justify-end p-6 group min-h-[220px] border border-[var(--border-subtle)]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('/mountain-card.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="w-8 h-[3px] bg-[var(--accent-purple)] rounded-full mb-2" />
            <p className="font-serif text-base md:text-lg italic text-zinc-100 leading-snug drop-shadow-md">
              “A focused agency does extraordinary things.”
            </p>
            <div>
              <p className="text-[10px] font-mono tracking-widest text-zinc-200 uppercase font-semibold">
                AHMED
              </p>
              <p className="text-[9px] font-mono tracking-widest text-purple-300 uppercase">
                FOUNDER, NYVEQ
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400">
              Axiom: Start with the business problem, not the tool.
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTION & STRATEGIC FOUNDATIONS LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Founder Brief (Section 21) */}
        <div className="luxury-card p-6 rounded-2xl space-y-5 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Founder Brief
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">EXECUTIVE</span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-mono text-zinc-500 tracking-wider mb-1">
                CURRENT MISSION
              </p>
              <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                Acquire first paying client &amp; validate Digital Presence System.
              </p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-zinc-500 tracking-wider mb-1">THIS WEEK</p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Build the first qualified prospect list and begin outbound outreach.
              </p>
            </div>

            <div className="p-3 bg-red-950/25 border border-red-900/40 rounded-xl space-y-1">
              <p className="text-[10px] font-mono text-red-400 tracking-wider flex items-center gap-1.5 font-bold">
                <AlertOctagon className="w-3.5 h-3.5" /> DO NOT DO
              </p>
              <ul className="text-[11px] text-zinc-300 space-y-0.5 list-disc list-inside">
                <li>Change niche</li>
                <li>Add unnecessary services</li>
                <li>Build automation prematurely</li>
                <li>Redesign the brand again</li>
              </ul>
            </div>

            <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-xl">
              <p className="text-[10px] font-mono text-purple-300 tracking-wider mb-1 font-semibold">
                DECISION RULE
              </p>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Do not make major strategic changes based on a handful of rejections.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Decisions (Section 8 & 22) */}
        <div className="space-y-6 lg:col-span-2 flex flex-col justify-between">
          {/* Quick Operating Actions */}
          <div className="luxury-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <p className="text-xs font-semibold text-white tracking-wide">
                OPERATIONAL DRILLS &amp; ACTIONS
              </p>
              <span className="text-[10px] font-mono text-zinc-500">READY</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <button
                onClick={() => onSelectView('crm-bridge')}
                className="p-3.5 bg-[#12111c] border border-[#201f30] rounded-xl text-left hover:border-[var(--accent-purple)] transition-all group cursor-pointer"
              >
                <Target className="w-4 h-4 text-emerald-400 group-hover:text-white mb-2" />
                <div className="text-xs text-white font-medium">Open CRM</div>
                <div className="text-[10px] text-zinc-500">15 Studios</div>
              </button>

              <button
                onClick={() => onSelectView('market-research')}
                className="p-3.5 bg-[#12111c] border border-[#201f30] rounded-xl text-left hover:border-[var(--accent-purple)] transition-all group cursor-pointer"
              >
                <Search className="w-4 h-4 text-blue-400 group-hover:text-white mb-2" />
                <div className="text-xs text-white font-medium">Research Lead</div>
                <div className="text-[10px] text-zinc-500">5-Min Check</div>
              </button>

              <button
                onClick={handleCopyPitch}
                className="p-3.5 bg-[#12111c] border border-[#201f30] rounded-xl text-left hover:border-[var(--accent-purple)] transition-all group cursor-pointer"
              >
                {copiedPitch ? (
                  <Check className="w-4 h-4 text-emerald-400 mb-2" />
                ) : (
                  <Copy className="w-4 h-4 text-amber-400 group-hover:text-white mb-2" />
                )}
                <div className="text-xs text-white font-medium">
                  {copiedPitch ? 'Copied!' : 'Copy Pitch'}
                </div>
                <div className="text-[10px] text-zinc-500">30s Script</div>
              </button>

              <button
                onClick={() => onSelectView('proposals-builder')}
                className="p-3.5 bg-[#12111c] border border-[#201f30] rounded-xl text-left hover:border-[var(--accent-purple)] transition-all group cursor-pointer"
              >
                <FileText className="w-4 h-4 text-purple-400 group-hover:text-white mb-2" />
                <div className="text-xs text-white font-medium">Create Proposal</div>
                <div className="text-[10px] text-zinc-500">Live Monograph</div>
              </button>

              <button
                onClick={() => onSelectView('market-icp')}
                className="p-3.5 bg-[#12111c] border border-[#201f30] rounded-xl text-left hover:border-[var(--accent-purple)] transition-all group cursor-pointer"
              >
                <Users className="w-4 h-4 text-zinc-400 group-hover:text-white mb-2" />
                <div className="text-xs text-white font-medium">Review ICP</div>
                <div className="text-[10px] text-zinc-500">Grade A/B/C</div>
              </button>
            </div>
          </div>

          {/* Decision Log (Section 22) */}
          <div className="luxury-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--accent-purple)]" />
                Recent Strategic Decisions (Single Source of Truth)
              </h3>
              <button
                onClick={() => onSelectView('progress-decision-log')}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
              >
                View Log →
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  decision: 'Focus initial market on Interior Design & Finishing (New Cairo/Zayed).',
                  why: 'High visual assets, active Instagram, fragmented websites, accessible decision makers.',
                  status: 'LOCKED',
                },
                {
                  decision: 'Sell Digital Presence System as entry offer.',
                  why: 'Direct solution to fragmented portfolios; fast to build and deliver with tangible trust.',
                  status: 'LOCKED',
                },
                {
                  decision: 'Do not lead with AI / Automation.',
                  why: 'Unvalidated for local studios; solving presentation and inquiry trust is step one.',
                  status: 'LOCKED',
                },
                {
                  decision: 'Do not build full custom demos before prospect interest.',
                  why: 'Cap demo time to 60–90 min concept only after diagnostic qualification.',
                  status: 'LOCKED',
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 p-3 rounded-xl bg-[#11101a] border border-[#1b1928] text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-zinc-200 font-medium">{log.decision}</p>
                    <p className="text-[11px] text-zinc-500">{log.why}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 font-bold shrink-0">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
