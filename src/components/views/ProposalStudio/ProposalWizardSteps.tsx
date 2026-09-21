import React, { useState } from 'react';
import {
  ProposalData,
  PackageTier,
  ScopeItem,
  ProposalSectionItem,
  ThemePreset,
  FontPair,
  BorderRadiusStyle,
  ProspectLead,
  ProposalStudioStatus,
} from '../../../types';
import {
  PACKAGE_PRESETS,
  getStandardScope,
  calculatePackagePricing,
  DEFAULT_PROPOSAL_SECTIONS,
} from '../../../data/packageScopes';
import { ProposalAiAssistant, SectionAiAction } from '../../../utils/proposalAiAssistant';
import { THEME_PRESETS } from '../../../utils/proposalThemes';
import {
  Building,
  User,
  Globe,
  Instagram,
  FileText,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Share2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  Check,
  RefreshCw,
  Copy,
  MessageCircle,
  ExternalLink,
  Shield,
  Clock,
  DollarSign,
  Briefcase,
  Search,
} from 'lucide-react';

interface ProposalWizardStepsProps {
  proposal: ProposalData;
  onChange: (updated: ProposalData) => void;
  crmLeads?: ProspectLead[];
  activeStep: number;
  onSelectStep: (step: number) => void;
  onPreviewClient: () => void;
}

export const ProposalWizardSteps: React.FC<ProposalWizardStepsProps> = ({
  proposal,
  onChange,
  crmLeads = [],
  activeStep,
  onSelectStep,
  onPreviewClient,
}) => {
  const [aiWorkingSection, setAiWorkingSection] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<{ sectionKey: string; text: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState('');

  // Handle client detail field changes
  const handleClientChange = (field: keyof ProposalData, value: any) => {
    onChange({
      ...proposal,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  // Handle discovery note field changes
  const handleDiscoveryChange = (field: string, value: string) => {
    const updatedNotes = {
      ...(proposal.discoveryNotes || {
        currentSituation: '',
        currentAcquisition: '',
        currentCustomerJourney: '',
        mainProblems: '',
        targetProjects: '',
        desiredOutcome: '',
        leadHandlingProblems: '',
        importantNotes: '',
      }),
      [field]: value,
    };

    onChange({
      ...proposal,
      discoveryNotes: updatedNotes,
      updatedAt: new Date().toISOString(),
    });
  };

  // Auto-fill from CRM lead
  const handleSelectCrmLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    if (!leadId) return;
    const lead = crmLeads.find((l) => l.id === leadId);
    if (!lead) return;

    const cleanContact = lead.contact.split('(')[0].trim();
    const contactTitle = lead.contact.includes('(')
      ? lead.contact.split('(')[1].replace(')', '').trim()
      : 'Founder & Principal Architect';

    const targetTier: PackageTier =
      lead.targetTier === 'authority' ? 'authority' : lead.targetTier === 'presence' ? 'presence' : 'signature';

    const pricing = calculatePackagePricing(targetTier, false);
    const stdScope = getStandardScope(targetTier);

    onChange({
      ...proposal,
      clientName: cleanContact,
      companyName: lead.company,
      contactPerson: `${cleanContact} (${contactTitle})`,
      projectTitle: `${lead.company} — Digital Presence System`,
      industry: 'Luxury Interior Architecture & Turnkey Finishing',
      instagram: lead.company.toLowerCase().replace(/\s+/g, '') + '.eg',
      discoveryNotes: {
        ...(proposal.discoveryNotes || {
          currentSituation: '',
          currentAcquisition: '',
          currentCustomerJourney: '',
          mainProblems: '',
          targetProjects: '',
          desiredOutcome: '',
          leadHandlingProblems: '',
          importantNotes: '',
        }),
        currentSituation: `Active luxury studio located in ${lead.location}. Standout work includes ${lead.standoutProject}.`,
        currentAcquisition: 'Primary reliance on Instagram portfolio posts and word-of-mouth client referrals.',
        mainProblems: lead.observedFlaw || 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
        targetProjects: 'Turnkey private residences, penthouses, and bespoke coastal villas.',
        desiredOutcome: 'Establish an authoritative digital presence to screen high-ticket projects and command premium fees.',
      },
      packageConfig: pricing,
      scopeItems: stdScope,
      updatedAt: new Date().toISOString(),
    });
  };

  // Handle package tier selection
  const handleSelectPackage = (tier: PackageTier) => {
    const isFounding = proposal.packageConfig?.isFoundingPartner || false;
    const specialPrice = proposal.packageConfig?.specialApprovedPrice;
    const pricing = calculatePackagePricing(tier, isFounding, specialPrice);
    const newScope = getStandardScope(tier);

    // Re-generate internal recommendation for this tier
    const internalRec = ProposalAiAssistant.generateInternalRecommendation(
      {
        clientName: proposal.clientName,
        companyName: proposal.companyName,
        contactPerson: proposal.contactPerson,
      },
      proposal.discoveryNotes,
      pricing
    );

    onChange({
      ...proposal,
      packageConfig: pricing,
      scopeItems: newScope,
      internalRecommendation: internalRec,
      updatedAt: new Date().toISOString(),
    });
  };

  // Handle founding partner toggle
  const handleToggleFounding = (enabled: boolean) => {
    const currentTier = proposal.packageConfig?.tier || 'signature';
    const specialPrice = proposal.packageConfig?.specialApprovedPrice;
    const pricing = calculatePackagePricing(currentTier, enabled, specialPrice);

    const internalRec = ProposalAiAssistant.generateInternalRecommendation(
      {
        clientName: proposal.clientName,
        companyName: proposal.companyName,
        contactPerson: proposal.contactPerson,
      },
      proposal.discoveryNotes,
      pricing
    );

    onChange({
      ...proposal,
      packageConfig: pricing,
      internalRecommendation: internalRec,
      updatedAt: new Date().toISOString(),
    });
  };

  // Handle special approved price for Founding Partner Signature/Authority
  const handleSpecialPriceChange = (priceStr: string) => {
    const currentTier = proposal.packageConfig?.tier || 'signature';
    const isFounding = proposal.packageConfig?.isFoundingPartner || false;
    const numPrice = priceStr === '' ? undefined : Number(priceStr);
    const pricing = calculatePackagePricing(currentTier, isFounding, numPrice);

    onChange({
      ...proposal,
      packageConfig: pricing,
      updatedAt: new Date().toISOString(),
    });
  };

  // Run AI action on section
  const handleRunAiAction = (action: SectionAiAction, sectionKey: any, currentVal: string) => {
    setAiWorkingSection(sectionKey);
    setTimeout(() => {
      const generated = ProposalAiAssistant.runSectionAiAction(
        action,
        currentVal,
        sectionKey,
        {
          clientName: proposal.clientName,
          companyName: proposal.companyName,
          contactPerson: proposal.contactPerson,
          industry: proposal.industry,
          projectTitle: proposal.projectTitle,
        },
        proposal.discoveryNotes,
        proposal.packageConfig
      );

      setAiSuggestion({ sectionKey, text: generated });
      setAiWorkingSection(null);
    }, 200);
  };

  const applyAiSuggestion = () => {
    if (!aiSuggestion) return;
    const { sectionKey, text } = aiSuggestion;

    if (sectionKey === 'executive_summary') {
      handleClientChange('executiveSummary', text);
    } else if (sectionKey === 'current_situation') {
      handleClientChange('currentSituation', text);
    } else if (sectionKey === 'the_opportunity') {
      handleClientChange('opportunity', text);
    } else if (sectionKey === 'recommended_solution') {
      handleClientChange('recommendedSolution', text);
    } else if (sectionKey === 'next_step') {
      handleClientChange('nextStep', text);
    }

    setAiSuggestion(null);
  };

  // Scope Items operations
  const handleUpdateScopeItem = (id: string, field: keyof ScopeItem, value: any) => {
    const items = (proposal.scopeItems || []).map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    handleClientChange('scopeItems', items);
  };

  const handleToggleScopeItem = (id: string) => {
    const items = (proposal.scopeItems || []).map((item) =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    handleClientChange('scopeItems', items);
  };

  const handleRemoveScopeItem = (id: string) => {
    const items = (proposal.scopeItems || []).filter((item) => item.id !== id);
    handleClientChange('scopeItems', items);
  };

  const handleAddScopeItem = () => {
    const items = proposal.scopeItems || [];
    const newItem: ScopeItem = {
      id: `custom-${Date.now()}`,
      deliverableNumber: `DELIVERABLE 0${items.length + 1}`,
      title: 'Custom Client Deliverable',
      description: 'Specific bespoke feature, custom architectural visualizer, or dedicated inquiry integration.',
      enabled: true,
      category: 'custom',
    };
    handleClientChange('scopeItems', [...items, newItem]);
  };

  const handleMoveScopeItem = (index: number, direction: 'up' | 'down') => {
    const items = [...(proposal.scopeItems || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    handleClientChange('scopeItems', items);
  };

  const handleResetScope = () => {
    const tier = proposal.packageConfig?.tier || 'signature';
    handleClientChange('scopeItems', getStandardScope(tier));
  };

  // Sections visibility & ordering
  const sections = proposal.sections && proposal.sections.length > 0 ? proposal.sections : DEFAULT_PROPOSAL_SECTIONS;

  const handleToggleSection = (sectionKey: string) => {
    const updated = sections.map((s) => (s.key === sectionKey ? { ...s, enabled: !s.enabled } : s));
    handleClientChange('sections', updated);
  };

  // Theming operations
  const handleSelectThemePreset = (preset: ThemePreset) => {
    const newTheme = THEME_PRESETS[preset];
    handleClientChange('theme', newTheme);
  };

  const currentTheme = proposal.theme || THEME_PRESETS['nyveq-dark'];

  return (
    <div className="space-y-8">
      {/* Step Indicator Header Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-[#1f1d2c] scrollbar-thin">
        {[
          { step: 1, label: '01. Client' },
          { step: 2, label: '02. Discovery' },
          { step: 3, label: '03. Package' },
          { step: 4, label: '04. Scope' },
          { step: 5, label: '05. Content & AI' },
          { step: 6, label: '06. Theme' },
          { step: 7, label: '07. Publish' },
        ].map((item) => (
          <button
            key={item.step}
            onClick={() => onSelectStep(item.step)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
              activeStep === item.step
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#141322]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* STEP 1: CLIENT DETAILS */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-400" />
                <span>Client &amp; Atelier Specifications</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Core identity information that will be anchored throughout the proposal monograph.
              </p>
            </div>

            {crmLeads.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400">Auto-fill from CRM:</span>
                <select
                  value={selectedLeadId}
                  onChange={(e) => handleSelectCrmLead(e.target.value)}
                  className="bg-[#12111f] border border-[#242236] text-xs text-purple-300 font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select Atelier...</option>
                  {crmLeads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.company} ({lead.location})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Company / Atelier Name *</label>
              <input
                type="text"
                value={proposal.companyName || ''}
                onChange={(e) => handleClientChange('companyName', e.target.value)}
                placeholder="e.g. KÉRAN Architecture & Interiors"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Contact Person &amp; Title *</label>
              <input
                type="text"
                value={proposal.contactPerson || ''}
                onChange={(e) => handleClientChange('contactPerson', e.target.value)}
                placeholder="e.g. Eng. Karim El-Sayed (Founder & Principal Architect)"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Client First Name (Salutation)</label>
              <input
                type="text"
                value={proposal.clientName || ''}
                onChange={(e) => handleClientChange('clientName', e.target.value)}
                placeholder="e.g. Eng. Karim"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Proposal Date</label>
              <input
                type="text"
                value={proposal.proposalDate || ''}
                onChange={(e) => handleClientChange('proposalDate', e.target.value)}
                placeholder="e.g. September 2026"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Project / Proposal Title *</label>
              <input
                type="text"
                value={proposal.projectTitle || ''}
                onChange={(e) => handleClientChange('projectTitle', e.target.value)}
                placeholder="e.g. KÉRAN Atelier — Sovereign Digital Presence System"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Industry / Niche</label>
              <input
                type="text"
                value={proposal.industry || 'Luxury Interior Architecture & Turnkey Finishing'}
                onChange={(e) => handleClientChange('industry', e.target.value)}
                placeholder="Luxury Interior Architecture & Turnkey Finishing"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Current Website (if any)</label>
              <input
                type="text"
                value={proposal.website || ''}
                onChange={(e) => handleClientChange('website', e.target.value)}
                placeholder="e.g. None or kerandesign.com"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Instagram Handle</label>
              <input
                type="text"
                value={proposal.instagram || ''}
                onChange={(e) => handleClientChange('instagram', e.target.value)}
                placeholder="e.g. keran.interiors.eg"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: DISCOVERY INPUT */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Discovery Evaluation &amp; Raw Field Notes</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Input facts gathered during Ahmed's discovery call. The AI copy engine strictly anchors to these facts.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">1. Current Situation</label>
              <textarea
                rows={2}
                value={proposal.discoveryNotes?.currentSituation || ''}
                onChange={(e) => handleDiscoveryChange('currentSituation', e.target.value)}
                placeholder="e.g. Turnkey interior finishing firm in New Cairo with 12 active villa sites. Strong portfolio of executed residences in Katameya Dunes."
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">2. Current Acquisition Channels</label>
                <input
                  type="text"
                  value={proposal.discoveryNotes?.currentAcquisition || ''}
                  onChange={(e) => handleDiscoveryChange('currentAcquisition', e.target.value)}
                  placeholder="e.g. 90% Instagram DMs & client referrals"
                  className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">3. Current Customer Journey</label>
                <input
                  type="text"
                  value={proposal.discoveryNotes?.currentCustomerJourney || ''}
                  onChange={(e) => handleDiscoveryChange('currentCustomerJourney', e.target.value)}
                  placeholder="e.g. Prospect sends DM → Founder replies on WhatsApp → sends heavy PDF brochure"
                  className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">4. Main Conversion &amp; Brand Problems *</label>
              <textarea
                rows={2}
                value={proposal.discoveryNotes?.mainProblems || ''}
                onChange={(e) => handleDiscoveryChange('mainProblems', e.target.value)}
                placeholder="e.g. High-net-worth clients see fragmented Instagram reels; no single authoritative place to view finished turnkey villa case studies."
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">5. Target Projects &amp; Contract Size</label>
                <input
                  type="text"
                  value={proposal.discoveryNotes?.targetProjects || ''}
                  onChange={(e) => handleDiscoveryChange('targetProjects', e.target.value)}
                  placeholder="e.g. Turnkey Villas 5M–12M+ EGP in Palm Hills & Katameya Dunes"
                  className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">6. Desired Commercial Outcome</label>
                <input
                  type="text"
                  value={proposal.discoveryNotes?.desiredOutcome || ''}
                  onChange={(e) => handleDiscoveryChange('desiredOutcome', e.target.value)}
                  placeholder="e.g. Screen out low-budget inquiries, book 3–4 qualified villa consultations/month"
                  className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">7. Lead Handling Inefficiencies</label>
              <input
                type="text"
                value={proposal.discoveryNotes?.leadHandlingProblems || ''}
                onChange={(e) => handleDiscoveryChange('leadHandlingProblems', e.target.value)}
                placeholder="e.g. Founder spends 15 hours/week answering 'how much per square meter' questions on WhatsApp"
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">8. Additional Important Notes / Raw Paste</label>
              <textarea
                rows={2}
                value={proposal.discoveryNotes?.importantNotes || ''}
                onChange={(e) => handleDiscoveryChange('importantNotes', e.target.value)}
                placeholder="Paste any unformatted transcript, key client quotes, or specific objections to address."
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PACKAGE SELECTION & INTERNAL RECOMMENDATION */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>Package Selection &amp; Commercial Architecture</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Select the core package tier and configure Founding Partner cohort status.
            </p>
          </div>

          {/* Package Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['presence', 'signature', 'authority'] as PackageTier[]).map((tierKey) => {
              const preset = PACKAGE_PRESETS[tierKey];
              const isSelected = (proposal.packageConfig?.tier || 'signature') === tierKey;
              const isRecommended = tierKey === 'signature';

              return (
                <div
                  key={tierKey}
                  onClick={() => handleSelectPackage(tierKey)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'bg-[#151326] border-purple-500 ring-2 ring-purple-500/30 shadow-xl'
                      : 'bg-[#0f0e17] border-[#242236] hover:border-zinc-600'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-2.5 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold">
                      RECOMMENDED
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white uppercase">{preset.name}</span>
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {preset.standardBuildFee.toLocaleString()} EGP
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    {preset.tagline}
                  </p>
                  <div className="text-[11px] font-mono text-zinc-300 border-t border-[#1f1d2c] pt-2 flex justify-between">
                    <span>Care: {preset.monthlyCareFee.toLocaleString()} EGP/mo</span>
                    <span>{preset.timeline}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Founding Partner Cohort Toggle */}
          <div className="p-5 rounded-2xl bg-[#121120] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold text-amber-400">
                  ★ FOUNDING PARTNER COHORT (5–7 STUDIOS)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {proposal.packageConfig?.tier === 'presence'
                    ? 'Build Fee Waived (0 EGP)'
                    : 'Custom Approved Pricing'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                {proposal.packageConfig?.tier === 'presence'
                  ? 'Presence System build fee completely waived (0 EGP) in exchange for video testimonial & case study. Client pays standard monthly managed care (997 EGP/mo).'
                  : 'For Signature or Authority tiers, founding partner status allows entering a special approved price, or waiving build fee manually.'}
              </p>
            </div>

            <button
              onClick={() => handleToggleFounding(!proposal.packageConfig?.isFoundingPartner)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shrink-0 ${
                proposal.packageConfig?.isFoundingPartner
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#1a1829] text-zinc-300 border border-[#2a2842] hover:border-amber-500/40'
              }`}
            >
              {proposal.packageConfig?.isFoundingPartner ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {proposal.packageConfig?.tier === 'presence'
                      ? 'Founding Partner Active (0 EGP)'
                      : 'Founding Partner Active'}
                  </span>
                </>
              ) : (
                <span>Enable Founding Partner</span>
              )}
            </button>
          </div>

          {/* Founding Partner Custom Special Price Field for Signature / Authority */}
          {proposal.packageConfig?.isFoundingPartner && proposal.packageConfig?.tier !== 'presence' && (
            <div className="p-4 rounded-xl bg-[#141224] border border-amber-500/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="text-xs font-mono font-bold text-amber-300 block">
                    Special Approved Build Fee (EGP):
                  </label>
                  <p className="text-[11px] text-zinc-400">
                    Standard fee is {proposal.packageConfig?.standardBuildFee.toLocaleString()} EGP. Enter agreed custom amount (or 0 to waive completely).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={proposal.packageConfig?.specialApprovedPrice ?? proposal.packageConfig?.actualBuildFee ?? ''}
                    onChange={(e) => handleSpecialPriceChange(e.target.value)}
                    placeholder={String(proposal.packageConfig?.standardBuildFee)}
                    className="w-36 bg-[#0a0912] border border-amber-500/50 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs font-mono text-zinc-400">EGP</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 border-t border-amber-500/20 text-[11px] font-mono text-zinc-300">
                <span>Kickoff Deposit (50%): <strong className="text-white">{proposal.packageConfig?.kickoffDeposit.toLocaleString()} EGP</strong></span>
                <span>Launch Payment (50%): <strong className="text-white">{proposal.packageConfig?.beforeLaunchPayment.toLocaleString()} EGP</strong></span>
                <span>Managed Care: <strong className="text-purple-300">{proposal.packageConfig?.monthlyCareFee.toLocaleString()} EGP/mo</strong></span>
              </div>
            </div>
          )}

          {/* Presence Founding Partner Info */}
          {proposal.packageConfig?.isFoundingPartner && proposal.packageConfig?.tier === 'presence' && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-amber-300">
                Presence Build Fee: <strong className="text-white line-through mr-1.5">{proposal.packageConfig?.standardBuildFee.toLocaleString()} EGP</strong> → <strong className="text-emerald-400">0 EGP (100% Waived)</strong>
              </span>
              <span className="text-zinc-300">
                Managed Care Retainer: <strong className="text-purple-300">{proposal.packageConfig?.monthlyCareFee.toLocaleString()} EGP/mo</strong>
              </span>
            </div>
          )}

          {/* Standard Investment Breakdown Summary */}
          {!proposal.packageConfig?.isFoundingPartner && (
            <div className="p-3.5 rounded-xl bg-[#0c0b15] border border-[#201e30] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-zinc-400">Standard Build Fee: <strong className="text-white">{proposal.packageConfig?.standardBuildFee.toLocaleString()} EGP</strong></span>
              <span className="text-zinc-400">Kickoff Deposit (50%): <strong className="text-white">{proposal.packageConfig?.kickoffDeposit.toLocaleString()} EGP</strong></span>
              <span className="text-zinc-400">Before Launch (50%): <strong className="text-white">{proposal.packageConfig?.beforeLaunchPayment.toLocaleString()} EGP</strong></span>
              <span className="text-zinc-400">Care: <strong className="text-purple-300">{proposal.packageConfig?.monthlyCareFee.toLocaleString()} EGP/mo</strong></span>
            </div>
          )}

          {/* INTERNAL ONLY: PACKAGE RECOMMENDATION ENGINE */}
          <div className="p-6 rounded-2xl bg-[#0c0b14] border-2 border-dashed border-red-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>INTERNAL ONLY // STRATEGIST ASSESSMENT (NEVER APPEARS IN CLIENT PREVIEW)</span>
              </div>
              <button
                onClick={() => {
                  const rec = ProposalAiAssistant.generateInternalRecommendation(
                    {
                      clientName: proposal.clientName,
                      companyName: proposal.companyName,
                      contactPerson: proposal.contactPerson,
                    },
                    proposal.discoveryNotes,
                    proposal.packageConfig
                  );
                  handleClientChange('internalRecommendation', rec);
                }}
                className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh Assessment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#141322] border border-[#242236] space-y-1">
                <span className="text-zinc-400 font-bold block">Why This Package:</span>
                <p className="text-zinc-200">
                  {proposal.internalRecommendation?.why ||
                    'Ideal match based on studio portfolio volume and need for high-ticket qualification.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141322] border border-[#242236] space-y-1">
                <span className="text-amber-400 font-bold block">Operational Risks:</span>
                <p className="text-zinc-200">
                  {proposal.internalRecommendation?.risks ||
                    'Risk of delay in client submitting high-res photography. Must enforce 6-folder Google Drive intake.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141322] border border-[#242236] space-y-1">
                <span className="text-red-400 font-bold block">Missing Information Checklist:</span>
                <p className="text-zinc-200">
                  {proposal.internalRecommendation?.missingInformation ||
                    'None identified — discovery inputs are sufficient.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141322] border border-[#242236] space-y-1">
                <span className="text-purple-400 font-bold block">Future Upsell Opportunities:</span>
                <p className="text-zinc-200">
                  {proposal.internalRecommendation?.upsellOpportunities ||
                    'Managed Care retainer retention and English bilingual expansion for regional Gulf investors.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: SCOPE CUSTOMIZATION */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Scope Deliverables &amp; Specifications</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Auto-populated from the selected package. Fully editable: add, reorder, disable, or modify deliverables.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetScope}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white border border-[#242236] transition-colors"
              >
                Reset to Package Standard
              </button>
              <button
                onClick={handleAddScopeItem}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Deliverable</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {(proposal.scopeItems || []).map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  item.enabled
                    ? 'bg-[#0f0e17] border-[#242236]'
                    : 'bg-[#0a0910] border-[#181724] opacity-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      onClick={() => handleToggleScopeItem(item.id)}
                      className="text-zinc-400 hover:text-purple-400 transition-colors"
                    >
                      {item.enabled ? (
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-600" />
                      )}
                    </button>
                    <span className="text-[10px] font-mono text-zinc-500">#{idx + 1}</span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateScopeItem(item.id, 'title', e.target.value)}
                      className="w-full bg-transparent text-sm font-bold text-white border-b border-transparent focus:border-purple-500 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleUpdateScopeItem(item.id, 'description', e.target.value)}
                      className="w-full bg-transparent text-xs text-zinc-300 leading-relaxed border-b border-transparent focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Actions (Reorder, Delete) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveScopeItem(idx, 'up')}
                      className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === (proposal.scopeItems || []).length - 1}
                      onClick={() => handleMoveScopeItem(idx, 'down')}
                      className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemoveScopeItem(item.id)}
                      className="p-1 text-zinc-500 hover:text-red-400 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: CONTENT & AI ASSISTANT EDITOR */}
      {activeStep === 5 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Editorial Content &amp; AI Copy Strategist</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Lightweight AI action controls on each section. AI recommends, Ahmed approves.
              </p>
            </div>

            <button
              onClick={() => {
                const exec = ProposalAiAssistant.generateExecutiveSummary(
                  {
                    clientName: proposal.clientName,
                    companyName: proposal.companyName,
                    contactPerson: proposal.contactPerson,
                  },
                  proposal.discoveryNotes,
                  proposal.packageConfig
                );
                handleClientChange('executiveSummary', exec);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-purple-900/30 text-purple-300 border border-purple-500/40 hover:bg-purple-900/50 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Auto-Draft All Sections from Discovery</span>
            </button>
          </div>

          {/* AI Suggestion Approval Bar */}
          {aiSuggestion && (
            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/60 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI Recommended Content for: {aiSuggestion.sectionKey}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAiSuggestion(null)}
                    className="px-3 py-1 rounded text-xs font-mono text-zinc-400 hover:text-white"
                  >
                    Discard
                  </button>
                  <button
                    onClick={applyAiSuggestion}
                    className="px-4 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve &amp; Apply</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans bg-[#0c0b14] p-3 rounded-lg border border-purple-500/30">
                {aiSuggestion.text}
              </p>
            </div>
          )}

          {/* 1. Executive Summary Section */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-purple-400">
                SECTION 01: EXECUTIVE SUMMARY
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleRunAiAction('generate', 'executive_summary', proposal.executiveSummary || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-purple-300 hover:bg-[#201d36]"
                >
                  Generate
                </button>
                <button
                  onClick={() => handleRunAiAction('improve', 'executive_summary', proposal.executiveSummary || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Improve
                </button>
                <button
                  onClick={() => handleRunAiAction('shorten', 'executive_summary', proposal.executiveSummary || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Shorten
                </button>
                <button
                  onClick={() => handleRunAiAction('makeMoreExecutive', 'executive_summary', proposal.executiveSummary || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Executive Tone
                </button>
              </div>
            </div>
            <textarea
              rows={4}
              value={proposal.executiveSummary || ''}
              onChange={(e) => handleClientChange('executiveSummary', e.target.value)}
              placeholder="Consultative executive overview summarizing current digital reality and strategic objectives..."
              className="w-full bg-[#08070d] border border-[#1f1d2c] rounded-xl p-3 text-xs sm:text-sm text-white leading-relaxed focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* 2. Current Situation Section */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-purple-400">
                SECTION 02: CURRENT SITUATION
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleRunAiAction('generate', 'current_situation', proposal.currentSituation || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-purple-300 hover:bg-[#201d36]"
                >
                  Generate
                </button>
                <button
                  onClick={() => handleRunAiAction('makeMoreSpecific', 'current_situation', proposal.currentSituation || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Make Specific
                </button>
                <button
                  onClick={() => handleRunAiAction('rewrite', 'current_situation', proposal.currentSituation || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Rewrite
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={proposal.currentSituation || ''}
              onChange={(e) => handleClientChange('currentSituation', e.target.value)}
              placeholder="Describe their current digital reality and acquisition channels..."
              className="w-full bg-[#08070d] border border-[#1f1d2c] rounded-xl p-3 text-xs sm:text-sm text-white leading-relaxed focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* 3. The Opportunity Section */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-purple-400">
                SECTION 04: THE STRATEGIC OPPORTUNITY
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleRunAiAction('generate', 'the_opportunity', proposal.opportunity || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-purple-300 hover:bg-[#201d36]"
                >
                  Generate
                </button>
                <button
                  onClick={() => handleRunAiAction('explainBusinessValue', 'the_opportunity', proposal.opportunity || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Explain Business Value
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={proposal.opportunity || ''}
              onChange={(e) => handleClientChange('opportunity', e.target.value)}
              placeholder="Outline the commercial upside and positioning transformation..."
              className="w-full bg-[#08070d] border border-[#1f1d2c] rounded-xl p-3 text-xs sm:text-sm text-white leading-relaxed focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* 4. Recommended Solution Section */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-purple-400">
                SECTION 05: RECOMMENDED SOLUTION
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleRunAiAction('generate', 'recommended_solution', proposal.recommendedSolution || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-purple-300 hover:bg-[#201d36]"
                >
                  Generate
                </button>
                <button
                  onClick={() => handleRunAiAction('improve', 'recommended_solution', proposal.recommendedSolution || '')}
                  className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-zinc-300 hover:bg-[#201d36]"
                >
                  Improve
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={proposal.recommendedSolution || ''}
              onChange={(e) => handleClientChange('recommendedSolution', e.target.value)}
              placeholder="Detail the recommended system architecture..."
              className="w-full bg-[#08070d] border border-[#1f1d2c] rounded-xl p-3 text-xs sm:text-sm text-white leading-relaxed focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* 5. Next Step Section */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-purple-400">
                SECTION 12: NEXT STEP &amp; APPROVAL
              </span>
              <button
                onClick={() => handleRunAiAction('generate', 'next_step', proposal.nextStep || '')}
                className="px-2 py-1 rounded bg-[#181628] text-[11px] font-mono text-purple-300 hover:bg-[#201d36]"
              >
                Generate Next Step
              </button>
            </div>
            <textarea
              rows={2}
              value={proposal.nextStep || ''}
              onChange={(e) => handleClientChange('nextStep', e.target.value)}
              placeholder="Instructions on how to accept the proposal and commence the sprint..."
              className="w-full bg-[#08070d] border border-[#1f1d2c] rounded-xl p-3 text-xs sm:text-sm text-white leading-relaxed focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* STEP 6: THEMING & CLIENT BRANDING */}
      {activeStep === 6 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Visual Theming &amp; Co-Branding</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Select editorial presets or customize colors and typography to match the client atelier aesthetic.
            </p>
          </div>

          {/* Theme Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'nyveq-dark', label: 'NYVEQ DARK', desc: 'Obsidian & Amethyst' },
              { id: 'editorial-light', label: 'EDITORIAL LIGHT', desc: 'Cream & Warm Bronze' },
              { id: 'architectural', label: 'ARCHITECTURAL', desc: 'Charcoal & Limestone' },
              { id: 'client-brand', label: 'CLIENT BRAND', desc: 'Custom Brand Palette' },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectThemePreset(preset.id as ThemePreset)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  currentTheme.preset === preset.id
                    ? 'bg-[#151326] border-purple-500 shadow-md ring-2 ring-purple-500/20'
                    : 'bg-[#0f0e17] border-[#242236] hover:border-zinc-500'
                }`}
              >
                <div className="text-xs font-mono font-bold text-white">{preset.label}</div>
                <div className="text-[11px] text-zinc-400 mt-1">{preset.desc}</div>
              </button>
            ))}
          </div>

          {/* Custom Color Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0f0e17] border border-[#242236]">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.primaryColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, primaryColor: e.target.value })
                  }
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.primaryColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, primaryColor: e.target.value })
                  }
                  className="w-full bg-[#141322] border border-[#242236] text-xs font-mono text-white rounded px-2 py-1"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.accentColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, accentColor: e.target.value })
                  }
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.accentColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, accentColor: e.target.value })
                  }
                  className="w-full bg-[#141322] border border-[#242236] text-xs font-mono text-white rounded px-2 py-1"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.backgroundColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, backgroundColor: e.target.value })
                  }
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.backgroundColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, backgroundColor: e.target.value })
                  }
                  className="w-full bg-[#141322] border border-[#242236] text-xs font-mono text-white rounded px-2 py-1"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.textColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, textColor: e.target.value })
                  }
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.textColor}
                  onChange={(e) =>
                    handleClientChange('theme', { ...currentTheme, textColor: e.target.value })
                  }
                  className="w-full bg-[#141322] border border-[#242236] text-xs font-mono text-white rounded px-2 py-1"
                />
              </div>
            </div>
          </div>

          {/* Typography & Style Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Font Pair</label>
              <select
                value={currentTheme.fontPair}
                onChange={(e) =>
                  handleClientChange('theme', { ...currentTheme, fontPair: e.target.value as FontPair })
                }
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="editorial-serif">Editorial Serif + Clean Sans</option>
                <option value="modern-sans">Modern High-Contrast Sans</option>
                <option value="monumental-grotesk">Monumental Grotesk Mono</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Border Radius</label>
              <select
                value={currentTheme.borderRadius}
                onChange={(e) =>
                  handleClientChange('theme', { ...currentTheme, borderRadius: e.target.value as BorderRadiusStyle })
                }
                className="w-full bg-[#100f1a] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="rounded">Rounded Architectural (16px)</option>
                <option value="subtle">Subtle Box (8px)</option>
                <option value="none">Sharp Precision (0px)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400">Mode</label>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleClientChange('theme', { ...currentTheme, isDark: true })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium border ${
                    currentTheme.isDark !== false
                      ? 'bg-purple-900/30 text-purple-300 border-purple-500/40 font-bold'
                      : 'border-[#242236] text-zinc-400'
                  }`}
                >
                  Dark Mode
                </button>
                <button
                  onClick={() => handleClientChange('theme', { ...currentTheme, isDark: false })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium border ${
                    currentTheme.isDark === false
                      ? 'bg-amber-900/30 text-amber-300 border-amber-500/40 font-bold'
                      : 'border-[#242236] text-zinc-400'
                  }`}
                >
                  Light Mode
                </button>
              </div>
            </div>
          </div>

          {/* Client Branding Images */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-4">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              Client Logo &amp; Hero Imagery
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Client Logo URL (PNG / SVG)</label>
                <input
                  type="text"
                  value={proposal.branding?.clientLogoUrl || ''}
                  onChange={(e) =>
                    handleClientChange('branding', { ...proposal.branding, clientLogoUrl: e.target.value })
                  }
                  placeholder="https://example.com/logo.svg"
                  className="w-full bg-[#141322] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Hero Architectural Image URL</label>
                <input
                  type="text"
                  value={proposal.branding?.heroImageUrl || ''}
                  onChange={(e) =>
                    handleClientChange('branding', { ...proposal.branding, heroImageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/... or project render"
                  className="w-full bg-[#141322] border border-[#242236] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: PREVIEW & PUBLISH */}
      {activeStep === 7 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Review, Publish Status &amp; Client Dispatch</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Verify completion, set the proposal status, and generate client dispatch channels.
            </p>
          </div>

          {/* Status Selection */}
          <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
              Current Proposal Lifecycle Status:
            </span>
            <div className="flex flex-wrap gap-2">
              {(['draft', 'ready', 'sent', 'viewed', 'approved', 'declined', 'archived'] as ProposalStudioStatus[]).map(
                (statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => handleClientChange('status', statusKey)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all ${
                      (proposal.status || 'draft') === statusKey
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-[#141322] text-zinc-400 border border-[#242236] hover:text-white'
                    }`}
                  >
                    {statusKey}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Action Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
              <span className="text-xs font-mono font-bold text-white uppercase">
                1. Preview as Client
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Experience the 100% clean presentation mode with zero editor controls or internal notes.
              </p>
              <button
                onClick={onPreviewClient}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>Launch Client Presentation</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] space-y-3">
              <span className="text-xs font-mono font-bold text-white uppercase">
                2. Copy Shareable Web Link
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clients can review this proposal directly from mobile or desktop via standard web browser.
              </p>
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}${window.location.pathname}#/proposal?id=${proposal.id}`;
                  navigator.clipboard.writeText(shareUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2500);
                }}
                className="w-full py-2.5 rounded-xl bg-[#1a182b] hover:bg-[#221f38] text-purple-300 border border-purple-500/30 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? '✓ Copied to Clipboard!' : 'Copy Client Web Link'}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Dispatch Card */}
          <div className="p-5 rounded-2xl bg-[#0c0b14] border border-[#242236] space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Dispatch Script</span>
            </span>
            <div className="p-3.5 rounded-xl bg-[#141322] border border-[#242236] text-xs font-sans text-zinc-200 leading-relaxed">
              «أستاذ {proposal.clientName || 'كريم'}، جهزت لحضرتك وثيقة العمل وتفاصيل التنفيذ المخصصة لـ {proposal.companyName} هنا: {window.location.origin}${window.location.pathname}#/proposal?id={proposal.id} . نراجعها سوا ونحدد موعد بدء الإعداد؟»
            </div>
            <div className="flex justify-end">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `أستاذ ${proposal.clientName || ''}، جهزت لحضرتك وثيقة العمل وتفاصيل التنفيذ المخصصة لـ ${proposal.companyName} هنا: ${window.location.origin}${window.location.pathname}#/proposal?id=${proposal.id} . نراجعها سوا ونحدد موعد بدء الإعداد؟`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
