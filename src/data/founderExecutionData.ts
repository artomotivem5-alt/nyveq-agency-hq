import {
  FocusArea,
  FocusResult,
  FocusSession,
  ShippedOutput,
  FounderDailyMove,
  WeeklyReview,
  DaySignalStatus,
  ProspectLead
} from '../types';
import { INITIAL_PROSPECTS } from './prospectsData';

// Storage keys
export const FOUNDER_STORAGE_KEYS = {
  ONE_MOVE: 'nyveq_founder_one_move',
  FOCUS_SESSIONS: 'nyveq_focus_sessions',
  SHIPPED_OUTPUTS: 'nyveq_shipped_outputs',
  WEEKLY_REVIEWS: 'nyveq_weekly_reviews',
  CRM_PROSPECTS: 'nyveq_crm_prospects_v3',
  ACTIVE_FOCUS_TIMER: 'nyveq_active_focus_timer_state'
};

// ==========================================
// 5 IMMUTABLE OPERATING RULES (Decision Filters)
// ==========================================
export const FOUNDER_OPERATING_RULES = [
  {
    id: 'rule-1',
    ruleNumber: '01',
    title: 'Revenue activity before optimization.',
    description: 'Cold calls, outreach, conversations, and demos take precedent over refactoring, redesigning, or tweaking internal tools.',
    filter: 'Does this task directly generate conversations with paying clients today?'
  },
  {
    id: 'rule-2',
    ruleNumber: '02',
    title: 'Market contact every working day.',
    description: 'Zero days without touching a prospect. If no meetings are scheduled, outbound outreach must execute before shutting down.',
    filter: 'Have I put our value proposition in front of a real prospect today?'
  },
  {
    id: 'rule-3',
    ruleNumber: '03',
    title: 'Output before additional input.',
    description: 'Ship the proposal, script, or demo before reading another guide, taking another course, or exploring new theories.',
    filter: 'Am I producing a tangible deliverable, or consuming information to feel productive?'
  },
  {
    id: 'rule-4',
    ruleNumber: '04',
    title: 'Do not automate unvalidated work.',
    description: 'Execute manually until the pattern produces predictable cash flow. Automating friction only scales irrelevance.',
    filter: 'Has this workflow closed real money by hand before I spend hours automating it?'
  },
  {
    id: 'rule-5',
    ruleNumber: '05',
    title: 'Finish the current priority before creating another one.',
    description: 'First paying client is the sole sovereign benchmark. Open loops dilute conviction and stall execution.',
    filter: 'Is the current highest priority closed and shipped before opening a new thread?'
  }
];

// Focus area metadata
export const FOCUS_AREAS: { id: FocusArea; label: string; color: string; bg: string; border: string }[] = [
  { id: 'Sales', label: 'Sales & Outreach', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'Client Work', label: 'Client Work & Delivery', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { id: 'Agency System', label: 'Agency System & Ops', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { id: 'Content', label: 'Content & Positioning', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 'Learning', label: 'Learning & Skill', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/30' },
  { id: 'Other', label: 'Other', color: 'text-zinc-500', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' }
];

// Helper: Format Seconds into Human Readable (1h 24m)
export function formatSecondsToDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0m';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}

// Helper: Format Seconds to Stop-watch display (01:24:05)
export function formatSecondsToDigital(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

// Helper: Get local Date string YYYY-MM-DD
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper: Get Week Start and End Date (Monday - Sunday)
export function getWeekRange(date: Date = new Date()): { start: string; end: string } {
  const d = new Date(date);
  const day = d.getDay();
  // Monday is 1, Sunday is 0
  const diffToMonday = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diffToMonday));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: getLocalDateString(monday),
    end: getLocalDateString(sunday)
  };
}

// ==========================================
// SEED DATA FOR FIRST INITIALIZATION
// ==========================================
const TODAY_STR = getLocalDateString();

export const INITIAL_FOUNDER_ONE_MOVE: FounderDailyMove = {
  id: 'move-init',
  text: 'Call first 5 qualified prospects and document observed portfolio gaps',
  completed: false,
  date: TODAY_STR,
  updatedAt: new Date().toISOString()
};

export const INITIAL_SHIPPED_OUTPUTS: ShippedOutput[] = [
  {
    id: 'out-1',
    title: 'Cold Call Playbook & 4-Angle Arabic Script Suite',
    area: 'Sales',
    date: TODAY_STR,
    linkedClientOrProject: 'Outreach Core',
    note: 'Finalized verbatim opening hooks and friction buster for Egyptian interior ateliers.',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'out-2',
    title: '15 High-Ticket Egyptian Interior Studios Researched & Graded',
    area: 'Sales',
    date: TODAY_STR,
    linkedClientOrProject: 'CRM Batch 01',
    note: 'Captured exact compound projects and observed digital portfolio flaws.',
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: 'out-3',
    title: 'Single Source-of-Truth Package Pricing Architecture V1',
    area: 'Agency System',
    date: TODAY_STR,
    linkedClientOrProject: 'NYVEQ HQ',
    note: 'Consolidated Presence, Signature, Authority and Founding Partner logic across entire system.',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_FOCUS_SESSIONS: FocusSession[] = [
  {
    id: 'ses-1',
    task: 'Prospect research & Instagram portfolio flaw analysis for 5 studios',
    area: 'Sales',
    startTime: new Date(Date.now() - 7200000).toISOString(),
    endTime: new Date(Date.now() - 3600000).toISOString(),
    durationSeconds: 3600,
    result: 'Completed',
    completedOutput: 'Detailed flaw notes documented in CRM for Eklego, MHDH, and Alchemy.',
    date: TODAY_STR
  },
  {
    id: 'ses-2',
    task: 'Proposal system & package scopes data consolidation',
    area: 'Agency System',
    startTime: new Date(Date.now() - 3000000).toISOString(),
    endTime: new Date(Date.now() - 1200000).toISOString(),
    durationSeconds: 1800,
    result: 'Completed',
    completedOutput: 'Single source-of-truth pricing engine and ProposalStudio integration.',
    date: TODAY_STR
  }
];

// ==========================================
// CRM SINGLE SOURCE OF TRUTH READER (READ-ONLY)
// ==========================================
export interface CrmDerivedMetrics {
  totalLeads: number;
  prospectsContacted: number;
  realConversations: number;
  meetingsBooked: number;
  proposalsSent: number;
  dealsWon: number;
  hasCrmData: boolean;
}

export function readCrmMetrics(): CrmDerivedMetrics {
  try {
    const raw = localStorage.getItem(FOUNDER_STORAGE_KEYS.CRM_PROSPECTS);
    let prospects: ProspectLead[] = INITIAL_PROSPECTS;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        prospects = parsed;
      }
    }

    const totalLeads = prospects.length;
    // Prospects contacted: status is beyond 'new' and 'researched'
    const prospectsContacted = prospects.filter(
      (p) => p.status !== 'new' && p.status !== 'researched'
    ).length;

    // Real conversations: prospects that replied or further
    const realConversations = prospects.filter((p) =>
      ['replied', 'qualified', 'meeting_booked', 'demo_ready', 'meeting_held', 'proposal_sent', 'agreement_payment', 'won'].includes(p.status)
    ).length;

    // Meetings booked:
    const meetingsBooked = prospects.filter((p) =>
      ['meeting_booked', 'meeting_held'].includes(p.status)
    ).length;

    // Proposals sent:
    const proposalsSent = prospects.filter((p) =>
      ['proposal_sent', 'agreement_payment', 'won'].includes(p.status)
    ).length;

    // Deals won:
    const dealsWon = prospects.filter((p) =>
      ['won', 'onboarding', 'ready_to_build', 'in_production', 'review', 'launched'].includes(p.status)
    ).length;

    return {
      totalLeads,
      prospectsContacted,
      realConversations,
      meetingsBooked,
      proposalsSent,
      dealsWon,
      hasCrmData: true
    };
  } catch (e) {
    return {
      totalLeads: 0,
      prospectsContacted: 0,
      realConversations: 0,
      meetingsBooked: 0,
      proposalsSent: 0,
      dealsWon: 0,
      hasCrmData: false
    };
  }
}

// ==========================================
// AGGREGATIONS & METRICS COMPUTATION
// ==========================================

export function getTodayFocusSeconds(sessions: FocusSession[]): number {
  const today = getLocalDateString();
  return sessions
    .filter((s) => s.date === today)
    .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);
}

export function getThisWeekFocusSeconds(sessions: FocusSession[]): number {
  const { start, end } = getWeekRange();
  return sessions
    .filter((s) => s.date >= start && s.date <= end)
    .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);
}

export function getTodayShippedOutputs(outputs: ShippedOutput[]): ShippedOutput[] {
  const today = getLocalDateString();
  return outputs.filter((o) => o.date === today);
}

export function getThisWeekShippedOutputs(outputs: ShippedOutput[]): ShippedOutput[] {
  const { start, end } = getWeekRange();
  return outputs.filter((o) => o.date >= start && o.date <= end);
}

// Subtle Imbalance Rule (Section 18)
export function checkImbalanceObservation(sessions: FocusSession[]): string | null {
  const today = getLocalDateString();
  const todaySessions = sessions.filter((s) => s.date === today);

  const agencySystemSeconds = todaySessions
    .filter((s) => s.area === 'Agency System')
    .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);

  const salesSeconds = todaySessions
    .filter((s) => s.area === 'Sales')
    .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);

  // If internal work exceeds 1.5 hours and sales is 0, show subtle note
  if (agencySystemSeconds >= 5400 && salesSeconds === 0) {
    return 'Internal work is currently outweighing market activity.';
  }

  return null;
}

// Subtle Day Signal (Section 9)
export function computeDaySignal(
  crmMetrics: CrmDerivedMetrics,
  todayFocusSeconds: number,
  todayShippedCount: number,
  sessions: FocusSession[]
): DaySignalStatus {
  const today = getLocalDateString();
  const todaySessions = sessions.filter((s) => s.date === today);
  const hasSalesFocus = todaySessions.some((s) => s.area === 'Sales' && s.durationSeconds >= 900);

  // MOVING: Meaningful market activity happened AND meaningful execution/output occurred.
  if ((hasSalesFocus || crmMetrics.prospectsContacted > 0) && (todayShippedCount > 0 || todayFocusSeconds >= 3600)) {
    return 'MOVING';
  }

  // AT RISK: Work happened, but little or no activity connected to the main objective (Sales / First Client).
  if (todayFocusSeconds > 0 && !hasSalesFocus && todayShippedCount === 0) {
    return 'AT RISK';
  }

  // STALLED: No meaningful market contact and no meaningful output.
  if (todayFocusSeconds === 0 && todayShippedCount === 0) {
    return 'STALLED';
  }

  return 'AT RISK';
}
