import React, { useState } from 'react';
import {
  Copy,
  Check,
  PhoneCall,
  MessageSquare,
  Mail,
  FileText,
  UserCheck,
  CreditCard,
  CheckCircle2,
  Wand2,
  BookOpen,
  Sparkles,
  Search,
  Compass,
  ArrowRight,
  Shield,
  HelpCircle,
  Tag,
} from 'lucide-react';
import { ViewMode } from '../../types';
import { ScriptGenerator } from './ScriptGenerator';

interface TemplatesViewProps {
  onSelectView?: (view: ViewMode) => void;
  defaultTab?: 'sales' | 'client' | 'internal' | 'generator';
}

interface PlaybookScriptItem {
  id: string;
  title: string;
  scenario: string;
  category: 'SALES' | 'CLIENT' | 'INTERNAL';
  channel: 'Cold Call' | 'WhatsApp / DM' | 'Email' | 'Follow-up' | 'Closing' | 'Onboarding' | 'Internal';
  bestUsedWhen: string;
  goal: string;
  exactScript: string;
  branching?: string;
  notes?: string;
  isArabic: boolean;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectView,
  defaultTab = 'sales',
}) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'client' | 'internal' | 'generator'>(defaultTab);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playbookScripts: PlaybookScriptItem[] = [
    // SALES PLAYBOOK SCRIPTS
    {
      id: 'script-cc-hook',
      title: 'The 30-Second Respectful Cold Call Opener',
      scenario: 'Initial Phone Call to Studio Founder / Principal Architect',
      category: 'SALES',
      channel: 'Cold Call',
      bestUsedWhen: 'Calling an interior atelier principal during business hours (11 AM – 4 PM) after auditing their standout project.',
      goal: 'Secure 30 seconds of attention and transition to diagnosis question with zero immediate sales pressure.',
      isArabic: true,
      exactScript: `أستاذ [الاسم]؟ معاك أحمد من NYVEQ.
هكون سريع جدًا؛ كنت بتصفح شغل [الشركة] ولاحظت نقطة محددة في طريقة عرض مشاريعكم أونلاين. ينفع آخد منك 30 ثانية؟

لاحظت إن عندكم Projects قوية جدًا ومحترمة على Instagram (زي مشروع [اسم المشروع المميز])، لكن العميل الجديد اللي عايز يفهم الشركة كاملة ويشوف المشاريع والخدمات والتشطيب بشكل منظم، بيضطر يتنقل بين Posts وHighlights ومعلومات متفرقة.

حاليًا لما عميل جديد يحب يشوف أعمالكم وخدماتكم كاملة قبل ما يتواصل، بتوجهوه لفين؟`,
      branching: 'If they say "Instagram only or WhatsApp": Bridge into 15-min concept demo. If they say "We have a website": Ask when it was last refreshed and if it screens for budget.',
      notes: 'Deliver calmly with zero high-pitched sales inflection. Speak founder-to-founder.',
    },
    {
      id: 'script-angle-b-founding',
      title: 'Angle B: Founding Partner Cohort DM',
      scenario: 'Direct Message to Founder of Verified High-Aesthetic Firm',
      category: 'SALES',
      channel: 'WhatsApp / DM',
      bestUsedWhen: 'Targeting top 5–7 studios in Katameya Dunes, Palm Hills, or Sheikh Zayed with exceptional execution photography.',
      goal: 'Book a 15-minute concept demonstration for the Founding Partner cohort.',
      isArabic: true,
      exactScript: `أهلًا مهندس [الاسم]، معاك أحمد من NYVEQ.

شفت تشطيباتكم الأخيرة في [اسم الكومباوند / المشروع] ومستوى الاهتمام بتفاصيل الرخام والإضاءة ممتاز جدًا ويستحق التقدير.

إحنا بنطلق حاليًا مجموعة حصرية من 5 لـ 7 استوديوهات تصميم داخلي وتشطيبات في مصر كـ Founding Partners، لتصميم وبناء Digital Presence System متكامل لمشاريعهم بدون أي تكلفة بناء (Build Fee 0 EGP)، في مقابل توثيق تجربة العمل كـ Case Study رسمية.

إذا كان التوقيت مناسب، متاح أشاركك تصور سريع في 10 دقائق على زووم هذا الأسبوع؟`,
      branching: 'If positive: Send booking link or offer 2 specific time slots. Never pitch as "free website".',
      notes: 'Position strictly as an executive partnership requiring active asset collaboration and a verified video testimonial.',
    },
    {
      id: 'script-angle-a-portfolio',
      title: 'Angle A: Portfolio Showcase & Curation DM',
      scenario: 'Direct Message Praising Real Project by Name',
      category: 'SALES',
      channel: 'WhatsApp / DM',
      bestUsedWhen: 'When the studio has just posted a completed villa handover or high-end residential renovation.',
      goal: 'Prompt them to reflect on whether Instagram does justice to their villa commission scale.',
      isArabic: true,
      exactScript: `مساء الخير يا مهندس [الاسم]،
شفت تنفيذكم الراقي لمشروع [اسم المشروع] وما شاء الله الفينيش مميز جدًا وتوزيع المساحات مدروس بعناية.

عندي ملاحظة صغيرة بخصوص طريقة توثيق وعرض أعمالكم خارج إنستغرام؛ عملاء الفلل بميزانيات 7.5M+ EGP غالبًا بيحتاجوا يشوفوا الـ Dossier كامل بمواصفات الخامات قبل التواصل.

ينفع أشاركك تصور بسيط صممناه لطريقة عرض مشاريعكم في دقيقة؟`,
      branching: 'If they reply "Sure / تفضل": Send a 60-second personalized Loom link or mobile concept screenshot.',
      notes: 'Always name an actual project and praise specific craftsmanship (e.g. millwork, marble, MEP execution).',
    },
    {
      id: 'script-angle-c-friction',
      title: 'Angle C: Instagram Over-Reliance & DM Fatigue',
      scenario: 'Direct Message Addressing WhatsApp Qualification Friction',
      category: 'SALES',
      channel: 'WhatsApp / DM',
      bestUsedWhen: 'When the studio receives many casual comments like "Price?" or "بكام المتر؟" under their reels.',
      goal: 'Diagnose whether senior team members waste hours filtering low-budget price shoppers.',
      isArabic: true,
      exactScript: `أهلًا أستاذ [الاسم]، معاك أحمد من NYVEQ.
معظم شركات التشطيب الراقي اللي بنتواصل معاها في القاهرة الجديدة والشيخ زايد بتعاني من نفس النقطة:
الإنستغرام بيجيب تفاعل كويس، لكن أغلب الرسايل بتكون استفسارات عشوائية بتاخد وقت طويل في الرد بدون فلترة للميزانية.

بنبني نظام بيستقبل العميل في مسار منظم يوضح نوعية تشطيباتكم ويطلب منه تحديد تفاصيل الفيلا والميزانية قبل تحويله للواتساب.

لو حابب تشوف نموذج عملي للنظام، متاح نتواصل في 10 دقائق؟`,
      branching: 'If they agree: Schedule Zoom diagnosis call and ask Discovery Questions 1 and 4.',
      notes: 'Directly triggers the pain point of founders spending evenings answering entry-level inquiries.',
    },
    {
      id: 'script-email-executive',
      title: 'Executive Monograph Introduction Email',
      scenario: 'Formal Outreach to Atelier Managing Director',
      category: 'SALES',
      channel: 'Email',
      bestUsedWhen: 'Reaching out to larger master builder firms where phone numbers route to junior receptionists.',
      goal: 'Engage the managing partner with institutional-grade architectural framing.',
      isArabic: false,
      exactScript: `Subject: Observation regarding [Studio Name] architectural presentation

Dear [First Name],

I recently reviewed your completed residential projects in [Location/Compound] and noted exceptional finishing standards and refined spatial planning.

However, when a high-net-worth client seeks to review your comprehensive project dossiers, material specifications, and turnkey boundaries prior to booking an initial consultation, the current digital journey is fragmented across social media posts.

We designed a preliminary digital monograph concept for [Studio Name] demonstrating how your executed residences can convert qualified villa commissions directly.

Would you be open to a 10-minute preview this Wednesday at 2 PM or Thursday at 4 PM?

Best regards,
Ahmed
Founder, NYVEQ
nyveq.com`,
      branching: 'If they reply with time: Send calendar invitation with custom agenda. If no reply in 48h: Trigger Follow-up 1.',
      notes: 'Keep layout strictly text-only with zero promotional banners or tracking attachments.',
    },
    {
      id: 'script-fu-48h',
      title: 'Gentle 48-Hour Follow-up Message',
      scenario: 'Check-in After Unanswered Initial Message',
      category: 'SALES',
      channel: 'Follow-up',
      bestUsedWhen: 'Sent exactly 48 hours after an initial DM or cold call where interest was expressed but unscheduled.',
      goal: 'Re-open communication without appearing desperate or transactional.',
      isArabic: true,
      exactScript: `أهلًا مهندس [الاسم]، حبيت أتأكد إن رسالتي السابقة وصلتك بخصوص طريقة عرض مشروع [اسم المشروع].

الموضوع مش بيع موقع تقليدي؛ إحنا بنبني نظام رقمي يوضح للعميل الفرق بين خدمات التصميم والتشطيب المتكامل ويفلتر العملاء الجادين قبل ما يتواصلوا على تليفونك.

لو حابب تشوف التصور المبدئي، متاح نحدد 10 دقائق على زووم هذا الأسبوع. تحياتي لك!`,
      branching: 'If they answer: Secure specific calendar slot. If silent: Wait 5 business days for Value-Add follow-up.',
      notes: 'Never say "Just bumping this" or "Did you see my email?". Always restate the core business distinction.',
    },
    {
      id: 'script-closing-handshake',
      title: 'Proposal Review & Commencement Handshake',
      scenario: 'Verbal Review After Sending Web Proposal',
      category: 'SALES',
      channel: 'Closing',
      bestUsedWhen: 'Prospect has received the interactive web proposal link and is ready to confirm commencement.',
      goal: 'Secure agreement on the 50% kickoff deposit and lock the sprint delivery dates.',
      isArabic: true,
      exactScript: `أستاذ [الاسم]، راجعنا سوا كل بنود وثيقة المقترح المخصصة لـ [اسم الشركة].
الجدول الزمني للإنتاج محجوز لسبرنت الـ [10–18] يوم عمل القادمة، والخطوة التالية هي إصدار فاتورة الدفعة المقدمة (50%) وفتح مجلد الـ Drive المشترك لاستلام أصول المشاريع.

نبدأ إعداد الاتفاقية اليوم ونعتمد موعد الإطلاق الرسمي؟`,
      branching: 'If they raise price objection: Re-anchor to villa contract margin ($150k+). If approved: Issue deposit invoice immediately.',
      notes: 'Zero production work starts prior to deposit clearance in bank account.',
    },

    // CLIENT ONBOARDING & DELIVERY PLAYBOOK
    {
      id: 'script-onboarding-drive',
      title: '6-Folder Asset Intake & Photography Guidelines',
      scenario: 'Formal WhatsApp / Email Dispatch Upon Deposit Receipt',
      category: 'CLIENT',
      channel: 'Onboarding',
      bestUsedWhen: 'Sent within 2 hours of 50% deposit clearance to initiate the 48-hour asset intake sprint.',
      goal: 'Direct the client into uploading high-resolution photography into the structured 6 folders.',
      isArabic: true,
      exactScript: `أهلًا فريق [اسم الشركة]، تم تأكيد استلام الدفعة المقدمة بنجاح وبدء سبرنت التنفيذ.

لضمان أعلى معايير الجودة المعمارية في منصتكم الجديدة، نرجو رفع أصول المشاريع على مجلد Google Drive المشترك المرفق خلال 48 ساعة:
رابط المجلد المشترك: [Google Drive Link]

الهيكلية مقسمة لـ 6 مجلدات رئيسية:
01_Brand_Assets: اللوجو بصيغة Vector (SVG أو AI) أو PNG شفاف عالي الدقة.
02_Projects_Portfolio: صور أصلية غير مضغوطة لأهم 5 مشاريع تم تسليمها (مع موقع المشروع والمساحة).
03_Firm_Profile_Team: نبذة عن المؤسس والفلسفة التصميمية وصور الاستوديو.
04_Services_Pricing: مجالات العمل وتصنيفات التشطيب (Design / Turnkey Fit-out).
05_Client_Reviews: شهادات وتوصيات العملاء السابقين.
06_Legal_Contact: أرقام الواتساب المعتمدة والفروع وساعات العمل.

نرجو تجنب إرسال سكرين شوتس من الموبايل لضمان نقاء الشاشات الكبيرة. شكرًا لتعاونكم!`,
      branching: 'Check folder after 24h. If empty, send supportive WhatsApp nudge offer to assist with file transfer.',
      notes: 'Sprint delivery clock only starts once folders 01 and 02 are verified complete.',
    },
  ];

  // Filtering
  const filteredScripts = playbookScripts.filter((script) => {
    const matchesTab =
      activeTab === 'sales'
        ? script.category === 'SALES'
        : activeTab === 'client'
        ? script.category === 'CLIENT'
        : activeTab === 'internal'
        ? script.category === 'INTERNAL'
        : true;

    const matchesChannel = selectedChannel === 'all' || script.channel === selectedChannel;

    const matchesSearch =
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.exactScript.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesChannel && matchesSearch;
  });

  const channels = ['all', 'Cold Call', 'WhatsApp / DM', 'Email', 'Follow-up', 'Closing', 'Onboarding'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#1c1a2c] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121120] border border-[#242238] text-[11px] font-mono text-purple-300 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
          <span>SALES SCRIPT PLAYBOOK // SOVEREIGN ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Executive Scripts &amp; Client Playbook
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Field-tested sales dialogs, cold call openers, Arabic DM hooks, follow-up cadences, and client onboarding protocols designed for high-ticket Egyptian interior finishing firms.
        </p>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c1a2c] pb-4">
        <div className="flex items-center gap-2">
          {[
            { id: 'sales', label: 'Sales Playbook', icon: PhoneCall },
            { id: 'client', label: 'Client Communications', icon: UserCheck },
            { id: 'generator', label: 'Dynamic Script Synthesizer', icon: Wand2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/25'
                    : 'bg-[#121120] text-zinc-400 hover:text-white border border-[#201e32]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab !== 'generator' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search scripts or phrases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f0e18] border border-[#222034] rounded-xl pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500/80 transition-colors"
            />
          </div>
        )}
      </div>

      {/* Generator Tab View */}
      {activeTab === 'generator' ? (
        <ScriptGenerator />
      ) : (
        /* Playbook Cards Grid View */
        <div className="space-y-6">
          {/* Channel Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {channels.map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedChannel === ch
                    ? 'bg-[#1c1932] text-purple-300 border border-purple-500/40 font-bold'
                    : 'bg-[#100f1a] text-zinc-400 hover:text-zinc-200 border border-[#1b1928]'
                }`}
              >
                {ch === 'all' ? 'All Channels' : ch}
              </button>
            ))}
          </div>

          {/* Script Playbook Cards List */}
          <div className="space-y-6">
            {filteredScripts.map((script) => (
              <article
                key={script.id}
                className="p-7 sm:p-8 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] hover:border-[#2f2b48] transition-all space-y-6 shadow-xl"
              >
                {/* Header Metadata Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#181628] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#171526] text-purple-300 border border-purple-500/30 font-bold uppercase">
                        {script.channel}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        SCENARIO: {script.scenario}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {script.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopy(script.id, script.exactScript)}
                    className="px-4 py-2 rounded-xl bg-[#151324] hover:bg-[#1f1c36] text-zinc-200 hover:text-white border border-[#272440] text-xs font-mono font-medium flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
                  >
                    {copiedId === script.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
                        <span className="text-emerald-400 font-bold">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Best Used When & Strategic Goal Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-[#090810] border border-[#181628]">
                  <div className="space-y-1">
                    <span className="text-zinc-500 font-bold flex items-center gap-1.5 uppercase">
                      <Compass className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                      <span>Best Used When:</span>
                    </span>
                    <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                      {script.bestUsedWhen}
                    </p>
                  </div>

                  <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#181628] pt-3 md:pt-0 md:pl-4">
                    <span className="text-zinc-500 font-bold flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
                      <span>Strategic Goal:</span>
                    </span>
                    <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                      {script.goal}
                    </p>
                  </div>
                </div>

                {/* Dedicated High-Contrast Script Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="uppercase tracking-wider font-bold">Exact Verbatim Script</span>
                    <span>{script.isArabic ? 'Arabic / بالعامية المهنية' : 'English / Formal Executive'}</span>
                  </div>

                  <div
                    dir={script.isArabic ? 'rtl' : 'ltr'}
                    className="p-6 rounded-xl bg-[#07060b] border-l-4 border-purple-500 shadow-inner text-sm sm:text-base leading-[2.3] text-zinc-100 font-sans selection:bg-purple-600 selection:text-white"
                  >
                    {script.exactScript.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-3 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Branching & Operational Notes */}
                {(script.branching || script.notes) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    {script.branching && (
                      <div className="p-3.5 rounded-xl bg-[#100f1a] border border-[#1c1a2c] space-y-1">
                        <strong className="text-purple-400 font-mono text-[11px] block uppercase">
                          Next Branch / Objection Fork:
                        </strong>
                        <p className="text-zinc-300 leading-relaxed font-sans">
                          {script.branching}
                        </p>
                      </div>
                    )}

                    {script.notes && (
                      <div className="p-3.5 rounded-xl bg-[#100f1a] border border-[#1c1a2c] space-y-1">
                        <strong className="text-amber-400 font-mono text-[11px] block uppercase">
                          Operational Guardrail:
                        </strong>
                        <p className="text-zinc-300 leading-relaxed font-sans">
                          {script.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
