import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Table,
  Copy,
  Check,
  AlertTriangle,
  Link2,
  Save,
  PhoneCall,
  FileText,
  MessageSquare,
  Search,
  Filter,
  Globe,
  Instagram,
  Compass,
  X,
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Eye,
  RotateCcw,
  CreditCard
} from 'lucide-react';
import { ViewMode, ProspectLead, LeadStatus, PaymentStatus, PackageTier } from '../../types';
import { INITIAL_PROSPECTS } from '../../data/prospectsData';

interface CrmViewProps {
  onSelectView?: (view: ViewMode) => void;
}

export const CrmView: React.FC<CrmViewProps> = ({ onSelectView }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'sheet'>('pipeline');
  
  // Storage key versioned to v3 to guarantee new 17-status & package structure
  const [prospects, setProspects] = useState<ProspectLead[]>(() => {
    const saved = localStorage.getItem('nyveq_crm_prospects_v3');
    if (saved) {
      try {
        const parsed: ProspectLead[] = JSON.parse(saved);
        if (parsed.length > 0 && parsed[0].company.includes('Eklego')) {
          return parsed;
        }
      } catch (e) {}
    }
    localStorage.setItem('nyveq_crm_prospects_v3', JSON.stringify(INITIAL_PROSPECTS));
    return INITIAL_PROSPECTS;
  });

  const [selectedLead, setSelectedLead] = useState<ProspectLead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [territoryFilter, setTerritoryFilter] = useState<'all' | 'cairo' | 'zayed' | 'gulf'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | string>('all');
  const [tierFilter, setTierFilter] = useState<'all' | string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [resetNotice, setResetNotice] = useState(false);

  // Google Sheet Link
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return (
      localStorage.getItem('nyveq_crm_sheet_url') ||
      'https://docs.google.com/spreadsheets/'
    );
  });
  const [isSaved, setIsSaved] = useState(false);
  const [copiedHeaders, setCopiedHeaders] = useState(false);

  useEffect(() => {
    localStorage.setItem('nyveq_crm_prospects_v3', JSON.stringify(prospects));
  }, [prospects]);

  // Force reset back to verified 15 studios
  const handleResetToVerified = () => {
    setProspects(INITIAL_PROSPECTS);
    localStorage.setItem('nyveq_crm_prospects_v3', JSON.stringify(INITIAL_PROSPECTS));
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2500);
  };

  const updateLeadStatus = (id: string, newStatus: LeadStatus) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const updateLeadPaymentStatus = (id: string, newPaymentStatus: PaymentStatus) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paymentStatus: newPaymentStatus } : p))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, paymentStatus: newPaymentStatus } : null));
    }
  };

  const updateLeadTier = (id: string, newTier: PackageTier) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, targetTier: newTier } : p))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, targetTier: newTier } : null));
    }
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, notes } : p))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, notes } : null));
    }
  };

  const updateNextAction = (id: string, action: string, date: string) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, nextAction: action, nextActionDate: date } : p))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, nextAction: action, nextActionDate: date } : null));
    }
  };

  // Launch into Call Cockpit
  const handleLaunchCallCockpit = (lead: ProspectLead) => {
    const cockpitData = {
      contact: lead.contact.split('(')[0].trim(),
      company: lead.company,
      standoutProject: lead.standoutProject,
      observedFlaw: lead.observedFlaw
    };
    localStorage.setItem('nyveq_cockpit_prospect', JSON.stringify(cockpitData));
    if (onSelectView) {
      onSelectView('sales-cockpit');
    }
  };

  // Launch into Proposal Builder
  const handleLaunchProposal = (lead: ProspectLead) => {
    const proposalData = {
      prospectName: lead.contact.split('(')[0].trim(),
      firmName: lead.company,
      contactTitle: 'Founder & Managing Director',
      location: lead.location,
      standoutProject: lead.standoutProject,
      observedFlaw: lead.observedFlaw,
      tier: lead.targetTier
    };
    localStorage.setItem('nyveq_proposal_target', JSON.stringify(proposalData));
    if (onSelectView) {
      onSelectView('proposals-builder');
    }
  };

  // Copy Personalized WhatsApp Outreach
  const handleCopyWhatsApp = (lead: ProspectLead) => {
    const contactName = lead.contact.split('(')[0].trim();
    const text = `مساء الخير يا ${contactName}،
شفت تنفيذكم الراقي لمشروع ${lead.standoutProject} وما شاء الله الفينيش مميز جداً.
كنت بتصفح طريقة عرض سابقة أعمالكم ولاحظت نقطة سريعة في تنظيم مشاريع الفلل وفلترة العملاء حابب أشاركها في 30 ثانية.
رقم حضرتك ده اللي عليه الواتساب؟`;

    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // URL Resolvers
  const getGoogleSearchUrl = (lead: ProspectLead): string => {
    const query = lead.googleQuery || `${lead.company} ${lead.location} interior design architecture Egypt`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  const getInstagramUrl = (handleOrUrl?: string): string => {
    if (!handleOrUrl) return '';
    const clean = handleOrUrl.trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return clean;
    }
    const handle = clean.replace(/^@/, '');
    return `https://www.instagram.com/${handle}/`;
  };

  const getWebsiteUrl = (url?: string): string => {
    if (!url) return '';
    const clean = url.trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return clean;
    }
    return `https://${clean}`;
  };

  const getGoogleMapsUrl = (lead: ProspectLead): string => {
    const query = `${lead.company} ${lead.location} Cairo`;
    return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  };

  // Filtered Leads
  const filteredProspects = prospects.filter((p) => {
    const matchesSearch =
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.standoutProject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTerritory =
      territoryFilter === 'all'
        ? true
        : territoryFilter === 'cairo'
        ? p.location.includes('Cairo')
        : territoryFilter === 'zayed'
        ? p.location.includes('Zayed')
        : p.location.includes('Dubai');

    const matchesStatus =
      statusFilter === 'all' ? true : p.status === statusFilter;

    const matchesTier =
      tierFilter === 'all' ? true : p.targetTier === tierFilter;

    return matchesSearch && matchesTerritory && matchesStatus && matchesTier;
  });

  // The 17 CRM Fields Architecture
  const crmFields = [
    { name: 'Company Name', desc: 'Official trade or registered name of the design studio' },
    { name: 'Territory / Location', desc: 'New Cairo, Sheikh Zayed, Maadi, Zamalek, or Dubai' },
    { name: 'Contact Person & Title', desc: 'Founder, Principal Architect, or Managing Director' },
    { name: 'Direct Mobile / WhatsApp', desc: 'Direct phone number for outreach' },
    { name: 'Business Email', desc: 'Official business email address' },
    { name: 'Instagram Profile', desc: 'Direct profile handle or link' },
    { name: 'Official Website', desc: 'Current URL or "NONE" if missing' },
    { name: 'Standout Project Observed', desc: 'The 1 tangible executed project hook from research' },
    { name: 'Diagnosed Digital Friction Flaw', desc: 'Specific gap identified (e.g. unorganized highlights, slow PDF)' },
    { name: 'Lead Grade', desc: 'A (Prime), B (Acceptable), C (Disqualify)' },
    { name: 'Target Package Tier', desc: 'Presence (12,997) / Signature (21,997) / Authority (34,997) / Founding' },
    { name: 'Pipeline Status (17 Stages)', desc: 'From NEW through RESEARCHED to LAUNCHED / LOST' },
    { name: 'Payment Status', desc: 'Not Sent / Awaiting / Deposit Paid / Final Due / Paid in Full' },
    { name: 'Contract Deal Value (EGP)', desc: 'Agreed or estimated build fee + managed care retainer' },
    { name: 'Last Contact Date', desc: 'Date of last phone call, DM, or meeting' },
    { name: 'Next Action (MANDATORY)', desc: 'The Golden Pipeline Law: Exact next step required' },
    { name: 'Next Action Date', desc: 'Scheduled calendar date for the next touchpoint' }
  ];

  const handleSaveUrl = () => {
    localStorage.setItem('nyveq_crm_sheet_url', sheetUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyHeaders = () => {
    const headerString = crmFields.map((f) => f.name).join('\t');
    navigator.clipboard.writeText(headerString);
    setCopiedHeaders(true);
    setTimeout(() => setCopiedHeaders(false), 2000);
  };

  // Pipeline stages label map
  const statusOptions: { value: LeadStatus; label: string }[] = [
    { value: 'new', label: '01. NEW (جديد)' },
    { value: 'researched', label: '02. RESEARCHED (تم البحث والتأهيل)' },
    { value: 'contacted', label: '03. CONTACTED (تم الاتصال / التواصل)' },
    { value: 'replied', label: '04. REPLIED (تم الرد)' },
    { value: 'qualified', label: '05. QUALIFIED (مؤهل للصفقة)' },
    { value: 'meeting_booked', label: '06. MEETING BOOKED (موعد زووم محجوز)' },
    { value: 'demo_ready', label: '07. DEMO READY (الديمو جاهز للعرض)' },
    { value: 'meeting_held', label: '08. MEETING HELD (تم عقد الاجتماع التشخيصي)' },
    { value: 'proposal_sent', label: '09. PROPOSAL SENT (تم إرسال المقترح)' },
    { value: 'agreement_payment', label: '10. AGREEMENT / PAYMENT (في انتظار العقد/الدفعة)' },
    { value: 'won', label: '11. WON (تم إغلاق الصفقة بنجاح 🎉)' },
    { value: 'onboarding', label: '12. ONBOARDING (مرحلة الاستيعاب السريع)' },
    { value: 'ready_to_build', label: '13. READY TO BUILD (الأصول مكتملة والبدء)' },
    { value: 'in_production', label: '14. IN PRODUCTION (المنصة قيد البرمجة)' },
    { value: 'review', label: '15. REVIEW (مراجعة النسخة التجريبية)' },
    { value: 'launched', label: '16. LAUNCHED (تم الإطلاق الحي على الدومين 🚀)' },
    { value: 'lost', label: '17. LOST (غير مناسب حالياً)' },
  ];

  const paymentOptions: { value: PaymentStatus; label: string }[] = [
    { value: 'not_sent', label: 'NOT SENT (لم ترسل)' },
    { value: 'awaiting_payment', label: 'AWAITING PAYMENT (في انتظار التحويل)' },
    { value: 'deposit_paid', label: 'DEPOSIT PAID (تم استلام الدفعة 50%)' },
    { value: 'final_payment_due', label: 'FINAL PAYMENT DUE (الدفعة الختامية مستحقة)' },
    { value: 'paid_in_full', label: 'PAID IN FULL (مسدد بالكامل 100%)' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0d0c13] border border-[#1f1d2b] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30 font-bold uppercase tracking-wider">
              UNIFIED CRM // 17-STAGE PIPELINE
            </span>
            <span className="text-xs font-mono text-zinc-500">|</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">1 Single Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-tight">
            Client Acquisition &amp; Pipeline Engine
          </h1>
          <p className="text-xs text-zinc-400 font-sans">
            Same pipeline from cold outreach to final DNS launch. No fragmented multi-CRM chaos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleResetToVerified}
            className="px-3 py-1.5 rounded-xl bg-[#14131d] hover:bg-[#1f1e2c] border border-[#262438] text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reload verified studios dataset"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Reset 15 Studios</span>
          </button>

          {resetNotice && (
            <span className="text-xs font-mono text-emerald-400 animate-in fade-in">
              Reset Done!
            </span>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#14131d] p-1 rounded-xl border border-[#242236]">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-[var(--accent-purple)] text-black font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Studio Cards ({filteredProspects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sheet')}
              className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'sheet'
                  ? 'bg-[var(--accent-purple)] text-black font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Sheet CRM (17 Fields)</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Key Metric Strips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-[#0d0c13] border border-[#1f1d2b] space-y-1">
              <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider">VERIFIED STUDIOS</span>
              <div className="text-2xl font-bold font-mono text-white">{prospects.length} Real Ateliers</div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">100% Active Studios</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0c13] border border-[#1f1d2b] space-y-1">
              <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider">GRADE A (PRIME)</span>
              <div className="text-2xl font-bold font-mono text-white">
                {prospects.filter((p) => p.grade === 'A').length} Studios
              </div>
              <span className="text-xs font-mono text-[var(--accent-purple)]">Top Tier Authority</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0c13] border border-[#1f1d2b] space-y-1">
              <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider">FOUNDING COHORT</span>
              <div className="text-2xl font-bold font-mono text-white">
                {prospects.filter((p) => p.targetTier === 'founding').length} Candidates
              </div>
              <span className="text-xs font-mono text-[var(--accent-purple)]">5–7 Seats (Build Fee Waived)</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0c13] border border-[#1f1d2b] space-y-1">
              <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider">SIGNATURE &amp; AUTHORITY</span>
              <div className="text-2xl font-bold font-mono text-white">
                {prospects.filter((p) => p.targetTier === 'signature' || p.targetTier === 'authority').length} Studios
              </div>
              <span className="text-xs font-mono text-zinc-400">21,997 / 34,997 EGP</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-3.5 rounded-xl bg-[#0d0c13] border border-[#1f1d2b] flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-[var(--accent-purple)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search studio, architect, or villa..."
                className="w-full bg-[#14131c] border border-[#252335] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--accent-purple)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1 bg-[#14131c] p-1 rounded-xl border border-[#252335]">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'cairo', label: 'New Cairo' },
                  { id: 'zayed', label: 'Sheikh Zayed' },
                  { id: 'gulf', label: 'Dubai' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTerritoryFilter(t.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      territoryFilter === t.id
                        ? 'bg-[var(--accent-purple)] text-black font-bold shadow'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tier Filter */}
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-[#14131c] border border-[#252335] rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-[var(--accent-purple)]"
              >
                <option value="all">All Tiers</option>
                <option value="founding">Founding Partner (5-7 Seats)</option>
                <option value="signature">Signature Tier (21,997 EGP)</option>
                <option value="presence">Presence Tier (12,997 EGP)</option>
                <option value="authority">Authority Tier (34,997 EGP+)</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#14131c] border border-[#252335] rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-[var(--accent-purple)]"
              >
                <option value="all">All 17 Statuses</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prospects Grid */}
          <div className="space-y-6">
            {filteredProspects.map((lead, idx) => {
              const googleUrl = getGoogleSearchUrl(lead);
              const igUrl = getInstagramUrl(lead.instagram);
              const webUrl = getWebsiteUrl(lead.website);

              return (
                <div
                  key={lead.id}
                  className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-purple)]/40 transition-all space-y-5 shadow-xl shadow-black/60"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1b1a26] pb-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30 font-bold">
                          #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1} // {lead.grade === 'A' ? 'GRADE A PRIME' : 'GRADE B'}
                        </span>
                        <span className="text-zinc-600 font-mono text-xs">/</span>
                        <span className="text-xs font-mono text-zinc-300 font-medium">{lead.location}</span>
                        <span className="text-zinc-600 font-mono text-xs">/</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">{lead.phone}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex flex-wrap items-baseline gap-2.5">
                        <span>{lead.company}</span>
                        <span className="text-xs sm:text-sm text-zinc-300 font-sans font-normal">
                          — {lead.contact}
                        </span>
                      </h3>
                    </div>

                    {/* Direct Verified Links Row */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <a
                        href={googleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#14141d] hover:bg-[#1f1e2c] text-zinc-200 hover:text-white text-xs font-mono border border-[#2b2a3d] flex items-center gap-1.5 transition-colors"
                        title={`Search Google: ${lead.company}`}
                      >
                        <Search className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                        <span>Google</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                      </a>

                      {igUrl && (
                        <a
                          href={igUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#14141d] hover:bg-[#1f1e2c] text-zinc-200 hover:text-white text-xs font-mono border border-[#2b2a3d] flex items-center gap-1.5 transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                          <span>Instagram</span>
                          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                        </a>
                      )}

                      {webUrl ? (
                        <a
                          href={webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#14141d] hover:bg-[#1f1e2c] text-emerald-400 hover:text-emerald-300 text-xs font-mono border border-[#2b2a3d] flex items-center gap-1.5 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Current Web</span>
                          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                        </a>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] text-xs font-mono border border-[var(--accent-purple)]/25 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 opacity-60" />
                          <span>No Website (Prime Opportunity)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Diagnostic Findings Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0e0d15] border border-[#1f1d2b] space-y-2">
                      <span className="text-[11px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider block">
                        المشروع المرجعي المنفذ (Standout Project):
                      </span>
                      <p className="text-sm sm:text-base font-serif font-bold text-white leading-relaxed">
                        {lead.standoutProject}
                      </p>
                      <p className="text-xs text-zinc-400 font-ar pt-0.5">
                        المدخل الأساسي للمحادثة لكسر نمط الرسائل العشوائية.
                      </p>
                    </div>

                    <div className="lg:col-span-7 p-5 rounded-2xl bg-[#12111b] border border-[#272437] space-y-2">
                      <span className="text-[11px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider block">
                        الفجوة الرقمية ونقطة الاحتكاك المرصودة (The Flaw):
                      </span>
                      <p className="text-sm sm:text-base font-ar text-white font-medium leading-[2.2]">
                        {lead.observedFlaw}
                      </p>
                    </div>
                  </div>

                  {/* Pipeline Status, Tier & Payment Controls */}
                  <div className="p-4 rounded-xl bg-[#0e0d15] border border-[#1d1c2a] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Dropdown */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">الحالة:</span>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="bg-[#15141f] border border-[#2b283d] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[var(--accent-purple)]"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Package Tier Dropdown */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">الباقة:</span>
                        <select
                          value={lead.targetTier}
                          onChange={(e) => updateLeadTier(lead.id, e.target.value as PackageTier)}
                          className="bg-[#15141f] border border-[#2b283d] rounded-xl px-2.5 py-1.5 text-xs text-[var(--accent-purple)] font-mono font-bold focus:outline-none focus:border-[var(--accent-purple)]"
                        >
                          <option value="signature">Signature (21,997 EGP)</option>
                          <option value="presence">Presence (12,997 EGP)</option>
                          <option value="authority">Authority (34,997 EGP+)</option>
                          <option value="founding">Founding Partner (Waived)</option>
                        </select>
                      </div>

                      {/* Payment Status Dropdown */}
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                        <select
                          value={lead.paymentStatus || 'not_sent'}
                          onChange={(e) => updateLeadPaymentStatus(lead.id, e.target.value as PaymentStatus)}
                          className="bg-[#15141f] border border-[#2b283d] rounded-xl px-2.5 py-1.5 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-[var(--accent-purple)]"
                        >
                          {paymentOptions.map((pOpt) => (
                            <option key={pOpt.value} value={pOpt.value}>
                              {pOpt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Operational Triggers */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => handleLaunchCallCockpit(lead)}
                        className="px-3.5 py-2 rounded-xl bg-[#161526] hover:bg-[#201d36] text-purple-300 text-xs font-mono font-medium border border-purple-500/30 flex items-center gap-2 transition-all shadow-sm"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
                        <span>Call Cockpit</span>
                      </button>

                      <button
                        onClick={() => handleCopyWhatsApp(lead)}
                        className="px-3.5 py-2 rounded-xl bg-[#0e1814] hover:bg-[#14241e] text-emerald-300 text-xs font-mono font-medium border border-emerald-500/30 flex items-center gap-2 transition-colors"
                      >
                        {copiedId === lead.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                            <span className="text-emerald-400 font-bold">Copied Pitch</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                            <span>WhatsApp Pitch</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleLaunchProposal(lead)}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/25"
                      >
                        <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span>Draft Proposal</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Google Sheet Tab */}
      {activeTab === 'sheet' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Uncompromising Pipeline Law */}
          <div className="p-6 rounded-2xl bg-[#100e18] border border-[#251f38] space-y-3 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-purple)] font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>THE UNCOMPROMISING PIPELINE LAW</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              "No Lead Without a Next Action."
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl font-ar">
              كل استوديو مسجل داخل المنظومة يجب أن يحتوي على <strong>Next Action</strong> وموعد محدد للتنفيذ. الاتصال أو البحث بدون خطوة تالية يعتبر فاقداً للقيمة التشغيلية.
            </p>
          </div>

          {/* Google Sheet Launcher & Config Box */}
          <div className="p-6 rounded-2xl bg-[#0d0c14] border border-[#1c1b26] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-serif">
                  Master Google Sheet CRM
                </h3>
                <p className="text-xs text-zinc-400">
                  Link your primary Google Spreadsheet to sync outreach and delivery status.
                </p>
              </div>

              <button
                onClick={() => window.open(sheetUrl, '_blank')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Open Google Sheet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Link2 className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full bg-[#13121b] border border-[#232032] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--accent-purple)] font-mono"
                />
              </div>
              <button
                onClick={handleSaveUrl}
                className="px-4 py-2 rounded-xl bg-[var(--accent-purple)] hover:bg-[#6d28d9] text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Saved' : 'Save URL'}</span>
              </button>
            </div>
          </div>

          {/* The 17 CRM Fields Architecture */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-serif text-white tracking-tight">
                  The 17 CRM Standard Fields
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Copy all column headers and paste directly into Row 1 of your Google Sheet.
                </p>
              </div>

              <button
                onClick={handleCopyHeaders}
                className="px-4 py-2 rounded-xl bg-[#12111b] hover:bg-[#1b1926] text-zinc-200 text-xs font-mono font-semibold border border-[#242134] flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                {copiedHeaders ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Headers Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                    <span>Copy All 17 Headers</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {crmFields.map((field, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0d0c14] border border-[#1c1a26] space-y-1 hover:border-[var(--accent-purple)]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} // {field.name}
                    </span>
                    {field.name.includes('Next Action') && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                        MANDATORY
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    {field.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
