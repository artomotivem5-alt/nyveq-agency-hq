import React, { useState, useEffect } from 'react';
import { ProposalData, PackageTier, ScopeItem } from '../../types';
import {
  CheckCircle2,
  Calendar,
  DollarSign,
  ShieldCheck,
  Printer,
  Sparkles,
  ArrowRight,
  Clock,
  Building,
  Check,
  Globe,
  Instagram,
  MessageCircle,
  Mail,
  Layers,
  FileCheck,
  ArrowUpRight,
  Shield,
  Zap,
  Edit3,
  Eye,
  Save,
  Copy,
  Plus,
  Trash2,
  Sliders,
  CheckCheck
} from 'lucide-react';
import {
  getThemeStyles,
  getFontFamilyClass,
  getBorderRadiusClass,
  THEME_PRESETS,
} from '../../utils/proposalThemes';
import {
  PACKAGE_PRESETS,
  calculatePackagePricing,
  getStandardScope
} from '../../data/packageScopes';
import { ProposalAiModal } from './ProposalStudio/ProposalAiModal';

interface ProposalClientViewProps {
  data: ProposalData;
  onBackToEditor?: () => void;
  onUpdateProposal?: (updated: ProposalData) => void;
  isStandalone?: boolean;
}

export const ProposalClientView: React.FC<ProposalClientViewProps> = ({
  data,
  onBackToEditor,
  onUpdateProposal,
  isStandalone = false,
}) => {
  // Local mutable copy of proposal
  const [proposal, setProposal] = useState<ProposalData>(data);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState<boolean>(false);
  const [customPriceInput, setCustomPriceInput] = useState<string>(
    proposal.packageConfig?.specialApprovedPrice ? String(proposal.packageConfig.specialApprovedPrice) : ''
  );

  // Synchronize when data prop changes from outside
  useEffect(() => {
    setProposal(data);
    if (data.packageConfig?.specialApprovedPrice) {
      setCustomPriceInput(String(data.packageConfig.specialApprovedPrice));
    }
  }, [data]);

  // Theme & style helpers
  const theme = proposal.theme || THEME_PRESETS['nyveq-dark'];
  const fontClass = getFontFamilyClass(theme.fontPair);
  const radiusClass = getBorderRadiusClass(theme.borderRadius);
  const isDark = theme.isDark !== false;

  const handlePrint = () => {
    window.print();
  };

  // Section visibility helper
  const isSectionEnabled = (sectionKey: string): boolean => {
    if (!proposal.sections || proposal.sections.length === 0) return true;
    const found = proposal.sections.find((s) => s.key === sectionKey);
    return found ? found.enabled : true;
  };

  // Pricing calculations
  const pkgConfig = proposal.packageConfig;
  const isFounding = pkgConfig?.isFoundingPartner || proposal.id.includes('founding');
  const standardFee = pkgConfig?.standardBuildFee || (proposal.id.includes('authority') ? 34997 : proposal.id.includes('presence') ? 12997 : 21997);
  const actualBuildFee = pkgConfig?.actualBuildFee !== undefined
    ? pkgConfig.actualBuildFee
    : (isFounding && !proposal.id.includes('signature') && !proposal.id.includes('authority') ? 0 : standardFee);
  const kickoffDeposit = pkgConfig?.kickoffDeposit !== undefined
    ? pkgConfig.kickoffDeposit
    : (actualBuildFee === 0 ? 0 : Math.ceil(actualBuildFee * 0.5));
  const remainingPayment = pkgConfig?.beforeLaunchPayment !== undefined
    ? pkgConfig.beforeLaunchPayment
    : (actualBuildFee === 0 ? 0 : actualBuildFee - kickoffDeposit);
  const monthlyCare = pkgConfig?.monthlyCareFee || (proposal.id.includes('authority') ? 1997 : proposal.id.includes('presence') ? 997 : 1497);

  // WhatsApp & Email Actions
  const whatsappNumber = proposal.whatsappNumber || '201147877963';
  const defaultWaMsg = `مرحباً NYVEQ، نحن في استوديو ${proposal.companyName}، راجعنا البروبوزال ونود بدء سبرنت التنفيذ.`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(proposal.whatsappMessage || defaultWaMsg)}`;
  const emailLink = `mailto:${proposal.emailRecipient || 'partners@nyveq.com'}?subject=${encodeURIComponent(proposal.emailSubject || `Acceptance: ${proposal.companyName} × NYVEQ Proposal`)}&body=${encodeURIComponent(`Hello Ahmed,\n\nWe have reviewed the digital presence proposal for ${proposal.companyName} and would like to proceed with the next steps.\n\nBest regards,\n${proposal.contactPerson || proposal.clientName}`)}`;

  // Save changes to localStorage and parent
  const handleSaveProposal = () => {
    const updated = {
      ...proposal,
      updatedAt: new Date().toISOString(),
    };
    setProposal(updated);
    localStorage.setItem('nyveq_active_proposal', JSON.stringify(updated));

    // Update in proposals library
    const savedLib = localStorage.getItem('nyveq_proposals_library');
    if (savedLib) {
      try {
        const lib: ProposalData[] = JSON.parse(savedLib);
        const updatedLib = lib.map((p) => (p.id === updated.id ? updated : p));
        // If not found in library, add it
        if (!lib.some((p) => p.id === updated.id)) {
          updatedLib.unshift(updated);
        }
        localStorage.setItem('nyveq_proposals_library', JSON.stringify(updatedLib));
      } catch (e) {}
    }

    if (onUpdateProposal) {
      onUpdateProposal(updated);
    }

    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 2500);
  };

  // Copy live client link
  const handleCopyLink = () => {
    const url = `${window.location.origin}/#/proposal?id=${proposal.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Fast Package Tier Switching
  const handleSelectPackageTier = (newTier: PackageTier) => {
    const isFound = newTier === 'founding';
    const effectiveTier = isFound ? 'presence' : newTier;
    const specialPrice = customPriceInput ? Number(customPriceInput) : undefined;
    const newPricing = calculatePackagePricing(effectiveTier, isFound, specialPrice);
    const newScope = getStandardScope(effectiveTier);

    const updated: ProposalData = {
      ...proposal,
      packageConfig: newPricing,
      scopeItems: newScope,
      scope: newScope.map((s) => s.title),
      timeline: newPricing.timeline,
      revisionPolicy: newPricing.revisionPolicy,
      investment: `${newPricing.actualBuildFee.toLocaleString()} EGP`,
      deposit: `${newPricing.kickoffDeposit.toLocaleString()} EGP`,
      remainingPayment: `${newPricing.beforeLaunchPayment.toLocaleString()} EGP`,
      updatedAt: new Date().toISOString()
    };

    setProposal(updated);
    if (onUpdateProposal) onUpdateProposal(updated);
  };

  // Fast Custom Price Override
  const handleCustomPriceChange = (val: string) => {
    setCustomPriceInput(val);
    const num = val ? Number(val) : undefined;
    const currentTier = proposal.packageConfig?.tier || 'signature';
    const isFound = proposal.packageConfig?.isFoundingPartner || false;
    const newPricing = calculatePackagePricing(currentTier, isFound, num);

    const updated: ProposalData = {
      ...proposal,
      packageConfig: newPricing,
      investment: `${newPricing.actualBuildFee.toLocaleString()} EGP`,
      deposit: `${newPricing.kickoffDeposit.toLocaleString()} EGP`,
      remainingPayment: `${newPricing.beforeLaunchPayment.toLocaleString()} EGP`,
      updatedAt: new Date().toISOString()
    };

    setProposal(updated);
    if (onUpdateProposal) onUpdateProposal(updated);
  };

  // Replace current proposal with AI-generated one
  const handleAiGenerated = (newGeneratedProposal: ProposalData) => {
    setProposal(newGeneratedProposal);
    localStorage.setItem('nyveq_active_proposal', JSON.stringify(newGeneratedProposal));
    if (onUpdateProposal) onUpdateProposal(newGeneratedProposal);
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 2500);
  };

  // Deliverables list source
  const deliverablesList: ScopeItem[] =
    proposal.scopeItems && proposal.scopeItems.length > 0
      ? proposal.scopeItems
      : proposal.deliverables.map((d, i) => ({
          id: `deliv-${i}`,
          deliverableNumber: `DELIVERABLE 0${i + 1}`,
          title: d.title,
          description: d.description,
          enabled: true,
        }));

  // Deliverables handlers in edit mode
  const handleUpdateDeliverable = (id: string, field: 'title' | 'description', value: string) => {
    const updated = deliverablesList.map((d) => (d.id === id ? { ...d, [field]: value } : d));
    setProposal((prev) => ({
      ...prev,
      scopeItems: updated,
      deliverables: updated.map((u) => ({ title: u.title, description: u.description }))
    }));
  };

  const handleAddDeliverable = () => {
    const num = deliverablesList.length + 1;
    const newItem: ScopeItem = {
      id: `deliv-new-${Date.now()}`,
      deliverableNumber: `DELIVERABLE 0${num}`,
      title: 'New Custom Architecture Deliverable',
      description: 'Describe the specific deliverable specifications, craft standard, and handover requirements.',
      enabled: true
    };
    const updated = [...deliverablesList, newItem];
    setProposal((prev) => ({
      ...prev,
      scopeItems: updated,
      deliverables: updated.map((u) => ({ title: u.title, description: u.description }))
    }));
  };

  const handleDeleteDeliverable = (id: string) => {
    const updated = deliverablesList.filter((d) => d.id !== id);
    setProposal((prev) => ({
      ...prev,
      scopeItems: updated,
      deliverables: updated.map((u) => ({ title: u.title, description: u.description }))
    }));
  };

  // Problems list handlers in edit mode
  const handleUpdateProblem = (idx: number, text: string) => {
    const current = [...(proposal.identifiedProblems || [])];
    current[idx] = text;
    setProposal((prev) => ({ ...prev, identifiedProblems: current }));
  };

  const handleAddProblem = () => {
    const current = [...(proposal.identifiedProblems || [])];
    current.push('New identified digital presence friction or lead-handling bottleneck');
    setProposal((prev) => ({ ...prev, identifiedProblems: current }));
  };

  const handleDeleteProblem = (idx: number) => {
    const current = (proposal.identifiedProblems || []).filter((_, i) => i !== idx);
    setProposal((prev) => ({ ...prev, identifiedProblems: current }));
  };

  return (
    <div
      style={getThemeStyles(theme)}
      className={`min-h-screen ${isDark ? 'bg-[#07060a] text-zinc-100' : 'bg-[#faf9f6] text-zinc-900'} ${fontClass.body} transition-colors duration-300 selection:bg-purple-600 selection:text-white print:bg-white print:text-zinc-900`}
    >
      {/* ======================================================== */}
      {/* 1. EXECUTIVE FLOATING UTILITY & CONTROLLER BAR */}
      {/* ======================================================== */}
      <div className="sticky top-0 z-40 px-4 md:px-8 py-3 no-print shadow-2xl backdrop-blur-xl border-b bg-[#0b0a14]/95 border-[#232135] text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Mode Toggle & Status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#141322] p-1 rounded-xl border border-[#27253d]">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  !isEditMode
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Client View (عرض العميل)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isEditMode
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Live Edit (تعديل حي مباشر)</span>
              </button>
            </div>

            {/* AI Fast Generate Button */}
            <button
              type="button"
              onClick={() => setShowAiModal(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-mono font-bold flex items-center gap-1.5 shadow-md shadow-purple-950/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span>توليد بالذكاء الاصطناعي لأي عميل</span>
            </button>
          </div>

          {/* Center/Right: Fast Tier & Price Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-[#141322] p-1 rounded-xl border border-[#27253d]">
              <span className="text-[10px] font-mono text-zinc-500 px-1.5 font-bold">باقة:</span>
              {[
                { id: 'presence', label: 'Presence (13k)' },
                { id: 'signature', label: 'Signature (22k)' },
                { id: 'authority', label: 'Authority (35k)' },
                { id: 'founding', label: 'Founding (0 EGP)' }
              ].map((t) => {
                const currentTier = pkgConfig?.tier || 'signature';
                const isSelected = t.id === 'founding' ? isFounding : (!isFounding && currentTier === t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectPackageTier(t.id as PackageTier)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Price input in edit mode */}
            {isEditMode && (
              <div className="flex items-center gap-1 bg-[#141322] px-2.5 py-1 rounded-xl border border-[#27253d]">
                <span className="text-[10px] font-mono text-zinc-400">سعر مخصص:</span>
                <input
                  type="number"
                  placeholder="EGP"
                  value={customPriceInput}
                  onChange={(e) => handleCustomPriceChange(e.target.value)}
                  className="w-20 bg-transparent text-white font-mono text-xs focus:outline-none"
                />
              </div>
            )}

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveProposal}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ العرض</span>
            </button>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-[#171626] hover:bg-[#201f35] border border-[#2b2842] text-zinc-300 hover:text-white rounded-xl font-mono flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>

            {/* PDF / Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 bg-[#171626] hover:bg-[#201f35] border border-[#2b2842] text-zinc-300 hover:text-white rounded-xl cursor-pointer"
              title="Print / Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {onBackToEditor && (
              <button
                type="button"
                onClick={onBackToEditor}
                className="px-3 py-1.5 text-zinc-400 hover:text-white font-mono cursor-pointer"
              >
                الاستوديو ←
              </button>
            )}
          </div>
        </div>

        {/* Save success toast */}
        {saveSuccessToast && (
          <div className="max-w-6xl mx-auto mt-2 pt-2 border-t border-emerald-500/30 flex items-center gap-2 text-emerald-400 font-mono text-xs animate-in fade-in">
            <CheckCheck className="w-4 h-4" />
            <span>✓ تم حفظ كافة تفاصيل وميزانية البروبوزال بنجاح داخل النظام.</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN PROPOSAL DOCUMENT CANVAS */}
      {/* ======================================================== */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-20 print:p-0 print:space-y-10">

        {/* SECTION 1: HERO & CLIENT BRANDING */}
        {isSectionEnabled('hero') && (
          <section className="space-y-8 border-b pb-12 print:border-zinc-300" style={{ borderColor: isDark ? 'var(--proposal-card-border, #1f1d2c)' : '#e4e2dc' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Co-Branding Header */}
              <div className="flex items-center gap-3 flex-wrap">
                {isEditMode ? (
                  <div className="flex items-center gap-2 bg-[#141322] border border-purple-500/50 rounded-xl px-3 py-1.5">
                    <Building className="w-5 h-5 text-purple-400" />
                    <input
                      type="text"
                      value={proposal.companyName}
                      onChange={(e) => setProposal({ ...proposal, companyName: e.target.value })}
                      placeholder="اسم الاستوديو"
                      className="bg-transparent font-bold text-lg text-white focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight">
                    <Building className="w-6 h-6 text-purple-400" />
                    <span>{proposal.companyName.toUpperCase()}</span>
                  </div>
                )}

                <span className="text-xl font-light text-zinc-500">×</span>
                <div className="flex items-center gap-1.5 font-serif text-2xl sm:text-3xl tracking-wider">
                  <span>NYVEQ</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block mb-1" />
                </div>
              </div>

              <div className="text-right text-xs font-mono opacity-80 print:text-zinc-600">
                <div>DATE: {proposal.proposalDate}</div>
                <div className="text-purple-400 font-bold uppercase tracking-wider">
                  STATUS: {proposal.status ? proposal.status.toUpperCase() : 'COMMENCEMENT BRIEF'}
                </div>
              </div>
            </div>

            {/* Monograph Title */}
            <div className="pt-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Bespoke Digital Presence System Monograph</span>
              </div>

              {isEditMode ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500">عنوان البروبوزال:</label>
                  <input
                    type="text"
                    value={proposal.projectTitle}
                    onChange={(e) => setProposal({ ...proposal, projectTitle: e.target.value })}
                    className={`w-full text-2xl sm:text-4xl lg:text-5xl ${fontClass.heading} bg-[#141322] border border-purple-500/50 rounded-2xl p-3 text-white focus:outline-none`}
                  />
                </div>
              ) : (
                <h1 className={`text-3xl sm:text-5xl lg:text-6xl ${fontClass.heading} tracking-tight leading-tight`}>
                  {proposal.projectTitle || `${proposal.companyName} — Digital Presence System`}
                </h1>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono opacity-80 pt-2 print:text-zinc-700">
                <span className="font-bold">{proposal.companyName}</span>
                <span>•</span>
                {isEditMode ? (
                  <div className="flex items-center gap-1.5 bg-[#141322] border border-purple-500/40 rounded-lg px-2 py-0.5">
                    <span className="text-zinc-500">Attn:</span>
                    <input
                      type="text"
                      value={proposal.contactPerson || proposal.clientName}
                      onChange={(e) => setProposal({ ...proposal, contactPerson: e.target.value, clientName: e.target.value })}
                      className="bg-transparent text-white focus:outline-none"
                    />
                  </div>
                ) : (
                  <span>Attn: {proposal.contactPerson || proposal.clientName}</span>
                )}
                {proposal.industry && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{proposal.industry}</span>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: CURRENT SITUATION & OBSERVATIONS */}
        {isSectionEnabled('current_situation') && (
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                SECTION 01 // ARCHITECTURAL CONTEXT
              </span>
              <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                Current Situation &amp; Observations
              </h2>
            </div>

            {isEditMode ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">الوضع الحالي وسابقة الأعمال:</label>
                  <textarea
                    rows={3}
                    value={proposal.currentSituation}
                    onChange={(e) => setProposal({ ...proposal, currentSituation: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-[#0f0e1a] border border-purple-500/50 text-sm text-white focus:outline-none leading-relaxed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">الملاحظات والفجوات المرصودة:</label>
                  <textarea
                    rows={3}
                    value={proposal.specificObservations}
                    onChange={(e) => setProposal({ ...proposal, specificObservations: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-[#0f0e1a] border border-purple-500/50 text-sm text-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 leading-[2.1] opacity-90 text-sm sm:text-base">
                <p>{proposal.currentSituation}</p>
                {proposal.specificObservations && (
                  <p className="border-l-2 pl-4 border-purple-500/40 italic">
                    {proposal.specificObservations}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: IDENTIFIED BOTTLENECKS */}
        {isSectionEnabled('identified_problems') && (
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                SECTION 02 // REVENUE BOTTLENECKS
              </span>
              <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                Identified Friction Points
              </h2>
              <p className="text-xs sm:text-sm opacity-75">
                Current structural digital gaps preventing friction-free high-ticket client acquisition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(proposal.identifiedProblems || []).map((prob, i) => (
                <div
                  key={i}
                  className={`p-5 ${radiusClass} border space-y-2 relative group`}
                  style={{
                    backgroundColor: 'var(--proposal-card-bg, #0c0b14)',
                    borderColor: 'var(--proposal-card-border, #1f1d2c)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                    <span className="font-bold">BOTTLENECK 0{i + 1}</span>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => handleDeleteProblem(i)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Delete problem"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {isEditMode ? (
                    <textarea
                      rows={2}
                      value={prob}
                      onChange={(e) => handleUpdateProblem(i, e.target.value)}
                      className="w-full p-2 bg-[#141322] border border-purple-500/40 rounded-xl text-xs text-white focus:outline-none"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">{prob}</p>
                  )}
                </div>
              ))}
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={handleAddProblem}
                className="px-4 py-2 bg-[#141322] hover:bg-[#1f1d35] border border-dashed border-purple-500/50 rounded-xl text-xs font-mono text-purple-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة نقطة اختناق أخرى</span>
              </button>
            )}
          </section>
        )}

        {/* SECTION 4: THE OPPORTUNITY */}
        {isSectionEnabled('the_opportunity') && (
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                SECTION 03 // STRATEGIC HORIZON
              </span>
              <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                The Sovereign Market Opportunity
              </h2>
            </div>

            <div
              className={`p-6 sm:p-8 ${radiusClass} border relative overflow-hidden`}
              style={{
                backgroundColor: 'var(--proposal-card-bg, #0f0e18)',
                borderColor: 'var(--proposal-card-border, #242236)',
              }}
            >
              {isEditMode ? (
                <textarea
                  rows={3}
                  value={proposal.opportunity}
                  onChange={(e) => setProposal({ ...proposal, opportunity: e.target.value })}
                  className="w-full p-3 bg-[#141322] border border-purple-500/50 rounded-xl text-sm text-white focus:outline-none leading-relaxed"
                />
              ) : (
                <p className="text-sm sm:text-base leading-[2.1] opacity-95">
                  {proposal.opportunity}
                </p>
              )}
            </div>
          </section>
        )}

        {/* SECTION 5: RECOMMENDED ARCHITECTURE */}
        {isSectionEnabled('recommended_solution') && (
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                SECTION 04 // SYSTEM SPECIFICATION
              </span>
              <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                Recommended Architecture
              </h2>
            </div>

            <div
              className={`p-6 sm:p-8 ${radiusClass} border space-y-4`}
              style={{
                backgroundColor: 'var(--proposal-card-bg, #0f0e18)',
                borderColor: 'var(--proposal-accent, #7c3aed)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--proposal-card-border, #242236)' }}>
                <div>
                  <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                    RECOMMENDED SYSTEM TIER
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-0.5">
                    {PACKAGE_PRESETS[pkgConfig?.tier || 'signature']?.name || 'Signature System'}
                  </h3>
                </div>

                <div className="text-right font-mono">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {actualBuildFee === 0 ? '0 EGP' : `${actualBuildFee.toLocaleString()} EGP`}
                  </div>
                  <div className="text-xs text-purple-300">
                    {isFounding && actualBuildFee === 0 ? 'Founding Partner Waiver' : 'Flat Implementation Fee'}
                  </div>
                </div>
              </div>

              {isEditMode ? (
                <textarea
                  rows={3}
                  value={proposal.recommendedSolution}
                  onChange={(e) => setProposal({ ...proposal, recommendedSolution: e.target.value })}
                  className="w-full p-3 bg-[#141322] border border-purple-500/50 rounded-xl text-sm text-white focus:outline-none leading-relaxed"
                />
              ) : (
                <p className="text-sm leading-[2.1] opacity-90">
                  {proposal.recommendedSolution}
                </p>
              )}
            </div>
          </section>
        )}

        {/* SECTION 6: DELIVERABLES */}
        {isSectionEnabled('what_we_will_build') && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                  SECTION 05 // SCOPE DELIVERABLES
                </span>
                <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                  What We Will Build ({deliverablesList.length} Components)
                </h2>
              </div>

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة مخرج جديد</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {deliverablesList.map((deliv, idx) => (
                <div
                  key={deliv.id || idx}
                  className={`p-6 ${radiusClass} border space-y-2`}
                  style={{
                    backgroundColor: 'var(--proposal-card-bg, #0c0b14)',
                    borderColor: 'var(--proposal-card-border, #1f1d2c)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                    <span className="font-bold">{deliv.deliverableNumber || `DELIVERABLE 0${idx + 1}`}</span>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => handleDeleteDeliverable(deliv.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Delete deliverable"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {isEditMode ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={deliv.title}
                        onChange={(e) => handleUpdateDeliverable(deliv.id, 'title', e.target.value)}
                        className="w-full p-2 bg-[#141322] border border-purple-500/40 rounded-xl text-sm font-bold text-white focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        value={deliv.description}
                        onChange={(e) => handleUpdateDeliverable(deliv.id, 'description', e.target.value)}
                        className="w-full p-2 bg-[#141322] border border-purple-500/40 rounded-xl text-xs text-zinc-300 focus:outline-none leading-relaxed"
                      />
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-base font-bold text-white">{deliv.title}</h4>
                      <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">{deliv.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 7: INVESTMENT & PAYMENT SCHEDULE */}
        {isSectionEnabled('investment') && (
          <section className="space-y-6 border-t pt-12" style={{ borderColor: 'var(--proposal-card-border, #1f1d2c)' }}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                SECTION 06 // CAPITAL COMMITMENT
              </span>
              <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                Investment Structure &amp; Terms
              </h2>
              <p className="text-xs sm:text-sm opacity-75">
                Transparent flat pricing with zero hidden maintenance or unexpected fees.
              </p>
            </div>

            {/* Main Investment Summary Card */}
            <div
              className={`p-8 ${radiusClass} border-2 space-y-6 shadow-2xl relative overflow-hidden`}
              style={{
                backgroundColor: 'var(--proposal-card-bg, #0f0e17)',
                borderColor: isFounding && actualBuildFee === 0 ? '#c5a880' : 'var(--proposal-accent, #7c3aed)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-5" style={{ borderColor: 'var(--proposal-card-border, #242236)' }}>
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-purple-400 tracking-wider">
                    {isFounding && actualBuildFee === 0
                      ? '★ FOUNDING PARTNER COHORT AGREEMENT'
                      : 'TOTAL PRODUCTION BUILD INVESTMENT'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    {isFounding && actualBuildFee === 0
                      ? 'Production Build Fee Waived (0 EGP)'
                      : `${actualBuildFee.toLocaleString()} EGP`}
                  </h3>
                </div>

                <div className="text-right">
                  {isFounding && actualBuildFee === 0 ? (
                    <div>
                      <div className="text-xs font-mono text-zinc-500 line-through">
                        Standard Fee: {standardFee.toLocaleString()} EGP
                      </div>
                      <div className="text-3xl font-mono font-bold text-emerald-400">
                        0 EGP
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-purple-300">
                      Standard Tier Rate
                    </div>
                  )}
                </div>
              </div>

              {/* Deposit Split Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border space-y-1" style={{ borderColor: 'var(--proposal-card-border, #242236)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-xs font-mono text-zinc-400">COMMENCEMENT KICKOFF DEPOSIT (50%)</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {kickoffDeposit === 0 ? '0 EGP' : `${kickoffDeposit.toLocaleString()} EGP`}
                  </div>
                  <div className="text-[10px] opacity-75">Secures development sprint &amp; architecture audit</div>
                </div>

                <div className="p-4 rounded-xl border space-y-1" style={{ borderColor: 'var(--proposal-card-border, #242236)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-xs font-mono text-zinc-400">FINAL LAUNCH HANDOVER (50%)</div>
                  <div className="text-xl font-bold font-mono text-purple-300">
                    {remainingPayment === 0 ? '0 EGP' : `${remainingPayment.toLocaleString()} EGP`}
                  </div>
                  <div className="text-[10px] opacity-75">Paid upon staging approval prior to DNS release</div>
                </div>
              </div>

              {/* Managed Care & Support */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: 'var(--proposal-card-border, #242236)' }}>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400">INCLUDED HYPERCARE SUPPORT:</span>
                  <p className="text-xs text-zinc-200 font-medium">{proposal.includedSupport || '60 days priority hypercare & daily backups'}</p>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-xs font-mono text-zinc-400">MANAGED CARE RETAINER:</span>
                  <p className="text-sm font-mono font-bold text-purple-400">{monthlyCare.toLocaleString()} EGP / month</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8: NEXT STEPS & ACCEPTANCE */}
        {isSectionEnabled('next_step') && (
          <section className="space-y-6 border-t pt-12" style={{ borderColor: 'var(--proposal-card-border, #1f1d2c)' }}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                SECTION 07 // IMMEDIATE ACTION
              </span>
              <h2 className={`text-2xl sm:text-3xl ${fontClass.heading}`}>
                Commencement Authorization
              </h2>
            </div>

            <div
              className={`p-8 ${radiusClass} border space-y-6`}
              style={{
                backgroundColor: 'var(--proposal-card-bg, #0c0b14)',
                borderColor: 'var(--proposal-card-border, #242236)',
              }}
            >
              <p className="text-sm sm:text-base leading-[2.1] opacity-90">
                {proposal.nextStep || 'Confirm acceptance via the direct authorization channels below to lock in the production window.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Authorize via VIP WhatsApp Dispatch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={emailLink}
                  className="px-6 py-3 rounded-xl bg-[#171626] hover:bg-[#212035] border border-[#2c2944] text-zinc-200 hover:text-white font-mono font-medium text-xs flex items-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Official Email Acceptance</span>
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* AI Fast Generate Modal */}
      <ProposalAiModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onProposalGenerated={handleAiGenerated}
      />
    </div>
  );
};
