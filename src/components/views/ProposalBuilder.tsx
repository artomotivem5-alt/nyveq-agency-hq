import React, { useState, useEffect } from 'react';
import {
  FileText,
  Eye,
  Edit3,
  Save,
  RotateCcw,
  Copy,
  Printer,
  Sparkles,
  Plus,
  Trash2,
  Check,
  ExternalLink,
  Columns,
  Share2,
  MessageSquare,
  Zap,
  Layers,
  ArrowRight,
  BookOpen,
  ChevronDown,
  FolderOpen,
  HelpCircle,
  X,
  Building,
  MapPin,
  User,
  AlertCircle,
  CheckCircle2,
  Building2,
  Globe,
  Instagram,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { ProposalData, ProspectLead } from '../../types';
import { DEFAULT_PROPOSAL } from '../../data/defaultProposal';
import { INITIAL_PROPOSALS_LIBRARY } from '../../data/defaultProposalsList';
import { INITIAL_PROSPECTS } from '../../data/prospectsData';
import { PACKAGE_PRESETS, formatEGP } from '../../data/packageScopes';
import { ProposalClientView } from './ProposalClientView';
import { synthesizeProposal, ProposalTier, SynthesizerParams } from '../../utils/proposalSynthesizer';

export const ProposalBuilder: React.FC = () => {
  // Library of multiple proposals state
  const [library, setLibrary] = useState<ProposalData[]>(() => {
    const saved = localStorage.getItem('nyveq_proposals_library');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_PROPOSALS_LIBRARY;
  });

  // Active Proposal ID
  const [activeId, setActiveId] = useState<string>(() => {
    const savedActive = localStorage.getItem('nyveq_active_proposal_id');
    if (savedActive && library.some((p) => p.id === savedActive)) {
      return savedActive;
    }
    return library[0]?.id || DEFAULT_PROPOSAL.id;
  });

  // Active Proposal object derived from library
  const currentProposal = library.find((p) => p.id === activeId) || library[0] || DEFAULT_PROPOSAL;

  // Local editable copy of current proposal
  const [proposal, setProposal] = useState<ProposalData>(currentProposal);

  // Sync proposal when activeId or library changes externally
  useEffect(() => {
    const found = library.find((p) => p.id === activeId);
    if (found) {
      setProposal(found);
    }
  }, [activeId]);

  // Sync library changes to localStorage
  useEffect(() => {
    localStorage.setItem('nyveq_proposals_library', JSON.stringify(library));
    localStorage.setItem('nyveq_active_proposal_id', activeId);
    localStorage.setItem('nyveq_active_proposal', JSON.stringify(proposal));
  }, [library, activeId, proposal]);

  // UI state controls
  const [activeTab, setActiveTab] = useState<'split' | 'edit' | 'preview' | 'client'>('split');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [synthNotice, setSynthNotice] = useState<string | null>(null);
  const [showLibraryDropdown, setShowLibraryDropdown] = useState(false);
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);
  const [showMasterclassGuide, setShowMasterclassGuide] = useState(true);

  // Available CRM leads for instant client selection
  const [crmLeads] = useState<ProspectLead[]>(() => {
    const saved = localStorage.getItem('nyveq_crm_prospects_v2');
    if (saved) {
      try {
        const parsed: ProspectLead[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_PROSPECTS;
  });

  // Client Selection Mode for Main Synthesizer: 'crm' | 'custom'
  const [synthClientMode, setSynthClientMode] = useState<'crm' | 'custom'>('crm');
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');

  // Client Selection Mode for New Proposal Modal: 'crm' | 'custom'
  const [wizardClientMode, setWizardClientMode] = useState<'crm' | 'custom'>('crm');
  const [wizardSelectedLeadId, setWizardSelectedLeadId] = useState<string>('');

  // Wizard state for creating a new proposal from scratch
  const [newWizardParams, setNewWizardParams] = useState<SynthesizerParams>({
    prospectName: '',
    firmName: '',
    contactTitle: 'Founder & Principal Architect',
    location: 'New Cairo (Katameya Dunes & Fifth Settlement)',
    standoutProject: '',
    observedFlaw: 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
    tier: 'signature',
  });

  // Dynamic Synthesizer Parameters State for active proposal
  const [synthParams, setSynthParams] = useState<SynthesizerParams>({
    prospectName: proposal.clientName || 'Eng. Karim El-Sayed',
    firmName: proposal.companyName || 'KÉRAN Architecture & Interiors',
    contactTitle: proposal.contactPerson || 'Founder & Principal Architect',
    location: 'New Cairo (Katameya Dunes & Fifth Settlement)',
    standoutProject: 'Katameya Dunes Turnkey Private Villa',
    observedFlaw: 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
    tier: 'signature',
  });

  // Check if routed from CRM click with pre-populated target
  useEffect(() => {
    const fromCrm = localStorage.getItem('nyveq_proposal_target');
    if (fromCrm) {
      try {
        const parsed = JSON.parse(fromCrm);
        localStorage.removeItem('nyveq_proposal_target'); // Consume after read

        const generated = synthesizeProposal({
          prospectName: parsed.prospectName || 'Eng. Principal',
          firmName: parsed.firmName || 'Luxury Atelier',
          contactTitle: parsed.contactTitle || 'Founder & Principal Architect',
          location: parsed.location || 'New Cairo & Sheikh Zayed',
          standoutProject: parsed.standoutProject || 'Private Residential Villa',
          observedFlaw: parsed.observedFlaw || 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
          tier: parsed.tier || 'signature',
        });

        // Add to library & set as active
        setLibrary((prev) => [generated, ...prev.filter((p) => p.id !== generated.id)]);
        setActiveId(generated.id);
        setProposal(generated);
        setSynthParams({
          prospectName: generated.clientName,
          firmName: generated.companyName,
          contactTitle: generated.contactPerson,
          location: parsed.location || 'New Cairo & Sheikh Zayed',
          standoutProject: parsed.standoutProject || 'Private Residential Villa',
          observedFlaw: parsed.observedFlaw || 'تشتت صور المشاريع وغياب فلترة الميزانية',
          tier: parsed.tier || 'signature',
        });
        setSynthNotice(`✓ تم توليد عرض جديد مخصص للأتيليه: ${generated.companyName} وإضافته للمكتبة!`);
        setTimeout(() => setSynthNotice(null), 4000);
      } catch (e) {}
    }
  }, []);

  // Update proposal and library simultaneously on save
  const handleSave = () => {
    setLibrary((prev) =>
      prev.map((p) => (p.id === proposal.id ? proposal : p))
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Switch to another proposal in library
  const handleSelectProposal = (selectedId: string) => {
    setActiveId(selectedId);
    const target = library.find((p) => p.id === selectedId);
    if (target) {
      setProposal(target);
      setSynthParams({
        prospectName: target.clientName,
        firmName: target.companyName,
        contactTitle: target.contactPerson,
        location: 'New Cairo & Sheikh Zayed',
        standoutProject: 'Turnkey Luxury Villa',
        observedFlaw: 'تشتت صور المشاريع وغياب فلترة الميزانية',
        tier: target.packageConfig?.tier || (target.id.includes('authority') || target.id.includes('empire') ? 'authority' : target.id.includes('presence') ? 'presence' : target.id.includes('founding') || target.id.includes('beta') ? 'founding' : 'signature'),
      });
    }
    setShowLibraryDropdown(false);
  };

  // Handle client selection for Main Synthesizer console
  const handleSelectLeadForSynthesizer = (leadId: string) => {
    setSelectedLeadId(leadId);
    if (!leadId) return;
    const lead = crmLeads.find((l) => l.id === leadId);
    if (lead) {
      const cleanContact = lead.contact.split('(')[0].trim();
      const contactTitle = lead.contact.includes('(')
        ? lead.contact.split('(')[1].replace(')', '').trim()
        : 'Founder & Principal Architect';

      setSynthParams({
        prospectName: cleanContact,
        firmName: lead.company,
        contactTitle: contactTitle,
        location: lead.location,
        standoutProject: lead.standoutProject,
        observedFlaw: lead.observedFlaw,
        tier: lead.targetTier || 'signature',
      });
      setSynthNotice(`✓ تم جلب وتعبئة كافة بيانات الأتيليه: ${lead.company}! راجع الحقول أدناه أو عدلها قبل التوليد.`);
      setTimeout(() => setSynthNotice(null), 4000);
    }
  };

  // Handle client selection for Wizard modal
  const handleSelectLeadForWizard = (leadId: string) => {
    setWizardSelectedLeadId(leadId);
    if (!leadId) return;
    const lead = crmLeads.find((l) => l.id === leadId);
    if (lead) {
      const cleanContact = lead.contact.split('(')[0].trim();
      const contactTitle = lead.contact.includes('(')
        ? lead.contact.split('(')[1].replace(')', '').trim()
        : 'Founder & Principal Architect';

      setNewWizardParams({
        prospectName: cleanContact,
        firmName: lead.company,
        contactTitle: contactTitle,
        location: lead.location,
        standoutProject: lead.standoutProject,
        observedFlaw: lead.observedFlaw,
        tier: lead.targetTier || 'signature',
      });
    }
  };

  // Generate & Save as brand new standalone proposal in library from synthesizer params
  const handleSynthesizeAsNew = () => {
    if (!synthParams.firmName.trim()) {
      alert('يرجى اختيار مكتب أو كتابة اسم الأتيليه على الأقل!');
      return;
    }

    const generated = synthesizeProposal({
      ...synthParams,
      prospectName: synthParams.prospectName.trim() || 'Eng. Principal Architect',
      standoutProject: synthParams.standoutProject.trim() || 'Private Residential Estate',
    });

    setLibrary((prev) => [generated, ...prev]);
    setActiveId(generated.id);
    setProposal(generated);
    setSynthNotice(`✓ تم توليد العرض الجديد وحفظه في المكتبة للأتيليه: ${generated.companyName}!`);
    setTimeout(() => setSynthNotice(null), 4500);
  };

  // Selected CRM lead object if in CRM mode
  const selectedCrmLead = crmLeads.find((l) => l.id === selectedLeadId);

  // Create a brand new proposal from Wizard
  const handleCreateNewProposal = () => {
    if (!newWizardParams.firmName.trim()) {
      alert('يرجى كتابة اسم المكتب أو الأتيليه على الأقل!');
      return;
    }

    const generated = synthesizeProposal({
      ...newWizardParams,
      prospectName: newWizardParams.prospectName.trim() || 'Eng. Principal Architect',
      standoutProject: newWizardParams.standoutProject.trim() || 'Private Residential Estate',
    });

    setLibrary((prev) => [generated, ...prev]);
    setActiveId(generated.id);
    setProposal(generated);
    setShowNewProposalModal(false);

    // Reset wizard
    setNewWizardParams({
      prospectName: '',
      firmName: '',
      contactTitle: 'Founder & Principal Architect',
      location: 'New Cairo (Katameya Dunes & Fifth Settlement)',
      standoutProject: '',
      observedFlaw: 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
      tier: 'signature',
    });

    setSynthNotice(`✓ تم إنشاء العرض الجديد بنجاح للأتيليه: ${generated.companyName}!`);
    setTimeout(() => setSynthNotice(null), 4000);
  };

  // Duplicate current proposal
  const handleDuplicate = () => {
    const duplicated: ProposalData = {
      ...proposal,
      id: `proposal-${Date.now()}`,
      clientName: `${proposal.clientName} (Copy)`,
      companyName: `${proposal.companyName} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLibrary((prev) => [duplicated, ...prev]);
    setActiveId(duplicated.id);
    setProposal(duplicated);
    setSynthNotice(`✓ تم استنساخ العرض بنجاح لإنشاء نسخة جديدة!`);
    setTimeout(() => setSynthNotice(null), 3000);
  };

  // Delete current proposal
  const handleDeleteProposal = (idToDelete: string) => {
    if (library.length <= 1) {
      alert('لا يمكنك حذف هذا العرض، يجب أن تحتوي المكتبة على عرض واحد على الأقل.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذا العرض من المكتبة نهائياً؟')) {
      const updated = library.filter((p) => p.id !== idToDelete);
      setLibrary(updated);
      const nextActive = updated[0].id;
      setActiveId(nextActive);
      setProposal(updated[0]);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('إعادة ضبط هذا العرض إلى قالب KÉRAN الافتراضي؟')) {
      setProposal(DEFAULT_PROPOSAL);
      setLibrary((prev) =>
        prev.map((p) => (p.id === proposal.id ? { ...DEFAULT_PROPOSAL, id: p.id } : p))
      );
    }
  };

  const handleCopyShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#/proposal`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyWhatsAppProposal = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/proposal`;
    const text = `مساء الخير يا ${proposal.clientName}،

بناءً على تواصلنا بخصوص ${proposal.companyName}، جهزت لحضرتك العرض الفني المتكامل لمنظومة الحضور المعماري الرقمي (Sovereign Digital Showroom):

📌 المشروع: ${proposal.projectTitle}
⏱ الجدول الزمني للتسليم: ${proposal.timeline}
💼 تفاصيل الاستثمار: ${proposal.investment}

🔗 رابط العرض التفاعلي والمواصفات بالكامل:
${shareUrl}

نقدر نحدد موعد سريع لمناقشة التفاصيل وتوقيع الاتفاقية لبدء المرحلة الأولى فور اعتماد حضرتك.`;

    navigator.clipboard.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  // 1-Click Synthesizer Execution on the active proposal
  const handleSynthesize = (tierOverride?: ProposalTier) => {
    const targetTier = tierOverride || synthParams.tier;
    const synthesized = synthesizeProposal({
      ...synthParams,
      tier: targetTier,
    });
    // Preserve current ID
    const updated = { ...synthesized, id: proposal.id };
    setProposal(updated);
    setLibrary((prev) => prev.map((p) => (p.id === proposal.id ? updated : p)));
    setSynthNotice(
      `✓ تم إعادة توليد العرض بالكامل وتحديث كافة الحقول بنجاح لباقة: ${
        targetTier === 'founding' || targetTier === 'beta'
          ? 'الشركاء المؤسسين (Founding Partner - 0 EGP Build Fee)'
          : targetTier === 'presence'
          ? `${PACKAGE_PRESETS.presence.name} (${formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)})`
          : targetTier === 'authority' || targetTier === 'empire'
          ? `${PACKAGE_PRESETS.authority.name} (${formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+)`
          : `${PACKAGE_PRESETS.signature.name} (${formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)})`
      }`
    );
    setTimeout(() => setSynthNotice(null), 4000);
  };

  // List helpers for fine-tuning
  const updateProblem = (index: number, val: string) => {
    const list = [...proposal.identifiedProblems];
    list[index] = val;
    setProposal({ ...proposal, identifiedProblems: list });
  };

  const addProblem = () => {
    setProposal({
      ...proposal,
      identifiedProblems: [...proposal.identifiedProblems, 'نقطة تسريب رقمية جديدة تم رصدها...'],
    });
  };

  const removeProblem = (index: number) => {
    setProposal({
      ...proposal,
      identifiedProblems: proposal.identifiedProblems.filter((_, i) => i !== index),
    });
  };

  const updateScope = (index: number, val: string) => {
    const list = [...proposal.scope];
    list[index] = val;
    setProposal({ ...proposal, scope: list });
  };

  const addScope = () => {
    setProposal({
      ...proposal,
      scope: [...proposal.scope, 'مخرَج تسليم إضافي...'],
    });
  };

  const removeScope = (index: number) => {
    setProposal({
      ...proposal,
      scope: proposal.scope.filter((_, i) => i !== index),
    });
  };

  // If client presentation mode is toggled, render pristine full document
  if (activeTab === 'client') {
    return (
      <ProposalClientView
        data={proposal}
        onBackToEditor={() => setActiveTab('split')}
        isStandalone={false}
      />
    );
  }

  // Render the Form Inputs Component
  const renderEditorForm = () => (
    <div className="space-y-6">
      {/* 1-CLICK DYNAMIC PROPOSAL SYNTHESIZER CONSOLE */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border-2 border-[var(--accent-purple)]/40 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-48 bg-radial from-[var(--accent-purple)]/10 to-transparent blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f1e2a] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30 shadow-md">
              <Zap className="w-5 h-5 text-[var(--accent-purple)]" />
            </div>
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <span>CLIENT SPECIFIC PROPOSAL SYNTHESIZER</span>
                <span className="text-zinc-600">//</span>
                <span className="text-[var(--accent-purple)] font-ar font-serif">منظومة تخصيص وتوليد عروض العملاء</span>
              </h3>
              <p className="text-xs text-zinc-300 font-ar mt-0.5">
                اختر استوديو معماري موثق من قاعدة بيانات الـ CRM أو اكتب بيانات عميل مخصص، راجع بطاقة المواصفات قبل التوليد، ثم اضغط لتوليد العرض فوراً.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 01: INTAKE MODE SELECTOR (اختر من الـ CRM أو اكتب يدوياً) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-mono text-zinc-200 font-bold block font-ar flex items-center gap-1.5">
              <span className="text-[var(--accent-purple)]">01.</span>
              <span>طريقة إدخال معلومات العميل (Client Intake Mode):</span>
            </label>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#09090d] border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setSynthClientMode('crm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  synthClientMode === 'crm'
                    ? 'bg-[var(--accent-purple)] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="font-ar">اختيار استوديو من الـ CRM ({crmLeads.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSynthClientMode('custom');
                  setSelectedLeadId('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  synthClientMode === 'custom'
                    ? 'bg-[var(--accent-purple)] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="font-ar">كتابة بيانات مخصصة يدوياً</span>
              </button>
            </div>
          </div>

          {/* If Mode == CRM: Select Dropdown & Quick Dossier */}
          {synthClientMode === 'crm' ? (
            <div className="p-4 rounded-2xl bg-[#111018] border border-[#2a273b] space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300 font-ar flex items-center justify-between">
                  <span className="text-white font-bold">اختر الأتيليه أو المكتب المعماري المستهدف:</span>
                  <span className="text-[10px] text-[var(--accent-purple)] font-bold">15 استوديو موثق بمشاريعهم وفجواتهم</span>
                </label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => handleSelectLeadForSynthesizer(e.target.value)}
                  className="w-full bg-[#08080b] border-2 border-[#3d3852] focus:border-[var(--accent-purple)] rounded-xl px-3.5 py-2.5 text-xs text-white font-serif tracking-wide focus:outline-none cursor-pointer"
                >
                  <option value="">-- اضغط لاختيار استوديو من قاعدة بيانات الـ CRM --</option>
                  {crmLeads.map((lead) => (
                    <option key={lead.id} value={lead.id} className="bg-[var(--bg-surface)] text-white py-1">
                      {lead.company} — {lead.contact.split('(')[0].trim()} ({lead.location.split('&')[0].trim()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Dossier for selected studio */}
              {selectedCrmLead && (
                <div className="p-3 rounded-xl bg-[#161522] border border-[var(--accent-purple)]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-white text-sm">{selectedCrmLead.company}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        GRADE {selectedCrmLead.grade} PRIME
                      </span>
                    </div>
                    <div className="text-zinc-300 font-mono text-[11px]">
                      {selectedCrmLead.contact} • {selectedCrmLead.location}
                    </div>
                  </div>

                  {/* Verification Quick Links */}
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCrmLead.instagram && (
                      <a
                        href={selectedCrmLead.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-[#24172a] hover:bg-[#341e3d] text-pink-300 font-mono text-[10px] font-bold border border-pink-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <Instagram className="w-3 h-3 text-pink-400" />
                        <span>Instagram</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </a>
                    )}
                    {selectedCrmLead.website && selectedCrmLead.website !== 'NONE' && (
                      <a
                        href={selectedCrmLead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-[#14232c] hover:bg-[#1a3240] text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <Globe className="w-3 h-3 text-cyan-400" />
                        <span>Website</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(selectedCrmLead.googleQuery || selectedCrmLead.company)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-[#171b26] hover:bg-[#202738] text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30 flex items-center gap-1.5 transition-colors"
                    >
                      <Search className="w-3 h-3 text-blue-400" />
                      <span>Google</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#111018] border border-[#2a273b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
                  <Edit3 className="w-3.5 h-3.5" />
                </span>
                <span className="font-ar text-zinc-300">
                  أنت الآن في وضع <strong className="text-white">الكتابة اليدوية المخصصة</strong>. اكتب أي بيانات لمكتب جديد بالكامل في الحقول أدناه.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSynthParams({
                    prospectName: '',
                    firmName: '',
                    contactTitle: 'Founder & Principal Architect',
                    location: 'New Cairo & Sheikh Zayed',
                    standoutProject: '',
                    observedFlaw: '',
                    tier: 'turnkey',
                  });
                }}
                className="px-2.5 py-1 rounded-lg bg-[#1a1926] hover:bg-[#252336] text-zinc-300 text-[10px] font-mono border border-[#322f47] cursor-pointer"
              >
                مسح الحقول للبدء من الصفر
              </button>
            </div>
          )}
        </div>

        {/* STEP 02: EDITABLE CLIENT & PROJECT INPUTS (تعديل وتدقيق الحقول المكتوبة أو المختارة) */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono text-zinc-200 font-bold block font-ar flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--accent-purple)]">02.</span>
              <span>مراجعة وتدقيق حقول العميل (يمكنك كتابة أو تعديل أي حقل بحرية):</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-normal">تتزامن هذه الحقول مباشرة مع بنود العرض</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-mono text-zinc-300 font-ar flex items-center justify-between mb-1">
                <span className="font-bold text-white">اسم العميل / المعماري الرئيسي:</span>
                <span className="text-[10px] text-zinc-400">مثال: م. كريم السعيد</span>
              </label>
              <input
                type="text"
                value={synthParams.prospectName}
                onChange={(e) => setSynthParams({ ...synthParams, prospectName: e.target.value })}
                className="w-full bg-[#09090d] border border-[#272538] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                placeholder="مهندس كريم السعيد"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-300 font-ar flex items-center justify-between mb-1">
                <span className="font-bold text-white">اسم الأتيليه / المكتب:</span>
                <span className="text-[10px] text-zinc-400">الاسم التجاري للمكتب</span>
              </label>
              <input
                type="text"
                value={synthParams.firmName}
                onChange={(e) => setSynthParams({ ...synthParams, firmName: e.target.value })}
                className="w-full bg-[#09090d] border border-[#272538] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                placeholder="KÉRAN Architecture & Interiors"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-300 font-ar flex items-center justify-between mb-1">
                <span className="font-bold text-white">المنطقة الجغرافية / السوق:</span>
                <span className="text-[10px] text-zinc-400">الكمبوندات أو المدن</span>
              </label>
              <input
                type="text"
                value={synthParams.location}
                onChange={(e) => setSynthParams({ ...synthParams, location: e.target.value })}
                className="w-full bg-[#09090d] border border-[#272538] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                placeholder="New Cairo (Katameya Dunes & Fifth Settlement)"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-300 font-ar flex items-center justify-between mb-1">
                <span className="font-bold text-[var(--accent-purple)]">المشروع البارز (الـ Anchor Project):</span>
                <span className="text-[10px] text-[var(--accent-purple)] font-bold">أفخم فيلا سلموها</span>
              </label>
              <input
                type="text"
                value={synthParams.standoutProject}
                onChange={(e) => setSynthParams({ ...synthParams, standoutProject: e.target.value })}
                className="w-full bg-[#09090d] border border-[#272538] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                placeholder="فيلا القطامية ديونز المسلّمة ع المفتاح"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-zinc-300 font-ar flex items-center justify-between mb-1">
              <span className="font-bold text-amber-300">الفجوة الرقمية أو الألم المرصود في حسابهم (Diagnosed Flaw):</span>
              <span className="text-[10px] text-zinc-400 font-normal">النقطة التي ستكسر نمطهم في المكالمة</span>
            </label>
            <input
              type="text"
              value={synthParams.observedFlaw}
              onChange={(e) => setSynthParams({ ...synthParams, observedFlaw: e.target.value })}
              className="w-full bg-[#09090d] border border-[#272538] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              placeholder="تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP"
            />
          </div>
        </div>

        {/* STEP 03: COMMERCIAL TIER SELECTOR */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-200 font-bold block font-ar flex items-center gap-1.5">
            <span className="text-[var(--accent-purple)]">03.</span>
            <span>اختر الباقة التجارية وشروط الاستثمار (Commercial Tier):</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Tier 1 Presence */}
            <div
              onClick={() => setSynthParams({ ...synthParams, tier: 'presence' })}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                synthParams.tier === 'presence'
                  ? 'bg-[#171524] border-[var(--accent-purple)] shadow-lg shadow-[var(--accent-purple)]/20'
                  : 'bg-[#09090d] border-[var(--border-subtle)] hover:border-[#2a2938]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold">
                  FOUNDATION
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{PACKAGE_PRESETS.presence.timeline}</span>
              </div>
              <div className="text-xs font-serif font-bold text-white">{PACKAGE_PRESETS.presence.name}</div>
              <div className="text-xs text-zinc-200 mt-1 font-mono font-bold">{formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-ar">صفحة معمارية و8 مشاريع (جولتان مراجعة)</div>
            </div>

            {/* Tier 2 Signature (Recommended) */}
            <div
              onClick={() => setSynthParams({ ...synthParams, tier: 'signature' })}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                synthParams.tier === 'signature'
                  ? 'bg-[#171524] border-[var(--accent-purple)] shadow-lg shadow-[var(--accent-purple)]/20'
                  : 'bg-[#09090d] border-[var(--border-subtle)] hover:border-[#2a2938]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)] text-black font-bold">
                  RECOMMENDED
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-purple)] font-bold">{PACKAGE_PRESETS.signature.timeline}</span>
              </div>
              <div className="text-xs font-serif font-bold text-white">{PACKAGE_PRESETS.signature.name}</div>
              <div className="text-xs text-[var(--accent-purple)] mt-1 font-mono font-bold">{formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-ar">3–5 صفحات و15 مشروعاً (3 جولات مراجعة)</div>
            </div>

            {/* Tier 3 Authority */}
            <div
              onClick={() => setSynthParams({ ...synthParams, tier: 'authority' })}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                synthParams.tier === 'authority'
                  ? 'bg-[#171524] border-[var(--accent-purple)] shadow-lg shadow-[var(--accent-purple)]/20'
                  : 'bg-[#09090d] border-[var(--border-subtle)] hover:border-[#2a2938]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  AUTHORITY
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{PACKAGE_PRESETS.authority.timeline}</span>
              </div>
              <div className="text-xs font-serif font-bold text-white">{PACKAGE_PRESETS.authority.name}</div>
              <div className="text-xs text-zinc-200 mt-1 font-mono font-bold">{formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-ar">حتى 12 صفحة وبنية ثنائية اللغة AR/EN (4 جولات)</div>
            </div>

            {/* Tier 4 Founding Partner */}
            <div
              onClick={() => setSynthParams({ ...synthParams, tier: 'founding' })}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                synthParams.tier === 'founding'
                  ? 'bg-[#171524] border-[var(--accent-purple)] shadow-lg shadow-[var(--accent-purple)]/20'
                  : 'bg-[#09090d] border-[var(--border-subtle)] hover:border-[#2a2938]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] border border-[var(--accent-purple)]/40 font-bold">
                  5–7 SEATS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">معفي 100%</span>
              </div>
              <div className="text-xs font-serif font-bold text-white">Founding Partner</div>
              <div className="text-xs text-emerald-400 mt-1 font-mono font-bold">0 EGP Build Fee</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-ar">مقابل دراسة حالة موثقة وشهادة فيديو</div>
            </div>
          </div>
        </div>

        {/* STEP 04: PRE-GENERATION BLUEPRINT REVIEW CARD (بطاقة مراجعة وتأكيد بيانات العميل قبل عمل البوربوزال) */}
        <div className="p-4 rounded-2xl bg-[#08070d] border-2 border-[var(--accent-purple)]/50 space-y-3 shadow-inner">
          <div className="flex items-center justify-between border-b border-[#1f1d2b] pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-purple)]" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                PRE-GENERATION BLUEPRINT REVIEW // بطاقة تدقيق ومراجعة بيانات العميل قبل التوليد
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--accent-purple)] font-ar">
              جاهز للتوليد والمزامنة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0f0e17] border border-[#232032] space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block font-ar">الأتيليه والمعماري المسؤول:</span>
              <div className="text-white font-serif font-bold text-sm">
                {synthParams.firmName || 'لم يُحدد اسم المكتب'}
              </div>
              <div className="text-[var(--accent-purple)] font-mono text-[11px]">
                {synthParams.prospectName || 'لم يُحدد اسم الشخص'} ({synthParams.contactTitle})
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f0e17] border border-[#232032] space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block font-ar">الموقع وسابقة الأعمال (Anchor Project):</span>
              <div className="text-white font-bold text-xs">
                {synthParams.standoutProject || 'لم يُحدد مشروع بارز'}
              </div>
              <div className="text-zinc-300 font-mono text-[11px]">
                {synthParams.location || 'لم يُحدد الموقع'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f0e17] border border-[#232032] space-y-1 md:col-span-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase block font-ar">الفجوة الرقمية المشخصة (The Diagnosed Vulnerability):</span>
              <div className="text-zinc-200 font-ar text-xs leading-relaxed">
                {synthParams.observedFlaw || 'لم تُحدد فجوة رقمية بعد'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f0e17] border border-[#232032] space-y-1 md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block font-ar">الباقة الاستثمارية المعتمدة:</span>
                <div className="text-white font-serif font-bold text-xs">
                  {synthParams.tier === 'presence'
                    ? `${PACKAGE_PRESETS.presence.name} (${formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)}) — ${PACKAGE_PRESETS.presence.timeline}`
                    : synthParams.tier === 'signature'
                    ? `${PACKAGE_PRESETS.signature.name} (${formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)}) — ${PACKAGE_PRESETS.signature.timeline} (Recommended)`
                    : synthParams.tier === 'authority'
                    ? `${PACKAGE_PRESETS.authority.name} (${formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+) — ${PACKAGE_PRESETS.authority.timeline}`
                    : `Founding Partner (0 EGP Build Fee Waived) — ${PACKAGE_PRESETS.founding.timeline}`}
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] font-bold border border-[var(--accent-purple)]/30 shrink-0">
                جاهز للتطبيق الفوري
              </span>
            </div>
          </div>
        </div>

        {/* STEP 05: DUAL ACTION BUTTONS (تحديث الحالي أو حفظ كعرض جديد) */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSynthesize()}
            className="py-3 px-4 rounded-xl bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)] text-black text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-purple)]/20 transition-all active:scale-[0.99] cursor-pointer"
          >
            <Zap className="w-4 h-4 text-black" />
            <span className="font-ar">✨ توليد وتحديث هذا العرض الحالي (Apply to Current)</span>
          </button>

          <button
            type="button"
            onClick={handleSynthesizeAsNew}
            className="py-3 px-4 rounded-xl bg-[#171524] hover:bg-[#232036] text-[var(--accent-purple)] hover:text-white text-xs font-mono font-bold border border-[var(--accent-purple)]/40 flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[var(--accent-purple)]" />
            <span className="font-ar">➕ حفظ كعرض جديد مستقل في المكتبة (Save as New)</span>
          </button>
        </div>

        {/* Synthesis Notice */}
        {synthNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-ar">{synthNotice}</span>
          </div>
        )}
      </div>

      {/* Granular Section 1: Client & Project Meta */}
      <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-purple)] font-bold">
            01 // Client &amp; Metadata
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 font-ar">بيانات العميل والمشروع</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Client Full Name</label>
            <input
              type="text"
              value={proposal.clientName}
              onChange={(e) => setProposal({ ...proposal, clientName: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Company / Atelier Name</label>
            <input
              type="text"
              value={proposal.companyName}
              onChange={(e) => setProposal({ ...proposal, companyName: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Contact Person Title</label>
            <input
              type="text"
              value={proposal.contactPerson}
              onChange={(e) => setProposal({ ...proposal, contactPerson: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Proposal Date</label>
            <input
              type="text"
              value={proposal.proposalDate}
              onChange={(e) => setProposal({ ...proposal, proposalDate: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-300 font-mono">Project Title</label>
          <input
            type="text"
            value={proposal.projectTitle}
            onChange={(e) => setProposal({ ...proposal, projectTitle: e.target.value })}
            className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
          />
        </div>
      </div>

      {/* Granular Section 2: Current Situation & Problems */}
      <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-purple)] font-bold">
            02 // Diagnostics &amp; Strategic Gap
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 font-ar">التشخيص والفجوة الرقمية</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-300 font-mono">Current Situation Diagnostic</label>
          <textarea
            rows={3}
            value={proposal.currentSituation}
            onChange={(e) => setProposal({ ...proposal, currentSituation: e.target.value })}
            className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-300 font-mono">Specific Portfolio Observation</label>
          <textarea
            rows={2}
            value={proposal.specificObservations}
            onChange={(e) => setProposal({ ...proposal, specificObservations: e.target.value })}
            className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-zinc-300 font-mono">
              Identified Problems &amp; Leakage Points ({proposal.identifiedProblems.length})
            </label>
            <button
              onClick={addProblem}
              className="text-xs font-mono text-[var(--accent-purple)] hover:text-[var(--accent-purple)] flex items-center gap-1 font-bold"
            >
              <Plus className="w-3 h-3" />
              <span>Add Point</span>
            </button>
          </div>

          <div className="space-y-2">
            {proposal.identifiedProblems.map((prob, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={prob}
                  onChange={(e) => updateProblem(i, e.target.value)}
                  className="flex-1 bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
                <button
                  onClick={() => removeProblem(i)}
                  className="p-1.5 text-zinc-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-300 font-mono">The Strategic Opportunity</label>
          <textarea
            rows={2}
            value={proposal.opportunity}
            onChange={(e) => setProposal({ ...proposal, opportunity: e.target.value })}
            className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Granular Section 3: Recommended Solution & Scope */}
      <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-purple)] font-bold">
            03 // Solution &amp; Scope
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 font-ar">الحل المعماري ونطاق التسليم</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-300 font-mono">Recommended Solution</label>
          <textarea
            rows={3}
            value={proposal.recommendedSolution}
            onChange={(e) => setProposal({ ...proposal, recommendedSolution: e.target.value })}
            className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-zinc-300 font-mono">
              Scope of Delivery ({proposal.scope.length})
            </label>
            <button
              onClick={addScope}
              className="text-xs font-mono text-[var(--accent-purple)] hover:text-[var(--accent-purple)] flex items-center gap-1 font-bold"
            >
              <Plus className="w-3 h-3" />
              <span>Add Scope Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {proposal.scope.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateScope(i, e.target.value)}
                  className="flex-1 bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
                />
                <button
                  onClick={() => removeScope(i)}
                  className="p-1.5 text-zinc-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Granular Section 4: Investment, Deposit & Terms */}
      <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-purple)] font-bold">
            04 // Investment &amp; Terms
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 font-ar">الاستثمار والدفعات</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Total Investment</label>
            <input
              type="text"
              value={proposal.investment}
              onChange={(e) => setProposal({ ...proposal, investment: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] font-mono font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Commitment Deposit</label>
            <input
              type="text"
              value={proposal.deposit}
              onChange={(e) => setProposal({ ...proposal, deposit: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Remaining Balance</label>
            <input
              type="text"
              value={proposal.remainingPayment}
              onChange={(e) => setProposal({ ...proposal, remainingPayment: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Timeline &amp; Duration</label>
            <input
              type="text"
              value={proposal.timeline}
              onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-300 font-mono">Post-Launch Support</label>
            <input
              type="text"
              value={proposal.includedSupport}
              onChange={(e) => setProposal({ ...proposal, includedSupport: e.target.value })}
              className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-300 font-mono">Direct Next Step Text</label>
          <textarea
            rows={2}
            value={proposal.nextStep}
            onChange={(e) => setProposal({ ...proposal, nextStep: e.target.value })}
            className="w-full bg-[#09090d] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. TOP CLIENT PROPOSAL MANAGER & SWITCHER BAR */}
      <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-purple)]/40 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Current Active Proposal Info & Dropdown Switcher */}
        <div className="relative w-full lg:w-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-ar">
              العرض النشط حالياً في الاستوديو ({library.length} عروض محفوظة):
            </span>
          </div>

          <button
            onClick={() => setShowLibraryDropdown(!showLibraryDropdown)}
            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-purple)] text-left transition-all w-full lg:min-w-[340px] shadow-sm"
          >
            <div className="space-y-0.5 truncate">
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif font-bold text-white truncate">
                  {proposal.companyName || 'Unnamed Studio'}
                </span>
                <span className="text-xs font-mono text-[var(--accent-purple)] font-bold">
                  {proposal.clientName}
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-400 truncate">
                {proposal.investment} • {proposal.timeline}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-[var(--accent-purple)] transition-transform ${showLibraryDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Proposals Dropdown Menu */}
          {showLibraryDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full lg:w-96 bg-[var(--bg-surface)] border border-[var(--accent-purple)]/50 rounded-2xl shadow-2xl z-40 p-2 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider border-b border-[#1f1e2a] font-ar">
                اختر العرض المراد تعديله أو معاينته:
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {library.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProposal(item.id)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      item.id === activeId
                        ? 'bg-[#181622] border border-[var(--accent-purple)] text-white'
                        : 'hover:bg-[var(--bg-elevated)] text-zinc-300'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs font-serif font-bold text-white truncate">
                        {item.companyName}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate">
                        {item.clientName} • {item.investment}
                      </div>
                    </div>
                    {item.id === activeId && (
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
          {/* Masterclass Guide Toggle */}
          <button
            onClick={() => setShowMasterclassGuide(!showMasterclassGuide)}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--bg-elevated)] hover:bg-[#181822] text-[var(--accent-purple)] border border-[var(--border-subtle)] hover:border-[var(--accent-purple)]/40 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
            <span className="font-ar">{showMasterclassGuide ? 'إخفاء دليل التدريب' : '🎓 كيف تعمل عرضاً جديداً؟'}</span>
          </button>

          {/* New Client Proposal Button */}
          <button
            onClick={() => setShowNewProposalModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)] text-black border border-[var(--accent-purple)] flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="font-ar">+ إنشاء عرض لعميل جديد</span>
          </button>

          {/* Duplicate Button */}
          <button
            onClick={handleDuplicate}
            className="px-3 py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[#181822] text-zinc-200 text-xs font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-purple)]/40 flex items-center gap-1.5 transition-colors"
            title="Duplicate current proposal"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>نسخ</span>
          </button>

          {/* Delete Button */}
          {library.length > 1 && (
            <button
              onClick={() => handleDeleteProposal(proposal.id)}
              className="p-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-[var(--border-subtle)] hover:border-rose-800 transition-colors"
              title="Delete proposal from library"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)] text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>تم الحفظ!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>حفظ التعديلات</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. MASTERCLASS EDUCATIONAL GUIDE (Collapsible Step-by-Step Walkthrough) */}
      {showMasterclassGuide && (
        <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--accent-purple)]/30 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#1f1e2a] pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
                <BookOpen className="w-4 h-4 text-[var(--accent-purple)]" />
              </span>
              <div>
                <h2 className="text-sm font-serif font-bold text-white font-ar tracking-wide">
                  دليل تدريب الخبير: كيف تُنشئ وتُغلق عرضاً معمارياً مخصصاً في 5 دقائق؟
                </h2>
                <p className="text-xs text-zinc-300 font-ar mt-0.5">
                  أنت لا تحتاج لكتابة 20 صفحة من الصفر. تحتاج فقط إلى 5 معلومات محددة تستخرجها من حساب الاستوديو، وسيقوم النظام بتوليد العرض بالكامل.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowMasterclassGuide(false)}
              className="p-1 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-ar">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] font-bold">
                  خطوة 01
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">5 دقائق بحث</span>
              </div>
              <h3 className="font-bold text-white text-sm">استخراج الـ 5 معلومات الأساسية</h3>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                ادخل إنستجرام الأتيليه وسجل:
                <br />1. اسم المعماري وصاحب المكتب.
                <br />2. اسم الأتيليه ومقر أعمالهم (التجمع/زايد).
                <br />3. أهم فيلا سلموها (مثل "فيلا القطامية").
                <br />4. الفجوة الرقمية (مثل تشتت الصور أو غياب فلترة للميزانيات).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] font-bold">
                  خطوة 02
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">استراتيجية</span>
              </div>
              <h3 className="font-bold text-white text-sm">اختيار الباقة المعتمدة (Approved V1)</h3>
              <p className="text-zinc-300 leading-relaxed text-[11px] space-y-1">
                <span className="block"><strong className="text-[var(--accent-purple)]">Founding Partner (0 EGP + 997/mo):</strong> مخصصة لـ 5–7 مكاتب مختارة لبناء دراسة حالة مشتركة وتوثيق مرئي.</span>
                <span className="block"><strong className="text-blue-300">Presence (12,997 EGP + 997/mo):</strong> مونوغراف معماري سريع (صفحة واحدة، 8 مشاريع) للانتقال لما وراء إنستغرام.</span>
                <span className="block"><strong className="text-amber-300">Signature (21,997 EGP + 1,497/mo):</strong> المعيار الأكثر ترشيحاً (3–5 صفحات، فلترة ميزانيات) لقصور التجمع وزايد.</span>
                <span className="block"><strong className="text-emerald-300">Authority (34,997 EGP+ + 1,997/mo):</strong> منصة صرحية ثنائية اللغة لمقاولي النخبة والمستثمرين الإقليميين.</span>
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] font-bold">
                  خطوة 03
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">توليد فوري</span>
              </div>
              <h3 className="font-bold text-white text-sm">التوليد الآلي بضغطة زر</h3>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                اضغط على زر <strong>[+ إنشاء عرض لعميل جديد]</strong>، أدخل البيانات الخمسة، واضغط <strong>[توليد العرض]</strong>. المنظومة ستقوم أوتوماتيكياً بصياغة التشخيص، النطاق، سلايدرات التحول، والجدول الزمني بالكامل وحفظه في مكتبتك.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] font-bold">
                  خطوة 04
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">إغلاق العقد</span>
              </div>
              <h3 className="font-bold text-white text-sm">الإرسال والمتابعة الذكية</h3>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                • اضغط <strong>[WhatsApp Pitch]</strong> لنسخ رسالة جاهزة تتضمن الرابط المباشر.
                <br />• اضغط <strong>[Launch Client Presentation Mode]</strong> لعرض الـ Monograph الفاخر كصفحة ويب أو حفظه كـ PDF رسمي مطبوع.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUB-HEADER & SHARING CHANNELS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--accent-purple)] uppercase tracking-wider mb-2">
            <FileText className="w-3 h-3 text-[var(--accent-purple)]" />
            <span>SOVEREIGN PROPOSAL ENGINE // {proposal.companyName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Interactive Proposal Studio.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
            Real-time split-screen synthesizer. Generate 1-click tailored luxury proposals and replace static PDFs with dynamic interactive experiences.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Pitch Message Copy Button */}
          <button
            onClick={handleCopyWhatsAppProposal}
            className="px-3.5 py-2 rounded-xl bg-[#13231b] hover:bg-[#193228] text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5 transition-colors shadow-sm"
            title="Copy ready-to-send WhatsApp proposal pitch"
          >
            {copiedWhatsApp ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">WhatsApp Copied!</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Pitch</span>
              </>
            )}
          </button>

          {/* Share Link Button */}
          <button
            onClick={handleCopyShareLink}
            className="px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[#181822] text-zinc-200 text-xs font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-purple)]/40 flex items-center gap-1.5 transition-colors"
            title="Copy public client view link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. MODE SWITCHER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'split'
                ? 'bg-[var(--accent-purple)] text-black shadow-md'
                : 'bg-[var(--bg-elevated)] text-zinc-300 hover:text-white border border-[var(--border-subtle)]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'edit'
                ? 'bg-[var(--accent-purple)] text-black shadow-md'
                : 'bg-[var(--bg-elevated)] text-zinc-300 hover:text-white border border-[var(--border-subtle)]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Full Form</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-[var(--accent-purple)] text-black shadow-md'
                : 'bg-[var(--bg-elevated)] text-zinc-300 hover:text-white border border-[var(--border-subtle)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Full Preview</span>
          </button>
        </div>

        {/* Client Mode Trigger */}
        <button
          onClick={() => setActiveTab('client')}
          className="px-4 py-1.5 rounded-xl bg-[#141220] hover:bg-[#1a1728] text-[var(--accent-purple)] text-xs font-mono font-bold border border-[var(--accent-purple)]/40 flex items-center gap-1.5 transition-all shadow"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
          <span>Launch Client Presentation Mode</span>
        </button>
      </div>

      {/* 5. MAIN VIEWPORT CONTENT */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column: Editor (5 cols) */}
          <div className="xl:col-span-5 h-[calc(100vh-240px)] overflow-y-auto pr-2 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold">
                EDITOR &amp; SYNTHESIS ENGINE (REAL-TIME REACTIVE)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">Live Sync ON</span>
            </div>
            {renderEditorForm()}
          </div>

          {/* Right Column: Live Luxury Preview (7 cols) */}
          <div className="xl:col-span-7 h-[calc(100vh-240px)] overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[#060609] shadow-2xl">
            <div className="sticky top-0 z-20 bg-[#0a0a0e]/95 backdrop-blur px-4 py-2 border-b border-[#201f2c] flex items-center justify-between text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">LIVE EDITORIAL PREVIEW</span>
              </div>
              <button
                onClick={() => window.print()}
                className="px-2.5 py-1 rounded bg-[var(--bg-elevated)] hover:bg-[#181822] text-xs text-zinc-200 border border-[var(--border-subtle)] hover:border-[var(--accent-purple)]/40 flex items-center gap-1 transition-colors"
              >
                <Printer className="w-3 h-3 text-[var(--accent-purple)]" />
                <span>Print / PDF</span>
              </button>
            </div>
            <div className="scale-[0.9] origin-top p-2">
              <ProposalClientView
                data={proposal}
                onBackToEditor={() => setActiveTab('split')}
                isStandalone={true}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'edit' && (
        <div className="max-w-4xl mx-auto">{renderEditorForm()}</div>
      )}

      {activeTab === 'preview' && (
        <div className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl">
          <ProposalClientView
            data={proposal}
            onBackToEditor={() => setActiveTab('split')}
            isStandalone={true}
          />
        </div>
      )}

      {/* 6. MODAL: CREATE NEW PROPOSAL FOR ANY CLIENT */}
      {showNewProposalModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[var(--bg-surface)] border-2 border-[var(--accent-purple)] rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#1f1e2a] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30">
                  <Plus className="w-4 h-4 text-[var(--accent-purple)]" />
                </span>
                <div>
                  <h3 className="text-base font-serif font-bold text-white font-ar">
                    إنشاء عرض مخصص لعميل جديد (New Proposal Wizard)
                  </h3>
                  <p className="text-xs text-zinc-400 font-ar">
                    اختر استوديو من الـ CRM أو اكتب بياناته يدوياً قبل توليد العرض وحفظه
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewProposalModal(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher in Modal */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#12111b] border border-[#232032]">
              <button
                type="button"
                onClick={() => setWizardClientMode('crm')}
                className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  wizardClientMode === 'crm'
                    ? 'bg-[var(--accent-purple)] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="font-ar">اختيار من مكاتب الـ CRM ({crmLeads.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setWizardClientMode('custom');
                  setWizardSelectedLeadId('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  wizardClientMode === 'custom'
                    ? 'bg-[var(--accent-purple)] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="font-ar">كتابة عميل جديد يدوياً</span>
              </button>
            </div>

            {/* CRM Dropdown if CRM Mode */}
            {wizardClientMode === 'crm' && (
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300 font-ar block">
                  اختر الأتيليه المعماري المستهدف:
                </label>
                <select
                  value={wizardSelectedLeadId}
                  onChange={(e) => handleSelectLeadForWizard(e.target.value)}
                  className="w-full bg-[#12111b] border-2 border-[#3d3852] focus:border-[var(--accent-purple)] rounded-xl px-3.5 py-2.5 text-xs text-white font-serif tracking-wide focus:outline-none cursor-pointer"
                >
                  <option value="">-- اضغط لاختيار استوديو من الـ CRM --</option>
                  {crmLeads.map((lead) => (
                    <option key={lead.id} value={lead.id} className="bg-[var(--bg-surface)] text-white">
                      {lead.company} — {lead.contact.split('(')[0].trim()} ({lead.location.split('&')[0].trim()})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Commercial Tier Selector in Modal */}
            <div className="space-y-1.5 font-ar text-xs">
              <label className="font-bold text-zinc-200 block">اختر الباقة التجارية:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setNewWizardParams({ ...newWizardParams, tier: 'presence' })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    newWizardParams.tier === 'presence'
                      ? 'bg-[#161420] border-[var(--accent-purple)] text-[var(--accent-purple)] font-bold shadow-md'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-zinc-400'
                  }`}
                >
                  <div>Presence</div>
                  <div className="text-[10px] font-mono">{formatEGP(PACKAGE_PRESETS.presence.standardBuildFee)} ({PACKAGE_PRESETS.presence.timeline.split(' ')[0]})</div>
                </button>
                <button
                  type="button"
                  onClick={() => setNewWizardParams({ ...newWizardParams, tier: 'signature' })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    newWizardParams.tier === 'signature'
                      ? 'bg-[#161420] border-[var(--accent-purple)] text-[var(--accent-purple)] font-bold shadow-md'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-zinc-400'
                  }`}
                >
                  <div>Signature (مرشح)</div>
                  <div className="text-[10px] font-mono">{formatEGP(PACKAGE_PRESETS.signature.standardBuildFee)} ({PACKAGE_PRESETS.signature.timeline.split(' ')[0]})</div>
                </button>
                <button
                  type="button"
                  onClick={() => setNewWizardParams({ ...newWizardParams, tier: 'authority' })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    newWizardParams.tier === 'authority'
                      ? 'bg-[#161420] border-[var(--accent-purple)] text-[var(--accent-purple)] font-bold shadow-md'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-zinc-400'
                  }`}
                >
                  <div>Authority</div>
                  <div className="text-[10px] font-mono">{formatEGP(PACKAGE_PRESETS.authority.standardBuildFee)}+ ({PACKAGE_PRESETS.authority.timeline.split(' ')[0]})</div>
                </button>
                <button
                  type="button"
                  onClick={() => setNewWizardParams({ ...newWizardParams, tier: 'founding' })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    newWizardParams.tier === 'founding'
                      ? 'bg-[#161420] border-[var(--accent-purple)] text-[var(--accent-purple)] font-bold shadow-md'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-zinc-400'
                  }`}
                >
                  <div>Founding Partner</div>
                  <div className="text-[10px] font-mono">معفي 100% ({PACKAGE_PRESETS.founding.timeline.split(' ')[0]})</div>
                </button>
              </div>
            </div>

            {/* Form inputs in Modal */}
            <div className="space-y-3 font-ar text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">اسم المعماري أو صاحب المكتب:</label>
                  <input
                    type="text"
                    value={newWizardParams.prospectName}
                    onChange={(e) => setNewWizardParams({ ...newWizardParams, prospectName: e.target.value })}
                    placeholder="مثال: مهندس هاني سعد"
                    className="w-full bg-[#09090d] border border-[var(--border-subtle)] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">اسم الاستوديو أو الأتيليه:</label>
                  <input
                    type="text"
                    value={newWizardParams.firmName}
                    onChange={(e) => setNewWizardParams({ ...newWizardParams, firmName: e.target.value })}
                    placeholder="مثال: Hany Saad Innovations"
                    className="w-full bg-[#09090d] border border-[var(--border-subtle)] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">المنطقة الجغرافية / الكمبوندات:</label>
                  <input
                    type="text"
                    value={newWizardParams.location}
                    onChange={(e) => setNewWizardParams({ ...newWizardParams, location: e.target.value })}
                    placeholder="مثال: القطامية ديونز والتجمع الخامس"
                    className="w-full bg-[#09090d] border border-[var(--border-subtle)] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium text-[var(--accent-purple)]">المشروع البارز (الـ Anchor Project):</label>
                  <input
                    type="text"
                    value={newWizardParams.standoutProject}
                    onChange={(e) => setNewWizardParams({ ...newWizardParams, standoutProject: e.target.value })}
                    placeholder="مثال: فيلا القطامية ديونز المسلّمة ع المفتاح"
                    className="w-full bg-[#09090d] border border-[var(--border-subtle)] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 block mb-1 font-medium text-amber-300">الفجوة الرقمية أو الألم المرصود في حسابهم:</label>
                <input
                  type="text"
                  value={newWizardParams.observedFlaw}
                  onChange={(e) => setNewWizardParams({ ...newWizardParams, observedFlaw: e.target.value })}
                  placeholder="مثال: تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP"
                  className="w-full bg-[#09090d] border border-[var(--border-subtle)] focus:border-[var(--accent-purple)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Pre-Generation Summary Box inside Modal */}
            <div className="p-3.5 rounded-2xl bg-[#08070d] border border-[var(--accent-purple)]/40 space-y-2 text-xs font-ar">
              <div className="text-[11px] font-mono text-[var(--accent-purple)] font-bold uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                <span>ملخص بيانات العرض قبل الحفظ (Pre-Generation Blueprint):</span>
              </div>
              <div className="text-zinc-300 text-[11px] space-y-1">
                <div>• العميل: <strong className="text-white">{newWizardParams.firmName || 'لم يُحدد'}</strong> — {newWizardParams.prospectName || 'لم يُحدد'}</div>
                <div>• المشروع والمنطقة: {newWizardParams.standoutProject || '—'} ({newWizardParams.location || '—'})</div>
                <div>• الباقة: <span className="text-[var(--accent-purple)] font-bold">{newWizardParams.tier.toUpperCase()}</span></div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 font-ar">
              <button
                type="button"
                onClick={() => setShowNewProposalModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleCreateNewProposal}
                className="px-6 py-2.5 rounded-xl bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)] text-black text-xs font-mono font-bold transition-all shadow-lg shadow-[var(--accent-purple)]/20 flex items-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>توليد وحفظ العرض في المكتبة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
