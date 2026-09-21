import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  AlertTriangle,
  ArrowRight,
  Plus,
  Trash2,
  Calendar,
  Building2,
  FileText,
  RotateCcw,
  Check,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  X
} from 'lucide-react';
import {
  ViewMode,
  FocusArea,
  FocusResult,
  FocusSession,
  ShippedOutput,
  WeeklyReview,
  FounderDailyMove,
  DaySignalStatus
} from '../../types';
import {
  FOUNDER_STORAGE_KEYS,
  FOUNDER_OPERATING_RULES,
  FOCUS_AREAS,
  INITIAL_FOUNDER_ONE_MOVE,
  INITIAL_SHIPPED_OUTPUTS,
  INITIAL_FOCUS_SESSIONS,
  formatSecondsToDuration,
  formatSecondsToDigital,
  getLocalDateString,
  getWeekRange,
  readCrmMetrics,
  getTodayFocusSeconds,
  getThisWeekFocusSeconds,
  getTodayShippedOutputs,
  getThisWeekShippedOutputs,
  computeDaySignal,
  checkImbalanceObservation
} from '../../data/founderExecutionData';

interface FounderExecutionViewProps {
  onSelectView?: (view: ViewMode) => void;
  defaultSection?: 'focus' | 'outputs' | 'this-week' | 'weekly-review' | 'operating-rules';
}

interface ActiveTimerState {
  isActive: boolean;
  isPaused: boolean;
  task: string;
  area: FocusArea;
  note: string;
  startTime: string; // ISO
  elapsedSeconds: number;
}

export const FounderExecutionView: React.FC<FounderExecutionViewProps> = ({
  onSelectView,
  defaultSection = 'focus'
}) => {
  const [activeTab, setActiveTab] = useState<'focus' | 'outputs' | 'this-week' | 'weekly-review' | 'operating-rules'>(defaultSection);

  // 1. One Move State
  const [oneMove, setOneMove] = useState<FounderDailyMove>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.ONE_MOVE);
    if (saved) {
      try {
        const parsed: FounderDailyMove = JSON.parse(saved);
        if (parsed.date === getLocalDateString()) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_FOUNDER_ONE_MOVE;
  });

  const [isEditingOneMove, setIsEditingOneMove] = useState(false);
  const [oneMoveDraft, setOneMoveDraft] = useState(oneMove.text);

  useEffect(() => {
    localStorage.setItem(FOUNDER_STORAGE_KEYS.ONE_MOVE, JSON.stringify(oneMove));
  }, [oneMove]);

  const handleSaveOneMove = () => {
    if (!oneMoveDraft.trim()) return;
    setOneMove((prev) => ({
      ...prev,
      text: oneMoveDraft.trim(),
      updatedAt: new Date().toISOString()
    }));
    setIsEditingOneMove(false);
  };

  // 2. Focus Sessions State
  const [sessions, setSessions] = useState<FocusSession[]>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.FOCUS_SESSIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_FOCUS_SESSIONS;
  });

  useEffect(() => {
    localStorage.setItem(FOUNDER_STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  // 3. Shipped Outputs State
  const [shippedOutputs, setShippedOutputs] = useState<ShippedOutput[]>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.SHIPPED_OUTPUTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_SHIPPED_OUTPUTS;
  });

  useEffect(() => {
    localStorage.setItem(FOUNDER_STORAGE_KEYS.SHIPPED_OUTPUTS, JSON.stringify(shippedOutputs));
  }, [shippedOutputs]);

  // 4. Weekly Reviews State
  const [weeklyReviews, setWeeklyReviews] = useState<WeeklyReview[]>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.WEEKLY_REVIEWS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(FOUNDER_STORAGE_KEYS.WEEKLY_REVIEWS, JSON.stringify(weeklyReviews));
  }, [weeklyReviews]);

  // 5. Active Focus Timer State (Persistent across navigation)
  const [timerState, setTimerState] = useState<ActiveTimerState>(() => {
    const saved = localStorage.getItem(FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isActive) {
          // calculate elapsed if was running
          if (!parsed.isPaused && parsed.lastTimestamp) {
            const extra = Math.floor((Date.now() - parsed.lastTimestamp) / 1000);
            return {
              ...parsed,
              elapsedSeconds: parsed.elapsedSeconds + Math.max(0, extra)
            };
          }
          return parsed;
        }
      } catch (e) {}
    }
    return {
      isActive: false,
      isPaused: false,
      task: '',
      area: 'Sales',
      note: '',
      startTime: '',
      elapsedSeconds: 0
    };
  });

  // Timer Interval Tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerState.isActive && !timerState.isPaused) {
      interval = setInterval(() => {
        setTimerState((prev) => {
          const next = {
            ...prev,
            elapsedSeconds: prev.elapsedSeconds + 1
          };
          localStorage.setItem(
            FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER,
            JSON.stringify({ ...next, lastTimestamp: Date.now() })
          );
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isActive, timerState.isPaused]);

  // Pre-Start Timer Inputs
  const [inputTask, setInputTask] = useState('');
  const [inputArea, setInputArea] = useState<FocusArea>('Sales');
  const [inputNote, setInputNote] = useState('');

  // Finish Session Modal State
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [finishWhatCompleted, setFinishWhatCompleted] = useState('');
  const [finishResult, setFinishResult] = useState<FocusResult>('Completed');
  const [finishNote, setFinishNote] = useState('');
  const [alsoShipOutput, setAlsoShipOutput] = useState(true);

  // New Shipped Output Modal / Inline
  const [showAddOutputModal, setShowAddOutputModal] = useState(false);
  const [outputTitle, setOutputTitle] = useState('');
  const [outputArea, setOutputArea] = useState<FocusArea>('Sales');
  const [outputDate, setOutputDate] = useState(getLocalDateString());
  const [outputClient, setOutputClient] = useState('');
  const [outputNote, setOutputNote] = useState('');

  // Weekly Review Form Inputs
  const [revQ1, setRevQ1] = useState('');
  const [revQ2, setRevQ2] = useState('');
  const [revQ3, setRevQ3] = useState('');
  const [revQ4, setRevQ4] = useState('');
  const [revNextOperatingChange, setRevNextOperatingChange] = useState('');
  const [revSavedNotice, setRevSavedNotice] = useState(false);

  // Derived Metrics & Single Source of Truth
  const crmMetrics = readCrmMetrics();
  const todayFocusSeconds = getTodayFocusSeconds(sessions) + (timerState.isActive ? timerState.elapsedSeconds : 0);
  const thisWeekFocusSeconds = getThisWeekFocusSeconds(sessions) + (timerState.isActive ? timerState.elapsedSeconds : 0);
  const todayShipped = getTodayShippedOutputs(shippedOutputs);
  const thisWeekShipped = getThisWeekShippedOutputs(shippedOutputs);
  const daySignal = computeDaySignal(crmMetrics, todayFocusSeconds, todayShipped.length, sessions);
  const imbalanceObservation = checkImbalanceObservation(sessions);

  // Latest Operating Change from previous weekly review
  const latestWeeklyReview = weeklyReviews.length > 0 ? weeklyReviews[0] : null;
  const currentOperatingChange = latestWeeklyReview?.nextWeekOperatingChange || 'Revenue activity before optimization.';

  // Handlers for Focus Timer
  const handleStartTimer = () => {
    if (!inputTask.trim()) return;
    const newState: ActiveTimerState = {
      isActive: true,
      isPaused: false,
      task: inputTask.trim(),
      area: inputArea,
      note: inputNote.trim(),
      startTime: new Date().toISOString(),
      elapsedSeconds: 0
    };
    setTimerState(newState);
    localStorage.setItem(
      FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER,
      JSON.stringify({ ...newState, lastTimestamp: Date.now() })
    );
  };

  const handlePauseTimer = () => {
    setTimerState((prev) => {
      const next = { ...prev, isPaused: true };
      localStorage.setItem(
        FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER,
        JSON.stringify({ ...next, lastTimestamp: Date.now() })
      );
      return next;
    });
  };

  const handleResumeTimer = () => {
    setTimerState((prev) => {
      const next = { ...prev, isPaused: false };
      localStorage.setItem(
        FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER,
        JSON.stringify({ ...next, lastTimestamp: Date.now() })
      );
      return next;
    });
  };

  const handleOpenFinishModal = () => {
    handlePauseTimer();
    setFinishWhatCompleted('');
    setFinishResult('Completed');
    setFinishNote(timerState.note);
    setAlsoShipOutput(true);
    setShowFinishModal(true);
  };

  const handleConfirmFinishSession = () => {
    const finalDuration = timerState.elapsedSeconds;
    const newSession: FocusSession = {
      id: `ses-${Date.now()}`,
      task: timerState.task,
      area: timerState.area,
      startTime: timerState.startTime,
      endTime: new Date().toISOString(),
      durationSeconds: Math.max(finalDuration, 1),
      result: finishResult,
      completedOutput: finishWhatCompleted.trim() || undefined,
      note: finishNote.trim() || undefined,
      date: getLocalDateString()
    };

    setSessions((prev) => [newSession, ...prev]);

    // If marked Completed and alsoShipOutput is checked with tangible output text
    if (alsoShipOutput && finishWhatCompleted.trim() && finishResult === 'Completed') {
      const newOutput: ShippedOutput = {
        id: `out-${Date.now()}`,
        title: finishWhatCompleted.trim(),
        area: timerState.area,
        date: getLocalDateString(),
        note: `Generated during focus sprint: "${timerState.task}"`,
        focusSessionId: newSession.id,
        createdAt: new Date().toISOString()
      };
      setShippedOutputs((prev) => [newOutput, ...prev]);
    }

    // Reset timer
    const resetState: ActiveTimerState = {
      isActive: false,
      isPaused: false,
      task: '',
      area: 'Sales',
      note: '',
      startTime: '',
      elapsedSeconds: 0
    };
    setTimerState(resetState);
    localStorage.removeItem(FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER);
    setShowFinishModal(false);
    setInputTask('');
    setInputNote('');
  };

  const handleDiscardTimer = () => {
    if (confirm('Discard current focus sprint without saving?')) {
      const resetState: ActiveTimerState = {
        isActive: false,
        isPaused: false,
        task: '',
        area: 'Sales',
        note: '',
        startTime: '',
        elapsedSeconds: 0
      };
      setTimerState(resetState);
      localStorage.removeItem(FOUNDER_STORAGE_KEYS.ACTIVE_FOCUS_TIMER);
      setShowFinishModal(false);
    }
  };

  // Handlers for Outputs
  const handleCreateOutput = () => {
    if (!outputTitle.trim()) return;
    const newOutput: ShippedOutput = {
      id: `out-${Date.now()}`,
      title: outputTitle.trim(),
      area: outputArea,
      date: outputDate || getLocalDateString(),
      linkedClientOrProject: outputClient.trim() || undefined,
      note: outputNote.trim() || undefined,
      createdAt: new Date().toISOString()
    };
    setShippedOutputs((prev) => [newOutput, ...prev]);
    setOutputTitle('');
    setOutputClient('');
    setOutputNote('');
    setShowAddOutputModal(false);
  };

  const handleDeleteOutput = (id: string) => {
    if (confirm('Delete this output from log?')) {
      setShippedOutputs((prev) => prev.filter((o) => o.id !== id));
    }
  };

  // Handlers for Weekly Review
  const handleSubmitWeeklyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revNextOperatingChange.trim()) {
      alert("Please specify 'NEXT WEEK'S OPERATING CHANGE' before submitting.");
      return;
    }

    const { start, end } = getWeekRange();
    const newReview: WeeklyReview = {
      id: `rev-${Date.now()}`,
      weekStartDate: start,
      weekEndDate: end,
      statsSnapshot: {
        focusHours: parseFloat((thisWeekFocusSeconds / 3600).toFixed(1)),
        focusSessionsCount: sessions.filter((s) => s.date >= start && s.date <= end).length,
        shippedOutputsCount: thisWeekShipped.length,
        prospectsContacted: crmMetrics.prospectsContacted,
        realConversations: crmMetrics.realConversations,
        meetingsBooked: crmMetrics.meetingsBooked,
        proposalsSent: crmMetrics.proposalsSent,
        dealsWon: crmMetrics.dealsWon
      },
      q1Results: revQ1.trim(),
      q2WastedTime: revQ2.trim(),
      q3AvoidedPriority: revQ3.trim(),
      q4OneChange: revQ4.trim(),
      nextWeekOperatingChange: revNextOperatingChange.trim(),
      createdAt: new Date().toISOString()
    };

    setWeeklyReviews((prev) => [newReview, ...prev]);
    setRevSavedNotice(true);
    setTimeout(() => setRevSavedNotice(false), 3000);
    setRevQ1('');
    setRevQ2('');
    setRevQ3('');
    setRevQ4('');
    setRevNextOperatingChange('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP HEADER & COCKPIT CONTEXT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1d1c2b] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)] shadow-[0_0_8px_var(--accent-purple)]" />
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
              EXECUTIVE INSTRUMENT PANEL
            </span>
            <span className="text-zinc-600 font-mono text-xs">•</span>
            {/* Day Signal Badge (Subtle) */}
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
              SIGNAL: {daySignal}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Founder <span className="font-semibold text-[var(--accent-purple)]">Execution</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Brutal clarity on whether the founder actually executed the work or merely stayed busy.
          </p>
        </div>

        {/* Operating Change Anchor (Inherited from last Weekly Review) */}
        <div className="bg-[#0f0e18] border border-[#242338] rounded-2xl p-3.5 max-w-md">
          <div className="text-[9px] font-mono text-[var(--accent-purple)] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Target className="w-3 h-3" />
            CURRENT OPERATING CHANGE
          </div>
          <p className="text-xs text-zinc-200 mt-1 font-medium italic">
            "{currentOperatingChange}"
          </p>
        </div>
      </div>

      {/* Subtle Imbalance Alert if triggered */}
      {imbalanceObservation && (
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Observation:</strong> {imbalanceObservation}
            </span>
          </div>
          {onSelectView && (
            <button
              onClick={() => onSelectView('crm-bridge')}
              className="text-[11px] font-mono text-amber-300 hover:text-white underline underline-offset-2 shrink-0 cursor-pointer"
            >
              Shift to Outreach →
            </button>
          )}
        </div>
      )}

      {/* 2. THE 5 CLEAN TOP-LEVEL TABS */}
      <div className="flex items-center gap-2 border-b border-[#181726] pb-1 overflow-x-auto custom-scrollbar">
        {[
          { id: 'focus', label: 'FOCUS', badge: timerState.isActive ? 'ACTIVE' : undefined },
          { id: 'outputs', label: 'OUTPUTS', badge: `${todayShipped.length} today` },
          { id: 'this-week', label: 'THIS WEEK' },
          { id: 'weekly-review', label: 'WEEKLY REVIEW' },
          { id: 'operating-rules', label: 'OPERATING RULES' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#181628] text-white border border-purple-500/40 shadow-sm shadow-purple-950/40'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#11101b]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                    tab.badge === 'ACTIVE'
                      ? 'bg-purple-600 text-white animate-pulse'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT SECTIONS */}

      {/* ======================================================== */}
      {/* SECTION 1: FOCUS (Deep Work Timer & Session Logger) */}
      {/* ======================================================== */}
      {activeTab === 'focus' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Active Timer Card */}
          <div className="luxury-card p-8 rounded-3xl relative overflow-hidden border border-[#27263d]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-purple)] opacity-[0.05] rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Details */}
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      timerState.isActive
                        ? timerState.isPaused
                          ? 'bg-amber-400'
                          : 'bg-emerald-400 animate-ping'
                        : 'bg-zinc-600'
                    }`}
                  />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                    {timerState.isActive
                      ? timerState.isPaused
                        ? 'SPRINT PAUSED'
                        : 'SPRINT IN PROGRESS'
                      : 'STANDBY // READY FOR FOCUSED SPRINT'}
                  </span>
                </div>

                {timerState.isActive ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {timerState.task}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-700/40">
                        {timerState.area}
                      </span>
                    </div>
                    {timerState.note && (
                      <p className="text-xs text-zinc-400 italic">"{timerState.note}"</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 max-w-xl">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                        SPRINT TASK / WHAT ARE YOU EXECUTING? *
                      </label>
                      <input
                        type="text"
                        value={inputTask}
                        onChange={(e) => setInputTask(e.target.value)}
                        placeholder="e.g. Call 5 New Cairo studios using Angle A (Flaw Hook)"
                        className="w-full px-4 py-2.5 bg-[#0e0d17] border border-[#222035] rounded-xl text-sm text-white focus:outline-none focus:border-[var(--accent-purple)]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                          FOCUS AREA
                        </label>
                        <select
                          value={inputArea}
                          onChange={(e) => setInputArea(e.target.value as FocusArea)}
                          className="w-full px-3 py-2 bg-[#0e0d17] border border-[#222035] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-[var(--accent-purple)]"
                        >
                          {FOCUS_AREAS.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                          OPTIONAL SHORT NOTE
                        </label>
                        <input
                          type="text"
                          value={inputNote}
                          onChange={(e) => setInputNote(e.target.value)}
                          placeholder="Specific target or constraint"
                          className="w-full px-3 py-2 bg-[#0e0d17] border border-[#222035] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-[var(--accent-purple)]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Stopwatch & Controls */}
              <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
                <div className="font-mono text-5xl md:text-6xl font-light tracking-tight text-white select-none">
                  {formatSecondsToDigital(timerState.elapsedSeconds)}
                </div>

                <div className="flex items-center gap-3">
                  {!timerState.isActive ? (
                    <button
                      onClick={handleStartTimer}
                      disabled={!inputTask.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#8b5cf6] hover:to-[#7c3aed] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-950/50 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>START FOCUS</span>
                    </button>
                  ) : (
                    <>
                      {timerState.isPaused ? (
                        <button
                          onClick={handleResumeTimer}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume</span>
                        </button>
                      ) : (
                        <button
                          onClick={handlePauseTimer}
                          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause</span>
                        </button>
                      )}

                      <button
                        onClick={handleOpenFinishModal}
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Finish &amp; Log</span>
                      </button>

                      <button
                        onClick={handleDiscardTimer}
                        title="Discard sprint"
                        className="p-2.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Work Summary Metric Cards (Section 5) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="luxury-card p-5 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>TODAY FOCUSED TIME</span>
              </div>
              <div className="text-2xl font-semibold text-white font-mono">
                {formatSecondsToDuration(todayFocusSeconds)}
              </div>
              <div className="text-[11px] text-zinc-400">
                Across {sessions.filter((s) => s.date === getLocalDateString()).length} logged sessions
              </div>
            </div>

            <div className="luxury-card p-5 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>THIS WEEK FOCUSED TIME</span>
              </div>
              <div className="text-2xl font-semibold text-white font-mono">
                {formatSecondsToDuration(thisWeekFocusSeconds)}
              </div>
              <div className="text-[11px] text-zinc-400">
                Mon – Sun current operating cycle
              </div>
            </div>

            <div className="luxury-card p-5 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>TOTAL SESSIONS</span>
              </div>
              <div className="text-2xl font-semibold text-white font-mono">
                {sessions.length}
              </div>
              <div className="text-[11px] text-zinc-400">
                Focus sprints recorded in system
              </div>
            </div>
          </div>

          {/* Recent Focus Sessions Log */}
          <div className="luxury-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f1e2e] pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--accent-purple)]" />
                Focus Sessions Log
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">
                {sessions.length} recorded
              </span>
            </div>

            {sessions.length === 0 ? (
              <p className="text-xs text-zinc-500 py-4 text-center">
                No focus sessions logged yet. Start a sprint above to measure deep work.
              </p>
            ) : (
              <div className="space-y-3">
                {sessions.slice(0, 8).map((ses) => (
                  <div
                    key={ses.id}
                    className="p-3.5 rounded-xl bg-[#0e0d17] border border-[#1e1c2c] flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-white">
                          {ses.task}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161524] text-purple-300 border border-purple-800/30">
                          {ses.area}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                            ses.result === 'Completed'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/30'
                              : ses.result === 'Meaningful Progress'
                              ? 'bg-blue-950/60 text-blue-300 border border-blue-800/30'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {ses.result}
                        </span>
                      </div>
                      {ses.completedOutput && (
                        <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                          <Check className="w-3 h-3" />
                          Output: {ses.completedOutput}
                        </p>
                      )}
                      {ses.note && (
                        <p className="text-[11px] text-zinc-500 italic">
                          Note: {ses.note}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-right shrink-0">
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">
                          {formatSecondsToDuration(ses.durationSeconds)}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500">
                          {ses.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: OUTPUTS (Shipped Artifacts Log) */}
      {/* ======================================================== */}
      {activeTab === 'outputs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Shipped Outputs Log</h2>
              <p className="text-xs text-zinc-400">
                Only tangible deliverables completed, sent, delivered, published, or ready.
              </p>
            </div>

            <button
              onClick={() => setShowAddOutputModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Shipped Output</span>
            </button>
          </div>

          {/* Valid vs Invalid Guideline Banner (Section 6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0f0e1a] border border-[#201f30]">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VALID OUTPUTS (TANGIBLE ARTIFACTS)
              </span>
              <p className="text-[11px] text-zinc-300">
                "Cold Call Playbook finalized", "5 prospect demos completed", "Proposal sent to Eklego", "Client site launched", "15 qualified prospects research completed".
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> INVALID (REJECTED AS OUTPUTS)
              </span>
              <p className="text-[11px] text-zinc-400">
                "Worked on pricing", "Researched sales", "Learned cold calling", "Thought about offer", "Organized desk".
              </p>
            </div>
          </div>

          {/* Shipped Outputs List */}
          <div className="luxury-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f1e2e] pb-3">
              <h3 className="text-sm font-semibold text-white">
                Shipped Log ({shippedOutputs.length})
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">
                Sorted by latest
              </span>
            </div>

            {shippedOutputs.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No outputs shipped yet. Log your first tangible business deliverable above.
              </div>
            ) : (
              <div className="space-y-3">
                {shippedOutputs.map((out) => (
                  <div
                    key={out.id}
                    className="p-4 rounded-xl bg-[#0e0d17] border border-[#1e1c2c] flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:border-purple-500/30 transition-all"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-white">
                          {out.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/30">
                          {out.area}
                        </span>
                        {out.linkedClientOrProject && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161524] text-zinc-400">
                            {out.linkedClientOrProject}
                          </span>
                        )}
                      </div>
                      {out.note && (
                        <p className="text-xs text-zinc-400">{out.note}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-right shrink-0">
                      <span className="text-[11px] font-mono text-zinc-500">
                        {out.date}
                      </span>
                      <button
                        onClick={() => handleDeleteOutput(out.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 transition-all cursor-pointer"
                        title="Delete output"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 3: THIS WEEK (Aggregated Weekly Execution) */}
      {/* ======================================================== */}
      {activeTab === 'this-week' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-semibold text-white">This Week's Operating Ledger</h2>
            <p className="text-xs text-zinc-400">
              Direct comparison between founder deep work execution and market outcomes (CRM).
            </p>
          </div>

          {/* Core 3 Execution Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="luxury-card p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-purple-400 tracking-wider font-semibold">
                DEEP WORK HOURS
              </span>
              <div className="text-3xl font-mono font-semibold text-white">
                {formatSecondsToDuration(thisWeekFocusSeconds)}
              </div>
              <p className="text-xs text-zinc-400">
                Focused sprint time logged Mon – Sun
              </p>
            </div>

            <div className="luxury-card p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-blue-400 tracking-wider font-semibold">
                FOCUS SESSIONS
              </span>
              <div className="text-3xl font-mono font-semibold text-white">
                {sessions.filter((s) => {
                  const { start, end } = getWeekRange();
                  return s.date >= start && s.date <= end;
                }).length}
              </div>
              <p className="text-xs text-zinc-400">
                Dedicated sprints without distraction
              </p>
            </div>

            <div className="luxury-card p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 tracking-wider font-semibold">
                OUTPUTS SHIPPED
              </span>
              <div className="text-3xl font-mono font-semibold text-white">
                {thisWeekShipped.length}
              </div>
              <p className="text-xs text-zinc-400">
                Verified tangible business artifacts
              </p>
            </div>
          </div>

          {/* CRM Derived Metrics (Read-only single source of truth — Section 7) */}
          <div className="luxury-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f1e2e] pb-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Market Outcomes (CRM Single Source of Truth)
                </h3>
                <p className="text-xs text-zinc-400">
                  Read directly from the 15 Studios CRM pipeline. No duplicate sales entry.
                </p>
              </div>

              {onSelectView && (
                <button
                  onClick={() => onSelectView('crm-bridge')}
                  className="px-3 py-1.5 bg-[#171626] hover:bg-[#201f35] border border-purple-500/30 text-xs font-mono text-purple-300 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <span>Open CRM</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#0f0e18] border border-[#1e1c2b] text-center">
                <span className="text-[10px] font-mono text-zinc-500 block">PROSPECTS CONTACTED</span>
                <span className="text-xl font-mono font-bold text-white mt-1 block">
                  {crmMetrics.prospectsContacted}
                </span>
                <span className="text-[10px] text-zinc-500">Outreach executed</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0f0e18] border border-[#1e1c2b] text-center">
                <span className="text-[10px] font-mono text-zinc-500 block">REAL CONVERSATIONS</span>
                <span className="text-xl font-mono font-bold text-blue-400 mt-1 block">
                  {crmMetrics.realConversations}
                </span>
                <span className="text-[10px] text-zinc-500">Replied or engaged</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0f0e18] border border-[#1e1c2b] text-center">
                <span className="text-[10px] font-mono text-zinc-500 block">MEETINGS BOOKED</span>
                <span className="text-xl font-mono font-bold text-amber-400 mt-1 block">
                  {crmMetrics.meetingsBooked}
                </span>
                <span className="text-[10px] text-zinc-500">Diagnostic sessions</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0f0e18] border border-[#1e1c2b] text-center">
                <span className="text-[10px] font-mono text-zinc-500 block">PROPOSALS SENT</span>
                <span className="text-xl font-mono font-bold text-purple-400 mt-1 block">
                  {crmMetrics.proposalsSent}
                </span>
                <span className="text-[10px] text-zinc-500">Monographs submitted</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0f0e18] border border-[#1e1c2b] text-center">
                <span className="text-[10px] font-mono text-zinc-500 block">DEALS WON</span>
                <span className="text-xl font-mono font-bold text-emerald-400 mt-1 block">
                  {crmMetrics.dealsWon}
                </span>
                <span className="text-[10px] text-zinc-500">First paying client</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 4: WEEKLY REVIEW (4 Guided Questions + 1 Change) */}
      {/* ======================================================== */}
      {activeTab === 'weekly-review' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-semibold text-white">Weekly Strategic Review</h2>
            <p className="text-xs text-zinc-400">
              Every Sunday or Monday morning: 10 minutes of ruthless self-honesty to calibrate next week.
            </p>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmitWeeklyReview} className="luxury-card p-6 rounded-2xl space-y-6">
            <div className="p-4 rounded-xl bg-[#0f0e1a] border border-[#201f30] space-y-1">
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                WEEK SNAPSHOT PREVIEW
              </span>
              <p className="text-xs text-zinc-300 font-mono">
                Focus: {formatSecondsToDuration(thisWeekFocusSeconds)} · Outputs: {thisWeekShipped.length} · Contacted: {crmMetrics.prospectsContacted} · Conversations: {crmMetrics.realConversations}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  1. What created results?
                </label>
                <textarea
                  rows={2}
                  value={revQ1}
                  onChange={(e) => setRevQ1(e.target.value)}
                  placeholder="Which specific actions generated conversations, meetings, or tangible assets?"
                  className="w-full p-3 bg-[#0e0d17] border border-[#222035] rounded-xl text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  2. What consumed time without moving the business?
                </label>
                <textarea
                  rows={2}
                  value={revQ2}
                  onChange={(e) => setRevQ2(e.target.value)}
                  placeholder="Where did overthinking, premature automation, or endless tweaking steal deep work?"
                  className="w-full p-3 bg-[#0e0d17] border border-[#222035] rounded-xl text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  3. What did I avoid that mattered?
                </label>
                <textarea
                  rows={2}
                  value={revQ3}
                  onChange={(e) => setRevQ3(e.target.value)}
                  placeholder="Cold calls? Direct follow-ups? Asking for the deposit? Face the resistance."
                  className="w-full p-3 bg-[#0e0d17] border border-[#222035] rounded-xl text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  4. What is the ONE change for next week?
                </label>
                <textarea
                  rows={2}
                  value={revQ4}
                  onChange={(e) => setRevQ4(e.target.value)}
                  placeholder="Diagnose the single operational lever to shift."
                  className="w-full p-3 bg-[#0e0d17] border border-[#222035] rounded-xl text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-2">
                <label className="block text-xs font-bold text-purple-200">
                  NEXT WEEK'S OPERATING CHANGE (REQUIRED) *
                </label>
                <p className="text-[11px] text-zinc-400">
                  This exact phrase will be pinned as the sovereign rule on your Command Center and Founder Execution header next week.
                </p>
                <input
                  type="text"
                  required
                  value={revNextOperatingChange}
                  onChange={(e) => setRevNextOperatingChange(e.target.value)}
                  placeholder="e.g. Execute 10 outbound calls before opening email or editing SOPs"
                  className="w-full p-3 bg-[#0e0d17] border border-purple-600/40 rounded-xl text-sm text-white font-medium focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white rounded-xl text-xs font-semibold shadow-md cursor-pointer"
              >
                Submit &amp; Lock Operating Change
              </button>

              {revSavedNotice && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-4 h-4" /> Review recorded successfully
                </span>
              )}
            </div>
          </form>

          {/* Past Weekly Reviews History */}
          {weeklyReviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">Past Reviews Archive</h3>
              <div className="space-y-3">
                {weeklyReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#0d0c15] border border-[#1e1c2b] space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#1b1928] pb-2">
                      <span className="text-xs font-mono text-purple-300 font-bold">
                        WEEK {rev.weekStartDate} → {rev.weekEndDate}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {rev.createdAt.split('T')[0]}
                      </span>
                    </div>

                    <div className="p-3 bg-[#13121f] rounded-xl text-xs text-zinc-200">
                      <strong className="text-purple-300">Operating Change:</strong> "{rev.nextWeekOperatingChange}"
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-300">
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] block">RESULTS</span>
                        {rev.q1Results || '—'}
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] block">AVOIDED</span>
                        {rev.q3AvoidedPriority || '—'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 5: OPERATING RULES (The 5 Immutable Filters) */}
      {/* ======================================================== */}
      {activeTab === 'operating-rules' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-semibold text-white">The 5 Immutable Operating Rules</h2>
            <p className="text-xs text-zinc-400">
              Not motivational quotes. Brutal decision filters for every hour of your workday.
            </p>
          </div>

          <div className="space-y-4">
            {FOUNDER_OPERATING_RULES.map((rule) => (
              <div
                key={rule.id}
                className="p-6 rounded-2xl bg-[#0c0b14] border border-[#1e1c2b] hover:border-purple-500/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 font-bold">
                    RULE {rule.ruleNumber}
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {rule.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
                  {rule.description}
                </p>

                <div className="p-3 rounded-xl bg-[#13121f] border border-[#212033] flex items-center gap-2">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold shrink-0">
                    DECISION FILTER:
                  </span>
                  <span className="text-xs text-zinc-200 italic">
                    "{rule.filter}"
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FINISH SESSION MODAL */}
      {/* ======================================================== */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="luxury-card w-full max-w-lg p-6 rounded-3xl border border-[#2f2e46] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#212033] pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Square className="w-4 h-4 text-purple-400" />
                Finish Focus Sprint ({formatSecondsToDuration(timerState.elapsedSeconds)})
              </h3>
              <button
                onClick={() => setShowFinishModal(false)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  What did you complete? *
                </label>
                <input
                  type="text"
                  required
                  value={finishWhatCompleted}
                  onChange={(e) => setFinishWhatCompleted(e.target.value)}
                  placeholder="e.g. Completed Cold Call Playbook V1"
                  className="w-full px-3.5 py-2.5 bg-[#0e0d17] border border-[#252438] rounded-xl text-sm text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Session Result *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Completed', 'Meaningful Progress', 'Interrupted'] as FocusResult[]).map((res) => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => setFinishResult(res)}
                      className={`p-2.5 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                        finishResult === res
                          ? 'bg-purple-600/30 border-purple-500 text-white'
                          : 'bg-[#12111c] border-[#222033] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Optional Note
                </label>
                <input
                  type="text"
                  value={finishNote}
                  onChange={(e) => setFinishNote(e.target.value)}
                  placeholder="Any friction or observation to remember"
                  className="w-full px-3 py-2 bg-[#0e0d17] border border-[#252438] rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              {finishResult === 'Completed' && (
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alsoShipOutput}
                    onChange={(e) => setAlsoShipOutput(e.target.checked)}
                    className="rounded border-zinc-700 text-purple-600 focus:ring-0"
                  />
                  <span className="text-xs text-purple-200 font-medium">
                    Also record this item in Shipped Outputs log
                  </span>
                </label>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFinishSession}
                className="px-5 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md"
              >
                Save &amp; Log Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* LOG SHIPPED OUTPUT MODAL */}
      {/* ======================================================== */}
      {showAddOutputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="luxury-card w-full max-w-md p-6 rounded-3xl border border-[#2f2e46] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#212033] pb-3">
              <h3 className="text-sm font-semibold text-white">Log Shipped Output</h3>
              <button
                onClick={() => setShowAddOutputModal(false)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  OUTPUT TITLE (WHAT WAS COMPLETED?) *
                </label>
                <input
                  type="text"
                  required
                  value={outputTitle}
                  onChange={(e) => setOutputTitle(e.target.value)}
                  placeholder="e.g. 5 prospect demos completed"
                  className="w-full px-3 py-2 bg-[#0e0d17] border border-[#252438] rounded-xl text-sm text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    AREA
                  </label>
                  <select
                    value={outputArea}
                    onChange={(e) => setOutputArea(e.target.value as FocusArea)}
                    className="w-full px-3 py-2 bg-[#0e0d17] border border-[#252438] rounded-xl text-xs text-zinc-200"
                  >
                    {FOCUS_AREAS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    DATE
                  </label>
                  <input
                    type="date"
                    value={outputDate}
                    onChange={(e) => setOutputDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0e0d17] border border-[#252438] rounded-xl text-xs text-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  OPTIONAL LINKED CLIENT OR PROJECT
                </label>
                <input
                  type="text"
                  value={outputClient}
                  onChange={(e) => setOutputClient(e.target.value)}
                  placeholder="e.g. Eklego Design or Outreach Sprint"
                  className="w-full px-3 py-2 bg-[#0e0d17] border border-[#252438] rounded-xl text-xs text-zinc-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  OPTIONAL SHORT NOTE
                </label>
                <input
                  type="text"
                  value={outputNote}
                  onChange={(e) => setOutputNote(e.target.value)}
                  placeholder="Context or deliverable URL"
                  className="w-full px-3 py-2 bg-[#0e0d17] border border-[#252438] rounded-xl text-xs text-zinc-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#212033]">
              <button
                type="button"
                onClick={() => setShowAddOutputModal(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateOutput}
                disabled={!outputTitle.trim()}
                className="px-5 py-2 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] disabled:opacity-40 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Log Output
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
