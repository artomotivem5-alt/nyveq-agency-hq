import React, { useState, useEffect } from 'react';
import { ProposalData, ProspectLead, ProposalStudioStatus } from '../../../types';
import { DEFAULT_PROPOSAL } from '../../../data/defaultProposal';
import { INITIAL_PROPOSALS_LIBRARY } from '../../../data/defaultProposalsList';
import { INITIAL_PROSPECTS } from '../../../data/prospectsData';
import { PACKAGE_PRESETS, getStandardScope, calculatePackagePricing, DEFAULT_PROPOSAL_SECTIONS } from '../../../data/packageScopes';
import { ProposalAiAssistant } from '../../../utils/proposalAiAssistant';
import { THEME_PRESETS } from '../../../utils/proposalThemes';
import { ProposalWizardSteps } from './ProposalWizardSteps';
import { ProposalLibraryView } from './ProposalLibraryView';
import { ProposalClientView } from '../ProposalClientView';
import {
  FileText,
  Eye,
  Edit3,
  Save,
  Copy,
  Printer,
  Columns,
  Sparkles,
  ArrowLeft,
  Check,
  Share2,
  FolderOpen,
  Plus,
  X,
} from 'lucide-react';
import { ProposalAiModal } from './ProposalAiModal';

interface ProposalStudioProps {
  initialMode?: 'library' | 'editor';
}

export const ProposalStudio: React.FC<ProposalStudioProps> = ({ initialMode = 'editor' }) => {
  // Library of multiple proposals in localStorage
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

  // Active proposal object
  const currentProposal = library.find((p) => p.id === activeId) || library[0] || DEFAULT_PROPOSAL;

  // Local mutable copy of proposal in editor
  const [proposal, setProposal] = useState<ProposalData>(() => {
    // Ensure all required fields exist on initial load
    return {
      ...currentProposal,
      theme: currentProposal.theme || THEME_PRESETS['nyveq-dark'],
      sections: currentProposal.sections && currentProposal.sections.length > 0
        ? currentProposal.sections
        : DEFAULT_PROPOSAL_SECTIONS,
      scopeItems: currentProposal.scopeItems && currentProposal.scopeItems.length > 0
        ? currentProposal.scopeItems
        : getStandardScope(currentProposal.packageConfig?.tier || 'signature'),
    };
  });

  // Top-level mode: 'library' | 'editor' | 'client-preview'
  const [studioMode, setStudioMode] = useState<'library' | 'editor' | 'client-preview'>(initialMode);

  // Editor layout: 'split' (side-by-side) | 'editor-only'
  const [editorLayout, setEditorLayout] = useState<'split' | 'editor-only'>('split');

  // Wizard active step (1 to 7)
  const [activeStep, setActiveStep] = useState<number>(1);

  // AI Generator Modal
  const [showAiModal, setShowAiModal] = useState(false);

  // Notifications
  const [saveToast, setSaveToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // CRM Leads for auto-fill
  const [crmLeads] = useState<ProspectLead[]>(() => {
    const saved = localStorage.getItem('nyveq_crm_prospects_v3') || localStorage.getItem('nyveq_crm_prospects_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_PROSPECTS;
  });

  // Check if routed from CRM with pre-populated target
  useEffect(() => {
    const fromCrm = localStorage.getItem('nyveq_proposal_target');
    if (fromCrm) {
      try {
        const parsed = JSON.parse(fromCrm);
        localStorage.removeItem('nyveq_proposal_target');

        const newId = `prop-${Date.now()}`;
        const targetTier = parsed.tier || 'signature';
        const pricing = calculatePackagePricing(targetTier, false);
        const scope = getStandardScope(targetTier);

        const newProposal: ProposalData = {
          ...DEFAULT_PROPOSAL,
          id: newId,
          clientName: parsed.prospectName || 'Eng. Principal',
          companyName: parsed.firmName || 'Luxury Atelier',
          contactPerson: `${parsed.prospectName || 'Principal'} (${parsed.contactTitle || 'Founder'})`,
          projectTitle: `${parsed.firmName || 'Luxury Atelier'} — Digital Presence System`,
          proposalDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          packageConfig: pricing,
          scopeItems: scope,
          sections: DEFAULT_PROPOSAL_SECTIONS,
          theme: THEME_PRESETS['nyveq-dark'],
          status: 'draft',
          discoveryNotes: {
            currentSituation: `Active luxury studio in ${parsed.location || 'New Cairo'}. Key project: ${parsed.standoutProject || 'Villa Residence'}.`,
            currentAcquisition: 'Instagram posts and client word of mouth.',
            currentCustomerJourney: 'Client messages on Instagram → WhatsApp chat → sends PDF portfolio.',
            mainProblems: parsed.observedFlaw || 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP',
            targetProjects: 'Turnkey private residences and penthouses.',
            desiredOutcome: 'Establish an authoritative digital presence to screen high-ticket projects.',
            leadHandlingProblems: 'Founder spends hours answering price inquiries on WhatsApp without prior budget filter.',
            importantNotes: 'Ingested directly from CRM prospect database.',
          },
        };

        setLibrary((prev) => [newProposal, ...prev]);
        setActiveId(newProposal.id);
        setProposal(newProposal);
        setStudioMode('editor');
        setActiveStep(1);
      } catch (e) {}
    }
  }, []);

  // Sync active proposal when activeId changes
  useEffect(() => {
    const found = library.find((p) => p.id === activeId);
    if (found) {
      setProposal({
        ...found,
        theme: found.theme || THEME_PRESETS['nyveq-dark'],
        sections: found.sections && found.sections.length > 0 ? found.sections : DEFAULT_PROPOSAL_SECTIONS,
        scopeItems: found.scopeItems && found.scopeItems.length > 0
          ? found.scopeItems
          : getStandardScope(found.packageConfig?.tier || 'signature'),
      });
    }
  }, [activeId]);

  // Save to localStorage whenever library or active proposal changes
  useEffect(() => {
    localStorage.setItem('nyveq_proposals_library', JSON.stringify(library));
    localStorage.setItem('nyveq_active_proposal_id', activeId);
    localStorage.setItem('nyveq_active_proposal', JSON.stringify(proposal));
  }, [library, activeId, proposal]);

  // Save handler
  const handleSave = () => {
    setLibrary((prev) => prev.map((p) => (p.id === proposal.id ? proposal : p)));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Open proposal in Studio Editor
  const handleOpenProposal = (id: string) => {
    setActiveId(id);
    const target = library.find((p) => p.id === id);
    if (target) {
      setProposal(target);
    }
    setStudioMode('editor');
    setActiveStep(1);
  };

  // Create brand new proposal - Open AI Generator Modal for any client
  const handleNewProposal = () => {
    setShowAiModal(true);
  };

  // AI Generated Proposal Handler
  const handleAiGenerated = (newGenerated: ProposalData) => {
    setLibrary((prev) => [newGenerated, ...prev]);
    setActiveId(newGenerated.id);
    setProposal(newGenerated);
    setStudioMode('editor');
    setActiveStep(1);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Duplicate proposal
  const handleDuplicateProposal = (id: string) => {
    const target = library.find((p) => p.id === id);
    if (!target) return;

    const dupId = `prop-copy-${Date.now()}`;
    const duplicated: ProposalData = {
      ...target,
      id: dupId,
      companyName: `${target.companyName} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
    };

    setLibrary((prev) => [duplicated, ...prev]);
    setActiveId(dupId);
    setProposal(duplicated);
  };

  // Delete proposal
  const handleDeleteProposal = (id: string) => {
    if (library.length <= 1) {
      alert('Cannot delete the only remaining proposal in your library.');
      return;
    }
    const filtered = library.filter((p) => p.id !== id);
    setLibrary(filtered);
    if (activeId === id) {
      setActiveId(filtered[0].id);
      setProposal(filtered[0]);
    }
  };

  // Preview as Client
  const handlePreviewAsClient = (id?: string) => {
    if (id && id !== activeId) {
      setActiveId(id);
      const target = library.find((p) => p.id === id);
      if (target) setProposal(target);
    }
    setStudioMode('client-preview');
  };

  // Status Change
  const handleStatusChange = (id: string, newStatus: ProposalStudioStatus) => {
    setLibrary((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (proposal.id === id) {
      setProposal((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // If Client Presentation Mode is active, render full-screen client view
  if (studioMode === 'client-preview') {
    return (
      <ProposalClientView
        data={proposal}
        onBackToEditor={() => setStudioMode('editor')}
        isStandalone={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07060a] text-zinc-100 font-sans">
      {/* Studio Top Control Bar */}
      <header className="sticky top-0 z-30 bg-[#0c0b14]/95 backdrop-blur-md border-b border-[#1f1d2c] px-6 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-wider text-white">NYVEQ</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/40 font-bold uppercase">
              PROPOSAL STUDIO
            </span>
          </div>

          <div className="h-4 w-px bg-[#242236] hidden sm:block" />

          {/* Mode Switch: Library vs Editor */}
          <div className="flex items-center gap-1 bg-[#121120] p-1 rounded-xl border border-[#242236]">
            <button
              onClick={() => setStudioMode('library')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                studioMode === 'library'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Library</span>
            </button>
            <button
              onClick={() => setStudioMode('editor')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                studioMode === 'editor'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Studio Editor</span>
            </button>
          </div>
        </div>

        {/* Right Controls: AI Generate, Save, Preview as Client, Share */}
        {studioMode === 'editor' && (
          <div className="flex items-center gap-3">
            {/* AI Fast Generate Button */}
            <button
              onClick={() => setShowAiModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-purple-950/40 cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span>توليد بالذكاء الاصطناعي</span>
            </button>

            {/* View Layout Switcher (Split vs Editor Only) */}
            <div className="hidden lg:flex items-center gap-1 bg-[#121120] p-1 rounded-xl border border-[#242236]">
              <button
                onClick={() => setEditorLayout('split')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1 ${
                  editorLayout === 'split' ? 'bg-[#201d36] text-purple-300 font-bold' : 'text-zinc-400'
                }`}
                title="Split Editor & Live Preview"
              >
                <Columns className="w-3 h-3" />
                <span>Split</span>
              </button>
              <button
                onClick={() => setEditorLayout('editor-only')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1 ${
                  editorLayout === 'editor-only' ? 'bg-[#201d36] text-purple-300 font-bold' : 'text-zinc-400'
                }`}
                title="Editor Only"
              >
                <Edit3 className="w-3 h-3" />
                <span>Focus</span>
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-lg bg-[#141322] hover:bg-[#1a192c] text-zinc-200 border border-[#242236] text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
            >
              {saveToast ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-purple-400" />
                  <span>Save</span>
                </>
              )}
            </button>

            {/* Launch Client Presentation */}
            <button
              onClick={() => handlePreviewAsClient()}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/25 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview as Client</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Body */}
      <div className="p-6">
        {studioMode === 'library' ? (
          <ProposalLibraryView
            proposals={library}
            onOpenProposal={handleOpenProposal}
            onNewProposal={handleNewProposal}
            onDuplicateProposal={handleDuplicateProposal}
            onDeleteProposal={handleDeleteProposal}
            onPreviewClient={handlePreviewAsClient}
            onStatusChange={handleStatusChange}
          />
        ) : (
          /* Studio Editor Layout: Split View or Editor Only */
          <div
            className={`grid gap-6 ${
              editorLayout === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {/* Left Column: 7-Step Wizard Controls */}
            <div
              className={`${
                editorLayout === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'w-full'
              } space-y-6 bg-[#0c0b14] border border-[#1f1d2c] rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-thin`}
            >
              <ProposalWizardSteps
                proposal={proposal}
                onChange={(updated) => {
                  setProposal(updated);
                  setLibrary((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
                }}
                crmLeads={crmLeads}
                activeStep={activeStep}
                onSelectStep={setActiveStep}
                onPreviewClient={() => handlePreviewAsClient()}
              />
            </div>

            {/* Right Column: Live Synchronized Client Preview */}
            {editorLayout === 'split' && (
              <div className="lg:col-span-6 xl:col-span-7 rounded-2xl border border-[#1f1d2c] bg-[#07060a] overflow-hidden shadow-2xl flex flex-col h-[calc(100vh-100px)]">
                <div className="px-4 py-2.5 bg-[#0f0e17] border-b border-[#1f1d2c] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE CLIENT PREVIEW (SYNCHRONIZED)</span>
                  </div>
                  <button
                    onClick={() => handlePreviewAsClient()}
                    className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                  >
                    <span>Full Screen</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin">
                  <ProposalClientView
                    data={proposal}
                    onUpdateProposal={(updated) => {
                      setProposal(updated);
                      setLibrary((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
                    }}
                    isStandalone={true}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Fast Generator Modal */}
      <ProposalAiModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onProposalGenerated={handleAiGenerated}
        crmLeads={crmLeads}
      />
    </div>
  );
};
