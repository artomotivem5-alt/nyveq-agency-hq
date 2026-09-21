export type ViewMode =
  | 'login'
  | 'command-center'
  // Strategy
  | 'company-overview'
  | 'company-positioning'
  | 'company-principles'
  | 'company-icp'
  | 'company-offers'
  | 'company-market'
  | 'company-roadmap'
  | 'offers-active'
  | 'offers-future'
  | 'market-icp'
  | 'market-scoring'
  | 'market-research'
  | 'market-scorer'
  // Sales
  | 'sales-funnel'
  | 'sales-outreach'
  | 'sales-discovery'
  | 'sales-demo'
  | 'sales-proposal'
  | 'sales-closing'
  | 'sales-objections'
  | 'sales-followup'
  | 'sales-principles'
  | 'sales-cockpit'
  // Delivery
  | 'delivery-overview'
  | 'delivery-onboarding'
  | 'delivery-discovery'
  | 'delivery-strategy'
  | 'delivery-build'
  | 'delivery-review'
  | 'delivery-revisions'
  | 'delivery-launch'
  | 'delivery-postlaunch'
  // Library
  | 'sops-catalog'
  | 'templates-catalog'
  | 'library-scripts'
  | 'library-notes'
  // Progress
  | 'progress-tracker'
  | 'progress-completed'
  | 'progress-in-progress'
  | 'progress-next'
  | 'progress-later'
  | 'progress-decision-log'
  // Operations
  | 'proposals-builder'
  | 'proposals-library'
  | 'crm-bridge'
  // Founder Execution
  | 'founder-execution';

export type TaskStatus = 'completed' | 'building' | 'next' | 'later';

export interface AgencyTask {
  id: string;
  title: string;
  category: TaskStatus;
  description?: string;
  completed?: boolean;
}

export interface SOPItem {
  id: string;
  number: string;
  title: string;
  category: 'research' | 'outreach' | 'discovery' | 'demo' | 'proposal' | 'closing' | 'onboarding' | 'delivery';
  purpose: string;
  whenToUse: string;
  inputs: string[];
  steps: {
    order: number;
    title: string;
    detail: string;
    tip?: string;
  }[];
  expectedOutput: string;
  doneWhen: string[];
  commonMistakes: string[];
}

export interface TemplateItem {
  id: string;
  title: string;
  category: 'cold-call' | 'dm' | 'email' | 'discovery' | 'demo-invite' | 'follow-up' | 'onboarding';
  language: 'ar' | 'en' | 'both';
  description: string;
  content: string;
  notes?: string;
}

export interface ObjectionItem {
  id: string;
  category: string;
  exactObjection: string;
  meaning: string;
  recommendedPrinciple: string;
  exampleResponseArabic: string;
  exampleResponseEnglish?: string;
  notes: string;
}

export type ProposalStudioStatus =
  | 'draft'
  | 'ready'
  | 'sent'
  | 'viewed'
  | 'approved'
  | 'declined'
  | 'archived';

export interface DiscoveryNotes {
  currentSituation: string;
  currentAcquisition: string;
  currentCustomerJourney: string;
  mainProblems: string;
  targetProjects: string;
  desiredOutcome: string;
  leadHandlingProblems: string;
  importantNotes: string;
}

export interface PackageConfig {
  tier: PackageTier;
  isFoundingPartner: boolean;
  specialApprovedPrice?: number;
  standardBuildFee: number;
  actualBuildFee: number;
  kickoffDeposit: number;
  beforeLaunchPayment: number;
  monthlyCareFee: number;
  timeline: string;
  revisionPolicy: string;
}

export interface InternalRecommendation {
  recommendedPackage: PackageTier;
  why: string;
  risks: string;
  missingInformation: string;
  upsellOpportunities: string;
}

export interface ScopeItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  deliverableNumber?: string;
  category?: string;
}

export type ProposalSectionKey =
  | 'hero'
  | 'executive_summary'
  | 'current_situation'
  | 'identified_problems'
  | 'the_opportunity'
  | 'recommended_solution'
  | 'what_we_will_build'
  | 'process'
  | 'timeline'
  | 'investment'
  | 'managed_care'
  | 'terms_summary'
  | 'next_step';

export interface ProposalSectionItem {
  id: string;
  key: ProposalSectionKey;
  title: string;
  subtitle?: string;
  enabled: boolean;
  order: number;
}

export type ThemePreset = 'nyveq-dark' | 'editorial-light' | 'architectural' | 'client-brand';
export type FontPair = 'editorial-serif' | 'modern-sans' | 'monumental-grotesk';
export type BorderRadiusStyle = 'none' | 'subtle' | 'rounded';
export type SectionStyle = 'minimal' | 'bordered' | 'tinted';

export interface ProposalTheme {
  preset: ThemePreset;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackgroundColor: string;
  cardBorderColor: string;
  isDark: boolean;
  fontPair: FontPair;
  borderRadius: BorderRadiusStyle;
  sectionStyle: SectionStyle;
}

export interface ClientBranding {
  clientLogoUrl?: string;
  nyveqLogoUrl?: string;
  heroImageUrl?: string;
  projectImages?: string[];
}

export interface ProposalData {
  id: string;
  clientName: string;
  companyName: string;
  contactPerson: string;
  proposalDate: string;
  projectTitle: string;
  currentSituation: string;
  specificObservations: string;
  identifiedProblems: string[];
  opportunity: string;
  objectives: string[];
  recommendedSolution: string;
  scope: string[];
  deliverables: {
    title: string;
    description: string;
  }[];
  process: {
    phase: string;
    duration: string;
    details: string;
  }[];
  timeline: string;
  investment: string;
  deposit: string;
  remainingPayment: string;
  revisionPolicy: string;
  includedSupport: string;
  exclusions: string[];
  nextStep: string;
  createdAt?: string;
  status?: ProposalStudioStatus | 'accepted';

  // Proposal Studio V1 Extended Attributes
  industry?: string;
  website?: string;
  instagram?: string;
  executiveSummary?: string;
  whyThisPackage?: string;
  scopeExplanation?: string;
  discoveryNotes?: DiscoveryNotes;
  packageConfig?: PackageConfig;
  internalRecommendation?: InternalRecommendation;
  scopeItems?: ScopeItem[];
  sections?: ProposalSectionItem[];
  theme?: ProposalTheme;
  branding?: ClientBranding;
  updatedAt?: string;
  publishedUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  emailRecipient?: string;
  emailSubject?: string;
}

export type LeadStatus =
  | 'new'
  | 'researched'
  | 'contacted'
  | 'replied'
  | 'qualified'
  | 'meeting_booked'
  | 'demo_ready'
  | 'meeting_held'
  | 'proposal_sent'
  | 'agreement_payment'
  | 'won'
  | 'onboarding'
  | 'ready_to_build'
  | 'in_production'
  | 'review'
  | 'launched'
  | 'lost';

export type PaymentStatus =
  | 'not_sent'
  | 'awaiting_payment'
  | 'deposit_paid'
  | 'final_payment_due'
  | 'paid_in_full';

export type PackageTier = 'presence' | 'signature' | 'authority' | 'founding';

export interface ProspectLead {
  id: string;
  company: string;
  contact: string;
  location: string;
  phone: string;
  email?: string;
  instagram?: string;
  website?: string;
  googleQuery?: string;
  standoutProject: string;
  observedFlaw: string;
  grade: 'A' | 'B' | 'C';
  status: LeadStatus;
  targetTier: PackageTier;
  paymentStatus?: PaymentStatus;
  nextAction: string;
  nextActionDate: string;
  notes?: string;
}

// ==========================================
// FOUNDER EXECUTION DOMAIN TYPES
// ==========================================

export type FocusArea =
  | 'Sales'
  | 'Client Work'
  | 'Agency System'
  | 'Content'
  | 'Learning'
  | 'Other';

export type FocusResult = 'Completed' | 'Meaningful Progress' | 'Interrupted';

export interface FocusSession {
  id: string;
  task: string;
  area: FocusArea;
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationSeconds: number;
  result: FocusResult;
  completedOutput?: string;
  note?: string;
  date: string; // YYYY-MM-DD
}

export interface ShippedOutput {
  id: string;
  title: string;
  area: FocusArea;
  date: string; // YYYY-MM-DD
  linkedClientOrProject?: string;
  note?: string;
  focusSessionId?: string;
  createdAt: string; // ISO string
}

export interface FounderDailyMove {
  id: string;
  text: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
  updatedAt: string; // ISO string
}

export interface WeeklyReviewStatsSnapshot {
  focusHours: number;
  focusSessionsCount: number;
  shippedOutputsCount: number;
  prospectsContacted: number;
  realConversations: number;
  meetingsBooked: number;
  proposalsSent: number;
  dealsWon: number;
}

export interface WeeklyReview {
  id: string;
  weekStartDate: string; // YYYY-MM-DD
  weekEndDate: string; // YYYY-MM-DD
  statsSnapshot: WeeklyReviewStatsSnapshot;
  q1Results: string;
  q2WastedTime: string;
  q3AvoidedPriority: string;
  q4OneChange: string;
  nextWeekOperatingChange: string;
  createdAt: string; // ISO string
}

export type DaySignalStatus = 'MOVING' | 'AT RISK' | 'STALLED';

