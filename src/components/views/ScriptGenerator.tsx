import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Send,
  PhoneCall,
  MessageSquare,
  Mail,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ViewMode } from '../../types';
import { PACKAGE_PRESETS } from '../../data/packageScopes';

interface ScriptGeneratorProps {
  onSelectView?: (view: ViewMode) => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ onSelectView }) => {
  // Inputs
  const [architectName, setArchitectName] = useState('باشمهندس كريم');
  const [studioName, setStudioName] = useState('KÉRAN Architecture');
  const [location, setLocation] = useState('القطامية ديونز / التجمع الخامس');
  const [standoutProject, setStandoutProject] = useState('فيلا ديونز 04 المسلّمة ع المفتاح');
  const [digitalFlaw, setDigitalFlaw] = useState(
    'حساب الإنستجرام به صور ريلز عادية لا تنقل فخامة الرخام والخشب الطبيعي، واللينك في البايو لا يحتوي على موقع إلكتروني، بل مجرد رقم واتساب بدون بورتفوليو سينمائي'
  );

  // Active generated tab
  const [activeTab, setActiveTab] = useState<
    'angle-a' | 'angle-b' | 'angle-c' | 'angle-d' | 'dm-en' | 'follow-up'
  >('angle-a');

  // Copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Pre-configured examples
  const loadPreset = (type: 'cairo' | 'zayed' | 'dubai') => {
    if (type === 'cairo') {
      setArchitectName('باشمهندس كريم');
      setStudioName('KÉRAN Atelier');
      setLocation('التجمع الخامس / قطامية ديونز');
      setStandoutProject('مشروع فيلا القطامية ديونز المودرن');
      setDigitalFlaw('الموقع الحالي بطيء ولا يعمل على الموبايل، والمشاريع المعروضة مجرد صور ثابتة بدون شروحات المواد والتسليم ع المفتاح');
    } else if (type === 'zayed') {
      setArchitectName('دكتور مهندس طارق');
      setStudioName('Palazzo Design Studio');
      setLocation('الشيخ زايد / بالم هيلز');
      setStandoutProject('قصر بالم هيلز كلاسيك مودرن');
      setDigitalFlaw('الأتيليه ليس لديه موقع إلكتروني إطلاقاً، ويعتمد فقط على إنستجرام بـ Highlight مبعثر يصعب على عميل الفيلا الجديد تصفحه');
    } else if (type === 'dubai') {
      setArchitectName('Arch. Mansoor Al-Ketbi');
      setStudioName('Cadastre Private Estates');
      setLocation('Emirates Hills / Dubai');
      setStandoutProject('The Palm Signature Villa');
      setDigitalFlaw('Website is a generic WordPress template with stock photos, diluting the bespoke $10M+ architectural caliber of the studio');
    }
  };

  // THE 4 TACTICAL SCRIPT ANGLES (Bespoke Generated)

  // Angle A: Direct Diagnosis & No Website Confirmation Hook
  const angleAScript = `مساء الخير يا ${architectName}، معاك أحمد من NYVEQ.
شفت تنفيذكم الراقي لمشروع ${standoutProject} في ${location}، والفينيش المعماري ما شاء الله راقي جداً ويستاهل الإشادة.
حابب أسأل لو لمكتب ${studioName} ويبسايت رسمي متاح غير صفحة إنستجرام؟
لاحظت إن ${digitalFlaw}، وده مخلي عميل الفلل والقصور اللي بيدور على تشطيبات بالملايين بيضطر يتنقل بين بوستات مبعثرة بدون ما يشوف الفخامة الكاملة لشغلكم.
معاك دقيقة واحدة أشارك معاك ملاحظة سريعة في 30 ثانية؟`;

  // Angle B: The Selective Founding Partner Cohort Hook
  const angleBScript = `مساء الخير يا ${architectName}، عارف إن وقت حضرتك ثمين بين إشراف المواقع والعملاء.
معاك أحمد من NYVEQ للأنظمة الرقمية لشركات الديزاين والتشطيب الفاخر.
بنطلق حالياً برنامج "الشركاء المؤسسين" وبنختار 5 إلى 7 مكاتب معمارية رائدة فقط في مصر بنعفيهم بالكامل من رسوم التطوير (Build Fee Waived) مقابل توثيق المنصة كدراسة حالة مشتركة وشهادة فيديو عند الإطلاق.
لما شفت تنفيذكم الفخم لمشروع ${standoutProject}، قررت أعرض أحد المقاعد على حضرتك ومكتب ${studioName}.
هل متاح لحضرتك دقيقة واحدة أشارك معاك تفاصيل المنظومة؟`;

  // Angle C: The Customer Journey & Friction Hook
  const angleCScript = `مساء الخير باشمهندس ${architectName}، تحياتي لحضرتك ولفريق ${studioName}.
في نقطة فنية لفتت نظري: مشروعاتكم المنفذة في ${location} بتعكس شغل قصور وفلل بملايين، لكن لما عميل فيلا جديد بيكلمكم، بيتبعتله ملف PDF أو بيتساب يقلب في صور إنستجرام بدون أي تجربة فخمة تشرح خاماتكم وتصفي الميزانيات.
إحنا بنحل الفجوة دي بمنظومة صالة عرض تفاعلية فيها استعراض سينمائي ومسار حجز استشارات مؤتمت، وبنقدم باقة Signature المعتمدة (${PACKAGE_PRESETS.signature.standardBuildFee.toLocaleString('en-US')} ج) أو الانضمام لبرنامج الشركاء المؤسسين.
يناسب حضرتك أبعتلك الرابط التفاعلي على الواتساب تجرب طريقة العرض بنفسك في دقيقة؟`;

  // Angle D: Direct 3-Sentence WhatsApp Hook (رسالة واتساب سريعة حاسمة)
  const angleDScript = `مساء الخير باشمهندس ${architectName}،
متابع بدقة تنفيذكم لمشروع (${standoutProject}) في ${location}، وتوزيع الخامات والتشطيب على أعلى مستوى حقيقي.

جهزت لحضرتك تصوراً تفاعلياً سريعاً لمشاريع ${studioName} لتجربتها مباشرة على الموبايل كبديل لعرض الصور العادية وملفات الـ PDF.

المنظومة معفية بالكامل من رسوم التطوير كأحد الشركاء المؤسسين المختارين لبرنامج دراسة الحالة لـ NYVEQ.

لو حابب تتصفح الرابط التفاعلي على تليفونك، أرسله لحضرتك فوراً. يومك سعيد!`;

  // English International DM
  const dmEnglishScript = `Good afternoon ${architectName},

I’ve been tracking ${studioName}’s execution on ${standoutProject} in ${location}. The spatial proportions and material finishes are exceptional.

We noticed an operational friction point: ${digitalFlaw}.

At NYVEQ, we build high-converting digital presence systems exclusively for premier interior and architecture studios. We are launching our Founding Partner Program, selecting 5–7 elite design firms in Egypt with 100% waived build fees as our flagship case studies.

We’ve already structured an interactive prototype showroom tailored to your portfolio caliber.

May I send you the private preview link for your review?`;

  // 48h Follow-up
  const followUpScript = `مساء الخير يا ${architectName}،

كنت حابب أتأكد إن رسالتي السابقة وصلت لحضرتك بخصوص نموذج المنصة التفاعلية لـ ${studioName} ومقاعد برنامج الشركاء المؤسسين المعفية من رسوم التطوير.

مقدر جداً انشغالكم بضغط المواقع وتسليمات المشاريع. جهزت لحضرتك رابطاً سريعاً تفتحه على الموبايل مباشرة في دقيقة واحدة.

هل يناسبك تطلع عليه اليوم؟`;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 border-b border-[#20202c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#272738] text-[11px] font-mono text-[#a855f7] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROSPECT SCRIPT GENERATOR // 4 TACTICAL ANGLES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Bespoke Script Generator (4 Variations).
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Input 4 prospect data points to instantly generate tailored scripts across 4 proven psychological angles (Prototype Hook, Beta Invitation, Friction Buster, WhatsApp Direct).
        </p>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-[11px] font-mono text-zinc-500">QUICK PRESETS:</span>
          <button
            onClick={() => loadPreset('cairo')}
            className="px-2.5 py-1 rounded-lg bg-[#14141c] hover:bg-[#1e1e2c] border border-[#222230] text-[11px] font-mono text-zinc-300 transition-colors"
          >
            New Cairo (KÉRAN)
          </button>
          <button
            onClick={() => loadPreset('zayed')}
            className="px-2.5 py-1 rounded-lg bg-[#14141c] hover:bg-[#1e1e2c] border border-[#222230] text-[11px] font-mono text-zinc-300 transition-colors"
          >
            Sheikh Zayed (Palazzo)
          </button>
          <button
            onClick={() => loadPreset('dubai')}
            className="px-2.5 py-1 rounded-lg bg-[#14141c] hover:bg-[#1e1e2c] border border-[#222230] text-[11px] font-mono text-zinc-300 transition-colors"
          >
            Dubai (Cadastre)
          </button>
        </div>
      </div>

      {/* Input Form Grid */}
      <div className="p-6 rounded-2xl bg-[#0c0c12] border border-[#20202c] shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
              1. اسم المعماري / المهندس:
            </label>
            <input
              type="text"
              value={architectName}
              onChange={(e) => setArchitectName(e.target.value)}
              className="w-full bg-[#13131c] border border-[#222232] rounded-xl px-3 py-2 text-sm text-zinc-100 font-ar focus:outline-none focus:border-[#7c3aed]"
              placeholder="باشمهندس كريم"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
              2. اسم الاستوديو / المكتب:
            </label>
            <input
              type="text"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              className="w-full bg-[#13131c] border border-[#222232] rounded-xl px-3 py-2 text-sm text-zinc-100 font-ar focus:outline-none focus:border-[#7c3aed]"
              placeholder="KÉRAN Architecture"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
              3. الموقع / الكمبوند الرئيسي:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#13131c] border border-[#222232] rounded-xl px-3 py-2 text-sm text-zinc-100 font-ar focus:outline-none focus:border-[#7c3aed]"
              placeholder="القطامية ديونز / التجمع"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
              4. المشروع البارز في البورتفوليو:
            </label>
            <input
              type="text"
              value={standoutProject}
              onChange={(e) => setStandoutProject(e.target.value)}
              className="w-full bg-[#13131c] border border-[#222232] rounded-xl px-3 py-2 text-sm text-zinc-100 font-ar focus:outline-none focus:border-[#7c3aed]"
              placeholder="فيلا القطامية ديونز"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
            5. الفجوة الرقمية المحددة (Digital Friction Point):
          </label>
          <textarea
            value={digitalFlaw}
            onChange={(e) => setDigitalFlaw(e.target.value)}
            rows={2}
            className="w-full bg-[#13131c] border border-[#222232] rounded-xl p-3 text-xs text-zinc-100 font-ar focus:outline-none focus:border-[#7c3aed] resize-none"
            placeholder="حدد الفجوة الدقيقة (موقع بطيء، غياب الويب سايت، صور ريلز مبعثرة، عدم وضوح خدمات التشطيب الفاخر)..."
          />
        </div>
      </div>

      {/* Output Tabs & Generated Asset Canvas */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f1f2c] pb-3">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'angle-a', label: '🎯 زاوية 01: الديمو الجاهز + إعفاء التأسيس', icon: PhoneCall },
              { id: 'angle-b', label: '💎 زاوية 02: الشريك المؤسس (3 مقاعد نادرة)', icon: Flame },
              { id: 'angle-c', label: '⚡ زاوية 03: تسرب العملاء وفخ الـ PDF', icon: ShieldAlert },
              { id: 'angle-d', label: '📱 زاوية 04: رسالة الواتساب الصاعقة', icon: MessageSquare },
              { id: 'dm-en', label: '🌐 English VIP DM (Dubai / Global)', icon: Send },
              { id: 'follow-up', label: '⏳ متابعة بعد 48 ساعة', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-ar font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#7c3aed] text-white shadow-md font-bold'
                      : 'bg-[#101017] text-zinc-400 hover:text-zinc-200 border border-[#1f1f2a]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Direct Launch to Live Call Cockpit */}
          {onSelectView && (
            <button
              onClick={() => onSelectView('sales-cockpit')}
              className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Launch Live Call Cockpit →</span>
            </button>
          )}
        </div>

        {/* Script Rendered Box */}
        {(() => {
          let textToRender = '';
          let scriptLang = 'ar';
          let instructions = '';

          if (activeTab === 'angle-a') {
            textToRender = angleAScript;
            instructions = 'أقوى زاوية اتصال هاتفي؛ تجمع بين مباغتة "الديمو الجاهز" وهيبة "رسوم التأسيس المعفية 100%".';
          } else if (activeTab === 'angle-b') {
            textToRender = angleBScript;
            instructions = 'زاوية النخبوية والندرة؛ مثالية للمكاتب الكبيرة والمهندسين ذوي الكبرياء العالي.';
          } else if (activeTab === 'angle-c') {
            textToRender = angleCScript;
            instructions = 'زاوية كشف الفجوة؛ تركز على إحراج فخ ملفات الـ PDF الميتة وضياع عملاء الـ 10 مليون.';
          } else if (activeTab === 'angle-d') {
            textToRender = angleDScript;
            instructions = 'رسالة واتساب سريعة حاسمة من 3 فقرات ترسل فوراً على موبايل المهندس الخاص.';
          } else if (activeTab === 'dm-en') {
            textToRender = dmEnglishScript;
            scriptLang = 'en';
            instructions = 'High-status English outreach tailored for international or regional architectural founders.';
          } else if (activeTab === 'follow-up') {
            textToRender = followUpScript;
            instructions = 'أرسل بعد مرور 48 ساعة من الرسالة الأولى في حال عدم الرد.';
          }

          const isCopied = copiedKey === activeTab;

          return (
            <div className="rounded-2xl bg-[#0c0c12] border border-[#20202c] overflow-hidden shadow-2xl">
              <div className="p-4 bg-[#111119] border-b border-[#1b1b26] flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  TACTICAL ANGLE // {activeTab.toUpperCase()}
                </span>

                <button
                  onClick={() => handleCopy(activeTab, textToRender)}
                  className="px-4 py-1.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-md"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>1-CLICK COPY SCRIPT</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div
                  dir={scriptLang === 'en' ? 'ltr' : 'rtl'}
                  className={`p-6 rounded-xl bg-[#13131c] border border-[#242436] text-zinc-100 text-sm md:text-base leading-loose whitespace-pre-line select-text ${
                    scriptLang === 'en' ? 'font-sans' : 'font-ar'
                  }`}
                >
                  {textToRender}
                </div>

                <div className="p-3.5 rounded-xl bg-[#0e0e14] border border-[#1b1b26] flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#a855f7]" />
                    <span>{instructions}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {textToRender.length} characters
                  </span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
