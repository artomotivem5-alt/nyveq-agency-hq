import React, { useState } from 'react';
import { ProposalData, ProposalStudioStatus } from '../../../types';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Eye,
  Edit3,
  Search,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  Archive,
  ExternalLink,
  DollarSign,
} from 'lucide-react';

interface ProposalLibraryViewProps {
  proposals: ProposalData[];
  onOpenProposal: (id: string) => void;
  onNewProposal: () => void;
  onDuplicateProposal: (id: string) => void;
  onDeleteProposal: (id: string) => void;
  onPreviewClient: (id: string) => void;
  onStatusChange: (id: string, newStatus: ProposalStudioStatus) => void;
}

export const ProposalLibraryView: React.FC<ProposalLibraryViewProps> = ({
  proposals,
  onOpenProposal,
  onNewProposal,
  onDuplicateProposal,
  onDeleteProposal,
  onPreviewClient,
  onStatusChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter proposals by tab and search
  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      (p.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.projectTitle || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'drafts') return p.status === 'draft' || !p.status;
    if (activeTab === 'sent') return p.status === 'sent' || p.status === 'ready' || p.status === 'viewed';
    if (activeTab === 'approved') return p.status === 'approved' || p.status === 'accepted';
    if (activeTab === 'archive') return p.status === 'archived' || p.status === 'declined';
    return true;
  });

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'approved':
      case 'accepted':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40';
      case 'sent':
      case 'viewed':
        return 'bg-blue-950/40 text-blue-300 border-blue-500/40';
      case 'ready':
        return 'bg-purple-950/40 text-purple-300 border-purple-500/40';
      case 'declined':
      case 'archived':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      case 'draft':
      default:
        return 'bg-amber-950/40 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Proposal Library</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Manage bespoke digital presence monographs, statuses, and client presentations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search atelier or client..."
              className="bg-[#12111f] border border-[#242236] rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500 w-48 sm:w-64"
            />
          </div>

          <button
            onClick={onNewProposal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/20 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Proposal</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f1d2c] pb-2 overflow-x-auto">
        {[
          { key: 'all', label: 'All Proposals', count: proposals.length },
          { key: 'drafts', label: 'Drafts', count: proposals.filter((p) => p.status === 'draft' || !p.status).length },
          { key: 'sent', label: 'Sent & In Review', count: proposals.filter((p) => p.status === 'sent' || p.status === 'ready' || p.status === 'viewed').length },
          { key: 'approved', label: 'Approved', count: proposals.filter((p) => p.status === 'approved' || p.status === 'accepted').length },
          { key: 'archive', label: 'Archive', count: proposals.filter((p) => p.status === 'archived' || p.status === 'declined').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-[#1a182b] text-purple-300 border border-purple-500/40 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-[#12111f]'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#201d36] text-zinc-300">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Proposal Cards Grid */}
      {filteredProposals.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0c0b14] border border-[#1f1d2c] space-y-3">
          <FileText className="w-8 h-8 text-zinc-600 mx-auto" />
          <p className="text-sm text-zinc-400">No proposals found matching this filter.</p>
          <button
            onClick={onNewProposal}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold"
          >
            Create New Proposal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map((proposal) => {
            const isFounding = proposal.packageConfig?.isFoundingPartner || proposal.id.includes('founding');
            const tier = proposal.packageConfig?.tier || (proposal.id.includes('authority') ? 'authority' : proposal.id.includes('presence') ? 'presence' : 'signature');
            const displayValue = isFounding
              ? (proposal.packageConfig?.actualBuildFee ? `${proposal.packageConfig.actualBuildFee.toLocaleString()} EGP (Founding)` : '0 EGP (Founding)')
              : proposal.investment;

            return (
              <div
                key={proposal.id}
                className="p-5 rounded-2xl bg-[#0f0e17] border border-[#242236] hover:border-[#383554] transition-all space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Header: Client Name & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider">
                        {tier.toUpperCase()} SYSTEM
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {proposal.companyName}
                      </h3>
                      <div className="text-xs text-zinc-400 font-mono">
                        Attn: {proposal.clientName}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold border shrink-0 ${getStatusBadgeClass(
                        proposal.status
                      )}`}
                    >
                      {proposal.status || 'draft'}
                    </span>
                  </div>

                  {/* Details Summary */}
                  <div className="p-3 rounded-xl bg-[#08070d] border border-[#1a1928] space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">Value:</span>
                      <span className="font-bold text-emerald-400">{displayValue}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">Timeline:</span>
                      <span>{proposal.timeline}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">Date:</span>
                      <span>{proposal.proposalDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="border-t border-[#1f1d2c] pt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenProposal(proposal.id)}
                      className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Studio</span>
                    </button>
                    <button
                      onClick={() => onPreviewClient(proposal.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#141322] hover:bg-[#1c1a30] text-zinc-300 text-xs font-mono flex items-center gap-1"
                      title="Preview as Client"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Client</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateProposal(proposal.id)}
                      className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-[#141322]"
                      title="Duplicate Proposal"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProposal(proposal.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-[#141322]"
                      title="Delete Proposal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
