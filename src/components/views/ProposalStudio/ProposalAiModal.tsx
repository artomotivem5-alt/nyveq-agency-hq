import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Building2,
  User,
  MapPin,
  Flame,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Zap,
  Layers
} from 'lucide-react';
import { PackageTier, ProposalData } from '../../../types';
import { PACKAGE_PRESETS, calculatePackagePricing, getStandardScope, DEFAULT_PROPOSAL_SECTIONS } from '../../../data/packageScopes';
import { synthesizeProposal } from '../../../utils/proposalSynthesizer';
import { THEME_PRESETS } from '../../../utils/proposalThemes';

interface ProposalAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProposalGenerated: (proposal: ProposalData) => void;
  crmLeads?: { company: string; contact: string; location: string; standoutProject: string; observedFlaw: string; targetTier: PackageTier }[];
}

export const ProposalAiModal: React.FC<ProposalAiModalProps> = ({
  isOpen,
  onClose,
  onProposalGenerated,
  crmLeads = []
}) => {
  const [firmName, setFirmName] = useState('');
  const [prospectName, setProspectName] = useState('');
  const [contactTitle, setContactTitle] = useState('Founder & Principal Architect');
  const [location, setLocation] = useState('New Cairo');
  const [standoutProject, setStandoutProject] = useState('');
  const [observedFlaw, setObservedFlaw] = useState('');
  const [tier, setTier] = useState<PackageTier>('signature');
  const [customPrice, setCustomPrice] = useState<string>('');
  const [isFoundingPartner, setIsFoundingPartner] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  // Auto-fill if user selects a lead from CRM dropdown
  const handleSelectLead = (leadCompany: string) => {
    const found = crmLeads.find((l) => l.company === leadCompany);
    if (found) {
      setFirmName(found.company);
      const cleanContact = found.contact.split('(')[0].trim();
      const title = found.contact.includes('(')
        ? found.contact.split('(')[1].replace(')', '').trim()
        : 'Founder & Principal';
      setProspectName(cleanContact);
      setContactTitle(title);
      setLocation(found.location);
      setStandoutProject(found.standoutProject);
      setObservedFlaw(found.observedFlaw);
      setTier(found.targetTier || 'signature');
      setIsFoundingPartner(found.targetTier === 'founding');
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmName.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const specialPrice = customPrice ? Number(customPrice) : undefined;
      const effectiveTier = isFoundingPartner ? 'founding' : tier;
      const pricing = calculatePackagePricing(effectiveTier, isFoundingPartner, specialPrice);

      // Synthesize complete narrative using proposal synthesizer
      const synthesized = synthesizeProposal({
        prospectName: prospectName.trim() || 'Eng. Principal',
        firmName: firmName.trim(),
        contactTitle: contactTitle.trim() || 'Managing Principal',
        location: location.trim() || 'New Cairo',
        standoutProject: standoutProject.trim() || 'Signature Private Villa Handover',
        observedFlaw: observedFlaw.trim() || 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات الـ 7.5M+ EGP',
        tier: effectiveTier
      });

      // Assemble full rich proposal object
      const fullProposal: ProposalData = {
        ...synthesized,
        id: `prop-${Date.now()}`,
        packageConfig: pricing,
        scopeItems: getStandardScope(effectiveTier),
        sections: DEFAULT_PROPOSAL_SECTIONS,
        theme: THEME_PRESETS['nyveq-dark'],
        status: 'ready',
        industry: 'Luxury Architecture & Turnkey Interior Design',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      setIsGenerating(false);
      onProposalGenerated(fullProposal);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="luxury-card w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 md:p-8 rounded-3xl border border-[#2f2e46] shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#212033] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[var(--accent-purple)]" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <span>توليد بروبوزال فوري بالذكاء الاصطناعي</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40">
                  AI ENGINE
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                أدخل بيانات أي عميل (سواء في الـ CRM أو عميل جديد تماماً من الخارج) ليتم توليد العرض كاملاً في ثوانٍ.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Fill from CRM (Optional) */}
        {crmLeads.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#0f0e1a] border border-[#232135] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1 text-purple-300 font-semibold">
                <Zap className="w-3.5 h-3.5" />
                تعبئة سريعة من الـ CRM (اختياري):
              </span>
              <span>أو اكتب بيانات عميل جديد أدناه مباشرة</span>
            </div>
            <select
              onChange={(e) => handleSelectLead(e.target.value)}
              defaultValue=""
              className="w-full px-3 py-2 bg-[#141322] border border-[#29273f] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-[var(--accent-purple)]"
            >
              <option value="">-- اختر استوديو من الـ CRM لتعبئة البيانات تلقائياً --</option>
              {crmLeads.map((lead, idx) => (
                <option key={idx} value={lead.company}>
                  {lead.company} — {lead.location} ({lead.targetTier})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Atelier / Firm Name */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                اسم الأتيليه / المكتب (Atelier Name) *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="مثال: Arkan Luxury Interiors"
                  className="w-full pl-9 pr-3 py-2 bg-[#0d0c16] border border-[#232135] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Founder / Contact Person */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                اسم المهندس / المؤسس (Founder Name) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder="مثال: Arch. Tarek Nour"
                  className="w-full pl-9 pr-3 py-2 bg-[#0d0c16] border border-[#232135] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                مقر الأعمال والكمبوندات (Location)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="مثال: Katameya Dunes & Palm Hills"
                  className="w-full pl-9 pr-3 py-2 bg-[#0d0c16] border border-[#232135] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Standout Project */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                أهم فيلا أو مشروع سلموه (Standout Project)
              </label>
              <input
                type="text"
                value={standoutProject}
                onChange={(e) => setStandoutProject(e.target.value)}
                placeholder="مثال: Standalone Villa Lake View"
                className="w-full px-3 py-2 bg-[#0d0c16] border border-[#232135] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Digital Flaw / Observed Context */}
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              المشكلة الرقمية المرصودة (Observed Flaw / Gap)
            </label>
            <textarea
              rows={2}
              value={observedFlaw}
              onChange={(e) => setObservedFlaw(e.target.value)}
              placeholder="مثال: الاعتماد حصرياً على إنستجرام وتشتت صور التشطيبات مع استنزاف وقت الفريق في استفسارات ميزانيات غير مؤهلة."
              className="w-full p-3 bg-[#0d0c16] border border-[#232135] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 leading-relaxed"
            />
          </div>

          {/* Package Tier Selection */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold text-white">
              اختيار الباقة المعتمدة والتسعير:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'presence', name: 'Presence', price: '12,997 EGP', care: '997/mo' },
                { id: 'signature', name: 'Signature', price: '21,997 EGP', care: '1,497/mo', badge: 'MOST POPULAR' },
                { id: 'authority', name: 'Authority', price: '34,997 EGP+', care: '1,997/mo' },
                { id: 'founding', name: 'Founding Partner', price: '0 EGP', care: '997/mo' }
              ].map((p) => {
                const isSelected = p.id === 'founding' ? isFoundingPartner : (!isFoundingPartner && tier === p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      if (p.id === 'founding') {
                        setIsFoundingPartner(true);
                      } else {
                        setIsFoundingPartner(false);
                        setTier(p.id as PackageTier);
                      }
                    }}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-950/40'
                        : 'bg-[#0f0e1a] border-[#232135] text-zinc-400 hover:text-white hover:border-[#333148]'
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-2 left-2 text-[8px] font-mono px-1.5 py-0.2 rounded bg-purple-600 text-white font-bold">
                        {p.badge}
                      </span>
                    )}
                    <div className="text-xs font-bold text-white">{p.name}</div>
                    <div className="text-[11px] font-mono font-semibold text-purple-300 mt-1">{p.price}</div>
                    <div className="text-[9px] font-mono text-zinc-500">رعاية {p.care}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Price Override (Optional) */}
          <div className="p-3.5 rounded-xl bg-[#0f0e1a] border border-[#232135] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-zinc-200 block">
                تعديل الميزانية يدوياً (اختياري - Custom Price Override)
              </span>
              <span className="text-[11px] text-zinc-400">
                إذا تم التفاوض على سعر خاص، أدخله هنا وسيعيد النظام حساب دفعة البداية (50%) ودفعة التسليم تلقائياً.
              </span>
            </div>
            <div className="w-full sm:w-44 shrink-0">
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="مثال: 25000"
                className="w-full px-3 py-2 bg-[#141322] border border-[#29273f] rounded-xl text-xs text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#212033]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isGenerating || !firmName.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#8b5cf6] hover:to-[#7c3aed] disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                  <span>جارٍ الصياغة المعمارية بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>توليد البروبوزال فورياً (3 ثوانٍ)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
