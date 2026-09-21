import { SOPItem } from '../types';

export const SOPS_DATA: SOPItem[] = [
  {
    id: 'sop-01',
    number: 'SOP 01',
    title: 'Lead Research & Digital Gap Analysis',
    category: 'research',
    purpose: 'Determine within 5–7 minutes whether an interior design or finishing company qualifies for outreach, and identify ONE high-impact tangible observation.',
    whenToUse: 'Before any cold call, direct message, or email outreach. Never contact a prospect without completing this SOP.',
    inputs: [
      'Company Instagram profile link',
      'Existing website URL (if present)',
      'Founder or Managing Director name/contact',
      'Sample of recent executed projects'
    ],
    steps: [
      {
        order: 1,
        title: 'Project Reality Check (2 Minutes)',
        detail: 'Inspect the last 6–9 Instagram posts. Are these real executed residential/commercial projects (villas, turnkey handovers) or purely 3D renders? If 100% renders with zero real execution, mark as Grade C and discard.',
        tip: 'Look for tagged clients, on-site execution photos, material close-ups, or handover reels.'
      },
      {
        order: 2,
        title: 'Digital Presence & Website Audit (2 Minutes)',
        detail: 'Click the link in bio. Is there an official website? If yes: Is it slow, broken on mobile, or outdated? If no website: How do they direct inquiries? Note if they force high-net-worth clients to scroll through Instagram highlights to view executed villas.',
        tip: 'Check on mobile first. 85%+ of luxury villa owners browse on an iPhone.'
      },
      {
        order: 3,
        title: 'Identify ONE Specific Observation (1 Minute)',
        detail: 'Pick a standout executed project (e.g. "Katameya Heights Villa" or "Palm Hills Standalone") and note how difficult it is for a visitor to understand the full scope, materials, and turnkey services from Instagram alone.',
        tip: 'Be precise: "Your recent turnkey duplex project in Lake View" is 10x better than "your nice designs".'
      },
      {
        order: 4,
        title: 'Decision Maker Discovery (1–2 Minutes)',
        detail: 'Find the founder, design principal, or managing partner on LinkedIn, Instagram bio, or company registration. Note their direct WhatsApp/phone or business email.',
        tip: 'Target titles: Founder, Principal Architect, Design Director, Managing Partner.'
      },
      {
        order: 5,
        title: 'Log Lead Grade & Next Action in CRM (30 Seconds)',
        detail: 'Record in the CRM: Company, Grade (A/B), Specific Observation, Direct Contact, and set Next Action Date for outreach within 24 hours.',
        tip: 'The Golden Pipeline Law: No lead without a Next Action.'
      }
    ],
    expectedOutput: 'A scored lead entry (Grade A/B) with one validated specific observation ready for cold outreach.',
    doneWhen: [
      'Company project reality is verified (real executed work confirmed)',
      'One specific observation is written and saved',
      'Decision maker name and contact number/handle are located',
      'Lead is graded (A or B) and logged with a scheduled outreach date'
    ],
    commonMistakes: [
      'Spending more than 7 minutes researching a single cold lead',
      'Targeting students or freelancers with zero commercial execution capacity',
      'Using generic compliments instead of one precise observation',
      'Failing to check mobile view of their existing link-in-bio'
    ]
  },
  {
    id: 'sop-02',
    number: 'SOP 02',
    title: 'Cold Outreach (5-Angle Opener Matrix & Tone)',
    category: 'outreach',
    purpose: 'Initiate a respectful, peer-to-peer conversation with the studio principal using the 5-Angle Matrix and secure a 15–20 min diagnostic Discovery Meeting.',
    whenToUse: 'Daily during dedicated outbound prospecting blocks (10:00 AM – 1:00 PM / 4:00 PM – 7:00 PM).',
    inputs: [
      'Researched lead entry with verified Decision Maker name',
      'Logged specific observation from SOP 01',
      'NYVEQ 5-Angle Opener Matrix (A, B, C, D, or E)',
      'Calendar availability for 2 alternative meeting slots'
    ],
    steps: [
      {
        order: 1,
        title: 'Select Opener Angle based on Studio Status',
        detail: 'Choose the appropriate angle: Angle A (No Website Confirmation), Angle B (No Website Why), Angle C (30-Sec Permission), Angle D (Customer Journey Friction), or Angle E (Website Exists But Weak).',
        tip: 'Never open with rigid corporate pitches like "أنا أحمد من NYVEQ". Introduce yourself naturally after engagement.'
      },
      {
        order: 2,
        title: 'Deliver the Selected Opener Naturally',
        detail: 'Angle A Example: "مساء الخير، مكتب [اسم الشركة]؟ كنت حابب أسأل لو ليكم ويبسايت رسمي متاح غير صفحة إنستجرام؟"',
        tip: 'Tone must be calm, authoritative, peer-to-peer. Speak slowly at 80% speed.'
      },
      {
        order: 3,
        title: 'State the Specific Observation & Diagnostic Question',
        detail: 'Once they respond, bridge naturally: "تمام، لأن شفت شغلكم في مشروع [اسم المشروع] وشغلكم قوي ومميز جدًا، بس لاحظت إن اللي حابب يشوف سابقة أعمالكم كاملة أو يفهم خدمات التشطيب بالتفصيل مش بيلاقي مسار منظم غير رسائل إنستجرام أو واتساب. حالياً بتوجهوا عميل الفيلا الجديد لفين؟"',
        tip: 'Listen quietly. Let them explain their current manual process.'
      },
      {
        order: 4,
        title: 'Propose the 15-Minute Diagnostic Meeting',
        detail: 'Propose: "عندي تصور مخصص للطريقة اللي ممكن تترتب بيها مشاريعكم في واجهة تفاعلية تصفي العملاء وتوفر وقت الفريق. ممكن نحدد 15 دقيقة على زووم أوريك التصور ده؟ يناسبك الأربعاء الساعة 3 ولا الخميس الساعة 1؟"',
        tip: 'Always give two concrete time options.'
      },
      {
        order: 5,
        title: 'Instant WhatsApp Confirmation & CRM Update',
        detail: 'Immediately send WhatsApp message confirming date, Zoom link, and calendar invite. Update CRM status to "Meeting Booked".',
        tip: 'Send WhatsApp reminder 2 hours before the call.'
      }
    ],
    expectedOutput: 'A confirmed 15–20 min diagnostic Discovery Meeting on Zoom with an interested studio principal.',
    doneWhen: [
      'Meeting date and time confirmed by the prospect',
      'Zoom link sent via WhatsApp confirmation',
      'CRM status updated to "meeting_booked" with Next Action date'
    ],
    commonMistakes: [
      'Starting the call with telemarketer pitch instead of conversational curiosity',
      'Talking over the prospect instead of letting them describe their customer journey',
      'Pitching packages or pricing over the phone during cold outreach'
    ]
  },
  {
    id: 'sop-03',
    number: 'SOP 03',
    title: 'Discovery Meeting Execution (6 Diagnostic Questions)',
    category: 'discovery',
    purpose: 'Diagnose the prospect’s customer journey, clarify service boundaries, and qualify if they merit a tailored 10–20 min Live Demo.',
    whenToUse: 'During scheduled 15–20 minute Zoom meetings with studio founders.',
    inputs: [
      'Prospect company background and Instagram links',
      'The 6 Core Discovery Questions',
      'Digital note pad to record exact quotes'
    ],
    steps: [
      {
        order: 1,
        title: 'Set Agenda & Peer-to-Peer Frame (2 Minutes)',
        detail: 'Open cleanly: "الهدف من مكالمتنا النهاردة مش إني أعرض عليك أي حاجة، بل أفهم رحلة العميل عندكم من أول ما بيشوف شغلكم لحد ما بيتعاقد، ونشوف إيه العقبات اللي بتواجهكم."',
        tip: 'Never start a discovery meeting by presenting a demo right away!'
      },
      {
        order: 2,
        title: 'Execute the 6 Core Diagnostic Questions (10–12 Minutes)',
        detail: 'Ask: 1. معظم عملائكم بيجوا عن طريق إيه؟ 2. لما العميل بيطلب يشوف سابقة أعمالكم كاملة بتبعتوله إيه؟ 3. هل العميل بيميز بوضوح بين التصميم والتشطيب المتكامل؟ 4. إيه أكتر استفسارات متكررة بتضيع وقتكم؟ 5. هل في استفسارات بتوصلكم مش مناسبة لميزانيتكم؟ 6. لو المنصة الرقمية اشتغلت صح، إيه أهم نتيجة حابب تشوفها؟',
        tip: 'Write down their exact words and pain points.'
      },
      {
        order: 3,
        title: 'Mirror & Summarize the Core Friction (3 Minutes)',
        detail: 'Summarize back: "يعني لو لخصت كلام حضرتك، شغلكم ممتاز زي مشروع [اسم المشروع]، لكن العميل بيضيع وقتكم في الواتساب، وبيوصلكم استفسارات غير مؤهلة لميزانية التشطيب، ومحتاجين منصة تظهر فخامة الشغل وتصفي العملاء قبل ما يتكلموا معاكم. هل ده دقيق؟"',
        tip: 'Wait for their clear confirmation.'
      },
      {
        order: 4,
        title: 'Schedule the 10–20 Min Tailored Demo',
        detail: 'If qualified: "بناءً على ده، هجهز لحضرتك ديمو عملي مبسط مدته 15 دقيقة بيعرض مشاريعكم في واجهة تفاعلية مع مسار الحجز الذكي. نتقابل بعد يومين نراجعه سوا؟"',
        tip: 'Never promise an entire free website; promise a focused tailored concept demo.'
      }
    ],
    expectedOutput: 'Documented diagnostic findings and a scheduled Demo Presentation Meeting with a qualified founder.',
    doneWhen: [
      'All 6 diagnostic questions completed and recorded',
      'Founder confirmed alignment with summarized pain points',
      'Demo Presentation Meeting booked on calendar'
    ],
    commonMistakes: [
      'Jumping straight into a demo without asking diagnostic questions',
      'Talking more than 30% of the time during discovery',
      'Failing to verify whether they have the budget and willingness to upgrade'
    ]
  },
  {
    id: 'sop-04',
    number: 'SOP 04',
    title: 'Custom Demo Production & Presentation (10–20 Min Boundary)',
    category: 'demo',
    purpose: 'Build and present a focused, high-impact concept demo (10–20 min presentation) using their actual project photos, without building the entire site for free.',
    whenToUse: 'After a successful Discovery Meeting where mutual qualification is established.',
    inputs: [
      'Prospect’s top 2–4 executed residential projects from Instagram',
      'Studio name, logo, and core service offerings',
      'NYVEQ demo concept framework'
    ],
    steps: [
      {
        order: 1,
        title: 'Assemble Key Demo Components (30–45 Minutes Prep)',
        detail: 'Prepare 4 core elements: 1. Clean hero section with studio name & premier project shot. 2. Projects Showcase with high-res photography and compound tags. 3. Services section distinguishing Design from Turnkey Finishing. 4. Clear VIP Consultation Booking Call-to-Action.',
        tip: 'Do not overbuild! The goal is to demonstrate vision, speed, and positioning.'
      },
      {
        order: 2,
        title: 'Deliver 10–20 Min Focused Live Walkthrough',
        detail: 'Keep demo presentation strictly to 10–20 minutes. Walk through the hero, the project showcase, the service boundaries, and show how a villa client books an inquiry effortlessly.',
        tip: 'Walk them through on mobile viewport first, then desktop.'
      },
      {
        order: 3,
        title: 'Connect Demo Directly to Discovery Pain Points',
        detail: 'Remind them: "فاكر لما اتكلمنا عن تشتت العملاء في الواتساب؟ هنا العميل بيشوف تفاصيل المشروع كاملة وبيحدد نوع الوحدة وميزانيتها قبل ما يضغط على زرار الحجز."',
        tip: 'Keep the focus on business outcome, not tech jargon.'
      },
      {
        order: 4,
        title: 'Transition to Proposal & Package Recommendation',
        detail: 'Ask: "شايف إزاي النظام ده هيغير انطباع عملاء الفلل عندكم؟" Then recommend the Signature Package (21,997 EGP) or Founding Partner Cohort.',
        tip: 'Bridge directly into sending the proposal.'
      }
    ],
    expectedOutput: 'A delivered 10–20 min live demo walkthrough with clear transition to proposal review.',
    doneWhen: [
      'Demo presented within the 10–20 minute window',
      'Client expressed visual excitement and recognized the value',
      'Proposal review step confirmed'
    ],
    commonMistakes: [
      'Delivering 60+ minute overwhelming tech lectures',
      'Building the entire site for free prior to closing',
      'Failing to ask for next steps at the end of the demo'
    ]
  },
  {
    id: 'sop-05',
    number: 'SOP 05',
    title: 'Proposal Creation & Presentation SOP',
    category: 'proposal',
    purpose: 'Draft and deliver a clear web-based proposal reflecting their discovery answers and transparent package pricing.',
    whenToUse: 'Immediately following the Demo presentation, or within 24 hours of verbal agreement.',
    inputs: [
      'Verbatim notes from Discovery Meeting (SOP 03)',
      'Recommended Package: Presence (12,997 EGP), Signature (21,997 EGP), or Authority (34,997 EGP+)',
      'NYVEQ Proposal Builder tool in Agency HQ'
    ],
    steps: [
      {
        order: 1,
        title: 'Populate Client & Diagnostic Findings',
        detail: 'Open Proposal Builder. Input client name, studio, standout project, and paste their exact current situation and specific digital flaws from discovery.',
        tip: 'Using their exact words eliminates fee resistance.'
      },
      {
        order: 2,
        title: 'Select Recommended Tier & Scope',
        detail: 'Select the package matching their scale: Presence (3 pages, 6 projects), Signature (7 pages, 15 projects - recommended), Authority (12 pages, scalable), or Founding Partner (build fee waived).',
        tip: 'Always anchor against the Signature Tier (21,997 EGP) as the ideal standard.'
      },
      {
        order: 3,
        title: 'Verify Payment Terms & Revision Policy',
        detail: 'Set 50% upfront deposit to initiate sprint, 50% upon final staging sign-off before DNS launch. State revision rounds clearly (Presence: 2, Signature: 3, Authority: 4).',
        tip: 'Never allow unlimited revisions in writing.'
      },
      {
        order: 4,
        title: 'Send Clean Web Proposal Link via WhatsApp',
        detail: 'Dispatch the interactive web proposal link: "أستاذ [الاسم]، جهزت لحضرتك وثيقة العمل وتفاصيل التنفيذ كاملة هنا. نراجعها سوا ونحدد موعد بدء الإعداد؟"',
        tip: 'A web-based proposal reinforces NYVEQ’s modern digital authority.'
      }
    ],
    expectedOutput: 'A dispatched web proposal link with a scheduled closing conversation.',
    doneWhen: [
      'Proposal generated and verified in Proposal Library',
      'Client link confirmed active on mobile and desktop',
      'Dispatched with scheduled follow-up within 24–48 hours'
    ],
    commonMistakes: [
      'Sending cluttered static PDFs that do not open on mobile',
      'Leaving payment terms or revision policies ambiguous',
      'Discounting pricing without reducing scope'
    ]
  },
  {
    id: 'sop-06',
    number: 'SOP 06',
    title: 'Closing & Deposit Collection Protocol',
    category: 'closing',
    purpose: 'Secure agreement sign-off, collect the 50% commitment deposit, and transition the lead into onboarding.',
    whenToUse: 'When the prospect has reviewed the proposal and is ready to proceed.',
    inputs: [
      'Approved proposal parameters',
      'NYVEQ Service Agreement template',
      'Bank / Instapay payment details',
      'Onboarding calendar availability'
    ],
    steps: [
      {
        order: 1,
        title: 'Confirm Scope & Address Remaining Questions',
        detail: 'Address any remaining questions on timeline or deliverables. Confirm: "هل كل البنود واضحة ومطابقة للرؤية اللي اتفقنا عليها؟"',
        tip: 'Maintain confident, calm silence after asking for the close.'
      },
      {
        order: 2,
        title: 'Dispatch Service Agreement for Sign-off',
        detail: 'Send simple 2-page Service Agreement outlining scope, package timeline, revision rounds, and IP transfer upon final payment.',
        tip: 'Keep terms concise, professional, and transparent.'
      },
      {
        order: 3,
        title: 'Issue 50% Deposit Invoice & Instapay Details',
        detail: 'Send the 50% deposit invoice (e.g. 10,999 EGP for Signature Tier). For Founding Partners, collect agreement confirmation and hosting details.',
        tip: 'Work strictly begins AFTER deposit clears. No exceptions.'
      },
      {
        order: 4,
        title: 'Confirm Payment & Dispatch Rapid Onboarding',
        detail: 'Confirm payment receipt within 15 minutes. Dispatch the standardized welcome message and initiate SOP 07.',
        tip: 'Update CRM payment status to "deposit_paid" and status to "won".'
      }
    ],
    expectedOutput: 'Signed agreement, verified deposit in account, and transition to onboarding.',
    doneWhen: [
      'Agreement confirmed by studio founder',
      '50% deposit verified received',
      'CRM updated to Won / Onboarding with Next Action set'
    ],
    commonMistakes: [
      'Commencing build work on verbal promises before deposit clears',
      'Delaying invoice dispatch after verbal agreement',
      'Failing to establish immediate next onboarding steps'
    ]
  },
  {
    id: 'sop-07',
    number: 'SOP 07',
    title: 'Client Onboarding & Rapid Asset Ingestion',
    category: 'onboarding',
    purpose: 'Execute rapid internal intake within 24–48 hours using the standardized 6-folder asset structure, keeping client friction near zero.',
    whenToUse: 'Immediately following deposit verification (Days 01–02 of project kickoff).',
    inputs: [
      'Client contact details',
      'Standardized Google Drive workspace',
      'Internal intake form filled by Ahmed during discovery'
    ],
    steps: [
      {
        order: 1,
        title: 'Create Standardized 6-Folder Workspace',
        detail: 'Create Google Drive folder: `[Studio Name] x NYVEQ Assets` with exact subfolders: `01_LOGO_BRAND`, `02_PROJECTS` (numbered project folders), `03_SERVICES_PRICING`, `04_CONTACT_HOURS`, `05_TEAM_ABOUT`, `06_OTHER`.',
        tip: 'Never ask the client to fill out long confusing questionnaires! Ahmed completes the internal intake.'
      },
      {
        order: 2,
        title: 'Send Welcoming Asset Dispatch Message',
        detail: 'Send clear WhatsApp message with shared folder link explaining where to drop high-res project photography, logo files, and service details.',
        tip: 'Set a firm 48-hour target for project asset uploads.'
      },
      {
        order: 3,
        title: 'Verify Asset Quality & Resolution',
        detail: 'Ensure photos are original high-res photographer files (minimum 1920px wide), not compressed WhatsApp screenshots. Request originals if needed.',
        tip: 'Image quality dictates the luxury perception of the entire platform.'
      },
      {
        order: 4,
        title: 'Lock Project Sprint Timeline & Update CRM',
        detail: 'Once assets are in place, confirm delivery timeline (Presence: 7–12 days, Signature: 10–18 days, Authority: 15–25 days) and update CRM to "ready_to_build".',
        tip: 'Announce official sprint start date to the client.'
      }
    ],
    expectedOutput: 'Organized asset workspace, completed internal intake, and locked build sprint.',
    doneWhen: [
      'Shared folder created with 6 standardized folders',
      'Curated project photos and logo uploaded and approved',
      'CRM status updated to "ready_to_build"'
    ],
    commonMistakes: [
      'Sending a 20-page client questionnaire that overwhelms the founder',
      'Accepting blurry, low-res social media screenshots',
      'Letting asset collection stall without firm follow-ups'
    ]
  },
  {
    id: 'sop-08',
    number: 'SOP 08',
    title: 'Platform Delivery, Structured Revisions & Launch',
    category: 'delivery',
    purpose: 'Deliver the finished platform, execute structured revision rounds per package tier, collect remaining 50% balance, and launch on custom domain.',
    whenToUse: 'Final phase of project delivery lifecycle.',
    inputs: [
      'Staging URL of finished platform',
      'Structured Revision Feedback Sheet',
      'Client domain DNS access (GoDaddy, Namecheap, Cloudflare)',
      'Final invoice for remaining 50% balance'
    ],
    steps: [
      {
        order: 1,
        title: 'Internal Quality & Mobile Verification',
        detail: 'Audit every page on iPhone Safari, Android Chrome, and Desktop. Test all contact buttons, project drawers, load times (<1.0s), and SSL security.',
        tip: 'Zero broken links or placeholder texts allowed.'
      },
      {
        order: 2,
        title: 'Present Staging Build to Client',
        detail: 'Send staging link with a 3-minute Loom video or live Zoom review walking through the design decisions and inquiry journey.',
        tip: 'Walk through on mobile view first.'
      },
      {
        order: 3,
        title: 'Execute Structured Revisions per Package',
        detail: 'Implement structured revision rounds based on tier: Presence (2 rounds), Signature (3 rounds), Authority (4 rounds). Collect text/photo edits in a single consolidated sheet within 48 hours.',
        tip: 'No infinite WhatsApp voice note revision loops.'
      },
      {
        order: 4,
        title: 'Collect Remaining 50% Payment before Live DNS Launch',
        detail: 'Receive final written approval. Issue invoice for remaining 50% balance. Confirm payment clearance before switching DNS to live domain.',
        tip: 'Transferring live domain control prior to payment clearance is strictly prohibited.'
      },
      {
        order: 5,
        title: 'Launch on Custom Domain & Kickoff Post-Launch Support',
        detail: 'Point DNS records to production edge server, verify SSL padlock, test live WhatsApp routing, and activate post-launch support (Presence: 14 days, Signature: 30 days, Authority: 45 days).',
        tip: 'Update CRM status to "launched" and payment status to "paid_in_full".'
      }
    ],
    expectedOutput: 'Live production platform operating on client’s custom domain, 100% paid in full, with post-launch support active.',
    doneWhen: [
      'Platform live on custom domain with active SSL',
      'Remaining 50% payment verified in bank account',
      'Live inquiry verified via test submission',
      'CRM updated to "launched" and "paid_in_full"'
    ],
    commonMistakes: [
      'Connecting live domain before final payment clears',
      'Allowing endless unstructured revision loops',
      'Failing to test WhatsApp routing on the live domain'
    ]
  },
  {
    id: 'sop-09',
    number: 'SOP 09',
    title: 'Client Scope Control & Revision Management',
    category: 'delivery',
    purpose: 'Protect delivery timelines and package scope boundaries by managing revisions strictly within agreed tier limits.',
    whenToUse: 'During the staging review phase of any active project build.',
    inputs: [
      'Agreed Package Tier (Presence: 2 rounds, Signature: 3 rounds, Authority: 4 rounds)',
      'Client Staging URL',
      'Consolidated Revision Sheet'
    ],
    steps: [
      {
        order: 1,
        title: 'Establish Structured Feedback Channel',
        detail: 'Instruct client: "لتسليم المنصة بأعلى جودة وفي الميعاد، بنجمع كل الملاحظات الخاصة بالنصوص أو الصور في جولة الملاحظات المتفق عليها."',
        tip: 'Direct all requests into a single consolidated document.'
      },
      {
        order: 2,
        title: 'Filter In-Scope vs Out-of-Scope Requests',
        detail: 'In-scope: Text adjustments, photo replacements, color calibrations within design system. Out-of-scope: New pages beyond package limit, complex custom 3D engines, e-commerce stores.',
        tip: 'Park out-of-scope requests: "هنقدر نضيف الميزة دي في المرحلة التانية بعد الإطلاق الحي."'
      },
      {
        order: 3,
        title: 'Execute Revisions within 48 Hours',
        detail: 'Apply replacements promptly and submit revised staging build for client verification.',
        tip: 'Track rounds count against agreed package quota.'
      },
      {
        order: 4,
        title: 'Secure Written Staging Sign-off',
        detail: 'Obtain formal sign-off via WhatsApp or email: "تم اعتماد النسخة النهائية وجاهزة للإطلاق على الدومين الرسمي."',
        tip: 'Required before issuing final invoice.'
      }
    ],
    expectedOutput: 'Approved final staging build with zero scope creep and clear milestone sign-off.',
    doneWhen: [
      'All valid revisions executed within round limit',
      'Out-of-scope features parked for future phases',
      'Formal written approval secured'
    ],
    commonMistakes: [
      'Accepting piecemeal changes over days via random WhatsApp voice notes',
      'Adding entire extra pages for free beyond package scope',
      'Failing to track revision round count'
    ]
  },
  {
    id: 'sop-10',
    number: 'SOP 10',
    title: 'Custom Domain Launch & Case Study Documentation',
    category: 'delivery',
    purpose: 'Configure custom domain DNS, verify SSL security, and capture client testimonial to build compounding agency proof.',
    whenToUse: 'Final launch day following payment confirmation.',
    inputs: [
      'Approved Staging Build',
      'Verified final payment confirmation',
      'Client Domain Registrar Access (Cloudflare / GoDaddy / Namecheap)',
      'Case study prompt guidelines'
    ],
    steps: [
      {
        order: 1,
        title: 'Payment Verification Pre-Flight',
        detail: 'Confirm 100% of agreed fees are cleared in the bank account (or founding agreement executed).',
        tip: 'Never configure production DNS without payment verification.'
      },
      {
        order: 2,
        title: 'DNS Propagation & Edge CDN Configuration',
        detail: 'Point A and CNAME records to production edge servers. Verify automatic SSL generation and global edge caching.',
        tip: 'Ensure both root domain and www subdomain resolve smoothly.'
      },
      {
        order: 3,
        title: 'Live Mobile & Inquiry Route Verification',
        detail: 'Open live domain on mobile Safari and Chrome. Submit a real inquiry to test WhatsApp and lead capture flow.',
        tip: 'Verify sub-1s load speed on 4G.'
      },
      {
        order: 4,
        title: 'Capture Written / Video Testimonial',
        detail: 'Send celebratory handover message with testimonial prompt: 1. كيف كان مظهر أعمالكم الرقمي قبل المنصة؟ 2. ما انطباعكم عن سرعة وسلاسة التنفيذ؟ 3. كيف ساعدكم النظام في تعزيز ثقة عملاء الفلل؟',
        tip: 'Request testimonial immediately upon go-live while enthusiasm is peak.'
      },
      {
        order: 5,
        title: 'Present Optional Managed Care Retainer',
        detail: 'Introduce the ongoing Managed Care retainer (Presence: 997 EGP/mo, Signature: 1,497 EGP/mo, Authority: 1,997 EGP/mo) to keep the platform updated, backed up, and optimized.',
        tip: 'Managed Care is optional but offers peace of mind for busy studio principals.'
      }
    ],
    expectedOutput: 'Live custom domain platform, 100% paid, and documented case study for NYVEQ portfolio.',
    doneWhen: [
      'Custom domain operational with active SSL',
      'Final payment cleared in full',
      'Inquiry form live test passed',
      'Testimonial requested and logged in agency archive'
    ],
    commonMistakes: [
      'Deploying DNS before final payment clears',
      'Failing to test WhatsApp routing on live domain',
      'Waiting weeks before asking for client feedback'
    ]
  }
];
