import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Flame,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { ViewMode } from '../../types';
import { OBJECTIONS_DATA } from '../../data/objectionsData';
import { INITIAL_PROSPECTS } from '../../data/prospectsData';

interface CallCockpitProps {
  onSelectView?: (view: ViewMode) => void;
}

export const CallCockpit: React.FC<CallCockpitProps> = ({ onSelectView }) => {
  // Prospect Information State (Hydrated from CRM click if available)
  const [prospectName, setProspectName] = useState(() => {
    const saved = localStorage.getItem('nyveq_cockpit_prospect');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.contact || 'باشمهندس كريم';
      } catch (e) {}
    }
    return 'باشمهندس كريم';
  });

  const [firmName, setFirmName] = useState(() => {
    const saved = localStorage.getItem('nyveq_cockpit_prospect');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.company || 'KÉRAN Architecture';
      } catch (e) {}
    }
    return 'KÉRAN Architecture';
  });

  const [standoutProject, setStandoutProject] = useState(() => {
    const saved = localStorage.getItem('nyveq_cockpit_prospect');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.standoutProject || 'فيلا القطامية ديونز';
      } catch (e) {}
    }
    return 'فيلا القطامية ديونز';
  });

  const [observedFlaw, setObservedFlaw] = useState(() => {
    const saved = localStorage.getItem('nyveq_cockpit_prospect');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.observedFlaw || 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP';
      } catch (e) {}
    }
    return 'تشتت صور المشاريع على إنستجرام وغياب الفلترة لميزانيات 7.5M+ EGP';
  });

  const handleSelectPreloadedProspect = (leadId: string) => {
    const lead = INITIAL_PROSPECTS.find((p) => p.id === leadId);
    if (!lead) return;
    setProspectName(lead.contact.split('(')[0].trim());
    setFirmName(lead.company);
    setStandoutProject(lead.standoutProject);
    setObservedFlaw(lead.observedFlaw);
  };

  // 30-Second Timer State
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, timeLeft]);

  const handleStartTimer = () => setTimerRunning(true);
  const handlePauseTimer = () => setTimerRunning(false);
  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(30);
  };

  // Active Phase
  const [activePhase, setActivePhase] = useState<number>(1);

  // Selected Panic Objection
  const [selectedPanicId, setSelectedPanicId] = useState<string | null>('obj-1');
  const [showAllObjections, setShowAllObjections] = useState<boolean>(false);

  // Live Scratchpad Notes
  const [callNotes, setCallNotes] = useState(() => {
    return localStorage.getItem('nyveq_live_call_notes') || '';
  });
  const [copiedNotes, setCopiedNotes] = useState(false);

  useEffect(() => {
    localStorage.setItem('nyveq_live_call_notes', callNotes);
  }, [callNotes]);

  const appendTag = (tag: string) => {
    setCallNotes((prev) => (prev ? `${prev} | ${tag}` : tag));
  };

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // 10 Objections accurately mapped to OBJECTIONS_DATA IDs
  const allPanicObjections = [
    {
      id: 'obj-1',
      label: 'عندنا موقع شغال',
      categoryEn: 'Existing Website',
      isPrimary: true,
      color: 'border-purple-500/40 text-purple-300',
    },
    {
      id: 'obj-3',
      label: 'مش محتاجين تسويق / ترشيحات',
      categoryEn: 'Word of Mouth',
      isPrimary: true,
      color: 'border-amber-500/40 text-amber-300',
    },
    {
      id: 'obj-7',
      label: 'ابعت بروفايل واتساب',
      categoryEn: 'Send Info / Brochure',
      isPrimary: true,
      color: 'border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'obj-4',
      label: 'السعر غالي / الميزانية',
      categoryEn: 'Price Resistance',
      isPrimary: true,
      color: 'border-rose-500/40 text-rose-300',
    },
    {
      id: 'obj-8',
      label: 'مش صاحب القرار / شريكي',
      categoryEn: 'Partner Approval',
      isPrimary: true,
      color: 'border-sky-500/40 text-sky-300',
    },
    {
      id: 'obj-2',
      label: 'إنستجرام كفاية جداً',
      categoryEn: 'Instagram Dependency',
      isPrimary: false,
      color: 'border-pink-500/40 text-pink-300',
    },
    {
      id: 'obj-5',
      label: 'الوقت مش مناسب حالياً',
      categoryEn: 'Bad Timing',
      isPrimary: false,
      color: 'border-indigo-500/40 text-indigo-300',
    },
    {
      id: 'obj-6',
      label: 'معانا شركة تسويق',
      categoryEn: 'Existing Agency',
      isPrimary: false,
      color: 'border-cyan-500/40 text-cyan-300',
    },
    {
      id: 'obj-10',
      label: 'جربنا موقع ومجابش نتيجة',
      categoryEn: 'Bad Experience',
      isPrimary: false,
      color: 'border-orange-500/40 text-orange-300',
    },
    {
      id: 'obj-9',
      label: 'العميل مبيردش (Ghosting)',
      categoryEn: 'No Response',
      isPrimary: false,
      color: 'border-zinc-500/40 text-zinc-300',
    },
  ];

  const displayedObjections = showAllObjections
    ? allPanicObjections
    : allPanicObjections.filter((o) => o.isPrimary);

  const activePanicObjection = OBJECTIONS_DATA.find((o) => o.id === selectedPanicId);

  // Dynamic replacement of placeholders in active objection response
  const formatRebuttal = (text: string) => {
    return text
      .replace(/\[الاسم\]/g, prospectName || 'يا فندم')
      .replace(/\[اسم شركتهم\]/g, firmName || 'الشركة')
      .replace(/\[اسم الشركة\]/g, firmName || 'الشركة');
  };

  // Active Hook Angle in Phase 1 (5 Canonical Angles)
  const [selectedHookAngle, setSelectedHookAngle] = useState<'angleA' | 'angleB' | 'angleC' | 'angleD' | 'angleE'>('angleA');

  // The 5 Canonical Architectural Hooks with Delayed Founder Intro
  const hookVariations: Record<string, { name: string; tag: string; script: string; notes: string }> = {
    angleA: {
      name: 'Angle A: تأكيد غياب الموقع (No Website Confirmation)',
      tag: 'Angle A // No Website',
      script: `«مساء الخير، مكتب ${firmName || 'التصميم'}؟ كنت حابب أسأل لو ليكم ويبسايت رسمي متاح لعرض أعمالكم غير صفحة إنستجرام؟»

[إذا كان الرد بالنفي]:
«تمام، لأن شفت شغلكم في ${standoutProject || 'مشاريع الفلل الأخيرة'} ومستواه ممتاز جداً، فاستغربت إن مفيش مرجع رسمي يعرض الأعمال دي.»

[التعريف الطبيعي بعد التفاعل الأولي]:
«معاك أحمد، مؤسس استوديو NYVEQ للأنظمة الرقمية لقطاع العمارة والتشطيب الفاخر. الفكرة ببساطة إننا بنساعد المكاتب اللي شغلها راقي إن مشاريعها تتعرض بواجهة تليق بهيبتها وتصفي عملاء الفلل قبل ما يوصلوا للواتساب.
عندي تصور مخصص لمكتبكم يا باشمهندس، يناسبك زووم سريع 15 دقيقة نراجعه سوا؟ الأربعاء الساعة 3 ولا الخميس الساعة 1؟»`,
      notes: 'قاعدة ذهبية: لا تبدأ بـ "أنا أحمد من NYVEQ". ابدأ كشخص مهتم بفضول مهني، ثم قدّم نفسك بهدوء بعد أول استجابة.'
    },
    angleB: {
      name: 'Angle B: السؤال عن السبب (No Website Why)',
      tag: 'Angle B // Why Social Only',
      script: `«مساء الخير، مكتب ${firmName || 'الشركة'}؟ كنت بتفرج على شغلكم الممتاز في ${standoutProject || 'المشاريع المنفذة'} وكنت بدور على موقعكم الرسمي، هل في سبب إنكم مركزين بس على إنستجرام؟»

[التعريف بعد سماع ردهم]:
«مفهوم تماماً. معاك أحمد، مؤسس استوديو NYVEQ للأنظمة المعمارية. إنستجرام ممتاز لجذب الانتباه، لكن لما عميل فيلا يتعاقد بـ 7.5M+ EGP بيحتاج مرجع رسمي يثبت جودة الفينيش.
طورنا نموذج قاعة عرض سينمائية مخصصة لمكتبكم. متاح نحدّد 15 دقيقة على زووم أشاركها معك في 30 ثانية؟»`,
      notes: 'استمع باهتمام لسبب تركيزهم على إنستجرام، ثم اربط بين المنصة كغرفة إغلاق لعميل الفيلا الذي يجلبه إنستجرام.'
    },
    angleC: {
      name: 'Angle C: طلب الإذن في 30 ثانية (30-Sec Permission)',
      tag: 'Angle C // 30-Sec Permission',
      script: `«مساء الخير يا باشمهندس ${prospectName || 'كريم'}، هكون سريع جداً ومش هعطلك، ينفع آخد من وقتك 30 ثانية أشاركك ملاحظة سريعة على طريقة عرض مشاريعكم أونلاين؟»

[بعد موافقتهم بـ "تفضل"]:
«تسلم. معاك أحمد، مؤسس استوديو NYVEQ. تابعت المعالجة الهندسية الراقية لمشروع ${standoutProject || 'الفيلا الأخيرة'}، لكن لاحظت أن ${observedFlaw || 'الأعمال معروضة بصور ثابتة مشتتة تفقد الفينيش هيبته'}.
عندنا تصور تفاعلي مخصص يفرز عملاء الفلل ويوفر وقت إدارتكم. يناسبك زووم 15 دقيقة نراجعه سوا الأربعاء 3 ولا الخميس 1؟»`,
      notes: 'نبرة استشارية هادئة وبطيئة بنسبة 80% من السرعة المعتادة كشريك هندسي نظير وليس كمندوب مبيعات.'
    },
    angleD: {
      name: 'Angle D: رحلة العميل وتسريب المبيعات (Customer Journey)',
      tag: 'Angle D // Customer Journey',
      script: `«مساء الخير يا باشمهندس، لما عميل فيلا جديد يشوف مشاريعكم القوية زي ${standoutProject || 'مشروع الفيلا البارز'} ويحب يشوف سابقة الأعمال والخدمات كاملة قبل ما يتواصل، بتوجهوه لفين غير إنستجرام والواتساب؟»

[التعريف بعد ردهم]:
«بالضبط، وده أكبر مكمن لتسريب العملاء أصحاب الميزانيات المرتفعة. معاك أحمد، مؤسس NYVEQ للأنظمة الرقمية. بنبني المنصة السينمائية السريعة اللي إنستجرام يوجه العميل إليها ليفرز ميزانيته ويحجز استشارة فورية.
يسعدني أشارك معك التصور ده في 15 دقيقة زووم. يناسبك هذا الأسبوع؟»`,
      notes: 'اضرب بدقة على هدر وقت الإدارة في إرسال ملفات PDF ضخمة أو ريلز مبعثرة على الواتساب.'
    },
    angleE: {
      name: 'Angle E: الموقع موجود لكن ضعيف (Website Exists But Weak)',
      tag: 'Angle E // Weak Mobile Website',
      script: `«مساء الخير يا فندم، كنت بتصفح موقعكم الرسمي وشفت مشاريعكم في ${standoutProject || 'الفلل الأخيرة'}، بس حسيت إن تجربة الموبايل وعرض المشاريع مش عاطيين لشغلكم حقه مقارنة بمستواكم الحقيقي على أرض الواقع. هل أنتم راضيين عن أداء الموقع حالياً؟»

[التعريف بعد ردهم]:
«مقدر جداً صراحتك. معاك أحمد، مؤسس استوديو NYVEQ للأنظمة الرقمية لقطاع التشطيب الفاخر. بنهندس منصات معمارية فائقة السرعة على الموبايل تبرز الرخام والخامات بنظام Before/After وتحجز الاستشارات المؤهلة.
متاح زووم سريع 15 دقيقة نراجع فيه خطة التحول؟»`,
      notes: 'لا تهن موقعهم الحالي أبداً. امدح مشاريعهم المنفذة أولاً، ثم أشر بهدوء إلى فجوة التحويل وتجربة الموبايل.'
    }
  };

  // Script Phases Content
  const scriptPhases = [
    {
      phase: 1,
      name: '01. كسر النمط والهوك المعماري (0 - 30s)',
      sub: 'Architectural Pattern Interrupt Hook',
      target: 'الحصول على إذن بالحديث وترسيخ موقعك كاستشاري رقمي متخصص وليس بائعاً',
      arabicScript: hookVariations[selectedHookAngle].script,
      notes: hookVariations[selectedHookAngle].notes
    },
    {
      phase: 2,
      name: '02. الأسئلة التشخيصية الرصينة (1 - 3m)',
      sub: 'Diagnostic Inquiry Protocol',
      target: 'استخراج التحديات الواقعية: تضييع الوقت مع غير المؤهلين، أو ضعف تقدير السعر',
      arabicScript: `١. "يا باشمهندس، لما عميل فيلا مستقلة في التجمع أو زايد بيتواصل معكم أول مرة، إيه أكبر علامة استفهام بتكون عنده قبل ما يزور مكتبكم؟"

٢. "هل بتلاحظوا إن بعض العملاء بيتفاوضوا في أتعاب الإشراف أو التصميم لمجرد إنهم مش قادرين يفرقوا بين تشطيبكم المعماري وبين أي مقاول تجاري من خلال الصور العادية؟"

٣. "لو عميل استثماري من الخليج حب يطلع على تفاصيل تسليماتكم ع المفتاح، إيه الأداة الرقمية اللي بتبعتوهاله حالياً؟ بروفايل PDF أم مجرد رابط إنستجرام؟"`,
      notes: 'توقف تماماً بعد طرح السؤال واستمع باهتمام عميق. سجّل العبارات التي يستعملها المهندس بنفس نصها في الملاحظات.'
    },
    {
      phase: 3,
      name: '03. جسر القيمة والتموضع الفاخر (3 - 5m)',
      sub: 'The Sovereign Value Bridge',
      target: 'إبراز التباين الحاد بين براعة التنفيذ الواقعي وضعف واجهتهم الرقمية الحالية',
      arabicScript: `بالضبط يا باشمهندس، وهذه الثغرة تحديداً هي ما قمنا بهندسة حله في NYVEQ.
نحن لا نقدم خدمات تسويق تقليدي أو حملات إعلانية عامة على السوشيال ميديا.
نحن نبني 'Digital Architectural Showrooms' مصممة خصيصاً للمكاتب التي تبدأ تعاقداتها من 7.5 إلى 25 مليون جنيه.
المنصة تبرز مشروعاتكم وفق معايير الجاليري العالمي (أفلام سينمائية تفاعلية، مقارنات Before & After دقيقة للمواد والرخام، ومخططات واضحة)، بحيث يدخل العميل مقتنعاً بمكانتكم ومستعداً للتعاقد دون استنزاف في التفاوض.`,
      notes: 'شدد دائماً على أنك لا تبيع إعلانات ولا تصاميم مواقع اعتيادية، بل تبني بنية تحتية لتحويل عملاء النخبة.'
    },
    {
      phase: 4,
      name: '04. حسم موعد جلسة الفحص المعماري (5 - 7m)',
      sub: 'The 15-Min Live Demo Close',
      target: 'تثبيت موعد جلسة عمل افتراضية عبر زووم مدتها 10-15 دقيقة فقط',
      arabicScript: `أنا أقدّر تماماً انشغال جدول حضرتك بين الإشراف والاجتماعات.
كل ما أقترحه: جلسة فحص افتراضية لمدة 10 دقائق عبر زووم، أشارك مع حضرتك الشاشة ونستعرض النموذج التفاعلي الحي لمكتب معماري شبيه في نيو كايرو.
ستشاهد المنظومة بعينيك؛ إن رأيت أنها ستحدث النقلة النوعية لـ ${firmName || 'المكتب'} وتستقطب العقود الأضخم، نناقش الخطوات التالية. وإن شعرت أنها ليست أولويتكم الآن، نكون قد تشرفنا بمعرفتكم.
هل يناسب جدول حضرتك غداً في تمام الساعة 2:00 ظهراً، أم الأربعاء الساعة 5:00 مساءً؟`,
      notes: 'اطرح دائماً خيارين محددين للموعد (Alternative Choice Close). لا تترك السؤال مفتوحاً أبداً.'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0b0b10] border border-[#1f1f2c] shadow-2xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              LIVE CALL COCKPIT
            </span>
            <span className="text-zinc-500 font-mono text-xs">|</span>
            <span className="text-xs font-mono text-zinc-400">Tactical Cold Call Control Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Live Call Cockpit &amp; Objection Defense.
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl">
            Keep this screen open during active phone outreach. Never freeze on objections, never lose call momentum, and enforce the 30-second rule.
          </p>
        </div>

        {/* 30-Second Countdown Stopwatch */}
        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#12121a] border border-[#232332] shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Opening Hook Limit
            </div>
            <div
              className={`text-3xl font-mono font-bold tracking-wider ${
                timeLeft <= 5
                  ? 'text-rose-400 animate-pulse'
                  : timeLeft <= 15
                  ? 'text-amber-400'
                  : 'text-[var(--accent-purple)]'
              }`}
            >
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {!timerRunning ? (
              <button
                onClick={handleStartTimer}
                className="px-3 py-1.5 rounded-lg bg-[var(--accent-purple)] hover:bg-[#6d28d9] text-white text-xs font-mono font-semibold flex items-center gap-1 transition-all shadow"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>START</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-semibold flex items-center gap-1 transition-all shadow"
              >
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="px-3 py-1 rounded-lg bg-[#181822] hover:bg-[#20202c] text-zinc-400 hover:text-zinc-200 text-[10px] font-mono border border-[#242434] flex items-center justify-center gap-1 transition-all"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prospect Quick Form Bar */}
      <div className="p-4 rounded-xl bg-[#0e0e14] border border-[#1a1a24] space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b1b26] pb-2.5">
          <span className="text-[10px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TARGET PROSPECT METRICS // اختر من قائمة الـ 15 الجاهزة أو عدل يدوياً:</span>
          </span>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => handleSelectPreloadedProspect(e.target.value)}
              className="bg-[#14141f] border border-[#2d2742] rounded-lg px-2.5 py-1 text-xs text-white font-ar focus:outline-none focus:border-[var(--accent-purple)]"
              defaultValue=""
            >
              <option value="" disabled>-- تحميل بيانات استوديو مستهدف (15 Lead Targets) --</option>
              {INITIAL_PROSPECTS.map((lp) => (
                <option key={lp.id} value={lp.id}>
                  {lp.company} — {lp.contact.split('(')[0]} ({lp.location.split('(')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
              اسم المعماري / المهندس:
            </label>
            <input
              type="text"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              className="w-full bg-[var(--bg-elevated)] border border-[#222230] rounded-lg px-2.5 py-1.5 text-zinc-100 font-ar text-xs focus:outline-none focus:border-[var(--accent-purple)]"
              placeholder="باشمهندس كريم"
            />
          </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
            اسم المكتب / الأتيليه:
          </label>
          <input
            type="text"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            className="w-full bg-[var(--bg-elevated)] border border-[#222230] rounded-lg px-2.5 py-1.5 text-zinc-100 font-ar text-xs focus:outline-none focus:border-[var(--accent-purple)]"
            placeholder="KÉRAN Architecture"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
            المشروع البارز في البورتفوليو:
          </label>
          <input
            type="text"
            value={standoutProject}
            onChange={(e) => setStandoutProject(e.target.value)}
            className="w-full bg-[var(--bg-elevated)] border border-[#222230] rounded-lg px-2.5 py-1.5 text-zinc-100 font-ar text-xs focus:outline-none focus:border-[var(--accent-purple)]"
            placeholder="فيلا القطامية ديونز"
          />
        </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
              الفجوة الرقمية المرصودة:
            </label>
            <input
              type="text"
              value={observedFlaw}
              onChange={(e) => setObservedFlaw(e.target.value)}
              className="w-full bg-[var(--bg-elevated)] border border-[#222230] rounded-lg px-2.5 py-1.5 text-zinc-100 font-ar text-xs focus:outline-none focus:border-[var(--accent-purple)]"
              placeholder="مفيش ويب سايت والشغل معروض صور إنستجرام بس"
            />
          </div>
        </div>
      </div>

      {/* EMERGENCY PANIC BUTTONS (Sticky Objection Shield) */}
      <div className="p-4 rounded-xl bg-[#100f17] border border-[#262035] shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              EMERGENCY PANIC REBUTTALS // اضغط فوراً عند اعتراض العميل
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllObjections(!showAllObjections)}
              className="px-2.5 py-1 rounded-lg bg-[#181824] hover:bg-[#222232] border border-[#2b2b3c] text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <Filter className="w-3 h-3 text-[var(--accent-purple)]" />
              <span>{showAllObjections ? 'عرض الخمسة الشائعة فقط (Top 5)' : 'عرض كل الاعتراضات (10 All)'}</span>
            </button>
          </div>
        </div>

        {/* Objection Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {displayedObjections.map((btn) => {
            const isSelected = selectedPanicId === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setSelectedPanicId(btn.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-ar font-medium border transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--accent-purple)] text-black border-[var(--accent-purple)] shadow-lg shadow-amber-950/40 font-bold scale-[1.02]'
                    : 'bg-[#12111a] hover:bg-[#1a1926] text-zinc-200 border-[#232133]'
                }`}
              >
                <span className="font-semibold text-xs">{btn.label}</span>
                <span className={`text-[9px] font-mono uppercase ${isSelected ? 'text-black/70' : 'text-[var(--accent-purple)]/70'}`}>{btn.categoryEn}</span>
              </button>
            );
          })}
        </div>

        {/* Expanded Panic Rebuttal Drawer */}
        {activePanicObjection && (
          <div className="mt-4 p-6 rounded-2xl bg-[#0c0c12] border border-[var(--accent-purple)]/50 space-y-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Drawer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#201e2c] pb-3.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] font-bold uppercase border border-[var(--accent-purple)]/30">
                  {activePanicObjection.category}
                </span>
                <span className="text-base font-ar font-bold text-white">
                  الاعتراض الصريح: {activePanicObjection.exactObjection}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 font-bold">
                ID: {activePanicObjection.id.toUpperCase()}
              </span>
            </div>

            {/* Rebuttal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left/Main Column: Egyptian Arabic Verbatim Response */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--accent-purple)] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>الرد الحرفي المقترح (تحدث برزانة وهدوء كشريك هندسي):</span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        'panic-reply',
                        formatRebuttal(activePanicObjection.exampleResponseArabic)
                      )
                    }
                    className="px-3 py-1 rounded-lg bg-[#161522] hover:bg-[#211f32] text-xs font-mono text-zinc-200 hover:text-white border border-[#2c283f] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'panic-reply' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                        <span>نسخ الرد</span>
                      </>
                    )}
                  </button>
                </div>

                <div
                  dir="rtl"
                  className="p-6 rounded-2xl bg-[#100f17] border border-[#272338] text-white font-ar text-base sm:text-lg leading-[2.3] whitespace-pre-line select-text shadow-inner font-medium"
                >
                  {formatRebuttal(activePanicObjection.exampleResponseArabic)}
                </div>

                {/* Tactical Note below the script */}
                <div className="p-4 rounded-xl bg-[#100f16] border border-[#222030] flex items-start gap-3 text-xs text-zinc-200">
                  <AlertTriangle className="w-4 h-4 text-[var(--accent-purple)] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-mono text-[var(--accent-purple)] font-bold uppercase text-[11px] block">
                      التوجيه التكتيكي الفوري:
                    </span>
                    <span className="font-ar text-zinc-200 leading-relaxed font-medium">{activePanicObjection.notes}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Psychological Rationale & Recommended Principle */}
              <div className="lg:col-span-4 space-y-3">
                <div className="p-5 rounded-xl bg-[#111018] border border-[#222030] space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold block mb-1">
                      PSYCHOLOGICAL SUBTEXT // المعنى الضمني:
                    </span>
                    <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                      {activePanicObjection.meaning}
                    </p>
                  </div>

                  <div className="border-t border-[#1e1d2b] pt-3">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold block mb-1">
                      CONVERSION PRINCIPLE // المبدأ الاستراتيجي:
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {activePanicObjection.recommendedPrinciple}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Cockpit Layout: Script Stepper (Left) & Scratchpad/CRM (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 4-Phase Call Script Stepper */}
        <div className="lg:col-span-8 space-y-4">
          {/* Stepper Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#1c1a28] pb-3.5">
            {scriptPhases.map((sp) => (
              <button
                key={sp.phase}
                onClick={() => setActivePhase(sp.phase)}
                className={`px-4 py-2.5 rounded-xl text-xs font-ar transition-all flex items-center gap-2 cursor-pointer ${
                  activePhase === sp.phase
                    ? 'bg-[var(--accent-purple)] text-black font-bold shadow-lg shadow-amber-950/30'
                    : 'bg-[#111018] text-zinc-300 hover:text-white border border-[#222030]'
                }`}
              >
                <span>{sp.name}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Card */}
          {(() => {
            const cur = scriptPhases.find((p) => p.phase === activePhase) || scriptPhases[0];
            return (
              <div className="rounded-2xl bg-[#0c0c12] border border-[#222030] overflow-hidden shadow-2xl">
                <div className="p-4 sm:p-5 bg-[#12111b] border-b border-[#1f1d2b] flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-ar font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--accent-purple)]" />
                      <span>{cur.name}</span>
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono mt-0.5">{cur.target}</p>
                  </div>

                  <button
                    onClick={() => handleCopyText(`phase-${cur.phase}`, cur.arabicScript)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#191826] hover:bg-[#222133] text-zinc-200 hover:text-white text-xs font-mono border border-[#2d2a40] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === `phase-${cur.phase}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                        <span>نسخ النص</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  {/* Phase 1 Hook Switcher Tabs */}
                  {cur.phase === 1 && (
                    <div className="p-3 rounded-2xl bg-[#0f0e16] border border-[#201e2c] space-y-2">
                      <span className="text-[11px] font-mono text-[var(--accent-purple)] uppercase font-bold tracking-wider px-1 block">
                        اختر زاوية الدخول (The 5 Canonical Opener Angles):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { id: 'angleA', label: 'غياب الموقع', sub: 'Angle A' },
                          { id: 'angleB', label: 'السؤال عن السبب', sub: 'Angle B' },
                          { id: 'angleC', label: 'إذن 30 ثانية', sub: 'Angle C' },
                          { id: 'angleD', label: 'رحلة العميل', sub: 'Angle D' },
                          { id: 'angleE', label: 'الموقع ضعيف', sub: 'Angle E' }
                        ].map((hk) => (
                          <button
                            key={hk.id}
                            onClick={() => setSelectedHookAngle(hk.id as any)}
                            className={`px-2.5 py-2 rounded-xl text-xs font-ar transition-all text-center cursor-pointer ${
                              selectedHookAngle === hk.id
                                ? 'bg-[var(--accent-purple)] text-black font-bold shadow-md'
                                : 'bg-[#14131d] text-zinc-300 hover:text-white border border-[#242232]'
                            }`}
                          >
                            <span className="block text-xs font-semibold">{hk.label}</span>
                            <span className={`block text-[9px] font-mono ${selectedHookAngle === hk.id ? 'text-black/70' : 'text-zinc-500'}`}>{hk.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    dir="rtl"
                    className="p-6 sm:p-7 rounded-2xl bg-[#0f0d18] border border-[#28243b] text-white font-ar text-base sm:text-xl leading-[2.3] whitespace-pre-line select-text shadow-inner font-medium"
                  >
                    {cur.arabicScript}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e0c15] border border-[#1d1a29] flex items-start gap-3 text-xs text-zinc-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-mono text-amber-400 font-bold uppercase text-[11px] block">
                        توجيه تكتيكي للدقيقة الأولى:
                      </span>
                      <span className="font-ar text-zinc-300 leading-relaxed">{cur.notes}</span>
                    </div>
                  </div>

                  {/* Navigation between steps */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={activePhase === 1}
                      onClick={() => setActivePhase((p) => Math.max(1, p - 1))}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] disabled:opacity-30 text-xs font-ar text-zinc-300 hover:bg-[#1a1a24] border border-[#20202c]"
                    >
                      ← المرحلة السابقة
                    </button>

                    <span className="text-xs font-mono text-zinc-500">
                      خطوة {activePhase} من 4
                    </span>

                    <button
                      disabled={activePhase === 4}
                      onClick={() => setActivePhase((p) => Math.min(4, p + 1))}
                      className="px-4 py-1.5 rounded-lg bg-[var(--accent-purple)] disabled:opacity-30 text-xs font-ar font-bold text-white hover:bg-[#6d28d9] flex items-center gap-1 shadow"
                    >
                      <span>المرحلة التالية</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right Column: Live Call Scratchpad & Outcomes */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Tags Bar */}
          <div className="p-4 rounded-xl bg-[#0c0c12] border border-[#1f1f2c] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                LIVE CALL SCRATCHPAD
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(callNotes);
                  setCopiedNotes(true);
                  setTimeout(() => setCopiedNotes(false), 2000);
                }}
                className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedNotes ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNotes ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Tags shortcuts */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'مهتم بالديمو',
                'عنده فيلا حالية',
                'ميزانية عالية',
                'الواتساب هو الأساس',
                'مشغول - مكالمة مسائية',
                'غير مناسب C',
              ].map((t) => (
                <button
                  key={t}
                  onClick={() => appendTag(t)}
                  className="px-2 py-1 rounded bg-[#14141e] hover:bg-[#1c1c2a] border border-[#232332] text-[10px] font-ar text-zinc-300 transition-colors"
                >
                  + {t}
                </button>
              ))}
            </div>

            <textarea
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              rows={7}
              placeholder="اكتب ملاحظات المكالمة الحية هنا (اسم الفيلا، اعتراضه الخاص، الموعد المناسب)..."
              className="w-full bg-[#12121a] border border-[#20202c] rounded-xl p-3 text-xs text-zinc-100 font-ar leading-relaxed focus:outline-none focus:border-[var(--accent-purple)] resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setCallNotes('')}
                className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 transition-colors"
              >
                مسح الملاحظات
              </button>
              <span className="text-[10px] font-mono text-zinc-500">Auto-saved to browser</span>
            </div>
          </div>

          {/* Call Disposition & Verdict */}
          <div className="p-4 rounded-xl bg-[#0e0e16] border border-[#222232] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
              CALL DISPOSITION &amp; NEXT STEP
            </span>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert(
                    `تهانينا! تم حجز موعد ديمو لـ ${firmName}!\nسيتم توجيهك إلى منشئ العروض لتجهيز البروبوزال التفاعلي.`
                  );
                  if (onSelectView) onSelectView('proposals-builder');
                }}
                className="w-full p-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 text-emerald-300 text-xs font-ar font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تم حجز موعد ديمو (Grade A)</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  alert('تم تسجيل المتابعة. تذكر تسجيل موعد المتابعة في شيت الـ CRM مع مهمة محددة خلال 24-48 ساعة.');
                  if (onSelectView) onSelectView('crm-bridge');
                }}
                className="w-full p-2.5 rounded-xl bg-amber-600/15 hover:bg-amber-600/25 border border-amber-500/40 text-amber-300 text-xs font-ar font-medium flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>طلب متابعة لاحقة (Follow-Up)</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  alert('تم استبعاد العميل (Grade C). لا تضيع دقيقة إضافية وركز على الهدف التالي.');
                }}
                className="w-full p-2.5 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-700/40 text-zinc-400 text-xs font-ar flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-zinc-500" />
                  <span>غير مؤهل / استبعاد (Grade C)</span>
                </div>
                <span className="text-[10px] font-mono">Disqualify</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
