import React, { useState, useEffect } from 'react';
import { ViewMode, ProposalData } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { QuickAnswerBar } from './components/layout/QuickAnswerBar';
import { CommandCenter } from './components/views/CommandCenter';
import { CompanyView } from './components/views/CompanyView';
import { OffersView } from './components/views/OffersView';
import { MarketView } from './components/views/MarketView';
import { SalesView } from './components/views/SalesView';
import { DeliveryView } from './components/views/DeliveryView';
import { SopsView } from './components/views/SopsView';
import { TemplatesView } from './components/views/TemplatesView';
import { ProposalBuilder } from './components/views/ProposalBuilder';
import { ProposalStudio } from './components/views/ProposalStudio/ProposalStudio';
import { ProposalClientView } from './components/views/ProposalClientView';
import { ProgressView } from './components/views/ProgressView';
import { CrmView } from './components/views/CrmView';
import { CallCockpit } from './components/views/CallCockpit';
import { LoginView } from './components/views/LoginView';
import { FounderExecutionView } from './components/views/FounderExecutionView';
import { DEFAULT_PROPOSAL } from './data/defaultProposal';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>(() => {
    const hash = window.location.hash.replace('#/', '');
    if (hash === 'proposal-preview') return 'proposals-builder';
    if (hash === 'login') return 'command-center';
    return hash ? (hash as ViewMode) : 'command-center';
  });

  const [showQuickAnswers, setShowQuickAnswers] = useState(false);

  // Check if standalone proposal route is accessed via hash #/proposal
  const isStandaloneProposal = window.location.hash.startsWith('#/proposal');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash && hash !== 'proposal') {
        setActiveView(hash as ViewMode);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectView = (view: ViewMode) => {
    setActiveView(view);
    window.location.hash = `#/${view}`;
  };

  // Standalone Client View (when shared directly or via route)
  if (isStandaloneProposal) {
    let proposalData: ProposalData = DEFAULT_PROPOSAL;
    const hash = window.location.hash;
    const idMatch = hash.match(/[?&]id=([^&]+)/) || hash.match(/#\/proposal\/([^?&]+)/);
    const targetId = idMatch ? idMatch[1] : null;

    if (targetId) {
      const savedLib = localStorage.getItem('nyveq_proposals_library');
      if (savedLib) {
        try {
          const lib: ProposalData[] = JSON.parse(savedLib);
          const found = lib.find((p) => p.id === targetId);
          if (found) proposalData = found;
        } catch (e) {}
      }
    } else {
      const savedProposal = localStorage.getItem('nyveq_active_proposal');
      if (savedProposal) {
        try {
          proposalData = JSON.parse(savedProposal);
        } catch (e) {}
      }
    }

    return (
      <ProposalClientView
        data={proposalData}
        onBackToEditor={() => {
          window.location.hash = '#/proposals-builder';
          setActiveView('proposals-builder');
        }}
        isStandalone={false}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'command-center':
        return <CommandCenter onSelectView={handleSelectView} />;

      // STRATEGY
      case 'company-overview':
      case 'company-positioning':
        return <CompanyView defaultTab="positioning" />;

      case 'company-principles':
        return <CompanyView defaultTab="principles" />;

      case 'company-roadmap':
        return <CompanyView defaultTab="roadmap" />;

      case 'company-offers':
      case 'offers-active':
        return <OffersView onSelectView={handleSelectView} defaultTab="active" />;

      case 'offers-future':
        return <OffersView onSelectView={handleSelectView} defaultTab="future" />;

      case 'company-icp':
      case 'market-icp':
      case 'market-scoring':
        return <MarketView onSelectView={handleSelectView} defaultSection="icp" />;

      case 'market-scorer':
        return <MarketView onSelectView={handleSelectView} defaultSection="scorer" />;

      case 'company-market':
      case 'market-research':
        return <MarketView onSelectView={handleSelectView} defaultSection="research" />;

      // SALES
      case 'sales-funnel':
        return <SalesView onSelectView={handleSelectView} defaultSection="funnel" />;

      case 'sales-outreach':
      case 'sales-followup':
        return <SalesView onSelectView={handleSelectView} defaultSection="outreach" />;

      case 'sales-discovery':
        return <SalesView onSelectView={handleSelectView} defaultSection="discovery" />;

      case 'sales-demo':
        return <SalesView onSelectView={handleSelectView} defaultSection="demo" />;

      case 'sales-closing':
        return <SalesView onSelectView={handleSelectView} defaultSection="closing" />;

      case 'sales-objections':
        return <SalesView onSelectView={handleSelectView} defaultSection="objections" />;

      case 'sales-principles':
        return <SalesView onSelectView={handleSelectView} defaultSection="principles" />;

      case 'sales-cockpit':
        return <CallCockpit onSelectView={handleSelectView} />;

      // DELIVERY
      case 'delivery-overview':
      case 'delivery-onboarding':
      case 'delivery-discovery':
      case 'delivery-strategy':
      case 'delivery-build':
      case 'delivery-review':
      case 'delivery-revisions':
      case 'delivery-launch':
      case 'delivery-postlaunch':
        return <DeliveryView onSelectView={handleSelectView} />;

      // LIBRARY
      case 'sops-catalog':
        return <SopsView />;

      case 'templates-catalog':
        return <TemplatesView onSelectView={handleSelectView} defaultTab="sales" />;

      case 'library-scripts':
        return <TemplatesView onSelectView={handleSelectView} defaultTab="sales" />;

      case 'library-notes':
        return <TemplatesView onSelectView={handleSelectView} defaultTab="internal" />;

      // PROPOSALS
      case 'proposals-builder':
      case 'sales-proposal':
        return <ProposalStudio initialMode="editor" />;
      case 'proposals-library':
        return <ProposalStudio initialMode="library" />;

      // PROGRESS
      case 'progress-tracker':
        return <ProgressView onSelectView={handleSelectView} defaultTab="all" />;

      case 'progress-completed':
        return <ProgressView onSelectView={handleSelectView} defaultTab="completed" />;

      case 'progress-in-progress':
        return <ProgressView onSelectView={handleSelectView} defaultTab="building" />;

      case 'progress-next':
        return <ProgressView onSelectView={handleSelectView} defaultTab="next" />;

      case 'progress-later':
        return <ProgressView onSelectView={handleSelectView} defaultTab="later" />;

      case 'progress-decision-log':
        return <ProgressView onSelectView={handleSelectView} defaultTab="decisions" />;

      // CRM
      case 'crm-bridge':
        return <CrmView onSelectView={handleSelectView} />;

      // FOUNDER EXECUTION
      case 'founder-execution':
        return <FounderExecutionView onSelectView={handleSelectView} />;

      default:
        return <CommandCenter onSelectView={handleSelectView} />;
    }
  };

  if (!isLoggedIn && !isStandaloneProposal) {
    return <LoginView onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#07060a] text-zinc-100 overflow-hidden font-sans">
      {/* Navigation Sidebar */}
      <Sidebar activeView={activeView} onSelectView={handleSelectView} />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Operational Header */}
        <TopHeader
          activeView={activeView}
          onSelectView={handleSelectView}
          showQuickAnswers={showQuickAnswers}
          onToggleQuickAnswers={() => setShowQuickAnswers(!showQuickAnswers)}
        />

        {/* 10-Second Orientation Dropdown Panel */}
        {showQuickAnswers && (
          <QuickAnswerBar
            onSelectView={(view) => {
              handleSelectView(view);
              setShowQuickAnswers(false);
            }}
            onClose={() => setShowQuickAnswers(false)}
          />
        )}

        {/* Scrollable View Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#07060a]">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;
