import React, { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  HelpCircle,
  Copy,
  Check,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  Compass,
  FileText,
  Clock,
  Shield,
  Layers,
  Search,
  Target,
  ChevronRight,
} from 'lucide-react';
import { ViewMode } from '../../types';
import { OBJECTIONS_DATA } from '../../data/objectionsData';

interface SalesViewProps {
  onSelectView: (view: ViewMode) => void;
  defaultSection?: 'funnel' | 'outreach' | 'discovery' | 'demo' | 'closing' | 'objections' | 'principles';
}

export const SalesView: React.FC<SalesViewProps> = ({
  onSelectView,
  defaultSection = 'funnel',
}) => {
  const [activeTab, setActiveTab] = useState<'funnel' | 'outreach' | 'discovery' | 'demo' | 'closing' | 'objections' | 'principles'>(defaultSection);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFunnelIndex, setSelectedFunnelIndex] = useState<number>(0);
  const [expandedObj, setExpandedObj] = useState<string | null>('obj-1');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 12 Sequential Architectural Funnel Stages per system requirements
  const funnelStages = [
    {
      num: '01',
      name: 'Prospect',
      goal: 'Identify verified interior design and finishing firms in target territories (New Cairo, Katameya, Zayed, October).',
      whatToDo: 'Audit recent social feed. Confirm executed luxury villas/penthouses, active operations, and commercial capacity.',
      exitCondition: 'Studio name, location, and verified Instagram profile logged in CRM.',
      commonMistakes: 'Adding solo 3D freelancers or low-budget renovators with zero commercial execution bandwidth.',
      relevantScript: 'N/A — Sourcing & Scraping stage.',
    },
    {
      num: '02',
      name: 'Research',
      goal: 'Identify exactly 1 standout executed project by name and 1 specific digital presentation flaw in under 5–7 minutes.',
      whatToDo: 'Inspect link-in-bio. Does it route to a broken PDF, slow generic page, or uncurated WhatsApp link?',
      exitCondition: 'Founder / Principal name + WhatsApp phone + 1 specific project flaw recorded.',
      commonMistakes: 'Spending 20+ minutes admiring portfolio renders without logging the decision maker contact.',
      relevantScript: 'N/A — Diagnostic preparation.',
    },
    {
      num: '03',
      name: 'Outreach',
      goal: 'Initiate direct contact via the 5-Angle Opener Matrix or personalized Instagram DM to open a dialogue.',
      whatToDo: 'Select the best-fit angle based on their profile. Do NOT use canned telemarketing pitches.',
      exitCondition: 'Founder opens DM or answers the phone call.',
      commonMistakes: 'Pitching packages or tech stacks on first contact. Outreach sells ONLY a brief conversation.',
      relevantScript: '«مساء الخير، مكتب [اسم الشركة]؟ كنت حابب أسأل لو ليكم مرجع رسمي متاح لعرض أعمالكم غير صفحة إنستجرام؟»',
    },
    {
      num: '04',
      name: 'Conversation',
      goal: 'State the specific portfolio observation, ask the routing question, and introduce Ahmed naturally.',
      whatToDo: 'Deliver the 30-second observation respectfully. Listen intently to their response before offering any solution.',
      exitCondition: 'Founder articulates current friction (e.g. "We send a WhatsApp PDF" or "Our site is neglected").',
      commonMistakes: 'Interrupting the founder or arguing about why websites matter before they express frustration.',
      relevantScript: '«حاليًا لما عميل فيلا جديد يحب يشوف أعمالكم وخدماتكم بشكل منظم قبل ما يتواصل، بتوجهوه لفين؟»',
    },
    {
      num: '05',
      name: 'Qualification',
      goal: 'Verify Grade A/B criteria: turnkey finishing execution, active site volume, and focus on high-budget residential contracts.',
      whatToDo: 'Ask if they execute turnkey fit-out or design only, and confirm whether private villas are their target.',
      exitCondition: 'Lead verified as Grade A or B with minimum project budget capacity of 2M–10M+ EGP.',
      commonMistakes: 'Booking meetings with budget-incompatible or uncommitted studios who only handle 2D drawings.',
      relevantScript: '«هل معظم تركيزكم على التصميم الداخلي فقط ولا التشطيب المتكامل وتسليم المفتاح (Turnkey)؟»',
    },
    {
      num: '06',
      name: 'Meeting',
      goal: 'Conduct a 15–20 minute diagnostic consultation via Zoom using the 6 Core Discovery Questions.',
      whatToDo: 'Ask the 6 questions in order. Listen 70% of the time. Summarize their bottlenecks back to them with precision.',
      exitCondition: 'Founder affirms the diagnosis and explicitly agrees to view the tailored concept demo.',
      commonMistakes: 'Showing a live demo in minute 1 without diagnosing their exact studio conversion friction first.',
      relevantScript: '«الهدف من جلستنا اليوم هو تشخيص مسار العميل الحالي عندكم ومعرفة أسباب تسرب الاستفسارات قبل مرحلة التعاقد.»',
    },
    {
      num: '07',
      name: 'Demo',
      goal: 'Deliver a focused 10–20 minute walkthrough of the concept platform incorporating their real executed project assets.',
      whatToDo: 'Demonstrate: 1. Monograph Hero, 2. Categorized Villa Explorer, 3. Finishes & Materiality, 4. VIP Brief Gate.',
      exitCondition: 'Founder confirms visual resonance and inquires about deployment timeline and investment.',
      commonMistakes: 'Overwhelming them with 45 minutes of code talk or delivering full build revisions for free.',
      relevantScript: '«جهزت لحضرتك تصور تفاعلي مبسط بيوضح إزاي العميل بيستكشف فخامة تشطيباتكم ويحجز استشارة مؤهلة في أقل من دقيقة.»',
    },
    {
      num: '08',
      name: 'Proposal',
      goal: 'Generate and dispatch an interactive web proposal reflecting their exact discovery answers and package scope.',
      whatToDo: 'Use Proposal Studio to select the appropriate package (Presence, Signature, Authority, or Founding Partner).',
      exitCondition: 'Web proposal link sent and confirmed opened by the decision maker.',
      commonMistakes: 'Sending a raw text message with a price tag over WhatsApp instead of an authoritative web proposal.',
      relevantScript: '«أستاذ [الاسم]، جهزت لحضرتك وثيقة العمل وتفاصيل التنفيذ كاملة هنا. نراجعها سوا ونحدد موعد بدء الإعداد؟»',
    },
    {
      num: '09',
      name: 'Agreement',
      goal: 'Gain verbal and written alignment on package deliverables, sprint milestones, and commercial parameters.',
      whatToDo: 'Address any remaining questions using the Objection Library. Clarify revision limits and client asset duties.',
      exitCondition: 'Mutual agreement confirmed and service agreement issued.',
      commonMistakes: 'Discounting price when challenged. If budget is tight, recommend Presence tier or remove scope.',
      relevantScript: '«لو الخطوات والجدول الزمني متوافقين مع رؤيتكم، نقدر نحجز سبرنت التنفيذ بمجرد اعتماد الدفعة المقدمة.»',
    },
    {
      num: '10',
      name: 'Won',
      goal: 'Clear 50% commitment deposit (or executed Founding Partner Cohort Agreement) into bank account.',
      whatToDo: 'Issue formal deposit invoice, verify funds clearance, and update CRM status to won.',
      exitCondition: '50% deposit cleared in bank account.',
      commonMistakes: 'Starting design or engineering work prior to deposit clearance.',
      relevantScript: '«تم تأكيد استلام الدفعة المقدمة بنجاح. بنرحب بـ [اسم الشركة] وبدأنا تجهيز مجلد العمل المشترك فوراً.»',
    },
    {
      num: '11',
      name: 'Onboarding',
      goal: 'Execute the 48-hour client intake sprint using the standardized 6-Folder Google Drive architecture.',
      whatToDo: 'Send the 6-folder Google Drive link. Direct client to upload vector logos, high-res photos, and project briefs.',
      exitCondition: 'Folders 01 and 02 verified complete with high-resolution photography.',
      commonMistakes: 'Allowing the client to send low-resolution WhatsApp screenshots.',
      relevantScript: '«لضمان أعلى معايير الجودة، نرجو رفع أصول المشاريع على مجلد Google Drive المشترك المرفق خلال 48 ساعة.»',
    },
    {
      num: '12',
      name: 'Production',
      goal: 'Execute delivery sprint (Presence 7–12d, Signature 10–18d, Authority 15–25d) and launch on custom domain.',
      whatToDo: 'Platform Build → Staging Preview → 1 Consolidated Revision Round → Final 50% Clearance → DNS Launch.',
      exitCondition: 'Platform live on custom domain with active SSL, 100% paid in full, and testimonial captured.',
      commonMistakes: 'Switching DNS to live production custom domain before the remaining 50% balance has cleared.',
      relevantScript: '«ألف مبروك إطلاق المنصة الرسمية على الدومين الخاص بكم. هنتابع معكم فترة الدعم لضمان انسيابية الحجوزات.»',
    },
  ];

  // Arabic Cold Call 5-Angle Opener Matrix
  const arabicOpeners = [
    {
      id: 'angle-a',
      title: 'Angle A: Portfolio Showcase & Standout Project',
      arabicTitle: 'مدخل الاحتفاء بمشروع محدد بالاسم',
      rationale: 'Best when the studio has high-quality execution photos of a named villa compound.',
      script: '«مساء الخير يا مهندس [الاسم]، شفت تنفيذكم الراقي لمشروع [اسم المشروع في زايد/التجمع] وما شاء الله الفينيش مميز وتوزيع المساحات مدروس. حبيت أسأل لو ليكم موقع رسمي يعرض تفاصيل المشروع ده خارج إنستغرام؟»',
      branch: 'إذا قال لا: «لأن عميل الفلل بميزانية 7.5M+ بيحتاج يشوف ملف المشروع وخامات التشطيب كاملة قبل ما يحجز استشارة.»',
    },
    {
      id: 'angle-b',
      title: 'Angle B: Founding Launch Partner Cohort',
      arabicTitle: 'دعوة الانضمام لدفعة الشركاء المؤسسين (5–7 مكاتب)',
      rationale: 'Best for premier studios where you want to eliminate budget friction in exchange for a case study.',
      script: '«أهلًا مهندس [الاسم]، بنطلق حاليًا دفعة حصرية من 5 لـ 7 استوديوهات تشطيب راقي في مصر كـ Founding Partners، بنبنيلهم Digital Presence System متكامل بدون أي تكلفة بناء (0 EGP) مقابل توثيق تجربة العمل كـ Case Study رسمية. متاح نحدد 10 دقائق نتناقش؟»',
      branch: 'لا تقدم العرض أبدًا كـ "موقع مجاني"، بل كشراكة تنفيذية متبادلة تتطلب مشاركة أصول التصميم وتوثيق النتائج.',
    },
    {
      id: 'angle-c',
      title: 'Angle C: Instagram Over-Reliance & DM Fatigue',
      arabicTitle: 'مدخل إرهاق الرد على رسايل إنستغرام العشوائية',
      rationale: 'Best for studios with high follower count but endless "بكام المتر" comments.',
      script: '«أهلًا أستاذ [الاسم]، أغلب مكاتب التشطيب اللي بنتواصل معاها في التجمع بتعاني من نفس النقطة: الإنستغرام بيجيب رسايل كتير بتاخد وقت طويل في الرد بدون فلترة للميزانية. بنبني نظام بيستقبل العميل في مسار منظم يوضح نوعية تشطيباتكم ويطلب تفاصيل الفيلا والميزانية قبل تحويله للواتساب.»',
      branch: 'إذا أكد المشكلة: «متاح نحدد 10 دقائق على زووم أوريك نموذج عملي للنظام؟»',
    },
    {
      id: 'angle-d',
      title: 'Angle D: High-Ticket Authority Filter',
      arabicTitle: 'مدخل تعزيز سلطة البراند وفلترة العملاء غير الجادين',
      rationale: 'Best for seasoned master builders who want to command higher design fees and stop price bargaining.',
      script: '«مهندس [الاسم]، لما العميل بيدخل على صفحة إنستغرام بيشوف صور جنب صور المنافسين، لكن لما بيدخل على Flagship رسمي خاص بالأستوديو بيفهم فورًا إنكم في شريحة تانية وإن أسعاركم لها ما يبررها تمامًا. هل عندكم خطة لتنظيم التواجد الرقمي السنة دي؟»',
      branch: 'ينقل النقاش من تكلفة الموقع إلى قيمة الهيبة المعمارية وثقة العميل الثري.',
    },
    {
      id: 'angle-e',
      title: 'Angle E: The Competitor Benchmark',
      arabicTitle: 'مدخل المقارنة المعيارية الإقليمية',
      rationale: 'Best for studios wanting to attract Gulf investors and overseas Egyptians.',
      script: '«أستاذ [الاسم]، شغلكم في التشطيبات يضاهي أرقى المكاتب في دبي والرياض، لكن طريقة العرض الحالية بتعتمد كليًا على منشورات متفرقة. صممنا تصور معماري بيعرض مشاريعكم بنفس المستوى الإقليمي لجذب المستثمرين وأصحاب الفلل. تحب نلقي نظرة عليه؟»',
      branch: 'يخاطب طموح المؤسس في التوسع الإقليمي خارج السوق المحلي المباشر.',
    },
  ];

  // 6 Core Discovery Questions
  const discoveryQuestions = [
    {
      num: '01',
      title: 'Primary Client Acquisition Channels',
      arabic: 'حاليًا معظم عملاء التشطيب بيجوا لحضراتكم من المعارف والتوصيات ولا من إعلانات وإنستغرام؟',
      strategicGoal: 'Diagnose their current reliance on referrals vs social media inquiries.',
    },
    {
      num: '02',
      title: 'The Present Inquiry Journey',
      arabic: 'لما عميل جديد يبعت استفسار على إنستغرام، إيه الخطوة التالية اللي بيمر بيها لحد ما يقعد معاكم في الاستوديو؟',
      strategicGoal: 'Identify where prospects get dropped or experience friction.',
    },
    {
      num: '03',
      title: 'WhatsApp Friction & Pricing Fatigue',
      arabic: 'هل بتعانوا من إرسال صور وفيديوهات متفرقة على الواتساب أو شرح تفاصيل الأسعار لكل عميل يدويًا؟',
      strategicGoal: 'Highlight how much senior founder time is burned on unstructured messaging.',
    },
    {
      num: '04',
      title: 'Target Project Typology & Contract Floor',
      arabic: 'إيه نوعية المشاريع المفضلة عندكم؟ فيلات مستقلة، بنتهاوس، ولا تشطيبات تجارية ومقرات شركات؟',
      strategicGoal: 'Confirm target project size ($150k+ / 2M–10M+ EGP contracts).',
    },
    {
      num: '05',
      title: 'Monthly Volume of Unfiltered Leads',
      arabic: 'تقريبًا كام عميل بيتواصل شهريًا وبتكتشفوا بعد وقت طويل إن ميزانيته غير متوافقة مع مستوى تشطيباتكم؟',
      strategicGoal: 'Quantify the cost of not having an upfront qualification brief gate.',
    },
    {
      num: '06',
      title: 'Readiness for an Authoritative Digital Flagship',
      arabic: 'لو جهزنا لحضراتكم نظام رقمي متكامل يفلتر العملاء ويعرض أعمالكم بأعلى معايير الفخامة، هل متاح نبدأ التنفيذ هذا الشهر؟',
      strategicGoal: 'Confirm decision timeline and transition seamlessly to proposal presentation.',
    },
  ];

  const currentFunnel = funnelStages[selectedFunnelIndex];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#1c1a2c] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121120] border border-[#242238] text-[11px] font-mono text-purple-300 uppercase tracking-wider">
          <Target className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
          <span>SALES ENGINE // 12-STAGE PIPELINE PROTOCOL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Sales Engine &amp; Qualification System
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          The rigorous 12-stage sales cycle: from initial scraping and cold outreach, to diagnosis, concept demonstration, proposal synthesis, and deposit clearance.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1c1a2c] pb-4">
        {[
          { id: 'funnel', label: '12-Stage Funnel', icon: Target },
          { id: 'outreach', label: '5-Angle Matrix', icon: MessageSquare },
          { id: 'discovery', label: '6 Discovery Questions', icon: HelpCircle },
          { id: 'closing', label: 'Closing Protocol', icon: CheckCircle2 },
          { id: 'objections', label: 'Objection Playbook', icon: Shield },
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

      {/* TAB 1: 12-STAGE ARCHITECTURAL FUNNEL */}
      {activeTab === 'funnel' && (
        <div className="space-y-8">
          {/* Minimalist Architectural Step Progression Bar */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider font-bold block">
              Sequential Sales Stages (Click to inspect protocol)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {funnelStages.map((stage, idx) => {
                const isSelected = selectedFunnelIndex === idx;
                return (
                  <button
                    key={stage.num}
                    onClick={() => setSelectedFunnelIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-[#18152e] border-purple-500 text-white shadow-lg ring-1 ring-purple-500/30 font-bold'
                        : 'bg-[#0f0e18] border-[#1f1d2e] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-purple-300' : 'text-zinc-600'}`}>
                      {stage.num}
                    </span>
                    <span className="text-xs truncate">{stage.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Stage Monograph Card */}
          <article className="p-8 sm:p-10 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] space-y-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1829] pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                  STAGE {currentFunnel.num} OF 12 // PROTOCOL SPECIFICATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  {currentFunnel.name}
                </h2>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                Cycle: {selectedFunnelIndex + 1} / 12
              </div>
            </div>

            {/* Strategic Goal */}
            <div className="p-5 rounded-xl bg-[#090810] border border-[#1a1829] space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-purple-400 font-bold tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Primary Strategic Goal</span>
              </span>
              <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                {currentFunnel.goal}
              </p>
            </div>

            {/* What To Do & Exit Condition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-[#0a0912] border border-[#1c1a2a] space-y-2">
                <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                  <span>Execution Checklist (What To Do)</span>
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {currentFunnel.whatToDo}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#07130f] border border-emerald-500/30 space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Exit Condition (When to Advance)</span>
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {currentFunnel.exitCondition}
                </p>
              </div>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="p-5 rounded-xl bg-[#140b0f] border border-rose-500/30 space-y-2">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Common Mistakes to Avoid</span>
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentFunnel.commonMistakes}
              </p>
            </div>

            {/* Relevant Verbatim Script */}
            {currentFunnel.relevantScript && currentFunnel.relevantScript !== 'N/A' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="uppercase font-bold text-purple-300">Stage Script Prompt</span>
                  <button
                    onClick={() => handleCopy(`funnel-${currentFunnel.num}`, currentFunnel.relevantScript)}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedId === `funnel-${currentFunnel.num}` ? (
                      <span className="text-emerald-400 text-[11px] font-bold">✓ Copied</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-purple-400" strokeWidth={1.5} />
                        <span className="text-[11px]">Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div
                  dir={currentFunnel.relevantScript.includes('«') ? 'rtl' : 'ltr'}
                  className="p-5 rounded-xl bg-[#07060b] border-l-4 border-purple-500 text-sm leading-[2.3] text-zinc-100 font-sans"
                >
                  {currentFunnel.relevantScript}
                </div>
              </div>
            )}
          </article>
        </div>
      )}

      {/* TAB 2: 5-ANGLE OPENER MATRIX */}
      {activeTab === 'outreach' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-serif text-white">
              The 5-Angle Opener Matrix
            </h2>
            <p className="text-xs text-zinc-400">
              Select the optimal conversational angle based on the studio’s current digital footprint. Never pitch cold.
            </p>
          </div>

          <div className="space-y-6">
            {arabicOpeners.map((angle) => (
              <article
                key={angle.id}
                className="p-7 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] hover:border-[#2f2b48] transition-all space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#181628] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                      STRATEGIC ANGLE
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {angle.title}
                    </h3>
                    <div className="text-xs font-sans text-zinc-400">
                      {angle.arabicTitle}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(angle.id, angle.script)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#151324] hover:bg-[#1f1c36] text-zinc-200 hover:text-white border border-[#272440] text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 self-start sm:self-auto"
                  >
                    {copiedId === angle.id ? (
                      <span className="text-emerald-400 font-bold">✓ Copied</span>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs font-mono text-zinc-400 bg-[#090810] p-3 rounded-lg border border-[#181628]">
                  <span className="text-amber-400 font-bold">Context: </span>
                  {angle.rationale}
                </div>

                <div
                  dir="rtl"
                  className="p-5 rounded-xl bg-[#07060b] border-l-4 border-purple-500 text-sm sm:text-base leading-[2.3] text-zinc-100 font-sans"
                >
                  {angle.script}
                </div>

                <div className="text-xs text-zinc-400 font-mono pt-1">
                  <span className="text-purple-400 font-bold">Recommended Branch: </span>
                  {angle.branch}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 6 CORE DISCOVERY QUESTIONS */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-serif text-white">
              The 6 Core Discovery Questions
            </h2>
            <p className="text-xs text-zinc-400">
              Diagnostic questions formulated to uncover conversion leakage, WhatsApp friction, and villa closing cycles.
            </p>
          </div>

          <div className="space-y-4">
            {discoveryQuestions.map((q) => (
              <div
                key={q.num}
                className="p-6 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-900/30 text-purple-300 text-xs font-mono font-bold flex items-center justify-center border border-purple-500/30">
                      {q.num}
                    </span>
                    <h3 className="text-sm font-bold text-white font-mono">
                      {q.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy(`disc-${q.num}`, q.arabic)}
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedId === `disc-${q.num}` ? (
                      <span className="text-emerald-400 font-bold">✓ Copied</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-purple-400" strokeWidth={1.5} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div
                  dir="rtl"
                  className="p-4 rounded-xl bg-[#08070d] border-l-2 border-purple-500 text-sm sm:text-base leading-[2.2] text-zinc-100 font-sans"
                >
                  {q.arabic}
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                  <span className="text-purple-400 font-bold">Strategic Objective: </span>
                  {q.strategicGoal}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OBJECTION PLAYBOOK */}
      {activeTab === 'objections' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-serif text-white">
              Executive Objection Playbook
            </h2>
            <p className="text-xs text-zinc-400">
              Anchored reframings for high-ticket interior design and turnkey finishing studios.
            </p>
          </div>

          <div className="space-y-4">
            {OBJECTIONS_DATA.map((obj) => {
              const isExpanded = expandedObj === obj.id;
              return (
                <article
                  key={obj.id}
                  className="p-6 rounded-2xl bg-[#0d0c15] border border-[#1e1c2e] space-y-4 shadow-md"
                >
                  <div
                    onClick={() => setExpandedObj(isExpanded ? null : obj.id)}
                    className="flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                        {obj.category}
                      </span>
                      <h3 className="text-base font-bold text-white" dir="rtl">
                        {obj.exactObjection}
                      </h3>
                      <div className="text-xs text-zinc-400">
                        {obj.meaning}
                      </div>
                    </div>

                    <span className="text-xs font-mono text-purple-400 font-bold shrink-0 pt-1">
                      {isExpanded ? 'Collapse ▲' : 'Expand Reframing ▼'}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="space-y-4 border-t border-[#181628] pt-4 animate-in fade-in duration-200">
                      <div className="text-xs font-mono text-zinc-400 p-3 rounded-lg bg-[#090810] border border-[#181628]">
                        <span className="text-amber-400 font-bold">Core Principle: </span>
                        {obj.recommendedPrinciple}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span className="font-bold text-purple-300">Exact Arabic Response</span>
                          <button
                            onClick={() => handleCopy(obj.id, obj.exampleResponseArabic)}
                            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedId === obj.id ? (
                              <span className="text-emerald-400 font-bold">✓ Copied</span>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-purple-400" strokeWidth={1.5} />
                                <span>Copy Script</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div
                          dir="rtl"
                          className="p-5 rounded-xl bg-[#07060b] border-l-4 border-purple-500 text-sm sm:text-base leading-[2.3] text-zinc-100 font-sans"
                        >
                          {obj.exampleResponseArabic}
                        </div>
                      </div>

                      <div className="text-xs text-zinc-400 font-mono">
                        <span className="text-purple-400 font-bold">Closing Note: </span>
                        {obj.notes}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: CLOSING PROTOCOL & THE 3 MANDATORY OUTCOMES */}
      {activeTab === 'closing' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12111c] border border-[#201d32] text-[10px] font-mono text-purple-300 uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-purple-400" strokeWidth={1.5} />
              <span>COMMERCIAL DISCIPLINE // ZERO OPEN LOOPS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              Meeting Closing Protocol &amp; The 3 Non-Negotiable Outcomes
            </h2>
            <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
              Every discovery meeting or concept demo MUST conclude with one of exactly THREE definitive outcomes. Vague brush-offs like "we'll talk later" (نكلم بعض بعدين) are strictly prohibited.
            </p>
          </div>

          {/* Strict Anti-Procrastination Rule */}
          <div className="p-5 rounded-2xl bg-[#140e12] border border-rose-500/30 flex items-start gap-3.5 text-xs text-zinc-300">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="space-y-1">
              <strong className="text-white text-sm block">القاعدة الصارمة لمنع التسويف (The Anti-Procrastination Law):</strong>
              <p className="text-xs leading-relaxed text-zinc-300">
                يُمنع منعاً باتاً إنهاء أي مكالمة أو اجتماع بعبارة غير محددة مثل <em>"تمام يا باشمهندس نبقى نكلم بعض بعدين"</em> أو <em>"سيبني أفكر وأرد عليك"</em>. يجب على أحمد تحويل المكالمة فوراً إلى أحد المسارات الثلاثة: إما تجهيز وإرسال البروبوزال، أو تحديد يوم وساعة محددة في التقويم للمتابعة، أو استبعاد العميل باحترام ووسمه بـ <code>LOST</code>.
              </p>
            </div>
          </div>

          {/* The 3 Definitive Outcomes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Outcome 1: PROPOSAL */}
            <div className="p-6 rounded-2xl bg-[#0c1410] border border-emerald-500/40 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                    OUTCOME 01 // QUALIFIED
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
                <h3 className="text-lg font-serif text-white font-bold">1. Dispatch Proposal</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  العميل متحمس ومؤهل لميزانية الباقة (أو برنامج الشركاء المؤسسين). الخطوة التالية هي إنشاء وإرسال المقترح التفاعلي خلال 24 ساعة كحد أقصى.
                </p>
                <div className="p-3 rounded-xl bg-[#070e0a] border border-emerald-900/40 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Next Action:</span>
                  <p className="text-xs text-zinc-200">توليد المقترح من Proposal Studio وإرساله عبر الواتساب وتحديث الـ CRM إلى <code>PROPOSAL SENT</code>.</p>
                </div>
              </div>
              <button
                onClick={() => onSelectView('proposals-builder')}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-mono font-bold transition-all shadow-md shadow-emerald-900/30"
              >
                Open Proposal Studio →
              </button>
            </div>

            {/* Outcome 2: CONCRETE FOLLOW-UP */}
            <div className="p-6 rounded-2xl bg-[#12101e] border border-purple-500/40 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40 font-bold uppercase">
                    OUTCOME 02 // SCHEDULED
                  </span>
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
                </div>
                <h3 className="text-lg font-serif text-white font-bold">2. Firm Calendar Callback</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  يحتاج الشريك لمراجعة داخلية أو توقيت لاحق، ولكن مع التزام بموعد زمني دقيق في التقويم (يوم محدد + ساعة محددة).
                </p>
                <div className="p-3 rounded-xl bg-[#0a0812] border border-purple-900/40 space-y-1">
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">Closing Script:</span>
                  <p className="text-xs text-zinc-200 font-sans" dir="rtl">
                    «مفهوم تماماً يا باشمهندس. عشان نقفل الدايرة باحترافية، يناسب حضرتك أكلمك الأربعاء الساعة 3 ولا الخميس الساعة 1 نأكد الخطوة القادمة؟»
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectView('crm-bridge')}
                className="w-full py-2 rounded-xl bg-[#181628] hover:bg-[#221f38] text-purple-200 border border-purple-500/30 text-xs font-mono font-bold transition-all"
              >
                Log Date in CRM →
              </button>
            </div>

            {/* Outcome 3: NOT A FIT */}
            <div className="p-6 rounded-2xl bg-[#141216] border border-zinc-700/40 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-600 font-bold uppercase">
                    OUTCOME 03 // DISQUALIFIED
                  </span>
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                </div>
                <h3 className="text-lg font-serif text-zinc-200 font-bold">3. Respectful Disqualification</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  الاستوديو غير متوافق مع شروط الخدمة (ميزانية منخفضة، لا ينفذون تشطيبات، أو غير جادين). يتم إنهاء التواصل باحترام ودون إهدار وقت.
                </p>
                <div className="p-3 rounded-xl bg-[#0c0a0e] border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Closing Script:</span>
                  <p className="text-xs text-zinc-300 font-sans" dir="rtl">
                    «تشرفت جداً بالحديث مع حضرتك يا باشمهندس. واضح إن تركيزكم الحالي مختلف عن منظومة الـ Flagship اللي بنقدمها، وبتمنالكم كل التوفيق في مشاريعكم القادمة.»
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 text-center py-2 bg-[#0d0c12] rounded-xl border border-[#1e1c28]">
                Update CRM Status → LOST
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
